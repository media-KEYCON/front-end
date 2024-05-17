import { styled } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 회색 배경 */
`;
const ModalContainer = styled.div`
  width: 100%;
  /* 넓이 반응형으로 고치기 */
  max-width: 40%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
  padding: 0 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalButton = styled.button`
  all: unset;
  bottom: 0;
  margin: 1rem 0;
  /* margin: auto; */
  padding: 10px;
  border-radius: 10px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: var(--font-big);
  font-weight: bold;
`;
const OptionConainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const OptionTitle = styled.h2`
  background-color: ${(props) =>
    props.$mandatory === "true"
      ? "var(--primary-color)"
      : "var(--secondary-color)"};
  color: ${(props) => (props.$mandatory === "true" ? "white" : "black")};
  font-weight: bolder;
  font-size: var(--font-regular);
  border-radius: 5px;
  width: 100%;
  padding: 4px 0px;
  text-align: center;
`;
const Options = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 0;
`;
const Option = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--font-regular);
  background-color: var(--third-color);
  font-weight: bold;
  height: 14vh; /*반응형으로 고치기?*/
  border-radius: 10px;
  /* 선택된 메뉴 블록의 스타일*/
  ${({ selected }) =>
    selected &&
    `
        background-color: var(--secondary-color);
    `}
`;
//서버로부터 받은 데이터를 카테고리별, 필수순으로 나열해주는 함수
function transformData(data) {
  const menuOptionsMap = new Map();
  // console.log(data);
  data.menuOptionsList.forEach((option) => {
    const {
      menuOptionsCategory,
      mandatory,
      menuOptionsContents,
      menuOptionsPrice,
      menuOptionsId,
    } = option;

    if (!menuOptionsMap.has(menuOptionsCategory)) {
      menuOptionsMap.set(menuOptionsCategory, {
        menuOptionsCategory,
        mandatory,
        menuOptionsContents: [],
      });
    }

    menuOptionsMap.get(menuOptionsCategory).menuOptionsContents.push({
      menuOptionsContents: menuOptionsContents,
      menuOptionsPrice: menuOptionsPrice,
      menuOptionsId: menuOptionsId,
    });
  });

  const transformedData = Array.from(menuOptionsMap.values());

  // mandatory: true인 것들을 배열 앞쪽으로 이동
  const sortedData = transformedData.sort((a, b) => {
    if (a.mandatory && !b.mandatory) {
      return -1;
    } else if (!a.mandatory && b.mandatory) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedData;
}

export default function MenuModal({
  menusId,
  onCloseModal,
  cartMenu,
  setCartMenu,
  onUpdatePrice,
}) {
  const [menuOptionData, setMenuOptionData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [menusName, setMenusName] = useState("");
  const [totalPrice, setTotalPrice] = useState("메뉴를 선택해주세요");
  //서버로부터 옵션 데이터 받기
  useEffect(() => {
    //api/v1/menus/{menusId}
    axios
      .get(`${process.env.REACT_APP_SERVER_IP}/api/v1/menus/${menusId}`)
      .then((response) => {
        // 요청이 성공적으로 완료되었을 때 실행되는 코드
        // console.log(response.data); // 서버로부터 받은 데이터 출력
        const menuOptionData = response.data.responseData;
        const transformedData = transformData(menuOptionData);
        setMenuOptionData(menuOptionData);
        setTransformedData(transformedData);
        //선택된 메뉴의 이름은?
        setMenusName(menuOptionData.menusName);
      })
      .catch((error) => {
        // 요청이 실패했을 때 실행되는 코드
        console.error(error);
      });
  }, [menusId]);

  //선택된 옵션들, 옵션 선택시에 selected만 수정하고, 메뉴 제출시에 menuOptionIdList <= selected된 옵션들
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRequiredOptions, setSelectedRequiredOptions] = useState({});
  const mandatoryOptionCategories = transformedData
    .filter((category) => category.mandatory)
    .map((category) => category.menuOptionsCategory);

  //필수옵션 선택시, 수행되는 함수
  const handleRequiredOptionsClick = (groupId, buttonId) => {
    setSelectedRequiredOptions((prevSelected) => ({
      ...prevSelected,
      [groupId]: buttonId,
    }));
  };

  //선택옵션 선택시, selected를 수정하는 함수
  const handleOptionClick = (optionId) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(optionId)) {
        return prevOptions.filter((id) => id !== optionId); // 선택 해제
      } else {
        return [...prevOptions, optionId]; // 선택 추가
      }
    });
  };
  //CORS오류 방지
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
  };
  //메뉴 옵션 선택 후, 하단 버튼 클릭시 , 서버로 전송 ++ 서버로부터 장바구니 데이터 받기 -> 메뉴판에 표시
  const handleSubmitButton = () => {
    if (
      mandatoryOptionCategories.every((value) =>
        Object.prototype.hasOwnProperty.call(selectedRequiredOptions, value)
      )
    ) {
      const cartId = localStorage.getItem("cartId");
      const cart = {
        menusId: menusId,
        orderUsersId: cartId ? cartId : null, //최초 장바구니 담기는 null
        menusOptions: [
          ...Object.values(selectedRequiredOptions),
          selectedOptions,
        ].join(","),
      };
      // console.log("submit");
      // console.log(cart);

      //서버로 전송하기
      axios
        .post(`${process.env.REACT_APP_SERVER_IP}/api/v1/cart`, cart, config)
        .then((response) => {
          if (response.status === 200) {
            const cartId = response.data.responseData.cartId;
            // console.log(response.data);
            localStorage.setItem("cartId", cartId);

            axios
              .get(
                `${process.env.REACT_APP_SERVER_IP}/api/v1/cart/${cartId}`,
                config
              )
              .then((response) => {
                if (response.status === 200) {
                  const totalPrice = response.data.responseData.totalPrice;
                  // console.log("총가격:", totalPrice);
                  setTotalPrice(totalPrice);
                  onUpdatePrice(totalPrice);
                  onCloseModal(); // Move this inside the .then() block
                } else {
                  console.log(
                    "Request failed with status code:",
                    response.status
                  );
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
            if (!cartMenu.includes(menusName)) {
              setCartMenu((prevCartMenus) => [...prevCartMenus, menusName]);
            }
          } else {
            console.log("Request failed with status code:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    onUpdatePrice(totalPrice);
  }, [totalPrice, onUpdatePrice]);

  return (
    <>
      <ModalBackground />
      <ModalContainer>
        <h2
          style={{
            fontSize: "var(--font-big)",
            fontWeight: "bold",
            margin: "0.8rem 0",
          }}
        >
          {menuOptionData.menusName}
        </h2>
        <OptionConainer>
          {transformedData.map((category) => (
            <div
              key={`category_${category.menuOptionsCategory}`}
              style={{ paddingTop: "8px" }}
            >
              <OptionTitle $mandatory={category.mandatory.toString()}>
                {category.menuOptionsCategory}(
                {category.mandatory ? "필수" : "선택"})
              </OptionTitle>
              <Options>
                {category.mandatory ? (
                  <>
                    {/* 필수 일때 */}
                    {category.menuOptionsContents.map((option) => (
                      <Option
                        key={`optionId_${option.menuOptionsId}`}
                        onClick={() =>
                          handleRequiredOptionsClick(
                            category.menuOptionsCategory,
                            option.menuOptionsId
                          )
                        }
                        selected={
                          selectedRequiredOptions[
                            category.menuOptionsCategory
                          ] === option.menuOptionsId
                        }
                      >
                        <p style={{ marginBottom: "5px" }}>
                          {option.menuOptionsContents}
                        </p>
                        <p>
                          {option.menuOptionsPrice === 0
                            ? null
                            : `(${option.menuOptionsPrice})`}
                        </p>
                      </Option>
                    ))}
                  </>
                ) : (
                  <>
                    {/* 선택일때 */}
                    {category.menuOptionsContents.map((option) => (
                      <Option
                        key={`optionId_${option.menuOptionsId}`}
                        onClick={() => handleOptionClick(option.menuOptionsId)}
                        selected={selectedOptions.includes(
                          option.menuOptionsId
                        )}
                      >
                        <p style={{ marginBottom: "5px" }}>
                          {option.menuOptionsContents}
                        </p>
                        <p>
                          {option.menuOptionsPrice === 0
                            ? null
                            : `(${option.menuOptionsPrice})`}
                        </p>
                      </Option>
                    ))}
                  </>
                )}
              </Options>
            </div>
          ))}
        </OptionConainer>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            position: "sticky",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ModalButton
            onClick={() => {
              handleSubmitButton();
            }}
          >
            선택 완료
          </ModalButton>
        </div>
      </ModalContainer>
    </>
  );
}
