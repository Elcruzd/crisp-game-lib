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
  `,
  `
  l l
   l
  l l
  `
];

options = {};

let ballx;
let bally;
let ballspeed;
let strike;
let delay;
let path;
function update() {
  if (!ticks) {
    ballx = 20;
    bally = 80;
    ballspeed = 0.7;
    strike = 0;
    delay = 0;
    path = 0;
  }

  //Strike display
  switch(strike){
    case 3:
      char('c',90,10);
    case 2:
      char('c',85,10);
    case 1:
      char('c',80,10);
  }
  //3 strikes
  if(strike >= 3){
    end();
  }

  //Delay before next pitch
  if(delay > 0){
    delay--;
  }
  //Ball
  char('a',ballx,bally);

  //Temp markers
  char('b',70,80);
  char('b',80,80);

  //Check if hit ball
  if(input.isJustPressed){
    if(ballx >= 70 && ballx <= 80){
      //Increase score, speed, and reset position
      score+= 1 + (ballspeed);
      ballspeed += 0.1;
    } else {
      //Increase strike and reduce ball speed by 1 (min 0.7)
      strike++;
      ballspeed -= 1;
      if(ballspeed < 0.3){
        ballspeed = 0.3;
      }
    }
    ballx = 20;
    bally = 80;
    //Remove delay
    path = rndi(0,3);
    delay = 10;
  }
  //Move ball across the screen
  if(ballx > 100){
    //If ball is missed
    strike++;
    ballx = 20;
  } else {
    if(delay == 0){
      switch(path){
        case 0:
          break;
        case 1:
          if(ballx < 50)
            bally += ballspeed/60 * 10;
          else
            bally -= ballspeed/60 * 10;
          break;
        case 2:
          if(ballx < 50)
            bally -= ballspeed/60 * 10;
          else
            bally += ballspeed/60 * 10;
          break;
      }
      ballx += ballspeed;
    }
  }
}
