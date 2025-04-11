const sidebar = document.querySelector('#sidebar');
const closeBtn= document.querySelector('.cross-btn');
const productsBtn = document.querySelector('.products-btn');
const customersBtn = document.querySelector('.customer-btn');
const products = document.querySelector('#products');
const customers = document.querySelector('#customers');

const company= document.querySelector('#customer-company');
const customerEmail= document.querySelector('#customer-email');
const customerPhone= document.querySelector('#customer-phone');


class Product{
  constructor(name, price, quantity){
    this.name=name;
    this.price=price;
    this.quantity=quantity;
  }
}
class ProductManager{
  constructor(){
    this.products=[];
  }
  addProduct(name, price, quantity){
    const product= new Product(name, price, quantity);
    this.products.push(product);
  }
  getProductsNumber(){
    return this.products.length;
  }
}
class Customer{
  constructor(name, company, email, phone){
    this.name=name;
    this.company=company;
    this.email=email;
    this.phone=phone;
  }
}

const productManager= new ProductManager();
function addProduct(){
  const productName= document.querySelector('#product-name').value
const productPrice= document.querySelector('#product-price').value
const productQuantity= document.querySelector('#product-quantity').value

// const product = new Product(productName, productPrice, productQuantity);
productManager.addProduct(productName, productPrice, productQuantity);
const productList= document.querySelector('#product-list');
const productItem= document.createElement('tr');
productItem.innerHTML=`<td>${productName}</td><td>${productPrice}</td><td>${productQuantity}</td>`;
productList.appendChild(productItem);
console.log(productItem);
// productName=""
// productPrice=""
// productQuantity=""

}


















function expand(){
  sidebar.style.left="0px"
}
closeBtn.addEventListener('click', close);
function close(){
  sidebar.style.left="-100%"
}
productsBtn.addEventListener('click', function(){
  products.style.display="block";
  customers.style.display="none";
  close()
})
customersBtn.addEventListener('click', function(){
  products.style.display="none";
  customers.style.display="block";
  close()
})