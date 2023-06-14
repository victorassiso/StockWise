import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sale_items", (table) => {
    table.uuid("id").primary();
    table.uuid("product_id").references("id").inTable("products");
    table.uuid("sale_id").references("id").inTable("sales");
    table.float("amount");
    table.float("price");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sale_items");
}