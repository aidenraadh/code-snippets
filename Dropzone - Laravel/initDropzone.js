function initDropzone(id, url, headers, param_name = 'file', max_file = null){
	const dropzone_el = document.getElementById(id);

	return new Dropzone('#'+id, {
		url: url,
		headers: headers,
		paramName: param_name,
		maxFiles: max_file,
		addRemoveLinks: true,
		dictRemoveFile: '&times; Remove file',
		accept: function(file, done){
			const uploaded_files = this.files;
			const uploaded_filenames = uploaded_files.map((uploaded_file, index) => {
				if(index < uploaded_files.length - 1){
					return uploaded_file.name;
				}
			});
			// Prevent to upload file with the same name
			if( uploaded_filenames.includes(file.name) ){
				done('same_file_name');
			}
			else {done();}
		},
		// If errors happen, remove the uploaded file
		error: function(file, errors){
			if(errors === 'same_file_name'){
				alert('File with name "'+file.name+'" is already exists.');
				file.previewElement.remove();
			}
			else{
				let error_msg = '';

				if(Array.isArray(errors)){
					errors.forEach((error) => {
						error_msg += error+'\n';
					});
				}
				else{
					error_msg = errors;
				}

				alert(error_msg);
				this.removeFile(file);
			}
		},
	});	
}
