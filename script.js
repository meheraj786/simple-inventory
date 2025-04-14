const sidebar = document.querySelector('#sidebar');
const closeBtn = document.querySelector('.cross-btn');
const productsBtn = document.querySelector('.products-btn');
const customersBtn = document.querySelector('.customer-btn');
const incomeBtn = document.querySelector('.income-btn');
const products = document.querySelector('#products');
const customers = document.querySelector('#customers');
const incomeSection = document.querySelector('#income');

const productNameInput = document.querySelector('#product-name');
const productPriceInput = document.querySelector('#product-price');
const productQuantityInput = document.querySelector('#product-quantity');

const companyInput = document.querySelector('#customer-company');
const customerEmailInput = document.querySelector('#customer-email');
const customerPhoneInput = document.querySelector('#customer-phone');
const customerNameInput = document.querySelector('#customer-name');

const incomeProductInput = document.querySelector('#income-product-name');
const incomePriceInput = document.querySelector('#income-price');
const incomeQuantityInput = document.querySelector('#income-quantity');

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
    productList.innerHTML = '';
    this.products.forEach(product => {
      const productItem = document.createElement('tr');
      productItem.innerHTML = `<td>${product.name}</td><td>$${product.price}</td><td>${product.quantity}</td><button onclick="delet(this)">Delete</button>`;
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
    customerList.innerHTML = '';
    this.customers.forEach(customer => {
      const customerItem = document.createElement('tr');
      customerItem.innerHTML = `<td>${customer.name}</td><td>${customer.company}</td><td>${customer.email}</td><td>${customer.phone}</td><button onclick="delet(this)">Delete</button>`;
      customerList.appendChild(customerItem);
    });
    document.querySelector('.customers-number').textContent = this.getCustomersNumber();
  }
}

class Income {
  constructor(product, price, quantity) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

function delet(item){
  item.parentElement.remove()
}

class IncomeManager {
  constructor() {
    const storedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    this.incomes = storedIncomes.map(i => new Income(i.product, i.price, i.quantity));
  }

  addSale(product, price, quantity) {
    const income = new Income(product, price, quantity);
    this.incomes.push(income);
    this.saveToLocalStorage();
  }

  loadIncomes() {
    const incomeList = document.querySelector('#income-list');
    let totalIncome = 0;
    incomeList.innerHTML = '';
    this.incomes.forEach(income => {
      const incomeItem = document.createElement('tr');
      const total = income.getTotal();
      totalIncome += total;
      incomeItem.innerHTML = `<td>${income.product}</td><td>$${income.price}</td><td>${income.quantity}</td><td>$${total}</td><button onclick="delet(this)">Delete</button>`;
      incomeList.appendChild(incomeItem);
    });
    document.querySelector('.income').textContent = `$${totalIncome}`;
  }

  saveToLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(this.incomes));
  }
}

// Init
const productManager = new ProductManager();
const customerManager = new CustomerManager();
const incomeManager = new IncomeManager();

// Page Load
document.addEventListener('DOMContentLoaded', function () {
  productManager.loadProducts();
  customerManager.loadCustomers();
  incomeManager.loadIncomes();
});

// Add Product
function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const quantity = parseInt(productQuantityInput.value);

  if (name && !isNaN(price) && !isNaN(quantity)) {
    productManager.addProduct(name, price, quantity);
    productManager.loadProducts();

    document.querySelector('.toast').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.toast').style.display = 'none';
    }, 2000);

    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
  }
}

// Add Customer
document.querySelector('#add-customer-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = customerNameInput.value.trim();
  const company = companyInput.value.trim();
  const email = customerEmailInput.value.trim();
  const phone = customerPhoneInput.value.trim();

  if (name && company && email && phone) {
    customerManager.addCustomer(name, company, email, phone);
    customerManager.loadCustomers();

    customerNameInput.value = '';
    companyInput.value = '';
    customerEmailInput.value = '';
    customerPhoneInput.value = '';
  }
});

// Add Income
document.querySelector('#add-income-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const product = incomeProductInput.value.trim();
  const price = parseFloat(incomePriceInput.value);
  const quantity = parseInt(incomeQuantityInput.value);

  if (product && !isNaN(price) && !isNaN(quantity)) {
    incomeManager.addSale(product, price, quantity);
    incomeManager.loadIncomes();

    incomeProductInput.value = '';
    incomePriceInput.value = '';
    incomeQuantityInput.value = '';
  }
});

// Add Product Submit
document.querySelector('#add-product-form').addEventListener('submit', function (e) {
  e.preventDefault();
  addProduct();
});

// Sidebar Toggle
function expand() {
  sidebar.style.left = "0px";
}
function close() {
  sidebar.style.left = "-100%";
}
closeBtn.addEventListener('click', close);

// Navigation Buttons
productsBtn.addEventListener('click', () => {
  products.style.display = "block";
  customers.style.display = "none";
  incomeSection.style.display = "none";
  close();
});
customersBtn.addEventListener('click', () => {
  products.style.display = "none";
  customers.style.display = "block";
  incomeSection.style.display = "none";
  close();
});
incomeBtn.addEventListener('click', () => {
  products.style.display = "none";
  customers.style.display = "none";
  incomeSection.style.display = "block";
  close();
});
