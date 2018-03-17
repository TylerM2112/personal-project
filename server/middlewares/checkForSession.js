module.exports = {
  checkForSession(req, res, next) {

    console.log("MUMBO JUMOB",req.session.user);
    if (!req.session.user) {
      req.session.user = { cart: [], total: 0.00, submitted: false, customerId: null };
      console.log("check session", req.session)
    }
    next();
  }, 

  checkForAdmin(req, res, next) { 
    if (req.session.user.isAdmin === true) {
      next();
    } else {
      this.props.history.push('/search');
     }
  }
};