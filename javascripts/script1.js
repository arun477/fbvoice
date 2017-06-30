//required functions

//this is google map api function 

function initMap() {
	var uluru = {lat: lati, lng: longi};
	map = new google.maps.Map(document.getElementById('item3-c'), {
		zoom: 12,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

//--------------------------------------------







// all scripts uses jquery library

$(document).ready(function(){
  
  //sdk for google map api
  $("body").append(" <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDyofQaKTXm33Xy3iVkJr3j6xh818dfftg&callback=initMap'></script>");
  
    var responses;
   // this initialize the facebook sdk and cache it locally
   $.ajaxSetup({ cache: true});
   $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '168329377033776',
      version: 'v2.9' // or v2.1, v2.2, v2.3, ...
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    
    
  });

  
  updateStatusCallback = function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
     FB.api('/me', {fields: 'first_name,name,picture.type(large),cover,hometown'}, function(response) {
  console.log(response);
   $.responses = response;
   $.url = response.picture.data.url;
   $.nn = response.name;
   $.cov  = response.cover.source;
   $.place = response.hometown.name;
   $("#loginbutton").hide();
   $("#user").show();
   $("#username").text($.responses.first_name);
   $("#profileimg").attr("src",$.url);
   $("#name").text($.nn);
       $("#prof1").attr("src",$.url);
       $("#profession").text($.ff);
       $("#item3-a").css("background-image",'url('+$.cov+')');
  
});
  }
  else {
    FB.login();
  }
}

  $("#loginbutton").click(function(){
  	FB.getLoginStatus(updateStatusCallback);

    

  });

  $("#logoutbutton").click(function(){
    FB.logout();
  });


});
