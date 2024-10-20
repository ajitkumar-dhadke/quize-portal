const API_VALUES = {
  API: "/api",
  API_DOC: "/api-doc",
  QUIZE: "/quize",
  ANSWER: "/answer",
  RESULT: "/result"
};

const MESSAGE_VALUES = {
  VALIDATION_FAIL: "Validation Fail",
  RECORD_CREATED: "Record Created",
  DATA_FETCH_SUCCESS: "Data Fetched Succesfully",
  RESOURCE_NOT_EXIST: "Resource Doesn't Exist",
  SUBMIT_ANSWER_FAIL: "Cannot Submit Answer",
  QUIZE_NOT_EXIST: "Quize Not Exist",
  QUESTION_NOT_EXIST: "Question Not Exist",
  ANSWER_EXIST: "Answer Already Exist"
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const DATABASE_LOCATION = {
  QUIZE_DATA_FILE: "../database/QuizeData.json",
  ANSWER_SUBMISSION_FILE: "../database/AnswerSubmission.json"
};

const STANDARD_VALUES = {
  UTF8_ENCODING: "utf8",
  PORT: 3001
};

export const Constants = {
  API_VALUES,
  MESSAGE_VALUES,
  HTTP_STATUS,
  DATABASE_LOCATION,
  STANDARD_VALUES
};
