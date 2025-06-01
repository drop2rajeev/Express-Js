const Controller = require('Controller');

    class UsersController extends Controller {
      index(req, res) {
        return this.success(res, {}, 'UsersController index loaded');
      }
    }

    module.exports = new UsersController();
  