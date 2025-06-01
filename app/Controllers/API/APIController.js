class APIController {
  index(req, res) {
    res.send('Hello from APIController class!');
  }
}

module.exports = new APIController();