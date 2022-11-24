window.addEventListener('load', () => {
    var p1 = document.getElementById("treshT");
    var p2 = document.getElementById("currentT");
    var s1 = document.getElementById("myRange");
    let button = document.getElementById('postButton');
    let notificationsBtn = document.getElementById('notificationsBtn');

    s1.addEventListener('change', () => {p1.innerHTML = s1.value;});

    window.setInterval(()=>{
      fetch("https://proud-river-03cf1e803.2.azurestaticapps.net:3000/api", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'treshHoldTemperature': s1.value})
        }).then(res => res.json())
            .then(response => {
              p2.innerHTML = response.temperature;
            })
    },1000);

    button.onclick = () => {

      applicationServerPublicKey = "BHxRUqXdISVaGVf_reDWgKDsMHjgaB1K59B08vpYOOgwtv4tMW6pz3FzK475lUG3ekSM-kv5CHOLiQJbI_Z3PfM";
      (function subscribeUser() {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        navigator.serviceWorker.getRegistration().then((registration) => registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        }))
          .then(function (subscription) {
            console.log('User is subscribed. subscription:' + JSON.stringify(subscription));
            fetch("https://proud-river-03cf1e803.2.azurestaticapps.net:3000/register", {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(subscription)
            }).then(res => res.text())
              .then(response => console.log('Success:', response))
              .catch(error => console.error('Error registering:', error));
            isSubscribed = true;
          })
          .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
          });
      })();
    };

    if (!('Notification' in window)) {
    } else if (Notification.permission === 'denied') {
    } else if (Notification.permission === 'granted') {
        notificationsBtn.style.display = 'none';
    }
    notificationsBtn.addEventListener('click', () => {
        Notification.requestPermission();
    });

    //window.setInterval(()=>{navigator.serviceWorker.controller.postMessage('Hi from client')},5000);

    navigator.serviceWorker.addEventListener('message', (event) => {
                console.log(event.data);
              });
   // window.setInterval(()=>{var myNotification = new Notification("hi", {body : 'Hi student'});},5000);
});

function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}