"use server";

import commonService from "@/services/commonService";
import { CommonResponse } from "@/types/home";

const getCommonDataAction = async (): Promise<CommonResponse> => {
  const data = await commonService.getData();
  return data;
};

export { getCommonDataAction };
