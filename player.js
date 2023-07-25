var doGravity = true;
var gravity = 0.20;
var noFireworks = false;
var gameStarted = false;
var modifiersBackup = {};
var collidableBlocks = []
function resetPlayer() {
  drawHearts();
  // resetEnemies();
  
  activeButtons = {};
  cannonBalls = [];
  bossBalls = []
  fallingCannonBalls = [];
  buttonCooldown = false;
  pauses = [];
  gravity = 0.29;
  playerSpeed = 1;
  friction = 0.5;
  iceDxAdjusted = false;
  nowin = true;
  if (!singlePlayer) gameStarted = false;
  resetMap();
  if (!debug) breadcrumbs = [];
  clearInterval(cannonBallInterval)
  cannonBallInterval = setInterval(function() {
    if (gameStarted && !afk) shootCannons();
  }, 2000)
  // boss = {
  //   x: 500,
  //   y: 300,
  //   size: 200,
  //   height: 200,
  //   width: 200,
  //   dx: 0,
  //   dy: 0,
  //   onground: false,
  //   inair: true,
  //   health: 5,
  //   sheildStrength: 10
  // }
  // Reset player to default values

  player = {
    width: 20,
    height: 20,
    jump: false,
    dx: 0,
    dy: 0,
    onground: false,
    facingLeft: false,
    dead: false,
    dontJump: false
  }
  // Spawnpoint
  var spawnpoint = platforms.indexOf('≛')
  if (spawnpoint) {
    var i = spawnpoint;
    var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
    var xPos = (i % 67) * gridBlockWidth;
    var w = gridBlockWidth;
    var h = gridBlockHeight;
    player.spawnpoint = { 'x': xPos, 'y': yPos };
    player.x = xPos;
    player.y = yPos;
  }
  shooting = false;
  if (customLevel) {
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
  }
  clearTimeout(destroyBlockTimeout)
  setTimeout(function() {
    nowin = false;
    if (modifiers.speed)
      convertPlayerSpeed(modifiers.speed);
    if (modifiers.gravity)
      convertGravity(modifiers.gravity);
  }, 1000)
}

var timeout = false;

function death() {
  if(flight) return;
  nowin = true;

  if (player.dead || timeout) return;
  timeout = true;
  player.dead = true;
  doDeathParticles();
  deaths++;
  if (deaths >= 3 && !customLevel) {
    crumblingBlocks = [];
    setLevel(2);
    deaths = 0;
    drawHearts();
  } else if (deaths > 0 && customLevel) {
    deaths = 0;
    stopStopwatch();
    resetPlayer();
    resetMap();
  }
  setTimeout(function() {
    timeout = false;
    nowin = false;
    for (var level in levelAndModifiers) {
      if (customLevelName == level) {
        modifiers = levelAndModifiers[level];
      }
    }
  }, 200);
}

function devToolsWarning(record) {
  if (devToolsOpened) {
    notify(`Congratulations! You tried to cheat, and failed.`)
  } else {
    if (!signedInWithGoogle && record) {
      notify('Congratulations you got a record but it wont be saved because youre not logged in with google')
      return;
    }
    $('timer').innerHTML = msToTime(stopwatchMs);
    setTimeout(function() {
      console.log("SENDING TO SERVER")
      mapSocket.emit('finishLevel', stopwatchMs, customLevelName, getCookie('uuid'));
      setTimeout(function() {
        clearInterval(int)
      },4000)
      
      if (stopwatchMs) notify(`Congratulations ${getCookie('username')}! You completed '${customLevelName}' in ${msToTime(stopwatchMs)}!${record ? ' \nThats a new record!' : ''}`)
    }, 5)
  }
}
var activeButtons = {};
var buttonCooldown = false;
var onButton = false;

