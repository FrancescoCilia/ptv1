var Player = require('./player.js');
var Settings = require('./settings.js');
var GameStatus = require('./gameStatus.js');
var usrG1;
var usrG2;
var idPlayer1;
var idPlayer2;

/**
 * BattleshipGame constructor
 * @param {type} id Game ID
 * @param {type} idPlayer1 Socket ID of player 1
 * @param {type} idPlayer2 Socket ID of player 2
 */
function BattleshipGame(id, idPlayer1, idPlayer2, disposizioneP1, disposizioneP2, usrG1, usrG2) {
    this.id = id;
    this.currentPlayer = Math.floor(Math.random() * 2);
    this.winningPlayer = null;
    this.gameStatus = GameStatus.inProgress;
    this.usrG1 = usrG1;
    this.usrG2 = usrG2;
    this.idPlayer1 = idPlayer1;
    this.idPlayer2 = idPlayer2;
    console.log("[game] username g1: " + usrG1 + "CODICE ID: " + this.idPlayer1);
    console.log("[game] username g2: " + usrG2 + "CODICE ID: " + this.idPlayer2);
    this.players = [new Player(idPlayer1, disposizioneP1), new Player(idPlayer2, disposizioneP2)];
    // console.log("DisposizioneP1: " + disposizioneP1);
    // console.log("DisposizioneP2: " + disposizioneP2);
}

/**
 * Get socket ID of player
 * @param {type} player
 * @returns {undefined}
 */
BattleshipGame.prototype.getPlayerId = function(player) {
    return this.players[player].id;
};

/**
 * Get socket ID of winning player
 * @returns {BattleshipGame.prototype@arr;players@pro;id}
 */
var jqueryVar;
BattleshipGame.prototype.getWinnerId = function() {
    if (this.winningPlayer === null) {
        return null;
    }
    var idVincitore = this.players[this.winningPlayer].id;
    console.log("QUALCHEDUNO HA VINTO: " + idVincitore);

    var gVincitore;
    var gPerdente;
    if (idVincitore == idPlayer1) {
        console.log("Ha vinto il giocatore1 con username: " + this.usrG1);
        gVincitore = this.usrG1;
        gPerdente = this.usrG2;
    } else {
        console.log("Ha vinto il giocatore2 con username: " + this.usrG2);
        gVincitore = this.usrG2;
        gPerdente = this.usrG1;
    }


    console.log("Il tipo di usrG1 e': " + typeof this.usrG1);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("blogDb");
        var query = { username: gVincitore };
        var query2 = { username: gPerdente };

        dbo.collection("user").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log("[QUERY] " + result);
            this.jqueryVar = JSON.stringify(result);

            var nvinte = 1 + Number(calcolaParametro(this.jqueryVar, 5));
            console.log("VINTE: " + calcolaParametro(this.jqueryVar, 5));

            var ngiocate = 1 + Number(calcolaParametro(this.jqueryVar, 7));
            console.log("GIOCATE: " + calcolaParametro(this.jqueryVar, 7));

            var mq = { username: gVincitore };
            var newvalues = { $set: { vinte: nvinte, giocate: ngiocate } };

            dbo.collection("user").updateOne(mq, newvalues, function(err, res) {
                if (err) throw err;
                console.log("AGGIORNAMENTO EFFETTUATO SULLE VINTE");
            });
            // db.close();
        });

        dbo.collection("user").find(query2).toArray(function(err, result) {
            if (err) throw err;
            this.jqueryVar = JSON.stringify(result);

            var nperse = 1 + Number(calcolaParametro(this.jqueryVar, 6));
            console.log("PERSE: " + calcolaParametro(this.jqueryVar, 6));

            var ngiocate = 1 + Number(calcolaParametro(this.jqueryVar, 7));
            console.log("GIOCATE: " + calcolaParametro(this.jqueryVar, 7));

            var mq = { username: gPerdente };
            var newvalues = { $set: { perse: nperse, giocate: ngiocate } };

            dbo.collection("user").updateOne(mq, newvalues, function(err, res) {
                if (err) throw err;
                console.log("AGGIORNAMENTO EFFETTUATO SULLE PERSE");
            });
            db.close();
        });

    });

    /**
     * var myquery = { username: "aa" };
    var newvalues = { $set: { username: "aaNew", vinte: 100 } };
    dbo.collection("user").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
     */

    console.log("FUORI: " + this.jqueryVar);



    return this.players[this.winningPlayer].id;
};

