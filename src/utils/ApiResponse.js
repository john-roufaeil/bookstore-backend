class ApiResponse {
  static success(res, statusCode, message, data, pagination = null) {
    const body = { success: true, message, data };
    if (pagination) body.pagination = pagination;
    return res.status(statusCode).json(body);
  }
}

module.exports = ApiResponse;
