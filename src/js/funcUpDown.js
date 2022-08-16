const up = document.querySelector(".base");
  
export const  funcUpDown = (e, btn) => {
        
    if (!up.classList.contains('down')) {
       
         window.scroll({
            top: 0,
            behavior: 'smooth',
        });
        
        setTimeout(() => { up.classList.remove("up"); up.classList.add('down'); }, 350); 
        }
   
    else {
        
        window.scrollBy({
            top: btn.offsetTop,
            behavior: "smooth"
        });

       setTimeout(() => { up.classList.remove("down"); up.classList.add('up') }, 350); 
    }

}
    
   