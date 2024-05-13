import { Product } from "@/types/shared";
import { ClientBaseService } from "./clientBaseService";
import { stringify } from "qs";

class ClientProductService extends ClientBaseService<Product> {
  constructor() {
    super("products/");
  }

  getDetails = (code: string, currencyId: string, inventoryId: string) => {
    return this.getOne(
      `/details/${code}?currency=${currencyId}&inventory=${inventoryId}`
    );
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
