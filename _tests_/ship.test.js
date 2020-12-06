const Ship = require("../src/ship.js");
const Itinerary = require("../src/itinerary.js");

describe("Ship", () => {
  let ship;
  let dover;
  let calais;
  let itinerary;
  let port;

  beforeEach(() => {
    port = {
      removeShip: jest.fn(),
      addShip: jest.fn(),
      dock: jest.fn()
    };

    dover = {
      name: "Dover",
      removeShip: jest.fn(),
      addShip: jest.fn(),
      dock: jest.fn(),
      ships: []
    };

    calais = {
      name: "Calais",
      removeShip: jest.fn(),
      addShip: jest.fn(),
      dock: jest.fn(),
      ships: []
    };

    itinerary = {
      ports: [dover, calais]
    };

    ship = new Ship(itinerary);
  });

  it(" can set sail", () => {
    ship.setSail();

    expect(ship.currentPort).toBeFalsy();
    expect(dover.removeShip).toHaveBeenCalledWith(ship);
  });

  it("can dock at a different port", () => {
    ship.setSail();
    ship.dock();

    expect(ship.currentPort).toBe(calais);

    expect(dover.addShip).toHaveBeenCalledWith(ship);
  });

  it("can't sail further than its itinerary", () => {
    ship.setSail();
    ship.dock();

    expect(() => ship.setSail()).toThrowError("End of itinerary reached");
  });

  it("gets added to port on instantiation", () => {
    expect(dover.addShip).toHaveBeenCalledWith(ship);
  });
});

describe("Ship with ports and an itinerary", () => {
  // Moved this describe block out as it is more difficult to read when nested
  let ship;
  let dover;
  let calais;
  let itinerary;
  let port;

  beforeEach(() => {
    port = {
      addShip: jest.fn(), // Can simplify the mock here as only addShip is needed, dock and remove ship do not get called
      ships: []
    };

    dover = {
      ...port, // In this case it is perfectly fine to share the addShip variable as your tests below are not asserting on
      // the mocks being called
      name: "Dover"
    };

    calais = {
      ...port,
      name: "Calais"
    };

    itinerary = {
      ports: [dover, calais]
    };

    ship = new Ship(itinerary);
  });

  it("can be instantiated", () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it("has a current port", () => {
    const itinerary = new Itinerary([port]);
    const ship = new Ship(itinerary);

    expect(ship.currentPort).toBe(port);
  });
});
