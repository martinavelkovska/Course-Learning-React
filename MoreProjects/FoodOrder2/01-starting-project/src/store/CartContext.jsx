import { createContext, useReducer, useState } from "react";

const CartContext = createContext({
  items: [], //manage a list of cart items
  //method to edit those items, add or remove
  addItem: (item) => {}, //i expect to get a meal item that should be added to the cart, and where we will update the cart
  removeItem: (id) => {},
  clearCart: () => {},
});

//use Reducer hook needs a reducer function as an input
function cartReducer(state, action) {
  //these parameters will be passed into this function automatically by React, the goal of this function is to return an updade state and its this action object
  //we definining how this state object should look like
  if (action.type === "ADD_ITEM") {
    //I expect to get an action of type ADD_ITEM
    // i wanna update state to add meal item

    //adding an item to items array in cartContext
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //check if we already have that item in our item array

    // state.items.push(action.item); NE E DOBAR PRISTAP bidejki push kje go editira veke postoecakata lista na items koi se veke skladirani vo memorija pred cartReducer da zavrsi so izvrsuvanje
    //dr pricina e so sakam da go dodadam meal ednas vo cart i potoa da dodadavam kolicina a ne ako kliknam 10 pati 10 pati da mi se dodade

    const updatedItems = [...state.items]; // new array copy from the old array

    if (existingCartItemIndex > -1) {
      // the item exists
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        // ako postoi itemot togas update quantity
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // ako ne postoi itemot sozdadi nov
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    //return the updated state for this reducer, we don't wanna edit the existing state
    return { ...state, items: updatedItems }; //update the parts of the state that need updating
  }

  if (action.type === "REMOVE_ITEM") {
    // .... remove an item from the state

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // we wanna remove the entire item form shopping cart

      updatedItems.splice(existingCartItemIndex, 1); //zima indeks na existingCartItemIndex i broj na items koi treba da bidat otstraneti
    } else {
      // ako ne samo da go update the quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }; // copy of the existing item, we create a new item based on the old item where we reduce the quantity
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  //to clear the cart after refreshing:
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state; // the  unchanged  state (if not entry the if-s conditions)
}

export function CartContextProvider({ children }) {
  //can be wrapped around components to  make this context available to them and do the actual data and state management

  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }); //like useState allows us to manage state but more complex state and makes it easier to move that state management logic out of this function
  //passing a pointer to reducer function (cartReducer) and as second argument i pass the initial state value

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  //i wanna pass my cart state to this CartContext.Provider  because that then implicitly passes it to all other wrapped components

  const cartContext = {
    items: cart.items, //whenever the cart state changes this will also change
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
