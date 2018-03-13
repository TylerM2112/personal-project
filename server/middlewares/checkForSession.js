module.exports = {
  checkForSession(req, res, next) {

    console.log("MUMBO JUMOB",req.session.user);
    if (!req.session.user) {
      console.log("check LOG", req.session)
      req.session.user = { isAdmin: false, cart: [], total: 0.00, submitted: false, customerId: null };
      console.log("check session", req.session)

    }
  
    
    next();
  }
};