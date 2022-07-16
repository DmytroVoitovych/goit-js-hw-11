const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { optionUrl } from './option';
import { renderImg } from './markup';
import { moveScrolle } from '../index';
import { page } from '../index';

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector('[name="searchQuery"]');
let val = null;
let response = null; 

searchInput.addEventListener('input', () => val = searchInput.value.trim());

export  async function getUser() {
    try {     
     response = await axios.get(`https://pixabay.com/api/?key=${optionUrl.key}&q=${val}&image_type=${optionUrl.imgType}&orientation=${optionUrl.orientation}&safesearch=${optionUrl.ageFilterDate}&per_page=${optionUrl.pagePer}&page=${page}`);
       console.log(searchInput.value.trim()); 
      const render = await renderImg(response.data.hits);
       await moveScrolle();    
        if(gallery.children.length !=0 && gallery.children.length <=40 ) {
        Notify.info(`Hooray! We found ${response.data.totalHits} images.`); 
       }
         console.log(response);
         } catch (error) {
        
        Notify.failure(`${error}`);
  }
};

export {response}; 