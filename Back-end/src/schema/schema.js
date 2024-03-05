import { blob, sqliteTable } from "drizzle-orm/sqlite-core";

export const productImages = sqliteTable('product_images', {
  id: blob('id').primaryKey(),
  name: blob('name').notNull(),
  image: blob('image_data').notNull(),
});