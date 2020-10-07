/////////////// GLOBALE ///////////////
let carousel = document.querySelector(".carousel");
let slides = carousel.querySelectorAll(".slides > *");
let id; //contriendra l'id de setIntervale pour pouvoir le stopper

// Panneau et fleches suivant/precedent
let btnSuiv = carousel.querySelector(".suivant");
let btnPrec = carousel.querySelector(".precedent");
let btns = carousel.querySelector(".bouttons");

// Barre de texte de l'image visionné
let legende = carousel.querySelector(".legende");

// Barre de pastilles
let indic = carousel.querySelector(".indicators");

// Gestion du défilement auto au survol du carrousel
carousel.addEventListener("mouseover", arretDefilement);
carousel.addEventListener("mouseout", autoDefilement);

// Click fleches
btnSuiv.addEventListener("click", imgSuivante);
btnPrec.addEventListener("click", imgPrecedente);

//-------- init au chargement de la page --------//
let listePastilles = creaPastilles(indic);
legende.innerHTML = getAltTextImg();
autoDefilement();

///// Renvoit la position (num) ou se trouve l'element parmis ses frerezésoeurs /////
function getElementIndex(element) {
  //recup la liste des enfants (dont il fait parti) de son parent
  return [...element.parentNode.children].indexOf(element);
}

/////////////// FONCTIONS DE CREATION D'INTERFACES DYNAMIQUES ///////////////

///// Creation d'autan de pastilles que d'image /////
function creaPastilles(conteneur) {
  // Creation des pastilles en fonction du nombre d'images
  let pastille = "<span></span>"; // Nouvelles pastilles
  for (let i = 0; i < slides.length; i++) {
    conteneur.innerHTML += pastille;
  }

  //interaction pastilles
  let pastilles = conteneur.querySelectorAll("span");
  for (let i = 0; i < pastilles.length; i++) {
    pastilles[i].addEventListener("click", imgPastilleCorresp);
  }
  pastilles[0].classList.add("indicatorCourant"); //init

  return pastilles; //retourne un tableau des pastilles créés
}
///// Legende en fonction de l'image (contenu dans l'attribut alt) /////
function getAltTextImg() {
  //legende de l'image
  return carousel.querySelector(".slides .active").alt; //transvase la chaine de l'attribut "alt" de l'image
}
///// COLORISE la pastille courante /////
function colorPastilleSelect(past) {
  //récupere et dé-COLORISE la pastille précedente
  let pastPrecedente = carousel.querySelector(".indicators .indicatorCourant");
  pastPrecedente.classList.remove("indicatorCourant");
  //COLORISE la pastille courante
  past.classList.add("indicatorCourant");
}

/////////////// FONCTIONS DU DEFILEMENT DES IMAGES ///////////////

///// Défilement des images en avant uniquemnt /////
function imgSuivante() {
  //recup de l'image visible/active
  let activeSlide = carousel.querySelector(".slides > .active");
  //recup l'index de l'element dans son parent
  let index = getElementIndex(activeSlide);
  //supprime la classe active de l'element actuel
  activeSlide.classList.remove("active");
  //augmente l'index de 1 (passe a l'element suivant)
  index = (index + 1) % slides.length;
  //ajoute la classe active a l'element suivant
  slides[index].classList.add("active");

  legende.innerHTML = getAltTextImg(); //LEGENDE de l'image
  colorPastilleSelect(listePastilles[index]); //COLORISE la pastille courante
}
///// Défilement sur evenement des images (click fleche suivant/precedent) /////
function imgPrecedente() {
  let activeSlide = carousel.querySelector(".slides > .active");
  let index = getElementIndex(activeSlide);

  activeSlide.classList.remove("active");
  index = (index - 1) % slides.length;

  //prévient un modulo négatif (-1)
  if (index == -1) {
    index = slides.length - 1;
  }
  slides[index].classList.add("active");

  legende.innerHTML = getAltTextImg(); //LEGENDE de l'image
  colorPastilleSelect(listePastilles[index]); //COLORISE la pastille courante
}

/////////////// FONCTIONS DU DEFILEMENT DES IMAGES PAR L'INTERFACE ///////////////

///// Lance de défilement d'image /////
function autoDefilement() {
  opaciteInterface(btns, "0");
  opaciteInterface(legende, "0");
  //interfaceVisible(indic,"0");
  id = setInterval(imgSuivante, carousel.dataset.interval); //affecte (en globale) l'id de setIntervale dans id
}
///// Arret le défilement /////
function arretDefilement() {
  opaciteInterface(btns, "1");
  opaciteInterface(legende, "1");
  //interfaceVisible(indic,"1");
  clearInterval(id); //arret setInterval
}
///// Affichage de l'image correspondante a la pastille selectionné /////
function imgPastilleCorresp(event) {
  //pastille courante (sur laquel il y a eu un event)
  let pastille = event.target;
  //recup de sa position dans la liste
  let index = getElementIndex(pastille);
  //on cache l'IMAGE courante
  let activeSlide = carousel.querySelector(".slides .active");
  activeSlide.classList.remove("active");
  //on affichage l'IMAGE correspondante
  slides[index].classList.add("active");

  colorPastilleSelect(pastille); //COLORISE la pastille courante
  legende.innerHTML = getAltTextImg(); //LEGENDE de l'image
}

/////////////// FONCTIONS DE VISIBILITE DE L'INTERFACE ///////////////
function opaciteInterface(elem, opacity) {
  elem.style.opacity = opacity;
}