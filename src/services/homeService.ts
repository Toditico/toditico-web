import {HomeResponse} from "@/types/home";
import { BaseService } from "./baseService";

class HomeService extends BaseService<HomeResponse> {
  constructor() {
    super("home-view");
  }

  getData = () => {
    return this.getOne();
  };
}

const homeService = new HomeService();
export default homeService;
