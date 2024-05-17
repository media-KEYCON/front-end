// 세자릿수마다 ','를 붙여준다

export default function convertPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
