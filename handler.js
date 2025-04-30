const serverless = require("serverless-http");
const express = require("express");
const app = express();

const aws = require("aws-sdk");
const dynamoDB = new aws.DynamoDB.DocumentClient();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Probando el deploy, quiero saber si funciona bien el framwork",
  });
});

app.get("/users", (req, res) => {
  const params = {
    TableName: "crud-serverless-users-table",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "1",
    },
  };

  return dynamoDB
    .query(params)
    .promise()
    .then((res) => {
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({ user: res }),
      };
    });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
