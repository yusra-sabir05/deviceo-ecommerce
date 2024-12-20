import { type SchemaTypeDefinition } from "sanity";
import banners from "../schemas/banners";
import product from "./product";
import category from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banners, product, category],
};
