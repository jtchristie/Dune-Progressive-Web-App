$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  

    });
  });

  var pwaSupport = false;

  if ('serviceWorker' in navigator){
    pwaSupport = true;
    navigator.serviceWorker.register('/sw.js').then(function(result){ 
        console.log('Service Worker Registered'); 
        console.log("Scope: " + result.scope);
        }, function(error){
        console.log('Service Worker Registration Failed'); console.log(error.toString());
        });
  } else {
      console.log('Service Worker Not Supported');
  }

  window.onload = function(){
      if (pwaSupport){
          var p = navigator.platform;
          if (p==='iPhone' || p === 'iPad' || p ==='iPod'){
              var lastShown = parseInt(localStorage.getItem('lastShown'));
              var now = new Date().getTime();
              if(isNaN(lastShown) || (lastShown + (1000 * 60 * 60 * 24 * 7)) <= now){
                  document.getElementById('instructions').style.display = 'block';
                  localStorage.setItem('lastShown', now);
              }
          }
      }
  }

  function hideInstructions(){
      document.getElementById('instructions').style.display = 'none';
  }

  var installEvt; window.addEventListener('beforeinstallprompt', function(evt){
    console.log('Before Install Prompt')
    //Store the event
    installEvt = evt;
    //Prevent chrome 67 or less from automatically showing prompt evt.preventDefault();
        //show the install ui
    document.getElementById('addToHomeScreen').style.display = 'block'; });

    function hidePrompt(){
        document.getElementById('addToHomeScreen').style.display = 'none'; 
    }
        
function installApp(){
//hide the install ui
    hidePrompt();
    console.log("Install App called");
    //show the install prompt 
    installEvt.prompt();
    installEvt.userChoice.then(function(result){
    if(result.outcome === 'accepted') console.log('App Installed');
    else
    console.log('App Not Installed');
    });
    installEvt = null;

    window.addEventListener('appinstalled', function(evt){ //The user installed the app
        console.log('App Installed');
    });
}
//clear the saved event - it can't be used again anyway 

