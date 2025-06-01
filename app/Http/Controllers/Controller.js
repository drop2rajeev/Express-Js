const BaseController = require(path.join(__rootDir, 'vendor/express/Controllers/BaseController'));

class Controller extends BaseController {
  constructor() {
    super();
    // Any app-level shared logic
  }
}

module.exports = Controller;
