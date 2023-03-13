"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Hiện thanh search
const headerBar = $('.header-section');
const searchBtn = $('#quick-search');

searchBtn.onclick = function (){
    headerBar.classList.toggle('search-open');
}

// chạy slideshow 
let slideIndex = 0;
showSlides();



function showSlides() {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    let i;
    for (i = 0; i < slides.length ; i++){
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex > slides.length){ slideIndex = 1}
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }


    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000);
}

// Shop category 

const cardSlide = $('.card-grid');
const nextBtn = $('#btn-next');
const prevBtn = $('#btn-prev');

const numberCardSlide = cardSlide.children.length;
const widthCardSlide = cardSlide.children[0].clientWidth;
let totalSize = numberCardSlide * widthCardSlide;


nextBtn.addEventListener('click', moveRight);
function moveRight(){
    cardSlide.scrollBy({
        top: 0,
        left: widthCardSlide,
        behavior: "smooth"
    })
}
prevBtn.addEventListener('click', moveLeft)
function moveLeft(){
    cardSlide.scrollBy({
        top: 0,
        left:-widthCardSlide,
        behavior: "smooth"
    })
}

// Get category from Api
const getCategory = "http://localhost:3000/Category";

function startCollection(){
    getCollection(renderCollection)
}


function getCollection(callback){
    fetch(getCategory)
    .then((response) => response.json())
    .then(callback)
}

function renderCollection(collections){
    let htmls = collections.map((collection) => {
        return ` <div class="card-slider style1 columns" data-id="${collection.id}">
        <div class="card-slider__inner">
            <a href="#" class="card-slider__link">
                <div class="card-slider__img">
                    <img src="${collection.image}" alt="Dining Room" class="">
                </div>
                <div class="card-slider__content">
                    <div>
                        <h2>${collection.title}</h2>
                        <p>${collection.description}</p>
                    </div>
                </div>
            </a>
        </div>
    </div>`
    })
    cardSlide.innerHTML = htmls.join('');
}

startCollection();

// Product card featured

const imgs = $$('.product-img a');
let imgId = 1;

const imgDivs = $$('.product-img');

imgs.forEach((img)=> {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        imgId = img.dataset.id
        imgDivs.forEach((img) => img.classList.remove('active'));
        img.parentElement.classList.add('active');
        moveImage();
        
    });

})
function moveImage(){
    const imgWidth = $('.product-img__main img:first-child').clientWidth;
    const imgFrame = $('.product-img__main');
    let width = (imgId-1)* imgWidth;
    imgFrame.style.transform = `translateX(${-width}px)`;
}

const minusBtn = $('.minus');
const plusBtn = $('.plus');
const qtyTxt = $('#qty');

minusBtn.addEventListener('click', minusQty)
function minusQty(){
    let qty = parseInt(qtyTxt.value);
    if (qty > 0){
        qty--;
    }
    qtyTxt.value = qty;
}
plusBtn.addEventListener('click', plusQty)
function plusQty(){
    let qty = parseInt(qtyTxt.value);
    if (qty >=0 && qty < 10){
        qty++
    }
    qtyTxt.value = qty
}

// Định nghĩa element scroll-shadow cho web.
class myScroll extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode:'open'});
        let style = document.createElement('style'); 
        let s = document.createElement('s');
        s.setAttribute("style", "top:0px; left:0px; right: 0px; bottom:0px;")
        style.textContent = `
            :host {
                display: inline-block;
                position: relative;
            }
            :host([hidden]){
                display: none;
            }
            s {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                    z-index: 5;
                pointer-events: none;
                background:
                var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) top/100% var(--top),
                var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) bottom/100% var(--bottom),
                var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) left/var(--left) 100%,
                var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) right/var(--right) 100%;
                background-repeat: no-repeat;
            }    
  
        `
        let slot = document.createElement('slot');
        shadow.appendChild(style);
        shadow.appendChild(slot);
        shadow.appendChild(s);
    }
}
customElements.define("scroll-shadow", myScroll);