function doBlockCollisions() {
  if(flight) return;

  
  // Platform Collisions
  var touchingTopBlock = false;
  ctx3.clearRect(0, 0, canvas.width, canvas.height)
  if(debug) {
    for (var a = 0; a < collidableBlocks.length; a++) {
      var i=collidableBlocks[a];
      
      var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
      var xPos = (i % 67) * gridBlockWidth;
      var w = gridBlockWidth;
      var h = gridBlockHeight;
      ctx3.fillStyle = 'green'
      ctx3.globalAlpha = 0.4;
      ctx3.fillRect(xPos,yPos,w,h);
      ctx3.globalAlpha = 1;
    }
  }
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type != 'cannon') doCannonBallCollision(i);

    doLaserCollisions(i);
    doSpikeCollision()
    if (!collidableBlocks.includes(blocks[i].id) || !blocks[i]) continue;
    var inrange = Math.sqrt(Math.abs(player.x - blocks[i].x) * 2 + Math.abs(player.y - blocks[i].y) * 2) < 10; // 5 blocks away
    if (!inrange) {
      continue;
    }
    // else if (debug) {
    //   ctx3.fillStyle = 'green';
    //   ctx3.globalAlpha = 0.4;
    //   ctx3.fillRect(blocks[i].x, blocks[i].y, 20, 20);
    //   ctx3.globalAlpha = 1;
    // }



    if (collides(player, blocks[i])) {
      var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) - 67; // Index of block above player
      var blockAbove = true;

      if (airBlocks.includes(platforms[num])) blockAbove = false;

      
      if (blocks[i].type.includes('slope')) {
        var x = (blocks[i].id % 67) * gridBlockWidth;
        var y = Math.floor(blocks[i].id / 67, 1) * gridBlockHeight;

        // /|
        if (player.x + player.width >= x && player.dy >= 0 && blocks[i].type == "left_slope") {
          if (player.x >= blocks[i].x + 16.5 && Math.abs(player.y - blocks[i].y) < 19.7) {
            player.x = x + blocks[i].width;
          } else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 68]))) && player.y >= blocks[i].y) {
            player.x = x - blocks[i].width;
          } else {
            var distIntoBlock = Math.abs((player.x + player.width) - x);
            if (Math.floor(Math.abs(blocks[i].y - player.y)) <= distIntoBlock) {
              player.y = Math.max(y - Math.abs((player.x + player.width) - x), y - 20);
              player.onground = true;
              touchingTopBlock = true;
              friction = 0.5;
              iceDxAdjusted = false;
            }
          }
        }

        if (player.x >= x - 21 && player.x - x < -15 && blocks[i].type == "right_slope" && player.y - y > 0) {
          player.x = blocks[i].x - blocks[i].width - 1
        }

        // |\
        if (player.x < x + blocks[i].width && blocks[i].type == "right_slope") {
          if (player.x <= blocks[i].x - 16.5 && Math.abs(player.y - blocks[i].y) < 19.7) {
            player.x = x - blocks[i].width - 1;
            continue;
          }
          else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 66]))) && player.y >= blocks[i].y) {
            player.x = x + blocks[i].width;
            continue;
          } else {
            var distIntoBlock = Math.max(Math.abs(x + blocks[i].width - player.x), 0);
            if (Math.floor(Math.abs(blocks[i].y - player.y)) <= distIntoBlock && (blocks[i].y-player.y+0.3)>=0) {
              player.y = y + (Math.abs(Math.min(distIntoBlock - 20, 0))) - 20;
              player.onground = true;
              touchingTopBlock = true;
              friction = 0.5;
              iceDxAdjusted = false;
            }
          }
        }
      }

      // Custom Collisions
      // No collision blocks
      if (blocks[i].type == "ghost" || blocks[i].type == "spawn" || blocks[i].type == "minispike" || blocks[i].type == "spike") {
        continue;
      }

      // Jump block
      if (blocks[i].type == 'water') {
        touchingTopBlock = false;
        player.onground = true;
        player.y += 0.5;
        continue;
      }

      // Finish Level Block
      if (blocks[i].type == 'finish' && !nowin) {
        if (tutorial) {
          nextTutorial();
        }
        nowin = true;
        // Go to next level if not a custom level
        if (!customLevel) nextLevel();
        else {
          stopStopwatch();
          resetPlayer();
          resetMap();
          var record = false;
          for (var i = 0; i < allLevels.length; i++) {
            if (allLevels[i].name == customLevelName) {
              if (stopwatchMs < allLevels[i].ms) {
                record = true;
              }
            }
          }
          if (record && !noFireworks) {
            noFireworks = true;
            var fireworkCount = 0;
            var int = setInterval(function() {
              fireworkCount++;
              fireworks();
              if (fireworkCount == 4) clearInterval(int)
            }, 500)
            getMaps();
            setTimeout(function() {
              noFireworks = false;
            }, 5000)
          }
          devToolsWarning(record);

        }
        setTimeout(function() {
          nowin = false;
        }, 500)
        continue;
      }
      var touchingButton = false;
      ctx2.fillStyle = 'red';
      ctx2.globalAlpha = 0.4;

      // Top of block collision
      if (player.y - player.dy < blocks[i].y && blocks[i].y - (player.y - player.dy) > 10 && !blockAbove && player.dy >= 0) {
        if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y, 20, 5);
        if (blocks[i].type.includes('slope')) continue;
        touchingTopBlock = true;

        if (blocks[i].type == 'button' && !buttonCooldown && !onButton) {
          buttonCooldown = true;
          setTimeout(function() {
            buttonCooldown = false
          }, 100)
          toggleButton(i)
        }
        if (blocks[i].type == 'button') touchingButton = true;

        // Crumble after top collision
        if (blocks[i].type == 'crumble' && !crumblingBlocks[blocks[i].id] && gameStarted) {
          crumblingBlocks[blocks[i].id] = {
            startY: blocks[i].y,
            currentY: blocks[i].y
          }
          deleteBlock(blocks[i].x, blocks[i].y, 1000);
          doParticles(blocks[i].x + 10, blocks[i].y, '191, 145, 19', 2, 2, -2, 0.06)
        }
        if (blocks[i].type == 'stick') {
          friction = 0.2;
        } else if (friction != 0.98 && friction != 0.7) {
          friction = 0.5;
        }

        // Ice Collisions
        if (blocks[i].type == 'ice') {
          // Slipperiness
          if (player.facingLeft && !iceDxAdjusted) {
            player.dx = -1
            iceDxAdjusted = true;
          }
          if (!player.facingLeft && !iceDxAdjusted) {
            player.dx = 1
            iceDxAdjusted = true;
          }
          if (!leftPressed && !rightPressed) {
            friction = 0.98;
            if (!player.onground) {
              friction = 0.9;
            }
          }
          if (rightPressed || leftPressed) {
            friction = 0.7
          }
        } else if (friction != 0.2) {
          // Normal Slipperiness
          friction = 0.5;
          iceDxAdjusted = false;
        } else {
          iceDxAdjusted = false;
        }

        // Bounce Block
        if (blocks[i].type == 'bounce') {
          if (Math.floor(Math.abs(player.dy) - 0.3, 1) != 0) {
            player.dy = Math.min(17.3, player.dy)
            doParticles(blocks[i].x + 10, blocks[i].y, '255, 184, 92', 4, 2, -2, 0.06);
            player.dy *= -0.79;
          }
        }

        // Set player y to ontop of the platform
        player.y = (blocks[i].y - player.height);
        player.onground = true;
      }

      // Bottom of block collision
      else if (((player.y >= blocks[i].y + 10) || (blocks[i].type == 'button')) && player.dy <= 0 && player.y <= blocks[i].y + blocks[i].height) {
        if (blocks[i].type == 'brick') continue;

        if (blocks[i].type == 'bump' && !bumpBlocks[blocks[i].id]) {
          bumpBlocks[blocks[i].id] = {
            startY: blocks[i].y,
            currentY: blocks[i].y
          }
          deleteBlock(blocks[i].x, blocks[i].y, 0);
          doParticles(blocks[i].x + 10, blocks[i].y, '86, 92, 219', 2, 2, -2, 0.06)
        }

        var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) + 67;
        var blockBelow = true;

        // Checks if that block should have bottom collision
        if (airBlocks.includes(platforms[num])) blockBelow = false;

        if (!blockBelow) {
          if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y + 15, 20, 5)
          player.y = blocks[i].y + blocks[i].height;
          player.dy = 0;
        }
      }

      // Left side of block collision
      else if (player.x <= blocks[i].x) {
        if (blocks[i].type.includes('slope')) continue;

        if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y, 5, 20)
        if (blocks[i].type == 'stick') {
          player.onground = true;
        }
        if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
        if (blocks[i].type == 'left_slope') continue;
        player.dx = 0;
        player.x = blocks[i].x - player.width;
      }

      // Right side of block collision
      else if (player.x > blocks[i].x) {
        if (blocks[i].type.includes('slope')) continue;

        if (debug) ctx2.fillRect(blocks[i].x + 15, blocks[i].y, 5, 20)
        if (blocks[i].type == 'stick') {
          player.onground = true;
        }
        if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
        if (blocks[i].type == 'right_slope') continue;
        player.dx = 0;
        player.x = blocks[i].x + player.width;
      }
      ctx2.globalAlpha = 1;
    }
  }
  onButton = touchingButton;
  player.inair = !touchingTopBlock;
}

