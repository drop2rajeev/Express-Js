class BaseController {
  success(res, data = {}, message = 'Success') {
    return res.json({
      status: 'success',
      message,
      data,
    });
  }

  error(res, message = 'Something went wrong', code = 500) {
    return res.status(code).json({
      status: 'error',
      message,
    });
  }
}

module.exports = BaseController;