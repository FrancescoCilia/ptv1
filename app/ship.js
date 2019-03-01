/**
 * Ship constructor
 * @param {Number} size
 */
function Ship(size) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.hits = 0;
    this.horizontal = false;
    console.log("[Ship] Ho creato una barca di dimensione: " + size);
}

/**
 * Check if ship is sunk
 * @returns {Boolean}
 */
Ship.prototype.isSunk = function() {
    return this.hits >= this.size;
};

module.exports = Ship;