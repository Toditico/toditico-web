import { CommonResponse } from "@/types/home";
import { BaseService } from "./baseService";

class CommonService extends BaseService<CommonResponse> {
  constructor() {
    super("common");
  }

  getData = () => {
    return this.getOne();
  };
}

const commonService = new CommonService();
export default commonService;