function doLaserCollisions(i) {
  // Laser Collisions
  for (var a = 0; a < lasers.length; a++) {
    // Laser Object to be used in collision check
    var laserCheck = {
      x: lasers[a].x,
      y: lasers[a].y,
      width: laser.width,
      height: laser.height
    }
    var inrange = Math.sqrt(Math.abs(laserCheck.x - blocks[i].x) * 2 + Math.abs(laserCheck.y - blocks[i].y) * 2) < 10; // 5 blocks away
    if (!inrange) {
      continue;
    } 
    // if (collides(laserCheck, boss)) {
    //   boss.hit = true;
    //   lasers.splice(a, 1);
    //   doParticles(laserCheck.x, laserCheck.y - 5, '255, 0, 0', 6, 2, -2, 0.06)
    //   return;
    // }
    // for(var b=0;b<enemies.length;b++) {
    //   if(collides(laserCheck, enemies[b])) {
    //     doParticles(laserCheck.x, laserCheck.y - 5, '255, 0, 0', 6, 2, -2, 0.06)
    //     enemies[b].health -= 1
    //     if(enemies[b].health <= 0) {
    //       enemies.pop(b,1)
    //     }
    //     lasers.splice(a, 1);
    //   }
    // }
    // Lasers go through blocks in the airBlocks array
    if (airBlocks.includes(platforms[blocks[i].id])) continue;
    // Check if laser is colliding with block
    if (collides(laserCheck, blocks[i])) {
      // Destroy blocks if hit by laser
      if (blocks[i].type == "destroy") {
        if (modifiers.doors && modifiers.doors[blocks[i].id]) {

        } else {
          deleteBlock(blocks[i].x, blocks[i].y, 0);
          doParticles(blocks[i].x + 10, blocks[i].y + 10, '136, 136, 136', 6, 2, -2, 0.06);
          blocks.splice(i, 1);
          loaded = false;
        }
      }

      //Remove laser and do particles when laser hits block
      doParticles(laserCheck.x, laserCheck.y - 5, '255, 0, 0', 6, 2, -2, 0.06)
      lasers.splice(a, 1);
    }
  }
}


