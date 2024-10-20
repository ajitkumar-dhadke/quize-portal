import { Constants } from "./Constants.js";

const response = (res, success, statusCode, message, details, data) => {
  return res.status(statusCode).json({
    success,
    message,
    details: details || null,
    data: data || null
  });
};

const success = (res, message, details, data) => {
  return response(res, true, Constants.HTTP_STATUS.OK, message, details, data);
};

const notFound = (res, message, details, data) => {
  return response(
    res,
    false,
    Constants.HTTP_STATUS.NOT_FOUND,
    message,
    details,
    data
  );
};

const badRequest = (res, message, details, data) => {
  return response(
    res,
    false,
    Constants.HTTP_STATUS.BAD_REQUEST,
    message,
    details,
    data
  );
};

const created = (res, message, details, data) => {
  return response(
    res,
    true,
    Constants.HTTP_STATUS.CREATED,
    message,
    details,
    data
  );
};

const noContent = (res, message, details, data) => {
  return response(
    res,
    false,
    Constants.HTTP_STATUS.NO_CONTENT,
    message,
    details,
    data
  );
};

const internalServerError = (res, message, details, data) => {
  return response(
    res,
    false,
    Constants.HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message,
    details,
    data
  );
};

export const CommonResponse = {
  success,
  notFound,
  badRequest,
  created,
  noContent,
  internalServerError
};
