const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost/blogDb";

const User = require("./model/user");
const Post = require("./model/post");





let http = require("http");
let server = http.Server(app);

let socketIO = require("socket.io");
let io = socketIO(server);

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

let inAttesa = [];

let utentiCreatori = [];

const utentiOnline = [];


let idPartita = 0;


io.on("connection", socket => {
    console.log("utente connesso");

    socket.join("salaUtentiOnline");

    socket.on("message", function(tokenUtente) {
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("Errore");
            } else {
                let nomeUtente = (jwt.decode(tokenUtente)).username;
                console.log("Ho ricevuto dal client: " + nomeUtente);
                if (utentiOnline.indexOf(nomeUtente) == -1) {
                    utentiOnline.push(nomeUtente);
                }

                socket.broadcast.emit("listaUtentiOnline", utentiOnline);
                io.to(socket.id).emit("listaUtentiOnline", utentiOnline);
                // socket.emit("utenteRiceveLista", utentiOnline);
            }

        })
    });

    socket.on("ricevoPartite", function(tokenUtente) {
        console.log("Dentro la funzione ricevoPartite");
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("Errore");
            } else {
                let nomeUtente = (jwt.decode(tokenUtente)).username;
                console.log("INVIO LA LISTA DELLE PARTITE " + nomeUtente);
                //socket.broadcast.emit("listaPartite", inAttesa);
                io.to(socket.id).emit("listaPartite", inAttesa);
            }

        })
    });



    socket.on("eliminaPartita", function(tokenUtente) {
        console.log("Dentro la funzione eliminaPartita");
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("Errore");
            } else {
                let nomeUtente = (jwt.decode(tokenUtente)).username;

                //let i = utentiPartiteMap.creatore.indexOf(nomeUtente);
                let i = 0;
                while (i < inAttesa.length) {
                    console.log("inAttesa[" + i + "] vale: " + inAttesa[i].nome);
                    if (inAttesa[i].creatore === nomeUtente) {
                        var stanzaDaCancellare = inAttesa[i].nome;


                        console.log("Cancello da inAttesa l'elemento " + i + " che vale: " + inAttesa[i].nome);
                        inAttesa.splice(i, 1);


                        let i2 = utentiCreatori.indexOf(nomeUtente);
                        console.log("elimino da utentiCreatori i2: " + i2);
                        console.log("StanzaDaCancellare: " + stanzaDaCancellare);
                        //let i3 = inAttesa.indexOf(stanzaDaCancellare);

                        utentiCreatori.splice(i2, 1);

                        console.log("Ho cancellato da inAttesa l'elemento in posizione " + i);

                        io.to(socket.id).emit("listaPartite", inAttesa);
                    } else {
                        i++;
                    }

                }



            }

        })
    });


    socket.on('creaPartita', function(tokenUtente) {
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("Errore");
            } else {

                let nomeUtente = (jwt.decode(tokenUtente)).username;

                if (utentiCreatori.indexOf(nomeUtente) > -1) {
                    console.log("Errore, l'utente non puo' creare una partita perchè ne ha gia creata una");
                } else {
                    utentiCreatori.push(nomeUtente);

                    var str_waiting_room = "waitingRoom" + String(idPartita);

                    inAttesa.push({ creatore: nomeUtente, nome: str_waiting_room });
                    console.log("Inserisco " + str_waiting_room + " nella lista dell'utente: " + nomeUtente);


                    // socket.leave('salaUtentiOnline');



                    //socket.join(str_waiting_room);



                    // joinWaitingPlayers(str_waiting_room, socket);
                    idPartita++;

                    socket.broadcast.emit("listaPartite", inAttesa);
                }

            }
        })

    })

    socket.on("joinPartita", function(tokenUtente, partita) {
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("errore");
            } else {
                let nomeUtente = (jwt.decode(tokenUtente)).username;

                // cerco il nomeUtente del creatore della stanza

                for (var i = 0; i < inAttesa.length; i++) {
                    if (inAttesa[i].nome === partita) {
                        console.log("L'utente " + nomeUtente + " si unisce alla stanza " + partita);
                    }
                }

                // se la stanza è aperta allora joino i 2 utenti
                // cancello dall'array (utentiPartiteMap) l'oggetto con la partita
            }
        })
    });

    socket.on("cancellaUtenteOnline", function(tokenUtente) {
        jwt.verify(tokenUtente, 'my_secret_key', function(err, data) {
            if (err) {
                console.log("errore");
            } else {
                let nomeUtente = (jwt.decode(tokenUtente)).username;
                var index = utentiOnline.indexOf(nomeUtente);
                if (index > -1) {
                    utentiOnline.splice(index, 1);
                }
                socket.broadcast.emit("listaUtentiOnline", utentiOnline);
            }
        })

    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log("DIO CANEEEEEEEEEEEEEEEEEE: " + port);
});

/*Parte modificato */
/*const Reg = require('./model/registation');*/
/*Fine*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




function getClientsInRoom(room) {
    var clients = [];
    //console.log("[dentro getClientsInRoom] ----> " + io.sockets.adapter.rooms[room].length);
    /* for (var id in io.sockets.adapter.rooms[room]) {
         clients.push(io.sockets.adapter.nsp.connected[id]);
     }
     
     return clients;
     */
    return (io.sockets.adapter.rooms[room].length);
}

