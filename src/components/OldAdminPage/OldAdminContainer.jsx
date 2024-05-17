import { styled } from "styled-components";
import OldCategory from "./adminItems/Category";
// import OptionModal from "./adminOption/OptionModal";

const AdminContainerBox = styled.div`
  padding: 0 1.2vw;
  overflow-y: auto;
  height: 100%;
`;

export default function OldAdminContainer({ numCategories }) {
  const categories = [];

  /* 모달 관련 코드 일단 주석
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  */

  for (let i = 0; i < numCategories; i++) {
    categories.push(<OldCategory key={i} />);
  }

  return (
    <>
      <AdminContainerBox>
        {/* 모달 관련 코드 일단 주석
         <div
          onClick={openModal}
          style={{
            padding: "10px",
            background: "pink",
            cursor: "pointer",
          }}
        >
          옵션
        </div>
        <OptionModal isOpen={isModalOpen} onClose={closeModal} /> */}
        {categories}
      </AdminContainerBox>
    </>
  );
}
