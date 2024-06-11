import { Product } from "@/types/shared";
import { ClientBaseService } from "./clientBaseService";

class ClientProductService extends ClientBaseService<Product> {
  constructor() {
    super("products/");
  }

  getDetails = (code: string, currencyId: string, inventoryId: string) => {
    return this.getOne(
      `/details/${code}?currency=${currencyId}&inventory=${inventoryId}`
    );
  };

  getAutocomplete = (text: string, currencyId: string, inventoryId: string) => {
    return this.getAll(
      `autocomplete?text=${text}&currency=${currencyId}&inventory=${inventoryId}`
    );
  };
}

const clientProductService = new ClientProductService();
export default clientProductService;
