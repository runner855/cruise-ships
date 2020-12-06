(function exportController() {
  function Controller(ship) {
    this.ship = ship;
    this.initialiseSea();

    document.querySelector("#sailbutton").addEventListener("click", () => {
      this.setSail();
      this.displaymsg();
    });
  }
  Controller.prototype = {
    initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];

      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 500);
    },

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";

      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    },

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );

      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPort = ship.itinerary.ports[nextPortIndex];
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );

      if (!nextPortElement) {
        return this.renderMessage(`Arrived in ${ship.currentPort.name}!`);
        // alert("End of the line!");
      }
      this.renderMessage(`Now departing: ${ship.currentPort.name}`);
      this.displayMsg(`Current Port: ${ship.currentPort.name}`, 0);
      this.displayMsg(`Next Port: ${nextPort.name}`, 1);

      const shipElement = document.querySelector("#ship");

      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.setSail();
          ship.dock();
          clearInterval(sailInterval);
        }

        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    },

    renderMessage(message) {
      const messageElement = document.createElement("div");

      messageElement.id = "message";
      messageElement.innerHTML = message;

      const viewport = document.querySelector("#viewport");
      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000);
    },

    displayMsg(displayPorts, flag) {
      const msgPorts = document.createElement("div");

      msgPorts.id = "displayPorts";
      msgPorts.innerHTML = displayPorts;
      if (flag == 1) {
        msgPorts.style.top = "20px";
      }

      const viewport = document.querySelector("body");
      viewport.appendChild(msgPorts);

      setTimeout(() => {
        viewport.removeChild(msgPorts);
      }, 2000);
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
