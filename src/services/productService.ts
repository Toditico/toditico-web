import { Product } from "@/types/shared";
import { stringify } from "qs";
import { BaseService } from "./baseService";

class ProductService extends BaseService<Product> {
  constructor() {
    super("products/web");
  }

  getData = () => {
    return this.getOne();
  };

  filterProducts = (
    text: string,
    inventoryId: string,
    currencyId: string,
    page: number,
    limit: number
  ) => {
    const queryParamsOptions = {
      text,
      inventoryId,
      currencyId,
      page,
      limit,
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    const url = `/filter?${queryParams}`;
    return this.instance.get(url).then((result) => result.data);
  };

  getAutocomplete = (text: string, inventoryId: string, currencyId: string) => {
    const queryParamsOptions = {
      text,
      inventoryId,
      currencyId,
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    const url = `/autocomplete?${queryParams}`;
    return this.instance.get(url).then((result) => result.data);
  };

  getDetails = (code: string, inventoryId: string, currencyId: string) => {
    const queryParamsOptions = {
      inventoryId,
      currencyId,
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    const url = `/details/${code}?${queryParams}`;
    return this.instance.get(url).then((result) => result.data);
  };
}

const productService = new ProductService();
export default productService;
