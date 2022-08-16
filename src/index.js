import { response } from './js/fetch';
import { getUser } from './js/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { funcUpDown } from './js/funcUpDown';
import { funcScroll } from './js/funcScroll';
var throttle = require('lodash.throttle');

let page = 1;

const form = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".base");

export const moveScrolle = throttle(() => {
  if (gallery.children.length != 0) {
    const seeLastElement = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const currentEntry = entry.target;
        if (!entry.isIntersecting) {
          
          return funcScroll(btn);
       }
      
        else if (gallery.children.length >= response.data.totalHits) {
          Notify.info(`We're sorry, but you've reached the end of search results.`);
          seeLastElement.unobserve(currentEntry);
          
        }
        else {
          page+=1;
          getUser();
          btn.classList.add('up');
          btn.addEventListener('click', (e)=>funcUpDown(e,currentEntry));
          seeLastElement.unobserve(currentEntry);
                    
        }
      });
    }, { threshold: 0.25, root: null, rootMargin: '0px', });
  
    seeLastElement.observe(document.querySelector(".grid-item:last-child"));
  }
    
}, 300);

form.addEventListener('submit',  async (e) => {
  e.preventDefault();
  btn.classList.remove('down');
  gallery.innerHTML = ' ';
  page = 1;
  const target = e.target.elements.searchQuery.value.trim();
   
  if ( target !== "") {
    
    e.target.reset();
    await getUser();
     
    if (gallery.children.length <= 0) {
      await Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  }
  else {
    await Notify.failure('The field must be filled in!');
  }
});

export { page };







  