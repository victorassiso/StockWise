import { CategoryNotFoundError } from "@/use-cases/errors/category-not-found";
import { makeUpdateCategoryCase } from "@/use-cases/factories/make-update-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateCategoriesBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
  });

  const { id, name } = updateCategoriesBodySchema.parse(request.body);

  try {
    const updateCategoriesUseCase = makeUpdateCategoryCase();

    await updateCategoriesUseCase.execute({ id, name });
  } catch (err) {
    if (err instanceof CategoryNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(200).send();
}