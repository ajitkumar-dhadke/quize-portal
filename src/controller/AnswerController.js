import { Constants } from "../common/Constants.js";
import { CommonResponse } from "../common/Response.js";
import { AnswerService } from "../service/AnswerService.js";

const submitAnswer = async (req, res) => {
  try {
    const answerDetails = await AnswerService.submitAnswer(req, res);

    if (answerDetails?.error) {
      //--send error response on any data related error from service
      return CommonResponse.badRequest(
        res,
        answerDetails.error.message,
        answerDetails.error.details
      );
    } else if (answerDetails?.internal_error) {
      //--send error response on internal server error at service level
      return CommonResponse.internalServerError(
        res,
        answerDetails.internal_error.message,
        answerDetails.internal_error
      );
    } else {
      return CommonResponse.created(
        //--send success response on answer record creation with proper output
        res,
        Constants.MESSAGE_VALUES.RECORD_CREATED,
        answerDetails
      );
    }
  } catch (error) {
    return CommonResponse.internalServerError(res, error.message, error);
  }
};

export const AnswerController = {
  submitAnswer
};
