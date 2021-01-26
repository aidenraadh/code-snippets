<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;

class Dropzone
{
    private $tmp_id; // The temporary folder id, must be unique to each user
    private $upload_batch; // UNIX timestamp

    public function __construct($tmp_id, $timestamp){
        $this->tmp_id = $tmp_id;
        $this->upload_batch = (int)$timestamp;
    }

    // Check the uploads batch, if uploads batch doesnt valid,
    // user is uploading or removing files by using different uploads session
    public function checkUploads(){
        $uploads = session('uploads', null);

        if( !(isset($uploads) && $uploads['batch'] === $this->upload_batch) ){
            return false;
        }

        return true;
    }

    // Called when uploads batch doesn't valid.
    // Restart the uploads session, renew the upload batch,
    // and empty the files array.
    // Also empty the previously made tmp folder
    // Uploads session structure:
    // $uploads = [
    //     'batch' => (int)uploads_batch,
    //     'files' => [
    //         'disk_name' => (arr)filenames,
    //         ...
    //     ]
    // ];
    private function restartUploads($disk_name){
        session(['uploads' => [
            'batch' => $this->upload_batch,
            'files' => [
                $disk_name => [],
            ]
        ]]);

        $disk = Storage::disk($disk_name);
        $tmp_path = 'tmp/'.$this->tmp_id;
        
        $disk->deleteDirectory($tmp_path);
        $disk->makeDirectory($tmp_path);
    }    

    // Store the uploaded files to temporary folder
    // Fill the 'files' key with the basename of the file
    public function storeToTmp($disk_name, $file, $max = 0){
        // Check the uploads batch, if not valid restart it
        if(!$this->checkUploads()){
            $this->restartUploads($disk_name);
        }

        $disk = Storage::disk($disk_name);
        $tmp_path = 'tmp/'.$this->tmp_id;
        $file_name = $file->getClientOriginalName();
        $uploads = session('uploads');     

        if( $max !== 0 && count($uploads['files'][$disk_name]) > $max ){
            return false;
        }

        $uploads['files'][$disk_name][] = $file_name;

        session(['uploads' => $uploads]);
        
        $disk->putFileAs(
            $tmp_path, $file, $file_name
        );

        return $disk->url($tmp_path.'/'.$file_name);
    }

    // Get all the uploaded files from the temporary folder
    // Return an array of the files URLS.
    // Each files is sorted from the earliest upload to the lastest
    public function getFromTmp($disk_name){
        $disk = Storage::disk($disk_name);
        $fnames = session('uploads')['files'][$disk_name];
        $furls = [];

        foreach($fnames as $fname){
            $furls[] = $disk->url('tmp/'.$this->tmp_id.'/'.$fname);
        };

        return $furls;
    }

    // Delete the uploaded files from temporary folder
    // Return the deleted file tmp URL if the upload batch is valid
    // Return null if the deleted file is not exist
    // Return false if the upload batch is invalid
    public function deleteFromTmp($disk_name, $file_name){
        if($this->checkUploads()){
            $disk = Storage::disk($disk_name);
            $tmp_path = 'tmp/'.$this->tmp_id;
            $uploads = session('uploads');

            if(in_array( $file_name, $uploads['files'][$disk_name] )){
                unset($uploads['files'][$disk_name][
                    array_search($file_name, $uploads['files'][$disk_name])
                ]);
                
                $disk->delete($tmp_path.'/'.$file_name);
                session(['uploads' => $uploads]);
    
                return $disk->url($tmp_path.'/'.$file_name);
            }

            return null;
        }
        return false;
    }

    // Copy all files from resource to temporary folder for updating
    // Also fill the 'files' key with the files names sorted by the earliest
    // upload to the latest
    public function getForUpdate($disk_name, $resource_id){
        // Check the uploads batch, if false restart it
        if(!$this->checkUploads()){
            $this->restartUploads($disk_name);
        }

        $disk = Storage::disk($disk_name);
        $fpaths = $disk->allFiles($resource_id);
        $fpaths_with_ts = [];
        
        foreach($fpaths as $fpath){
            $fpaths_with_ts[$disk->lastModified($fpath)] = $fpath;
        }
        ksort($fpaths_with_ts);

        $uploads = session('uploads');
        $files_urls = [];

        foreach($fpaths_with_ts as $ts => $fpath){
            $uploads['files'][$disk_name][] = basename($fpath);

            $disk->copy(
                $fpath,
                'tmp/'.$this->tmp_id.'/'.basename($fpath)
            );
            $files_urls[] = $disk->url('tmp/'.$this->tmp_id.'/'.basename($fpath));
        }

        session(['uploads' => $uploads]);

        return $files_urls;
    }

    // Move all uploaded files in the temporary folder to the resource folder
    // And then empty the 'files' key inside uploads session
    public function moveToFixed($disk_name, $resource_id){
        $disk = Storage::disk($disk_name);
        $tmp_path = 'tmp/'.$this->tmp_id;
        $uploads = session('uploads');
        $files = $uploads['files'][$disk_name];
        $files_urls = [];

        // Move the files in the temporary folder only if it's not empty
        if(!empty($files)){
            $disk->deleteDirectory($resource_id);
            $disk->makeDirectory($resource_id);  

            foreach($files as $file){
                $disk->move(
                    $tmp_path.'/'.$file,
                    $resource_id.'/'.$file
                );
                $files_urls[] = $disk->url($resource_id.'/'.$file);
            }
        }                        

        $disk->deleteDirectory($tmp_path);
        $uploads['files'][$disk_name] = [];
        session(['uploads' => $uploads]);

        return $files_urls;
    }  
}
