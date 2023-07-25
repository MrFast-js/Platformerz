//  Initialize Variables
var playersNames = [];
var cannonBalls = [];
var emitedX = player.x;
var emitedY = player.y;
var playerCollision = false;
var joinDate = new Date(parseFloat(getCookie('joinDate')));
var inLobby = false;
var spikeTrapOut = false;
var oldSpikeTrapOutValue = true;
var flight = false;
var platforms = LEVEL.LOBBY.map.split('');
var iceDxAdjusted = false;
var blocks = [];
var touchingSpike = false;

//							RED				L-GREEN			PINK			L-BLUE			ORANGE		D-BLUE			PURPLE		YELLOW
var colors = ['#d15e5e', '#7de378', '#d162cd', '#60d1d1', '#e39a1b', '#3f41b5', '#8942b8', '#d1c956'];
if (!getCookie('playerColor')) setCookie('playerColor', colors[Math.floor(Math.random() * colors.length)])
var playerColor = getCookie('playerColor')
var loaded = false;
var screenTextFaded = false;
var gridBlockWidth = 20;
var gridBlockHeight = 20;

// Spike trap stuf
var spikeInterval = setInterval(function() {
  if(!platforms.includes('S')) return;
  if (stopwatchInterval != null) {
    spikeTrapOut = !spikeTrapOut;
  };
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i] == 'S') {
      if (spikeTrapOut || stopwatchInterval == null) {
        if (platforms[i + 1] == 'o') platforms[i + 1] = '<'
        if (platforms[i - 1] == 'o') platforms[i - 1] = '<'
        if (platforms[i - 67] == 'o') platforms[i - 67] = '<'
        if (platforms[i + 67] == 'o') platforms[i + 67] = '<'
      } else {
        if (platforms[i + 1] == '<') platforms[i + 1] = 'o'
        if (platforms[i - 1] == '<') platforms[i - 1] = 'o'
        if (platforms[i - 67] == '<') platforms[i - 67] = 'o'
        if (platforms[i + 67] == '<') platforms[i + 67] = 'o'
      }
    }
  }
  drawPlatforms()
}, 2000)

setInterval(function() {
  if(admin && localStorage.adminPass != btoa('admin')) {
    console.log("%cGET OUT OF THE CONSOLE!",'font-size:40px;color:red;')
    setTimeout(function() {
      location.reload()
    },500)
  }
  admin = localStorage.adminPass == btoa('admin')
  if(flight && !admin) {
    flight = false;
    console.log("%cGET OUT OF THE CONSOLE!",'font-size:40px;color:red;')
    setTimeout(function() {
      location.reload()
    },500)
  }
},200)
var inLimbo = false;
setInterval(function() {
  if (platforms.join('') == LEVEL.LOBBY.map && !inLimbo && !mainMenuOpen && !browseMenuOpen && singlePlayer) {
    inLimbo = true;
    typewrite("Oops! You were sent to limbo because an error occured during your session. Press esc to return to the menu.")
  }
}, 500)

setInterval(function() {
  // Fade screen text (timer,fps,ping,record) if the player is within that region
  if (player.x < 153 && player.y < 80) {
    if (!screenTextFaded) {
      var elements = document.getElementsByClassName('screenText');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style = `color: rgba(255,255,255,0.2);-webkit-text-stroke: 1px rgba(0,0,0,0.2);`
      }
      screenTextFaded = true;
    }
  } else {
    if (screenTextFaded) {
      var elements = document.getElementsByClassName('screenText');
      for (var i = 0; i < elements.length; i++) {
        elements[i].style = `color: white;-webkit-text-stroke: 1px black;`
      }
      screenTextFaded = false;
    }
  }

  now = Date.now();
  mapSocket.emit('ping');

  //  Emit various player data to the data server.
  dataSocket.emit('playerData',
    getCookie('uuid'),
    getCookie('username'),
    playerColor,
    level,
    afk,
    customLevelMap
  );

  if (gamePaused) return;
  $('fps').innerHTML = fpsThing + ' fps ' + averagePing + 'ms'
  fpsThing = 0;
  if (customLevel) $('title').innerHTML = "Platformerz - " + customLevelName;
  if (singlePlayer) $('title').innerHTML = "Platformerz - lvl " + level;
  if (browseMenuOpen) updatePlayerInfoPanel();

}, 1000);


