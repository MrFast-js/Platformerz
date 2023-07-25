
function drawCosmetic(player, uuid) {
  if (cosmetics.length > 3) {
    var hat = new Image()
    var skin = new Image()

    for (var i = 0; i < cosmetics.length; i++) {
      if (playerCosmetics[uuid]) {
        if (cosmetics[i].name == playerCosmetics[uuid].hat) {
          hat.src = cosmetics[i].image
        }
        if (cosmetics[i].name == playerCosmetics[uuid].skin) {
          skin.src = cosmetics[i].image
        }
      }
    }
    // skin drawn 1st -- below
    drawImage(skin, player.x - 2, player.y - 12, 24, 32, 0, player.facingLeft)
    // hat drawn 2nd -- ontop
    drawImage(hat, player.x - 2, player.y - 12, 24, 32, 0, player.facingLeft)
  }
}

function drawImage(img, x, y, width, height, deg, flip, flop, center) {
  if(performanceMode) return;
  ctx2.save();

  if (typeof width === "undefined") width = img.width;
  if (typeof height === "undefined") height = img.height;
  if (typeof center === "undefined") center = false;

  // Set rotation point to center of image, instead of top/left
  if (center) {
    x -= width / 2;
    y -= height / 2;
  }

  // Set the origin to the center of the image
  ctx2.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - deg * Math.PI / 180;
  ctx2.rotate(rad);

  // Flip/flop the canvas
  if (flip) flipScale = -1; else flipScale = 1;
  if (flop) flopScale = -1; else flopScale = 1;
  ctx2.scale(flipScale, flopScale);

  // Draw the image    
  ctx2.drawImage(img, -width / 2, -height / 2, width, height);

  ctx2.restore();
}
function drawImage3(img, x, y, width, height, deg, flip, flop, center) {
  if(performanceMode) return;
  ctx.fillStyle = backgroundColor
  ctx.fillRect(x,y,width,height)
  ctx.save();

  if (typeof width === "undefined") width = img.width;
  if (typeof height === "undefined") height = img.height;
  if (typeof center === "undefined") center = false;

  // Set rotation point to center of image, instead of top/left
  if (center) {
    x -= width / 2;
    y -= height / 2;
  }

  // Set the origin to the center of the image
  ctx.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - deg * Math.PI / 180;
  ctx.rotate(rad);

  // Flip/flop the canvas
  if (flip) flipScale = -1; else flipScale = 1;
  if (flop) flopScale = -1; else flopScale = 1;
  ctx.scale(flipScale, flopScale);

  // Draw the image    
  ctx.drawImage(img, -width / 2, -height / 2, width, height);

  ctx.restore();
}
function drawImage2(img, x, y, width, height, deg, flip, flop, center) {
  if(performanceMode) return;
  ctx6.save();
  // Set rotation point to center of image, instead of top/left
  if (center) {
    x -= width / 2;
    y -= height / 2;
  }

  // Set the origin to the center of the image
  ctx6.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - deg * Math.PI / 180;
  ctx6.rotate(rad);

  // Flip/flop the canvas
  if (flip) flipScale = -1; else flipScale = 1;
  if (flop) flopScale = -1; else flopScale = 1;
  ctx6.scale(flipScale, flopScale);

  // Draw the image   
  ctx6.drawImage(img, -width / 2, -height / 2, width, height);

  ctx6.restore();
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function equipCosmetic(cosmeticName) {
  var type = ''
  for (var i = 0; i < cosmetics.length; i++) {
    if (cosmetics[i].name == cosmeticName) {
      type = cosmetics[i].type;
    }
  }
  var arr = $('cosmetic' + capitalizeFirstLetter(type) + 'Inventory').children;
  for (var i = 0; i < arr.length; i++) {
    arr[i].style = 'outline: none'
  }
  $(cosmeticName).style = 'outline: 2px solid black;'
  cosmeticSocket.emit('equipCosmetic', getCookie('uuid'), cosmeticName, type)
  setTimeout(function() {
    cosmeticSocket.emit('getCosmetics')
  }, 500)
}

function equipCosmeticForName(cosmeticName, name) {
  var type = ''
  var uuid = '';
  for (var playerId in names) {
    if (name == names[playerId]) {
      uuid = playerId;
      console.log("FOUND UUID")
    }
  }
  for (var i = 0; i < cosmetics.length; i++) {
    if (cosmetics[i].name.toLowerCase() == cosmeticName.toLowerCase()) {
      type = cosmetics[i].type;
      console.log("FOUND TYPE " + cosmetics[i].name)
    }
  }
  console.log("Equipped " + cosmeticName + " for " + name + " as their " + type)
  cosmeticSocket.emit('equipCosmetic', uuid, cosmeticName, type)
  setTimeout(function() {
    cosmeticSocket.emit('getCosmetics')
  }, 500)
}