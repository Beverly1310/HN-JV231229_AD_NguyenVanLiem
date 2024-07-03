import React, { createContext, useState } from "react";
import Header from "../layouts/header/Header";
import ListProduct from "../components/product/ListProduct";
import ProductJson from "../data.json";
import Swal from "sweetalert2";


export const GlobalContext = createContext();

export default function Global() {
  // Lấy dữ liệu carts trên localStorage
  const [carts, setCarts] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });
  /**
   * hàm thêm sản phẩm vào giỏ hàng
   * @param {*} product sản phẩm khi đc thêm vào giỏ hàng
   */
  const handleAddToCart = (product) => {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const findIndexProduct = carts.findIndex(
      (cart) => cart.product.id === product.id
    );
    //nếu chưa có thì thêm mới
    if (findIndexProduct === -1) {
      const newCart = {
        id: Math.round(Math.random() * 10000),
        product: product,
        quantity: 1,
      };
      const updateCart = [...carts, newCart];
      setCarts(updateCart);
      localStorage.setItem("carts", JSON.stringify(updateCart));
      // nếu có rồi thì tăng số lượng lên 1
    } else {
      const newCartUpdate = [...carts];
      // nếu vượt quá stock thì thông báo
      if (newCartUpdate[findIndexProduct].quantity >= product.stock) {
        Swal.fire({
          title: "Error!",
          text: "Không đủ số lượng tồn kho",
          icon: "error",
          confirmButtonText: "Cool",
        });
        //nếu đủ thì thay đổi số lượng
      } else {
        newCartUpdate[findIndexProduct].quantity =
          newCartUpdate[findIndexProduct].quantity + 1;
        setCarts(newCartUpdate);
        localStorage.setItem("carts", JSON.stringify(newCartUpdate));
      }
    }
  };
//các hàm và stage dùng chung
  const dataGlobal = {
    products: ProductJson.products,
    carts,
    handleAddToCart,
    cartLength: carts.length,
    setCarts,
  };

  return (
    <>
      <GlobalContext.Provider value={dataGlobal}>
        <Header />
        <ListProduct />
      </GlobalContext.Provider>
    </>
  );
}
