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
      $("#frontcover").css("display","none");
      $("#loginbutton").hide();
      $(".frontlogin").hide();
      $("#prof").hide();

     FB.login(function(response) {
      $.userDetails = response;
      if (response.authResponse) {
        console.log('Access Token: ' + response.authResponse.accessToken);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
     console.log('Logged in.');
     FB.api('/me', {fields: 'first_name,name,picture.type(large),cover,age_range,gender,birthday'}, function(response) {
      console.log(response);
      $.responses = response;
      $.url = response.picture.data.url;
      $.nn = response.name;
      $.cov  = response.cover.source;
      $.age1 = response.age_range.min;
      $.gen = response.gender;
    /*  $.birth = response.birthday;
      $.birth = $.birth.split("/");
      $.birth = $.birth[2];
      $.birth = parseInt($.birth);
      $.ageday = 2017 - $.birth; */
      $("#loginbutton").hide();
      $("#user").show();
      $("#logoutbutton").show();
      $("#username").text($.responses.first_name);
      $("#profileimg").attr("src",$.url);
      $("#name").text($.nn);
      $("#prof1").attr("src",$.url);
      $("#profession").text($.ff);
      $("#item3-a").css("background-image",'url('+$.cov+')');
      $("#age").text($.age1 +" "+'\+');
      if($.gen ==="male"){
       $("#gender").attr("src","images/maleicon.png");
     } else{
       $("#gender").attr("src","images/femaleicon.png");
     }

   });
   }
   else {
    //FB.login(function(){}, {scope: 'publish_actions'});
    FB.login(function(response) {
      $.userDetails = response;
      if (response.authResponse) {
        console.log('Access Token: ' + response.authResponse.accessToken);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
}

$("#loginbutton").click(function(){
 FB.getLoginStatus(updateStatusCallback);
  


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
      $("#micke1").removeClass("mickani");
      $("#micke1").stop();
      $.result = e.results[0][0].transcript
      console.log($.result);
      $.resultparts = $.result.split(" ");
      console.log($.resultparts);
      if($.resultparts[0]==="post" || $.resultparts[0]==="posts" || $.resultparts[0]==="past" || $.resultparts[0]==="first"){
        $.resultparts.shift();
        $.ree = $.resultparts.join(" ");
        FB.login(function(){
          FB.api('/me/feed', 'post', {message: $.ree});
        }, {scope: 'publish_actions'});

        
        $("#item4-b").html("<h1 id='post'>" +"<span id='msg'> message</span> : " +" " +$.ree +" " + "has been successfully posted"+"</h1>" );
        FB.getLoginStatus(updateStatusCallback2);
      } else if($.resultparts[0]==="feed" || $.resultparts[0]==="feet" || $.resultparts[0]==="field" || $.resultparts[0]==="set" || $.resultparts[0]==="speed" || $.resultparts[0]==="Shahid" || $.resultparts[0]==="feel" || $.resultparts[0]==="seed" || $.resultparts[0]==="read" || $.resultparts[0]==="food"){
        FB.api(
          '/me',
          'GET',
          {"fields":"posts.limit(3){from,message}"},
          function(response) {
           console.log(response);
           $.fee = response.posts.data;
           $("#vid").hide();
           $("#post").hide();
           $(".feed").hide();
           for (let i in $.fee){
            
            $("#item4-b").append("<h2 class='feed'>" +"<span id='feedname'>"+ $.fee[i].from.name+"</span>" +" "+":"+" "+ $.fee[i].message +"</h2>");

          }

        }
        );
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

$("#micke1").click(function(){
 $(this).addClass("mickani");


});



updateStatusCallback2 = function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');

    FB.api('/me/feed', 'post', {message: $.ree});   


  }
  else {
    FB.login();
  }
}






$("#gender").click(function(){




});


});