app.post('/api/osvaldo', (req, res) => {
    console.log("/api token: " + JSON.stringify(req.body));
});

app.post('/api/login', (req, res) => {
    const token = jwt.sign(req.body, 'my_secret_key');
    console.log("[SERVER] token generato: " + token);
    console.log("TOKEN DEGENERATO: " + JSON.stringify(jwt.decode(token)));
    console.log("controllo: " + JSON.stringify(jwt.verify(token, 'my_secret_key')));
    res.json({
        token: token
    });
});

app.post('/api/protected', (req, res) => {
    let mtoken = req.body.token;
    console.log("[SERVER /api/protected] token: " + req.body.token);
    console.log('jwt.decode(token) ' + JSON.stringify(jwt.decode(mtoken)));
    console.log('stampo username: ' + (jwt.decode(mtoken)).username);
    jwt.verify(mtoken, 'my_secret_key', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'this is protected!'
            });
        }
    })
});

/*modificato per verificare se username gia esiste */
app.post("/api/user/gia_esiste", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function() {
        /*if(err) throw err;*/
        User.find({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            },
            function(err, user) {
                if (err) throw err;
                if (user.length === 1) {
                    return res.status(200).json({
                        status: "gia_esiste",
                        //data: user
                        message: "Utente registrato gia esiste"
                    });
                } else {
                    return res.status(200).json({
                        status: "utente_registrato",
                        message: "Login riuscito"
                    });
                }
            }
        );
    });
});

/*fine*/



app.post("/api/user/login", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        /*	if(err) throw err;*/
        User.find({
                username: req.body.username,
                password: req.body.password
            },
            function(err, user) {
                if (err) throw err;
                if (user.length === 1) {
                    const token = jwt.sign(req.body, 'my_secret_key');
                    return res.status(200).json({
                        status: "success",
                        data: user,
                        token: token
                    });
                } else {
                    return res.status(200).json({
                        status: "fail",
                        message: "Login Failed"
                    });
                }
            }
        );
    });
});

app.post("/api/user/create", (req, res) => {
    console.log("scrivo isIngame:");
    console.log("[Registrazioe SERVER]: " + JSON.stringify(req.body));

    console.log(
        "isingame: " +
        req.body.isingame +
        " isonline: " +
        req.body.isonline +
        " perse: " +
        req.body.perse
    );
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        console.log("GIOCATE: " + req.body.isingame);
        console.log("[Registrazioe SERVER 1]: " + JSON.stringify(req.body));
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            vinte: req.body.vinte,
            perse: req.body.perse,
            giocate: req.body.giocate,
            isonline: req.body.isonline,
            isingame: req.body.isingame,
            admin: req.body.admin
        });
        user.save((err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        });
        console.log("[Registrazioe SERVER controllo]: " + JSON.stringify(user));
    });
});

app.post("/api/post/createPost", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        const post = new Post({
            title: req.body.title,
            description: req.body.description
        });
        post.save((err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        });
    });
});

/*Parte modificato da dhali*/
/*
app.post('/api/registation/createRegistation', (req, res) => {
	mongoose.connect(url, function(err){
		if(err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})*/
/*fine qui */

app.post("/api/post/updatePost", (req, res) => {
    console.log("sono sul server updatePost");
    console.log(JSON.stringify(req.body));
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        Post.update({ _id: req.body.id }, { title: req.body.title, description: req.body.description },
            (err, doc) => {
                if (err) throw err;
                return res.status(200).json({
                    status: "success",
                    data: doc
                });
            }
        );
    });
});

app.post("/api/post/updateVinte", (req, res) => {
    console.log("sono sul server!");
    console.log(JSON.stringify(req.body));
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        User.update({ name: req.body.username }, {
                isonline: req.body.isonline
            },
            (err, doc) => {
                if (err) throw err;
                return res.status(200).json({
                    status: "success",
                    data: doc
                });
            }
        );
    });
});


// mette isOnline a FALSE
app.post("/api/post/updateIsOnline", (req, res) => {
    console.log("AGGIORNO ISONLINE A FALSE!");
    console.log(JSON.stringify(req.body));
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        User.update({ name: req.body.username }, {
                isonline: req.body.isonline
            },
            (err, doc) => {
                if (err) throw err;
                return res.status(200).json({
                    status: "success",
                    data: doc
                });
            }
        );
    });
});

app.post("/api/post/getAllPost", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        Post.find({}, [], { sort: { _id: -1 } }, (err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        });
    });
});

app.post("/api/post/getClassifica", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        User.find({}, [], { sort: { vinte: -1 } }, (err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        }).limit(10);
    });
});

app.post("/api/post/getAllUserOnline", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        User.find({ isonline: true }, [], {}, (err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        });
    });
});

app.post("/api/post/deletePost", (req, res) => {
    mongoose.connect(url, { useMongoClient: true }, function(err) {
        if (err) throw err;
        User.findByIdAndRemove(req.body.id, (err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: "success",
                data: doc
            });
        });
    });
});
// prova

// fine prova

app.listen(3000, () => console.log("Blog server running on port 3000!"));