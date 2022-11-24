//import {precacheAndRoute} from 'workbox-precaching';
//precacheAndRoute(self.__WB_MANIFEST);

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName', {
    maxRetentionTime: 24 * 60
  });

  workbox.routing.registerRoute(/http:\/\/localhost:1880\/api/,
    new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  );

  self.addEventListener('message',  function(event){
        console.log("SW Received Message:" + event.data);
        clients.matchAll({ "includeUncontrolled":  true }).then(clients  =>  clients.forEach(client  =>  {
            client.postMessage("Hi from SW");
    }))
      
  });


  self.addEventListener('push', function (event) {
    console.log(`Push received with this data: "${event.data.text()}"`);
  });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}