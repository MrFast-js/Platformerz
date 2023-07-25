// var enemies = [];
// setInterval(function() {
//   if (modifiers.enemies && enemies.length != getLengthOfObjectList(modifiers.enemies)) {
//     for (var enemy in modifiers.enemies) {
//       var i = parseFloat(enemy);
//       var yPos = Math.floor(i / 67, 1) * gridBlockHeight;
//       var xPos = (i % 67) * gridBlockWidth;
//       var enemyVariable = { type: modifiers.enemies[enemy].type, x: xPos, y: yPos, dx: 2, dy: 0, width: 20, height: 20, id: i };
//       if (!enemies.includes(enemyVariable)) enemies.push(enemyVariable)
//     }
//   }
// }, 100)
// var enemiesDupe = "";
// function resetEnemies() {
//   enemies = JSON.parse(enemiesDupe);
//   return;
// }

// // Set present values that are required later
// for (var i = 0; i < enemies.length; i++) {
//   enemies[i].totalHealth = enemies[i].health
//   enemies[i].onground = false
// }
// function doEnemy() {
//   if (stopwatchInterval == null) gameStarted = false;
//   if (enemiesDupe.length == 0) {
//     enemiesDupe = JSON.stringify(enemies)
//   }

//   ctx7.clearRect(0, 0, canvas.width, canvas.height)
//   for (var i = 0; i < enemies.length; i++) {
//     if (enemies[i].dead) continue;
//     doEnemyBlockCollisions(enemies[i])
//     if (enemies[i].type == "Fly") {
//       ctx7.fillStyle = "#ba2385"
//     } else if (enemies[i].type == 'Basic') {
//       ctx7.fillStyle = 'red'
//     }
//     // doParticles2(enemies[i].x+10,enemies[i].y+10,'186, 35, 133',4, -1, 1, 2, -0.1, 0.05)
//     ctx7.fillRect(enemies[i].x, enemies[i].y, enemies[i].height, enemies[i].width);

//     ctx7.fillStyle = "rgba(60,60,60,0.5)"
//     ctx7.fillRect(enemies[i].x, enemies[i].y, enemies[i].width * (enemies[i].health / enemies[i].totalHealth), enemies[i].height)
//   }
// }
// function doEnemyBlockCollisions(enemy) {
//   if (!gameStarted || gamePaused) return;
//   if (collides(enemy, player)) {
//     death()
//   }
//   if (!enemy.onground && enemy.type != "Fly") {
//     enemy.dy += gravity;
//   }
//   if (enemy.type == 'Fly') {

//     if (player.x > enemy.x) {
//       enemy.dx = 1
//     } else if (player.x < enemy.x) {
//       enemy.dx = -1
//     } else {
//       enemy.dx = 0
//     }
//     if (player.y > enemy.y) {
//       enemy.dy = 1
//     } else if (player.y < enemy.y) {
//       enemy.dy = -1
//     } else {
//       enemy.dy = 0
//     }

//   }
//   if (Math.floor(enemy.dy) > 0 && enemy.onground) {
//     enemy.dy = 0;
//   }

//   if ((enemy.x + enemy.dx + enemy.width) > canvas.width) {
//     // Right Collision
//     enemy.dx = -enemy.dx;
//   } else if ((enemy.x + enemy.dx) < 0) {
//     // Left Collision
//     enemy.dx = -enemy.dx;
//   } else {
//     // No Collision
//     enemy.x += enemy.dx;
//   }
//   if ((enemy.y + enemy.dy + enemy.height) > canvas.height) {
//     // Bottom Collision
//     enemy.y = canvas.height - enemy.height;
//     enemy.onground = true;
//   } else if ((enemy.y + enemy.dy) < 0) {
//     // Top Collision
//     enemy.dy = 0;
//     enemy.y = 0;
//   } else {
//     // No Collision
//     enemy.y += enemy.dy;
//     enemy.onground = false;
//   }

//   var touchingTopBlock = false;
//   for (var i = 0; i < blocks.length; i++) {
//     if (!blocks[i]) continue;
//     var inrange = Math.sqrt(Math.abs(enemy.x - blocks[i].x) * 2 + Math.abs(enemy.y - blocks[i].y) * 2) < 50; // 5 blocks away
//     if (!inrange) {
//       continue;
//     }

