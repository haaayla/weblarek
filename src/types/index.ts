export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Товар
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Способ оплаты
export type TPayment = 'online' | 'cash';

// Покупатель
export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

// Ошибки валидации покупателя
export type IBuyerErrors = Partial<Record<keyof IBuyer, string>>;

// Тип ответа сервера
export interface IProductResponse {
    total: number;
    items: IProduct[];
}

// Данные для отправки заказа
export interface IOrderRequest extends IBuyer {
  payment: TPayment;
  items: string[];
  total: number;
}

export interface IOrderResponse {
  id: string;
  total: number;
}