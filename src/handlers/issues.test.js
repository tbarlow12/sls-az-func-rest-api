const { handler } = require("./issues");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

describe("Issues Handler", () => {

  const owner = "serverless";
  const repo = "serverless-azure-functions";
  const issuesResponse = [
    {
      name: "Issue 1"
    },
    {
      name: "Issue 2"
    }
  ];

  beforeAll(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet(`https://api.github.com/repos/${owner}/${repo}/issues`)
      .reply(200, issuesResponse);
  });

  it("returns the response from the GitHub issues API", async () => {
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
      body: issuesResponse,
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