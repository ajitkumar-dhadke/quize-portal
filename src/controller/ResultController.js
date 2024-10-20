import { Constants } from "../common/Constants.js";
import { CommonResponse } from "../common/Response.js";
import { ResultService } from "../service/ResultService.js";

const getResult = async (req, res) => {
  try {
    const resultData = await ResultService.getResult(req, res);

    if (resultData?.internal_error) {
      //--send error response on internal server error at service level
      return CommonResponse.internalServerError(
        res,
        resultData.internal_error.message,
        resultData.internal_error
      );
    } else if (!resultData) {
      //--send error response if data is not available for given input
      return CommonResponse.notFound(
        res,
        Constants.MESSAGE_VALUES.RESOURCE_NOT_EXIST
      );
    } else {
      //--send success response with user's specific quize result data as output
      return CommonResponse.success(
        res,
        Constants.MESSAGE_VALUES.DATA_FETCH_SUCCESS,
        null,
        resultData
      );
    }
  } catch (error) {
    return CommonResponse.internalServerError(res, error.message, error);
  }
};

export const ResultController = {
  getResult
};
