
// var unlockedCosmetics = ['clearhat','clearskin']
// var playerData = null;
// // Cosmetics with missions

// if(getCookie('unlockedCosmetics')) {
// 	unlockedCosmetics = JSON.parse(getCookie('unlockedCosmetics'))
// } else {
// 	setCookie('unlockedCosmetics', JSON.stringify(unlockedCosmetics))
// }

// // What ever cosmetics are in unlockedCosmetics are shown


// // save the players unlockedCosmetics var as a cookie and update it when they obtain a new one
// function updateLockedCosmetics() {
// 	setCookie('unlockedCosmetics', JSON.stringify(unlockedCosmetics))
// }
// updateLockedCosmetics()

// // Mission: Finish campaign
// function unlockLogoSkin() {
// 	if(!unlockedCosmetics.includes('logo')) {
//     unlockedCosmetics.push('logo')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Upload a Map
// function unlockStripesSkin() {
// 	if(!unlockedCosmetics.includes('stripes')) {
//     unlockedCosmetics.push('stripes')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Beat the Tutorial
// function unlockBandannaSkin() {
// 	if(!unlockedCosmetics.includes('bandanna')) {
//     unlockedCosmetics.push('bandanna')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Beat Map of The Day
// function unlockCrownSkin() {
// 	if(!unlockedCosmetics.includes('crown')) {
//     unlockedCosmetics.push('crown')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Sign In with Google
// function unlockEarthSkin() {
// 	if(!unlockedCosmetics.includes('earth')) {
//     unlockedCosmetics.push('earth')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Open Inspect
// function unlockCoderSkin() {
// 	if(!unlockedCosmetics.includes('coder')) {
//     unlockedCosmetics.push('coder')
// 		updateLockedCosmetics()
// 	}
// }

// // Count total jumps to unlock a new skin
// function doTotalJumps() {
// 	totalJumps += 1;
// 	setCookie('totalJumps', totalJumps)
// 	if(getCookie('totalJumps') >= 250) {
// 		unlockPropellerSkin()
// 	}
// 	if(getCookie('totalJumps') >= 1000) {
// 		unlockGeometrySkin()
// 	}
// }

// // Mission: Jump 250 times
// function unlockPropellerSkin() {
// 	if(!unlockedCosmetics.includes('propeller')) {
//     unlockedCosmetics.push('propeller')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: Jump 1000 times
// function unlockGeometrySkin() {
// 	if(!unlockedCosmetics.includes('geometry')) {
//     unlockedCosmetics.push('geometry')
// 		updateLockedCosmetics()
// 	}
// }

// // Mission: 
// function unlockBrickSkin() {
// 	if(!unlockedCosmetics.includes('brick')) {
//     unlockedCosmetics.push('brick')
// 		updateLockedCosmetics()
// 	}
// }


// // TEMPLATE

// // Mission: Put Mission Here
// function unlockTemplateSkin() {
// 	if(!unlockedCosmetics.includes('skin_name_here')) {
// 		alert("You have unlocked a new skin!") // <- will not stay right
//     unlockedCosmetics.push('skin_name_here')
// 		updateLockedCosmetics()
// 	}
// }