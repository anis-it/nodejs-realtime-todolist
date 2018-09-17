
var http = require("http");
var express = require("express");
var fs = require("fs");
var app = express();
var server = http.Server(app);
var io = require("socket.io").listen(server);
//on initialise la liste de todo à vide
var todolist = [];

// on charge la page html client
app.get("/", function(req, res) {
  fs.readFile("views/client.html", "utf-8", function(error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

/* On redirige vers la todolist si la page demandée n'est pas trouvée 
  .use(function(req, res, next) {
    res.redirect("/");
  });
*/
// on gere ici la socket
io.sockets.on("connection", socket => {
  // a chaque nouvelle connexion on envoi la todolist actuelle
  io.emit("update todolist", todolist);

  // ajout d'une nouvelle tache a la todo
  socket.on("add todo", newTodo => {
    todolist.push(newTodo);
    io.emit("update todolist", todolist);
  });
  
  // supression d'une todo
  socket.on("delete todo", index => {
    todolist.splice(index, 1);
    io.emit("update todolist", todolist);
  });
});
server.listen(8080);
