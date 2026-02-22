class ApiResponse {
  constructor(statusCode, message, data = null, pagination = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) this.pagination = pagination;
  }

  static success(res, statusCode, message, data, pagination = null) {
    const body = { success: true, message, data };
    if (pagination) body.pagination = pagination;
    return res.status(statusCode).json(body);
  }
}

module.exports = ApiResponse;
