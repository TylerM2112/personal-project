const initialState = {
    product: {
        name: '',
        description: '',
        price: 0,
        manSmallSize: 0,
        manMediumSize: 0,
        manLargeSize: 0,
        manXLargeSize: 0,
        womanSmallSize: 0,
        womanMediumSize: 0,
        womanLargeSize: 0,
        womanXLargeSize: 0,
        image: '',
        quantity: null,
    },
    user: {
        isAdmin: false,
        cart: [],
        total: 0.00,
        submitted: false,
        customerId: null,
    }
};

//Add Item Reducers
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
const UPDATE_PRICE = "UPDATE_PRICE";
const UPDATE_MANSMALL = "UPDATE_MANSMALL";
const UPDATE_MANMEDIUM = "UPDATE_MANMEDIUM";
const UPDATE_MANLARGE = "UPDATE_MANLARGE";
const UPDATE_MANXLARGE = "UPDATE_MANXLARGE";
const UPDATE_WOMANSMALL = "UPDATE_WOMANSMALL";
const UPDATE_WOMANMEDIUM = "UPDATE_WOMANMEDIUM";
const UPDATE_WOMANLARGE = "UPDATE_WOMANLARGE";
const UPDATE_WOMANXLARGE = "UPDATE_WOMANXLARGE";
const UPDATE_IMAGE = "UPDATE_IMAGE";
const UPDATE_ISADMIN = "UPDATE_ISADMIN";
const UPDATE_NOTADMIN = "UPDATE_NOTADMIN";
const UPDATE_CART = "UPDATE_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const UPDATE_SUBMITTED = "UPDATED_SUBMITTED";
const UPDATE_CUSTOMERID = "UPDATE_CUSTOMERID";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const UPDATE_USER = "UPDATE_USER";

export default function (state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case UPDATE_NAME:
            return { ...state, name: action.payload };
        case UPDATE_DESCRIPTION:
            return { ...state, description: action.payload };
        case UPDATE_PRICE:
            return { ...state, price: action.payload };
        case UPDATE_MANSMALL:
            return { ...state, manSmallSize: action.payload };
        case UPDATE_MANMEDIUM:
            return { ...state, manMediumSize: action.payload };
        case UPDATE_MANLARGE:
            return { ...state, manLargeSize: action.payload };
        case UPDATE_MANXLARGE:
            return { ...state, manXLargeSize: action.payload };
        case UPDATE_WOMANSMALL:
            return { ...state, womanSmallSize: action.payload };
        case UPDATE_WOMANMEDIUM:
            return { ...state, womanMediumSize: action.payload };
        case UPDATE_WOMANLARGE:
            return { ...state, womanLargeSize: action.payload };
        case UPDATE_WOMANXLARGE:
            return { ...state, womanXLargeSize: action.payload };
        case UPDATE_QUANTITY:
            let index = newState.user.cart.findIndex((e) => e.id === +action.payload.id);
            newState.user.cart[index].quantity = action.payload.quantity
            return { ...newState };
        case UPDATE_IMAGE:
            return { ...state, image: action.payload };
        case UPDATE_ISADMIN:
            let user = newState.user;
            user.isAdmin = true;
            return { ...newState, user };
        case UPDATE_NOTADMIN:
            let newerState = { ...state };
            newerState.user.isAdmin = false;
            return { ...newerState };
        case UPDATE_CART:
            console.log("reducer")
            newState.user.cart.push(action.payload);
            newState.user.total += (+action.payload.price * +action.payload.quantity);
            return {...newState};
        case DELETE_FROM_CART:
            newState.user.cart = action.payload.cart;
            newState.user.total = action.payload.total;
            return { ...newState };
        case UPDATE_SUBMITTED:    
            newState.user.submitted = action.payload;
            return { ...newState }; 
        case UPDATE_CUSTOMERID:
            newState.user.customerId = action.payload;
            return { ...newState };
        case UPDATE_USER:
            newState.user = action.payload;    
            return {...newState}    
        default:
            return state;
    }
}


export function updateName(name) {
    return {
        type: UPDATE_NAME,
        payload: name,
    };
}
export function updateDescription(description) {
    return {
        type: UPDATE_DESCRIPTION,
        payload: description,
    };
}
export function updatePrice(price) {
    return {
        type: UPDATE_PRICE,
        payload: price,
    };
}
export function updateManSmall(manSmallSize) {
    return {
        type: UPDATE_MANSMALL,
        payload: manSmallSize,
    };
}
export function updateManMedium(manMediumSize) {
    return {
        type: UPDATE_MANMEDIUM,
        payload: manMediumSize,
    };
} export function updateManLarge(manLargeSize) {
    return {
        type: UPDATE_MANLARGE,
        payload: manLargeSize,
    };
} export function updateManXLarge(manXLargeSize) {
    return {
        type: UPDATE_MANXLARGE,
        payload: manXLargeSize,
    };
} export function updateWomanSmall(womanSmallSize) {
    return {
        type: UPDATE_WOMANSMALL,
        payload: womanSmallSize,
    };
} export function updateWomanMedium(womanMediumSize) {
    return {
        type: UPDATE_WOMANMEDIUM,
        payload: womanMediumSize,
    };
} export function updateWomanLarge(womanLargeSize) {
    return {
        type: UPDATE_WOMANLARGE,
        payload: womanLargeSize,
    };
} export function updateWomanXLarge(womanXLargeSize) {
    return {
        type: UPDATE_WOMANXLARGE,
        payload: womanXLargeSize,
    };
}

export function updateQuantity(quantity) { 
    return {
        type: UPDATE_QUANTITY,
        payload: quantity
    }
}
export function updateImage(image) {
    return {
        type: UPDATE_IMAGE,
        payload: image,
    };

}
export function updateAdmin() {
    return {
        type: UPDATE_ISADMIN
    }
};
export function updateNotAdmin() {
    return {
        type: UPDATE_NOTADMIN
    }
};
export function updateCart(cart) {
    return {
        type: UPDATE_CART,
        payload: cart,
    }
}
export function deleteFromCart(cart) {
    return {
        type: DELETE_FROM_CART,
        payload: cart,
    }
}
export function updateSubmitted(submitted) {
    return {
        type: UPDATE_SUBMITTED,
        payload: submitted
    }
}
 
export function updateCustomerID(id) {
    return {
        type: UPDATE_CUSTOMERID,
        payload: id,
    }
}
 