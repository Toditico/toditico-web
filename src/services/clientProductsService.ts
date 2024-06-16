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
    moduleId: string,
    page: number,
    limit: number
  ) => {
    return this.getAllPaginated(
      `filter?text=${text}&currency=${currencyId}&inventory=${inventoryId}&module=${moduleId}&page=${page}&limit=${limit}`
    );
  };
}

const clientProductService = new ClientProductService();
export default clientProductService;
