class BaseController {
  constructor() {
    // Base setup
  }

  success(res, data = {}, message = 'Success') {
    res.json({ success: true, message, data });
  }

  error(res, message = 'Something went wrong', status = 500) {
    res.status(status).json({ success: false, message });
  }
}

module.exports = BaseController;
