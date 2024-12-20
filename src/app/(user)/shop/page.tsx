import Container from "@/components/container";
import ProductList from "@/components/productList";
import React from "react";

const ShopPage = () => {
  return (
    <Container className="py-5">
      <h2 className="text-2xl font-semibold mb-5">
        All Available products list
      </h2>
      <ProductList />
    </Container>
  );
};

export default ShopPage;