//     if (collides(enemy, blocks[i])) {
//       var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) - 67; // Index of block above enemy
//       var blockAbove = true;

//       if (airBlocks.includes(platforms[num])) blockAbove = false;


//       if (blocks[i].type.includes('slope')) {
//         var x = (blocks[i].id % 67) * gridBlockWidth;
//         var y = Math.floor(blocks[i].id / 67, 1) * gridBlockHeight;

//         // /|
//         if (enemy.x + enemy.width >= x && enemy.dy >= 0 && blocks[i].type == "left_slope") {
//           if (enemy.x >= blocks[i].x + 16.5 && Math.abs(enemy.y - blocks[i].y) < 19.7) {
//             enemy.x = x + blocks[i].width;
//           } else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 68]))) && enemy.y >= blocks[i].y) {
//             enemy.x = x - blocks[i].width;
//           } else {
//             var distIntoBlock = Math.abs((enemy.x + enemy.width) - x);
//             if (Math.floor(Math.abs(blocks[i].y - enemy.y)) <= distIntoBlock) {
//               enemy.y = Math.max(y - Math.abs((enemy.x + enemy.width) - x), y - 20);
//               enemy.onground = true;
//               touchingTopBlock = true;
//             }
//           }
//         }

//         if (enemy.x >= x - 21 && enemy.x - x < -15 && blocks[i].type == "right_slope" && enemy.y - y > 0) {
//           console.log(enemy.y - y)
//           enemy.x = blocks[i].x - blocks[i].width - 1
//         }

//         // |\
//         if (enemy.x < x + blocks[i].width && blocks[i].type == "right_slope") {
//           if (enemy.x <= blocks[i].x - 16.5 && Math.abs(enemy.y - blocks[i].y) < 19.7) {
//             console.log()
//             if (enemy.type == 'Fly') {
//               enemy.x = x - blocks[i].width;
//             }
//             if (enemy.type == 'Basic') {
//               enemy.dx = -enemy.dx;
//             }
//             continue;
//           }
//           else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 66]))) && enemy.y >= blocks[i].y) {
//             console.log("right side col wit block above")
//             // Normal
//             if (enemy.type == 'Fly') {
//               enemy.x = x + blocks[i].width;
//             }
//             if (enemy.type == 'Basic') {
//               enemy.dx = -enemy.dx;
//             }
//             continue;
//           } else {
//             var distIntoBlock = Math.max(Math.abs(x + blocks[i].width - enemy.x), 0);
//             if (Math.floor(Math.abs(blocks[i].y - enemy.y)) <= distIntoBlock && (blocks[i].y - player.y + 0.3) >= 0) {
//               enemy.y = y + (Math.abs(Math.min(distIntoBlock - 20, 0))) - 20;
//               enemy.onground = true;
//               touchingTopBlock = true;
//             }
//           }
//         }
//       }

//       // Custom Collisions

//       // No collision blocks
//       if (blocks[i].type == "spike") {
//         enemy.dead = true;
//       }
//       if (blocks[i].type == "ghost" || blocks[i].type == "minispike" || blocks[i].type == "spike") {
//         continue;
//       }

//       // Jump block
//       if (blocks[i].type == 'water') {
//         touchingTopBlock = false;
//         enemy.onground = true;
//         enemy.y += 0.5;
//         continue;
//       }

//       var touchingButton = false;
//       ctx2.fillStyle = 'red';
//       ctx2.globalAlpha = 0.4;

//       // Top of block collision
//       if (enemy.y - enemy.dy < blocks[i].y && blocks[i].y - (enemy.y - enemy.dy) > 10 && !blockAbove && enemy.dy >= 0) {
//         if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y, 20, 5);
//         if (blocks[i].type.includes('slope')) continue;
//         touchingTopBlock = true;

//         if (blocks[i].type == 'button' && !buttonCooldown && !onButton) {
//           buttonCooldown = true;
//           setTimeout(function() {
//             buttonCooldown = false
//           }, 100)
//           toggleButton(i)
//         }
//         if (blocks[i].type == 'button') touchingButton = true;

