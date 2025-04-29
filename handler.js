const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Pertenezco a los tests!",
  });
});

exports.handler = serverless(app);
