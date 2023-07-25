var socket = io('https://multiplayerPlatformerServer.friedcow.repl.co');
var dataSocket = io('https://platformerData.cosmictrig.repl.co');
var mapSocket = io('https://PlatformerServer.friedcow.repl.co');
var cosmeticSocket = io('https://platformercosmeticserver.friedcow.repl.co');

socket.on('alert', function(text) {
  notify(text)
});
mapSocket.on('announcement', function(text) {
  notify(text)
  if (Notification.permission !== 'granted') Notification.requestPermission();
  
  var notification = new Notification('Platformerz Announcement', {
   icon: 'https://i.imgur.com/nKfR6wB.png',
   body: text
  });
  notification.onclick = function() {
   window.open('https://platformerz.friedcow.repl.co/');
  };
});

mapSocket.on('alert', function(text) {
  notify(text)
});
var askActive = false;;
mapSocket.on('ask', function(text,duration) {
  askActive = true;
  setTimeout(function() {
    askActive = false;
  },10*1000)

  var int = setInterval(function() {
    if(!askActive) {
      clearInterval(int)
      clearNotify();
      return;
    }
    notify(text+"\n[1] Yes      [2] No")
  },3000)
})

mapSocket.on('getName', function(text) {
  mapSocket.emit('addName',getCookie('uuid'),getCookie('username'))
});

mapSocket.on('levelUploaded', function(text) {
  alert(text);
  $('uploadMenu').style = 'visibility: hidden';
});

var names = {};
dataSocket.on('returnNames',(users) => {
  names = users;
  setTimeout(function() {
    onSignIn();
  },100)
})
function getUsername(uuid) {
  if(names[uuid]) return names[uuid];
  else return "Unknown";
}

function getMaps() {
  var int = setInterval(function() {
    mapSocket.emit('getLevels');
    if(allLevels.length != 0) {
      clearInterval(int)
      int = null;
    }
  },300)
  
  organizeLevels();
}

$('sortBy').onchange = function() {
  getMaps();
}

$('randomMap').onclick = function() {
  randomMap();
}

function randomMap() {
  singlePlayer = false;
  var lvl = allLevels[Math.floor(Math.random()*allLevels.length)];
  unbrowseMaps()
  customLevelMap = decompressMapData(lvl.mapData);
  customLevelName = lvl.name;
  loadLevelFromData(decompressMapData(lvl.mapData));
  mapSocket.emit('playLevel',(lvl.name));
  ctx4.clearRect(0,0,canvas.width,canvas.height)
  modifiers = {};
  for(var i=0;i<allLevels.length;i++) {
    if(allLevels[i].name == customLevelName) {
      $('record').innerHTML = msToTime(allLevels[i].ms);
      if(allLevels[i].mods) modifiers = allLevels[i].mods;
    }
  }
  setTimeout(function() {
    resetPlayer();
  },50)
}
var allLevels = [];
var motdName = "secret bunker";
mapSocket.on('motd', function(a) {
	motdName = a;
})
mapSocket.on('returnLevels', function(levels) {
  allLevels = levels;
  organizeLevels()
  $('mapCount').innerHTML = `${allLevels.length} maps and counting!`
});

function msToTime(duration) {
  if(!duration) return "Unbeat";
  var milliseconds = parseInt((duration % 1000)),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
  minutes += hours*60
  
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;

  return minutes + ":" + seconds + "." + milliseconds;
}

function msToHM(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)));

  var time = '';
  if(hours>0) time+=`${hours} hrs `;;

  return time+=`${minutes} min`;
}
// where is sign in button me no see
// username is 'unknown'

function todaysDate(){
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return mm + '/' + dd + '/' + yyyy;
}

var now = 0;
var ping = 0;
var averagePing = 0;
var pings = [];

mapSocket.on('pong', () => {
  ping = Date.now() - now;
  pings.push(ping);
  if(pings.length == 100) pings.shift();
  var temp = pings;
  averagePing = Math.floor(pings.reduce((acc, c) => acc + c, 0)/pings.length);
});

