var Ship = require('./ship.js');
var Settings = require('./settings.js');
var qstring;
var username;
/**
 * Player constructor
 * @param {type} id Socket ID
 */
function Player(id, disposizione) {
    var i;

    this.id = id;
    this.shots = Array(Settings.gridRows * Settings.gridCols);
    this.shipGrid = Array(Settings.gridRows * Settings.gridCols);
    this.ships = [];
    this.username = username;
    qstring = disposizione;

    console.log("[Player] " + qstring);
    for (i = 0; i < Settings.gridRows * Settings.gridCols; i++) {
        this.shots[i] = 0;
        this.shipGrid[i] = -1;
    }

    //if (!this.createRandomShips()) {
    // Random placement of ships failed. Use fallback layout (should rarely happen).
    this.ships = [];
    this.createShips();
    // }
};

/**
 * Fire shot on grid
 * @param {type} gridIndex
 * @returns {Boolean} True if hit
 */
Player.prototype.shoot = function(gridIndex) {
    if (this.shipGrid[gridIndex] >= 0) {
        // Hit!
        this.ships[this.shipGrid[gridIndex]].hits++;
        this.shots[gridIndex] = 2;
        return true;
    } else {
        // Miss
        this.shots[gridIndex] = 1;
        return false;
    }
};

/**
 * Get an array of sunk ships
 * @returns {undefined}
 */
Player.prototype.getSunkShips = function() {
    var i, sunkShips = [];

    for (i = 0; i < this.ships.length; i++) {
        if (this.ships[i].isSunk()) {
            sunkShips.push(this.ships[i]);
        }
    }

    return sunkShips;
};

/**
 * Get the number of ships left
 * @returns {Number} Number of ships left
 */
Player.prototype.getShipsLeft = function() {
    var i, shipCount = 0;

    for (i = 0; i < this.ships.length; i++) {
        if (!this.ships[i].isSunk()) {
            shipCount++;
        }
    }

    return shipCount;
}

/**
 * Create ships and place them randomly in grid
 * @returns {Boolean}
 */
Player.prototype.createRandomShips = function() {
    var shipIndex;

    for (shipIndex = 0; shipIndex < Settings.ships.length; shipIndex++) {
        ship = new Ship(Settings.ships[shipIndex]);

        if (!this.placeShipRandom(ship, shipIndex)) {
            return false;
        }

        this.ships.push(ship);
    }

    return true;
};

/**
 * Try to place a ship randomly in grid without overlapping another ship.
 * @param {Ship} ship
 * @param {Number} shipIndex
 * @returns {Boolean}
 */
Player.prototype.placeShipRandom = function(ship, shipIndex) {
    var i, j, gridIndex, xMax, yMax, tryMax = 25;

    for (i = 0; i < tryMax; i++) {
        ship.horizontal = Math.random() < 0.5;

        xMax = ship.horizontal ? Settings.gridCols - ship.size + 1 : Settings.gridCols;
        yMax = ship.horizontal ? Settings.gridRows : Settings.gridRows - ship.size + 1;

        ship.x = Math.floor(Math.random() * xMax);
        ship.y = Math.floor(Math.random() * yMax);

        if (!this.checkShipOverlap(ship) && !this.checkShipAdjacent(ship)) {
            // success - ship does not overlap or is adjacent to other ships
            // place ship array-index in shipGrid
            gridIndex = ship.y * Settings.gridCols + ship.x;
            for (j = 0; j < ship.size; j++) {
                this.shipGrid[gridIndex] = shipIndex;
                gridIndex += ship.horizontal ? 1 : Settings.gridCols;
            }
            return true;
        }
    }

    return false;
}

/**
 * Check if a ship overlaps another ship in the grid.
 * @param {Ship} ship
 * @returns {Boolean} True if ship overlaps
 */
Player.prototype.checkShipOverlap = function(ship) {
    var i, gridIndex = ship.y * Settings.gridCols + ship.x;

    for (i = 0; i < ship.size; i++) {
        if (this.shipGrid[gridIndex] >= 0) {
            return true;
        }
        gridIndex += ship.horizontal ? 1 : Settings.gridCols;
    }

    return false;
}

/**
 * Check if there are ships adjacent to this ship placement
 * @param {Ship} ship
 * @returns {Boolean} True if adjacent ship found
 */
