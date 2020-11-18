var fs = require( 'fs' );

var app = require('express')();
var https        = require('https');
var server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
},app);
server.listen(443, "93.115.23.143");

var io = require('socket.io').listen(server);  
var fs = require('fs');
const express = require('express');







 

//------------------------------------------------------------------------------------------------------------------------GŁÓWNE POŁĄCZENIE SOCKET.IO---

            io.on('connection', function(socket){
            console.log('a user connected');

//----------------------------------------------------------------------------------------------------------------------------PEER ADDED


socket.on("peer_added", function(peer_id){



io.emit("peer_added", peer_id)

});


//-----------------------------------------------------------------------------------------------------------PEER INFO


socket.on("peer_info", function(peer_id){

io.emit("peer_info", peer_id)

});





//----------------------------------------------------------------------------------------------------------------------PRZESYŁANIE ICE
    socket.on("ice", function(candidate, remote_peer_id){
   
    io.clients((error,clients) => {
    if (error) throw error;
    if (clients.indexOf(remote_peer_id) != -1) {
    io.sockets.connected[remote_peer_id].emit("ice", candidate);
    };
    });


    });





//----------------------------------------------------------------------------------------------------------------------PRZESYŁANIE OFFER
    socket.on("offer", function(offer, remote_peer_id){
    io.clients((error,clients) => {
    if (error) throw error;
    if (clients.indexOf(remote_peer_id) != -1) {
    io.sockets.connected[remote_peer_id].emit("offer", offer);
    };
    });


    });




//----------------------------------------------------------------------------------------------------------------------PRZESYŁANIE ANSWER
    socket.on("answer", function(answer, remote_peer_id){
    io.clients((error,clients) => {
    if (error) throw error;
    if (clients.indexOf(remote_peer_id) != -1) {
    io.sockets.connected[remote_peer_id].emit("answer", answer);
    };
    });


    });













});





app.use(express.static('public'))


app.get('/', function(req, res){
  res.sendFile(__dirname + '/webrtc.html');
});





