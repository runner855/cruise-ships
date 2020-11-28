(function exportPort() {
function Port(currentPort) {
    this.currentPort = currentPort;
    this.ships = [];
}

Port.prototype = {
    setSail () {
    this.currentPort = 0;
},
addShip (ship) {
    this.ships.push(ship);
    },
removeShip () {
    this.ships.shift();
        },
};

if(typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
} else {
    window.Port = Port;
}
}());







