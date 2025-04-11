const sidebar = document.querySelector('#sidebar');
const closeBtn = document.querySelector('.cross-btn');
const productsBtn = document.querySelector('.products-btn');
const customersBtn = document.querySelector('.customer-btn');
const products = document.querySelector('#products');
const customers = document.querySelector('#customers');

const productNameInput = document.querySelector('#product-name');
const productPriceInput = document.querySelector('#product-price');
const productQuantityInput = document.querySelector('#product-quantity');

const companyInput = document.querySelector('#customer-company');
const customerEmailInput = document.querySelector('#customer-email');
const customerPhoneInput = document.querySelector('#customer-phone');
const customerNameInput = document.querySelector('#customer-name');

class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
class Customer {
  constructor(name, company, email, phone) {
    this.name = name;
    this.company = company;
    this.email = email;
    this.phone = phone;
  }
}

class ProductManager {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('products')) || [];
  }

  addProduct(name, price, quantity) {
    const product = new Product(name, price, quantity);
    this.products.push(product);
    this.saveToLocalStorage();
  }

  getProductsNumber() {
    return this.products.length;
  }

  saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  loadProducts() {
    const productList = document.querySelector('#product-list');
    this.products.forEach(product => {
      const productItem = document.createElement('tr');
      productItem.innerHTML = `<td>${product.name}</td><td>$${product.price}</td><td>${product.quantity}</td>`;
      productList.appendChild(productItem);
    });
    document.querySelector('.products-number').textContent = this.getProductsNumber();
  }
}

class CustomerManager {
  constructor() {
    this.customers = JSON.parse(localStorage.getItem('customers')) || [];
  }

  addCustomer(name, company, email, phone) {
    const customer = new Customer(name, company, email, phone);
    this.customers.push(customer);
    this.saveToLocalStorage();
  }

  getCustomersNumber() {
    return this.customers.length;
  }

  saveToLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  loadCustomers() {
    const customerList = document.querySelector('#customer-list');
    this.customers.forEach(customer => {
      const customerItem = document.createElement('tr');
      customerItem.innerHTML = `<td>${customer.name}</td><td>${customer.company}</td><td>${customer.email}</td><td>${customer.phone}</td><td>—</td>`;
      customerList.appendChild(customerItem);
    });
    document.querySelector('.customers-number').textContent = this.getCustomersNumber();
  }
}

const productManager = new ProductManager();
const customerManager = new CustomerManager();

// Load products and customers from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
  productManager.loadProducts();
  customerManager.loadCustomers();
});

function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const quantity = parseInt(productQuantityInput.value);

  if (name && !isNaN(price) && !isNaN(quantity)) {
    productManager.addProduct(name, price, quantity);

    const productList = document.querySelector('#product-list');
    const productItem = document.createElement('tr');
    productItem.innerHTML = `<td>${name}</td><td>$${price}</td><td>${quantity}</td>`;
    productList.appendChild(productItem);
    const toast= document.querySelector('.toast');
    setTimeout(() => {
    toast.style.display = "block";
    }, 1000);

    // Update header count
    document.querySelector('.products-number').textContent = productManager.getProductsNumber();

    // Clear inputs
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
  }
}

// Handle customer form
document.querySelector('#add-customer-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = customerNameInput.value.trim();
  const company = companyInput.value.trim();
  const email = customerEmailInput.value.trim();
  const phone = customerPhoneInput.value.trim();

  if (name && company && email && phone) {
    customerManager.addCustomer(name, company, email, phone);

    const customerList = document.querySelector('#customer-list');
    const customerItem = document.createElement('tr');
    customerItem.innerHTML = `<td>${name}</td><td>${company}</td><td>${email}</td><td>${phone}</td><td>—</td>`;
    customerList.appendChild(customerItem);

    // Update header count
    document.querySelector('.customers-number').textContent = customerManager.getCustomersNumber();

    // Clear inputs
    customerNameInput.value = '';
    companyInput.value = '';
    customerEmailInput.value = '';
    customerPhoneInput.value = '';
  }
});


// Attach product form handler
document.querySelector('#add-product-form').addEventListener('submit', function (e) {
  e.preventDefault();
  addProduct();
});

// Fix sidebar toggle
function expand() {
  sidebar.style.left = "0px";
}
function close() {
  sidebar.style.left = "-100%";
}
closeBtn.addEventListener('click', close);

// Toggle sections
productsBtn.addEventListener('click', function () {
  products.style.display = "block";
  customers.style.display = "none";
  close();
});
customersBtn.addEventListener('click', function () {
  products.style.display = "none";
  customers.style.display = "block";
  close();
});