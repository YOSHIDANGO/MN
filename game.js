const GAME = {
  width: 960,
  height: 540,
  scrollSpeed: 2.2,
  playerSpeed: 4,
  shotInterval: 9,
  enemyShotInterval: 82,
  areaDuration: 720,
  noteDuration: 280,
  invulnDuration: 90,
  bossMaxHp: 340,
  maxBombs: 3,
  maxLives: 3,
  capsuleChance: 0.35,
  touchStickRadius: 54,
  powerUpNoticeDuration: 110,
};

const STEP_MS = 1000 / 60;
const MAX_UPDATES_PER_FRAME = 5;

const POWER_ORDER = ["SPEED", "NEEDLE", "CAPSULE", "SPRAY", "SHIELD", "HELPER"];

const ASSET_PATHS = {
  player: "assets/player_nurse.png",
  helper: "assets/helper_white_blood_cell.png",
  boss: "assets/boss_cold_virus.png",
  bg_mouth: "assets/bg_mouth.png",
  bg_throat: "assets/bg_throat.png",
  bg_esophagus: "assets/bg_esophagus.png",
  bg_stomach: "assets/bg_stomach.png",
  bg_intestine: "assets/bg_intestine.png",
  bg_nest: "assets/bg_nest.png",
};

const AREAS = [
  {
    id: "mouth",
    name: "口内",
    note: "口の中には多くの細菌がいます。歯みがきやうがいで清潔を保つことが大切です。",
    colorA: "#7d233d",
    colorB: "#ff8ea6",
    accent: "#ffe2ea",
    enemyTypes: ["bacteria", "crumb"],
    gimmick: "bubble",
  },
  {
    id: "throat",
    name: "喉",
    note: "喉の痛みは、ウイルスなどに対して体が炎症反応を起こしているサインです。",
    colorA: "#8f2f3b",
    colorB: "#d45666",
    accent: "#ffcccf",
    enemyTypes: ["virus", "shooterVirus"],
    gimmick: "cough",
  },
  {
    id: "esophagus",
    name: "食道",
    note: "食道は食べ物を胃へ送る通り道です。筋肉の動きで食べ物を運びます。",
    colorA: "#5a274d",
    colorB: "#ad6a87",
    accent: "#ffd5dd",
    enemyTypes: ["debris", "drifter"],
    gimmick: "peristalsis",
  },
  {
    id: "stomach",
    name: "胃",
    note: "胃酸は食べ物の消化や細菌を減らす働きがあります。ただし体内ミッション中のナースには危険です。",
    colorA: "#543824",
    colorB: "#cf8a49",
    accent: "#ffe4ad",
    enemyTypes: ["acidBubble", "foodBlock", "metalShard"],
    gimmick: "acid",
  },
  {
    id: "intestine",
    name: "小腸",
    note: "小腸では栄養が吸収されます。体に必要な栄養を取り込む大切な場所です。",
    colorA: "#6a3b1f",
    colorB: "#c96b40",
    accent: "#ffe0ba",
    enemyTypes: ["virus", "badBacteria", "toxin"],
    gimmick: "villi",
  },
  {
    id: "nest",
    name: "感染源エリア",
    note: "ウイルスは体内で増えることがあります。体は免疫の働きでそれに対抗します。",
    colorA: "#431047",
    colorB: "#b53f6b",
    accent: "#ffd0ef",
    enemyTypes: ["swarmVirus", "shooterVirus", "midVirus"],
    gimmick: "rush",
  },
];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const assets = loadAssets(ASSET_PATHS);

const state = {
  scene: "title",
  frame: 0,
  score: 0,
  highScore: 0,
  areaIndex: 0,
  areaFrame: 0,
  noteTimer: 0,
  areaBannerTimer: 0,
  powerUpNoticeTimer: 0,
  powerUpNoticeText: "",
  hitStopTimer: 0,
  bossWarningTimer: 0,
  bossSpawnQueued: false,
  bossActive: false,
  bossDefeated: false,
  gameOverTimer: 0,
  cameraShake: 0,
  cameraDriftX: 0,
  cameraDriftY: 0,
  damageFlashTimer: 0,
  screenFlashTimer: 0,
  uiNoiseTimer: 0,
  globalScrollBonus: 0,
  scorePopups: [],
  currentBgm: "normal",
  bossHpLag: 0,
  bossDamageFlashTimer: 0,
  learningSummary: [
    "喉の痛みは炎症反応のサイン",
    "胃酸は消化と殺菌に役立つ",
    "小腸では栄養が吸収される",
    "免疫はウイルスなどから体を守る",
  ],
  player: null,
  helper: null,
  boss: null,
  enemies: [],
  playerShots: [],
  enemyShots: [],
  capsules: [],
  particles: [],
  hazards: [],
  touchState: {
    active: false,
    stickId: null,
    shotId: null,
    bombId: null,
    stickBase: { x: 120, y: 410 },
    stick: { x: 120, y: 410, dx: 0, dy: 0 },
    shotPressed: false,
    bombPressed: false,
  },
  keys: {
    up: false,
    down: false,
    left: false,
    right: false,
    shoot: false,
    bomb: false,
    start: false,
  },
};

function makePlayer() {
  return {
    x: 140,
    y: GAME.height / 2,
    w: 30,
    h: 24,
    speed: GAME.playerSpeed,
    lives: GAME.maxLives,
    hp: 1,
    bombs: GAME.maxBombs,
    shotTimer: 0,
    invuln: 0,
    shield: false,
    powerLevel: 0,
    needleLevel: 1,
    capsuleShot: false,
    sprayShot: false,
  };
}

function loadAssets(paths) {
  const loaded = {};
  Object.entries(paths).forEach(([key, src]) => {
    const image = new Image();
    loaded[key] = { image, ready: false, failed: false };
    image.onload = () => {
      loaded[key].ready = true;
    };
    image.onerror = () => {
      loaded[key].failed = true;
    };
    image.src = src;
  });
  return loaded;
}

function drawAsset(key, x, y, w, h) {
  const asset = assets[key];
  if (!asset) return false;
  const imageReady = asset.ready || (asset.image && asset.image.complete && asset.image.naturalWidth > 0);
  if (!imageReady) return false;
  ctx.drawImage(asset.image, x, y, w, h);
  return true;
}

function resetGame() {
  state.scene = "playing";
  state.frame = 0;
  state.score = 0;
  state.areaIndex = 0;
  state.areaFrame = 0;
  state.noteTimer = GAME.noteDuration;
  state.areaBannerTimer = 180;
  state.powerUpNoticeTimer = 0;
  state.powerUpNoticeText = "";
  state.hitStopTimer = 0;
  state.bossWarningTimer = 0;
  state.bossSpawnQueued = false;
  state.bossActive = false;
  state.bossDefeated = false;
  state.gameOverTimer = 0;
  state.cameraShake = 0;
  state.cameraDriftX = 0;
  state.cameraDriftY = 0;
  state.damageFlashTimer = 0;
  state.screenFlashTimer = 0;
  state.uiNoiseTimer = 0;
  state.globalScrollBonus = 0;
  state.scorePopups = [];
  state.currentBgm = "normal";
  state.bossHpLag = GAME.bossMaxHp;
  state.bossDamageFlashTimer = 0;
  state.player = makePlayer();
  state.helper = null;
  state.boss = null;
  state.enemies = [];
  state.playerShots = [];
  state.enemyShots = [];
  state.capsules = [];
  state.particles = [];
  state.hazards = [];
  resetTouchStick();
}

function resetTouchStick() {
  state.touchState.stick = {
    x: 120,
    y: 410,
    dx: 0,
    dy: 0,
  };
  state.touchState.stickBase = { x: 120, y: 410 };
  state.touchState.stickId = null;
  state.touchState.shotId = null;
  state.touchState.bombId = null;
  state.touchState.shotPressed = false;
  state.touchState.bombPressed = false;
}

function getCurrentArea() {
  return AREAS[Math.min(state.areaIndex, AREAS.length - 1)];
}

function getAreaLabel() {
  return `AREA ${state.areaIndex + 1}: ${getCurrentArea().name}`;
}

function update() {
  if (state.hitStopTimer > 0) {
    state.hitStopTimer -= 1;
    return;
  }

  state.frame += 1;
  if (state.scene === "title") {
    return;
  }
  if (state.scene === "gameover" || state.scene === "clear") {
    state.gameOverTimer += 1;
    return;
  }

  const player = state.player;
  player.invuln = Math.max(0, player.invuln - 1);
  player.shotTimer = Math.max(0, player.shotTimer - 1);
  state.noteTimer = Math.max(0, state.noteTimer - 1);
  state.areaBannerTimer = Math.max(0, state.areaBannerTimer - 1);
  state.powerUpNoticeTimer = Math.max(0, state.powerUpNoticeTimer - 1);
  state.bossWarningTimer = Math.max(0, state.bossWarningTimer - 1);
  state.cameraShake = Math.max(0, state.cameraShake - 0.4);
  state.cameraDriftX *= 0.88;
  state.cameraDriftY *= 0.88;
  state.damageFlashTimer = Math.max(0, state.damageFlashTimer - 1);
  state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
  state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
  state.bossDamageFlashTimer = Math.max(0, state.bossDamageFlashTimer - 1);

  if (state.bossSpawnQueued && state.bossWarningTimer === 0 && !state.bossActive) {
    spawnBoss();
  }

  updateCameraDrift();

  updateStageProgress();
  updatePlayer(player);
  updateHelper();
  updateEnemies();
  updateBoss();
  updateShots();
  updateCapsules();
  updateHazards();
  updateParticles();
  updateScorePopups();
  handleCollisions();
  cleanupEntities();
}

function triggerHitStop(frames) {
  state.hitStopTimer = Math.max(state.hitStopTimer, frames);
}

function updateCameraDrift() {
  const area = getCurrentArea();
  const targetX = clamp(state.globalScrollBonus * 1.1, -2, 5) + (state.boss && !state.boss.entered ? 1.5 : 0);
  const targetY = area.id === "stomach" ? Math.sin(state.frame * 0.03) * 0.8 : 0;
  state.cameraDriftX += (targetX - state.cameraDriftX) * 0.08;
  state.cameraDriftY += (targetY - state.cameraDriftY) * 0.08;
}

