const Port = require("../src/Port.js");
const Itinerary = require("../src/Itinerary.js");

describe("Itinerary", () => {
  let port;
  let itinerary;
  let dover;
  let calais;
  let mock;

  beforeEach(() => {
    port = new Port("Dover");
    port = new Port("Calais");
    dover = new Port("Dover");
    calais = new Port("Calais");
    mock = jest.fn();
  });

  it("can be instantiated", () => {
    expect(new Port("Calais")).toBeInstanceOf(Object);
  });

  it("can have  ports ", () => {
    itinerary = new Itinerary([dover, calais, mock]);

    expect(itinerary.ports).toEqual([dover, calais, mock]);
  });
});