function calcolaParametro(qstring, index) {
    // calcolo l, indice che va dal PRIMO =
    var s = qstring;
    var parts = qstring.split(':');
    parts = parts.slice(0, index);
    var l = (parts.join(':').length) + 1;

    console.log("QSTRING: " + qstring);
    // calcolo lf, indice che va dal PRIMO &
    parts = s.split(',');
    parts = parts.slice(0, index);
    var lf = (parts.join(',').length);

    // prendo la stringa che sta tra l ed lf
    console.log("l ha indice: " + l + " lf indice: " + lf);
    var username = s.substring(l, lf);

    return username;
}

/**
 * Get socket ID of losing player
 * @returns {BattleshipGame.prototype@arr;players@pro;id}
 */
BattleshipGame.prototype.getLoserId = function() {
    if (this.winningPlayer === null) {
        return null;
    }
    var loser = this.winningPlayer === 0 ? 1 : 0;
    return this.players[loser].id;
};

/**
 * Switch turns
 */
BattleshipGame.prototype.switchPlayer = function() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
};

/**
 * Abort game
 * @param {Number} player Player who made the request
 */
BattleshipGame.prototype.abortGame = function(player) {
    // give win to opponent
    this.gameStatus = GameStatus.gameOver;
    this.winningPlayer = player === 0 ? 1 : 0;
}

/**
 * Fire shot for current player
 * @param {Object} position with x and y
 * @returns {boolean} True if shot was valid
 */
BattleshipGame.prototype.shoot = function(position) {
    console.log("Sono dentro a SHOOT");
    var opponent = this.currentPlayer === 0 ? 1 : 0,
        gridIndex = position.y * Settings.gridCols + position.x;

    if (this.players[opponent].shots[gridIndex] === 0 && this.gameStatus === GameStatus.inProgress) {
        // Square has not been shot at yet.
        if (!this.players[opponent].shoot(gridIndex)) {
            // Miss
            this.switchPlayer();
        }

        // Check if game over
        if (this.players[opponent].getShipsLeft() <= 0) {
            this.gameStatus = GameStatus.gameOver;
            this.winningPlayer = opponent === 0 ? 1 : 0;
        }

        return true;
    }

    return false;
};

/**
 * Get game state update (for one grid).
 * @param {Number} player Player who is getting this update
 * @param {Number} gridOwner Player whose grid state to update
 * @returns {BattleshipGame.prototype.getGameState.battleshipGameAnonym$0}
 */
BattleshipGame.prototype.getGameState = function(player, gridOwner) {
    return {
        turn: this.currentPlayer === player, // is it this player's turn?
        gridIndex: player === gridOwner ? 0 : 1, // which client grid to update (0 = own, 1 = opponent)
        grid: this.getGrid(gridOwner, player !== gridOwner) // hide unsunk ships if this is not own grid
    };
};

/**
 * Get grid with ships for a player.
 * @param {type} player Which player's grid to get
 * @param {type} hideShips Hide unsunk ships
 * @returns {BattleshipGame.prototype.getGridState.battleshipGameAnonym$0}
 */
BattleshipGame.prototype.getGrid = function(player, hideShips) {
    return {
        shots: this.players[player].shots,
        ships: hideShips ? this.players[player].getSunkShips() : this.players[player].ships
    };
};

module.exports = BattleshipGame;