import body_parser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { Constants } from "./common/Constants.js";
import { CommonResponse } from "./common/Response.js";
import swaggerJsonFile from "./openapi.json" assert { type: "json" };
import Router from "./routes/index.js";

const app = express();
const { urlencoded, json } = body_parser;
const PORT = Constants.STANDARD_VALUES.PORT || 3001; //--define port to run server
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use(Constants.API_VALUES.API, Router);

//--open api documentation for apllication
app.use(
  Constants.API_VALUES.API_DOC,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsonFile)
);

//--error handling for path not exist
app.all("*", (req, res) => {
  const error = new Error(`Requested URL ${req.path} not found!`);
  return CommonResponse.notFound(res, error.message);
});

app.listen(PORT, () => {
  console.info(`Service is listening on port: ${PORT}`);
});
