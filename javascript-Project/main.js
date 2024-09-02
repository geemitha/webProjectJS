
const weatherAPIKey = '1a9177d1625cadd6f337a577fa4e3b26';
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`

const galleryImages = [
   {
      src: './assets/gallery/image1.jpg',
      alt: 'Thumbnail Image 1'
   },
   {
      src: './assets/gallery/image2.jpg',
      alt: 'Thumbnail Image 2'
   },
   {
      src: './assets/gallery/image3.jpg',
      alt: 'Thumbnail Image 3'
   }
  
]; 

const products = [
   {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
];

//Menue section 

function menuHandler(){

document.querySelector('#open-nav-menu').addEventListener('click', function(){
   document.querySelector('header nav .wrapper').classList.add('nav-open');
});
document.querySelector('#close-nav-menu').addEventListener('click', function(){
    document.querySelector('header nav .wrapper').classList.remove('nav-open');
 });
}

//convert temprature 
function celsToFhr(temperature){
   let fahr = (temperature * 9/5 ) + 32
   return fahr;
 }

 //Greeting section 
function greetingHandler(){

let currentHour = new Date().getHours();
let geetingText; 

if (currentHour < 12){
   geetingText = 'Good morning!';
}else if (currentHour < 19){
   geetingText = 'Good afternoon!';
}else if (currentHour < 24){
   geetingText = 'Good evening!';
}else{
   greetingText = "welcome!";
}

document.querySelector('#greeting').innerHTML = geetingText;

 
}

//local time setup 
function clockHandler(){

// console.log('outside the timeout')

// //this function delay the action (in this one we delay in 3 seconds)

// setTimeout(function(){
//  console.log('inside the timeout')
// },3000);

//this function will execute the cide every second the action 

setInterval(function(){
   let localTime = new Date();
                                                                  //we can add aextra sting to the output value
   document.querySelector('span[data-time=hours]').textContent = localTime.getHours().toString().padStart(2,"0");
   document.querySelector('span[data-time=minutes]').textContent = localTime.getMinutes().toString().padStart(2,"0");
   document.querySelector('span[data-time=seconds]').textContent = localTime.getSeconds().toString().padStart(2,"0");
},1000);
}

//Gallery section 
function galleryHandler(){


/* for (let i in galleryImages){
   console.log(galleryImages[i]);
} */

   // >: This is a child combinator. It selects direct child elements of the parent.
  let mainImage =  document.querySelector("#gallery > img")
  let thumbnails = document.querySelector("#gallery .thumbnails")

  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;



galleryImages.forEach(function(image,index){
   let thumb = document.createElement('img');
   thumb.src = image.src;
   thumb.alt = image.alt;
   thumb.dataset.arrayIndex = index;
  

   // if (index === 0){
   //    thumb.dataset.selected = true;
   // }else{
   //    thumb.dataset.selected = false;
   // }
   //insted of using the above code we can use the JS Ternary condition like below 
   thumb.dataset.selected = index === 0 ? true : false ;

   thumb.addEventListener('click', function(e){
        let selectedIndex = e.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex];
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;

        thumbnails.querySelectorAll('img').forEach(function(img){
         img.dataset.selected = false;
        });
   });

   thumbnails.appendChild(thumb);

});
}

//Products Section

//This array will take an arry of products and populate that area 
function populateProducts(productList) {
   
   let productsSection = document.querySelector(".products-area");
   productsSection.textContent = "";
   //Run a loop through the products and creare an HTML element for each of them 
   productList.forEach(function(product,index){

      //create yje HTML element to the individual product
      let productElm = document.createElement('div');
      productElm.classList.add('product-item');

      //Create the product image
      let productImage = document.createElement('img');
      productImage.src= product.image;
      productImage.alt= 'Image for '+ product.title;

      //create the product details section 
      let productDetails = document.createElement('div');
      productDetails.classList.add('product-details');

      //create product title, author, pricetitle and price
      let productTitle = document.createElement('h3');
      productTitle.classList.add('product-title');
      productTitle.textContent = product.title;

      let productAuthor = document.createElement('p');
      productAuthor.classList.add('product-author')
      productAuthor.textContent = product.author;

      let priceTitle = document.createElement('p');
      productAuthor.classList.add('price-title')
      productAuthor.textContent = 'Price';

      let productPrice = document.createElement('p');
      productPrice.classList.add('product-price')

      //using a ternery condition
      productPrice.textContent = product.price > 0 ? '$' + product.price.toFixed(2) : 'Free';


      //Append the product details 
      productDetails.append(productTitle);
      productDetails.append(productAuthor);
      productDetails.append(priceTitle);
      productDetails.append(productPrice);


      //add all child HTML elemnt of the product
      productElm.append(productImage);
      productElm.append(productDetails);

      //add the complete individual product to the product section 
      productsSection.append(productElm);

   });
}

function productsHandler(){
   
   //free products & using the arrow function 
   let freeProducts = products.filter((item) =>  !item.price || item.price <= 0);

   //Paid products 
   let paidProducts = products.filter((item) => item.price > 0);

   populateProducts(products);

    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length;
    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProducts.length;
    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProducts.length;

   //click handler for label 
   let productsFilter = document.querySelector('.products-filter');
   productsFilter.addEventListener('click', function(e){
      if (e.target.id ==='all'){
         populateProducts(products);
      }else if(e.target.id === 'paid'){
         populateProducts(paidProducts);
      }else if(e.target.id === "free"){
         populateProducts(freeProducts);
      }

   });


   }

function footerHandler(){
   let currentYear = new Date().getFullYear();
   document.querySelector('footer').textContent = `© ${currentYear} - All rights researved`;
}

function wetherHandler(){
navigator.geolocation.getCurrentPosition(position => {
   console.log(position);
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let url = weatherAPIURL
   .replace('{lat}',latitude)
   .replace('{lon}',longitude)
   .replace('{API key}',weatherAPIKey);
   fetch(url)
   .then(response => response.json())
   .then(data => { 
      console.log(data);
      const condition = data.weather[0].description;
      const loaction = data.name;
      let temperature = data.main.temp;

      //.fixed show th value with the one decimal place 
 let celsiusText = `The weather is ${condition} in ${loaction} and it's ${temperature.toFixed(1)}°C outside.`;
 let fahrText = `The weather is ${condition} in ${loaction} and it's ${celsToFhr(temperature).toFixed(1)}°F outside.`;

document.querySelector('p#weather').innerHTML = celsiusText;

document.querySelector('.weather-group').addEventListener("click", function(e){

    if (e.target.id == 'celsius'){
      document.querySelector('p#weather').innerHTML = celsiusText;

    } else if (e.target.id == 'fahr'){
      document.querySelector('p#weather').innerHTML = fahrText;
    }

   console.log(e.target.id)
});

   });
});
}





//Page Load
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
wetherHandler()