import { Button, Card } from "antd";
import React, { useContext } from "react";
import { handleFormatMoney } from "../../utils/formatData";
import { GlobalContext } from "../../context/Global";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function ProductItem({ product }) {
  const { handleAddToCart } = useContext(GlobalContext);

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img
            style={{ maxHeight: 300, minHeight: 300 }}
            alt="example"
            src={product.image}
          />
        }
      >
        <div className="text-center flex flex-col gap-2">
          <h3 className="font-semibold">{product.productName}</h3>
          <p>{handleFormatMoney(product.price)}</p>
          <Button onClick={() => handleAddToCart(product)} type="primary">
          <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </Button>
        </div>
      </Card>
    </>
  );
}
