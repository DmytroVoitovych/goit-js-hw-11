import { response } from './js/fetch';
import { getUser } from './js/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var throttle = require('lodash.throttle');

let page = 1;

const form = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");

export const moveScrolle = throttle(() => {
  if (gallery.children.length != 0) {
    const seeLastElement = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const currentEntry = entry.target;
        if (!entry.isIntersecting) {
          return;
        }
      
        else if (gallery.children.length >= response.data.totalHits) {
          Notify.info(`We're sorry, but you've reached the end of search results.`);
          seeLastElement.unobserve(currentEntry);
        }
        else {
          page+=1;
          getUser();
          seeLastElement.unobserve(currentEntry);
        }
      });
    }, { threshold: 0.25, root: null, rootMargin: '0px', });
  
    seeLastElement.observe(document.querySelector(".grid-item:last-child"));
  }
    
}, 300);

  

form.addEventListener('submit',  async (e) => {
    
    e.preventDefault();
    gallery.innerHTML = '';
  page = 1;
  await getUser();    
  if (gallery.children.length == 0) {
         await  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
});

export { page };








  