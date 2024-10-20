import fs from "node:fs/promises";
import { Constants } from "../common/Constants.js";

const submitAnswer = async (req, res) => {
  const SERVICE_ERROR = {}; //--to put all data/ internal server related errors into single object
  try {
    const newAnswerData = {
      user_id: Number(req.query.user_id),
      quize_id: Number(req.body.quize_id),
      question_id: Number(req.body.question_id),
      answer_id: Number(req.body.answer_id)
    };
    //-- fetch existing quize data from file
    let existingQuizeData = await fs.readFile(
      new URL(Constants.DATABASE_LOCATION.QUIZE_DATA_FILE, import.meta.url),
      { encoding: Constants.STANDARD_VALUES.UTF8_ENCODING }
    );
    existingQuizeData =
      existingQuizeData.length > 0 ? JSON.parse(existingQuizeData) : [];
    //--check for the input quize_id is available in database
    let matchedQuize = existingQuizeData.filter(
      (quize) => quize.quize_id === newAnswerData.quize_id
    );
    //--if quize not exist for given id then prepare error and send to controller
    if (matchedQuize.length === 0) {
      const error = {
        message: Constants.MESSAGE_VALUES.SUBMIT_ANSWER_FAIL,
        details: Constants.MESSAGE_VALUES.QUIZE_NOT_EXIST
      };
      SERVICE_ERROR.error = error;
      return SERVICE_ERROR;
    } else {
      //--check for the input question_id is available in Quize data
      let matchedQuestion = matchedQuize[0]?.questions.filter(
        (question) => question.question_id === newAnswerData.question_id
      );

      //--if question not exist for given id then prepare error and send to controller
      if (matchedQuestion.length === 0) {
        const error = {
          message: Constants.MESSAGE_VALUES.SUBMIT_ANSWER_FAIL,
          details: Constants.MESSAGE_VALUES.QUESTION_NOT_EXIST
        };
        SERVICE_ERROR.error = error;
        return SERVICE_ERROR;
      } else {
        //-- fetch existing submitted Answer data from file
        let existingAnswerSubmissionData = await fs.readFile(
          new URL(
            Constants.DATABASE_LOCATION.ANSWER_SUBMISSION_FILE,
            import.meta.url
          ),
          { encoding: Constants.STANDARD_VALUES.UTF8_ENCODING }
        );
        existingAnswerSubmissionData =
          existingAnswerSubmissionData.length > 0
            ? JSON.parse(existingAnswerSubmissionData)
            : [];
        //--check for the answer is already exist for given input details to avoid repeat answer submission
        let index = existingAnswerSubmissionData.findIndex(
          (answer) =>
            answer.user_id === newAnswerData.user_id &&
            answer.quize_id === newAnswerData.quize_id &&
            answer.question_id === newAnswerData.question_id
        );
        if (index < 0) {
          newAnswerData.correct_answer = matchedQuestion[0]?.correct_option;
          newAnswerData.is_correct =
            matchedQuestion[0]?.correct_option === newAnswerData.answer_id;
          existingAnswerSubmissionData.push(newAnswerData);
          //-- if answer is not exists then create new entry into database and store to file
          const answersData = await fs.writeFile(
            new URL(
              Constants.DATABASE_LOCATION.ANSWER_SUBMISSION_FILE,
              import.meta.url
            ),
            JSON.stringify(existingAnswerSubmissionData)
          );
          //--validate the answer and prepare appropreate responce and send to controller
          let submitAnswerResponse = {};
          submitAnswerResponse.is_correct = newAnswerData.is_correct;

          if (newAnswerData.is_correct === false) {
            submitAnswerResponse.correct_answer = newAnswerData.correct_answer;
          }
          return submitAnswerResponse;
        } else {
          //--if answer already exist for given inputs then prepare error and send to controller
          const error = {
            message: Constants.MESSAGE_VALUES.SUBMIT_ANSWER_FAIL,
            details: Constants.MESSAGE_VALUES.ANSWER_EXIST
          };
          SERVICE_ERROR.error = error;
          return SERVICE_ERROR;
        }
      }
    }
  } catch (error) {
    //--preapare and send error if any as internal server error and send to controller
    SERVICE_ERROR.internal_error = error;
    return error;
  }
};

export const AnswerService = {
  submitAnswer
};
