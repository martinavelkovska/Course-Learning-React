import { createContext, useState } from "react";

//oti ako ga staam open na true avtomatski mi go otvara a treba dokolku stisnam na kopceto Chart da mi ga otvore
//ovoj context ke se grizi za pojavuvanje ili ne na card data
const UserProgressContext = createContext({
  progress: "", // 'cart' - if the user is viewing the cart or 'checkout' - if the user is proceeding to the checkout page
  showCart: () => {}, //
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState(""); // inital state is empty i don't wanna show any modal on the screen, neither cart nor checkout

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