function shootCannons() {
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i] == 'c') {
      var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
      var xPos = (i % 67) * gridBlockWidth;
      // shooting to the right
      if (modifiers.cannons!=null) {
        if (modifiers.cannons[i].rotation == 1) {
          // doParticles2(xPos + 12, yPos + 6, '125,125,125', 5, 2, 1, 0.1, -0.1, 0.03)
          cannonBalls.push({ index: i, x: xPos, y: yPos });
        } else {
          // shooting to the left
          // doParticles2(xPos, yPos + 6, '125,125,125', 5, -1, -2, 0.1, -0.1, 0.03)
          cannonBalls.push({ index: i, x: xPos, y: yPos });
        }
      } else {
        // doParticles2(xPos, yPos + 6, '125,125,125', 5, -1, -2, 0.1, -0.1, 0.03)
        cannonBalls.push({ index: i, x: xPos, y: yPos });
      }
    }
  }
}
var collidableBlocks = []
function drawPlayer() {
  collidableBlocks = []
  var playerIndex = Math.floor(player.x / 20, 1) + (Math.floor(player.y / 20, 1) * 67)
  collidableBlocks.push(playerIndex-69-67)
  collidableBlocks.push(playerIndex-68-67)
  collidableBlocks.push(playerIndex-67-67)
  collidableBlocks.push(playerIndex-66-67)
  collidableBlocks.push(playerIndex-65-67)
  
  collidableBlocks.push(playerIndex-69)
  collidableBlocks.push(playerIndex-68)
  collidableBlocks.push(playerIndex-67)
  collidableBlocks.push(playerIndex-66)
  collidableBlocks.push(playerIndex-65)
  // 2nd row 5
  collidableBlocks.push(playerIndex-2)
  collidableBlocks.push(playerIndex-1)
  collidableBlocks.push(playerIndex)
  collidableBlocks.push(playerIndex+1)
  collidableBlocks.push(playerIndex+2)
  // Bottom 5
  collidableBlocks.push(playerIndex+69)
  collidableBlocks.push(playerIndex+68)
  collidableBlocks.push(playerIndex+67)
  collidableBlocks.push(playerIndex+66)
  collidableBlocks.push(playerIndex+65)
  
  collidableBlocks.push(playerIndex+69+67)
  collidableBlocks.push(playerIndex+68+67)
  collidableBlocks.push(playerIndex+67+67)
  collidableBlocks.push(playerIndex+66+67)
  collidableBlocks.push(playerIndex+65+67)
  // Move lasers
  for (var i = 0; i < lasers.length; i++) {
    lasers[i].x += lasers[i].dx;
    if (singlePlayer) {
      ctx2.fillStyle = '#ed5353'
      ctx2.fillRect(lasers[i].x, lasers[i].y - laser.height, laser.width, laser.height);
    }
  
    if (lasers[i].x < 0 - laser.width || lasers[i].x > canvas.width) {
      if (lasers[i].x < 0 - laser.width) {
        doParticles(0, lasers[i].y - 5, '255, 0, 0', 6, 2, -2, 0.06);
      } else {
        doParticles(lasers[i].x - 10, lasers[i].y - 5, '255, 0, 0', 6, 2, -2, 0.06);
      }
      lasers.splice(i, 1);
    }
  }
  ctx2.globalAlpha = 1;

  // Emit player information to server
  if(!flight)
  socket.emit('getPlayers',
    getCookie('uuid'),
    player.x, // Player x and y is used to draw players to make the game multiplayer.
    player.y,
    lasers,
    player.facingLeft // Direction of player.
  );

  // Draw player
  // Determine username width.
  var nameWidth = (ctx2.measureText(getCookie('username')).width / 2) - (player.width / 2);
  ctx2.fillStyle = playerColor;
  // Draw player box.
  ctx2.fillRect(player.x, player.y, player.width, player.height);
  drawCosmetic(player, getCookie("uuid"))

  // Draw player username
  ctx2.font = '11px Arial';
  ctx2.fillText(getCookie('username'), player.x - nameWidth, player.y - 5);
  // Draw player face/gun/shooting thing.
  ctx2.fillStyle = '#333';
  ctx2.fillRect(player.x + (player.facingLeft ? -8 : 20), player.y + 3, playerFace.width, playerFace.height);


  for (var i = 0; i < cannonBalls.length; i++) {
    if (debug) {
      ctx2.strokeStyle = "red"
      ctx2.lineWidth = 1;
      ctx2.strokeRect(cannonBalls[i].x - 3.5, cannonBalls[i].y, 14, 14)
    }
    ctx2.fillStyle = "#333"
    ctx2.beginPath();
    ctx2.arc(cannonBalls[i].x + 3.5, cannonBalls[i].y + 8, 7, 0, 2 * Math.PI, false);
    ctx2.fill();

    // left
    if (!modifiers.cannons || modifiers.cannons[cannonBalls[i].index].rotation == 0) {
      cannonBalls[i].x -= 3;
    }
    // right
    if (modifiers.cannons && modifiers.cannons[cannonBalls[i].index].rotation == 1) {
      cannonBalls[i].x += 3;
    }
  }

  // for (var i = 0; i < bossBalls.length; i++) {
  //   ctx2.fillStyle = "#333"
  //   ctx2.beginPath();
  //   ctx2.arc(bossBalls[i].x + 3.5, bossBalls[i].y + 8, 7, 0, 2 * Math.PI, false);
  //   ctx2.fill();

  //   // left
  //   if (bossBalls[i].direction == -1) {
  //     bossBalls[i].x -= 5;
  //   }
  //   // right
  //   if (bossBalls[i].direction == 1) {
  //     bossBalls[i].x += 5;
  //   }
  // }

  for (var i = 0; i < fallingCannonBalls.length; i++) {
    if (debug) {
      ctx2.strokeStyle = "red"
      ctx2.lineWidth = 1;
      ctx2.strokeRect(fallingCannonBalls[i].x - 3.5, fallingCannonBalls[i].y, 14, 14)
    }
    ctx2.fillStyle = "#333"
    ctx2.beginPath();
    ctx2.arc(fallingCannonBalls[i].x + 3.5, fallingCannonBalls[i].y + 8, 7, 0, 2 * Math.PI, false);
    ctx2.fill();
    fallingCannonBalls[i].dy += fallingCannonBalls[i].slow ? gravity / 6 : gravity;
    fallingCannonBalls[i].dy = Math.min(fallingCannonBalls[i].dy, 17.3)
    fallingCannonBalls[i].y += fallingCannonBalls[i].dy
  }

  // Each Player that is online
  for (var dude in players) {
    // Add each player name to player list
    var playr = players[dude];

    // Draw lasers received from server
    var allLasers = players[dude].lasers;
    if (players[dude].lasers && dude == getCookie('uuid') && !singlePlayer) {
      for (var i = 0; i < allLasers.length; i++) {
        ctx2.fillStyle = '#ed5353'
        allLasers[i].x += allLasers[i].dx/2;
        ctx2.fillRect(allLasers[i].x, allLasers[i].y - laser.height, laser.width, laser.height);
      }
    }
    
    // Ignore player if on different level or afk or in campaign or if players are hidden
    if (customLevelMap != playr.customLevelMap || playr.afk || singlePlayer || hidePlayers) continue;


    // Measure text and draw player username
    var nameWidth = (ctx2.measureText(playr.name).width / 2) - (player.width / 2);
    // Draw other players
    if ((dude != getCookie('uuid') && getCookie('username') != playr.name) || debug) {
      // Each Player Color

      var color = players[dude].color;
      ctx2.fillStyle = color;

      ctx2.fillStyle = color;
      ctx2.fillRect(playr.x, playr.y, player.width, player.height);

      drawCosmetic(playr, dude)
      ctx2.font = '11px Arial';
      ctx2.fillText(playr.name, playr.x - nameWidth, playr.y - 5);

      ctx2.fillStyle = '#333';
      ctx2.fillRect(playr.x + (playr.facingLeft ? -8 : 20), playr.y + 3, playerFace.width, playerFace.height);
    }
    
    if (players[dude].lasers && dude != getCookie('uuid')) {
      for (var i = 0; i < allLasers.length; i++) {
        ctx2.fillStyle = '#ed5353'
        allLasers[i].x += allLasers[i].dx;
        ctx2.fillRect(allLasers[i].x, allLasers[i].y - laser.height, laser.width, laser.height);
      }
    }
  }
}
var playerColors = {};
var opacity = 1;
// Draw hearts
function drawHearts() {
  if (!customLevel) {
    if (deaths == 0) {
      $('heart1').src = 'https://i.imgur.com/voVCZNK.png';
      $('heart2').src = 'https://i.imgur.com/voVCZNK.png';
      $('heart3').src = 'https://i.imgur.com/voVCZNK.png';
    }
    if (deaths >= 1) $('heart1').src = 'https://i.imgur.com/y98DfuA.png';
    if (deaths >= 2) $('heart2').src = 'https://i.imgur.com/y98DfuA.png';
  } else {
    $('heart1').src = '';
    $('heart2').src = '';
    $('heart3').src = '';
  }
}