function updateStageProgress() {
  if (state.bossActive || state.bossSpawnQueued) {
    return;
  }

  state.areaFrame += 1;
  const area = getCurrentArea();
  spawnAreaEnemies(area);
  spawnAreaHazards(area);

  if (state.areaFrame >= GAME.areaDuration) {
    state.areaFrame = 0;
    state.areaIndex += 1;
    if (state.areaIndex >= AREAS.length) {
      startBossWarning();
      return;
    }
    state.noteTimer = GAME.noteDuration;
    state.areaBannerTimer = 180;
  }
}

function startBossWarning() {
  state.bossSpawnQueued = true;
  state.bossWarningTimer = 96;
  state.currentBgm = "warning";
  state.areaIndex = AREAS.length - 1;
  state.areaBannerTimer = 0;
  state.noteTimer = 0;
  state.cameraShake = 6;
}

function spawnBoss() {
  state.bossSpawnQueued = false;
  state.bossActive = true;
  state.currentBgm = "boss";
  state.areaIndex = AREAS.length - 1;
  state.areaBannerTimer = 240;
  state.noteTimer = 200;
  state.cameraShake = 10;
  state.boss = {
    x: GAME.width + 140,
    y: GAME.height / 2,
    w: 132,
    h: 132,
    hp: GAME.bossMaxHp,
    maxHp: GAME.bossMaxHp,
    attackTimer: 0,
    phase: 0,
    dashTimer: 0,
    summonTimer: 0,
    entered: false,
  };
  state.bossHpLag = state.boss.maxHp;
  state.bossDamageFlashTimer = 18;
  state.screenFlashTimer = 8;
}

function updatePlayer(player) {
  const input = getMovementInput();
  const speedBonus = player.speed;
  player.x += input.x * speedBonus;
  player.y += input.y * speedBonus;

  const area = getCurrentArea();
  let topLimit = 42;
  let bottomLimit = GAME.height - 48;

  if (area.id === "esophagus" || area.id === "intestine") {
    topLimit = 68 + Math.sin(state.frame * 0.03) * 10;
    bottomLimit = GAME.height - 72 + Math.sin(state.frame * 0.03 + 1.5) * 10;
  }

  player.x = clamp(player.x, 40, GAME.width * 0.62);
  player.y = clamp(player.y, topLimit, bottomLimit);

  const autoShoot = true;
  const shootHeld = state.keys.shoot || state.touchState.shotPressed;
  if ((autoShoot || shootHeld) && player.shotTimer === 0) {
    firePlayerShot(player);
    player.shotTimer = GAME.shotInterval;
  }

  const bombHeld = state.keys.bomb || state.touchState.bombPressed;
  if (bombHeld) {
    useBomb();
    state.keys.bomb = false;
    state.touchState.bombPressed = false;
  }

  if ((area.id === "esophagus" || area.id === "intestine") && (player.y < topLimit + 10 || player.y > bottomLimit - 10)) {
    if (state.frame % 24 === 0) damagePlayer();
  }
}

function updateHelper() {
  if (!state.helper) return;
  const targetX = state.player.x - 42;
  const targetY = state.player.y + Math.sin(state.frame * 0.12) * 10;
  state.helper.x += (targetX - state.helper.x) * 0.15;
  state.helper.y += (targetY - state.helper.y) * 0.15;
  state.helper.shotTimer = Math.max(0, state.helper.shotTimer - 1);
  const autoShoot = true;
  const shootHeld = state.keys.shoot || state.touchState.shotPressed;
  if ((autoShoot || shootHeld) && state.helper.shotTimer === 0) {
    state.playerShots.push(makeShot(state.helper.x + 8, state.helper.y, 9, 0, 1, "helper"));
    state.helper.shotTimer = 16;
  }
}

function getMovementInput() {
  let x = 0;
  let y = 0;
  if (state.keys.left) x -= 1;
  if (state.keys.right) x += 1;
  if (state.keys.up) y -= 1;
  if (state.keys.down) y += 1;
  x += state.touchState.stick.dx;
  y += state.touchState.stick.dy;
  const length = Math.hypot(x, y);
  return length > 1 ? { x: x / length, y: y / length } : { x, y };
}

function firePlayerShot(player) {
  const shotOriginX = player.x + player.w * 0.94;
  const shotOriginY = player.y - player.h * 0.06;
  state.playerShots.push(makeShot(shotOriginX, shotOriginY, 11, 0, player.needleLevel, "needle"));
  spawnMuzzleFlash(shotOriginX, shotOriginY, "#9ff7ff");
  if (player.needleLevel >= 2) {
    state.playerShots.push(makeShot(shotOriginX, shotOriginY + 6, 11, 0, player.needleLevel, "needle"));
  }
  if (player.capsuleShot) {
    state.playerShots.push(makeShot(shotOriginX + 2, shotOriginY + 3, 8, 0, 4, "capsule"));
  }
  if (player.sprayShot) {
    state.playerShots.push(makeShot(shotOriginX, shotOriginY + 2, 9.5, -1.4, 1, "spray"));
    state.playerShots.push(makeShot(shotOriginX, shotOriginY + 2, 9.5, 1.4, 1, "spray"));
  }
}

function makeShot(x, y, vx, vy, damage, type) {
  return { x, y, vx, vy, damage, type, r: type === "capsule" ? 8 : type === "spray" ? 3 : 4 };
}

function spawnMuzzleFlash(x, y, color) {
  for (let i = 0; i < 5; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.1) * 1.5,
      vy: (Math.random() - 0.5) * 1.4,
      life: 5 + Math.random() * 4,
      color,
      size: 3 + Math.random() * 2,
      kind: i === 0 ? "ring" : "spark",
      alpha: 0.9,
    });
  }
}

function spawnShotHitEffect(x, y) {
  for (let i = 0; i < 7; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2.4,
      vy: (Math.random() - 0.5) * 2.4,
      life: 8 + Math.random() * 6,
      color: i % 2 ? "#a2f6ff" : "#ffffff",
      size: 2 + Math.random() * 2,
      kind: "spark",
      alpha: 0.85,
    });
  }
}

function useBomb() {
  const player = state.player;
  if (player.bombs <= 0 || state.scene !== "playing") return;
  player.bombs -= 1;
  state.enemyShots = [];
  for (const enemy of state.enemies) enemy.hp -= 8;
  if (state.boss) state.boss.hp -= 20;
  state.cameraShake = 14;
  for (let i = 0; i < 26; i += 1) {
    state.particles.push({
      x: state.player.x,
      y: state.player.y,
      vx: Math.cos(i) * (2 + Math.random() * 4),
      vy: Math.sin(i) * (2 + Math.random() * 4),
      life: 28 + Math.random() * 20,
      color: i % 2 ? "#8cefff" : "#fff2a5",
      size: 4 + Math.random() * 6,
    });
  }
}

function spawnAreaEnemies(area) {
  const intervalBase = area.id === "nest" ? 42 : area.id === "throat" ? 58 : 68;
  if (state.frame % intervalBase !== 0) return;
  const pool = area.enemyTypes;
  const type = pool[(Math.random() * pool.length) | 0];
  state.enemies.push(makeEnemy(type));

  if (area.id === "nest" && Math.random() < 0.35) {
    state.enemies.push(makeEnemy("swarmVirus", GAME.width + 90, 120 + Math.random() * 280));
  }
}

function spawnAreaHazards(area) {
  if (area.gimmick === "bubble" && state.frame % 180 === 0) {
    state.hazards.push({
      kind: "bubble",
      x: GAME.width + 20,
      y: 90 + Math.random() * 340,
      vx: -2.5,
      r: 24 + Math.random() * 12,
      life: 520,
    });
  }

  if (area.gimmick === "cough" && state.frame % 220 === 0) {
    state.hazards.push({
      kind: "cough",
      x: GAME.width + 30,
      y: 110 + Math.random() * 280,
      vx: -8,
      w: 130,
      h: 20,
      life: 90,
    });
  }
}

function makeEnemy(type, x = GAME.width + 50, y = 80 + Math.random() * 360) {
  const map = {
    bacteria: { hp: 3, vx: -3.2, vy: 0.6, size: 22, score: 120, shot: false },
    crumb: { hp: 5, vx: -2.4, vy: 0, size: 26, score: 140, shot: false },
    virus: { hp: 4, vx: -3.1, vy: 0.8, size: 22, score: 160, shot: false },
    shooterVirus: { hp: 6, vx: -2.3, vy: 0.9, size: 26, score: 220, shot: true },
    debris: { hp: 4, vx: -4.4, vy: 0, size: 18, score: 180, shot: false },
    drifter: { hp: 3, vx: -3.4, vy: 1.2, size: 18, score: 150, shot: false },
    acidBubble: { hp: 4, vx: -2.8, vy: -0.8, size: 24, score: 170, shot: false },
    foodBlock: { hp: 8, vx: -2, vy: 0, size: 32, score: 240, shot: false },
    metalShard: { hp: 6, vx: -3.6, vy: 0.4, size: 20, score: 200, shot: false },
    badBacteria: { hp: 5, vx: -3, vy: 1.1, size: 24, score: 200, shot: true },
    toxin: { hp: 4, vx: -2.8, vy: 0.7, size: 16, score: 180, shot: true },
    swarmVirus: { hp: 3, vx: -4, vy: 0.6, size: 16, score: 140, shot: false },
    midVirus: { hp: 16, vx: -1.8, vy: 1.1, size: 42, score: 550, shot: true },
  };
  const config = map[type];
  return {
    type,
    x,
    y,
    w: config.size,
    h: config.size,
    hp: config.hp,
    maxHp: config.hp,
    vx: config.vx,
    vy: config.vy,
    score: config.score,
    shot: config.shot,
    timer: 0,
    wave: Math.random() * Math.PI * 2,
  };
}

function updateEnemies() {
  for (const enemy of state.enemies) {
    enemy.timer += 1;
    enemy.x += enemy.vx - getScrollAdjustment();
    enemy.y += Math.sin(enemy.wave + enemy.timer * 0.08) * enemy.vy;

    if (enemy.type === "debris") enemy.y += Math.sin(enemy.timer * 0.18) * 0.8;
    if (enemy.type === "foodBlock") enemy.y += Math.sin(enemy.timer * 0.04) * 0.5;
    if (enemy.type === "midVirus") enemy.y += Math.sin(enemy.timer * 0.06) * 1.6;

    if (enemy.shot && enemy.timer % GAME.enemyShotInterval === 0) {
      const dy = state.player.y - enemy.y;
      const distance = Math.max(1, Math.hypot(state.player.x - enemy.x, dy));
      state.enemyShots.push({
        x: enemy.x - 10,
        y: enemy.y,
        vx: -4.1,
        vy: (dy / distance) * 1.9,
        r: enemy.type === "toxin" ? 8 : 5,
        type: enemy.type === "toxin" ? "toxin" : "virus",
      });
    }
  }
}