function triangleCheck(points) {
  for (var pos of points) {
    var x = parseFloat(pos.split(',')[0])
    var y = parseFloat(pos.split(',')[1])

    var point = {
      'x': x,
      'y': y,
      'width': 1,
      'height': 1
    }

    if (collides(player, point)) {
      player.dx = 0;
      player.dy = 0;

      return true;
    }
  }

  return false;
}

function doForceReload() {
  socket.emit('doForceRefresh');
}

function doSpikeCollision() {
  for (var collidableBlock of collidableBlocks) {
    var i=collidableBlock;
    if (platforms[i] == '▲' || platforms[i] == '<') {
      var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
      var xPos = (i % 67) * gridBlockWidth;
      var w = gridBlockWidth;
      var h = gridBlockHeight;
      
      var trianglePoints = [];

      if (!airBlocks.includes(platforms[i + 67])) {
        // facing up /\
          trianglePoints.push(`${xPos + 1},${yPos + h - 1}`);
          trianglePoints.push(`${xPos + (w / 2)},${yPos + 5}`);
          trianglePoints.push(`${xPos + w - 1},${yPos + h - 1}`);
      } else if (!airBlocks.includes(platforms[i - 67])) {
        // facing down \/
          trianglePoints.push(`${xPos + 1},${yPos}`);
          trianglePoints.push(`${xPos + w - 1},${yPos}`);
          trianglePoints.push(`${xPos + (w / 2)},${yPos + h - 5}`);
      } else if (!airBlocks.includes(platforms[i + 1])) {
        // facing left <|
          trianglePoints.push(`${xPos + w},${yPos + 1}`);
          trianglePoints.push(`${xPos + w},${yPos + h - 2}`);
          trianglePoints.push(`${xPos + 1},${yPos + (h / 2)}`);
      } else if (!airBlocks.includes(platforms[i - 1])) {
        // facing right |>
          trianglePoints.push(`${xPos},${yPos + 1}`);
          trianglePoints.push(`${xPos},${yPos + h - 2}`);
      } else {
        // spike ball
          trianglePoints.push(`${xPos + 4},${yPos + 4}`);
          trianglePoints.push(`${xPos + w - 4},${yPos + 4}`);
          trianglePoints.push(`${xPos + w - 4},${yPos + h - 4}`);
          trianglePoints.push(`${xPos + 4},${yPos + h - 4}`);
      }

      // Check if the player is touching the spike
      if (triangleCheck(trianglePoints) && !player.dead) {
        death();
      }
    }
  }
}

