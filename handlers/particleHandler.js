var particles = [];

function doParticles(x,y,color,amount,maxSpeed,minSpeed,fadeTime) {
  if(document.hidden) return;
  for(var i=0;i<amount;i++) {
    var randX = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed;
    var randY = Math.random() * (maxSpeed - minSpeed + 1) + minSpeed;
    var randSize = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    
    var particle = {
      x: x,
      y: y,
      size: randSize,
      opacity: 1,
      dx: randX,
      dy: randY,
      color: color,
      fadeTime: fadeTime,
      circle: false
    }

    particles.push(particle);
  }
}
function doParticles2(x,y,color,amount,maxSpeedX,minSpeedX,maxSpeedY,minSpeedY,fadeTime) {
  if(document.hidden) return;
  for(var i=0;i<amount;i++) {
    var randX = Math.random() * (maxSpeedX - minSpeedX + 1) + minSpeedX;
    var randY = Math.random() * (maxSpeedY - minSpeedY) + minSpeedY;
    var randSize = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    var particle = {
      x: x,
      y: y,
      size: randSize,
      opacity: 1,
      dx: randX,
      dy: randY,
      color: color,
      fadeTime: fadeTime,
      circle: true
    }

    particles.push(particle);
  }
}

function doParticles3(x,y,color,amount,maxSpeedX,minSpeedX,maxSpeedY,minSpeedY,fadeTime) {
  if(document.hidden) return
  for(var i=0;i<amount;i++) {
    var randX = Math.random() * (maxSpeedX - minSpeedX + 1) + minSpeedX;
    var randY = Math.random() * (maxSpeedY - minSpeedY) + minSpeedY;
    var randSize = Math.floor(Math.random() * (40 - 20 + 1) + 20);
    var particle = {
      x: x,
      y: y,
      size: randSize,
      opacity: 1,
      dx: randX,
      dy: randY,
      color: color,
      fadeTime: fadeTime,
      circle: true
    }

    particles.push(particle);
  }
}

function doDeathParticles() {
  doParticles(player.x,player.y,'255,0,0',15, 5, -5, 0.05);
}


// function doEndParticle() {
//   doParticles(finish.x+7,finish.y+7,'0,255,0',1, 1.5, -1.5, 0.03)
// }
function generateLightColorRgb() {
  const red = Math.floor((1 + Math.random()) * 256/2);
  const green = Math.floor((1 + Math.random()) * 256/2);
  const blue = Math.floor((1 + Math.random()) * 256/2);
  return red + ", " + green + ", " + blue;
}
setInterval(function() {
  if(flight) {
    doParticles(player.x+10,player.y+10,generateLightColorRgb(),1, 1.5, -1.5, 0.03)
  }
},100);
var particleLimit = 150;
function renderParticles() {
  if(performanceMode) {
    particles = [];
    return;
  }
  for(var i=0;i<particles.length;i++) {
    var particle = particles[i];
    if(particle.opacity <= 0 || i>particleLimit) {
      particles.splice(i,1);
      continue;
    }
      ctx2.fillStyle = `rgba(${particle.color},${particle.opacity})`;
    if(!particle.circle) {
      ctx2.fillRect(particle.x,particle.y,particle.size,particle.size);
    } else {
      ctx2.beginPath();
      ctx2.arc(particle.x, particle.y, particle.size/2, 0, 2 * Math.PI, false);
      ctx2.fill();
    }
    particle.opacity -= particle.fadeTime;
    particle.x += particle.dx/2;
    particle.y += particle.dy/2;
  }
}

function fireworks(){
  var maxWidth = canvas.width-200;
  var minWidth = 200;
  var maxHeight = canvas.height-300;
  var minHeight = 100;
  
  var randomX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
  var randomY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  doParticles(randomX,randomY,'37,195,247',40,2,-2,0.01);
  
  randomX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
  randomY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  doParticles(randomX,randomY,'233,30,247',40,2,-2,0.01);

  randomX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
  randomY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  doParticles(randomX,randomY,'91,247,30',40,2,-2,0.01);

  randomX = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
  randomY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  doParticles(randomX,randomY,'247,30,52',40,2,-2,0.01);
}

