import { styled } from "styled-components";
import Price from "./footerItems/Price";
import PayButton from "./footerItems/PayButton";

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  background-color: var(--secondary-color);
  font-weight: bold;

  padding: 12px;
  height: 64px;
  font-size: var(--font-big);
`;

export default function Footer({ totalPrice, updatedCart }) {
  return (
    <FooterBox>
      <Price price={totalPrice} />
      {typeof totalPrice === "number" && (
        <PayButton updatedCart={updatedCart} />
      )}
    </FooterBox>
  );
}
