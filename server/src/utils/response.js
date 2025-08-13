// utils/response.js

function successResponse(res, message = 'Success', data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function errorResponse(res, message = 'Something went wrong', statusCode = 500, error = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

export { successResponse, errorResponse };
