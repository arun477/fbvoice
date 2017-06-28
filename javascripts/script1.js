// all scripts uses jquery library

$(document).ready(function(){
  alert("cool");
 
   // this initialize the facebook sdk and cache it locally
   $.ajaxSetup({ cache: true});
   $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '168329377033776',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
    
  });
  
  updateStatusCallback = function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
  }
  else {
    
  }
}

  $("#loginbutton").click(function(){
  	
    FB.login();
    FB.api('/me', {fields: 'last_name'}, function(response) {
  console.log(response);
});
  });

  $("#logoutbutton").click(function(){
    FB.logout();
  });


});