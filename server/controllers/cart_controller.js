
module.exports = {
    add: (req, res) => {
        req.session.user = req.body;
    },
        
     
    delete: (req, res, next) => {
        req.session.user.cart = req.body.state.cart;
        req.session.user.total = req.body.total;        
    },
}
//     checkout: (req, res, next) => {
//         const { user } = req.session;
//         user.cart = [],
//             user.total = 0;
        
//         res.status(200).send(req.session.user);
//      }
// }