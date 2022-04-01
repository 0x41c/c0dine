var port = process.env.PORT || 667;
var debug = false;

var express = require("express");
const path = require("path");
const app = express();
const https = require("https");
const fs = require('fs');

const options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/fullchain.pem')
};

const server = https.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./source"));

server.listen(port, () => {
	console.log("[SERVER] listening on *:" + port);
});

io.on("connection", (socket) => {

    socket.on("log_normal", function (data) {
        console.log(`[${socket.id}]: ${data}`);
        socket.emit("show_log", data);
    });

    socket.on("error", function(data){
        console.log("[ERROR] " + data);
    });

	console.log("[CLIENT] New client connection... (" + socket.id + ")");
});
