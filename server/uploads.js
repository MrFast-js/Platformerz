var uploadMenuOpen = false;
var browseMenuOpen = false;

$('uploadMapButton').onclick = function() {
  $('postLevel').innerHTML = 'Post Level';
  uploadMenuOpen = !uploadMenuOpen;
  browseMenuOpen = false;
  closeEditorMenu();
  $('myVideo').style = 'visibility: hidden;'
  $('filter').style = 'visibility: hidden;'
  $('white').style = 'visibility: visible;';
}

$('deleteLevel').onclick = function() {
  if(confirm(`Are you sure you want to delete '${oldMapName}'\n\nWarning, this action cannot be undone.`)) {
    var admin = localStorage.adminPass && atob(localStorage.adminPass) && atob(localStorage.adminPass) == 'admin';
    mapSocket.emit('deleteLevel',oldMapName,getCookie('uuid'),admin);
    uploadMenuOpen = false;
    browseMenuOpen = true;
  }
}

setInterval(function() {
  if(uploadMenuOpen) {
    $('uploadMenu').style = 'visibility: visible';
    if($('postLevel').innerHTML != 'Save Level') {
      $('rawMapData').style = 'visibility: visible;';
      $('deleteLevel').style = 'visibility:hidden;';
    }
    else {
      $('deleteLevel').style = 'visibility: visible;';
    }
  } else {
    if($('postLevel').innerHTML != 'Save Level')
      $('rawMapData').style = 'visibility: hidden;';
    $('mapName').value = '';
    $('rawMap').value = '';
    $('uploadMenu').style = 'visibility: hidden';
    $('deleteLevel').style = 'visibility: hidden;';
  }

  if(browseMenuOpen) {
    $('browseMenu').style = 'visibility: visible';
  } else {
    $('browseMenu').style = 'visibility: hidden';
		$('mapInfoPanel').style = 'visibility:hidden';
  }
},100);

for(var i=0;i<document.getElementsByClassName('toggle').length;i++){
  document.getElementsByClassName('toggle')[i].onclick = function(e) {
    if(e.target.innerHTML == "Yes")
      e.target.innerHTML = "No";
    else e.target.innerHTML = "Yes";
  }
}

/*  
  Figures out which star was clicked on.
  it does this by seperating the photo into 5 different peices and
  figuring out which one of the peices your click was on
*/
var rating = 1;
$('rating').onclick = function(e) {
  var imgSize = e.target.getBoundingClientRect();
  var x = onChromebook? e.clientX:e.clientX/1.5;
  rating = Math.floor((x-imgSize.x)/(imgSize.width/5))+1;
  if(!onChromebook) rating += 2;
  
  if(rating<1) rating = 1;
  e.target.src = "./assets/stars/star"+rating+".png";
}


$('rating').onmousemove = function(e) {
  var imgSize = e.target.getBoundingClientRect();
  var x = onChromebook? e.clientX:e.clientX/1.5;
  rating = Math.floor((x-imgSize.x)/(imgSize.width/5))+1;
  if(!onChromebook) rating += 2;
  console.log(rating)
  
  if(rating<1) rating = 1;
  $('ratingOverlay').src = "./assets/stars/star"+rating+".png";
}

$('rating').onmouseleave = function() {
  $('ratingOverlay').src = "";
}


$('postLevel').onclick = function() {  
  var title = $('mapName').value;
  var rawMap = $('rawMap').value;

  // Regulates the maps title length to be atleast 3 and no more than 15 characters long.
  // this is to prevent names from going off the screen or obstructing other content
  if(title.length < 3 || title.length > 15) {
    alert("Your levels title must be 3-15 characters long.")
    return;
  }
  var arr = rawMap.split(';');
  var stop = false;
  if(stop) return;

  // Updating a level
  if($('postLevel').innerHTML == 'Save Level') {
    mapSocket.emit('updateLevel',title,oldMapName,rating,getCookie('uuid'));
    uploadMenuOpen = false;
    alert(`Your level '${oldMapName}' has been updated.`)
    return;
  }

  mainMenu();
  var mods = JSON.parse(arr[0]);
  uploadMenuOpen = false;
  $('myVideo').style = 'visibility: visible;'
  $('filter').style = 'visibility: visible;'
  $('white').style = 'visibility: hidden;';

  // Upload the map to the maps server
  uploadLevel(title,false,rating,arr[1],getCookie('uuid'),mods)
}

function browseLevels() {
  browseMenuOpen = !browseMenuOpen;
  uploadMenuOpen = false;
  getMaps();
}

var searchWord='';
$('searchbar').oninput = function() {
  searchWord = $('searchbar').value;

  getMaps();
}

var controlsOpen = false
function controls() {
	if(controlsOpen) {
		$('controlMenu').style = "visibility:hidden"
		controlsOpen = false;
	} else {
		$('controlMenu').style = "visibility:visible"
		controlsOpen = true;
	}
}

var menuOpen = false;
function openMenu() {
	if(menuOpen) {
		$('buttons').style = "visibility:hidden"
		menuOpen = false;
    controlsOpen = false;
    uploadMenuOpen = false;
    browseMenuOpen = false;
	} else {
		$('buttons').style = "visibility:visible"
		menuOpen = true;
	}
  $('openMenu').blur();
}

var oldMapName;
function editMap(mapName,rating) {
  browseMenuOpen = false;
  uploadMenuOpen = true;
  oldMapName = mapName;
  $('mapName').value = mapName;
  $('rating').src = "./assets/stars/star"+rating+".png";
  $('rawMapData').style = 'visibility: hidden;';
  $('postLevel').innerHTML = 'Save Level';
	unlockBrickSkin()
}

function uploadLevel(name,troll,rating,mapData,uuid,mods) {
  mapSocket.emit('uploadLevel',name,troll,rating,mapData,uuid,mods)
}