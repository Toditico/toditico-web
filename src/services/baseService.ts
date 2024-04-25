import axios, { AxiosInstance } from "axios";
import { FilterQuery } from "mongoose";
import { stringify } from "qs";
import { BackendQueryOptions } from "../types/index";

export abstract class BaseService<T> {
  protected instance: AxiosInstance;

  constructor(entityPath: string) {
    this.instance = axios.create({
      baseURL: `${process.env.BASE_URL}${entityPath}`,
    });
    this.instance.defaults.headers.common["x-api-key"] = process.env.API_KEY;
  }

  protected getAll = (
    filter: FilterQuery<T> = {},
    options: BackendQueryOptions = {}
  ): Promise<T[]> => {
    const queryParamsOptions = {
      ...options,
      filter: JSON.stringify(filter),
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    const url = `?${queryParams}`;
    return this.instance.get(url).then((result) => result.data);
  };

  protected getOne = (): Promise<T> => {
    return this.instance.get("/").then((result) => result.data);
  };

  protected getById = (id: string): Promise<T> => {
    return this.instance.get(`/${id}`);
  };

  protected count = (filter: FilterQuery<T> = {}): Promise<Number> => {
    const queryParamsOptions = {
      filter: JSON.stringify(filter),
    };
    const queryParams = stringify(queryParamsOptions, { indices: false });
    const url = `/count?${queryParams}`;
    return this.instance.get(url).then((result) => result.data);
  };
}
