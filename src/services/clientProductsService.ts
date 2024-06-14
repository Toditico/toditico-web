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

  filterProducts = (
    text: string,
    currencyId: string,
    inventoryId: string,
    page: number,
    limit: number
  ) => {
    return this.getAll(
      `filter?text=${text}&currency=${currencyId}&inventory=${inventoryId}&page=${page}&limit=${limit}`
    );
  };
}

const clientProductService = new ClientProductService();
export default clientProductService;
