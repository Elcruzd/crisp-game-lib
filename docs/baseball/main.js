title = "Baseball";

description = ` [Press] to swing
`;

characters = [
  `
  ll
  ll
  `,
  `
  ccllcc
  ll l l
  ll l l
  ccllcc
   l  l
   l  l
  `,
  `
  ccllcc
  ll l l
  ll l l
  ccllcc
  ll  ll
  `,
  `
  l l
   l
  l l
  `,
`
rrrrrr
lll
rrrrrr 
`
];

const G = {
  WIDTH: 100,
  HEIGHT: 100
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  // theme: "dark",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 25
};

let ballx;
let bally;
let ballspeed;
let strike;
let delay;
let path;
let field;
let player;

function update() {
  if (!ticks) {
    ballx = 20;
    bally = 80;
    ballspeed = 0.7;
    strike = 0;
    delay = 0;
    path = 0;
    player = { pos: vec(80, 75)};
  }
  textUI();
  fieldDisplay();

  //Strike display
  switch(strike){
    case 3:
      char('d',90,10, { color: "black"});
    case 2:
      char('d',85,10, { color: "black"});
    case 1:
      char('d',80,10, { color: "black"});
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
  char('a',ballx,bally, { color: "black"});

  //Temp markers
  // char('b',70,80);
  const c = char(addWithCharCode("b", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;
  // char('b',80,75, { color: "black"});
  // char('f',80,80, { color: "black"});

  //Check if hit ball
  if(input.isJustPressed){
    if(ballx >= 70 && ballx <= 80){
      //Increase score, speed, and reset position
      score+= 1 + (ballspeed);
      play("coin");
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

  char('e', G.WIDTH - 80, G.HEIGHT - 21, { color: "black"});
}

// display text
function textUI() {
  color("black");
  text(`STRIKE: `, 40, 10);
}

// draw baseball field
function fieldDisplay() {
  color("yellow");
  rect(0, 20, 100, 100);
  color("white");
  rect(wrap(25, 0, 100), 2, 10, 30);
  rect(wrap(25, -10, 110), 70, 2, 15);
  rect(wrap(90, -10, 110), 75, 8, 10);
  color("black");
  box(wrap(80, -10, 50), 25, 2, 1);
  box(wrap(50, -10, 100), 30, 2, 1);
  box(wrap(20, -10, 90), 50, 2, 1);
  box(wrap(10, -10, 110), 60, 2, 1);
  box(wrap(20, -10, 80), 70, 2, 1);
  box(wrap(50, -10, 110), 70, 2, 1);
  box(wrap(55, -10, 110), 50, 2, 1);
  box(wrap(60, -10, 110), 88, 2, 1);
  box(wrap(70, -10, 110), 50, 2, 1);
}




