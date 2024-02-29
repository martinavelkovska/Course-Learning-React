import { createContext, useReducer, useState } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

//initial value that will be provided to the components: object with property items and empty string initially, to store shopping cart items

//export=== to provide to this app and components

// mora da ima default value za da imame pristap do .items

//Because there besides creating and sharing that context,

//we can also create and share a component function,

function shoppingCartReducer(state, action) {
  // ne treba da bide re-kreirana koga komponentata kje se izvrusva i nema pristapi do props, se sostoi od dva parametri : state i action
  // we should return the updated state

  if (action.type === "ADD_ITEM") {
    // we can update the state, we can  have more actions - if (action.type === 'UPDATE_ITEM')
    // return some state that changed compared to the previous state

    const updatedItems = [...state.items]; // the latest state

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; //samo dodaj mu kolicina +1
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      ); // e tuka koga prvo ke se klikne na kopceto kreiraj go itemoto vo cart
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      // ...state ==> if we had a more complex state with multiple properties, we might wanna spread and copy the old state first so that we don't lose any other values, And then we just update the one value in our state that is updated when this action here occurs.
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}
export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  ); // ja poednostavuva vrednosta; to connect with function we should pass a pointer, second value we need to pass an initial value

  // const [shoppingCart, setShoppingCart] = useState({  NOW WE MANAGING EVERYTHING THROUGH useReducer
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      //this action should has some data attached to it  that will be requared to perform the action
      payload: id,
    }); // to dispatch an action, any action : string with text, number,
    // but most cases - object with properiy like type or id - so we can tell different actions apart from each other and handle them differently
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount, // same as amount: amount
      },
    });
  }

  const cxtValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart, //function , which value be a function that  does add a new item to the chart
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={cxtValue}>{children}</CartContext.Provider>
  );
}