function doCannonBallCollision(blockIndex) {
  for (var i = 0; i < cannonBalls.length; i++) {
    var cannonBall = cannonBalls[i];
    var cannonHitbox = { x: cannonBall.x, y: cannonBall.y + 2, width: 15, height: 12 };
    // ctx2.strokeRect(cannonBall.x,cannonBall.y+2,12,12)
    if (collides(player, cannonHitbox)) {
      if (player.y < cannonBall.y) {
        player.jump = true;
        player.onground = false;
        player.y = cannonBall.y - 20
        player.dy = -8;
      } else {
        death();
      }
      cannonBalls.splice(i, 1)
      doParticles(cannonBall.x, cannonBall.y + 5, '80, 80, 80', 6, 2, -2, 0.06)
    }

    if (cannonBall.x + 14 > canvas.width) {
      cannonBalls.splice(i, 1)
      doParticles(cannonBall.x + 10, cannonBall.y + 10, '136, 136, 136', 6, 2, -2, 0.06);
      cannonBall.x += 5;
      cannonBall.dy = 1;
      fallingCannonBalls.push(cannonBall);
    } else if (cannonBall.x < 0) {
      cannonBalls.splice(i, 1)
      doParticles(cannonBall.x + 10, cannonBall.y + 10, '136, 136, 136', 6, 2, -2, 0.06);
      cannonBall.x += 5;
      cannonBall.dy = 1;
      fallingCannonBalls.push(cannonBall);
    } else if (collides(cannonHitbox, blocks[blockIndex])) {
      if (blocks[blockIndex].type == "destroy") {
        if (modifiers.doors && modifiers.doors[blocks[blockIndex].id]) {

        } else {
          deleteBlock(blocks[blockIndex].x, blocks[blockIndex].y, 0);
          loaded = false;
        }
        cannonBalls.splice(i, 1)
        doParticles(blocks[blockIndex].x + 10, blocks[blockIndex].y + 10, '136, 136, 136', 6, 2, -2, 0.06);
        cannonBall.x += 5;
        cannonBall.dy = 1;
        fallingCannonBalls.push(cannonBall);
      } else if (!airBlocks.includes(platforms[blocks[blockIndex].id])) {
        cannonBalls.splice(i, 1)
        doParticles(cannonBall.x, cannonBall.y + 5, '80, 80, 80', 6, 2, -2, 0.06)
        if (!modifiers.cannons || modifiers.cannons[cannonBall.index].rotation == 0) cannonBall.x += 5;
        if (modifiers.cannons && modifiers.cannons[cannonBall.index].rotation == 1) cannonBall.x -= 3;
        cannonBall.dy = 1;
        fallingCannonBalls.push(cannonBall);
      }
    }
  }
  // // Draw Boss cannon balls
  // for (var i = 0; i < bossBalls.length; i++) {
  //   var cannonBall = bossBalls[i];
  //   var cannonHitbox = { x: cannonBall.x, y: cannonBall.y + 2, width: 15, height: 12 };
  //   // ctx2.strokeRect(cannonBall.x,cannonBall.y+2,12,12)
  //   if (collides(player, cannonHitbox)) {
  //     if (player.y < cannonBall.y) {
  //       player.jump = true;
  //       player.onground = false;
  //       player.y = cannonBall.y - 20
  //       player.dy = -8;
  //     } else {
  //       death();
  //     }
  //     bossBalls.splice(i, 1)
  //     doParticles(cannonBall.x, cannonBall.y + 5, '80, 80, 80', 6, 2, -2, 0.06)
  //   }
    
  //   if (cannonBall.x+14 > canvas.width) {
  //     bossBalls.splice(i, 1)
  //     doParticles(cannonBall.x + 10, cannonBall.y + 10, '136, 136, 136', 6, 2, -2, 0.06);
  //   } else if (cannonBall.x < 0) {
  //     bossBalls.splice(i, 1)
  //     doParticles(cannonBall.x + 10, cannonBall.y + 10, '136, 136, 136', 6, 2, -2, 0.06);
  //   }
  // }
  for (var i = 0; i < fallingCannonBalls.length; i++) {
    var cannonBall = fallingCannonBalls[i];
    var cannonHitbox = { x: cannonBall.x, y: cannonBall.y - cannonBall.dy, width: 15, height: 12 };

    // kill player if it hits them
    if (collides(player, cannonHitbox)) {
      death();
      fallingCannonBalls.splice(i, 1)
      doParticles(cannonBall.x, cannonBall.y - cannonBall.dy, '80, 80, 80', 6, 2, -2, 0.06)
    }

   // if (collides(boss, cannonHitbox)  && singlePlayer && level == 2) {
   //    fallingCannonBalls.splice(i, 1)
   //    doParticles(cannonBall.x, cannonBall.y - cannonBall.dy, '80, 80, 80', 6, 2, -2, 0.06)
   //  }

    // destroy if it hits bottom of screen
    if (cannonBall.y + 14 > canvas.height) {
      fallingCannonBalls.splice(i, 1)
      doParticles(cannonBall.x, cannonBall.y - cannonBall.dy, '80, 80, 80', 6, 2, -2, 0.06)
    }
    if (!fallingCannonBalls[i]) continue;
    var indexOfBall = Math.floor(fallingCannonBalls[i].x / 20, 1) + (Math.floor(fallingCannonBalls[i].y / 20, 1) * 67);
    fallingCannonBalls[i].slow = (platforms[indexOfBall - 1] == '%');
    fallingCannonBalls[i].dy = Math.min(fallingCannonBalls[i].dy, 10)
    // destroy on block
    if (collides(cannonHitbox, blocks[blockIndex])) {
      if (!airBlocks.includes(platforms[blocks[blockIndex].id]) || blocks[blockIndex].type == 'button') {
        if (blocks[blockIndex].type == 'button') {
          toggleButton(blockIndex)
        }
        fallingCannonBalls.splice(i, 1)
        doParticles(cannonBall.x, cannonBall.y - cannonBall.dy, '80, 80, 80', 6, 2, -2, 0.06)
      }
    }
  }
}
var fallingCannonBalls = [];
var cannonBallInterval;


function toggleButton(blockIndex) {
  var color = modifiers.buttons[blocks[blockIndex].id].color;
  // Turn On
  if (!activeButtons[color]) {
    activeButtons[color] = true;
    for (var index in modifiers.doors) {
      if (modifiers.doors[index].color == color) {
        for (var a = 0; a < blocks.length; a++) {
          if (blocks[a].id == index) {
            deleteBlock(blocks[a].x, blocks[a].y, 0);
          }
        }
      }
    }
  } else {
    activeButtons[color] = false;
    for (var index in modifiers.doors) {
      if (modifiers.doors[index].color == color) {
        platforms[index] = '□';
      }
    }
    nowin = true;
    setTimeout(function() {
      nowin = false;
    }, 100)
  }
}