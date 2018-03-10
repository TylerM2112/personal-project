
module.exports = {
    add: (req, res) => {
        req.session.user = req.body;
        console.log("This ONE", req.session)
    }
        
     }
//     delete: (req, res, next) => {
//         const { id } = req.query;
//         const { cart } = req.session.user;

//         const selectedProduct = product.find(product => product.id == id);

//         if (selectedProduct) { 
//             const i = cart.findIndex(product => product.id == id); 
//             cart.splice(i, 1);
//             req.session.user.total -= selectedProduct.price;
//         }
//         res.status(200).send(req.session.user);
//      },
//     checkout: (req, res, next) => {
//         const { user } = req.session;
//         user.cart = [],
//             user.total = 0;
        
//         res.status(200).send(req.session.user);
//      }
// }