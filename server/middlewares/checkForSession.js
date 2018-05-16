module.exports = function( req, res, next ) {
  const { session } = req;

  if ( !session.user ) {
    session.user = { cart: [], total: 0.00, admin: false };
  }
  next();
};