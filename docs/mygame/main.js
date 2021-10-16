title = "GOAL";

description = `
[Tap] Shot
`;

characters = [
  `
  ccc
cc c c
 cccc
 c  llll
cc  llll
`,
  `
  ccc
cc c c
 cccc
  cc
 c  llll
 c  llll
`,
`
lll
ll l l
llll
l  l
ll  ll
`,
`
lll
ll l l
llll
ll
l  l
l  l
`
];

const G = {
  WIDTH: 100,
  HEIGHT: 150,
  PLAYER_SPAWN_X: 90,
  PLAYER_SPAWN_Y: 90,
  PLAYER_SPEED: 2,

  STAR_SPEED_MIN: 0.5,
  STAR_SPEED_MAX: 1.0,

  PLAYER_FIRE_RATE: 4,
  PLAYER_RUN_OFFSET: 3,

  FBULLET_SPEED: 5
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  theme: "dark",
  isReplayEnabled: true,
  isPlayingBgm: true,
  seed: 2000
};

let stars;
let player;
let enemies;
let enemySpeed;
let shots;
let multiplier;

function update() {
  if (!ticks) {
    stars = times(20, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);
      return {
        pos: vec(posX, posY),
        speed: rnd(0.5, 1.0)
      };
    });
    player = { pos: vec(50, 90), shotTicks: 0 };
    enemies = [];
    shots = [];
    multiplier = 1;
  }

  // display field
  fieldDisplay();

  // spawning enemies
  if (enemies.length === 0) {
    enemySpeed = rnd(1.0, 2.0) * difficulty;
    for (let i = 0; i < 9; i++) {
      const posX = rnd(0, G.WIDTH);
      const posY = -rnd(i * G.HEIGHT * 0.1);
      enemies.push({ pos: vec(posX, posY) });
    }
  }

  // update for star
  stars.forEach((s) => {
    s.pos.y += s.speed;
    s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    color("light_black");
    box(s.pos, 1);
  });

  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  // draw player
  color("black");
  const c = char(addWithCharCode("a", floor(abs(ticks) / 20) % 2), player.pos, { mirror: { x: player.pos.x < 50 ? 1 : -1 } });

  // shot the ball
  player.shotTicks--;
  if (input.isJustPressed) {
    if (input.isJustPressed) {
      player.vx = 0;
    }
    if (player.shotTicks < 0) {
      shots.push({ pos: vec(player.pos), vy: -3 * difficulty });
      player.shotTicks = 10 / difficulty;
    }
  } else if (input.isJustReleased) {
    player.vx = difficulty * 1.2;
  }
  player.pos.x += player.vx - difficulty * 0.1;
  color("black");
  remove(shots, (s) => {
    s.pos.x -= difficulty * 0.1;
    s.pos.y += s.vy;
    const c = box(s.pos, 5, 9).isColliding.rect.black;
    play("coin");
    if (c) {
      addScore(multiplier * 0.2);
    }
    return s.pos.y < 0;
  });

  // draw enemies
  remove(enemies, (e) => {
    e.pos.y += enemySpeed;
    color("red");
    const c = char(addWithCharCode("c", floor((ticks) / 30) % 2), e.pos, { mirror: { x: e.pos.x < 50 ? 1 : -1 } }).isColliding.char.a;
    // check collision with player
    if (c) {
      end();
      play("powerUp");
    }
    return (e.pos.y > G.HEIGHT);
  })



  // draw baseball field
  function fieldDisplay() {
    color("light_green");
    box(50, 75, G.WIDTH, G.HEIGHT);
    color("black");
    rect(40, 10, 19, -11);
    line(35, 10, 65, 10, 3);
    line(0, 140, 100, 140, 3);
    line(35, 10, 35, 0, 3);
    line(65, 10, 65, 0, 3);
    arc(50, 140, 14, 3, 0, -3.15);
    arc(50, 140, 14, 3, 0, 3.15);
  }
}