function organizeLevels() {
  var temp = '';
  levels = allLevels;
  var sort = $('sortBy').value;
  if(sort == 'difficulty') {
    levels.sort(function(a,b) {return b.rating-a.rating})
  }
  if(sort == 'plays') {
    levels.sort(function(a,b) {return b.plays-a.plays})
  }
  if(sort == 'newest') {
    levels.reverse();
  }

  // Put MOTD at top
  for(var i=0;i<levels.length;i++) {
    if(levels[i].name == motdName) levels.unshift(levels.splice(i, 1)[0]);
    if(levels[i].mods) levelAndModifiers[levels[i].name] = levels[i].mods
  }

  // Map searching algorithm
  for(var i=0;i<levels.length;i++) {
    var searchChar = 0;
    var newName = levels[i].name.replaceAll(searchWord,`~${searchWord}]`)
    if(levels[i].name == motdName) {
      newName = levels[i].name;
    }
    if(!newName.includes(searchWord)) continue;

    newName = newName.replaceAll('~',"<span class='highlight'>").replaceAll(']','</span>')
    var ms = msToTime(levels[i].ms);
    var ownTime = getCookie('uuid') == levels[i].recordUuid? "ownTime": ms=="Unbeat"?"noTime":"bestTime";
    temp += 
      `<div class='level' accesskey='${levels[i].mapData}' id='${levels[i].name}'>
        <p id='levelTitle'>
          ${newName}
          <grey>${levels[i].date} ${levels[i].plays} plays</grey>
          <${ownTime} class='timeType' id='${levels[i].author}'>${ms}</${ownTime}>
        </p>
        <img id='levelRating' accesskey='${levels[i].rating}' src='./assets/stars/star${levels[i].rating}.png'></img>
      </div>`
  }
  $('maps').innerHTML = temp;

  // Setting the style for the map of the day like the gold background ect
  if($(motdName)) {
    $(motdName).style = 'background:linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C); margin-bottom: 15px;font-weight:bold;height:9%;';
    $(motdName).children[0].style = 'font-size: 24px;'
    $(motdName).children[0].children[1].innerHTML = '';
    $(motdName).children[0].children[0].style = 'color: #28282B;font-weight:bold;';
    $(motdName).children[0].children[0].innerHTML = 'The Map Of The Day for '+todaysDate()+'!'; 
  }

  setTimeout(function() {
    for(var i=0;i<document.getElementsByClassName('level').length;i++) {
      var lvl = document.getElementsByClassName('level')[i];

      lvl.onclick = function(e) {
        singlePlayer = false;
        clearTypewriter();
        unbrowseMaps();
        modifiers = {};
        if(e.target.className != 'level') return;
        menuOpen = false;
        nowin = true;
        setTimeout(function() {
          loadLevelFromData(decompressMapData(e.target.accessKey));
          customLevelMap = decompressMapData(e.target.accessKey);
          browseMenuOpen = false;
          customLevelName = e.target.id;
          mapSocket.emit('playLevel',(e.target.id));

          for(var i=0;i<allLevels.length;i++) {
            if(allLevels[i].name == customLevelName) {
              $('record').innerHTML = msToTime(allLevels[i].ms);
              if(allLevels[i].mods) modifiers = allLevels[i].mods;
            }
          }
          notify('Press ESCAPE to open pause menu');
        },100)
        setTimeout(function() {
          nowin = false;
        },500)
      }
      
      lvl.onmouseenter = function(e) {
				$('mapInfoPanel_mapTitle').innerHTML = e.target.id;
				for(var i=0;i<allLevels.length;i++) {
					if(allLevels[i].name == e.target.id) {
						targetLevel = allLevels[i];
            if(targetLevel.author) $('mapInfoPanel_mapAuthor').innerHTML = "Author: "+getUsername(targetLevel.author);
            else $('mapInfoPanel_mapAuthor').innerHTML = "";
						$('mapInfoPanel_mapDate').innerHTML = "Posted: "+targetLevel.date;
            if(targetLevel.ms) {
              $('mapInfoPanel_recordHolder').innerHTML = "Record Holder: "+getUsername(targetLevel.recordUuid);
  						$('mapInfoPanel_mapRecord').innerHTML = "Record Time: "+msToTime(targetLevel.ms); 
            } else {
              $('mapInfoPanel_recordHolder').innerHTML = "";
  						$('mapInfoPanel_mapRecord').innerHTML = "Unbeat"
            }
            
            if(e.target.id == motdName) {
              $('mapInfoPanel_recordHolder').innerHTML = "Record Holder: Revealed At End";
              $('mapInfoPanel_mapRecord').innerHTML = "Record Time: Revealed At End"
            }
            
						$('mapInfoPanel_mapPlays').innerHTML = "Plays: "+targetLevel.plays;
					}
				}
				// Check if the player is an admin by checking local storage for the admin password
        var flag = localStorage.adminPass && atob(localStorage.adminPass) && atob(localStorage.adminPass) == 'admin' && e.shiftKey;

        // Applies The sparkle when hovering over the motd
        if(e.target.id == motdName) {
          if(!e.target.innerHTML.includes("<shine></shine>"))
            e.target.innerHTML += "<shine></shine>"
          return;
        }
        var path = e.target.children[0].children[e.target.children[0].children.length-1];
        // Allows you or an admin to edit the name/rating of your map
        if(path.id == getCookie('uuid') || (flag)) {
          var data = path;
          data.backup = data.innerHTML;
          setTimeout(function() {
            data.innerHTML = 'Edit Level';
          },10)
          data.style = 'pointer-events: auto';
          
          data.onclick = function(e) {
            var lvl = e.target.parentElement.parentElement;
            var mapName = lvl.id;
            var rating = lvl.children[1].accessKey;
            editMap(mapName,rating)
          }
        }
				
      }
      lvl.onmouseleave = function(e) {
        if(e.target.id == motdName) {
          e.target.innerHTML = e.target.innerHTML.replace("<shine></shine>",'');
          return;
        }
        
        var flag = localStorage.adminPass && atob(localStorage.adminPass) && atob(localStorage.adminPass) == 'admin';
        var path = e.target.children[0].children[e.target.children[0].children.length-1];
        
        if(path.id == getCookie('uuid') || flag) {
          if(path.backup) path.innerHTML = path.backup;
          path.style = 'pointer-events: none';
        }
      }
    }
  },500);
}
var cosmetics = [];
var playerCosmetics = {};

