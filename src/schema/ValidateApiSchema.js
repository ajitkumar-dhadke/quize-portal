import Joi from "joi";
import { Constants } from "../common/Constants.js";
import { CommonResponse } from "../common/Response.js";

const createQuizeSchema = async (req, res, next) => {
  //-- validate input parameters to create quize
  const schema = Joi.object()
    .keys({
      quize_id: Joi.number().integer().required(),
      title: Joi.string().required(),
      questions: customJoi
        .array()
        .min(5)
        .required()
        .items(
          customJoi.object({
            question_id: Joi.number().integer().required(),
            text: Joi.string().required(),
            options: Joi.array().min(4).max(4).items(Joi.string().required()),
            correct_option: Joi.number().integer().min(1).max(4).required()
          })
        )
        .uniqueId()
    })
    .unknown(false);

  const { error } = schema.validate(req.body);
  if (error) {
    const { details } = error;
    //--send error response if validation fails
    return CommonResponse.badRequest(
      res,
      Constants.MESSAGE_VALUES.VALIDATION_FAIL,
      details
    );
  } else {
    next();
  }
};

const customJoi = Joi.extend((joi) => ({
  //--custom-validattion to avoid same question id in quize
  type: "array",
  base: joi.array(),
  messages: {
    "array.duplicateId": "{{#label}} contains duplicate IDs."
  },
  rules: {
    uniqueId: {
      validate(value, helpers) {
        const ids = value.map((item) => item.question_id);
        const uniqueIds = new Set(ids);
        if (uniqueIds.size !== ids.length) {
          return helpers.error("array.duplicateId");
        }
        return value;
      }
    }
  }
}));

const getQuizeSchema = async (req, res, next) => {
  //-- validate input parameters to get quize data
  const schema = Joi.object()
    .keys({
      quize_id: Joi.number().integer().required()
    })
    .unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    const { details } = error;
    //--send error response if validation fails
    return CommonResponse.badRequest(
      res,
      Constants.MESSAGE_VALUES.VALIDATION_FAIL,
      details
    );
  } else {
    next();
  }
};

const submitAnswerSchema = async (req, res, next) => {
  //-- validate input parameters to submit answer
  const schema = Joi.object()
    .keys({
      user_id: Joi.number().integer().required()
    })
    .unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    //--send error response if validation fails for query parameters
    const { details } = error;
    return CommonResponse.badRequest(
      res,
      Constants.MESSAGE_VALUES.VALIDATION_FAIL,
      details
    );
  } else {
    const schema = Joi.object()
      .keys({
        quize_id: Joi.number().integer().required(),
        question_id: Joi.number().integer().required(),
        answer_id: Joi.number().integer().min(1).max(4).required()
      })
      .unknown(false);
    const { error } = schema.validate(req.body);
    if (error) {
      //--send error response if validation fails for body parameters
      const { details } = error;
      return CommonResponse.badRequest(
        res,
        Constants.MESSAGE_VALUES.VALIDATION_FAIL,
        details
      );
    } else {
      next();
    }
  }
};

const getResultSchema = async (req, res, next) => {
  //-- validate input parameters to get result data
  const schema = Joi.object()
    .keys({
      user_id: Joi.number().integer().required(),
      quize_id: Joi.number().integer().required()
    })
    .unknown(false);
  const { error } = schema.validate(req.query);
  if (error) {
    //--send error response if validation fails for input parameters
    const { details } = error;
    return CommonResponse.badRequest(
      res,
      Constants.MESSAGE_VALUES.VALIDATION_FAIL,
      details
    );
  } else {
    next();
  }
};

export const ValidateApi = {
  createQuizeSchema,
  getQuizeSchema,
  submitAnswerSchema,
  getResultSchema
};
