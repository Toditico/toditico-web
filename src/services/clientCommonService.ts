import { CommonResponse } from "@/types/home";
import { ClientBaseService } from "./clientBaseService";

class ClientCommonService extends ClientBaseService<CommonResponse> {
  constructor() {
    super("common/");
  }

  getData = () => {
    return this.getOne();
  };
}

const clientCommonService = new ClientCommonService();
export default clientCommonService;
