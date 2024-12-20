import { client } from "@/sanity/lib/client";
import { bannerQuery, bestSellersQuery, productQuery } from "./query";
export const revalidate = 0;
const getBannerData = async () => {
  const bannerData = await client.fetch(bannerQuery);
  return bannerData;
};
const getProductData = async () => {
  const productsData = await client.fetch(productQuery);
  return productsData;
};
const getBestSellersData = async () => {
  const bestSellersData = await client.fetch(bestSellersQuery);
  return bestSellersData;
};

export { getBannerData, getBestSellersData, getProductData };
