import { APIError } from "@/types";

export abstract class ClientBaseService<T> {
  protected baseURL: string;

  constructor(entityPath: string) {
    this.baseURL = `/api/${entityPath}`;
  }

  protected getOne = async (url: string = ""): Promise<T> => {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const res = await fetch(`${this.baseURL}${url}`);
        if (res.ok) {
          const data = await res.json();
          resolve(data);
        } else {
          const apiError: APIError = {
            statusCode: res.status,
            message: res.statusText,
          };
          reject(apiError);
        }
      } catch (error) {}
    });
  };

  protected getById = (id: string): Promise<T> => {
    return this.getOne(`/${id}`);
  };
}
