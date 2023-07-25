var canvas5 = $("playerPreview");
var cosmeticsCanvas = canvas5.getContext("2d");

function sortCosmeticsArray() {
  var hats = [];
  var skins = [];
  var clearSkin = ''
  var clearHat = ''

  for (var i = 0; i < cosmetics.length; i++) {
    if (cosmetics[i].type == 'skin') {
      if (cosmetics[i].name.includes('clear')) {
        clearSkin = cosmetics[i]
      }
       else {
        skins.unshift(cosmetics[i])
        // skins.push(cosmetics[i])
      }
    }
    if (cosmetics[i].type == 'hat') {
      if (cosmetics[i].name.includes('clear')) {
        clearHat = cosmetics[i]
      }
      else {
        hats.unshift(cosmetics[i])
        // hats.push(cosmetics[i])
      }
    }
  }
  hats = hats.reverse();
  skins = skins.reverse();

  hats.unshift(clearHat)
  skins.unshift(clearSkin)
  cosmetics = hats.concat(skins)
}
function setPlayerColor(color) {
  playerColor = color;
  setCookie('playerColor', color)
  var arr = $('colors').children;
  for (var i = 0; i < arr.length; i++) {
    arr[i].style.outline = 'none'
    if (arr[i].id == color) {
      arr[i].style.outline = '2px solid black'
    }
  }
}

function openCosmeticsMenu() {
  if (gamePaused) togglePauseGame();
  $('cosmeticsMenu').style = 'visibility: visible;';
  leaveMainMenu();
  $('white').style = 'visibility: hidden;';
  $('gameInstance').style = 'visibility: hidden;'
  $('myVideo').style = 'visibility: visible;'
  $('filter').style = 'visibility: visible;'
  mainMenuOpen = true;
  $('cosmeticSkinInventory').innerHTML = '<h1 class="center">Skins</h1>'
  $('cosmeticHatInventory').innerHTML = '<h1 class="center">Hats</h1>'
  $('colors').innerHTML = ''
  for (var i = 0; i < colors.length; i++) {
    if (playerColor == colors[i]) {
      $('colors').innerHTML += `<div class='skinColor' id='${colors[i]}' style='background: ${colors[i]}; outline: 2px solid black;' onclick='setPlayerColor("${colors[i]}");'></div>`
    } else {
      $('colors').innerHTML += `<div class='skinColor' id='${colors[i]}' style='background: ${colors[i]}' onclick='setPlayerColor("${colors[i]}");'></div>`
    }
  }

  for (var i = 0; i < cosmetics.length; i++) {
    if (cosmetics[i].type == 'skin') {
      $('cosmeticSkinInventory').innerHTML += `<img class='cosmeticItem ${cosmetics[i].rarity}Rarity' id='${cosmetics[i].name}' src='${cosmetics[i].image}'/>`
    }
    if (cosmetics[i].type == 'hat') {
      $('cosmeticHatInventory').innerHTML += `<img class='cosmeticItem ${cosmetics[i].rarity}Rarity' id='${cosmetics[i].name}' src='${cosmetics[i].image}'/>`
    }
  }
  var arr = document.getElementsByClassName('cosmeticItem');
  for (var i = 0; i < arr.length; i++) {
    arr[i].onclick = function(e) {
      equipCosmetic(e.target.id)
    }
  }
  $(playerCosmetics[getCookie('uuid')].skin).style = 'outline: 2px solid black;'
  $(playerCosmetics[getCookie('uuid')].hat).style = 'outline: 2px solid black;'
}
var cosmeticEquippedHatUrl = ''
var cosmeticEquippedSkinUrl = ''

setInterval(function() {
  canvas5.width = 400
  canvas5.height = 300
  if ($('cosmeticsMenu').style.visibility == 'visible') {
    cosmeticsCanvas.clearRect(0, 0, canvas5.width, canvas5.height)
    cosmeticsCanvas.fillStyle = playerColor;
    cosmeticsCanvas.fillRect(0, 0, 300, 300)

    cosmeticsCanvas.fillStyle = '#333';
    cosmeticsCanvas.fillRect(300, 50, 100, 60)
    var hat = $('playerHatImg')
    var skin = $('playerSkinImg')

    for (var i = 0; i < cosmetics.length; i++) {
      var uuid = getCookie('uuid');
      if (playerCosmetics[uuid]) {
        if (cosmetics[i].name == playerCosmetics[uuid].hat) {
          hat.src = cosmetics[i].image
        }
        if (cosmetics[i].name == playerCosmetics[uuid].skin) {
          skin.src = cosmetics[i].image
        }
      }
    }
  }
}, 100)


$('cosmetics').onmouseover = function() {
  $('description').innerHTML = `Collect cosmetics and customize your character!`
}
$('cosmetics').onclick = function() {
  openCosmeticsMenu();
}