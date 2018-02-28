/*GESTION MENU*/
var header = document.querySelector('.header');
var hauteurHeader = header.offsetHeight;
var menu = document.querySelectorAll('.menu');
var bar = document.querySelector('.bar');
var actif = document.querySelector('.actif');
var ensemble = document.querySelector('.ensemble');


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

function gestion(){
  if(this === actif || peutClick === false) return;
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
    sectionActif.classList.add('deplacementSection')
  }, 10);
  sectionCopy = sectionActuel[0];
  window.setTimeout( () => {
    ensemble.removeChild(sectionActuel[0]);
    ensemble.appendChild(sectionCopy);
    sectionActif.classList.remove('deplacementSection');
    peutClick = true;
  }, 600);
}

function click(){
  for(var i = 0; i < menu.length; i++){
    menu[i].addEventListener('click', gestion);
  }
}

function lancement(){
  var largeur = actif.offsetWidth;
  var position = actif.offsetLeft;
  bar.style.transform =
   `translate3d(${position}px, 0, 0)`;
  bar.style.width = `${largeur}px`;
}

var time;

function init(){
  click();
  lancement();
  window.addEventListener('resize', () => {
    clearTimeout(time);
    time = setTimeout(lancement, 30);
  });
}

init();


/* PARTIE ANIMATION FLIP CARD ACCUEIL*/
var tournerFront1 = document.querySelector('#tournerFront1');
var carte1 = document.querySelector('.card1');
var tournerBack1 = document.querySelector('#tournerBack1');

console.log(carte1);

var rotate = function(el) {
  return function() {
 		if(el.style.transform == 'rotateY(-180deg)') {
    	el.style.transform = 'rotateY(0)';
    } else {
      el.style.transform = 'rotateY(-180deg)';
    }
  };
}

tournerFront1.onclick = rotate(carte1);
tournerBack1.onclick = rotate(carte1);
