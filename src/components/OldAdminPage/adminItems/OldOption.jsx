import React, { useState } from "react";
import { styled } from "styled-components";
import OldOptionModal from "../adminOption/OldOptionModal";
import OldCategory from "./OldCategory";

const AdminContainerBox = styled.div`
  padding: 0 1.2vw;
  overflow-y: auto;
  height: 100%;
`;

export default function OldOption(numCategories) {
  const categories = [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  for (let i = 0; i < numCategories; i++) {
    categories.push(<OldCategory key={i} />);
  }

  return (
    <>
      <AdminContainerBox>
        <div
          onClick={openModal}
          style={{
            padding: "5px 25px",
            borderRadius: "5px",
            background: "#D1DBFF",
            color: "#002ECF",
            cursor: "pointer",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
          }}
        >
          옵션
        </div>
        <OldOptionModal isOpen={isModalOpen} onClose={closeModal} />
        {categories}
      </AdminContainerBox>
    </>
  );
}
