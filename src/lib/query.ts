import { groq } from "next-sanity";

const bannerQuery = groq`*[_type == "banner"]{
  ...
}|order(_createdAt asc)`;
const productQuery = groq`*[_type == "product"]{
  ...
}|order(_createdAt asc)`;
const bestSellersQuery = groq`*[_type == "product" && position == Bestsellers]{
  ...
}|order(_createdAt asc)`;

export { bannerQuery, bestSellersQuery, productQuery };