//         // Crumble after top collision
//         if (blocks[i].type == 'crumble' && !crumblingBlocks[blocks[i].id] && gameStarted) {
//           crumblingBlocks[blocks[i].id] = {
//             startY: blocks[i].y,
//             currentY: blocks[i].y
//           }
//           deleteBlock(blocks[i].x, blocks[i].y, 1000);
//           doParticles(blocks[i].x + 10, blocks[i].y, '191, 145, 19', 2, 2, -2, 0.06)
//         }

//         // Bounce Block
//         if (blocks[i].type == 'bounce') {
//           if (Math.floor(Math.abs(enemy.dy) - 0.3, 1) != 0) {
//             enemy.dy = Math.min(17.3, enemy.dy)
//             doParticles(blocks[i].x + 10, blocks[i].y, '255, 184, 92', 4, 2, -2, 0.06);
//             enemy.dy *= -0.79;
//           }
//         }

//         // Set enemy y to ontop of the platform
//         enemy.y = (blocks[i].y - enemy.height);
//         enemy.onground = true;
//       }

//       // Bottom of block collision
//       else if (((enemy.y >= blocks[i].y + 10) || (blocks[i].type == 'button')) && enemy.dy <= 0 && enemy.y <= blocks[i].y + blocks[i].height) {
//         if (blocks[i].type == 'brick') continue;
//         if (blocks[i].type == 'bump' && !bumpBlocks[blocks[i].id]) {
//           bumpBlocks[blocks[i].id] = {
//             startY: blocks[i].y,
//             currentY: blocks[i].y
//           }
//           deleteBlock(blocks[i].x, blocks[i].y, 0);
//           doParticles(blocks[i].x + 10, blocks[i].y, '86, 92, 219', 2, 2, -2, 0.06)
//         }

//         var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) + 67;
//         var blockBelow = true;

//         // Checks if that block should have bottom collision
//         if (airBlocks.includes(platforms[num])) blockBelow = false;

//         if (!blockBelow) {
//           if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y + 15, 20, 5)
//           enemy.y = blocks[i].y + blocks[i].height;
//           enemy.dy = 0;
//         }
//       }

//       // Left side of block collision
//       else if (enemy.x <= blocks[i].x) {
//         if (blocks[i].type.includes('slope')) continue;

//         if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y, 5, 20)
//         if (blocks[i].type == 'stick') enemy.onground = true;

//         if (blocks[i].type == 'destroy') {
//           if (!modifiers.doors[blocks[i].id]) {
//             deleteBlock(blocks[i].x, blocks[i].y, 0);
//             doParticles(blocks[i].x + 10, blocks[i].y + 10, '136, 136, 136', 6, 2, -2, 0.06);
//             blocks.splice(i, 1);
//             loaded = false;
//           };
//         }
//         if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
//         if (blocks[i].type == 'left_slope') continue;
//         // Normal
//         if (enemy.type == 'Fly') {
//           enemy.dx = 0;
//           enemy.x = blocks[i].x - enemy.width;
//         }
//         if (enemy.type == 'Basic') {
//           enemy.dx = -2;
//         }
//       }

//       // Right side of block collision
//       else if (enemy.x > blocks[i].x) {
//         if (blocks[i].type.includes('slope')) continue;

//         if (debug) ctx2.fillRect(blocks[i].x + 15, blocks[i].y, 5, 20)
//         if (blocks[i].type == 'stick') enemy.onground = true;

//         if (blocks[i].type == 'destroy') {
//           if (!modifiers.doors[blocks[i].id]) {
//             deleteBlock(blocks[i].x, blocks[i].y, 0);
//             doParticles(blocks[i].x + 10, blocks[i].y + 10, '136, 136, 136', 6, 2, -2, 0.06);
//             blocks.splice(i, 1);
//             loaded = false;  
//           };
//         }
//         if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
//         if (blocks[i].type == 'right_slope') continue;
//         // Normal
//         if (enemy.type == 'Fly') {
//           enemy.dx = 0;
//           enemy.x = blocks[i].x + enemy.width;
//         }
//         if (enemy.type == 'Basic') {
//           enemy.dx = 2;
//         }

//       }
//       ctx2.globalAlpha = 1;
//     }
//   }
// }