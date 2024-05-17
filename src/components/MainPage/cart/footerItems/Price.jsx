import { styled } from "styled-components";
import convertPrice from "../../../../utils/convertPrice";

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export default function Price({ price }) {
  if (typeof price === "number") {
    return (
      <PriceBox>
        <span style={{ padding: "1px 5px", borderBottom: "solid 2px black" }}>
          {convertPrice(price)}
        </span>
        <span style={{ padding: "1px 3px" }}>원</span>
      </PriceBox>
    );
  } else {
    return <div>{price}</div>;
  }
}
