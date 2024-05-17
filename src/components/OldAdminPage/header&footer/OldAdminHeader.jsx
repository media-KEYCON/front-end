import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FaPlus } from "react-icons/fa6";
// import logo from "../../header/headerLogo.svg";

const HeaderBox = styled.header`
  width: 100%;
  height: 15vh;
  /* background-color: green; */
  background-color: white;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
`;
const LogoBox = styled.img`
  width: 4rem;
  height: auto;
`;
const TitleBox = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  color: var(--primary-color);
  font-size: xx-large;
  font-weight: bolder;
  padding-bottom: 20px;
  padding-right: 40px;
  padding-top: 20px;
`;

const AddCategoryButton = styled.div`
  background-color: #d1dbff;
  padding: 20px 10px;
  border-radius: 5px;
  margin: 20px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;

  &:active {
    background-color: #cfcfcf;
  }

  .plus {
    margin-top: 2px;
    margin-right: 2px;
    border-radius: 3px;
    width: 13px;
    height: 13px;
    background-color: var(--primary-color);
    color: white;
    padding: 2px;
  }
`;

const StoreName = styled.div`
  margin-right: 20px;
`;

export default function OldAdminHeader({ title, addCategory }) {
  return (
    <>
      <HeaderBox>
        <Link to="/main" style={{ marginLeft: "20px", position: "absolute" }}>
          <LogoBox
            src={`${process.env.PUBLIC_URL}/images/headerLogo.svg`}
            alt="로고 이미지"
          />
        </Link>
        <TitleBox>
          <Title>메뉴 등록</Title>
        </TitleBox>
        <StoreName>상호명</StoreName>
      </HeaderBox>
      <AddCategoryButton onClick={addCategory}>
        <FaPlus className="plus" />
        카테고리 추가
      </AddCategoryButton>
    </>
  );
}