Player.prototype.checkShipAdjacent = function(ship) {
    var i, j,
        x1 = ship.x - 1,
        y1 = ship.y - 1,
        x2 = ship.horizontal ? ship.x + ship.size : ship.x + 1,
        y2 = ship.horizontal ? ship.y + 1 : ship.y + ship.size;

    for (i = x1; i <= x2; i++) {
        if (i < 0 || i > Settings.gridCols - 1) continue;
        for (j = y1; j <= y2; j++) {
            if (j < 0 || j > Settings.gridRows - 1) continue;
            if (this.shipGrid[j * Settings.gridCols + i] >= 0) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Create ships and place them in grid in a prearranged layout
 */
Player.prototype.createShips = function() {
    this.username = calcolaParametro(qstring, 1);
    var ct1x = Number(calcolaParametro(qstring, 2));
    var ct1y = Number(calcolaParametro(qstring, 3));
    var ct1o = (calcolaParametro(qstring, 4) === "true");
    var ct1size = calcolaParametro(qstring, 5);

    var ct2x = Number(calcolaParametro(qstring, 6));
    var ct2y = Number(calcolaParametro(qstring, 7));
    var ct2o = (calcolaParametro(qstring, 8) === "true");
    var ct2size = calcolaParametro(qstring, 9);

    var ct3x = Number(calcolaParametro(qstring, 10));
    var ct3y = Number(calcolaParametro(qstring, 11));
    var ct3o = (calcolaParametro(qstring, 12) === "true");
    var ct3size = calcolaParametro(qstring, 13);

    var ct4x = Number(calcolaParametro(qstring, 14));
    var ct4y = Number(calcolaParametro(qstring, 15));
    var ct4o = (calcolaParametro(qstring, 16) === "true");
    var ct4size = calcolaParametro(qstring, 17);

    var s1x = Number(calcolaParametro(qstring, 18));
    var s1y = Number(calcolaParametro(qstring, 19));
    var s1o = (calcolaParametro(qstring, 20) === "true");
    var s1size = calcolaParametro(qstring, 21);

    var s2x = Number(calcolaParametro(qstring, 22));
    var s2y = Number(calcolaParametro(qstring, 23));
    var s2o = (calcolaParametro(qstring, 24) === "true");
    var s2size = calcolaParametro(qstring, 25);

    var c1x = Number(calcolaParametro(qstring, 26));
    var c1y = Number(calcolaParametro(qstring, 27));
    var c1o = (calcolaParametro(qstring, 28) === "true");
    var c1size = calcolaParametro(qstring, 29);

    var c2x = Number(calcolaParametro(qstring, 30));
    var c2y = Number(calcolaParametro(qstring, 31));
    var c2o = (calcolaParametro(qstring, 32) === "true");
    var c2size = calcolaParametro(qstring, 33);

    var p1x = Number(calcolaParametro(qstring, 34));
    var p1y = Number(calcolaParametro(qstring, 35));
    var p1o = (calcolaParametro(qstring, 36) === "true");
    var p1size = calcolaParametro(qstring, 37);

    //console.log("[Player] ct1X: " + ct1x + " ct1Y: " + ct1y + ".......... p1X: " + p1x + " p1Y: " + p1y);
    console.log("Valori orizzontali: " + p1o + " " + c2o + " " + c1o + " " + s2o + " " + s1o + ct1o + ct2o + ct3o + ct4o);
    var shipIndex, i, gridIndex, ship,

        x = [p1y, c2y, c1y, s2y, s1y, ct4y, ct3y, ct2y, ct1y], // le x indicano la colonna
        y = [p1x, c2x, c1x, s2x, s1x, ct4x, ct3x, ct2x, ct1x], // le y indicano la riga
        horizontal = [p1o, c2o, c1o, s2o, s1o, ct4o, ct3o, ct2o, ct1o];

    //   x = [1, 3, 5, 8, 8],
    //  y = [1, 2, 5, 2, 8],
    //horizontal = [false, true, false, false, true];
    for (shipIndex = 0; shipIndex < Settings.ships.length; shipIndex++) {
        ship = new Ship(Settings.ships[shipIndex]);
        ship.horizontal = horizontal[shipIndex];
        ship.x = x[shipIndex];
        ship.y = y[shipIndex];

        // place ship array-index in shipGrid

        gridIndex = ship.y * Settings.gridCols + ship.x;
        //console.log(ship.y + "*" + Settings.gridCols + "+" + ship.x + "=" + gridIndex);
        // console.log("direzione Orizzontale?: " + ship.horizontal);
        // console.log("[player] gridIndex: " + gridIndex);
        for (i = 0; i < ship.size; i++) {
            this.shipGrid[gridIndex] = shipIndex;
            gridIndex += ship.horizontal ? 1 : Settings.gridCols;
        }

        this.ships.push(ship);
    }
};

function calcolaParametro(qstring, index) {
    // calcolo l, indice che va dal PRIMO =
    var s = qstring;
    var parts = qstring.split('=');
    parts = parts.slice(0, index);
    var l = (parts.join('=').length) + 1;

    // calcolo lf, indice che va dal PRIMO &
    parts = s.split('&');
    parts = parts.slice(0, index);
    var lf = (parts.join('&').length);

    // prendo la stringa che sta tra l ed lf
    var username = s.substring(l, lf);
    return username;
}

module.exports = Player;