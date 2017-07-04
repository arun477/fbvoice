//required functions



//--------------------------------------------
 //sdk for google map api

   var map, infoWindow;
     function initMap() {
        map = new google.maps.Map(document.getElementById('item3-c'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      } 
 // $("body").append(" <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDyofQaKTXm33Xy3iVkJr3j6xh818dfftg&callback=initMap'></script>");

//-------------------------------------------




// all scripts uses jquery library

$(document).ready(function(){


  //map api section


    
   
   $("body").append(" <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDyofQaKTXm33Xy3iVkJr3j6xh818dfftg&callback=initMap'></script>");
    

  //--------------------------------------
  //facebook api section 
 
  
    var responses;
   // this initialize the facebook sdk and cache it locally
   $.ajaxSetup({ cache: true});
   $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '168329377033776',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    
    
  });

  
  updateStatusCallback = function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
     FB.api('/me', {fields: 'first_name,name,picture.type(large),cover,age_range,gender'}, function(response) {
  console.log(response);
   $.responses = response;
   $.url = response.picture.data.url;
   $.nn = response.name;
   $.cov  = response.cover.source;
   $.age = response.age_range.min;
   $.gen = response.gender;
   $("#loginbutton").hide();
   $("#user").show();
   $("#logoutbutton").show();
   $("#username").text($.responses.first_name);
   $("#profileimg").attr("src",$.url);
   $("#name").text($.nn);
       $("#prof1").attr("src",$.url);
       $("#profession").text($.ff);
       $("#item3-a").css("background-image",'url('+$.cov+')');
       $("#age").text($.age);
       if($.gen ==="male"){
       $("#gender").attr("src","images/maleicon.png");
     } else{
       $("#gender").attr("src","images/femaleicon.png");
     }
  
});
  }
  else {
    FB.login(function(){}, {scope: 'publish_actions'});
  }
}

  $("#loginbutton").click(function(){
  	FB.getLoginStatus(updateStatusCallback,{scope: 'publish_actions'});

    

  });

  

  $("#logoutbutton").click(function(){
    FB.logout();
  });


//--------------------------------------------------
// web speech api second

$("#micke1").click(function(){

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        $.result = e.results[0][0].transcript
       console.log($.result);
       $.resultparts = $.result.split(" ");
       console.log($.resultparts);
       if($.resultparts[0]==="post"){
        $.resultparts.shift();
        $.ree = $.resultparts.join(" ");
      
        $.roo = FB.login;
        
        $("#textare").html("message : " +" " +$.ree +" " + "successfully posted");
        $("#textare").change($.roo(function(){
  FB.api('/me/feed', 'post', {message: $.ree});
}, {scope: 'publish_actions'}););

       }
       
        recognition.stop();
        
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
});

// for other events
 $("#item4-c").hide();

$("#cmdlist").click(function(){
  $("#item4-c").slideToggle(1500);
});




});
