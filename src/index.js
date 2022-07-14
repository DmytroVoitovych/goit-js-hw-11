const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector(".gallery");

let page = 1;
let response = null; 

const optionUrl = {
    key: '28460134-7b12f16a69bff4fc5524ed994',
    findTermin: searchInput.value.trim(),
    imgType: 'photo',
    orientation: 'horisontal',
    ageFilterDate: true,
    pagePer: 40,
  }

// const getValue = (e) => {
//    optionUrl = {
//     key: '28460134-7b12f16a69bff4fc5524ed994',
//     findTermin: searchInput.value.trim(),
//     imgType: 'photo',
//     orientation: 'horisontal',
//     ageFilterDate: true,
//     pagePer: 40,
//   }

//   return optionUrl;
// };

const moveScrolle = () => {  
        const d = document.documentElement.getBoundingClientRect();
        if (d.bottom < document.documentElement.clientHeight + 450) {
            console.log('done');
            page++;
            getUser(); 
            const { height: cardHeight } = document
  .querySelector(".photo-card")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    }
};
// const info = ()=> Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
var lightbox = new SimpleLightbox('.gallery__link', { captionDelay: 250, captionClass: 'test' });   

form.addEventListener('submit',  (e) => {
    window.addEventListener('scroll', moveScrolle);
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
 if (gallery.children.length < 40) {
       getUser();
  //  info();
     
      } 
});



const renderImg = (findedImg) => {
const imgGallery = findedImg.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
return `<div class="grid-item" ><a  class="gallery__link" href="${largeImageURL}">
    <div class="photo-card">
  <img  class="gallery__image"
      src="${webformatURL}"
      data-source="${largeImageURL}"
      alt="'${tags}'"
      title='${tags}'
       loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views} </b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
  </a>
  </div>`;
}).join(" ");
    gallery.insertAdjacentHTML("beforeend", ` ${imgGallery}`);  
    lightbox.refresh();
    
};



async function getUser() {
    try {
    //  getValue();  
    
     response = await axios.get(`https://pixabay.com/api/?key=${optionUrl.key}&q=${searchInput.value.trim()}&image_type=${optionUrl.imgType}&orientation=${optionUrl.orientation}&safesearch=${optionUrl.ageFilterDate}&per_page=${optionUrl.pagePer}&page=${page}`);
       console.log(searchInput.value.trim()); 
      const render = await renderImg(response.data.hits);
                  if (gallery.children.length == response.data.totalHits) {
                 Notify.info(`We're sorry, but you've reached the end of search results.`);
                 window.removeEventListener('scroll', moveScrolle);
                  }
                  else if (gallery.children.length > 0) {
            Notify.info(`Hooray! We found ${response.data.totalHits} images.`);        
      }
         else if (response.data.total === 0 ) {
           throw ('Sorry, there are no images matching your search query. Please try again.');
        }
          
        console.log(response);
         } catch (error) {
        
        Notify.failure(`${error}`);
  }
};

//




  