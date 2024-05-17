const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const net = require("net");
const cors = require("cors");
const sockets = [];
const app = express();
const path = require("path"); 
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const tcpServer = net.createServer();

app.use(express.json());
app.use(cors());

const date = () => {
  const ahora = new Date();
  const hora = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const segundos = ahora.getSeconds().toString().padStart(2, '0');
  
  return `${hora}:${minutos}:${segundos}`;
};

io.on("connection", (socket) => {
  console.log("-----Nueva conexión Socket.io");
  socket.on("disconnect", () => {
    console.log("Socket.io desconectado");
  });
});

tcpServer.on("connection", (socketTcp) => {
  console.log("Nuevo Dato------------------------");
  sockets.push(socketTcp);
  socketTcp.on("data", (data) => {
    const message = data.toString('utf8');
    var auxArray= [date(), message]
    console.log(auxArray);
    io.emit("newData", auxArray );
  });


  socketTcp.on("end", () => {
    console.log("Conexión TCP cerrada");
    sockets.splice(sockets.indexOf(socketTcp), 1);
  });

  socketTcp.on("error", (err) => {
  });
});

const TCP_PORT = 3000;
tcpServer.listen(TCP_PORT, () => {
  console.log(`Servidor TCP escuchando en el puerto ${TCP_PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const HTTP_PORT = 4000;
server.listen(HTTP_PORT, () => {
  console.log("****************************************************");
  console.log("*                                                  *");
  console.log("*   ███████╗███████╗██████╗ ██╗   ██╗██████╗       *");
  console.log("*   ██╔════╝██╔════╝██╔══██╗██║   ██║██╔══██╗      *");
  console.log("*   █████╗  █████╗  ██████╔╝██║   ██║██████╔╝      *");
  console.log("*   ██╔══╝  ██╔══╝  ██╔══██╗██║   ██║██╔═══╝       *");
  console.log("*   ███████╗███████╗██║  ██║╚██████╔╝██║           *");
  console.log("*   ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝           *");
  console.log("*                                                  *");
  console.log(`* Servidor HTTP/IO escuchando en el puerto ${HTTP_PORT}    *`);
  console.log(`*   Servidor TCP escuchando en el puerto ${TCP_PORT}      *`);
  console.log("*                                                  *");
  console.log("****************************************************");
  
});