// Draw grid and label
function drawGrid() {
  for (var x = 0; x < canvas.width; x += gridBlockWidth) {
    for (var y = 0; y < canvas.height; y += gridBlockHeight) {
      ctx2.strokeStyle = 'grey';

      ctx2.lineWidth = 0.25;
      ctx2.strokeRect(x, y, gridBlockWidth, gridBlockHeight);
    }
  }
}

function drawPlatforms() {
  if (modifiers.backgroundColor) backgroundColor = modifiers.backgroundColor;
  else backgroundColor = '#f2f0f0'
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var temp = [];

  for (var i = 0; i < platforms.length; i++) {
    var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
    var xPos = (i % 67) * gridBlockWidth;
    var w = gridBlockWidth;
    var h = gridBlockHeight;



    // Spawnpoint
    if (platforms[i] == '≛' && !player.spawnpoint) {
      player.spawnpoint = { 'x': xPos, 'y': yPos };
      player.x = xPos;
      player.y = yPos;
    }
    // finish
    if (platforms[i] == '✓') {
      finish = { 'x': xPos, 'y': yPos };
    }
    // Special Blocks
    for (var thing in BLOCK) {
      var block = BLOCK[thing];
      if (platforms[i] == block.icon) {

        if (platforms[i] == 'b') {
          temp.push({ 'x': xPos, 'y': yPos + 15, 'width': w, 'height': 5, 'type': thing.toLowerCase(), 'id': i });
        } else {
          temp.push({ 'x': xPos, 'y': yPos, 'width': w, 'height': h, 'type': thing.toLowerCase(), 'id': i });
        }

        ctx.fillStyle = block.color;

        if (platforms[i] == 'c') {
          // left
          if (!modifiers.cannons) {
            ctx.fillStyle = "#070338";
            ctx.fillRect(xPos + 2, yPos + 2, 16, 14)
            ctx.fillStyle = "#888";
            ctx.fillRect(xPos + 10, yPos + 12, 6, 8)
          }
          else if (modifiers.cannons[i]) {
            if (modifiers.cannons[i].rotation == 0) {
              ctx.fillStyle = "#070338";
              ctx.fillRect(xPos + 2, yPos + 2, 16, 14)
              ctx.fillStyle = "#888";
              ctx.fillRect(xPos + 10, yPos + 12, 6, 8)
            }
            // right
            else if (modifiers.cannons && modifiers.cannons[i].rotation == 1) {
              ctx.fillStyle = "#070338";
              ctx.fillRect(xPos + 2, yPos + 2, 16, 14)
              ctx.fillStyle = "#888";
              ctx.fillRect(xPos + 4, yPos + 12, 6, 8)
            }
          }
        } else if (platforms[i] == '/') {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos + h);
          ctx.lineTo(xPos + w, yPos);
          ctx.lineTo(xPos + w, yPos + h);
          ctx.fill();
        } else if (platforms[i] == '\\') {
          ctx.beginPath();
          ctx.moveTo(xPos, yPos);
          ctx.lineTo(xPos, yPos + h);
          ctx.lineTo(xPos + w, yPos + h);
          ctx.fill();
        }
        // SPIKES!!
        else if (platforms[i] == '▲') {
          ctx.beginPath();

          if (!airBlocks.includes(platforms[i + 67])) {
            // facing up /\
            ctx.moveTo(xPos, yPos + h);
            ctx.lineTo(xPos + (w / 2), yPos);
            ctx.lineTo(xPos + w, yPos + h);
          } else if (!airBlocks.includes(platforms[i - 67])) {
            // facing down \/
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + w, yPos);
            ctx.lineTo(xPos + (w / 2), yPos + h);
          } else if (!airBlocks.includes(platforms[i + 1])) {
            // facing left <|
            ctx.moveTo(xPos + w, yPos);
            ctx.lineTo(xPos + w, yPos + h);
            ctx.lineTo(xPos, yPos + (h / 2));
          } else if (!airBlocks.includes(platforms[i - 1])) {
            // facing right |>
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + h);
            ctx.lineTo(xPos + w, yPos + (h / 2));
          } else {
            // spike ball
            ctx.moveTo(xPos, yPos + (h / 2));
            ctx.lineTo(xPos + (w / 2), yPos);
            ctx.lineTo(xPos + w, yPos + (h / 2))
            ctx.lineTo(xPos + (w / 2), yPos + h);

            ctx.moveTo(xPos + 3, yPos + 3);
            ctx.lineTo(xPos + w - 3, yPos + 3);
            ctx.lineTo(xPos + w - 3, yPos + h - 3);
            ctx.lineTo(xPos + 3, yPos + h - 3);
          }

          ctx.fill();
        } else if (platforms[i] == '<') {
          ctx.beginPath();

          if (platforms[i + 67] == 'S') {
            // facing up /\/\
            ctx.moveTo(xPos, yPos + h);
            ctx.lineTo(xPos + (w / 4), yPos + (h / 2));
            ctx.lineTo(xPos + (w / 2), yPos + h)
            ctx.lineTo(xPos + (w * (3 / 4)), yPos + (h / 2));
            ctx.lineTo(xPos + w, yPos + h);
          } else if (platforms[i - 67] == 'S') {
            // facing down \/\/
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + (w / 4), yPos + (h / 2));
            ctx.lineTo(xPos + (w / 2), yPos);
            ctx.lineTo(xPos + (w * (3 / 4)), yPos + (h / 2));
            ctx.lineTo(xPos + w, yPos);
          } else if (platforms[i + 1] == 'S') {
            // facing left <|
            //             <|
            ctx.moveTo(xPos + w, yPos);
            ctx.lineTo(xPos + (w / 2), yPos + (h / 4));
            ctx.lineTo(xPos + w, yPos + (h / 2));
            ctx.lineTo(xPos + (w / 2), yPos + (h * (3 / 4)));
            ctx.lineTo(xPos + w, yPos + h);
          } else if (platforms[i - 1] == 'S') {
            // facing right |>
            //              |>
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + w / 2, yPos + (h / 4));
            ctx.lineTo(xPos, yPos + h / 2);
            ctx.lineTo(xPos + (w / 2), yPos + (h * (3 / 4)));
            ctx.lineTo(xPos, yPos + h);
          }
          ctx.fill()
        } else {
          if(!performanceMode) {
            if(texturedBlocks.includes(thing.toLowerCase())) {
              var img = new Image()
              img.src='assets/blocks/'+thing.toLowerCase()+".png";
              drawImage3(img, xPos, yPos, 20, 20, 0, false)
            } else {
              ctx.fillRect(xPos, yPos, gridBlockWidth, gridBlockHeight);
            }
          } else {
            ctx.fillRect(xPos, yPos, gridBlockWidth, gridBlockHeight);
          }
        }
      }
    }

    if (modifiers.doors && modifiers.doors[i]) {
      if (platforms[i] != '□') continue;
      ctx.fillStyle = modifiers.doors[i].color;
      ctx.fillRect(xPos, yPos + 15, 20, 5);
      ctx.fillRect(xPos, yPos, 5, 20);
      ctx.fillRect(xPos, yPos, 20, 5);
      ctx.fillRect(xPos + 15, yPos, 5, 20);
    }
    if (modifiers.buttons && modifiers.buttons[i]) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(xPos, yPos, gridBlockWidth, gridBlockHeight);
      ctx.fillStyle = '#070338'
      ctx.fillRect(xPos, yPos + 15, 20, 5);
      ctx.fillStyle = modifiers.buttons[i].color;
      ctx.fillRect(xPos + 4, yPos + 12, 12, 3);
    }
  }
  blocks = temp;
}

