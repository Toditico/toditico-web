import { Product } from "@/types/shared";
import { stringify } from "qs";
import { BaseService } from "./baseService";

class ProductService extends BaseService<Product> {
  constructor() {
    super("products");
  }

  getData = () => {
    return this.getOne();
  };

  getAutocomplete = (text: string, inventoryId: string) => {
    const queryParamsOptions = {
      text,
      inventoryId,
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
