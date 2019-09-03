const utils = require("./utils");

describe("Utils", () => {

  it("Gets the parameter from a query string", () => {
    const paramValue = "test";
    const req = {
      query: {
        paramName: paramValue
      }
    };

    expect(utils.getQueryOrBodyParam(req, "paramName")).toEqual(paramValue);
  });

  it("Gets the parameter from the body of the request", () => {
    const paramValue = "test";
    const req = {
      body: {
        paramName: paramValue
      }
    };

    expect(utils.getQueryOrBodyParam(req, "paramName")).toEqual(paramValue);
  });

  it("Returns undefined if parameter not in body or query params", () => {
    const paramValue = "test";
    const req = { };

    expect(utils.getQueryOrBodyParam(req, "paramName")).toBeUndefined();
  });
});