var fpsThing = 0;
var airBlocks = ['o', '≛', '⛶', null, '▲', '~', 'q', '*', 'b',"≛",'e']
var texturedBlocks = ['spawn','finish']//['spawn','finish','brick']
var alreadyKnowDead = false;
var slowMotionThing = 0;
var then = Date.now();
var startTime = then;

var animationUpdate = false;
setInterval(function() {
  if (gamePaused || afk) return;
  player.x = Math.floor(player.x);

  var shootSpeed = 45;

  // Reset Player on death
  if (player.dead) {
    player.dead = false;
    setTimeout(function() {
      resetPlayer();
    }, 100);
  }

  if (player.facingLeft) {
    laserThing = -10;
    laserX = player.x - (playerFace.width / 2);
  } else {
    laserThing = 10;
    laserX = player.x + (playerFace.width / 2);
  }

  if (stopwatchMs > 0 && shooting) {
    if (timeShooting >= shootSpeed) timeShooting = 0;
    timeShooting++;
    if (timeShooting == 1 && lasers.length < 5)
      lasers.push({ x: laserX, y: player.y + (laser.height * 1.5), dx: laserThing })
  }
  

  if (rightPressed && player.x < canvas.width - player.height) {
    // Move Right
    player.dx = 7.5 * playerSpeed;
  } else if (leftPressed && player.x > 0) {
    // Move Left
    player.dx = -6 * playerSpeed;
  }

  // Prevents super long jumps and slows walking
  player.dx *= iceDxAdjusted && !player.onground ? 1 : friction;
  if (!iceDxAdjusted && player.onground) {
    if (player.dx < 0 && friction == 0.2) player.dx /= 2
  }
  // Gravity
  if (!player.onground && !flight) {
    player.dy += gravity;
  }

  if (Math.floor(player.dy) > 0 && !player.inair && !flight) {
    player.dy = 0;
  }

  // Border Collisions
  if ((player.x + player.dx + player.width) > canvas.width) {
    // Right Collision
    player.x = canvas.width - player.width;
  } else if ((player.x + player.dx) < 0) {
    // Left Collision
    player.x = 0;
  } else {
    // No Collision
    player.x += player.dx;
  }
  if ((player.y + player.dy + player.height) > canvas.height) {
    // Bottom Collision
    player.y = canvas.height - player.height;
    player.onground = true;
    friction = 0.5;
    iceDxAdjusted = false;
  } else if ((player.y + player.dy) < 0) {
    // Top Collision
    player.dy = 0;
    player.y = 0;
  } else {
    // No Collision
    player.y += player.dy;
    player.onground = false;
  }

  doBlockCollisions();
  if (Math.round(Math.abs(player.dx)) == 0) player.dx = 0;
}, 16.6)

