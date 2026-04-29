import './scss/styles.scss';
import { Products } from "./components/base/models/Products";
import { Cart } from "./components/base/models/Cart";
import { Buyer } from "./components/base/models/Buyer";
import { Api } from "./components/base/Api";
import { WebLarekApi } from "./components/base/models/WebLarekApi";
import { API_URL } from "./utils/constants";

const products = new Products();
const cart = new Cart();
const buyer = new Buyer();
const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

// Тест Products
console.log('--- PRODUCTS ---');

products.setItems([
  {
    id: '1',
    title: 'Test product',
    description: '',
    image: '',
    category: '',
    price: 100
  }
]);

console.log('ALL PRODUCTS:', products.getItems());

const first = products.getItem('1');
console.log('ONE PRODUCT:', first);

if (first) {
  products.setSelectedItem(first);
}

console.log('SELECTED:', products.getSelectedItem());

console.log('--- CART ---');

cart.addItem({
  id: '1',
  title: 'Test product',
  description: '',
  image: '',
  category: '',
  price: 100
});

cart.addItem({
  id: '2',
  title: 'Second product',
  description: '',
  image: '',
  category: '',
  price: 200
});

console.log('ITEMS:', cart.getItems());
console.log('COUNT:', cart.getCount());
console.log('TOTAL:', cart.getTotalPrice());

cart.removeItem('1');
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