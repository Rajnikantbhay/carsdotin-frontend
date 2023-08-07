//productcontext.js
import { useReducer, createContext, useEffect, useState } from "react";

const initialState = {
  cart: {},
  checkoutItems: {}
};

const CartContext = createContext({});

function cartReducer(state, action) {

  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart[action.payload._id];
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          [action.payload._id]: item
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : {
                ...action.payload,
                qty: 1,
              },
        },
      };

      localStorage.setItem(`userCart_${localStorage.getItem("userEmail")}`, JSON.stringify(newState.cart));
      return newState

    case "CHECKOUT":
      const productItem = state.checkoutItems[action.payload._id]
      return {
        ...state,
        checkoutItems: {...state.checkoutItems, 
          [action.payload._id]: productItem ? 
          {
            ...productItem,
            qty: productItem.qty + 1,
          } : {
            ...action.payload,
            qty:1
          }
        
      }
      }

    case "REMOVE_FROM_CART":
      let newCart = { ...state.cart };
      delete newCart[action.payload._id];
      const newStateAfterRemoval = {
        ...state,
        cart: newCart,
      };

      localStorage.setItem(`userCart_${localStorage.getItem("userEmail")}`, JSON.stringify(newStateAfterRemoval.cart));
      return newStateAfterRemoval;

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "UPDATE_CART": 
      const newQty = {
        ...state,
        cart: {
            ...state.cart,
            [action.payload.itemId]: {
              ...state.cart[action.payload.itemId],
              qty: action.payload.qty,
            },
          },
      }
      localStorage.setItem(`userCart_${localStorage.getItem("userEmail")}`, JSON.stringify(newQty.cart));      return newQty

    case "TOGGle_ITEM_SELECTION":
      const seleceted = {
        ...state,
        cart:{
          ...state.cart,
          [action.payload._id]:{
            ...state.cart[action.payload._id],
            seleceted: !state.cart[action.payload._id].seleceted
          }
        }
      }
      return seleceted;

    case "SET_CART":
      const cartChanges = {
        ...state,
        cart: action.payload
      }
      localStorage.setItem(`userCart_${localStorage.getItem("userEmail")}`, JSON.stringify(cartChanges.cart));
      return cartChanges

    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [checkoutData, setCheckoutData] = useState([]);
  const[shouldRetainCheckoutData, setShouldRetainCheckoutData] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem(`userCart_${localStorage.getItem("userEmail")}`);
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }
  }, [userEmail]);

  useEffect(() => {
    const storedCheckoutData = localStorage.getItem("checkoutData");
    if (storedCheckoutData) {
      setCheckoutData(JSON.parse(storedCheckoutData));
    }
  }, []);

  useEffect(() => {
    // Store the checkoutData in localStorage when the component is unmounted
    if (shouldRetainCheckoutData) {
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    }
    return () => {
      // Clean up by removing the checkoutData from localStorage
      if (!shouldRetainCheckoutData) {
        localStorage.removeItem("checkoutData");
      }
    };
  }, [shouldRetainCheckoutData, checkoutData]);

  return (
    <CartContext.Provider value={{ state, dispatch, setUserEmail, checkoutData, setShouldRetainCheckoutData }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, Provider };
