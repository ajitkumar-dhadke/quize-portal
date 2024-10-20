import { Router } from "express";
import { Constants } from "../common/Constants.js";
import { AnswerController } from "../controller/AnswerController.js";
import { QuizeController } from "../controller/QuizeController.js";
import { ResultController } from "../controller/ResultController.js";
import { ValidateApi } from "../schema/ValidateApiSchema.js";

const router = Router();

//--handle route for creating new quize
router.post(
  Constants.API_VALUES.QUIZE,
  ValidateApi.createQuizeSchema,
  QuizeController.createQuize
);

//--handle route to get quize data
router.get(
  Constants.API_VALUES.QUIZE,
  ValidateApi.getQuizeSchema,
  QuizeController.getQuize
);

//--handle route for submiting the answer for specific quize question
router.post(
  Constants.API_VALUES.ANSWER,
  ValidateApi.submitAnswerSchema,
  AnswerController.submitAnswer
);

//--handle route for getting user's result
router.get(
  Constants.API_VALUES.RESULT,
  ValidateApi.getResultSchema,
  ResultController.getResult
);

export default router;
