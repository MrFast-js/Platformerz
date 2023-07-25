var mainMenuOpen = true;
var browseMenuOpen = false;

function mainMenu() {
    $('cosmeticsMenu').style = 'visibility: hidden;';
    $('myVideo').style = 'visibility: visible;'
    $('filter').style = 'visibility: visible;'
    uploadMenuOpen = false;
    $('mainMenu').style = 'visibility: visible;'
    $('gameInstance').style = 'visibility: hidden;'
    mainMenuOpen = true;
    clearTypewriter();
    $('heart1').src = '';
    $('heart2').src = '';
    $('heart3').src = '';
}

function leaveMainMenu() {
    $('mainMenu').style = 'visibility: hidden;'
    $('gameInstance').style = 'visibility: visible;'
    $('myVideo').style = 'visibility: hidden;'
    $('filter').style = 'visibility: hidden;'
    $('white').style = 'visibility: hidden;';
    mainMenuOpen = false;
}

function openEditorMenu() {
    $('editorMenu').style = 'visibility: visible;';
    leaveMainMenu();
    $('white').style = 'visibility: hidden;';
    $('gameInstance').style = 'visibility: hidden;'
    $('myVideo').style = 'visibility: visible;'
    $('filter').style = 'visibility: visible;'
    mainMenuOpen = true;

}

function closeEditorMenu() {
  $('editorMenu').style = 'visibility: hidden;';
}

function changePlayerColor() {
    var word = $('colorMenu').value;
    var outputColor;
    switch (word) {
        case 'Red':
            outputColor = '#d15e6e';
            break;
        case 'Green':
            outputColor = '#7de378';
            break;
        case 'Pink':
            outputColor = '#d162cd';
            break;
        case 'Light-Blue':
            outputColor = '#60d1d1';
            break;
        case 'Orange':
            outputColor = '#e39a1b';
            break;
        case 'Dark-Blue':
            outputColor = '#3f41b5';
            break;
        case 'Purple':
            outputColor = '#8942b8';
            break;
        case 'Yellow':
            outputColor = '#d1c956';
            break;
        default:
            outputColor = colors[Math.floor(Math.random() * colors.length)]
    }
    setCookie('playerColor', outputColor)
    playerColor = getCookie('playerColor') //Just to make sure the cookie was set
}

function doMusicVolume() {
    audio.volume = $('volumeSlider').value / 100;
    audioVolume = audio.volume;
}

function togglePlayers() {
    hidePlayers = !hidePlayers;
    if (!hidePlayers) $('togglePlayers').innerHTML = 'Hide Players';
    if (hidePlayers) $('togglePlayers').innerHTML = 'Show Players';
}

function openPrizeMenu() {
    $('white').style = 'visibility: visible;';
    $('prizeMenu').style = 'visibility: visible;';
    mainMenuOpen = true;
}

function browseMaps() {
    leaveMainMenu();
    $('heart1').src = '';
    $('heart2').src = '';
    $('heart3').src = '';
    dataSocket.emit('getNames', '', '');

    if (!local) {
        var signInButton = $('googleSignIn').children[0].children[0].children[1].children[0];
        signInButton.innerHTML = 'Sign in with Google';
        signInButton.style.letterSpacing = '1px'

        var signedInButton = $('googleSignIn').children[0].children[0].children[1].children[1];
        signedInButton.innerHTML = 'Signed in with Google';
        signedInButton.style.letterSpacing = '1px'
    }

    $('white').style = 'visibility: visible;';
    $('playerInfoPanel').style = 'visibility: visible;';
    $('mapInfoPanel').style = 'visibility:visible;';
    $('googleSignIn').style = 'visibility:visible;';
    browseMenuOpen = true;
    organizeLevels();
    getMaps();
    updatePlayerInfoPanel();
}

