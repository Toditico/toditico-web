import { Product } from "@/types/shared";
import { ClientBaseService } from "./clientBaseService";
import { stringify } from "qs";

class ClientProductService extends ClientBaseService<Product> {
  constructor() {
    super("products/");
  }

  getData = () => {
    return this.getOne();
  };

  getAutocomplete = (text: string, inventory: string) => {
    const queryParamsOptions = {
      text,
      inventory,
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    return this.getAll(`autocomplete?${queryParams}`);
  };
}

const clientProductService = new ClientProductService();
export default clientProductService;
