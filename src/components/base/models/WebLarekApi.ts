import { IApi, IProductResponse } from "../../../types";

export class WebLarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductResponse> {
    return this.api.get<IProductResponse>('/product/');
  }
}