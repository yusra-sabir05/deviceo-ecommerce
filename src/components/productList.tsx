import React from "react";
import { ProductData } from "../../type";
import { getProductData } from "@/lib/gitdata";
import ProductCard from "./productCard";

const ProductList = async () => {
  const products: ProductData[] = await getProductData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products?.map((item) => <ProductCard key={item?._id} item={item} />)}
    </div>
  );
};

export default ProductList;
