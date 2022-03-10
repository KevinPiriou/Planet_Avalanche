//// INIT CONST
const newGameButton = document.getElementById("btnNew"); // START BUTTON GAME
const gameTest = document.getElementById("gameroom"); //TODO: CANVAS OR DOM ?? = GAME DISPLAY
const gameCreditButton = document.getElementById("btnCredit"); // EXIT BUTTON GAME 
const gameDebug = document.getElementById("debug"); // LOG DEBUG ON GAME DISPLAY
const menuTitle = document.getElementById('title-game'); // TITLE GAME IN MENU
const ScoreTotal = document.getElementById("ScoreTotal");
const tutoControl = document.getElementById("tuto");
const option = document.getElementById("Optionmenu");
const losingEffect = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/explosion_02.wav");
//const menuMusic = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg");
const gameMusic = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3");
const effectMenu = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav");
const displayBtnGroup = document.getElementById("ZoneBtn");






/* Fonction Change le logo du Titre du jeu au chargement*/
const target = window.document.getElementById("title-game");

const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both "> ${letter} </span>`
const colorLetter = letter => `<span style="color: hsla(${Math.random()*360}, 80%, 80%, 5);"> ${letter} </span>`;
const flickerAndColorText = text =>
    text
    .split('')
    .join('')
    .split('-')
    .map(colorLetter)
    .map(flickerLetter)
    .join('')
    .split(',');


const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);


neonGlory(target);
target.onclick = ({ target }) => neonGlory(target);






/* Bouton pour Commencer une nouvelle partie */
newGameButton.addEventListener('click', function() {
    // Masque les élements du menu
    tutoControl.remove();
    newGameButton.remove();
    gameCreditButton.remove();
    menuTitle.remove();
    displayBtnGroup.remove();

    
    // Initiation de la fenetre canvas
    effectMenu.play();
    gameMusic.play();
    let gameShowScreen = document.createElement('canvas')
    gameShowScreen.id ="game";
    gameShowScreen.style.width="1500px";
    gameShowScreen.style.height="900px";
    gameTest.insertBefore(gameShowScreen, gameTest.firstChild);


/* Lancement du jeu */
/* Fênetre de jeu */

  // Capture de la balise canvas
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  // Empêche la resolution de changer
  window.addEventListener('resize', setup, false);



/* Fonction de preparation d'affichage du jeu */  
function setup() {
  canvas.width = 1500;
  canvas.height = 900;
// Fonction d'appel du jeu              
  draw();
}


/* Zone de création des fonctions et element du jeu */

  /* Variable */
  // Taille du joueur
      var ballRadius = 10;
  // Variable des Asteroid
      var rockWidth = 15;
      var rockHeight = 15;
      var totalRocks = 100;
      var rockspeed = 5;
  // Spawn du joueur
      var screenwidth =1500;
      var screenHeight = 900;
      var x = screenwidth/2; 
      var y = screenHeight/2;
  // Controle du nombre des Asteroid
      var rocks = [];
      for (var i = 0; i < totalRocks; i++) {addRock();}


/* Fonction Principal d'Affichage du jeu */
  function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear le Gameboard pour la frame suivante
      Player();
      FallingObject();
      Timer();

      // Mouvement du joueur
      // Gauche
      if(leftPressed) {
          if(x > 0+ballRadius) {
              x -= 5;
          }
      }
      // Haut
      else if(upPressed) {
          if(y > 0+ballRadius) {
              y -= 5;
          }
      }
      // Droite
      else if(rightPressed) {
          if(x < canvas.width-ballRadius) {
              x += 5;
          }
      }
      // Bas
      else if(downPressed) {
          if(y < canvas.height-ballRadius) {
              y += 5;
          }
      }
  }
  // Ajout de délai pour clean le draw
  setInterval(draw,10);


/* Fonction principal de la chute des Asteroid */
function FallingObject() {

for (var i = 0; i < rocks.length; i++) {

  var rock = rocks[i];
  // Test les collisions
  if (CollisionCheck(rock)) {
      rocks = [];
      Gameover(Timer());
    }

  // Vitesse de chute des Asteroid
  rock.y += rock.speed;

  // Respawn des Asteroid apres out of screen
  if (rock.y > canvas.height) {
      resetRock(rock);
      }
  }
  // Appel de la forme
  therock();
}

// Fonction de collision
function CollisionCheck(a, b) {
return !(
  x > a.x + a.width || x + ballRadius < a.x || y > a.y + a.height || y + ballRadius < a.y);
}


// Fonction d'ajout des Asteroid pour les controlés le nombre a afficher
function addRock() {
var rock = {
  width: rockWidth,
  height: rockHeight
}
resetRock(rock);
rocks.push(rock);
}


// Fonction d'Asteroid qui tombe
function resetRock(rock) {
rock.x = Math.random() * (screenwidth - rockWidth);
rock.y = 0;
rock.speed = 0.2 + Math.random() * rockspeed;
}


/* Fonction de Mouvement du joueur */

  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
      }else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
      }else if(e.key == "Up" || e.key == "ArrowUp") {
          upPressed = true;
      }else if(e.key == "Down" || e.key == "ArrowDown") {
          downPressed = true;
      }
  }
  
  function keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      }else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }else if(e.key == "Up" || e.key == "ArrowUp") {
          upPressed = false;
      }else if(e.key == "Down" || e.key == "ArrowDown") {
          downPressed = false;
      }
  }


