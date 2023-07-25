// var sheildActive = true;

// var boss = {
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

// function resetBoss() {
//   boss.x = -400
//   boss.y = -400;
// }
// setInterval(function() {
//   doEnemy()
// }, 10)
// var bossBalls = [];
// var chargingUpBalls = false;
// setInterval(function() {
//   if (!singlePlayer || level != 2 || gamePaused || document.hidden) return;
//   chargingUpBalls = true;
//   boss.dx = 0;

//   var interval = setInterval(function() {
//     boss.dx = -1;
//     setTimeout(function() {
//       boss.dx = 1;
//     }, 50)
//   }, 100)
//   setTimeout(function() {
//     clearInterval(interval)
//   }, 1800)
//   setTimeout(function() {
//     if (!singlePlayer || level != 2 || gamePaused) return;
//     cannonBallWave();
//     setTimeout(function() {
//       cannonBallWave();
//       setTimeout(function() {
//         cannonBallWave();
//         setTimeout(function() {
//           chargingUpBalls = false;
//         }, 300)
//       }, 300)
//     }, 300)
//   }, 2000)
// }, 10000)

// function cannonBallWave() {
//   for (var i = 0; i < 10; i++) {
//     if (Math.random() < 0.33) {
//       bossBalls.push({ direction: -1, x: boss.x, y: boss.y + i * 20 });
//     }
//     if (Math.random() < 0.33) {
//       bossBalls.push({ direction: 1, x: boss.x + boss.size, y: boss.y + i * 20 });
//     }
//   }
// }
// var hitTimeout = 0;
// var bossSkin = 'assets/boss/bossSkin.png'
// var fireworkCount = 0;
// var int = null;
// function drawBoss() {
  
// }
//   if (!admin) {
//     resetBoss()
//     return;
//   }
//   if (!singlePlayer || level != 2 || gamePaused) return;
//   if(boss.health==0) {
//     if(int == null) {
//       int = setInterval(function() {
//         fireworkCount++;
//         fireworks();
//         if (fireworkCount == 4) {
//           clearInterval(int)
//           fireworkCount = 0;
//         }
//       }, 2000)
//     }
//     return;
//   }
//   // Draw Shield
//   if (boss.sheildStrength >= 7) ctx6.fillStyle = `rgba(0,220,220,0.5)`
//   else if (boss.sheildStrength >= 4) ctx6.fillStyle = `rgba(0,220,220,0.4)`
//   else if (boss.sheildStrength >= 1) ctx6.fillStyle = `rgba(0,220,220,0.3)`
//   else if (boss.sheildStrength >= 0) ctx6.fillStyle = `rgba(0,220,220,0)`
//   var shieldWidth = 10;
//   ctx6.beginPath();
//   ctx6.roundRect(boss.x - shieldWidth, boss.y - shieldWidth, boss.size + (shieldWidth * 2), boss.size + (shieldWidth * 2), [20])
//   ctx6.fill();
//   ctx6.clearRect(boss.x, boss.y, boss.size, boss.size)


//   ctx6.fillStyle = 'rgb(85,85,85)';
//   ctx6.fillRect(boss.x, boss.y, boss.size, boss.size)
//   var skin = new Image();

//   skin.src = bossSkin;
//   ctx6.imageSmoothingEnabled = false;
//   drawImage2(skin, boss.x, boss.y, 200, 200, 0, Math.floor(boss.dx) <= 0)

//   var skin = new Image();

//   // skin.src=`assets/boss/shield/shield_${skinStage}.png`
//   // drawImage2(skin, boss.x-60, boss.y-60, 320, 320, 0, Math.floor(boss.dx)<=0)

//   if (boss.hit) {
//     hitTimeout++;
//     if (hitTimeout > 20) {
//       boss.hit = false;
//       hitTimeout = 0;
//       if (boss.sheildStrength > 0) boss.sheildStrength--;
//     } else {
//       ctx6.fillStyle = 'red'
//     }
//   }
//   // Draw Boss
//   // Draw Boss Healthbar background
//   ctx6.fillStyle = 'black'
//   ctx6.fillRect(boss.x + 25, boss.y - 40, 150, 30)

//   // Fill with green based on health
//   ctx6.fillStyle = getHealthbarColor(1 - boss.health / 5)
//   ctx6.fillRect((boss.x + 27.5), boss.y - 37.5, 145 * (boss.health / 5), 25)

//   // Draw sheild
//   ctx6.fillStyle = "rgba(0,220,220,0.7)"
//   ctx6.fillRect((boss.x + 27.5), boss.y - 37.5, 145 * (boss.sheildStrength / 10), 25)

//   if (debug) {
//     ctx6.fillStyle = 'black'
//     ctx6.fillText(`❤${boss.health}/5   🛡${boss.sheildStrength}/10`, (boss.x + 30), boss.y - 45)
//   }

//   if (!boss.onground) {
//     boss.dy += gravity;
//   }

//   if (Math.floor(boss.dy) > 0 && !boss.inair) {
//     boss.dy = 0;
//   }

