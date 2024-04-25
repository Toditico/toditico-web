import { HomeResponse } from "@/types/home";
import { ClientBaseService } from "./clientBaseService";

class ClientHomeService extends ClientBaseService<HomeResponse> {
  constructor() {
    super("home/");
  }

  getData = () => {
    return this.getOne();
  };
}

const clientHomeService = new ClientHomeService();
export default clientHomeService;
