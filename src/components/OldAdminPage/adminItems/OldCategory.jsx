import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

import OldMenuInput from "./OldMenuInput";
import OldPriceInput from "./OldPriceInput";
import OldOption from "./OldOption";

const CategoryBox = styled.div`
  background-color: #efefef;
  padding: 15px;
  margin-bottom: 16px;
`;

const CategoryName = styled.div`
  /* 카테고리명 */
  margin-bottom: 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CategoryInput = styled.input`
  /* 카테고리 적혀있을 박스 */
  background-color: #fff;
  padding: 10px 20px;
  border: none;
  resize: none;
  width: 90%;

  font-size: 16px;
  font-weight: bolder;
`;

const Text = styled.div`
  display: flex;
`;

const SoldOutText = styled.div`
  /* 품절 */
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MenuText = styled.div`
  /* 메뉴명 */
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 5rem;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PriceText = styled.div`
  /* 가격 */
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 11rem;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Box = styled.div`
  /* INput들 담는 박스  */
  display: flex;
`;

const Checkmark = styled.span`
  /* 체크박스 안에 표시되는 마크 */
  position: absolute;
  top: 2px;
  left: 0.5rem;
  width: 5px;
  height: 10px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  display: ${(props) => (props.checked ? "block" : "none")};
`;

const SoldOutCheckBox = styled.div`
  /* 품절 체크박스  */
  background-color: #fff;
  margin-left: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  cursor: pointer;
`;

const MenuPlus = styled.div`
  background-color: #fff;
  padding: 5px 20px;
  border-radius: 5px;
  margin: 20px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;

  &:active {
    background-color: #cfcfcf;
  }

  .plus {
    margin-right: 2px;
    border-radius: 3px;
    width: 13px;
    height: 13px;
    background-color: var(--primary-color);
    color: white;
    padding: 2px;
  }
`;

export default function OldCategory({
  categoryId,
  categoryName,
  menusList,
  setCategories,
  getMenuData,
}) {
  //const [categoryName, setCategoryName] = useState("");
  const [MenuName, setMenuName] = useState("");
  const [PriceName, setPriceName] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const handleSoldOutToggle = (index) => {
    setMenuItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isSoldOut: !item.isSoldOut } : item
      )
    );
  };

  const handleMenuPlusClick = () => {
    const newItem = {
      isSoldOut: false, // Initialize the isSoldOut status to false for the new item
      menuName: MenuName,
      priceName: PriceName,
      menuOptionsList: [],
    };
    setMenuItems([...menuItems, newItem]);
    setMenuName("");
    setPriceName("");
  };

  // const getMenuData = () => {
  //   const menusList = menuItems.map((item) => ({
  //     menusCategory: categoryName,
  //     menusName: item.menuName,
  //     menusPrice: item.priceName,
  //     menuOptionsList: item.menuOptionsList,
  //   }));
  //   return menusList;
  // };

  useEffect(() => {
    setCategories((prevCategories) => {
      const newCategories = prevCategories.map((category) => {
        if (category.categoryId === categoryId) {
          return {
            ...category,
            categoryName: categoryName,
            menusList: menuItems,
          };
        }
        return category;
      });
      return newCategories;
    });
  }, [categoryName, menuItems]);

  return (
    <CategoryBox>
      <div>
        <CategoryName>카테고리명</CategoryName>
        <CategoryInput
          type="text"
          placeholder="카테고리 입력"
          value={categoryName}
          onChange={(e) =>
            setCategories((prevCategories) => {
              const newCategories = prevCategories.map((category) => {
                if (category.categoryId === categoryId) {
                  return {
                    ...category,
                    categoryName: e.target.value,
                  };
                }
                return category;
              });
              return newCategories;
            })
          }
          contentEditable
        ></CategoryInput>

        <Text>
          <SoldOutText>품절</SoldOutText>
          <MenuText>메뉴명</MenuText>
          <PriceText>가격</PriceText>
        </Text>

        {menuItems.map((item, index) => (
          <Box key={index}>
            <SoldOutCheckBox onClick={() => handleSoldOutToggle(index)}>
              <Checkmark checked={item.isSoldOut} />
            </SoldOutCheckBox>

            <OldMenuInput
              value={item.menuName}
              onChange={(e) =>
                setMenuItems((prevItems) =>
                  prevItems.map((prevItem, i) =>
                    i === index
                      ? { ...prevItem, menuName: e.target.value }
                      : prevItem
                  )
                )
              }
              onClear={() =>
                setMenuItems((prevItems) =>
                  prevItems.map((prevItem, i) =>
                    i === index ? { ...prevItem, menuName: "" } : prevItem
                  )
                )
              }
            />

            <OldPriceInput
              value={item.priceName}
              onChange={(e) =>
                setMenuItems((prevItems) =>
                  prevItems.map((prevItem, i) =>
                    i === index
                      ? { ...prevItem, priceName: e.target.value }
                      : prevItem
                  )
                )
              }
              onClear={() =>
                setMenuItems((prevItems) =>
                  prevItems.map((prevItem, i) =>
                    i === index ? { ...prevItem, priceName: "" } : prevItem
                  )
                )
              }
            />
            <OldOption
              menuOptionsList={item.menuOptionsList}
              setMenuItems={setMenuItems}
              index={index}
            />
          </Box>
        ))}
        <MenuPlus onClick={handleMenuPlusClick}>
          <FaPlus className="plus" />
          메뉴추가
        </MenuPlus>
      </div>
      <button onClick>GetMenuData</button>
    </CategoryBox>
  );
}