//   if ((boss.x + boss.dx + boss.width) > canvas.width) {
//     // Right Collision
//     boss.x = canvas.width - boss.width;
//   } else if ((boss.x + boss.dx) < 0) {
//     // Left Collision
//     boss.x = 0;
//   } else {
//     // No Collision
//     boss.x += boss.dx;
//   }
//   if ((boss.y + boss.dy + boss.height) > canvas.height) {
//     // Bottom Collision
//     boss.y = canvas.height - boss.height;
//     boss.onground = true;
//     friction = 0.5;
//     iceDxAdjusted = false;
//   } else if ((boss.y + boss.dy) < 0) {
//     // Top Collision
//     boss.dy = 0;
//     boss.y = 0;
//   } else {
//     // No Collision
//     boss.y += boss.dy;
//     boss.onground = false;
//   }
//   boss.dx *= friction;
//   doBossBlockCollisions()
// }
// var int;
// var timeout2;
// var bossDoingBounce = false;
// function bossBounce() {
  
//   bossDoingBounce = true;
//   boss.dy = -12;
//   clearInterval(int);
//   clearInterval(timeout2);
//   timeout2 = setTimeout(function() {
//     int = setInterval(function() {
//       if (boss.onground) {
//         if (!performanceMode) {
//           $('canvases').style = "animation: shake 0.75s; animation-iteration-count: infinite;"
//           setTimeout(function() {
//             $('canvases').style = ""
//           }, 250)
//         }
//         doParticles3(boss.x + boss.size / 2, boss.y + boss.size, '125,125,125', 10, -5, 5, 0.1, -0.1, 0.02)
//         clearInterval(int)
//         int = null;
//         bossDoingBounce = false;
//       }
//     }, 100)
//   }, 100)
// }
// // simple pathfinder
// setInterval(function() {
//   if(admin && localStorage.adminPass != btoa('admin')) {
//     console.log("%cGET OUT OF THE CONSOLE!",'font-size:40px;color:red;')
//     setTimeout(function() {
//       location.reload()
//     },500)
//   }
//   admin = localStorage.adminPass == btoa('admin')
//   if(flight && !admin) {
//     flight = false;
//     console.log("%cGET OUT OF THE CONSOLE!",'font-size:40px;color:red;')
//     setTimeout(function() {
//       location.reload()
//     },500)
//   }
  
//   if (document.hidden || gamePaused || chargingUpBalls) return;
//   if (boss.x + 100 < player.x) boss.dx = .5;
//   else if (boss.x + 100 > player.x) boss.dx = -0.5;

//   var dist = (boss.x + boss.size / 2) - player.x;

//   if (boss.onground && Math.floor(dist) == 0 && int == null) {
//     bossBounce()
//   }
// }, 10)
// var last = 0;
// function doBossBlockCollisions() {
//   var touchingTopBlock = false;
//   if (collides(boss, player)) {
//     // Bounce on head idk seemed cool
//     // if(player.y<boss.y) {
//     //   player.jump = true;
//     //   player.onground = false;
//     //   player.y = boss.y - 20
//     //   player.dy = -8;
//     // } else {
//     death();
//     // }
//   }
//   for (var i = 0; i < blocks.length; i++) {
//     if (!blocks[i]) continue;

//     if (collides(boss, blocks[i])) {
//       var blockAbove = true;

//       // No collision blocks
//       if (blocks[i].type == "ghost" || blocks[i].type == "brick") {
//         continue;
//       }

//       ctx6.fillStyle = 'red';
//       ctx6.globalAlpha = 0.4;

//       // Top of block collision
//       if (boss.y - boss.dy < blocks[i].y && boss.dy >= 0 && Math.abs(boss.y - blocks[i].y) > 120) {
//         if (debug) ctx6.fillRect(blocks[i].x, blocks[i].y, 20, 5);
//         // Set boss y to ontop of the platform
//         boss.y = (blocks[i].y - boss.height);
//         boss.onground = true;
//         if (bossDoingBounce && blocks[i].type == 'spike' && boss.sheildStrength == 0) {
//           boss.health--;
//           bossSkin = 'assets/boss/bossHitSkin.png'
//           boss.sheildStrength = 10;
//           setTimeout(function() {
//             bossSkin = 'assets/boss/bossSkin.png'
//           }, 300)
//         }
//       }

//       // Bottom of block collision
//       else if ((boss.y >= blocks[i].y + 10) && boss.dy <= 0 && boss.y <= blocks[i].y + blocks[i].height) {
//         var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) + 67;
//         var blockBelow = true;

//         // Checks if that block should have bottom collision
//         if (airBlocks.includes(platforms[num])) blockBelow = false;

//         if (!blockBelow) {
//           if (debug) ctx6.fillRect(blocks[i].x, blocks[i].y + 15, 20, 5)
//           boss.y = blocks[i].y + blocks[i].height;
//           boss.dy = 0;
//         }
//       }

//       // Left side of block collision
//       else if (boss.x <= blocks[i].x) {
//         if (debug) ctx6.fillRect(blocks[i].x, blocks[i].y, 5, 20)
//         boss.dx = 0;
//         boss.x = blocks[i].x - boss.width;
//       }

//       // Right side of block collision
//       else if (boss.x > blocks[i].x) {
//         if (debug) ctx6.fillRect(blocks[i].x + 15, blocks[i].y, 5, 20)
//         boss.dx = 0;
//         boss.x = blocks[i].x + blocks[i].width;
//       }
//       ctx6.globalAlpha = 1;
//     }
//   }
//   boss.inair = !touchingTopBlock;
// }

// function getHealthbarColor(percent) {
//   //value from 0 to 1
//   var hue = ((1 - percent) * 120).toString(10);
//   return ["hsl(", hue, ",100%,50%)"].join("");
// }