function updateBoss() {
  if (!state.bossActive || !state.boss) return;
  const boss = state.boss;
  state.bossHpLag += (boss.hp - state.bossHpLag) * 0.08;
  if (!boss.entered) {
    boss.x -= 1.5;
    if (boss.x <= 790) boss.entered = true;
    return;
  }

  boss.attackTimer += 1;
  boss.summonTimer += 1;
  boss.y += Math.sin(state.frame * 0.03) * 1.7;
  boss.y = clamp(boss.y, 100, GAME.height - 100);

  const aggressive = boss.hp <= boss.maxHp / 2;
  const spreadInterval = aggressive ? 54 : 84;
  const summonInterval = aggressive ? 170 : 240;
  const dashInterval = aggressive ? 240 : 330;

  if (boss.attackTimer % spreadInterval === 0) {
    for (let i = -2; i <= 2; i += 1) {
      state.enemyShots.push({
        x: boss.x - 50,
        y: boss.y + i * 12,
        vx: -4.1,
        vy: i * 0.75,
        r: 7,
        type: "boss",
      });
    }
  }

  if (boss.summonTimer % summonInterval === 0) {
    state.enemies.push(makeEnemy("swarmVirus", boss.x - 80, boss.y - 36));
    state.enemies.push(makeEnemy("swarmVirus", boss.x - 80, boss.y + 36));
  }

  if (boss.attackTimer % dashInterval === 0) {
    boss.dashTimer = 72;
  }

  if (boss.dashTimer > 0) {
    boss.dashTimer -= 1;
    if (boss.dashTimer > 36) {
      boss.x -= 0.5;
    } else {
      boss.x -= 9;
      if (boss.x < 560) boss.x = 560;
    }
    if (boss.dashTimer === 0) boss.x = 790;
  }

  if (boss.hp <= 0) {
    for (let i = 0; i < 5; i += 1) {
      explodeAt(boss.x + (Math.random() - 0.5) * 90, boss.y + (Math.random() - 0.5) * 90, 40 + i * 6, i % 2 ? "#ffffff" : "#9ff7ff");
    }
    state.boss = null;
    state.bossActive = false;
    state.bossDefeated = true;
    state.currentBgm = "clear";
    state.cameraShake = 18;
    state.screenFlashTimer = 18;
    triggerHitStop(8);
    state.scene = "clear";
  }
}

function updateShots() {
  for (const shot of state.playerShots) {
    shot.x += shot.vx;
    shot.y += shot.vy;
  }
  for (const shot of state.enemyShots) {
    shot.x += shot.vx;
    shot.y += shot.vy;
  }
}

function updateCapsules() {
  for (const capsule of state.capsules) {
    capsule.x -= 2.1;
    capsule.y += Math.sin((state.frame + capsule.seed) * 0.08) * 1.1;
  }
}

function updateHazards() {
  const area = getCurrentArea();
  for (const hazard of state.hazards) {
    hazard.life -= 1;
    hazard.x += hazard.vx;
    if (hazard.kind === "bubble") {
      hazard.y += Math.sin((state.frame + hazard.r) * 0.05) * 0.7;
      hazard.r += Math.sin(state.frame * 0.04 + hazard.x * 0.01) * 0.03;
    }
  }

  if (area.id === "stomach") {
    const acidTop = GAME.height - 58 - (Math.sin(state.frame * 0.06) * 10 + 14);
    if (state.player.y + state.player.h / 2 > acidTop && state.frame % 18 === 0) {
      damagePlayer();
    }
  }

  if (area.id === "esophagus" && state.frame % 240 === 0) {
    state.globalScrollBonus = 2.4;
  }
  state.globalScrollBonus *= 0.97;
}

