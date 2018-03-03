/*GESTION MENU*/
var header = document.querySelector('.header');
var hauteurHeader = header.offsetHeight;
var menu = document.querySelectorAll('.menu');
var bar = document.querySelector('.bar');
var actif = document.querySelector('.actif');
var ensemble = document.querySelector('.ensemble');
var hauteurHeader = document.querySelector('.header').offsetHeight;
var cardsBackground = document.querySelector('.cards__bg');
var hauteurEnsemble = document.querySelector('.ensemble').offsetHeight;

// -fonction init
//-enlever et rajouter la classe actif
//-rajouter un ev onclick sur les items du menu
//-animation de la barre  (largeur et decalage partie gauche)

var section = document.querySelectorAll('.section');
var sectionActif = section[0];
var itemsOld = 0;
var sectionCopy;
var sectionCopy2;
var peutClick = true;

function gestion() {
  if (this === actif || peutClick === false) return;
  peutClick = false;
  actif.classList.remove('actif');
  this.classList.add('actif');
  actif = this;
  lancement();
  //Partie de gestion du deplacement des sections
  var itemsNew = this.dataset.i;

  itemsOld = parseInt(itemsNew);
  sectionActif = section[`${itemsOld}`];
  ensemble.removeChild(sectionActif);
  var sectionActuel = document.querySelectorAll('.section');
  ensemble.insertBefore(sectionActif, sectionActuel[1]);
  window.setTimeout(() => {
    sectionActif.classList.add('deplacementSection');
  }, 10);
  sectionCopy = sectionActuel[0];
  window.setTimeout(() => {
    ensemble.removeChild(sectionActuel[0]);
    ensemble.appendChild(sectionCopy);
    sectionActif.classList.remove('deplacementSection');
    peutClick = true;
  }, 600);
}

function click() {
  for (var i = 0; i < menu.length; i++) {
    menu[i].addEventListener('click', gestion);
  }
}

function lancement() {
  var largeur = actif.offsetWidth;
  var position = actif.offsetLeft;
  bar.style.transform = `translate3d(${position}px, 0, 0)`;
  bar.style.width = `${largeur}px`;

    cardsBackground.style.height = `calc(100vh - ${hauteurHeader}px)`;
}

var time;

function init() {
  click();
  lancement();
  window.addEventListener('resize', () => {
    clearTimeout(time);
    time = setTimeout(lancement, 30);
  });
}

init();

/* PARTIE ANIMATION FLIP CARD ACCUEIL*/
const lesBoutonsDesCartes = document.querySelectorAll(
  '.front__btn, .back__btn',
);

function tourneLaCarteDansLeBonSens() {
  const numDeLaCarte = this.dataset.carte;
  const carteARetourner = document.querySelector(`.card-${numDeLaCarte}`);

  if (carteARetourner.classList.contains('card--rotate')) {
    carteARetourner.classList.remove('card--rotate');
  } else {
    carteARetourner.classList.add('card--rotate');
  }
}

lesBoutonsDesCartes.forEach(boutton => {
  boutton.addEventListener('click', tourneLaCarteDansLeBonSens);
});

// PARTIE2 ET PARTIE 3 ANIMATION DIV
// Je recupère les listes des boutons
var buttonChats = document.querySelectorAll('.buttonChats');
var carteInfos = document.querySelectorAll('.info');
var close = document.querySelectorAll('.close');

// Les index pour les for
var i = 0;
var j = 0;
var k = 0;

// Boucle qui permet d'ajouter l'action de montrer la carte info correspondant
// au bouton cliqué
for(i = 0; i < buttonChats.length; i++) {
  // On ajoute l'evènement à tous les boutons
  buttonChats[i].onclick = function fullscreen() {
    // this = le bouton cliqué
    // dataset.info permet de recupérer la valeur qu'on attrivuer dans data-info
    // pour chaque bouton
    // ce qui nous permet de reconstruire la classe que l'on cherche
    var nomDeLaClasseRecherchee = '.info' + this.dataset.info; // ex: .info1, .info2, .info3
    // On cherche la carte info qui correspond à la classe générée
    var laCarteInfo = document.querySelector(nomDeLaClasseRecherchee);
    // On lui applique la classe active pour pouvoir l'afficher
    laCarteInfo.classList.add('active');
  }
}

// On recupère les bouton pour fermer la carte
// On supprime la classe active à son parent pour la fermer
for(k = 0; k < close.length; k++) {
  close[k].onclick = function closeCarteInfo() {
    this.parentNode.classList.remove('active');
  }
}

// close.style.top = `calc(${hauteurHeader}px + 20px)`;
//VOIR AVEC DEXTER COMME RAJOUTER UNE PROPRIETE DANS LE CSS ET PAS DANS UN ELEMENT HTML
