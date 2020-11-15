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
        if ('Notification' in window){
            console.log('Notifications Supported');
            Notification.requestPermission(function(status){
                console.log('Notification Permission: ', status);
            });
            var options = {
                body: 'Welcome to Arrakis',
                icon: 'android-chrome-192x192.png',
                data: {
                    timestamp: Date.now(),
                    loc: 'index.html'
                },
                action: [
                    {action: 'go', title: 'Go Now'}
                ]
            }
        }
        notify('Dune', options);

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

function notify(title, options){
    if(Notification.permission === 'granted'){
        navigator.serviceWorker.ready.then(function(reg){
            reg.showNotification(title, options);
        });

        }
}

function closeNotification(msg,evt){
    console.log(msg, evt.notification.data);
    evt.notification.close();
}

self.addEventListener('notificationclose', function(evt){
    closeNotification('Notification Closed', evt);
});

self.addEventListener('notificationclick', function(evt){ 
    if(evt.action !== 'close'){
         evt.waitUntil(
         self.clients.matchAll({type: 'window', includeUncontrolled:
         true})
    .then(function(allClients){
         console.log(allClients);
          for(var i=0; i< allClients.length; i++){
             if(allClients[i].visibilityState === 'visible'){
              console.log('Navigating'); allClients[i].navigate(evt.notification.data.loc); //No need to continue
          break;
              } 
          }
        }));
    }
    closeNotification('Notification Clicked', evt);
 });

