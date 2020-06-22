<?php

class GoogleAPI{
	private $APP_ID;
	private $APP_SECRET;
	private $REDIRECT_URI;

	public function __construct($creds){
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
| permission for this app to access their Google account
|
| # Properties:
| - $scope (array of string)
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
|   code query string parameter. Google also pass your the auth state
|   (if there's any), and your auth scope/
|   _your_redirect_URI_?state=your_auth_state&code=_your_scope_&scope=_your_auth_scope
|
| # Sample Failed Authentication Redirect
|   - https://oauth2.example.com/auth?error=access_denied
|
*/

	public function getAuthURL($scope, $state = null){
		return
		'https://accounts.google.com/o/oauth2/v2/auth?'.
		'&redirect_uri='.$this->REDIRECT_URI.
		'&client_id='.$this->APP_ID.		
		'&scope='.implode(' ', $scope).
		'&access_type=offline'.
		'&include_granted_scopes=true'.
		'&response_type=code'.
		($state ? '&state='.$state : '')
		;
	}
/*
|--------------------------------------------------------------------------
| Generate Access Token
|--------------------------------------------------------------------------
|
| This method will return a short-lived access token
|
| # Properties:
| - $code (string)
|   The authorization code we passed you in the code parameter when redirecting 
|   the user to your redirect_uri
|
| # Sample Success Response
|   If successful, the API will return a JSON payload containing 
|   the app user's short-lived access token and User ID.
|	{
|	  "access_token": "you_access_token",
|	  "expires_in": interger,
|	  "scope": "your_auth_scope",
|	  "token_type": "Bearer"
|	}
|
*/
	public function getAccessToken($code){
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://oauth2.googleapis.com/token",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "code=".$code."&client_id=".$this->APP_ID."&client_secret=".$this->APP_SECRET."&redirect_uri=".$this->REDIRECT_URI."&grant_type=authorization_code",
		  CURLOPT_HTTPHEADER => array(
		    "Content-Type: application/x-www-form-urlencoded"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);

		return $response;
	}
}