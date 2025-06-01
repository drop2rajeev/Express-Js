const Controller = require('./Controller');

class HomeController extends Controller {
  index(req, res) {
    res.render('welcome');
  }
}

module.exports = new HomeController();