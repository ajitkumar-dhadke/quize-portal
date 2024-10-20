import { Constants } from "../common/Constants.js";
import { CommonResponse } from "../common/Response.js";
import { QuizeService } from "../service/QuizeService.js";

const createQuize = async (req, res) => {
  try {
    const quizeDetails = await QuizeService.createQuize(req, res);

    if (quizeDetails?.internal_error) {
      //--send error response on internal server error at service level
      return CommonResponse.internalServerError(
        res,
        quizeDetails.internal_error.message,
        quizeDetails.internal_error
      );
    } else {
      return CommonResponse.created(
        //--send success response on quize record creation with returning quize_id
        res,
        Constants.MESSAGE_VALUES.RECORD_CREATED,
        `record_id:${quizeDetails}`
      );
    }
  } catch (error) {
    return CommonResponse.internalServerError(res, error.message, error);
  }
};

const getQuize = async (req, res) => {
  try {
    const quizeData = await QuizeService.getQuize(req, res);

    if (quizeData?.internal_error) {
      //--send error response on internal server error at service level
      return CommonResponse.internalServerError(
        res,
        quizeData.internal_error.message,
        quizeData.internal_error
      );
    } else if (!quizeData) {
      //--send error response if data is not available for given input
      return CommonResponse.notFound(
        res,
        Constants.MESSAGE_VALUES.RESOURCE_NOT_EXIST
      );
    } else {
      return CommonResponse.success(
        //--send success response with quize data as output
        res,
        Constants.MESSAGE_VALUES.DATA_FETCH_SUCCESS,
        null,
        quizeData
      );
    }
  } catch (error) {
    return CommonResponse.internalServerError(res, error.message, error);
  }
};

export const QuizeController = {
  createQuize,
  getQuize
};
