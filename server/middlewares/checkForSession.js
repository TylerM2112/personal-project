module.exports = {
  checkForSession(req, res, next) {
    const { session } = req;
  
    if (!session.user) {
      console.log("check LOG", session)
      session.user = { isAdmin: false, cart: [], total: 0.00 };
    }
  
    
    next();
  }
};