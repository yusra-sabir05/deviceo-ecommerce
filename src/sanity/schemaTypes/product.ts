import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Keep the title relative to product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "Slug for the product",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Description of the product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      type: "array",
      title: "Category",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rowprice",
      type: "number",
      title: " Row Price",
    }),
    defineField({
      name: "ratings",
      type: "number",
      title: "Ratings",
    }),
    defineField({
      name: "isnew",
      type: "number",
      title: "New Arrival",
    }),
    defineField({
      name: "position",
      type: "number",
      title: "Position",
    }),
    defineField({
      name: "brand",
      type: "string",
      title: "Brand",
    }),
    defineField({
      name: "quantity",
      type: "number",
      title: "Quantity",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      position: "position",
    },
  },
});
