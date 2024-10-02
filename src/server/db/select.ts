import { and, eq, inArray, max, or } from "drizzle-orm";
import { type searchParamsCache } from "~/app/products/_components/nuqs-parsers";
import { db, type DrizzleWhere } from "./index";
import { grapes, type SelectWine, wines, winesToGrapes } from "./schema";

export async function getWines(
  input?: Awaited<ReturnType<typeof searchParamsCache.parse>>,
) {
  const where: DrizzleWhere<typeof wines.$inferSelect> = and(
    input?.categoria.length
      ? or(...input.categoria.map((cat) => eq(wines.categoria, cat)))
      : undefined,

    input?.tipo.length
      ? or(...input.tipo.map((t) => eq(wines.tipo, t)))
      : undefined,
    input?.pais.length
      ? or(...input.pais.map((p) => eq(wines.pais, p)))
      : undefined,
    input?.uva.length
      ? and(
          inArray(
            winesToGrapes.grapeId,
            db
              .select({ id: grapes.id })
              .from(grapes)
              .where(inArray(grapes.name, input.uva)),
          ),
        )
      : undefined,
  );
  const query = db
    .select({
      wines: wines,
    })
    .from(wines)
    .where(where)
    .$dynamic();

  if (input?.uva) {
    query.innerJoin(winesToGrapes, eq(wines.id, winesToGrapes.wineId));
  }
  const result = await query;

  const uniqueWines = Array.from(
    new Set(result.map((res) => res.wines.id)),
  ).map((id) => result.find((res) => res.wines.id === id)!.wines);

  return uniqueWines;
}

export async function getWineById(id: SelectWine["id"]) {
  return db
    .select()
    .from(wines)
    .where(eq(wines.id, id))
    .then((res) => res[0]);
}

export async function getMaxPrice() {
  const result = await db
    .select({ maxPrice: max(wines.preco) })
    .from(wines)
    .then((res) => res[0]?.maxPrice);
  return result;
}