/* Fonction du chronomètre */

// Variable du chronomètre
  var Msec = 0;
  var sec = 0;
  var min = 0;
  var hrs = 0;
  var timertext;
  
// Tick de temps spécial pour la frame du jeu
  function timertick(){
      Msec += 10;
      if(Msec >= 990){// 990 car le draw a une interval de 10 ms
          Msec = 0;
          sec++;
          if (sec >= 60) {
              sec = 0;
              min++;
              if (min >= 60) {
                  min = 0;
                  hrs++;
              }
          }
      }
  }

// Affichage du temps dans le jeu
  function Timer() {
      timertick();
      timertext = (hrs > 9 ? hrs : "0" + hrs) 
              + ":" + (min > 9 ? min : "0" + min)
              + ":" + (sec > 9 ? sec : "0" + sec)
              + ":" + (Msec > 9 ? Msec : "0" + Msec);
              ctx.font = "30px Arial";
              ctx.fillStyle = "red";
              ctx.fillText(timertext, 10, 50);
    
    return timertext;
  }
  

/* Création de Forme Géométrique  */

  // Forme du joueur
  function Player() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }

  // Forme des Asteroid
  function therock(){
      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        ctx.fillStyle = "gray";
        ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
      }
    }


/* Initialisation du jeu */
setup();
});











/* Fonction de Game Over */
function Gameover(timer) {
    const canvas = document.getElementById('game');

    // Prend le temps de survie
    ScoreTotal.innerHTML = `Vous avez survécu ${timer}`;
    console.log(ScoreTotal);

    // Remove le canvas
    if(canvas){
        canvas.remove();
    }

    // Recreation du menu
    gameMusic.pause();
    losingEffect.play();

    // Bouton option
    let creditButton = document.createElement("button");
    creditButton.className="blue blinking";
    creditButton.id="btnCredit";
    creditButton.textContent = "I have changed!";

    // Bouton Game
    let gameButton = document.createElement("button");
    gameButton.className="blue blinking";
    gameButton.id="btnNew";
    gameButton.textContent = "I have changed!";

    // Title Game
    let title = document.createElement("h1");
    title.id="title-game";


}
























/////// DOM MUTATORS
gameCreditButton.addEventListener('click', function(event) {
    event.preventDefault;
    // Hide Element
    gameCreditButton.style.visibility = "visible";
    newGameButton.style.visibility = "hidden";
    menuTitle.style.visibility = "hidden";
    tutoControl.style.visibility = "hidden";

    // GAME BREAK
    gameCreditButton.innerHTML = "RETOUR";
    gameTest.style.backgroundColor = "rgb(16, 24, 32)"; //CREDIT
    gameDebug.innerText = "Debug: CREDIT || TODO: add real credit + animation %>";

});