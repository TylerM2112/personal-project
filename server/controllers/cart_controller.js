
module.exports = {

    read: (req, res) => { 
        res.status(200).send(req.session.user.cart)
    },


    add: (req, res) => {
        req.session.user.cart = req.body.cart;
        console.log("LOOK AT THIS ONE", req.session.user)
        console.log('req.body', req.body)
        res.end()
    },
        
     
    delete: (req, res, next) => {
        console.log("LOOK AT THIS TWO", req.session.user)
        
        req.session.user.cart = req.body.state.cart;
        req.session.user.total = req.body.total;
        res.end()
    },
}
//     checkout: (req, res, next) => {
//         const { user } = req.session;
//         user.cart = [],
//             user.total = 0;
        
//         res.status(200).send(req.session.user);
//      }
// }