var players = {};
var playerData = {};
window.onbeforeunload = function() {
  socket.emit('playerLeft',localStorage.uuid);
}

var online = 0;
var temp = {};
socket.on('returnPlayers',(e) => {
	serverConnected = true;
  for(var thing in e) {
    if(!temp[thing]) temp[thing] = e[thing]
    for(var variable in e[thing]) {
      temp[thing][variable] = e[thing][variable];
    }
  }
	online = getLengthOfObjectList(e);
});

dataSocket.on('returnData', (a) => {
  for(var thing in a) {
    for(var variable in a[thing]) {
      if(temp[thing]) temp[thing][variable] = a[thing][variable];
    }
  }
  if(getLengthOfObjectList(temp) == online) {
    players = temp;
  }
});

socket.on('forceReload',() => {
  location.reload();
});
mapSocket.on('forceReload',() => {
  location.reload();
});