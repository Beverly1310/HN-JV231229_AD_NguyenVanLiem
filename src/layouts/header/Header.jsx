import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/Global";
import { useState } from "react";
import ShoppingCart from "./ShoppingCart";
export default function Header() {
  const { carts, setCarts } = useContext(GlobalContext);
  const { cartLength } = useContext(GlobalContext);
 
  const [isOpenCart, setIsOpenCart] = useState(false)
  const showCart = () => {
    setIsOpenCart(!isOpenCart);
  };
  return (
    <>
      <header className="h-[56px] w-full bg-orange-500 flex items-center justify-between px-12 text-white fixed z-[1]">
        <ul className="flex gap-3">
          <li>Trang chủ</li>
          <li>Danh sách sản phẩm</li>
        </ul>
        <div className="relative">
          <ShoppingCartOutlined className="text-[24px]" onClick={showCart} />
          <p className="bg-red-500 px-2 text-[12px] absolute top-[-10px] right-[-20px] rounded-lg hover:text-[14px] transition-all duration-75 ease-linear">
            {cartLength > 9 ? "9+" : cartLength}
          </p>
        </div>
        {isOpenCart && <ShoppingCart  carts={carts} setCarts={setCarts} />}
      </header>
    </>
  );
}
