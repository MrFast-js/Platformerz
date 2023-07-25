var canvas = $("myCanvas");
var ctx = canvas.getContext("2d", { alpha: false });

var canvas2 = $("myCanvas2");
var ctx2 = canvas2.getContext("2d");

var canvas3 = $("myCanvas3");
var ctx3 = canvas3.getContext("2d");

var canvas4 = $("myCanvas4");
var ctx4 = canvas4.getContext("2d");

var canvas5 = $("myCanvas5");
var ctx5 = canvas5.getContext("2d");

var canvas6 = $("myCanvas6");
var ctx6 = canvas6.getContext("2d");

var canvas7 = $("myCanvas7");
var ctx7 = canvas7.getContext("2d");

var canvas8 = $("myCanvas8");
var ctx8 = canvas8.getContext("2d");

var modifiers = {};
var singlePlayer = true;
var rightPressed = false;
var signedInWithGoogle = false;
var audioVolume = 0.75;
var leftPressed = false;
var upPressed = false;
var googleVariable = "";
var downPressed = false;
var admin = localStorage.adminPass == btoa('admin');
var friction = 0.5;
var nowin = false;
var gamePaused = false;
var hidePlayers = false;
var levelAndModifiers = {};
var airFriction = 0.5;
var backgroundColor = "#f2f0f0";
var debug = false;
var tutorial = false;
var tutorialStage = 0;
var allLevels = [];
var deaths = 0;
var afk = false;

// Set prefixes list for generating usernames.
var prefixes = ['Friendly',
  'Fiesty',
  'Scary',
  'Amazing',
  'Hot',
  'Spicy',
  'Speedy',
  'Flying',
  'Fast',
  'Lucky',
  'Happy',
  'Magic',
  'Funky',
  'Lazy'
];

// Set animals names list for generating usernames.
var namesList = ['Fox',
  'Dog',
  'Shark',
  'Dolphin',
  'Cat',
  'Squirrel',
  'Dinosaur',
  'Deer',
  'Lion',
  'Bird',
  'Tiger',
  'Pig',
  'Fish',
  'Horse',
  'Cow',
  'Duck',
  'Penguin'
];

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
var bumpBlocks = {};
var crumblingBlocks = {};
var destroyBlocks = {};

// Shorten getElement function to be used to get HTML elements.
function $(e) {
  return document.getElementById(e);
}

var player = {
  x: 200,
  y: 200,
  width: 20,
  height: 20,
  jump: false,
  dx: 0,
  dy: 0,
  onground: false,
  facingLeft: false,
  dead: false
}
var playerFace = {
  x: player.x,
  y: player.y,
  width: 8,
  height: 5
}
var laser = {
  x: 200,
  y: 200,
  width: 20,
  height: 5,
  dx: 0,
  dy: 0

}
var lasers = [];
var onChromebook = /\bCrOS\b/.test(navigator.userAgent);
if (!onChromebook) {
  document.body.style.zoom = "140%";
}

var devToolsOpened = false;
function checkInspect() {
  // Check for inspect element
  var widthThreshold = window.outerWidth - window.innerWidth > 160;
  var heightThreshold = window.outerHeight - window.innerHeight > 160;
  if (!(heightThreshold && widthThreshold) && (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold) && !devToolsOpened) {
    if (localStorage.adminPass && atob(localStorage.adminPass) && atob(localStorage.adminPass) == 'admin') return;
    location.href = 'https://close-inspect.cosmictrig.repl.co/'
    devToolsOpened = true;
  }
}


function getLengthOfObjectList(list) {
  var count = 0;
  for (var thing in list) {
    count++;
  }
  return count;
}

var notifyThing;
var notifyThing2;

function notify(text) {
  text = text.replace('\n', '<br>')
  // Clear Animation so it can be re applied
  $('notificationMenu').style.animation = '';

  // Add notification
  $('notificationMenu').innerHTML = `<div class='notificationBg'>
                                        <p class='notificationText'>${text}</p>
                                      </div>`;

  // Stop animation from continueing if new notify
  clearTimeout(notifyThing);
  clearTimeout(notifyThing2);

  // Wait 5 seconds then fade
  notifyThing = setTimeout(function() {
    // Set animation
    $('notificationMenu').style.animation = 'fade 3s linear';

    // Run after animation
    notifyThing2 = setTimeout(function() {
      $('notificationMenu').innerHTML = '';
    }, 3000)
  }, 5000)
}

