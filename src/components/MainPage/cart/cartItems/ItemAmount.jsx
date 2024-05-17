import { useState } from "react";
import { styled } from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ItemAmountBox = styled.div`
  // border: solid 1px red;
  span {
    cursor: pointer;
  }

  .amount {
    padding: 0 5px;
  }

  white-space: nowrap;
`;

export default function ItemAmount({ amount, onChange }) {
  const [count, setCount] = useState(amount);

  const plus = () => {
    if (count < 11) {
      setCount(count + 1);
      onChange(count + 1);
    }
  };

  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
      onChange(count - 1);
    }
  };

  return (
    <ItemAmountBox>
      <span onClick={minus}>
        <FaMinus />
      </span>
      <span className="amount">{count}</span>
      <span onClick={plus}>
        <FaPlus />
      </span>
    </ItemAmountBox>
  );
}
