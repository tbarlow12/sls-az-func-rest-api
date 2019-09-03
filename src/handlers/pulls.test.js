const { handler } = require("./pulls");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

describe("Pull Requests Handler", () => {

  const owner = "serverless";
  const repo = "serverless-azure-functions";
  const pullsResponse = [
    {
      name: "Pull Request 1"
    },
    {
      name: "Pull Request 2"
    }
  ];

  beforeAll(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet(`https://api.github.com/repos/${owner}/${repo}/pulls`)
      .reply(200, pullsResponse);
  });

  it("returns the response from the GitHub pull requests API", async () => {
    context = {
      log: jest.fn()
    };
    req = {
      query: {
        owner: "serverless",
        repo: "serverless-azure-functions"
      }
    };

    await handler(context, req);

    expect(context.res).toEqual({
      status: 200,
      body: pullsResponse,
    });
  });

  it("returns a 400 and instructions if missing params", async () => {
    context = {
      log: jest.fn()
    };
    req = { };

    await handler(context, req);

    expect(context.res).toEqual({
      status: 400,
      body: "Please pass the name of an owner and a repo in the request",
    });
  });
});