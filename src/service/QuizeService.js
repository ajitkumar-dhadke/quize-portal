import fs from "node:fs/promises";
import { Constants } from "../common/Constants.js";

const createQuize = async (req, res) => {
  const SERVICE_ERROR = {}; //--to put all data/internal server related errors into single object
  try {
    let newQuizeData = req.body;
    //-- fetch existing quize data from file
    let existingQuizeData = await fs.readFile(
      new URL(Constants.DATABASE_LOCATION.QUIZE_DATA_FILE, import.meta.url),
      {
        encoding: Constants.STANDARD_VALUES.UTF8_ENCODING
      }
    );
    existingQuizeData =
      existingQuizeData.length > 0 ? JSON.parse(existingQuizeData) : [];
    //--create new unique quize_id ans assign to new quize record
    let newQuizeId = (
      Array.isArray(existingQuizeData) ? existingQuizeData : []
    ).reduce(
      (max = 0, newQuizeData) =>
        newQuizeData.quize_id > max ? newQuizeData.quize_id : max,
      0
    );
    newQuizeData.quize_id = Number(newQuizeId) + 1;
    existingQuizeData.push(newQuizeData);
    //-- add new quize record to existing database and store to file
    const quizeData = await fs.writeFile(
      new URL(Constants.DATABASE_LOCATION.QUIZE_DATA_FILE, import.meta.url),
      JSON.stringify(existingQuizeData)
    );
    //-- return newly created quize_id to controller
    return newQuizeData.quize_id;
  } catch (error) {
    //--preapare and send error if any as internal server error and send to controller
    SERVICE_ERROR.internal_error = error;
    return SERVICE_ERROR;
  }
};

const getQuize = async (req, res) => {
  const SERVICE_ERROR = {}; //--to put all data/ internal server related errors into single object
  try {
    let quizeId = Number(req.query.quize_id);
    //-- fetch existing quize data from file
    let quizeData = await fs.readFile(
      new URL(Constants.DATABASE_LOCATION.QUIZE_DATA_FILE, import.meta.url),
      { encoding: Constants.STANDARD_VALUES.UTF8_ENCODING }
    );
    quizeData = quizeData.length > 0 ? JSON.parse(quizeData) : [];

    let index = quizeData.findIndex((quize) => quize.quize_id === quizeId);
    //-- check for quize record as per given input and prepare it with required fields and send to controller
    if (index >= 0) {
      const quize = quizeData[index];
      const questionWithoutCorrectOption = quize.questions.map((question) => {
        const { correct_option, ...rest } = question;
        return rest;
      });
      return { ...quize, questions: questionWithoutCorrectOption };
    } else {
      return;
    }
  } catch (error) {
    //--preapare and send error if any as internal server error and send to controller
    SERVICE_ERROR.internal_error = error;
    return SERVICE_ERROR;
  }
};

export const QuizeService = {
  createQuize,
  getQuize
};
