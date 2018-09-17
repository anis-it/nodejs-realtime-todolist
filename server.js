/**
 * TODO:
    - Quand un client se connecte, il récupère la dernière Todolist connue du serveur
    - Quand un client ajoute une tâche, celle-ci est immédiatement répercutée chez les autres clients
    - Quand un client supprime une tâche, celle-ci est immédiatement supprimée chez les autres clients
 */

var http = require("http");
var express = require("express");
var bodyParser = require("body-parser"); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var server = http.Server(app);
var io = require("socket.io").listen(server);
//on initialise la liste de todo à vide
var todolist = [];

app
  //affiche la todolist
  .get("/", (req, res) => {
    res.render("page.ejs", { todolist: todolist });
  })
 
  /* On redirige vers la todolist si la page demandée n'est pas trouvée 
  .use(function(req, res, next) {
    res.redirect("/");
  });
*/
  // on gere ici la socket
  io.sockets.on("connection", (socket)=>{
    socket.on("add todo",(newTodo)=>{
      console.log("add todo de : "+newTodo)
    })
  })
server.listen(8080);
