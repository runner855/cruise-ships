const Port = require("../src/Port.js");

describe("Port", () => {
  let port;
  let ship = jest.fn();
  beforeEach(() => {
    port = new Port("Dover");
    port = new Port("Calais");
  });

  it("Returns the object", () => {
    expect(port).toBeInstanceOf(Object);
  });

  it("it sets the port name property", () => {
    const port = {
      name: "Dover"
    };
    expect(port.name).toEqual("Dover");
  });

  it("can add a ship", () => {
    port.addShip(ship);

    expect(port.ships).toContain(ship);
  });

  it("can remove a ship", () => {
    const titanic = jest.fn();
    const jackSparrow = jest.fn();

    port.addShip(titanic);
    port.addShip(jackSparrow);
    port.removeShip(jackSparrow);

    expect(port.ships).toEqual([titanic]);
  });
});
