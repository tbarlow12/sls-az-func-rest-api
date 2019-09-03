const utils = require("../utils");
const axios = require("axios");

module.exports.handler = async (context, req) => {
  context.log("Issue Handler hit");

  const owner = utils.getQueryOrBodyParam(req, "owner");
  const repo = utils.getQueryOrBodyParam(req, "repo");

  if (owner && repo) {
    const response = await axios({
      url: `https://api.github.com/repos/${owner}/${repo}/issues`,
      method: "get"
    });
    context.res = {
      status: 200,
      body: response.data
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass the name of an owner and a repo in the request"
    };
  }
};
