var webPush = require('web-push');

var pushSub = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/deJWCUNNQFA:APA91bEF8oVGT6mk0QJMTiGaUFaz4x2Fyg9hFXGs1xtJv8vpRlE6Vp83ORV4PpnRq85rSlSM2O23ZfISzcrn60Dymy613GyBwvg8HB81oQuE_M9a1j27hKvu-rYFug29TiVkpwEpj1yB",
    "expirationTime":null,
    "keys":{
        "p256dh":"BDlJD_f_oP46ZseQrmIsSc_eNW-6njeTexZcgzad317aBLBnWz-0dMyj6iK21vQwbf4ZsfnQbBq3wZOxqlg8QQ0",
        "auth":"XtaRXHTOxTgg3wYipVkKLw"
    }
};
var options = {
  vapidDetails: {
    subject: 'mailto:jtchristiedev@gmail.com',
    publicKey: 'BJ6g_JtXsnhlgjUJoNh6bsVlt_MFO4ese6Of8mQH2ZCmHA0cuBBbyDBstQwAgKBxeByKZJ_Ra_fx7xpemqObqhw',
    privateKey: 'ktD-NL7IXnShgLfd88axqE3DLROFBWc2ydVSS8iYmbk'
  },
  TTL: 60
};

var payload = 'index.html#programs';

webPush.sendNotification(pushSub, payload, options);

//gcmAPIKey: 'AAAAiiHEZlY:APA91bE_j82pR4mfSE1s3iIii1xyuTYo767ghAp0oiZyYTJSbQuiSyGgH8o9W6h2cBIXEKhROAMs0yNMx6YbmCJS0jgwXiS1jl9y5vYc4CHzO6mhufU79D8xx9_J899vNZYHeXbaqFfO'

