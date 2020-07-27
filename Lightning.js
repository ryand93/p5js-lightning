var width = 900;
var height = 500;



var maxDTheta = PI/10;
var minDTheta = PI/20;
var maxTheta = PI/2;
var childGenOdds = .01;

var minBoltWidth = 3;
var maxBoltWidth = 10;

var minJumpLength = 1;
var maxJumpLength = 10;

var stormMode = true;
var fadeStrikes = true;
var randomColors = false;
var maxTimeBetweenStrikes = 3000;

var minFadeIntervalMillis = 500;
var maxFadeIntervalMillis = 1000;

//var yellow = var(59,99,99);
//var red = var(0,99,99);
var boltColor;
var skyColor;


var bolt;
var lastStrike = 0;
var nextStrikeInNms = 0;

//var playThunder = false;
//var useDing = false;
//import ddf.minim.*;
//AudioSample thunderSound;
//Minim minim;

//distance, in milliseconds, of the storm.
var meanDistance = 0;
//if the current time matches the time in this arraylist, it should fire!
var thunderTimes = [];

var currentBolts = [];
var maxConcurrentStrikes = 2


function setup(){
  colorMode(HSB,100);
  
  createCanvas(windowWidth, windowHeight);
  //minim = new Minim(this);
  //thunderSound = minim.loadSample("thunder.mp3");
  noFill();
  meanDistance = 1000*.5;
  
//  yellow = var(60/3.6,99,99);
//  red = var(0,99,99);
  boltColor = color(0,0,99);
  skyColor = color(0,0,0, 20);
  fill(0, 100);
  rect(0, 0, width, height);

  smooth();
}

function draw(){
  //check if any of the stored times need to make a 'ding'
  //if(playThunder && thunderTimes.size() > 0)
  //  if(millis() > (Float)thunderTimes.get(0)){
  //    thunderTimes.remove(0);
  //    thunderSound.trigger();
  //    prvarln("boom!");
  //  }
  
  if(stormMode && millis()-lastStrike>nextStrikeInNms){//time for a new bolt?
    lastStrike = millis();
    nextStrikeInNms = random(0,maxTimeBetweenStrikes);
    
	for (i=0;i<random(0,maxConcurrentStrikes ); i++){
		currentBolts.push(new lightningBolt(random(0,width),0,random(minBoltWidth,maxBoltWidth),0,minJumpLength,maxJumpLength,boltColor))
	};
	
	for (i=0;i<currentBolts.length; i++){
		currentBolts[i].draw();
	};
    //if(playThunder)
    //  thunderTimes.add(bolt.getThunderTime());
	smooth();
  }
  else{
    if(fadeStrikes){
      noStroke();
      fill(skyColor);
      rect(0,0,width,height);
      noFill();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function stop(){
  //thunderSound.close();
  //minim.stop(); 
  // super().stop();
}

function randomSign() //returns +1 or -1
{
  var num = random(-1,1);
  if(num==0)
    return -1;
  else
    return (float)(num/abs(num));
}

function randomColor(){
  return color(random(0,100),99,99);
}

function slightlyRandomColor( inputCol, length){
  var h = hue(inputCol);
  h = (h+random(-length,length))%100;
  return color(h,99,99);
}
