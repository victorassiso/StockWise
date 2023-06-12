import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance) {
  // Select all products
  app.get("/", async () => {
    const transaction = await knex("products").select("*");

    return { transaction };
  });

  // Select one product by id
  app.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex("products").where("id", id).first();

    return { transaction };
  });

  // Create new product
  app.post("/", async (request, response) => {
    const createTransactionBodySchema = z.object({
      name: z.string(),
      status: z.enum(["active", "inactive"]),
      price: z.number(),
    });

    const { name, status, price } = createTransactionBodySchema.parse(
      request.body
    );

    const product = await knex("products").insert({
      id: randomUUID(),
      name,
      status,
      price,
    });
    return response.status(201).send("✔ Transaction created successfully.");
  });
}