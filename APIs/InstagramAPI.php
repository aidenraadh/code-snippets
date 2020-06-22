<?php

class InstagramAPI{

	private $APP_ID;
	private $APP_SECRET;
	private $REDIRECT_URI;	
	
	function __construct($creds){
		$this->APP_ID = $creds['APP_ID'];
		$this->APP_SECRET = $creds['APP_SECRET'];
		$this->REDIRECT_URI = $creds['REDIRECT_URI'];
	}


/*
|--------------------------------------------------------------------------
| Generate Authorization URL
|--------------------------------------------------------------------------
|
| This method will return an authorization URL that will asked the users
| permission for this app to access their instagram
|
| # Properties:
| - $scope (string seperated by comma)
|   A comma-separated list, or URL-encoded space-separated list, 
|   of permissions to request from the app user. user_profile is required.
|
| # $state (string )(optional)
| - An optional value indicating a server-specific state. For example, 
|   you can use this to protect against CSRF issues. We will include 
|   this parameter and value when redirecting the user back to you.
|
| # Successful Authorization
| - If authorization is successful, we will redirect the user to your 
|   redirect_uri and pass you an Authorization Code through the 
|   code query string parameter.
|   https://socialsizzle.herokuapp.com/auth/?code=AQBx-hBsH3...#_
|
|
| # Sample Failed Authentication Redirect
| - _your_redirect_URI_/auth/?error=access_denied
|   &error_reason=user_denied
|   &error_description=The+user+denied+your+request
*/

	public function getAuthURL($scope, $state = null){
		return 'https://api.instagram.com/oauth/authorize?'.
		'client_id='.$this->APP_ID.
		'&redirect_uri='.$this->REDIRECT_URI.
		'&scope=user_profile,'.implode(',', $scope).
		'&response_type=code'.
    ($state ? '&state='.$state : '');
	}

/*
|--------------------------------------------------------------------------
| Generate Access Token
|--------------------------------------------------------------------------
|
| This method will return a short-lived access token and user ID based on the 
| code parameter in the redirect URI.
|
| # Properties:
| - $code (string)
|   The authorization code we passed you in the code parameter when redirecting 
|   the user to your redirect_uri
|
| # Sample Success Response
|   If successful, the API will return a JSON payload containing 
|   the app user's short-lived access token and User ID.
|   {
|     "access_token": "IGQVJ...",
|     "user_id": 17841405793187218
|   }
|
| # Sample Rejected Response
|   If the request is malformed in some way, the API will return an error.
|
|   {
|     "error_type": "OAuthException",
|     "code": 400,
|     "error_message": "Matching code was not found or was already used"
|   }
*/

	public function getAccessToken($code){
		$curl = curl_init();

		curl_setopt_array($curl, array(
  			CURLOPT_URL => "https://api.instagram.com/oauth/access_token",
  			CURLOPT_RETURNTRANSFER => true,
  			CURLOPT_ENCODING => "",
  			CURLOPT_MAXREDIRS => 10,
  			CURLOPT_TIMEOUT => 0,
  			CURLOPT_FOLLOWLOCATION => true,
  			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  			CURLOPT_CUSTOMREQUEST => "POST",
  			CURLOPT_POSTFIELDS => 'client_id='.$this->APP_ID.
  			'&client_secret='.$this->APP_SECRET.
  			'&grant_type=authorization_code'.
  			'&redirect_uri='.$this->REDIRECT_URI.
  			'&code='.$code,
  			CURLOPT_HTTPHEADER => array(
    			"Content-Type: application/x-www-form-urlencoded"
  			),
		));

		$response = curl_exec($curl);

		curl_close($curl);

		return $response;
	}


/*
|--------------------------------------------------------------------------
| Generate Long Lived Access Token
|--------------------------------------------------------------------------
|
| This method will exchange a short-lived Instagram User Access Token 
| for a long-lived token. Once you have a long-lived token, you can use it 
| in server-side requests or send it to the client for use there.
|
| # Properties:
| - $access_token (string)
|   The shor-lived access token.
|
| # Sample Response
|   {
|     "access_token":"{long-lived-user-access-token}",
|     "token_type": "bearer",
|     "expires_in": 5183944  // Number of seconds until token expires
|   }
|
*/

  public function getLongLivedToken($access_token){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://graph.instagram.com/access_token?".
      "grant_type=ig_exchange_token".
      "&client_secret=".$this->APP_SECRET."&access_token=".$access_token,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;    
  }

/*
|--------------------------------------------------------------------------
| Get User Profile
|--------------------------------------------------------------------------
|
| This method will get the user's profile based of their ID.
| The user permission must be 'instagram_graph_user_profile' permission 
| (go check getAuthURL() method). The media_count field also requires 
| instagram_graph_user_media' permission.
|
| # Properties:
| - $user_id (string)
|   The user ID
|
| - $access_token (string)
|   The short-lived or long-lived access token.
|
| - $fields (string)
|   A comma-separated list of fields and edges you want returned. 
|   If omitted, default fields will be returned.
|
| # Sample Response
|   A JSON-formatted object containing default and requested fields and edges.
|
|   {
|     "{field}":"{value}",
|     ...
|   }
|
*/

  public function getUser($user_id, $access_token, $fields = []){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://graph.instagram.com/".$user_id.
      "?fields=".implode(',', $fields)."&access_token=".$access_token,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;    
  }

/*
|--------------------------------------------------------------------------
| Get User's Collection of Media
|--------------------------------------------------------------------------
|
| This method will get the user's profile based of their ID.
| The user permission must be 'instagram_graph_user_media, 
| instagram_graph_user_profile' (go check getAuthURL() method).
|
| # Properties:
| - $user_id (string)
|   The user ID
|
| - $access_token (string)
|   The short-lived or long-lived access token.
|
| - $fields (string)
|   A comma-separated list of Media fields you want returned 
|   by field-expansion for each Media node in the result set.
|
| # Sample Response
|   A JSON-formatted object containing an array the of media IDs or the user
|
|   {
|     "data": [
|       {
|         "id": "17895695668004550"
|       },
|       {
|         "id": "17899305451014820"
|       },
|       {
|         "id": "17896450804038745"
|       },
|       {
|         "id": "17881042411086627"
|       }
|     ],
|     "paging": {
|       "cursors": {
|         "after": "MTAxN...",
|         "before": "NDMyN..."
|         },
|       "next": "https://graph.faceb..."
|     }
|   }
|
*/

  public function getUserMedia($user_id, $access_token, $fields = []){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://graph.instagram.com/".$user_id.
      "/media?access_token=".$access_token.'&fields='.implode(',', $fields),
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;   
  }

}