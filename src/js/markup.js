// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

var lightbox = new SimpleLightbox('.gallery__link', { captionDelay: 250, captionClass: 'test' }); 

export const renderImg = (findedImg) => {
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