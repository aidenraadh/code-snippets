<?php

class FacebookAPI{

  private $APP_ID;
  private $APP_SECRET;
  private $REDIRECT_URI;

  public function __construct($creds){
    $this->APP_ID = $creds['APP_ID'];
    $this->APP_SECRET = $creds['APP_SECRET'];
    $this->REDIRECT_URI = $creds['REDIRECT_URI'];
  }

	public function getAuthURL($scope = [], $state = null){
		return 'https://www.facebook.com/v7.0/dialog/oauth?'.
      'client_id='.$this->APP_ID.
      '&redirect_uri='.$this->REDIRECT_URI.
      '&scope='.implode(',', $scope).
      '&response_type=code'.
      ($state ? '&state='.$state : '');
	}

	public function getAccessToken($code){
		return file_get_contents('https://graph.facebook.com/v7.0/oauth/access_token?'.
      'client_id='.$this->APP_ID.
      '&redirect_uri='.$this->REDIRECT_URI.
      '&client_secret='.$this->APP_SECRET.
      '&code='.$code
    );
	}

  public function getLongLivedToken($access_token){
    return file_get_contents('https://graph.facebook.com/v7.0/oauth/access_token?'.
      'grant_type=fb_exchange_token'.
      '&client_id='.$this->APP_ID.
      '&client_secret='.$this->APP_SECRET.
      '&fb_exchange_token='.$access_token
    );
  }  
  
}