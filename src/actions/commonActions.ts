"use server";

import commonService from "@/services/commonService";
import { getNearestMultipleOf50 } from "@/utils/numbers";
import { unstable_cache } from "next/cache";

const GET_COMMON_DATA_REVALIDATE_SECONDS = 180;

const getCommonDataAction = unstable_cache(
  async () => {
    const data = await commonService.getData();
    data.stats.customers = getNearestMultipleOf50(data.stats.customers);
    data.stats.products = getNearestMultipleOf50(data.stats.products);
    data.stats.sales = getNearestMultipleOf50(data.stats.sales);
    return data;
  },
  undefined,
  { revalidate: GET_COMMON_DATA_REVALIDATE_SECONDS },
);

export { getCommonDataAction };
