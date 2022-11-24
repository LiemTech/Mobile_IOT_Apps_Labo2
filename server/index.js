const express = require('express')
const cors = require('cors')
const webPush= require('web-push')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
let subscriptions = [];
var temperature = 30;
var treshHoldTemperature = 40;


app.use(cors())
app.use(bodyParser.json())

const vapidKeys = {
        publicKey:
            'BHxRUqXdISVaGVf_reDWgKDsMHjgaB1K59B08vpYOOgwtv4tMW6pz3FzK475lUG3ekSM-kv5CHOLiQJbI_Z3PfM',
        privateKey: 'ROvhOOttzDA6ytm83JZLmVFz7nmTUbTAexIJ7AFTFkM'
    };
    webPush.setVapidDetails(
        'mailto:liem.nguyen@student.vives.be',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

app.post('/api',(req,res) => {
    res.send({'temperature':temperature});
    treshHoldTemperature = req.body.treshHoldTemperature;
})

app.post('/raspberry',(req,res) => {
    res.send("Data received.");
    temperature = req.body;
    console.log(req.body);
})

app.post('/register',(req,res) => {
    console.log(JSON.stringify(req.body));
        if (!req.body || !req.body.endpoint) {
            // Invalid subscription.
            res.status(400);
            res.send('Invalid subscription');
            return false;
        }
        subscriptions.push(req.body)
        res.send("subscription registered")
        console.log('Subscription registered ' + req.body.endpoint);
})

app.post('/push', function (req, res) {
    subscriptions.forEach(subscription => {
        const notificationText = 'push notification from website';
        webPush.sendNotification(subscription, notificationText).then(function () {
            console.log('Notification sent');
        }).catch(function (error) {
            console.log('Error sending Notification' + error);
        });
    });
    res.send("pushed")
});

setInterval(()=>{

    if(temperature > treshHoldTemperature)
    {
        subscriptions.forEach(subscription => {
            const notificationText = 'Warning! Temperature too high!';
            webPush.sendNotification(subscription, notificationText).then(function () {
                console.log('Notification sent');
            }).catch(function (error) {
                console.log('Error sending Notification' + error);
            });
        });
    }

},60000*30);

app.listen(port, () => console.log(`Server listening on port ${port}.`))