function clearNotify() {
  $('notificationMenu').innerHTML = '';
}

function centerText(text, x, y) {
  ctx2.font = '11px Arial';
  ctx2.fillStyle = 'lime';
  var textWidth = (ctx.measureText(text).width / 2) - (player.width / 2);
  ctx2.fillText(text, x - textWidth, y);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
}

function decompressMapData(mapData) {
  return mapData.replace(/(\d+)([ \w\W])/g, (_, count, chr) => chr.repeat(count));
}

function compressMapData(mapData) {
  return mapData.replace(/([ \w\W])\1+/g, (group, chr) => group.length + chr);
}

var stopwatchInterval;
var stopwatchMs = 0;
var timePaused;

function startStopwatch() {
  gameStarted = true;
  stopwatchMs = 0;
  var timeBegan = new Date();
  stopwatchInterval = setInterval(function() {
    if (gamePaused) return;
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - timeBegan);
    for (var i = 0; i < pauses.length; i++) {
      timeElapsed = new Date(timeElapsed - pauses[i]);
    }

    var min = timeElapsed.getUTCMinutes() + timeElapsed.getUTCHours() * 60;
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
    stopwatchMs = ((min * 60) + sec) * 1000 + ms

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    ms += Math.floor(Math.random() * (9 - 1 + 1) + 1);

    $('timer').innerHTML = `${min}:${sec}.${ms}`
  }, performanceMode?150:75)
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchInterval = null;
  $('timer').innerHTML = `00:00.00`
}

function stopStopwatch() {
  clearInterval(stopwatchInterval)
  stopwatchInterval = null;
}

function convertGravity(strength) {
  gravity = 0.29 * strength / 3
}

var playerSpeed = 1;

function convertPlayerSpeed(strength) {
  playerSpeed = strength / 3
}

var startPause;
var endPause;
var pauses = [];

function togglePauseGame() {
  gamePaused = !gamePaused;

  if (gamePaused) {
    startPause = new Date();
    $('pauseMenu').style = 'visibility: visible;';
    shooting = false;
    upPressed = false;
    leftPressed = false;
    rightPressed = false;
  } else {
    endPause = new Date();
    $('pauseMenu').style = 'visibility: hidden;'
    draw();
    pauses.push(new Date(endPause - startPause))
  }
}

var typewriteInterval;

function typewrite(text) {
  clearInterval(typewriteInterval)
  var orignal = text;
  var index = 0;
  var written = '';
  typewriteInterval = setInterval(function() {
    if (!gamePaused) {
      written += text.charAt(index);
      if (text.charAt(index) == ' ') {
        index++;
        written += text.charAt(index);
      }
      if (text.charAt(index) == '\n') {
        written += '<br>'
      }
      index++;
    }
    notify(written)
  }, 55)
}

function clearTypewriter() {
  clearInterval(typewriteInterval);
  $('notificationMenu').innerHTML = '';
}

setTimeout(function() {
  if(JSON.parse(localStorage.badMode) != null) performanceMode = JSON.parse(localStorage.badMode);
  setInterval(function() {
    if ((!document.hasFocus() || document.hidden) && dataSocket != null) {
      if (afk) return;

      lasers = [];
      localStorage.badMode = JSON.stringify(performanceMode);
      afk = true;
      dataSocket.emit('playerData',
        getCookie('uuid'),
        getCookie('username'),
        playerColor,
        level,
        afk,
        customLevelMap
      );
      socket.emit('getPlayers',
        getCookie('uuid'),
        player.x,
        player.y,
        0,
        0, [],
        player.facingLeft,
        level,
        getCookie('username'));
    } else {
      afk = false;
    }
  }, performanceMode?400:100);
  if(performanceMode) {
    $('loadingGif').style = 'visibility: hidden;'
    $('loadingText').style = 'visibility: hidden;'
    return;
  }
  setInterval(function() {
    if (allLevels.length == 0 && browseMenuOpen) {
      $('loadingGif').style = 'visibility: visible;'
      $('loadingText').style = 'visibility: visible;'
    } else {
      $('loadingGif').style = 'visibility: hidden;'
      $('loadingText').style = 'visibility: hidden;'
    }
  }, 100)
}, 400)