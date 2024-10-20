import fs from "node:fs/promises";
import { Constants } from "../common/Constants.js";

const getResult = async (req, res) => {
  const SERVICE_ERROR = {}; //--to put all data/internal server related errors into single object
  try {
    let userId = Number(req.query.user_id);
    let quizeId = Number(req.query.quize_id);
    //-- fetch answer data from file to process user result
    let answerData = await fs.readFile(
      new URL(
        Constants.DATABASE_LOCATION.ANSWER_SUBMISSION_FILE,
        import.meta.url
      ),
      { encoding: Constants.STANDARD_VALUES.UTF8_ENCODING }
    );
    answerData = answerData.length > 0 ? JSON.parse(answerData) : [];
    //--check for user's records in answer for given quize
    let userAnswers = answerData.filter(
      (answer) => (answer.user_id === userId) & (answer.quize_id === quizeId)
    );
    //--prepare for result summery by processing on available records ans send to controller
    if (userAnswers.length > 0) {
      const userScore =
        userAnswers.filter((answer) => answer.is_correct).length +
        "/" +
        userAnswers.length;
      const userPercentage =
        (userAnswers.filter((answer) => answer.is_correct).length /
          userAnswers.length) *
          100 +
        "%";
      const userResult = {
        Score: userScore,
        Percentage: userPercentage,
        Summary: userAnswers
      };

      return userResult;
    } else {
      return;
    }
  } catch (error) {
    //--preapare and send error if any as internal server error and send to controller
    SERVICE_ERROR.internal_error = error;
    return error;
  }
};

export const ResultService = {
  getResult
};