function updateParticles() {
  for (const particle of state.particles) {
    particle.life -= 1;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.98;
    particle.vy *= 0.98;
  }
  if (area.id === "intestine") {
    for (let i = 0; i < 10; i += 1) {
      const x = (i * 110 - state.frame * 1.4) % (GAME.width + 80);
      const y = 90 + (i % 5) * 74 + Math.sin(state.frame * 0.03 + i) * 10;
      ctx.fillStyle = "rgba(222, 255, 236, 0.08)";
      ctx.beginPath();
      ctx.arc(x, y, 4 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function updateScorePopups() {
  for (const popup of state.scorePopups) {
    popup.life -= 1;
    popup.y -= 0.45;
  }
  state.scorePopups = state.scorePopups.filter((popup) => popup.life > 0);
}

function handleCollisions() {
  const player = state.player;
  for (const shot of state.playerShots) {
    for (const enemy of state.enemies) {
      if (hitCircleRect(shot.x, shot.y, shot.r, toRect(enemy))) {
        shot.hit = true;
        enemy.hp -= shot.damage;
        spawnShotHitEffect(shot.x, shot.y);
        triggerHitStop(2);
      }
    }
    if (state.boss && hitCircleRect(shot.x, shot.y, shot.r, toRect(state.boss))) {
      shot.hit = true;
      state.boss.hp -= shot.damage;
      spawnShotHitEffect(shot.x, shot.y);
      state.bossDamageFlashTimer = 8;
      triggerHitStop(4);
    }
  }

  for (const enemy of state.enemies) {
    if (rectsOverlap(playerRect(player), toRect(enemy))) {
      enemy.hp = 0;
      damagePlayer();
    }
  }

  if (state.boss && rectsOverlap(playerRect(player), toRect(state.boss))) {
    damagePlayer();
    if (state.boss.dashTimer > 0) {
      state.cameraShake = Math.max(state.cameraShake, 12);
    }
  }

  for (const shot of state.enemyShots) {
    if (hitCircleRect(shot.x, shot.y, shot.r, playerRect(player))) {
      shot.hit = true;
      damagePlayer();
    }
  }

  for (const capsule of state.capsules) {
    if (hitCircleRect(capsule.x, capsule.y, capsule.r, playerRect(player))) {
      capsule.hit = true;
      applyPowerUp();
    }
  }

  for (const hazard of state.hazards) {
    if (hazard.kind === "bubble" && hitCircleRect(hazard.x, hazard.y, hazard.r, playerRect(player))) {
      player.x -= 3.5;
    }
    if (hazard.kind === "cough" && rectsOverlap(playerRect(player), { x: hazard.x - hazard.w / 2, y: hazard.y - hazard.h / 2, w: hazard.w, h: hazard.h })) {
      player.x -= 6;
    }
  }
}

function cleanupEntities() {
  state.playerShots = state.playerShots.filter((s) => !s.hit && s.x < GAME.width + 40 && s.y > -30 && s.y < GAME.height + 30);
  state.enemyShots = state.enemyShots.filter((s) => !s.hit && s.x > -40 && s.y > -40 && s.y < GAME.height + 40);
  state.capsules = state.capsules.filter((c) => !c.hit && c.x > -40);
  state.hazards = state.hazards.filter((h) => h.life > 0 && h.x > -160);
  state.particles = state.particles.filter((p) => p.life > 0);

  state.enemies = state.enemies.filter((enemy) => {
    if (enemy.hp <= 0) {
      state.score += enemy.score;
      state.scorePopups.push({
        x: enemy.x,
        y: enemy.y - 8,
        text: `+${enemy.score}`,
        life: 42,
      });
      explodeAt(enemy.x, enemy.y, enemy.w * 0.5, enemy.w >= 40 ? "#ffffff" : "#9ff7ff");
      triggerHitStop(enemy.w >= 40 ? 4 : 3);
      state.cameraShake = Math.max(state.cameraShake, enemy.w >= 40 ? 8 : 4);
      if (Math.random() < GAME.capsuleChance) {
        state.capsules.push({ x: enemy.x, y: enemy.y, r: 10, seed: Math.random() * 999 });
      }
      return false;
    }
    return enemy.x > -80 && enemy.y > -60 && enemy.y < GAME.height + 60;
  });
}

function applyPowerUp() {
  const player = state.player;
  const next = POWER_ORDER[player.powerLevel % POWER_ORDER.length];
  player.powerLevel += 1;
  state.score += 100;
  state.powerUpNoticeText = `POWER UP: ${next}`;
  state.powerUpNoticeTimer = GAME.powerUpNoticeDuration;
  if (next === "SPEED") player.speed = Math.min(7.2, player.speed + 0.6);
  if (next === "NEEDLE") player.needleLevel = Math.min(2, player.needleLevel + 1);
  if (next === "CAPSULE") player.capsuleShot = true;
  if (next === "SPRAY") player.sprayShot = true;
  if (next === "SHIELD") player.shield = true;
  if (next === "HELPER" && !state.helper) {
    state.helper = { x: player.x - 24, y: player.y + 12, shotTimer: 0 };
  }
}

function damagePlayer() {
  const player = state.player;
  if (player.invuln > 0) return;
  if (player.shield) {
    player.shield = false;
    player.invuln = 36;
    explodeAt(player.x, player.y, 10, "#9af7ff");
    return;
  }
  player.lives -= 1;
  player.invuln = GAME.invulnDuration;
  state.cameraShake = 10;
  state.damageFlashTimer = 10;
  state.uiNoiseTimer = 12;
  state.screenFlashTimer = 6;
  player.x = Math.max(40, player.x - 14);
  explodeAt(player.x, player.y, 18, "#ffffff");
  if (player.lives <= 0) {
    state.scene = "gameover";
  }
}

function explodeAt(x, y, spread, color) {
  const intensity = spread > 30 ? 2.2 : spread > 18 ? 1.5 : 1;
  const count = Math.floor(10 * intensity);
  state.particles.push({
    x,
    y,
    vx: 0,
    vy: 0,
    life: 10 + intensity * 2,
    color: "#ffffff",
    size: 6 + intensity * 2,
    kind: "ring",
    alpha: 0.85,
  });
  for (let i = 0; i < count; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * spread * 0.3,
      vy: (Math.random() - 0.5) * spread * 0.3,
      life: 18 + Math.random() * 20,
      color: i % 3 === 0 ? "#ffffff" : color,
      size: 2 + Math.random() * 4,
      kind: i % 2 === 0 ? "spark" : "burst",
      alpha: 0.7 + Math.random() * 0.2,
    });
  }
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, GAME.width, GAME.height);
  applyCameraShake();
  drawBackground();
  drawAreaBackground();
  drawNonDangerEffects();
  drawHazards();
  drawParticles();
  drawEnemiesLayer();
  drawEnemyShotsLayer();
  drawItemsLayer();
  drawScorePopups();
  drawPlayerShotsLayer();
  drawHelpersLayer();
  drawPlayerLayer();
  drawUi();
  drawOverlays();
  ctx.restore();
}

function applyCameraShake() {
  if (state.damageFlashTimer > 0) {
    const zoom = 1 + state.damageFlashTimer * 0.002;
    ctx.translate(GAME.width / 2, GAME.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-GAME.width / 2, -GAME.height / 2);
  }
  if (state.cameraDriftX !== 0 || state.cameraDriftY !== 0) {
    ctx.translate(state.cameraDriftX, state.cameraDriftY);
  }
  if (state.cameraShake <= 0) return;
  const dx = (Math.random() - 0.5) * state.cameraShake;
  const dy = (Math.random() - 0.5) * state.cameraShake;
  ctx.translate(dx, dy);
}

function drawBackground() {
  const area = getCurrentArea();
  const grad = ctx.createLinearGradient(0, 0, 0, GAME.height);
  grad.addColorStop(0, area.colorA);
  grad.addColorStop(1, area.colorB);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, GAME.width, GAME.height);

  for (let i = 0; i < 22; i += 1) {
    const x = (GAME.width - ((state.frame * 0.45 + i * 47) % (GAME.width + 200))) + 80;
    const y = (i * 87 + Math.sin((state.frame + i * 12) * 0.01) * 30) % GAME.height;
    ctx.fillStyle = "rgba(255,255,255,0.025)";
    ctx.beginPath();
    ctx.arc(x, y, 3 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAreaBackground() {
  const area = getCurrentArea();
  const hasBackgroundAsset = drawAreaBackgroundAsset(area);
  drawAreaParallaxBack(area);
  if (!hasBackgroundAsset) {
    if (area.id === "mouth") drawMouthBackground(area);
    if (area.id === "throat") drawThroatBackground(area);
    if (area.id === "esophagus") drawEsophagusBackground(area);
    if (area.id === "stomach") drawStomachBackground(area);
    if (area.id === "intestine") drawIntestineBackground(area);
    if (area.id === "nest") drawNestBackground(area);
  }
  drawAreaParallaxFront(area);
}

function drawAreaBackgroundAsset(area) {
  const map = {
    mouth: "bg_mouth",
    throat: "bg_throat",
    esophagus: "bg_esophagus",
    stomach: "bg_stomach",
    intestine: "bg_intestine",
    nest: "bg_nest",
  };
  const key = map[area.id];
  if (!key) return false;
  ctx.save();
  ctx.globalAlpha = 0.78;
  const drawn = drawAsset(key, 0, 0, GAME.width, GAME.height);
  ctx.restore();
  return drawn;
}

function drawAreaParallaxBack(area) {
  ctx.save();
  if (area.id === "mouth") {
    ctx.fillStyle = "rgba(255, 221, 231, 0.08)";
    for (let i = 0; i < 5; i += 1) {
      const x = i * 240 - ((state.frame * 0.45) % 240);
      ctx.beginPath();
      ctx.ellipse(x + 120, 220 + Math.sin(i + state.frame * 0.012) * 16, 170, 96, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (area.id === "throat") {
    ctx.strokeStyle = "rgba(255, 206, 214, 0.08)";
    ctx.lineWidth = 20;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, 110 + i * 120);
      for (let x = 0; x <= GAME.width; x += 30) {
        ctx.lineTo(x, 108 + i * 120 + Math.sin((x + state.frame * 0.9 + i * 40) * 0.014) * 24);
      }
      ctx.stroke();
    }
  } else if (area.id === "esophagus") {
    ctx.fillStyle = "rgba(255, 233, 240, 0.06)";
    for (let i = 0; i < 6; i += 1) {
      const x = i * 180 - ((state.frame * 0.8) % 180);
      ctx.fillRect(x, 102 + Math.sin(i + state.frame * 0.02) * 18, 68, 320);
    }
  } else if (area.id === "stomach") {
    ctx.fillStyle = "rgba(255, 226, 140, 0.06)";
    for (let i = 0; i < 4; i += 1) {
      const x = i * 260 - ((state.frame * 0.55) % 260);
      ctx.beginPath();
      ctx.ellipse(x + 120, 220 + Math.sin(i + state.frame * 0.016) * 26, 180, 104, 0.12, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (area.id === "intestine") {
    ctx.fillStyle = "rgba(255, 229, 198, 0.08)";
    for (let i = 0; i < 5; i += 1) {
      const y = 78 + i * 86;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= GAME.width; x += 24) {
        ctx.lineTo(x, y + Math.sin((x + state.frame * 1.05 + i * 54) * 0.022) * 22);
      }
      ctx.lineTo(GAME.width, y + 46);
      ctx.lineTo(0, y + 46);
      ctx.fill();
    }
  } else if (area.id === "nest") {
    ctx.fillStyle = "rgba(255, 110, 188, 0.07)";
    for (let i = 0; i < 8; i += 1) {
      const x = i * 160 - ((state.frame * 0.7) % 160);
      ctx.beginPath();
      ctx.arc(x + 50, 70 + (i % 3) * 140, 50 + (i % 2) * 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawAreaParallaxFront(area) {
  ctx.save();
  if (area.id === "stomach") {
    drawStomachForegroundVeil();
  }
  if (area.id === "intestine") {
    ctx.fillStyle = "rgba(255, 244, 226, 0.08)";
    for (let i = 0; i < 4; i += 1) {
      const x = i * 260 - ((state.frame * 1.55) % 260);
      ctx.beginPath();
      ctx.ellipse(x + 120, 180 + (i % 2) * 160, 70, 210, 0.18, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (area.id === "mouth" || area.id === "throat" || area.id === "esophagus") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    for (let i = 0; i < 3; i += 1) {
      const x = i * 360 - ((state.frame * 1.45) % 360);
      ctx.beginPath();
      ctx.ellipse(x + 90, 270, 58, 240, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (area.id === "nest") {
    ctx.strokeStyle = "rgba(255, 170, 232, 0.08)";
    ctx.lineWidth = 18;
    for (let i = 0; i < 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, 120 + i * 210);
      for (let x = 0; x <= GAME.width; x += 36) {
        ctx.lineTo(x, 124 + i * 210 + Math.sin((x + state.frame * 1.8 + i * 70) * 0.018) * 32);
      }
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawStomachForegroundVeil() {
  ctx.fillStyle = "rgba(255, 236, 178, 0.1)";
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 24) {
    const y = GAME.height - 118 + Math.sin((x + state.frame * 1.8) * 0.018) * 10 + Math.sin((x + state.frame * 0.8) * 0.042) * 5;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 250, 220, 0.05)";
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 20) {
    const y = GAME.height - 94 + Math.sin((x + state.frame * 2.4) * 0.024) * 8;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
}

function drawMouthBackground(area) {
  for (let i = 0; i < 10; i += 1) {
    const x = i * 108 - ((state.frame * 1.2) % 108);
    ctx.fillStyle = "rgba(255, 247, 249, 0.42)";
    ctx.beginPath();
    ctx.moveTo(x + 18, 0);
    ctx.lineTo(x + 48, 52);
    ctx.lineTo(x + 78, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 18, GAME.height);
    ctx.lineTo(x + 48, GAME.height - 52);
    ctx.lineTo(x + 78, GAME.height);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "rgba(243, 118, 140, 0.18)";
  ctx.beginPath();
  ctx.ellipse(430, 420, 410, 78, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 153, 181, 0.12)";
  ctx.beginPath();
  ctx.ellipse(470, 412, 290, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 226, 234, 0.18)";
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.arc(110 + i * 110 - ((state.frame * 1.2) % 110), 88 + (i % 2) * 120, 8 + (i % 3) * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawThroatBackground(area) {
  ctx.fillStyle = "rgba(255, 198, 206, 0.16)";
  for (let i = 0; i < 6; i += 1) {
    const x = i * 150 - ((state.frame * 1.8) % 150);
    ctx.beginPath();
    ctx.ellipse(x, GAME.height / 2, 120, 220 + Math.sin(i + state.frame * 0.03) * 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(255, 145, 145, 0.14)";
  ctx.lineWidth = 12;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, 90 + i * 100);
    ctx.bezierCurveTo(260, 80 + i * 90, 640, 120 + i * 90, GAME.width, 100 + i * 96);
    ctx.stroke();
  }
  for (let i = 0; i < 6; i += 1) {
    const pulse = 12 + Math.sin(state.frame * 0.08 + i) * 4;
    ctx.fillStyle = "rgba(196, 34, 56, 0.12)";
    ctx.beginPath();
    ctx.arc(70 + i * 96, 120 + (i % 4) * 84, pulse, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEsophagusBackground(area) {
  ctx.strokeStyle = "rgba(255, 224, 230, 0.22)";
  ctx.lineWidth = 20;
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    for (let x = 0; x <= GAME.width; x += 24) {
      const y = i === 0
        ? 80 + Math.sin((x + state.frame * 4) * 0.024) * 34
        : 458 + Math.sin((x + state.frame * 4 + 130) * 0.024) * 34;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255, 245, 250, 0.08)";
  for (let i = 0; i < 6; i += 1) {
    const x = i * 150 - ((state.frame * 3.2) % 150);
    ctx.fillRect(x, 120, 36, 300);
  }
  ctx.fillStyle = "rgba(255, 213, 221, 0.1)";
  for (let i = 0; i < 8; i += 1) {
    const x = i * 130 - ((state.frame * 2.7) % 130);
    ctx.fillRect(x, 150 + Math.sin(i + state.frame * 0.05) * 110, 26, 18);
  }
}

function drawStomachBackground(area) {
  ctx.fillStyle = "rgba(255, 204, 139, 0.12)";
  ctx.beginPath();
  ctx.ellipse(500, 250, 330, 180, 0.08, 0, Math.PI * 2);
  ctx.fill();
  const acidY = GAME.height - 54 - (Math.sin(state.frame * 0.06) * 10 + 14);
  ctx.fillStyle = "rgba(229, 230, 110, 0.72)";
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 22) {
    ctx.lineTo(x, acidY + Math.sin((x + state.frame * 4) * 0.06) * 8);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 180, 0.9)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let x = 0; x <= GAME.width; x += 22) {
    const y = acidY + Math.sin((x + state.frame * 4) * 0.06) * 8;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawIntestineBackground(area) {
  const pulse = Math.sin(state.frame * 0.05) * 7;
  ctx.fillStyle = "rgba(255, 214, 178, 0.14)";
  for (let i = 0; i < 6; i += 1) {
    const y = 64 + i * 56;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= GAME.width; x += 20) {
      ctx.lineTo(x, y + Math.sin((x + state.frame * 3.8 + i * 26) * 0.06) * (16 + pulse * 0.18));
    }
    ctx.lineTo(GAME.width, y + 34);
    ctx.lineTo(0, y + 34);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(255, 240, 220, 0.24)";
  for (let i = 0; i < 14; i += 1) {
    const x = i * 54 - ((state.frame * 2.1) % 54);
    const topHeight = 26 + (i % 4) * 8 + pulse * 0.24;
    const bottomHeight = 24 + ((i + 2) % 4) * 9 + pulse * 0.22;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 12, topHeight);
    ctx.lineTo(x + 24, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 10, GAME.height);
    ctx.lineTo(x + 22, GAME.height - bottomHeight);
    ctx.lineTo(x + 34, GAME.height);
    ctx.closePath();
    ctx.fill();
  }
}

function drawNestBackground(area) {
  ctx.fillStyle = "rgba(255, 102, 128, 0.08)";
  for (let i = 0; i < 18; i += 1) {
    const x = 80 + ((i * 118 - state.frame * 1.6) % (GAME.width + 120));
    const y = 40 + ((i * 47) % 420);
    ctx.beginPath();
    ctx.arc(x, y, 24 + (i % 4) * 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(255, 160, 220, 0.18)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, i * 30 + (state.frame % 30));
    ctx.lineTo(GAME.width, i * 30 + 14 + ((state.frame * 2) % 30));
    ctx.stroke();
  }
  for (let i = 0; i < 6; i += 1) {
    const x = 120 + i * 96 - ((state.frame * 2.8) % 96);
    ctx.fillStyle = "rgba(97, 5, 73, 0.16)";
    ctx.beginPath();
    ctx.arc(x, 90 + (i % 3) * 130, 34, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNonDangerEffects() {
  const area = getCurrentArea();
  if (area.id === "mouth") {
    ctx.fillStyle = "rgba(180, 235, 245, 0.08)";
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(140 + i * 180 - ((state.frame * 0.8) % 160), 120 + (i % 2) * 140, 12 + (i % 2) * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (area.id === "throat" || area.id === "esophagus" || area.id === "intestine") {
    for (let i = 0; i < 8; i += 1) {
      const x = GAME.width - ((state.frame * (1.6 + (i % 3) * 0.28) + i * 110) % (GAME.width + 90));
      const y = 70 + ((i * 57 + Math.sin(state.frame * 0.04 + i) * 22) % 390);
      ctx.fillStyle = i % 3 === 0 ? "rgba(255, 238, 238, 0.16)" : "rgba(255, 196, 210, 0.1)";
      ctx.beginPath();
      ctx.ellipse(x, y, 7 + (i % 2) * 2, 4 + (i % 2), 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (area.id === "stomach") {
    for (let i = 0; i < 4; i += 1) {
      const x = 180 + i * 180 - ((state.frame * 1.1) % 120);
      const y = 380 + Math.sin(state.frame * 0.05 + i) * 18;
      ctx.fillStyle = "rgba(235, 255, 155, 0.12)";
      ctx.beginPath();
      ctx.arc(x, y, 10 + (i % 2) * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 6; i += 1) {
      const x = 120 + i * 150 - ((state.frame * 1.35) % 150);
      const y = 332 + Math.sin(state.frame * 0.045 + i * 0.8) * 16;
      ctx.fillStyle = "rgba(255, 248, 180, 0.1)";
      ctx.beginPath();
      ctx.arc(x, y, 6 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 214, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
  if (area.id === "intestine") {
    ctx.fillStyle = "rgba(255, 246, 232, 0.08)";
    for (let i = 0; i < 7; i += 1) {
      const x = GAME.width - ((state.frame * 1.1 + i * 132) % (GAME.width + 80));
      const y = 96 + (i * 52) % 320 + Math.sin(state.frame * 0.03 + i) * 10;
      ctx.beginPath();
      ctx.arc(x, y, 3 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawHazards() {
  const area = getCurrentArea();
  if (area.id === "stomach") {
    drawAcidHazardZone();
  }
  for (const hazard of state.hazards) {
    if (hazard.kind === "bubble") {
      ctx.fillStyle = "rgba(140, 232, 255, 0.2)";
      ctx.strokeStyle = "rgba(214, 251, 255, 0.5)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, hazard.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    if (hazard.kind === "cough") {
      ctx.fillStyle = "rgba(255, 236, 156, 0.38)";
      ctx.fillRect(hazard.x - hazard.w / 2, hazard.y - hazard.h / 2, hazard.w, hazard.h);
      ctx.strokeStyle = "rgba(255, 157, 70, 0.95)";
      ctx.lineWidth = 4;
      ctx.strokeRect(hazard.x - hazard.w / 2, hazard.y - hazard.h / 2, hazard.w, hazard.h);
      ctx.strokeStyle = "rgba(255, 157, 70, 0.85)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i += 1) {
        const arrowX = hazard.x - hazard.w / 2 + 22 + i * 34;
        ctx.beginPath();
        ctx.moveTo(arrowX + 10, hazard.y);
        ctx.lineTo(arrowX - 4, hazard.y - 7);
        ctx.lineTo(arrowX - 4, hazard.y + 7);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}

function drawAcidHazardZone() {
  const acidY = GAME.height - 54 - (Math.sin(state.frame * 0.06) * 10 + 14);
  ctx.fillStyle = "rgba(219, 255, 82, 0.34)";
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 18) {
    ctx.lineTo(x, acidY + Math.sin((x + state.frame * 4) * 0.06) * 8);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 246, 130, 0.98)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let x = 0; x <= GAME.width; x += 18) {
    const y = acidY + Math.sin((x + state.frame * 4) * 0.06) * 8;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawEnemiesLayer() {
  if (state.scene === "title") return;
  for (const enemy of state.enemies) drawEnemy(enemy);
  if (state.boss) drawBoss(state.boss);
}

function drawEnemyShotsLayer() {
  if (state.scene === "title") return;
  for (const shot of state.enemyShots) drawEnemyShot(shot);
}

function drawItemsLayer() {
  if (state.scene === "title") return;
  for (const capsule of state.capsules) drawCapsule(capsule);
}

function drawPlayerShotsLayer() {
  if (state.scene === "title") return;
  for (const shot of state.playerShots) drawPlayerShot(shot);
}

function drawHelpersLayer() {
  if (state.scene === "title") return;
  if (state.helper) drawHelper(state.helper);
}

function drawPlayerLayer() {
  if (state.scene === "title") return;
  drawPlayer(state.player);
}

function drawParticles() {
  if (state.scene === "title") return;
  for (const particle of state.particles) drawParticle(particle);
}

function drawScorePopups() {
  if (state.scene === "title") return;
  for (const popup of state.scorePopups) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, popup.life / 24);
    ctx.fillStyle = "#8ef6ff";
    ctx.font = "bold 14px monospace";
    ctx.fillText(popup.text, popup.x - 16, popup.y);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(popup.text, popup.x - 17, popup.y - 1);
    ctx.restore();
  }
}

function drawPlayer(player) {
  if (drawPlayerAsset(player)) {
    return;
  }
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.scale(1.18, 1.18);
  if (player.invuln > 0 && Math.floor(player.invuln / 4) % 2 === 0) ctx.globalAlpha = 0.45;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-13, -12, 24, 24);
  ctx.fillStyle = "#ffe4ec";
  ctx.fillRect(-3, -20, 12, 6);
  ctx.fillStyle = "#f69ab0";
  ctx.fillRect(-4, -15, 10, 6);
  ctx.fillStyle = "#523544";
  ctx.fillRect(-8, -4, 4, 4);
  ctx.fillRect(-8, 3, 4, 4);
  ctx.fillStyle = "#f69ab0";
  ctx.fillRect(-1, -2, 3, 10);
  ctx.fillStyle = "#7fdfff";
  ctx.fillRect(10, -4, 19, 8);
  ctx.fillStyle = "#d8fbff";
  ctx.fillRect(24, -1, 8, 2);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-2, 12, 6, 6);
  if (player.shield) {
    ctx.strokeStyle = "rgba(144, 252, 255, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHelper(helper) {
  if (drawHelperAsset(helper)) {
    return;
  }
  ctx.strokeStyle = "#9cefff";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(helper.x, helper.y, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(helper.x, helper.y, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d6ebff";
  ctx.beginPath();
  ctx.arc(helper.x + 4, helper.y - 3, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#263040";
  ctx.beginPath();
  ctx.arc(helper.x - 4, helper.y - 2, 2.1, 0, Math.PI * 2);
  ctx.arc(helper.x + 4, helper.y - 2, 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#263040";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.arc(helper.x, helper.y + 2, 5, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

function drawPlayerAsset(player) {
  ctx.save();
  ctx.translate(player.x, player.y);
  if (player.invuln > 0 && Math.floor(player.invuln / 4) % 2 === 0) ctx.globalAlpha = 0.45;
  const drawWidth = 78;
  const drawHeight = 48;
  const drawn = drawAsset("player", -36, -24, drawWidth, drawHeight);
  if (!drawn) {
    ctx.restore();
    return false;
  }
  if (player.shield) {
    ctx.strokeStyle = "rgba(144, 252, 255, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
  return true;
}

function drawHelperAsset(helper) {
  ctx.save();
  const drawn = drawAsset("helper", helper.x - 22, helper.y - 22, 44, 44);
  if (!drawn) {
    ctx.restore();
    return false;
  }
  ctx.strokeStyle = "#9cefff";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(helper.x, helper.y, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  return true;
}

function drawEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.scale(getEnemyDrawScale(enemy), getEnemyDrawScale(enemy));
  if (enemy.type === "bacteria") drawBacteriaEnemy(enemy);
  else if (enemy.type === "crumb") drawCrumbEnemy(enemy);
  else if (enemy.type === "virus") drawVirusEnemy(enemy, false);
  else if (enemy.type === "shooterVirus") drawVirusEnemy(enemy, true);
  else if (enemy.type === "debris") drawDebrisEnemy(enemy);
  else if (enemy.type === "drifter") drawDrifterEnemy(enemy);
  else if (enemy.type === "acidBubble") drawAcidBubbleEnemy(enemy);
  else if (enemy.type === "foodBlock") drawFoodBlockEnemy(enemy);
  else if (enemy.type === "metalShard") drawMetalShardEnemy(enemy);
  else if (enemy.type === "badBacteria") drawBadBacteriaEnemy(enemy);
  else if (enemy.type === "toxin") drawToxinEnemy(enemy);
  else if (enemy.type === "swarmVirus") drawSwarmVirusEnemy(enemy);
  else if (enemy.type === "midVirus") drawMidVirusEnemy(enemy);
  else {
    ctx.fillStyle = "#b7d1db";
    ctx.fillRect(-enemy.w / 2, -enemy.h / 2, enemy.w, enemy.h);
  }
  ctx.restore();
}

function getEnemyDrawScale(enemy) {
  if (enemy.type === "swarmVirus") return 1.28;
  if (enemy.type === "midVirus") return 1.16;
  if (enemy.type === "foodBlock") return 1.18;
  return 1.24;
}

function drawVirusSpikes(radius, spike, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * (radius - 2), Math.sin(angle) * (radius - 2));
    ctx.lineTo(Math.cos(angle) * (radius + spike), Math.sin(angle) * (radius + spike));
    ctx.stroke();
  }
}

function outlineCurrentShape(strokeStyle, lineWidth) {
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawBacteriaEnemy(enemy) {
  ctx.fillStyle = "#98ef8e";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2, enemy.h / 2 - 3, 0, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#132014", 3);
  ctx.fillStyle = "#fff9fb";
  for (let i = -1; i <= 1; i += 1) {
    ctx.fillRect(-8 + i * 6, -2, 4, 4);
  }
  ctx.fillStyle = "#1d2516";
  ctx.fillRect(-5, -4, 3, 3);
  ctx.fillRect(2, -4, 3, 3);
}

function drawCrumbEnemy(enemy) {
  ctx.fillStyle = "#c08a4f";
  ctx.beginPath();
  ctx.moveTo(-enemy.w / 2, -4);
  ctx.lineTo(-4, -enemy.h / 2);
  ctx.lineTo(enemy.w / 2 - 3, -2);
  ctx.lineTo(enemy.w / 2 - 8, enemy.h / 2 - 4);
  ctx.lineTo(-enemy.w / 2 + 4, enemy.h / 2);
  ctx.closePath();
  ctx.fill();
  outlineCurrentShape("#5f3817", 3);
  ctx.fillStyle = "#966438";
  ctx.fillRect(-4, -3, 6, 5);
}

function drawVirusEnemy(enemy, shooter) {
  ctx.fillStyle = shooter ? "#e34764" : "#ff6c80";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#fff4f8", 3);
  drawVirusSpikes(enemy.w / 2, shooter ? 11 : 8, "#ffd0dd");
  if (shooter) {
    ctx.fillStyle = "#fff3f6";
    ctx.beginPath();
    ctx.arc(-6, -4, 4, 0, Math.PI * 2);
    ctx.arc(6, -4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#30131f";
    ctx.beginPath();
    ctx.arc(-6, -4, 1.8, 0, Math.PI * 2);
    ctx.arc(6, -4, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#30131f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 4, 6, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }
}

function drawDebrisEnemy(enemy) {
  ctx.rotate(0.4);
  ctx.fillStyle = "#adb6c3";
  ctx.beginPath();
  ctx.moveTo(-enemy.w / 2, 2);
  ctx.lineTo(-2, -enemy.h / 2);
  ctx.lineTo(enemy.w / 2, -4);
  ctx.lineTo(5, enemy.h / 2);
  ctx.closePath();
  ctx.fill();
  outlineCurrentShape("#25313c", 3);
  ctx.fillStyle = "#dde4ee";
  ctx.fillRect(-3, -5, 8, 4);
}

function drawDrifterEnemy(enemy) {
  ctx.rotate(-0.35);
  ctx.fillStyle = "#e7d3de";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2 + 8, enemy.h / 2 - 6, 0, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#604552", 3);
}

function drawAcidBubbleEnemy(enemy) {
  ctx.fillStyle = "rgba(255, 247, 108, 0.82)";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 210, 0.98)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2 - 2, 0, Math.PI * 2);
  ctx.stroke();
}

function drawFoodBlockEnemy(enemy) {
  ctx.fillStyle = "#d08e5a";
  ctx.fillRect(-enemy.w / 2, -enemy.h / 2, enemy.w, enemy.h);
  ctx.strokeStyle = "#5f3817";
  ctx.lineWidth = 3;
  ctx.strokeRect(-enemy.w / 2, -enemy.h / 2, enemy.w, enemy.h);
  ctx.fillStyle = "#9e5f31";
  ctx.fillRect(-enemy.w / 2 + 4, -enemy.h / 2 + 6, enemy.w - 8, 8);
}

function drawMetalShardEnemy(enemy) {
  ctx.fillStyle = "#ced6df";
  ctx.beginPath();
  ctx.moveTo(-enemy.w / 2, 2);
  ctx.lineTo(-2, -enemy.h / 2);
  ctx.lineTo(enemy.w / 2, -4);
  ctx.lineTo(4, enemy.h / 2);
  ctx.closePath();
  ctx.fill();
  outlineCurrentShape("#f7fbff", 3);
  ctx.strokeStyle = "#39454f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-4, -4);
  ctx.lineTo(6, 6);
  ctx.stroke();
}

function drawBadBacteriaEnemy(enemy) {
  ctx.fillStyle = "#63d45d";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2, enemy.h / 2 - 4, 0, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#132014", 3);
  ctx.fillStyle = "#24491b";
  ctx.fillRect(-6, -2, 4, 4);
  ctx.fillRect(2, -2, 4, 4);
}

function drawToxinEnemy(enemy) {
  ctx.fillStyle = "#8d59d8";
  ctx.beginPath();
  ctx.moveTo(0, -enemy.h / 2);
  ctx.lineTo(enemy.w / 2, 0);
  ctx.lineTo(0, enemy.h / 2);
  ctx.lineTo(-enemy.w / 2, 0);
  ctx.closePath();
  ctx.fill();
  outlineCurrentShape("#efe2ff", 3);
  ctx.strokeStyle = "rgba(196, 150, 255, 0.9)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawSwarmVirusEnemy(enemy) {
  ctx.fillStyle = "#ff809c";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#fff2f6", 3);
  drawVirusSpikes(enemy.w / 2, 5, "#ffd6df");
}

function drawMidVirusEnemy(enemy) {
  ctx.fillStyle = "#ff4c78";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#fff2f6", 4);
  drawVirusSpikes(enemy.w / 2, 12, "#ffe1e8");
  ctx.fillStyle = "#fff2f5";
  ctx.beginPath();
  ctx.arc(-10, -6, 5, 0, Math.PI * 2);
  ctx.arc(10, -6, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawBoss(boss) {
  if (drawBossAsset(boss)) {
    return;
  }
  ctx.save();
  ctx.translate(boss.x, boss.y);
  if (boss.dashTimer > 36 && Math.floor(boss.dashTimer / 6) % 2 === 0) {
    ctx.strokeStyle = "rgba(255, 250, 150, 0.85)";
    ctx.lineWidth = 5;
    ctx.strokeRect(-96, -88, 70, 176);
  }
  ctx.fillStyle = boss.dashTimer > 0 ? "#ff4f75" : "#cf244f";
  ctx.beginPath();
  ctx.arc(0, 0, boss.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#fff1f5", 5);
  ctx.fillStyle = "#ffbdd1";
  ctx.beginPath();
  ctx.arc(-24, -12, 12, 0, Math.PI * 2);
  ctx.arc(10, -8, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#321320";
  ctx.beginPath();
  ctx.arc(-24, -12, 4, 0, Math.PI * 2);
  ctx.arc(10, -8, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#321320";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(-10, 12, 16, 0.15, Math.PI - 0.25);
  ctx.stroke();
  ctx.strokeStyle = "#ffd7df";
  ctx.lineWidth = 6;
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 58, Math.sin(angle) * 58);
    ctx.lineTo(Math.cos(angle) * 78, Math.sin(angle) * 78);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBossAsset(boss) {
  ctx.save();
  ctx.translate(boss.x, boss.y);
  if (boss.dashTimer > 36 && Math.floor(boss.dashTimer / 6) % 2 === 0) {
    ctx.strokeStyle = "rgba(255, 250, 150, 0.85)";
    ctx.lineWidth = 5;
    ctx.strokeRect(-96, -88, 70, 176);
  }
  let drawn = false;
  ctx.save();
  ctx.scale(-1, 1);
  drawn = drawAsset("boss", -82, -82, 164, 164);
  ctx.restore();
  if (!drawn) {
    ctx.restore();
    return false;
  }
  ctx.beginPath();
  ctx.arc(0, 0, boss.w / 2, 0, Math.PI * 2);
  outlineCurrentShape("#fff1f5", 5);
  ctx.restore();
  return true;
}

function drawPlayerShot(shot) {
  if (shot.type === "capsule") {
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(103, 244, 255, 0.8)";
    ctx.fillStyle = "#8af8ff";
    ctx.beginPath();
    ctx.ellipse(shot.x, shot.y, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f3ffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (shot.type === "spray") {
    ctx.save();
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "#eaffff";
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9ff3ff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(100, 240, 255, 0.95)";
  ctx.strokeStyle = "rgba(107, 244, 255, 0.75)";
  ctx.lineWidth = shot.type === "helper" ? 6 : 7;
  ctx.beginPath();
  ctx.moveTo(shot.x - 10, shot.y);
  ctx.lineTo(shot.x + 9, shot.y);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = shot.type === "helper" ? 2 : 2.4;
  ctx.beginPath();
  ctx.moveTo(shot.x - 7, shot.y);
  ctx.lineTo(shot.x + 8, shot.y);
  ctx.stroke();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "#9ff3ff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(shot.x - 16, shot.y);
  ctx.lineTo(shot.x - 5, shot.y);
  ctx.stroke();
  ctx.restore();
}

function drawEnemyShot(shot) {
  ctx.save();
  ctx.shadowBlur = 10;
  if (shot.type === "toxin") {
    ctx.shadowColor = "rgba(185, 117, 255, 0.85)";
    ctx.fillStyle = "#9a63ff";
    ctx.strokeStyle = "#efe2ff";
  } else {
    ctx.shadowColor = "rgba(255, 182, 74, 0.85)";
    ctx.fillStyle = shot.type === "boss" ? "#ffd256" : "#ffbf47";
    ctx.strokeStyle = "#ff5d39";
  }
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, shot.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

function drawCapsule(capsule) {
  const blink = 0.72 + Math.sin((state.frame + capsule.seed) * 0.2) * 0.22;
  ctx.save();
  ctx.translate(capsule.x, capsule.y);
  ctx.rotate((state.frame + capsule.seed) * 0.04);
  ctx.scale(blink, blink);
  ctx.fillStyle = "#59efff";
  ctx.beginPath();
  ctx.ellipse(0, 0, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#eaffff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-2, -6, 4, 12);
  ctx.fillRect(-6, -2, 12, 4);
  ctx.restore();
}

function drawParticle(particle) {
  const alpha = particle.alpha ?? 0.6;
  ctx.save();
  ctx.globalAlpha = alpha * Math.min(1, particle.life / 10);
  if (particle.kind === "ring") {
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size + (10 - particle.life) * 0.8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (particle.kind === "spark") {
    ctx.fillStyle = particle.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  } else {
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  }
  ctx.restore();
}

function drawUi() {
  if (state.scene === "title") {
    drawTitleScreen();
    return;
  }

  drawMonitorPanel(12, 10, GAME.width - 24, 42);
  drawStatPanel(20, 14, 154, 26, "SCORE", String(state.score).padStart(6, "0"));
  drawStatPanel(184, 14, 82, 26, "LIFE", String(state.player.lives));
  drawStatPanel(276, 14, 92, 26, "BOMB", String(state.player.bombs));
  drawAreaHud(382, 14, 240, 26, `BIO AREA : ${String(getCurrentArea().name).toUpperCase()}`);
  drawEcgLine(634, 15, 126, 24);
  drawHudDigits(766, 18, "VTL 72");
  drawHudDigits(844, 18, "O2 98");

  if (state.boss) {
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.fillRect(680, 18, 240, 16);
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillRect(680, 18, 240 * (state.bossHpLag / state.boss.maxHp), 16);
    ctx.fillStyle = "#ff6a84";
    ctx.fillRect(680, 18, 240 * (state.boss.hp / state.boss.maxHp), 16);
    if (state.bossDamageFlashTimer > 0) {
      ctx.fillStyle = `rgba(255,255,255,${state.bossDamageFlashTimer / 10})`;
      ctx.fillRect(680, 18, 240 * (state.boss.hp / state.boss.maxHp), 16);
    }
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(680, 18, 240, 16);
  }

  drawPowerUpGauge();
  drawTouchUi();
}

function drawPowerUpGauge() {
  const mobileLike = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const y = mobileLike ? GAME.height - 74 : GAME.height - 36;
  drawMonitorPanel(116, y - 16, 728, 32);
  drawScanLines(120, y - 12, 720, 24, 5);
  const slotWidth = 720 / POWER_ORDER.length;
  POWER_ORDER.forEach((name, index) => {
    const x = 120 + slotWidth * index;
    const activeIndex = state.player.powerLevel % POWER_ORDER.length;
    const isActive = activeIndex === index;
    if (isActive) {
      const pulse = 0.72 + Math.sin(state.frame * 0.18) * 0.18;
      ctx.fillStyle = `rgba(255, 209, 93, ${pulse})`;
      ctx.fillRect(x + 2, y - 12, slotWidth - 4, 24);
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(x + 6 + Math.sin(state.frame * 0.1 + index) * 8, y - 11, 18, 22);
      ctx.strokeStyle = "rgba(255,255,255,0.72)";
      ctx.strokeRect(x + 2, y - 12, slotWidth - 4, 24);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(x + 2, y - 12, slotWidth - 4, 24);
    }
    ctx.fillStyle = isActive ? "#11131a" : "#7d8a9c";
    ctx.font = "12px monospace";
    ctx.fillText(name, x + 14, y + 5);
  });
}

function drawTouchUi() {
  const mobileLike = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  if (!mobileLike) return;
  const touch = state.touchState;
  ctx.globalAlpha = 0.84;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.arc(touch.stickBase.x, touch.stickBase.y, GAME.touchStickRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.arc(touch.stick.x, touch.stick.y, 24, 0, Math.PI * 2);
  ctx.fill();

  drawTouchButton(820, 420, 34, "SHOT", touch.shotPressed, "#69dbff");
  drawTouchButton(890, 370, 28, "BOMB", touch.bombPressed, "#ffaf6e");
  ctx.globalAlpha = 1;
}

function drawTouchButton(x, y, r, label, active, color) {
  ctx.fillStyle = active ? color : "rgba(255,255,255,0.14)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = active ? "#101320" : "#ffffff";
  ctx.font = label === "SHOT" ? "14px sans-serif" : "12px sans-serif";
  ctx.fillText(label, x - 18, y + 5);
}

function drawMonitorPanel(x, y, w, h) {
  ctx.fillStyle = "rgba(6, 12, 18, 0.82)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(109, 240, 255, 0.32)";
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(x + 6, y + 6, w - 12, 2);
  drawScanLines(x + 2, y + 2, w - 4, h - 4, 6);
}

function drawScanLines(x, y, w, h, gap) {
  ctx.strokeStyle = "rgba(120, 215, 230, 0.06)";
  ctx.lineWidth = 1;
  for (let yy = y; yy <= y + h; yy += gap) {
    ctx.beginPath();
    ctx.moveTo(x, yy);
    ctx.lineTo(x + w, yy);
    ctx.stroke();
  }
}

function drawStatPanel(x, y, w, h, label, value) {
  drawMonitorPanel(x, y, w, h);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "10px monospace";
  ctx.fillText(label, x + 8, y + 11);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px monospace";
  ctx.fillText(value, x + 8, y + 22);
}

function drawAreaHud(x, y, w, h, text) {
  drawMonitorPanel(x, y, w, h);
  ctx.fillStyle = "rgba(109, 240, 255, 0.18)";
  ctx.fillRect(x + 6, y + 6, 6, h - 12);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 13px monospace";
  ctx.fillText(text, x + 20, y + 18);
}

function drawEcgLine(x, y, w, h) {
  drawMonitorPanel(x, y, w, h);
  ctx.strokeStyle = "#8ef6ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 6, y + h / 2);
  ctx.lineTo(x + 22, y + h / 2);
  ctx.lineTo(x + 30, y + h / 2 - 4);
  ctx.lineTo(x + 36, y + h / 2 + 7);
  ctx.lineTo(x + 44, y + h / 2 - 10);
  ctx.lineTo(x + 50, y + h / 2);
  ctx.lineTo(x + w - 8, y + h / 2);
  ctx.stroke();
}

function drawHudDigits(x, y, text) {
  const blink = Math.floor(state.frame / 24) % 2 === 0 ? "#dffcff" : "#8ef6ff";
  ctx.fillStyle = blink;
  ctx.font = "11px monospace";
  ctx.fillText(text, x, y);
}

function drawOverlays() {
  if (state.scene === "title") {
    drawTitleEffects();
    return;
  }

  if (state.areaBannerTimer > 0) {
    const label = getAreaLabel();
    const fade = Math.min(1, state.areaBannerTimer / 180);
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.fillStyle = "rgba(10, 14, 20, 0.64)";
    ctx.fillRect(210, 172, 540, 94);
    ctx.strokeStyle = "rgba(109, 240, 255, 0.34)";
    ctx.strokeRect(210, 172, 540, 94);
    ctx.fillStyle = "rgba(255, 104, 132, 0.88)";
    ctx.fillRect(224, 188, 8, 62);
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(label, 254, 228);
    ctx.restore();
  }

  if (state.noteTimer > 0) {
    ctx.fillStyle = "rgba(10, 14, 20, 0.72)";
    ctx.fillRect(40, 52, GAME.width - 80, 54);
    ctx.fillStyle = "#fff5bf";
    drawWrappedText(`学習メモ: ${getCurrentArea().note}`, 54, 74, GAME.width - 108, 16, 15);
  }

  if (state.powerUpNoticeTimer > 0) {
    ctx.fillStyle = "rgba(10, 18, 26, 0.76)";
    ctx.fillRect(310, 102, 340, 40);
    ctx.fillStyle = "#8ef6ff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(state.powerUpNoticeText, 354, 128);
  }

  if (state.bossWarningTimer > 0) {
    const pulse = Math.floor(state.frame / 6) % 2 === 0;
    ctx.fillStyle = pulse ? "rgba(20, 0, 0, 0.38)" : "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = pulse ? "rgba(150, 0, 22, 0.78)" : "rgba(96, 0, 18, 0.72)";
    ctx.fillRect(0, 214, GAME.width, 64);
    ctx.strokeStyle = "#ffb3bf";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 214, GAME.width, 64);
    ctx.fillStyle = "#fff2f4";
    ctx.font = "bold 18px monospace";
    ctx.fillText("ALERT", 398, 236);
    ctx.font = "bold 34px monospace";
    ctx.fillText("WARNING", 372, 262);
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.beginPath();
    ctx.moveTo(20, 246);
    ctx.lineTo(330, 246);
    ctx.moveTo(630, 246);
    ctx.lineTo(940, 246);
    ctx.stroke();
  }

  if (state.damageFlashTimer > 0) {
    ctx.fillStyle = `rgba(255, 60, 60, ${state.damageFlashTimer / 34})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

  if (state.uiNoiseTimer > 0) {
    ctx.fillStyle = `rgba(255,255,255,${state.uiNoiseTimer / 90})`;
    for (let i = 0; i < 8; i += 1) {
      const y = 20 + i * 64 + ((state.frame * 7 + i * 13) % 20);
      ctx.fillRect(0, y, GAME.width, 2);
    }
  }

  if (state.screenFlashTimer > 0) {
    ctx.fillStyle = `rgba(255,255,255,${state.screenFlashTimer / 30})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

  if (state.scene === "gameover") {
    drawResultOverlay("GAME OVER", "患者の体内ミッション失敗", "SPACE / ENTER / TAP で RESTART");
  }
  if (state.scene === "clear") {
    drawClearOverlay();
  }
}

function drawTitleEffects() {
  ctx.fillStyle = "rgba(18, 28, 38, 0.44)";
  for (let i = 0; i < 5; i += 1) {
    const x = i * 240 - ((state.frame * 0.55) % 240);
    ctx.fillRect(x, 70, 180, 360);
  }
  ctx.fillStyle = "rgba(142, 246, 255, 0.06)";
  for (let i = 0; i < 4; i += 1) {
    const x = i * 280 - ((state.frame * 1.1) % 280);
    ctx.beginPath();
    ctx.ellipse(x + 120, 250, 72, 220, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 20; i += 1) {
    const x = (i * 57 - state.frame * 0.8) % (GAME.width + 40);
    const y = 40 + (i * 29) % 440;
    ctx.fillStyle = "rgba(142, 246, 255, 0.12)";
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.strokeStyle = "rgba(142, 246, 255, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 450);
  ctx.lineTo(240, 450);
  ctx.lineTo(260, 442);
  ctx.lineTo(272, 458);
  ctx.lineTo(288, 430);
  ctx.lineTo(304, 450);
  ctx.lineTo(820, 450);
  ctx.stroke();
  if (Math.floor(state.frame / 20) % 2 === 0) {
    ctx.fillStyle = "rgba(255, 242, 165, 0.9)";
    ctx.font = "bold 28px monospace";
    ctx.fillText("PRESS SPACE / ENTER / TAP TO START", 186, 440);
  }
}

function drawTitleScreen() {
  ctx.fillStyle = "rgba(243, 232, 214, 0.94)";
  ctx.fillRect(92, 58, 776, 420);
  ctx.strokeStyle = "rgba(70, 54, 46, 0.44)";
  ctx.lineWidth = 2;
  ctx.strokeRect(92, 58, 776, 420);
  ctx.fillStyle = "#493a31";
  ctx.font = "bold 40px sans-serif";
  ctx.fillText("ミクロナース・レスキュー", 190, 116);
  ctx.font = "18px sans-serif";
  ctx.fillText("患者No.001", 134, 162);
  ctx.fillText("症状: 喉の痛み、発熱、だるさ", 134, 196);
  ctx.fillText("推定原因: 風邪ウイルス", 134, 230);
  ctx.fillText("任務: 体内へ侵入し、感染源を除去せよ", 134, 264);
  ctx.fillText("ルート: 口内 → 喉 → 食道 → 胃 → 小腸 → 感染源エリア → ボス", 134, 298);
  ctx.fillStyle = "#5a4f46";
  ctx.fillText("PC: 矢印キー / WASD  移動   Space  ショット   Shift  ボム", 134, 350);
  ctx.fillText("スマホ: 左下スティック   右下 SHOT / BOMB", 134, 382);
}

function drawResultOverlay(title, subtitle, footer) {
  ctx.fillStyle = "rgba(8, 10, 16, 0.76)";
  ctx.fillRect(160, 110, 640, 280);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px sans-serif";
  ctx.fillText(title, 330, 196);
  ctx.font = "20px sans-serif";
  ctx.fillText(subtitle, 285, 244);
  ctx.fillStyle = "#fff0a8";
  ctx.font = "18px sans-serif";
  ctx.fillText(footer, 260, 314);
}

function drawClearOverlay() {
  ctx.fillStyle = "rgba(243, 232, 214, 0.96)";
  ctx.fillRect(120, 68, 720, 404);
  ctx.strokeStyle = "rgba(70, 54, 46, 0.44)";
  ctx.strokeRect(120, 68, 720, 404);
  ctx.fillStyle = "#493a31";
  ctx.font = "bold 40px sans-serif";
  ctx.fillText("処置完了", 390, 126);
  ctx.font = "22px sans-serif";
  ctx.fillText("原因: 風邪ウイルスの増殖", 284, 176);
  ctx.fillText("回復見込み: 良好", 352, 212);
  ctx.fillText("学習メモ", 426, 256);
  ctx.font = "18px sans-serif";
  state.learningSummary.forEach((line, index) => {
    ctx.fillText(`・${line}`, 234, 300 + index * 34);
  });
  ctx.fillStyle = "#b0495d";
  ctx.fillText("SPACE / ENTER / TAP で RESTART", 292, 436);
}

function drawWrappedText(text, x, y, maxWidth, lineHeight, fontSize) {
  ctx.font = `${fontSize}px sans-serif`;
  const chars = Array.from(text);
  let line = "";
  let row = 0;
  for (const char of chars) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y + row * lineHeight);
      line = char;
      row += 1;
      if (row >= 2) break;
    } else {
      line = testLine;
    }
  }
  if (row < 2 && line) {
    ctx.fillText(line, x, y + row * lineHeight);
  }
}

let lastTime = 0;
let accumulator = 0;

function loop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = Math.min(timestamp - lastTime, 100);
  lastTime = timestamp;
  accumulator += delta;

  let updates = 0;
  while (accumulator >= STEP_MS && updates < MAX_UPDATES_PER_FRAME) {
    update();
    accumulator -= STEP_MS;
    updates += 1;
  }

  if (updates >= MAX_UPDATES_PER_FRAME) {
    accumulator = 0;
  }

  draw();
  requestAnimationFrame(loop);
}

function getScrollAdjustment() {
  return GAME.scrollSpeed + state.globalScrollBonus;
}

function playerRect(player) {
  return { x: player.x - player.w / 2, y: player.y - player.h / 2, w: player.w, h: player.h };
}

function toRect(entity) {
  return { x: entity.x - entity.w / 2, y: entity.y - entity.h / 2, w: entity.w, h: entity.h };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function hitCircleRect(cx, cy, radius, rect) {
  const nearestX = clamp(cx, rect.x, rect.x + rect.w);
  const nearestY = clamp(cy, rect.y, rect.y + rect.h);
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy <= radius * radius;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function handleStartOrRestart() {
  if (state.scene === "title" || state.scene === "gameover" || state.scene === "clear") {
    enterFullscreen();
    resetGame();
  }
}

function enterFullscreen() {
  if (document.fullscreenElement) return;
  const target = document.documentElement;
  if (!target.requestFullscreen) return;
  target.requestFullscreen().then(() => {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }
  }).catch(() => {});
}

function onKeyChange(code, pressed) {
  if (code === "ArrowUp" || code === "KeyW") state.keys.up = pressed;
  if (code === "ArrowDown" || code === "KeyS") state.keys.down = pressed;
  if (code === "ArrowLeft" || code === "KeyA") state.keys.left = pressed;
  if (code === "ArrowRight" || code === "KeyD") state.keys.right = pressed;
  if (code === "Space") {
    state.keys.shoot = pressed;
    if (pressed && state.scene !== "playing") handleStartOrRestart();
  }
  if (code === "ShiftLeft" || code === "ShiftRight") state.keys.bomb = pressed;
  if (code === "Enter" && pressed) handleStartOrRestart();
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = GAME.width / rect.width;
  const scaleY = GAME.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function updateTouchDirection(point) {
  const touch = state.touchState;
  const dx = point.x - touch.stickBase.x;
  const dy = point.y - touch.stickBase.y;
  const length = Math.hypot(dx, dy);
  const clamped = Math.min(length, GAME.touchStickRadius);
  const nx = length ? dx / length : 0;
  const ny = length ? dy / length : 0;
  touch.stick.x = touch.stickBase.x + nx * clamped;
  touch.stick.y = touch.stickBase.y + ny * clamped;
  touch.stick.dx = nx * (clamped / GAME.touchStickRadius);
  touch.stick.dy = ny * (clamped / GAME.touchStickRadius);
}

function resetTouchDirection() {
  const touch = state.touchState;
  touch.stick.x = touch.stickBase.x;
  touch.stick.y = touch.stickBase.y;
  touch.stick.dx = 0;
  touch.stick.dy = 0;
}

function touchRegions(point) {
  return {
    stick: point.x < 250 && point.y > 300,
    shot: Math.hypot(point.x - 820, point.y - 420) < 46,
    bomb: Math.hypot(point.x - 890, point.y - 370) < 40,
  };
}

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  onKeyChange(event.code, true);
});

window.addEventListener("keyup", (event) => onKeyChange(event.code, false));

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  if (canvas.setPointerCapture) {
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (error) {
      // Ignore browsers that reject capture for this pointer.
    }
  }
  const point = canvasPoint(event);
  if (state.scene !== "playing") {
    handleStartOrRestart();
    return;
  }
  const regions = touchRegions(point);
  if (regions.stick && state.touchState.stickId === null) {
    state.touchState.stickId = event.pointerId;
    state.touchState.stickBase = { x: point.x, y: point.y };
    updateTouchDirection(point);
  } else if (regions.shot) {
    state.touchState.shotId = event.pointerId;
    state.touchState.shotPressed = true;
  } else if (regions.bomb) {
    state.touchState.bombId = event.pointerId;
    state.touchState.bombPressed = true;
  }
}, { passive: false });

canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  const point = canvasPoint(event);
  if (state.touchState.stickId === event.pointerId) updateTouchDirection(point);
}, { passive: false });

canvas.addEventListener("pointerup", (event) => {
  event.preventDefault();
  if (state.touchState.stickId === event.pointerId) {
    state.touchState.stickId = null;
    resetTouchDirection();
  }
  if (state.touchState.shotId === event.pointerId) {
    state.touchState.shotId = null;
    state.touchState.shotPressed = false;
  }
  if (state.touchState.bombId === event.pointerId) {
    state.touchState.bombId = null;
    state.touchState.bombPressed = false;
  }
  if (canvas.releasePointerCapture) {
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Pointer may already be released.
    }
  }
}, { passive: false });

canvas.addEventListener("pointercancel", (event) => {
  event.preventDefault();
  resetTouchStick();
  if (canvas.releasePointerCapture) {
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Pointer may already be released.
    }
  }
}, { passive: false });

requestAnimationFrame(loop);
