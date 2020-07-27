const PI=3.14;
const HALF_PI=PI/2;

class lightningBolt{
  //  lineWidth0=0;
  //  theta=0;
  //  x0=0;
  //  y0=0;
  //  x1=0;
  //  y1=0;
  //  x2=0;
  //  y2=0;
  //  straightJump=0;
  //  straightJumpMax=0;
  //  straightJumpMin=0;
  //  lineWidth=0;
  //  myColor;
  constructor( x0I,  y0I,  width0,  theta0,  jumpMin,  jumpMax,  inputColor){

    this.lineWidth0 = width0;
    this.lineWidth = width0;
    this.theta = theta0;
    this.x0 = x0I;
    this.y0 = y0I;
    this.x1 = x0I;
    this. y1 = y0I;
    this.x2 = x0I;
    this.y2 = y0I;
    this.straightJumpMin = jumpMin;
    this.straightJumpMax = jumpMax;
    this.myColor = inputColor;
    //it's a wandering line that goes straight for a while,
    //then does a jagged jump (large dTheta), repeats.
    //it does not aim higher than thetaMax
    //(where theta= 0 is down)
    this.straightJump = random(this.straightJumpMin,this.straightJumpMax);
  }

  //tells when the thunder should sound.
   getThunderTime(){
    return (millis()+meanDistance*(1+random(-.1,.1)));
  }

   draw()
  {
    while(this.y2<height && (this.x2>0 && this.x2<width))
    {
      strokeWeight(1);
      
      this.theta += randomSign()*random(minDTheta, maxDTheta);
      if(this.theta>maxTheta)
      this.theta = maxTheta;
      if(this.theta<-maxTheta)
      this.theta = -maxTheta;
        
      this.straightJump = random(this.straightJumpMin,this.straightJumpMax);
      this.x2 = this.x1-this.straightJump*cos(this.theta-HALF_PI);
      this.y2 = this.y1-this.straightJump*sin(this.theta-HALF_PI);
      
      if(randomColors)
      this.myColor = this.slightlyRandomColor(this.myColor,this.straightJump);
      
      this.lineWidth = map(this.y2, height,this.y0, 1,this.lineWidth0);
      if(this.lineWidth<0)
      this.lineWidth = 0;
      stroke(this.myColor);
      strokeWeight(this.lineWidth);
      line(this.x1,this.y1,this.x2,this.y2);
      this.x1=this.x2;
      this.y1=this.y2;
      
      //think about making a fork
      if(random(0,1)<childGenOdds){//if yes, have a baby!
        var newTheta = this.theta;
        newTheta += randomSign()*random(minDTheta, maxDTheta);
        if(this.theta>maxTheta)
        this.theta = maxTheta;
        if(this.theta<-maxTheta)
        this.theta = -maxTheta;
//        nForks++;
        (new lightningBolt(this.x2, this.y2, this.lineWidth, newTheta, this.straightJumpMin, this.straightJumpMax,boltColor)).draw();
        //it draws the whole limb before continuing.
      }
	  
	  
    }
  }
}
