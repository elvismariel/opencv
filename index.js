const cv = require("opencv4nodejs");
const path = require("path");
const cors = require("cors"); // Define quem poderá acessar a aplicação.
const express = require("express");

const app = express();
app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server);




const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);
const FPS = 10;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index-traking-1.html"));
});

app.get("/tracking", (req, res) => {
    res.sendFile(path.join(__dirname, "index-traking-2.html"));
});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode(".jpg", frame).toString("base64");
    
    io.emit("image", image);
}, 1000 / FPS);

app.use("/images", express.static(path.resolve(__dirname, ".","images"))); // Libera acesso aos arquivos staticos da pasta tmp
app.use("/tracking.js-master", express.static(path.resolve(__dirname, ".","tracking.js-master"))); // Libera acesso aos arquivos staticos da pasta tmp

server.listen(3000);