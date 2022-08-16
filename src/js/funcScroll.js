var throttle = require('lodash.throttle');

export const funcScroll = (btn)=> window.onscroll =  throttle( () => {
          
            if (window.pageYOffset < 600) { btn.classList.replace('up', 'down'); }
            
            else{btn.classList.replace('down', 'up');}

          }, 350);