cosmeticSocket.emit('getCosmetics')
dataSocket.emit('getData')
cosmeticSocket.on('returnCosmetics',function(arg1,arg2) {
  cosmetics = arg1;
  playerCosmetics = arg2;
  sortCosmeticsArray()
})
var saveData = null
dataSocket.on('returnUserData',function(data) {
	saveData = data
  for(var uuid in data) {
    if(uuid == getCookie('uuid')) {
      // console.log(parseFloat(data[uuid].playtime)+2+" "+data[uuid].playtime)
      // playtime = data[uuid].playtime+2;
      // setCookie('playtime',parseFloat(data[uuid].playtime)+2)
      // setCookie('unlockedCosmetics',JSON.stringify(data[uuid].unlockedCosmetics))
      // setCookie('joinDate',data[uuid].joinDate)
    }
  }
})



var totalJumps = 0
if(getCookie('totalJumps')) {
	totalJumps = parseFloat(getCookie('totalJumps'))
} else {
	setCookie('totalJumps', totalJumps)
}



setInterval(function() {
  for(var uuid in saveData) {
    if(uuid == getCookie('uuid')) {
      if(parseFloat(saveData[uuid].playtime) > getCookie('playtime'))  {
        setCookie('playtime',(parseFloat(saveData[uuid].playtime)+2))
      }
      setCookie('joinDate',saveData[uuid].joinDate)
    }
  }
  cosmeticSocket.emit('getCosmetics')
  dataSocket.emit('getData')
  dataSocket.emit('saveData',getCookie('uuid'), names[getCookie('uuid')], getCookie('playtime'),getCookie('joinDate'))
},2000)