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
