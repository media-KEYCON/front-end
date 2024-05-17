import { useState, useEffect } from "react";
import { styled } from "styled-components";
import CartDetail from "./CartDetail";

const CartToggleBox = styled.div`
  position: absolute;
  display: flex;
  z-index: -1;
  background-color: var(--secondary-color);
  width: 100%;
  transition: top 0.5s ease-in-out;

  height: ${(props) => props.height}vh;
  top: ${(props) =>
    props.toggle === "true" ? `calc(100% - ${props.height}vh)` : "100%"};
  /* height: ${(props) =>
    props.toggle === "true" ? `${props.height}vh` : "none"}; */
`;

export default function CartToggle({
  cartData,
  onUpdateCart,
  toggle,
  height,
  onUpdatePrice,
  totalPrice,
}) {
  const [showCartDetail, setShowCartDetail] = useState(false);

  useEffect(() => {
    const transitionEndHandler = () => {
      setShowCartDetail(toggle);
    };

    const cartToggleBox = document.getElementById("cartToggleBox");
    cartToggleBox.addEventListener("transitionend", transitionEndHandler);

    return () => {
      cartToggleBox.removeEventListener("transitionend", transitionEndHandler);
    };
  }, [toggle]);

  // const handleUpdatePrice = (price) => {
  //   onUpdatePrice(price);
  // };

  return (
    <CartToggleBox
      toggle={toggle.toString()}
      height={height}
      id="cartToggleBox"
    >
      {showCartDetail && toggle && (
        <CartDetail
          cartData={cartData}
          onUpdateCart={onUpdateCart}
          height={height}
          onUpdatePrice={onUpdatePrice}
          totalPrice={totalPrice}
        />
      )}
    </CartToggleBox>
  );
}

// const CartToggleBox = styled.div`
//   position: absolute;
//   bottom: 88px; // 88px은 footer 고려한 값
//   right: 0;
//   width: 100%;

//   display: flex;
//   justify-content: center;
//   background-color: #9a9a9a;

//   height: ${(props) => (props.toggle === "true" ? `${props.height}vh` : "0")};
//   transform: scaleY(${(props) => (props.toggle === "true" ? 1 : 0)});
//   transform-origin: ${(props) => (props.toggle === "true" ? "bottom" : "top")};
//   transition: transform 0.5s ease-in-out;

//   /* animation: ${(props) =>
//     props.toggle === "true" ? goUp(props.height) : goDown(props.height)}
//     0.5s ease-in-out; */
// `;
