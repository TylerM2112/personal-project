const bcrypt = require('bcrypt');

module.exports = {
  loginAdmin: (req, res) => {
      const { username, password } = req.body;
    req.app.get('db').find_user([username]).then(users => {
      if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatch => {
          if (passwordsMatch) {
            req.session.user = { username: users[0].username, isAdmin: true };
            res.status(200).json(true);
          } else {
            res.status(418).json({ message: 'Incorrect Username/Password' })
          }
        })
      } else {
        res.status(418).json({ message: "Incorrect Username/Password" })
      }
    }).catch(error => {
      console.log(error);
     })
  },

  logout: (req, res) => {
      req.session.destroy();
    res.status(200).send(req.session);
  }
}