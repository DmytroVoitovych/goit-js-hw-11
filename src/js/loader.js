import { Block } from 'notiflix/build/notiflix-block-aio';

export const funcLoader = (grid) => { 
   let observer = new ResizeObserver((entries) => { 
      entries.forEach(entry=> {
          const target = entry.target; 
          
      if (target.clientWidth > 200) {
        
         if(!target.classList.contains('target')){ 
          target.classList.add('target');}
          observer.unobserve(target);
           Block.remove(`.target`); 
        target.classList.remove('target');
        }    
    });
      
     });
  grid.forEach((s, index, arr) => {
   return observer.observe(arr[index])
  });
};