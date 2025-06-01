const Controller = require('./Controller');

class HomeController extends Controller {
  index(req, res) {
    res.render('welcome');
  }

  login(req, res) {
    res.render('auth/login');
    // res.send("Login page rendered");
  }

  dashboard(req, res){
    res.send("Welcome to Dashboard");
  }
}

module.exports = new HomeController();