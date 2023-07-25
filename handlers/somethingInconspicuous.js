// why not usethe chat replit spent so much time and money developing it

if(localStorage.somethingInconspicuous = "inconspicuously") {
	var minions = []
	
}
function doMinion() {
	for(var i=0;i<minions.length;i++) {
		var minion = minions[i]
		ctx8.fillRect(minion.x, minion.y, minion.width, minion.height)
	}
}
function keyM() {
	return;
}

function doMinionCollision(minion) {
    if (Math.floor(minion.dy) > 0 && minion.onground) {
      minion.dy = 0;
    }
  
    if ((minion.x + minion.dx + minion.width) > canvas.width) {
      // Right Collision
      minion.dx = -minion.dx;
    } else if ((minion.x + minion.dx) < 0) {
      // Left Collision
      minion.dx = -minion.dx;
    } else {
      // No Collision
      minion.x += minion.dx;
    }
    if ((minion.y + minion.dy + minion.height) > canvas.height) {
      // Bottom Collision
      minion.y = canvas.height - minion.height;
      minion.onground = true;
    } else if ((minion.y + minion.dy) < 0) {
      // Top Collision
      minion.dy = 0;
      minion.y = 0;
    } else {
      // No Collision
      minion.y += minion.dy;
      minion.onground = false;
    }
  
  var touchingTopBlock = false;
  for (var i = 0; i < blocks.length; i++) {
    if (!blocks[i]) continue;
    var inrange = Math.sqrt(Math.abs(minion.x - blocks[i].x) * 2 + Math.abs(minion.y - blocks[i].y) * 2) < 25; // 5 blocks away
    if (!inrange) {
      continue;
    }
    
    if (collides(minion, blocks[i])) {
      var num = Math.floor(blocks[i].x / 20, 1) + (Math.floor(blocks[i].y / 20, 1) * 67) - 67; // Index of block above minion
      var blockAbove = true;

      if (airBlocks.includes(platforms[num])) blockAbove = false;


      if (blocks[i].type.includes('slope')) {
        var x = (blocks[i].id % 67) * gridBlockWidth;
        var y = Math.floor(blocks[i].id / 67, 1) * gridBlockHeight;

        // /|
        if (minion.x + minion.width >= x && minion.dy >= 0 && blocks[i].type == "left_slope") {
          if (minion.x >= blocks[i].x + 16.5 && Math.abs(minion.y - blocks[i].y) < 19.7) {
            minion.x = x + blocks[i].width;
          } else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 68]))) && minion.y >= blocks[i].y) {
            minion.x = x - blocks[i].width;
          } else {
            var distIntoBlock = Math.abs((minion.x + minion.width) - x);
            if (Math.floor(Math.abs(blocks[i].y - minion.y)) <= distIntoBlock) {
              minion.y = Math.max(y - Math.abs((minion.x + minion.width) - x), y - 20);
              minion.onground = true;
              touchingTopBlock = true;
            }
          }
        }

        if (minion.x >= x - 21 && minion.x - x < -15 && blocks[i].type == "right_slope" && minion.y - y > 0) {
          console.log(minion.y - y)
          minion.x = blocks[i].x - blocks[i].width - 1
        }

        // |\
        if (minion.x < x + blocks[i].width && blocks[i].type == "right_slope") {
          if (minion.x <= blocks[i].x - 16.5 && Math.abs(minion.y - blocks[i].y) < 19.7) {
			      minion.x = x - blocks[i].width;
            continue;
          }
          else if ((blockAbove || (!airBlocks.includes(platforms[blocks[i].id - 66]))) && minion.y >= blocks[i].y) {
            console.log("right side col wit block above")
						        // Normal

			      minion.x = x + blocks[i].width;

            continue;
          } else {
            var distIntoBlock = Math.max(Math.abs(x + blocks[i].width - minion.x), 0);
            if (Math.floor(Math.abs(blocks[i].y - minion.y)) <= distIntoBlock && (blocks[i].y-player.y+0.3)>=0) {
              minion.y = y + (Math.abs(Math.min(distIntoBlock - 20, 0))) - 20;
              minion.onground = true;
              touchingTopBlock = true;
            }
          }
        }
      }

      // Custom Collisions

      // No collision blocks
      if (blocks[i].type == "ghost" || blocks[i].type == "minispike" || blocks[i].type == "spike") {
        continue;
      }

      // Jump block
      if (blocks[i].type == 'jump') {
        touchingTopBlock = false;
        minion.onground = true;
        minion.y += 0.5;
        continue;
      }

      var touchingButton = false;
      ctx2.fillStyle = 'red';
      ctx2.globalAlpha = 0.4;

      // Top of block collision
      if (minion.y - minion.dy < blocks[i].y && blocks[i].y - (minion.y - minion.dy) > 10 && !blockAbove && minion.dy >= 0) {
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

        // Bounce Block
        if (blocks[i].type == 'bounce') {
          if (Math.floor(Math.abs(minion.dy) - 0.3, 1) != 0) {
            minion.dy = Math.min(17.3, minion.dy)
            doParticles(blocks[i].x + 10, blocks[i].y, '255, 184, 92', 4, 2, -2, 0.06);
            minion.dy *= -0.79;
          }
        }

        // Set minion y to ontop of the platform
        minion.y = (blocks[i].y - minion.height);
        minion.onground = true;
      }

      // Bottom of block collision
      else if (((minion.y >= blocks[i].y + 10) || (blocks[i].type == 'button')) && minion.dy <= 0 && minion.y <= blocks[i].y + blocks[i].height) {
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
          minion.y = blocks[i].y + blocks[i].height;
          minion.dy = 0;
        }
      }

      // Left side of block collision
      else if (minion.x <= blocks[i].x) {
        if (blocks[i].type.includes('slope')) continue;

        if (debug) ctx2.fillRect(blocks[i].x, blocks[i].y, 5, 20)
        if (blocks[i].type == 'stick') {
          minion.onground = true;
        }
        if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
        if (blocks[i].type == 'left_slope') continue;
        // Normal

				minion.dx = 0;
				minion.x = blocks[i].x - minion.width;	
      }

      // Right side of block collision
      else if (minion.x > blocks[i].x) {
        if (blocks[i].type.includes('slope')) continue;

        if (debug) ctx2.fillRect(blocks[i].x + 15, blocks[i].y, 5, 20)
        if (blocks[i].type == 'stick') {
          minion.onground = true;
        }
        if (blocks[i].type == 'brick' || blocks[i].type == 'button') continue;
        if (blocks[i].type == 'right_slope') continue;
        // Normal

	      minion.dx = 0;
	      minion.x = blocks[i].x + minion.width;	
      }
      ctx2.globalAlpha = 1;
    }
  }
}