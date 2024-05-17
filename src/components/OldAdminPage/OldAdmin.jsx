import { styled } from "styled-components";
import { useState } from "react";

import OldAdminHeader from "./header&footer/OldAdminHeader";
import OldAdminContainer from "./OldAdminContainer";
import OldAdminFooter from "./header&footer/OldAdminFooter";

const AdminBox = styled.div`
  height: 100vh; /* 추후 메뉴판 길이에 맞게 수정 */
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function OldAdmin() {
  const [numCategories, setNumCategories] = useState(1); // 추후 적절히 수정

  // 카테고리 추가를 위한 함수
  const addCategory = () => {
    setNumCategories((prev) => prev + 1);
  };

  return (
    <AdminBox>
      <OldAdminHeader
        title={"메뉴 등록"} /* 정확한 헤더 디자인 나오면 수정 예정*/
        addCategory={addCategory}
      />
      <OldAdminContainer numCategories={numCategories} />
      <OldAdminFooter />
    </AdminBox>
  );
}
