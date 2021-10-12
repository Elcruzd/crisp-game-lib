title = "Baseball";

description = ` [Press] to swing
`;

characters = [
  `
  ll
  ll
  `,
  `
  l
  `
];

options = {};

let ballx;
let bally;
let ballspeed;
let strike;
function update() {
  if (!ticks) {
    ballx = 20;
    bally = 80;
    ballspeed = 0.7;
    strike = 0;
  }
  //Ball
  char('a',ballx,bally);

  //Temp
  char('b',70,80);
  char('b',80,80);

  //Check if hit ball
  if(input.isJustPressed){
    if(ballx >= 70 && ballx <= 80){
      // Increase score, speed, and reset position
      score++;
      ballspeed += 0.1;
      ballx = 20;
    } else {
      // Increase strike and reduce ball speed by 1 (min 0.7)
      strike++;
      ballspeed -= 1;
      if(ballspeed < 0.7){
        ballspeed = 0.7;
      }
      ballx = 20;
    }
  }
  //Move ball across the screen
  if(ballx > 100){
    // If ball is missed
    strike++;
    ballx = 20;
  } else {
    ballx += ballspeed;
  }
  //3 strikes
  if(strike >= 3){
    end();
  }
}