function draw() {
  if (gamePaused) return;
  // Run game loop
  checkInspect();
  // bump animation
  if (animationUpdate) {
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    animationUpdate = false;
  }

  if (modifiers.limitedVision) {
    ctx4.fillStyle = 'black'
    ctx4.globalCompositeOperation = 'source-over';
    ctx4.fillRect(0, 0, canvas.width, canvas.height)
    // ctx4.clearRect(player.x-60,player.y-60,140,140) 
    ctx4.beginPath();
    var limitedDistanceRadius = modifiers.visionDistance ? modifiers.visionDistance : 5;

    var radialGradient = ctx4.createRadialGradient(player.x + 10, player.y + 10, 1, player.x + 10, player.y + 10, limitedDistanceRadius * 30);
    radialGradient.addColorStop(0, 'rgba(255,0,0,1)');
    radialGradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx4.globalCompositeOperation = 'destination-out';
    ctx4.fillStyle = radialGradient;
    ctx4.arc(player.x + 10, player.y + 10, limitedDistanceRadius * 30, 0, 2 * Math.PI, false);
    ctx4.fill();
    ctx4.closePath();
  } else {
    if (!spikeTrapOut)
      ctx4.clearRect(0, 0, canvas.width, canvas.height);
  }

  // loop through each bump block
  for (var thing in bumpBlocks) {
    var block = bumpBlocks[thing];
    var xPos = (thing % 67) * gridBlockWidth;
    var goesUp = 5; // pixels
    var speed = 1;

    // draw 'fake' tile
    ctx3.fillStyle = '#565cdb';
    ctx3.fillRect(xPos, block.currentY, 20, 20);

    if (block.currentY > block.startY - goesUp && !block.blockup) {
      // go up
      block.currentY -= speed;
    } else {
      // stop from going back up
      block.blockup = true;
      if (block.currentY < block.startY) {
        // go down
        block.currentY += speed;
      } else {
        // after animation delete block
        delete bumpBlocks[thing];
      }
    }
    animationUpdate = true;
  }

  for (var thing in crumblingBlocks) {
    var block = crumblingBlocks[thing];
    if (!block.opacity) block.opacity = 1;
    // time out
    var timeoutSeconds = 0.8;

    if (!block.ms) block.ms = 1;
    block.ms += 1000 / 75;
    if (block.ms < timeoutSeconds * 1000) continue;

    var xPos = (thing % 67) * gridBlockWidth;
    var speed = 7;

    // draw 'fake' tile 
    ctx3.fillStyle = `rgba(191, 145, 19, ${block.opacity})`;
    ctx3.fillRect(xPos, block.currentY, 20, 20);
    //Move Tile
    if (block.opacity > 0) {
      // go down
      block.currentY += speed;
      // fade away
      block.opacity -= 0.05;
    } else {
      // after animation delete block
      delete crumblingBlocks[thing];
    }
    animationUpdate = true;
  }

  // only redraw the platforms if a block has been updated/destroyed
  if (nowin || !loaded) {
    loaded = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
  }

  // Draw Player facing left
  if (player.facingLeft) {
    playerFace = {
      x: player.x - playerFace.width,
      y: player.y + (playerFace.height / 2),
      width: playerFace.width,
      height: playerFace.height
    }
    playerFaceHandle = {
      x: playerFace.x + playerFace.width - playerFaceHandle.width,
      y: playerFace.y + playerFace.height
    }
  } else {
    playerFace = {
      x: player.x + player.width,
      y: player.y + (playerFace.height / 2),
      width: playerFace.width,
      height: playerFace.height
    }
    playerFaceHandle = {
      x: playerFace.x,
      y: playerFace.y + playerFace.height
    }
  }
  // Clear previous frame
  ctx2.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  renderParticles();

  //Draw Debug lines
  if (debug) {
    drawGrid();
    ctx2.fillStyle = 'lime';
    ctx2.fillRect(player.x, player.y, 5, 5)
  }

  // Laser Directions

  fpsThing += 1;
  requestAnimationFrame(draw);
}
draw();

