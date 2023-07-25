var uploadMenuOpen = false;
var browseMenyOpen = false
var showBreadcrumbs = false;

document.onkeydown = function(e) {
  var keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "Space"]

  keyDownHandler(e);
  if (uploadMenuOpen || browseMenuOpen) return;
  if (!stopwatchInterval && keys.includes(e.code)) {
    // Prevent stopwatch from starting in lobby
    if (level != 1 || customLevel) startStopwatch();
  }
}
document.onkeyup = function(e) { keyUpHandler(e) };
var timeShooting = 0;
var shooting = false;
var slowMotion = false;
var oldSpeed = 1;
var performanceMode = false;

function keyDownHandler(e) {
  if (askActive) {
    if (e.key == '1') {
      mapSocket.emit('vote', true, getCookie('uuid'))
      askActive = false;
    }
    if (e.key == '2') {
      mapSocket.emit('vote', false, getCookie('uuid'))
      askActive = false;
    }
  }
  if (e.key == 'f' && admin) {
    flight = !flight;
    if (!flight) {
      playerSpeed = oldSpeed;
    } else {
      oldSpeed = playerSpeed;
      playerSpeed = 2;
    }
    notify('Developer Mode ' + (flight ? "Enabled" : "Disabled"))
    player.dy = 0;
  }

  if (e.key == 'Escape') {
    if (browseMenuOpen || uploadMenuOpen || mainMenuOpen) {
      unbrowseMaps();
      mainMenu();
      closeEditorMenu();
      uploadMenuOpen = false;
      $('myVideo').style = 'visibility: visible;'
      $('filter').style = 'visibility: visible;'
      $('white').style = 'visibility: hidden;';
    } else {
      togglePauseGame();
    }
  }

  if (uploadMenuOpen || browseMenuOpen || gamePaused || mainMenuOpen) return;

  if (e.code == "KeyP") {
    hidePlayers = !hidePlayers;
    if (hidePlayers) {
      notify('Players are now hidden')
    } else {
      notify('Players are now visible')
    }
  }
	if (e.code == "KeyM") {
		keyM()
  }
  if (e.code == "KeyT") {
    debug = !debug;
  }
  if (e.code == "KeyL") {
    performanceMode = !performanceMode;
    notify('Bad Compuuter Mode ' + (performanceMode ? "Enabled" : "Disabled"))
  }
  if (e.code == "KeyB") {
    showBreadcrumbs = !showBreadcrumbs;
  }
  if (e.code == "KeyR" && !e.altKey) {
    resetPlayer();
    updateMap = true;
    if (customLevel) stopStopwatch();
    resetMap();
    deaths++;
  }
  if (e.code == "ArrowRight" || e.key == "d") {
    rightPressed = true;
    player.facingLeft = false;
  }
  if (e.code == 'ArrowLeft' || e.key == "a") {
    leftPressed = true;
    player.facingLeft = true;
  }
  if ((e.code == "ArrowUp" || e.key == "w") && ((player.onground && !player.dontJump) || flight)) {
    player.jump = true;
    player.onground = false;
    player.dy = -8;
  }
  if (e.code == "ArrowDown" && flight) {
    player.dy = 8;
    console.log(player.dy)
  }
  if (e.code == 'Space') {
    shooting = true;
  }
  if (e.code == 'ArrowLeft' && e.altKey) {
    e.preventDefault()
  }
  if (e.altKey) e.preventDefault()
  if (e.code == 'ArrowRight' && e.altKey) {
    e.preventDefault()
  }
  if (e.ctrlKey && e.keyCode == 13) {
    importLevel();
  }
}

var randomMapCooldown = false;

function keyUpHandler(e) {
  if (mainMenuOpen) return;
  if (gamePaused) return;
  if (e.key == "r" && e.altKey && !randomMapCooldown) {
    randomMapCooldown = true;
    getMaps();
    setTimeout(function() {
      randomMap()
      drawPlatforms()
    }, allLevels ? 0 : 100)
    setTimeout(function() {
      resetPlayer();
    }, 100)
    setTimeout(function() {
      randomMapCooldown = false;
    }, 500)
  }
  if (e.code == 'ArrowRight' || e.key == "d") {
    rightPressed = false;
    if (flight) player.dx = 0;
  }
  if (e.code == 'ArrowLeft' || e.key == "a") {
    leftPressed = false;
    if (flight) player.dx = 0;
  }
  if (e.code == "ArrowDown" && flight) {
    player.dy = 0;
  }
  if (e.code == "ArrowUp" || e.key == "w") {
    upPressed = false;
    player.jump = false;
    if (flight) player.dy = 0;
  }
  if (e.code == 'Space') {
    shooting = false;
    timeShooting = 0;
  }
}