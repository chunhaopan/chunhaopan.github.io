let menuNasc = document.querySelector(".menu2")
function menuAnimation(x) {
  x.classList.toggle("change");
    menuNasc.classList.toggle("change")
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.searchBar input[type="text"]');
    const searchButton = document.querySelector('.searchBar button');
    const gridItems = document.querySelectorAll('#grid .grid-item');
    
    const filterItems = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        gridItems.forEach(item => {
            const titleElement = item.querySelector('.title');
            if (titleElement) {
                const titleText = titleElement.textContent.toLowerCase();
                
                if (titleText.includes(searchTerm)) {
                    item.style.display = 'flex'; 
                } else {
                    item.style.display = 'none'; 
                }
            }
        });
    };

    searchButton.addEventListener('click', filterItems);
    searchInput.addEventListener('input', filterItems); 
});
//OpEd
let allIframe= document.querySelectorAll("iframe")
document.querySelectorAll(".opEd").forEach((e)=>{
    let iframe = e.querySelector("iframe")
    e.querySelectorAll("h3").forEach((e2)=>{
        e2.addEventListener("click",function(event){   
            let videoSrc = event.currentTarget.getAttribute("data-src")
            allIframe.forEach((e3)=>{
                e3.setAttribute("src","")
            })
            console.log(videoSrc)
            iframe.setAttribute("src",videoSrc)
        })
    })
})
