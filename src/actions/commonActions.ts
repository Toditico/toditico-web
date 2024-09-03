"use server";

import commonService from "@/services/commonService";
import { CommonResponse } from "@/types/home";
import { getNearestMultipleOf50 } from "@/utils/numbers";

const getCommonDataAction = async (): Promise<CommonResponse> => {
  const data = await commonService.getData();
  data.stats.customers = getNearestMultipleOf50(data.stats.customers);
  data.stats.products = getNearestMultipleOf50(data.stats.products);
  data.stats.sales = getNearestMultipleOf50(data.stats.sales);
  return data;
};

export { getCommonDataAction };
