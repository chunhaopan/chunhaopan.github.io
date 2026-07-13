// ==========================================
// 1. GESTIONE MENU MOBILE
// ==========================================
let menuNasc = document.querySelector(".menu2");
function menuAnimation(x) {
    x.classList.toggle("change");
    menuNasc.classList.toggle("change");
}

// ==========================================
// 2. FUNZIONE DI GENERAZIONE DINAMICA
// ==========================================
function generaStrutturaAnime() {
    // Controllo di sicurezza se il file dati.js non viene letto
    if (typeof animeDatabase === 'undefined') {
        console.error("Errore: 'animeDatabase' non trovato. Verifica che dati.js sia caricato.");
        return;
    }

    animeDatabase.forEach(anime => {
        // Trova la sezione corretta usando il rispettivo attributo data-section
        const container = document.querySelector(`.anime-grid[data-section="${anime.section}"]`);
        
        if (container) {
            // Crea il blocco del singolo anime
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';

            gridItem.innerHTML = `
                <img src="${anime.img}" alt="${anime.title}">
                <p class="title">${anime.title}</p>
                <p class="description"></p>
            `;

            // Aggiunge l'elemento appena creato all'interno del contenitore
            container.appendChild(gridItem);
        }
    });
}

// ==========================================
// 3. INIZIALIZZAZIONE LOGICA SITO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Esegue prima la generazione degli elementi HTML
    generaStrutturaAnime();

    // Gestione della Barra di Ricerca (eseguita DOPO la generazione dei nodi)
    const searchInput = document.querySelector('.searchBar input[type="text"]');
    const searchButton = document.querySelector('.searchBar button');
    const gridItems = document.querySelectorAll('.anime-grid .grid-item');
    
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

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', filterItems);
        searchInput.addEventListener('input', filterItems); 
    }
});

// ==========================================
// 4. GESTIONE VIDEO OPENING / ENDING (IFRAME)
// ==========================================
let allIframe = document.querySelectorAll("iframe");
document.querySelectorAll(".opEd").forEach((e) => {
    let iframe = e.querySelector("iframe");
    e.querySelectorAll("h3").forEach((e2) => {
        e2.addEventListener("click", function(event) {   
            let videoSrc = event.currentTarget.getAttribute("data-src");
            allIframe.forEach((e3) => {
                e3.setAttribute("src", "");
            });
            if (iframe) {
                iframe.setAttribute("src", videoSrc);
            }
        });
    });
});