export default function getCartFromLocalStorage() {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}
