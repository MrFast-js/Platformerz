var stages = [
    '{"gravity":3,"speed":3,"limitedVision":false};1585o3■58o3■3o3■2o3■59o3■37o■14o3■9o3■8o3■21o■4o■26o3■27o■4o■4o■8o3■15o3■14o3■5o≛4o■4o■4o■26o3■19o✓67■',
    '{"gravity":3,"speed":3,"limitedVision":false};1434o■3o■3o■3o■54o■3o■3o■3o■54o■3o■3o■3o■54o■3o□3o■3o■54o■3o□3o□3o■54o■3o□3o□3o□15o2■37o□3o■3o□3o□15o2■37o□3o■3o■3o□15o2■12o≛5o2▲7o2▲8o□3o■3o■3o■15o2■9o✓47■8z2■9z■',
    '{"gravity":3,"speed":3,"limitedVision":false};981o■66o■66o■66o■66o■66o■66o■62o■3◩■62o■15o12■39o■15o■44o3■3o■15o■50o■15o■50o■15o■3m5■14o10▲18o■23o■14o10■6o3■9o■23o■5o≛8o10⛶18o■23o■2o✓40■3_24■'
]
var stageTexts = [
    'Welcome to the tutorial! First you need to learn the basics of movement, \nuse ⬅ ⬆ ➡ on your keyboard to control your player!',
    'Welcome to stage 2! In this stage you will learn the basics of interacting with blocks.\nTry getting over the spikes without touching them',
    'Stage 3: This jump may look impossible, but beneath it there is darker blocks that you can walk through.\nGhost blocks are slightly darker than normal platforms and act like air'
]

function startTutorial() {
    tutorial = true;
    tutorialStage = 0;
    nextTutorial();
}

function nextTutorial() {
    customLevel = true;
    tutorialStage++;
    if (tutorialStage - 1 == stages.length) {
        typewrite('Congratulations, you beat the tutorial!\nHopefully you can set some records now that you know how to play!')
				unlockBandannaSkin() 
        setTimeout(function() {
            clearInterval(int)
            tutorial = false;
            mainMenu();
        }, 6000)
        return;
    }
    var input = stages[tutorialStage - 1];
    var level = decompressMapData(input.split(';')[1]);
    modifiers = JSON.parse(input.split(';')[0]);

    convertPlayerSpeed(modifiers.speed);
    convertGravity(modifiers.gravity);
    limitedVision = modifiers.limitedVision;
    platforms = level.split('');
    customLevelMap = level;
    resetPlayer();

    typewrite(stageTexts[tutorialStage - 1])

    if (tutorialStage == 1) {
        var right = false;
        var up = false;
        var left = false;
        var int = setInterval(function() {
            if (rightPressed) right = true;
            if (leftPressed) left = true;
            if (player.jump) up = true;
            if (right && left && up) {
                clearInterval(int);
                typewrite('Great Job! Now that you know how to move try to navigate to the finish (green glowing block)')
            }
        }, 100)
    }

    if (tutorialStage == 2) {
        var int = setInterval(function() {
            if (Math.floor(player.x) >= 445) {
                clearInterval(int)
                typewrite('Fantastic! In order to pass you need to shoot the grey blocks! \nHint: Press [SPACE] to shoot!')

                int = setInterval(function() {
                    if (Math.floor(player.x) >= 857) {
                        clearInterval(int)
                        typewrite('Nice Job! The next block is ice.\nWarning ice is slippery and can cause you to jump further than expected!')
                    }
                }, 100)
            }
        }, 100)
    }

    if (tutorialStage == 3) {
        var int = setInterval(function() {
            // 1st Dialogue
            if (Math.floor(player.x) >= 670) {
                clearInterval(int)
                typewrite('These next blocks are really unstable and will crumble if you stand on them!')

                // 2nd Dialogue
                int = setInterval(function() {
                    if (Math.floor(player.x) >= 890) {
                        clearInterval(int)
                        typewrite('Woah!! That was a nice jump you did onto those bounce blocks!')

                        // 3rd Dialogue
                        int = setInterval(function() {
                            if (Math.floor(player.x) >= 1050) {
                                clearInterval(int)
                                typewrite('The blue blocks you see ahead will disapear when you bump it with your head!')
                            }
                        }, 100)
                    }
                }, 100)
            }
        }, 100)
    }
}