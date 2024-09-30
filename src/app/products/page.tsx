import { getWines } from "~/server/db/select";

import ProductsPage from "./_components/products-page";
import { searchParamsCache } from "./_components/nuqs-parsers";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { categoria } = searchParamsCache.parse(searchParams);

  const wines = await getWines({ categoria });
  return <ProductsPage wines={wines} />;
}
