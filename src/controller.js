(function exportController() {
    function Controller() {
    this.initialiseSea();
}

Controller.prototype = {
    initialiseSea () {
const backgrounds = [
    './images/water0.png',
    './images/water1.png',
];

let backgroundIndex = 0;
window.setInterval(() => {
document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgorundIndex % backgrounds.length]}')`;
backgorundIndex += 1;
}, 1000);

},
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
} else {
    window.Controller = Controller;
}
}());

