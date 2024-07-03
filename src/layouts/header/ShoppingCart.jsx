import { Avatar, Button } from "antd";
import React from "react";
import { handleFormatMoney } from "../../utils/formatData";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2'
export default function ShoppingCart({ carts, setCarts }) {
  /**
   * hàm tăng số lượng sản phẩm
   * @param {*} index vị trí của sản phẩm trong mảng
   */
  const plusPro = (index) => {
    // nếu không đủ số lượng tồn kho thì thông báo
    if (carts[index].product.stock <= carts[index].quantity) {
      Swal.fire({
        title: 'Error!',
        text: 'Không đủ số lượng tồn kho',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      // nếu đủ thì +1
    } else {
      carts[index].quantity += 1;
      const newCart = [...carts];
      setCarts(newCart);
    }
  };
  /**
   * hàm trừ số lượng sản phẩm
   * @param {*} index vị trí của sản phẩm trong mảng
   */
  const minusPro = (index) => {
    // nếu số lượng trong giỏ hảng >1 thì số lượng -1
    if (carts[index].quantity > 1) {
      carts[index].quantity -= 1;
      // néu số lượng bằng 1 thì xóa khỏi giỏ hàng
    } else {
      carts.splice(index, 1);
    }
    const newCart = [...carts];
    setCarts(newCart);
  };
  //xóa toàn bộ sản phẩm khỏi giỏ hàng
  const deleteAll = () => {
    setCarts([]);
  };
  // xóa một sản phẩm khỏi giỏ hàng
  const deleteCart = (index)=>{
    carts.splice(index, 1);
    const newCart = [...carts];
    setCarts(newCart);
  }
  return (
    <>
      <div className="fixed right-1 top-[55px] ">
        <div className="bg-black w-[550px] text-white rounded px-5 py-4">
          <h3 className=" font-semibold text-2xl mb-2">Cart</h3>
          <hr />
          <ul className="flex flex-col gap-4 mt-3 pr-5 min-h-[300px] max-h-[500px] overflow-auto">
            {carts.length >= 1 ? (
              <>
                <Button onClick={deleteAll}>Xóa toàn bộ sản phẩm</Button>
                {carts.map((item, index) => (
                  <>
                    <div className="flex gap-3">
                    <Avatar size={64}  src={item.product.image}/>
                      <h2 className="py-9 ml-4 w-[200px]">{item.product.productName}</h2>
                      <div className="py-9 flex gap-3">
                        <Button onClick={() => minusPro(index)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button onClick={() => plusPro(index)}>+</Button>
                        <DeleteOutlined style={{height:"30px"}} onClick={()=>deleteCart(index)}/>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <h1 className="text-center font-bold text-xl">
                Chưa có sản phẩm trong giỏ hàng
              </h1>
            )}
          </ul>
          <hr className="mt-5" />
          <footer className="flex items-center gap-5 pt-5">
            <span>Tổng tiền: </span>
            <span>
              {handleFormatMoney(
                carts
                  .reduce((a, b) => a + b.quantity*b.product.price, 0)
              )}
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
