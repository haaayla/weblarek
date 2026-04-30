import './scss/styles.scss';
import { Products } from "./components/models/Products";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { Api } from "./components/base/Api";
import { apiProducts } from "./utils/data";
import { WebLarekApi } from "./components/models/WebLarekApi";
import { API_URL } from "./utils/constants";

const products = new Products();
const cart = new Cart();
const buyer = new Buyer();
const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

// Тест Products
console.log('--- PRODUCTS ---');

products.setItems(apiProducts.items);

console.log('ALL PRODUCTS:', products.getItems());

const first = products.getItems()[0];
console.log('ONE PRODUCT:', first);

if (first) {
  products.setSelectedItem(first);
}

console.log('SELECTED:', products.getSelectedItem());


// Тест Cart
console.log('--- CART ---');

cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[1]);

console.log('ITEMS:', cart.getItems());
console.log('COUNT:', cart.getCount());
console.log('TOTAL:', cart.getTotalPrice());

cart.removeItem(apiProducts.items[0].id);
console.log('AFTER REMOVE:', cart.getItems());

cart.clear();
console.log('AFTER CLEAR:', cart.getItems());


// Тест Buyer
console.log('--- BUYER ---');

buyer.setData({ email: 'test@mail.com' });
console.log('DATA:', buyer.getData());

console.log('VALIDATION:', buyer.validate());

buyer.setData({
  payment: 'card',
  phone: '+79999999999',
  address: 'Москва'
});

console.log('VALIDATION AFTER:', buyer.validate());

buyer.clear();
console.log('AFTER CLEAR:', buyer.getData());

webLarekApi.getProducts()
  .then(data=> {
    console.log('FROM API:', data);

    products.setItems(data.items);

    console.log('PRODUCTS FROM MODEL:', products.getItems());
  })
  .catch(err => {
    console.error('API ERROR:', err);
  });