function unbrowseMaps() {
    $('white').style = 'visibility: hidden;';
    $('playerInfoPanel').style = 'visibility: hidden;';
    $('mapInfoPanel').style = 'visibility: hidden;';
    browseMenuOpen = false;
    mainMenuOpen = false;
    $('gameInstance').style = 'visibility: visible;'
    $('googleSignIn').style = 'visibility:hidden;';
}

setInterval(function() {
    if (!getCookie('playtime')) {
        setCookie('playtime', 0);
    }
    if (!mainMenuOpen && !browseMenuOpen && !afk && !gamePaused) {
        setCookie('playtime', parseFloat(getCookie('playtime')) + 1)
    }
    if ((browseMenuOpen || mainMenuOpen) && googleVariable) {
        signedInWithGoogle = gapi.auth2.getAuthInstance().currentUser[googleVariable].getId() > 0;
        updatePlayerInfoPanel();
    }
}, 1000)

function updatePlayerInfoPanel() {
    if (!signedInWithGoogle) {
        if (local) {
            $('statistics').innerHTML = "Since you are hosting this game locally you cannot connect to google at this time."
            return;
        }
        $('statistics').innerHTML = "Sign in with Google to save your progress, track your stats, set those records!"
        return;
    }
    $('playerInfoPanel_playerName').innerHTML = '<h1>' + getCookie('username') + '</h1>';

    var authored = 0;
    var mapPlays = 0;
    var selfRecords = 0;
    var heldRecords = 0;
    for (var i = 0; i < allLevels.length; i++) {
        if (allLevels[i].author == getCookie('uuid')) {
            authored++;
            mapPlays += levels[i].plays;
            if (allLevels[i].recordUuid == getCookie('uuid')) selfRecords++;
        }
        if (allLevels[i].recordUuid == getCookie('uuid')) {
            heldRecords++;
        }
    }
    var formateDate = joinDate.toLocaleDateString();
    // var coins = getCookie('coins');
    var statistics = '';
    var stats = {
        'Records': heldRecords,
        'Created Maps': authored,
        'Created Map Plays': mapPlays,
        'Self Map Records': selfRecords,
        // 'Coins': coins,
        'Join Date': formateDate,
        'of Ingame Playtime': msToHM(parseFloat(getCookie('playtime')) * 1000)
    }

    for (var stat in stats) {
        statistics += "<p>" + stats[stat] + " " + stat + "</p>";
    }
    $('statistics').innerHTML = statistics;
}

$('campaign').onmouseover = function() {
    $('description').innerHTML = `Campaign is the singleplayer experience of platformerz, this is where you challenge yourself to finish the preset maps as fast as possible!`
}
$('campaign').onclick = function() {
    unbrowseMaps()
    customLevel = false;
    customLevelMap = '';
    customLevelName = '';
    leaveMainMenu()
    level = 1;
    nextLevel();
    singlePlayer = true;
    modifiers = {};
}
$('returnToMainMenu').onclick = function() {
    mainMenu();
    togglePauseGame();
}

$('multiplayer').onmouseover = function() {
    $('description').innerHTML = `multiplayer is a place where you can play custom maps made by the community! Your goal is to finish a map in the fastest time on as many maps as possible!`
}
$('multiplayer').onclick = function() {
    browseMaps();
}
$('multiplayerButton').onclick = function() {
    togglePauseGame();
    browseMaps();
}

$('tutorialButton').onmouseover = function() {
    $('description').innerHTML = `Learn the basics of how to control your character and about how blocks effect your game.`;
}
$('tutorialButton').onclick = function() {
    leaveMainMenu();
    startTutorial();
}

$('editor').onmouseover = function() {
    $('description').innerHTML = `The level editor is a easy way to upload and design your own levels to your liking you can change place any block and change game settings gravity, player speed!`
}
$('editor').onclick = function() {
    openEditorMenu();
}
$('openEditorButton').onclick = function() {
    window.open('https://leveldesigner.friedcow.repl.co/');
}