var destroyBlockTimeout;

function resetMap() {
  moveStuff = 0;
  anotherThing = 1;
  if (!customLevel)
    platforms = loadLevel().map.split('');
  else {
    setTimeout(function() {
      platforms = customLevelMap.split('');
    }, 100)
  }
  // resetEnemies()
  deletedBlocks = {};
  crumblingBlocks = [];
  bumpBlocks = {};
  destroyBlocks = {};
}

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y;
}

var crumblingBlocks = [];
var deletedBlocks = {};

function deleteBlock(x, y, timeout) {
  var currentlevel = deaths;
  for (var thing in blocks) {
    var block = blocks[thing];
    if (block.x == x && block.y == y) {
      var id = block.id;
      if (!player.dead) {
        destroyBlockTimeout = setTimeout(function() {
          if (deaths != currentlevel) return;
          if (!player.dead) {
            deletedBlocks[id] = platforms[id];
            platforms[id] = null;
            loaded = false;
          }
        }, timeout)
        while (player.dead) {
          clearTimeout(destroyBlockTimeout)
        }
      }
    }
  }
}

var changelog = {
  'Disclaimer': 'This game is for educational purposes and to submit to the Congressional App Challenge.',
  '🎉 Cosmetics Update! 🎉': '🎉 Enjoy your free cosmetics 🎉 Access through the cosmetics button!',
  'Resolution': 'If certain elements are lining up correcltly zoom in or out to fix it'
}

