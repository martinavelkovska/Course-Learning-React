import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Cart from "./Cart.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity; //must return a new updated value, to add up all the quantities of all items in this items array, add all the quantities of all the items
  }, 0); //namali ja nizata to a single number

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1 className="md:text-3xl font-bold ">REACTFOOD</h1>
      </div>
      <Button textOnly onClick={handleShowCart}>
        Cart ( {totalCartItems} )
      </Button>
    </div>
  );
}