window.onload = function() {
  var cnt = 0;
  for (var thing in gapi.auth2.getAuthInstance().currentUser) {
    cnt++;
    if (cnt == 1) googleVariable = thing;
  }
  if (!local) gapi.auth2.init()
  if (!getCookie('joinDate')) {
    setCookie('joinDate', Date.now());
  }
  setTimeout(function() {
    if (signedInWithGoogle) {
      setCookie('uuid', gapi.auth2.getAuthInstance().currentUser[googleVariable].getId());
      setCookie('username', getUsername(getCookie('uuid')));
    } else {
      setCookie('username', 'Guest ' + Math.floor(Math.random() * 11));
    }
  }, 1000)
  setTimeout(async function() {
    let data = await fetch("https://api.ipify.org/").then(res => res.text());
    mapSocket.emit('newPlayer',getCookie('uuid'),data)
  },5000)
  var htmlChangelog = 'Changelog:<changelog>';

  for (var change in changelog) {
    htmlChangelog += `<br>&emsp;• ${change} - ${changelog[change]}`
  }
  $('description').innerHTML = htmlChangelog + "</changelog>";
}

var audio;

function playMusic() {
  audio = new Audio('assets/sounds/music.wav');
  // music loop
  audio.volume = audioVolume;
  audio.play();

  audio.onended = function() {
    playMusic();
  }
}

function playSound(audioName) {
  var audio = new Audio(`assets/sounds/${audioName}`);
  audio.play();
}

var musicStarted = false;
window.onmousedown = function() {
  if (musicStarted) return;
  musicStarted = true;
  playMusic();
}

// Google API stuff
function onSignIn() {
  if (!signedInWithGoogle || !googleVariable) {
    setTimeout(function() {
      onSignIn();
    }, 500)
    return;
  }
  allLevels = [];
  organizeLevels();
  setTimeout(function() {
    if (names.length == 0) return;

    setCookie('uuid', gapi.auth2.getAuthInstance().currentUser[googleVariable].getId());
    if (names[getCookie('uuid')]) {
      setCookie('username', names[getCookie('uuid')]);
    } else {
      var prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      var name = namesList[Math.floor(Math.random() * namesList.length)];
      var autoName = `${prefix} ${name}`;
      setCookie('username', autoName);
      dataSocket.emit('getNames', getCookie('uuid'), autoName);
    }
    updatePlayerInfoPanel();
    getMaps();
  }, 2500)
}