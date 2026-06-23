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
  maxPlayerShots: 90,
  maxEnemyShots: 90,
  maxParticles: 180,
  bossDefeatDuration: 120,
  extractionDuration: 270,
  maxBombs: 3,
  maxLives: 3,
  capsuleChance: 0.35,
  touchStickRadius: 54,
  powerUpNoticeDuration: 110,
};

const STEP_MS = 1000 / 60;
const MAX_UPDATES_PER_FRAME = 5;

const POWER_ORDER = ["SPEED", "NEEDLE", "CAPSULE", "SPRAY", "SHIELD", "HELPER"];
const POWER_LABELS = {
  SPEED: "速度",
  NEEDLE: "針",
  CAPSULE: "カプセル",
  SPRAY: "噴霧",
  SHIELD: "シールド",
  HELPER: "支援",
};

const PATIENTS = [
  {
    id: "Patient 01",
    name: "Takahashi Mina",
    age: "17",
    shortDescription: "咳と発熱を伴うウイルス感染症。",
    symptoms: ["高熱", "咳", "喉の痛み"],
    diagnosis: "風邪ウイルス感染",
    mission: "感染源を除去せよ",
    treatmentGoal: "酸素低下を防ぎ、感染源を除去",
    threat: "咳 / 炎症",
    difficulty: "通常",
    routeType: "呼吸器",
    route: ["mouth", "throat", "lung"],
    condition: "fever",
    unlocked: true,
    selectTheme: {
      accent: "#8ef6ff",
      secondary: "#ff6f8f",
      glow: "rgba(142, 246, 255, 0.28)",
    },
    result: {
      removal: "92%",
      inflammation: "制御成功",
      status: "回復",
    },
    learningSummary: [
      "喉の痛みは炎症のサインになる",
      "空気中の病原体は口から肺へ到達することがある",
      "肺胞では血液とのあいだで酸素交換が行われる",
      "呼吸器ルートでは空気が喉や気道を通る",
      "免疫はウイルスから体を守る働きを持つ",
    ],
    areaDuration: 720,
    bgmTheme: "cold",
    stageModifier: {
      areaDurationByArea: {
        stomach: 720,
      },
      stomachAcidDamageInterval: 18,
      stomachTintBoost: 0,
    },
  },
  {
    id: "Patient 02",
    name: "Sato Aoi",
    age: "22",
    shortDescription: "胃を中心に消化器症状が出ている。",
    symptoms: ["腹痛", "吐き気", "胃の不快感"],
    diagnosis: "食中毒による胃腸障害",
    mission: "胃腸内の異常を除去せよ",
    treatmentGoal: "胃腸炎症を抑え、毒素を中和",
    threat: "胃酸 / 毒素",
    difficulty: "難しい",
    routeType: "消化器",
    route: ["mouth", "esophagus", "stomach", "intestine"],
    condition: "gastritis",
    unlocked: true,
    selectTheme: {
      accent: "#ffe36f",
      secondary: "#a6ff8e",
      glow: "rgba(255, 227, 111, 0.26)",
    },
    result: {
      removal: "88%",
      inflammation: "改善傾向",
      status: "経過観察",
    },
    learningSummary: [
      "食中毒では胃や腸に炎症が起こることがある",
      "胃酸は体を守る一方で作戦中は危険な環境になる",
      "胃の中は強い酸性環境を持つ",
      "小腸は消化された食物から栄養を吸収する",
      "消化器は連携して体を守っている",
      "水分補給と痛みの観察も重要",
    ],
    areaDuration: 720,
    bgmTheme: "foodpoisoning",
    stageModifier: {
      areaDurationByArea: {
        stomach: 980,
      },
      stomachAcidDamageInterval: 14,
      stomachTintBoost: 0.18,
    },
  },
  {
    id: "Patient 03",
    name: "Kobayashi Ren",
    age: "34",
    shortDescription: "循環器の異常により心拍が不安定。",
    symptoms: ["動悸", "胸部圧迫感", "息切れ"],
    diagnosis: "心拍リズム異常",
    mission: "血流を安定化せよ",
    treatmentGoal: "血流と心拍を安定化",
    threat: "脈動 / 血栓",
    difficulty: "難しい",
    routeType: "循環器",
    route: ["vessel", "heart"],
    condition: "smoker",
    unlocked: true,
    selectTheme: {
        accent: "#ff6b6b",
        secondary: "#ffb36b",
        glow: "rgba(255, 107, 107, 0.28)",
    },
    result: {
        removal: "84%",
        inflammation: "安定化",
        status: "監視中",
    },
    learningSummary: [
        "血管は酸素や栄養を全身へ運ぶ",
        "不規則な心拍は血液循環を乱すことがある",
        "血栓は血管を塞ぎ臓器に影響を与えることがある",
        "心臓のリズムは安定した循環に欠かせない",
        "喫煙は循環器リスクを高める",
    ],
    areaDuration: 760,
    bgmTheme: "heart",
    stageModifier: {
        areaDurationByArea: {
        heart: 920,
        },
        stomachAcidDamageInterval: 18,
        stomachTintBoost: 0,
    },
    },

    {
    id: "Patient 04",
    name: "Mizuno Yui",
    age: "19",
    shortDescription: "幻覚と片頭痛を伴う神経信号の異常。",
    symptoms: ["頭痛", "幻覚", "視界のぼやけ"],
    diagnosis: "神経信号異常",
    mission: "神経の誤作動を抑制せよ",
    treatmentGoal: "神経ノイズを抑制",
    threat: "ノイズ / 幻覚",
    difficulty: "難しい",
    routeType: "神経系",
    route: ["brain"],
    condition: "fever",
    unlocked: true,
    selectTheme: {
        accent: "#9f8eff",
        secondary: "#6be8ff",
        glow: "rgba(159, 142, 255, 0.28)",
    },
    result: {
        removal: "79%",
        inflammation: "抑制",
        status: "回復中",
    },
    learningSummary: [
        "脳は全身の信号を制御している",
        "神経細胞は電気信号で情報を伝える",
        "神経信号が乱れると幻覚が起こることがある",
        "脳組織は炎症にとても敏感",
        "神経系は感覚情報を素早く処理する",
    ],
    areaDuration: 760,
    bgmTheme: "brain",
    stageModifier: {
        areaDurationByArea: {
        brain: 980,
        },
        stomachAcidDamageInterval: 18,
        stomachTintBoost: 0,
    },
    },

    {
    id: "Patient 05",
    name: "Shimizu Haru",
    age: "27",
    shortDescription: "末梢神経の炎症によりしびれが発生。",
    symptoms: ["しびれ", "痛み", "筋力低下"],
    diagnosis: "末梢神経炎",
    mission: "損傷した神経信号を修復せよ",
    treatmentGoal: "通電異常を遮断し神経を保護",
    threat: "電流 / ショック",
    difficulty: "通常",
    routeType: "神経",
    route: ["nerve"],
    condition: "dehydration",
    unlocked: true,
    selectTheme: {
        accent: "#7fe0ff",
        secondary: "#8effc8",
        glow: "rgba(127, 224, 255, 0.26)",
    },
    result: {
        removal: "90%",
        inflammation: "改善傾向",
        status: "回復",
    },
    learningSummary: [
        "末梢神経は脳と体のあいだで信号を運ぶ",
        "神経の炎症は痛みやしびれを起こすことがある",
        "電気信号は神経組織を高速で伝わる",
        "水分は体の安定した働きを支える",
        "神経系は損傷にすばやく反応する",
    ],
    areaDuration: 700,
    bgmTheme: "nerve",
    stageModifier: {
        areaDurationByArea: {
        nerve: 860,
        },
        stomachAcidDamageInterval: 18,
        stomachTintBoost: 0,
    },
    },
];
const ASSET_PATHS = {
  player: "assets/player_nurse.png",
  helper: "assets/helper_white_blood_cell.png",
  boss: "assets/boss_cold_virus.png",
  boss_cold_virus: "assets/boss_cold_virus.png",
  boss_blood_clot: "assets/boss_blood_clot.png",
  boss_vessel_core: "assets/boss_vessel_core.png",
  boss_brain_tumor: "assets/boss_brain_tumor.png",
  boss_electric_parasite: "assets/boss_electric_parasite.png",
  patient_cold: "assets/patient_cold.png",
  patient_food_poisoning: "assets/patient_food_poisoning.png",
  bg_mouth: "assets/bg_mouth.png",
  bg_throat: "assets/bg_throat.png",
  bg_lung: "assets/bg_lung.png",
  bg_esophagus: "assets/bg_esophagus.png",
  bg_stomach: "assets/bg_stomach.png",
  bg_intestine: "assets/bg_intestine.png",
  bg_vessel: "assets/bg_vessel.png",
  bg_heart: "assets/bg_heart.png",
  bg_brain: "assets/bg_brain.png",
  bg_nerve: "assets/bg_nerve.png",
  bg_nest: "assets/bg_nest.png",
};

const AREAS = [
  {
    id: "mouth",
    name: "口内",
    note: "口内には多くの細菌が存在する。清潔を保つことは体を守る助けになる。",
    colorA: "#7d233d",
    colorB: "#ff8ea6",
    accent: "#ffe2ea",
    enemyTypes: ["bacteria", "crumb"],
    gimmick: "bubble",
    scrollStyle: { speed: 1, driftY: 0 },
    ambience: "softBubble",
  },
  {
    id: "throat",
    name: "喉",
    note: "喉の痛みは、体がウイルスに反応しているサインになることがある。",
    colorA: "#8f2f3b",
    colorB: "#d45666",
    accent: "#ffcccf",
    enemyTypes: ["virus", "shooterVirus"],
    gimmick: "cough",
    scrollStyle: { speed: 1, driftY: 0 },
    ambience: "airPulse",
  },
  {
    id: "lung",
    name: "肺",
    note: "肺は空気から酸素を取り込むが、病原体も気流に乗って到達することがある。",
    colorA: "#143553",
    colorB: "#7ec8dc",
    accent: "#d8fbff",
    enemyTypes: ["airborneVirus", "floatingBacteria", "shooterVirus"],
    gimmick: "breath",
    scrollStyle: { speed: 0.86, driftY: 0.55, lowGravity: 0.72 },
    ambience: "breath",
  },
  {
    id: "esophagus",
    name: "食道",
    note: "食道は筋肉の動きで食物を胃へ送り込む。",
    colorA: "#3f1720",
    colorB: "#8e3544",
    accent: "#ffb8c2",
    enemyTypes: ["debris", "drifter"],
    gimmick: "peristalsis",
    scrollStyle: { speed: 1.16, driftY: 0.35, flowY: 0.42 },
    ambience: "fluidFlow",
  },
  {
    id: "stomach",
    name: "胃",
    note: "胃酸は食物の消化と殺菌を助けるが、作戦中は危険な環境になる。",
    colorA: "#543824",
    colorB: "#cf8a49",
    accent: "#ffe4ad",
    enemyTypes: ["acidBubble", "acidSlime", "toxicBlob", "foodBlock"],
    gimmick: "acid",
    scrollStyle: { speed: 1.02, driftY: 0.28, cameraPulse: 0.34 },
    ambience: "stomachLiquid",
  },
  {
    id: "intestine",
    name: "小腸",
    note: "小腸は栄養を吸収し、体を支える重要な働きを持つ。",
    colorA: "#6a3b1f",
    colorB: "#c96b40",
    accent: "#ffe0ba",
    enemyTypes: ["virus", "badBacteria", "toxin"],
    gimmick: "villi",
    scrollStyle: { speed: 0.94, driftY: 0.48, narrow: true },
    ambience: "pulse",
  },
  {
    id: "heart",
    name: "心臓",
    note: "心臓は一定のリズムで収縮し、血液を全身へ送り出す。",
    colorA: "#4f0715",
    colorB: "#c33245",
    accent: "#ffd6dc",
    enemyTypes: ["clot", "pulseCell", "bloodParasite"],
    gimmick: "heartbeat",
    scrollStyle: { speed: 1.04, driftY: 0.18 },
    ambience: "heartbeat",
  },
  {
    id: "vessel",
    name: "血管",
    note: "血管は細胞や栄養を運ぶ、高速で狭い通路である。",
    colorA: "#390711",
    colorB: "#a81828",
    accent: "#ffb8c0",
    enemyTypes: ["microClot", "parasiteSwarm", "vesselEye"],
    gimmick: "bloodflow",
    scrollStyle: { speed: 1.24, driftY: 0.22, narrow: true },
    ambience: "bloodFlow",
  },
  {
    id: "brain",
    name: "脳",
    note: "脳は複雑なネットワークで信号を送り、ノイズはそのタイミングを乱すことがある。",
    colorA: "#1d204e",
    colorB: "#8a5fd1",
    accent: "#e4dcff",
    enemyTypes: ["neuronBug", "hallucinationEye", "synapseCrawler"],
    gimmick: "neuroglitch",
    scrollStyle: { speed: 0.98, driftY: 0.18 },
    ambience: "neuralNoise",
  },
  {
    id: "nerve",
    name: "神経",
    note: "神経は枝分かれした経路を通じて、電気信号を高速に伝える。",
    colorA: "#082a45",
    colorB: "#2aa6c8",
    accent: "#d7fbff",
    enemyTypes: ["sparkMite", "nerveEel", "shockCell"],
    gimmick: "electricPulse",
    scrollStyle: { speed: 1.02, driftY: 0.3 },
    ambience: "electric",
  },
  {
    id: "nest",
    name: "感染巣",
    note: "ウイルスは集まり増殖することがある。免疫はそれに対抗して働く。",
    colorA: "#431047",
    colorB: "#b53f6b",
    accent: "#ffd0ef",
    enemyTypes: ["swarmVirus", "shooterVirus", "midVirus"],
    gimmick: "rush",
    scrollStyle: { speed: 1.08, driftY: 0 },
    ambience: "alert",
  },
];

const AREA_LOOKUP = new Map(AREAS.map((area) => [area.id, area]));

const ROUTE_LABELS = {
  mouth: "口腔",
  throat: "喉",
  lung: "肺",
  esophagus: "食道",
  stomach: "胃",
  intestine: "小腸",
  heart: "心臓",
  vessel: "血管",
  brain: "脳",
  nerve: "神経",
  nest: "感染巣",
};

const ROUTE_ICONS = {
  mouth: "O",
  throat: "T",
  lung: "LU",
  esophagus: "E",
  stomach: "ST",
  intestine: "IN",
  heart: "HT",
  vessel: "VE",
  brain: "BR",
  nerve: "NV",
};

const ROUTES = {
  lung: {
    background: "lung",
    ambient: "breath",
    particles: { color: "#d9fbff", rate: 46, alpha: 0.14, speed: 0.7 },
    enemyPool: ["airborneVirus", "floatingBacteria", "shooterVirus"],
    bossType: "viralCore",
    tint: "rgba(235, 255, 255, 0.04)",
    bossHp: 1,
    gimmickUpdate: null,
    events: [],
    briefingText: "呼吸の気流により、肺の内部では浮遊感のある移動になる。",
  },
  stomach: {
    background: "stomach",
    ambient: "stomachLiquid",
    particles: { color: "#fff19a", rate: 42, alpha: 0.16, speed: 1.1 },
    enemyPool: ["acidBubble", "acidSlime", "toxicBlob", "foodBlock"],
    bossType: "toxinMass",
    tint: "rgba(255, 236, 178, 0.04)",
    bossHp: 1.02,
    gimmickUpdate: null,
    events: [],
    briefingText: "胃酸の波と泡により、胃の内部は不安定だが予測可能な環境になる。",
  },
  heart: {
    background: "heart",
    ambient: "heartbeat",
    particles: { color: "#ffbac4", rate: 34, alpha: 0.15, speed: 1.5 },
    enemyPool: ["clot", "pulseCell", "bloodParasite"],
    bossType: "giantClot",
    tint: "rgba(255, 72, 92, 0.05)",
    bossHp: 1.08,
    gimmickUpdate: updateHeartRoute,
    events: ["heartbeatOverdrive", "bloodRush"],
    briefingText: "心拍に合わせて血流と敵の動きが一時的に速くなる。",
  },
  vessel: {
    background: "vessel",
    ambient: "bloodFlow",
    particles: { color: "#ff9aa8", rate: 28, alpha: 0.14, speed: 1.8 },
    enemyPool: ["microClot", "parasiteSwarm", "vesselEye"],
    bossType: "vesselBlockage",
    tint: "rgba(255, 45, 62, 0.045)",
    bossHp: 1.05,
    gimmickUpdate: updateVesselRoute,
    events: ["narrowFlow", "clotRain"],
    briefingText: "高速の血流により、狭い通路を回避しながら進むルートになる。",
  },
  brain: {
    background: "brain",
    ambient: "neuralNoise",
    particles: { color: "#dfd6ff", rate: 52, alpha: 0.13, speed: 0.9 },
    enemyPool: ["neuronBug", "hallucinationEye", "synapseCrawler"],
    bossType: "brainTumor",
    tint: "rgba(170, 132, 255, 0.045)",
    bossHp: 1.04,
    gimmickUpdate: updateBrainRoute,
    events: ["hallucinationBurst"],
    briefingText: "神経ノイズにより、偽の警告や表示の乱れが発生する。",
  },
  nerve: {
    background: "nerve",
    ambient: "electric",
    particles: { color: "#cafbff", rate: 38, alpha: 0.15, speed: 1.25 },
    enemyPool: ["sparkMite", "nerveEel", "shockCell"],
    bossType: "electricParasite",
    tint: "rgba(108, 235, 255, 0.045)",
    bossHp: 1.05,
    gimmickUpdate: updateNerveRoute,
    events: ["electricStorm", "synapseFreeze"],
    briefingText: "電気パルスにより、タイミング式のレーザー障害物が発生する。",
  },
};

const ROUTE_EVENTS = {
  heartbeatOverdrive: {
    label: "心拍数上昇",
    duration: 210,
    cue: "pulse",
    enemySpeed: 1.08,
    pulseBoost: 1.7,
    scalePulse: 0.006,
    particleRate: 18,
    particleColor: "#ffc1ca",
  },
  bloodRush: {
    label: "血流急加速",
    duration: 210,
    cue: "bloodRush",
    scrollBonus: 0.55,
    shotSpeed: 1.08,
    particleRate: 12,
    particleColor: "#ff8c9c",
  },
  narrowFlow: {
    label: "血管収縮",
    duration: 220,
    cue: "bloodRush",
    narrowBoost: 16,
    scrollBonus: 0.24,
    particleRate: 18,
    particleColor: "#ff9aa8",
  },
  clotRain: {
    label: "小血栓流入",
    duration: 190,
    cue: "bloodRush",
    spawnType: "microClot",
    spawnInterval: 34,
    particleRate: 20,
    particleColor: "#ff8794",
  },
  hallucinationBurst: {
    label: "偽信号バースト",
    duration: 170,
    cue: "glitch",
    fakeWarning: true,
    uiNoise: 22,
    particleRate: 16,
    particleColor: "#dfd6ff",
  },
  electricStorm: {
    label: "電流嵐",
    duration: 210,
    cue: "electric",
    laserInterval: 82,
    screenGlow: "rgba(202, 251, 255, 0.08)",
    particleRate: 12,
    particleColor: "#cafbff",
  },
  synapseFreeze: {
    label: "シナプス凍結",
    duration: 70,
    cue: "electric",
    freezeFrames: 5,
    screenGlow: "rgba(215, 251, 255, 0.1)",
    particleRate: 18,
    particleColor: "#ffffff",
  },
};

const BOSS_TYPES = {
  viralCore: {
    asset: "boss_cold_virus",
    notice: "ウイルス中枢を検出",
    aura: "rgba(255, 88, 124, 0.22)",
    particle: "#ff9db1",
    shotFill: "#ffd256",
    shotStroke: "#ff5d39",
    shotShadow: "rgba(255, 182, 74, 0.85)",
  },
  toxinMass: {
    asset: "boss_cold_virus",
    notice: "毒素コアを検出",
    aura: "rgba(255, 196, 70, 0.2)",
    particle: "#ffe07a",
    shotFill: "#ffd256",
    shotStroke: "#ff8a39",
    shotShadow: "rgba(255, 196, 74, 0.85)",
  },
  giantClot: {
    asset: "boss_blood_clot",
    notice: "巨大血栓を検出",
    aura: "rgba(92, 0, 16, 0.32)",
    particle: "#7d1020",
    shotFill: "#7d1020",
    shotStroke: "#ff9aa8",
    shotShadow: "rgba(120, 0, 20, 0.86)",
  },
  vesselBlockage: {
    asset: "boss_vessel_core",
    notice: "心血管コア起動",
    aura: "rgba(255, 88, 48, 0.24)",
    particle: "#ff9b55",
    shotFill: "#ff7a3c",
    shotStroke: "#ffd0a0",
    shotShadow: "rgba(255, 98, 54, 0.86)",
  },
  brainTumor: {
    asset: "boss_brain_tumor",
    notice: "神経異常体を検出",
    aura: "rgba(148, 92, 255, 0.24)",
    particle: "#c9b8ff",
    shotFill: "#9a63ff",
    shotStroke: "#dffcff",
    shotShadow: "rgba(160, 112, 255, 0.86)",
  },
  electricParasite: {
    asset: "boss_electric_parasite",
    notice: "電気寄生体を検出",
    aura: "rgba(116, 239, 255, 0.26)",
    particle: "#cafbff",
    shotFill: "#9ff7ff",
    shotStroke: "#ffffff",
    shotShadow: "rgba(100, 240, 255, 0.9)",
  },
};

const CONDITION_MODIFIERS = {
  healthy: {
    label: "健康",
    warning: "安定",
    tint: "rgba(120, 236, 255, 0.025)",
    particleColor: "#c8fff2",
    particleRate: 0,
    enemyCountBonus: 0,
    enemySpeed: 1,
    bossHp: 1,
    ambience: null,
  },
  fever: {
    label: "発熱",
    warning: "体温上昇",
    tint: "rgba(255, 92, 116, 0.055)",
    particleColor: "#ffb0a8",
    particleRate: 150,
    enemyCountBonus: 0.08,
    enemySpeed: 1.035,
    bossHp: 1.05,
    ambience: "feverHum",
  },
  smoker: {
    label: "喫煙傾向",
    warning: "気道刺激",
    tint: "rgba(110, 120, 118, 0.055)",
    particleColor: "#c4c8bc",
    particleRate: 120,
    enemyCountBonus: 0.06,
    enemySpeed: 1.02,
    bossHp: 1.04,
    ambience: "roughAir",
  },
  gastritis: {
    label: "胃炎",
    warning: "粘膜刺激",
    tint: "rgba(255, 184, 92, 0.06)",
    particleColor: "#ffe07a",
    particleRate: 110,
    enemyCountBonus: 0.1,
    enemySpeed: 1.025,
    bossHp: 1.06,
    stomachTintBoost: 0.08,
    stomachAcidDamageIntervalBonus: -1,
    ambience: "acidMurmur",
  },
  dehydration: {
    label: "脱水",
    warning: "水分低下",
    tint: "rgba(255, 221, 142, 0.045)",
    particleColor: "#ffe7a8",
    particleRate: 135,
    enemyCountBonus: 0.05,
    enemySpeed: 1.015,
    bossHp: 1.03,
    ambience: "dryPulse",
  },
};

const VITAL_CONDITION_OFFSETS = {
  healthy: {},
  fever: { infection: 16, inflammation: 14, oxygen: -3, stability: -5 },
  smoker: { infection: 5, inflammation: 6, oxygen: -18, stability: -4 },
  gastritis: { infection: 8, inflammation: 20, oxygen: -2, stability: -9 },
  dehydration: { infection: 2, inflammation: 5, oxygen: -6, stability: -15 },
};

const ROUTE_TREATMENT_PROFILES = {
  mouth: {
    type: "biofilmPatch",
    label: "菌叢",
    objective: "口内細菌の増殖を抑える",
    message: "口内細菌の増殖を確認",
    hp: 5,
    score: 420,
    improve: { infection: -4, inflammation: -1 },
    worsen: { infection: 3 },
  },
  throat: {
    type: "inflamedTissue",
    label: "炎症部",
    objective: "喉の炎症反応を抑える",
    message: "炎症部位を保護して",
    hp: 6,
    score: 460,
    improve: { inflammation: -5, stability: 2 },
    worsen: { inflammation: 3 },
  },
  lung: {
    type: "infectedAlveoli",
    label: "肺胞",
    objective: "肺胞を守り酸素低下を防ぐ",
    message: "酸素低下、肺胞を守って",
    hp: 6,
    score: 520,
    improve: { infection: -2, oxygen: 6 },
    worsen: { infection: 2, oxygen: -5 },
  },
  esophagus: {
    type: "mucosaLesion",
    label: "粘膜",
    objective: "粘膜を守り安全に通過する",
    message: "粘膜損傷を確認",
    hp: 5,
    score: 440,
    improve: { inflammation: -2, stability: 4 },
    worsen: { inflammation: 2, stability: -3 },
  },
  stomach: {
    type: "toxinPatch",
    label: "毒素",
    objective: "胃酸と毒素による炎症を抑える",
    message: "胃酸濃度が上昇",
    hp: 7,
    score: 560,
    improve: { infection: -2, inflammation: -6 },
    worsen: { infection: 2, inflammation: 4 },
  },
  intestine: {
    type: "toxinPocket",
    label: "吸収毒",
    objective: "毒素吸収を防ぐ",
    message: "毒素吸収を阻止して",
    hp: 6,
    score: 500,
    improve: { infection: -5, inflammation: -2 },
    worsen: { infection: 4, inflammation: 2 },
  },
  vessel: {
    type: "clotBlock",
    label: "血栓",
    objective: "血流の詰まりを防ぐ",
    message: "血流の乱れを検出",
    hp: 7,
    score: 560,
    improve: { oxygen: 2, stability: 5 },
    worsen: { oxygen: -2, stability: -4 },
  },
  heart: {
    type: "unstablePulseNode",
    label: "脈動核",
    objective: "心拍の安定を維持する",
    message: "心拍同期を維持して",
    hp: 7,
    score: 580,
    improve: { oxygen: 2, stability: 7 },
    worsen: { oxygen: -2, stability: -5 },
  },
  brain: {
    type: "noisyNeuron",
    label: "神経核",
    objective: "神経ノイズを抑える",
    message: "神経ノイズを検出",
    hp: 6,
    score: 540,
    improve: { inflammation: -2, stability: 5 },
    worsen: { inflammation: 2, stability: -4 },
  },
  nerve: {
    type: "shortedSynapse",
    label: "短絡部",
    objective: "通電異常を抑える",
    message: "通電異常を遮断して",
    hp: 6,
    score: 540,
    improve: { oxygen: 1, stability: 6 },
    worsen: { stability: -4 },
  },
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameFrame = document.querySelector(".game-frame");
const assets = loadAssets(ASSET_PATHS);

const state = {
  scene: "title",
  frame: 0,
  score: 0,
  highScore: 0,
  currentPatientIndex: 0,
  areaIndex: 0,
  areaFrame: 0,
  noteTimer: 0,
  areaBannerTimer: 0,
  areaEntryTimer: 0,
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
  currentAmbience: "none",
  routePulseTimer: 0,
  fakeWarningTimer: 0,
  routeScalePulse: 0,
  bossDefeatTimer: 0,
  defeatedBossX: 0,
  defeatedBossY: 0,
  extractionTimer: 0,
  extractionPhase: 0,
  extractionAreaId: null,
  activeRouteEvent: null,
  routeEventCooldown: 0,
  routeEventsTriggered: [],
  routeEventNoticeTimer: 0,
  routeEventNoticeText: "",
  audioReady: false,
  audioContext: null,
  ambienceNode: null,
  bossHpLag: 0,
  bossDamageFlashTimer: 0,
  bossHitStopCooldown: 0,
  injectionTimer: 0,
  stageEntryFlashTimer: 0,
  patientSwapTimer: 0,
  vitals: null,
  initialVitals: null,
  vitalsWarningCooldown: 0,
  treatmentTargets: [],
  treatmentTargetSerial: 0,
  treatmentStats: { completed: 0, missed: 0, enemiesEscaped: 0 },
  treatmentEffects: [],
  vitalPopups: [],
  vitalWarningTimer: 0,
  vitalWarningType: "",
  vitalsHudFlashTimer: 0,
  treatmentGlowTimer: 0,
  nurseMessage: "",
  nurseMessageTimer: 0,
  nurseMessagePriority: 0,
  nurseMessageCooldowns: {},
  resultCuePlayed: false,
  learningSummary: [],
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

function resetGame(startScene = "playing") {
  state.scene = startScene;
  state.frame = 0;
  state.score = 0;
  state.areaIndex = 0;
  state.areaFrame = 0;
  state.noteTimer = GAME.noteDuration;
  state.areaBannerTimer = 180;
  state.areaEntryTimer = 110;
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
  state.currentAmbience = "none";
  state.routePulseTimer = 0;
  state.fakeWarningTimer = 0;
  state.routeScalePulse = 0;
  state.bossDefeatTimer = 0;
  state.defeatedBossX = 0;
  state.defeatedBossY = 0;
  state.extractionTimer = 0;
  state.extractionPhase = 0;
  state.extractionAreaId = null;
  state.activeRouteEvent = null;
  state.routeEventCooldown = 0;
  state.routeEventsTriggered = [];
  state.routeEventNoticeTimer = 0;
  state.routeEventNoticeText = "";
  state.bossHpLag = GAME.bossMaxHp;
  state.bossDamageFlashTimer = 0;
  state.bossHitStopCooldown = 0;
  state.injectionTimer = 0;
  state.stageEntryFlashTimer = 0;
  state.patientSwapTimer = 0;
  state.vitals = initVitals();
  state.initialVitals = { ...state.vitals };
  state.vitalsWarningCooldown = 0;
  state.treatmentTargets = [];
  state.treatmentTargetSerial = 0;
  state.treatmentStats = { completed: 0, missed: 0, enemiesEscaped: 0 };
  state.treatmentEffects = [];
  state.vitalPopups = [];
  state.vitalWarningTimer = 0;
  state.vitalWarningType = "";
  state.vitalsHudFlashTimer = 0;
  state.treatmentGlowTimer = 0;
  state.nurseMessage = "";
  state.nurseMessageTimer = 0;
  state.nurseMessagePriority = 0;
  state.nurseMessageCooldowns = {};
  state.resultCuePlayed = false;
  state.learningSummary = [...getCurrentPatient().learningSummary];
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
  const route = getCurrentRoute();
  if (state.areaIndex < route.length) {
    return getAreaById(route[state.areaIndex]);
  }
  return getAreaById("nest");
}

function getCurrentPatient() {
  return PATIENTS[state.currentPatientIndex] || PATIENTS[0];
}

function getAreaById(id) {
  return AREA_LOOKUP.get(id) || AREA_LOOKUP.get("mouth") || AREAS[0];
}

function getCurrentRoute(patient = getCurrentPatient()) {
  const route = Array.isArray(patient.route) && patient.route.length ? patient.route : ["mouth", "throat", "lung"];
  const validRoute = route.filter((id) => AREA_LOOKUP.has(id));
  return validRoute.length ? validRoute : ["mouth"];
}

function getRouteType(patient = getCurrentPatient()) {
  return patient.routeType || "CUSTOM";
}

function formatEntryRoute(patient = getCurrentPatient()) {
  return getCurrentRoute(patient)
    .map((id) => ROUTE_LABELS[id] || String(id).toUpperCase())
    .join(" \u2192 ");
}

function getRouteLearningLine(patient = getCurrentPatient()) {
  if (getRouteType(patient) === "呼吸器") {
    return "呼吸器ルートでは、病原体が気流に乗って肺へ到達することがある。";
  }
  if (getRouteType(patient) === "消化器") {
    return "消化器ルートでは、汚染された食物が胃や腸を通って影響を与える。";
  }
  if (getRouteType(patient) === "循環器") {
    return "循環器ルートでは、血流の乱れや血栓が全身への酸素供給に影響する。";
  }
  if (getRouteType(patient) === "神経系" || getRouteType(patient) === "神経") {
    return "神経ルートでは、電気信号の乱れが感覚や運動に影響することがある。";
  }
  return "侵入ルートが変わると、病原体が最初に到達する器官も変わる。";
}

function getStageModifier() {
  return getCurrentPatient().stageModifier || {};
}

function getConditionModifier(patient = getCurrentPatient()) {
  return CONDITION_MODIFIERS[patient.condition] || CONDITION_MODIFIERS.healthy;
}

function getConditionLabel(patient = getCurrentPatient()) {
  return getConditionModifier(patient).label;
}

function initVitals(patient = getCurrentPatient()) {
  const vitals = { infection: 48, inflammation: 34, oxygen: 94, stability: 88 };
  const routeOffsets = {
    "呼吸器": { infection: 4, oxygen: -5 },
    "消化器": { infection: 3, inflammation: 5, stability: -2 },
    "循環器": { oxygen: -4, stability: -6 },
    "神経系": { inflammation: 2, stability: -7 },
    "神経": { stability: -6 },
  }[getRouteType(patient)] || {};
  const conditionOffsets = VITAL_CONDITION_OFFSETS[patient.condition] || {};
  for (const key of Object.keys(vitals)) {
    vitals[key] = clamp(vitals[key] + (routeOffsets[key] || 0) + (conditionOffsets[key] || 0), 0, 100);
  }
  return vitals;
}

function applyVitalChanges(changes) {
  if (!state.vitals || !changes) return {};
  const applied = {};
  for (const [key, amount] of Object.entries(changes)) {
    if (!(key in state.vitals)) continue;
    const before = state.vitals[key];
    state.vitals[key] = clamp(before + amount, 0, 100);
    applied[key] = state.vitals[key] - before;
  }
  return applied;
}

function improveVitals(changes, feedback = null) {
  const applied = applyVitalChanges(changes);
  if (feedback) spawnVitalPopups(applied, feedback.x, feedback.y);
  return applied;
}

function worsenVitals(changes, feedback = null) {
  const applied = applyVitalChanges(changes);
  if (feedback) spawnVitalPopups(applied, feedback.x, feedback.y);
  maybeWarnVitals();
  return applied;
}

function updateVitals() {
  if (!state.vitals || state.bossDefeatTimer > 0 || state.scene !== "playing") return;
  state.vitalsWarningCooldown = Math.max(0, state.vitalsWarningCooldown - 1);
  if (state.frame % 120 !== 0) return;
  const eventScale = state.activeRouteEvent ? 1.4 : 1;
  const changesByArea = {
    mouth: { infection: 0.55 },
    throat: { inflammation: 0.6 },
    lung: { oxygen: -0.55 },
    esophagus: { stability: -0.35 },
    stomach: { inflammation: 0.65 },
    intestine: { infection: 0.55 },
    vessel: { stability: -0.5 },
    heart: { stability: -0.6 },
    brain: { stability: -0.45 },
    nerve: { stability: -0.45 },
  };
  const baseChanges = changesByArea[getCurrentArea().id];
  if (!baseChanges) return;
  const scaled = {};
  for (const [key, amount] of Object.entries(baseChanges)) scaled[key] = amount * eventScale;
  worsenVitals(scaled);
}

function onEnemyEscaped() {
  state.treatmentStats.enemiesEscaped += 1;
  const areaId = getCurrentArea().id;
  const changes = {
    lung: { infection: 0.35, oxygen: -0.6 },
    stomach: { infection: 0.25, inflammation: 0.55 },
    intestine: { infection: 0.55, inflammation: 0.2 },
    vessel: { oxygen: -0.2, stability: -0.5 },
    heart: { stability: -0.55 },
    brain: { stability: -0.45 },
    nerve: { stability: -0.45 },
  }[areaId] || { infection: 0.45, inflammation: 0.2 };
  worsenVitals(changes);
}

function maybeWarnVitals() {
  if (!state.vitals || state.vitalsWarningCooldown > 0) return;
  let message = "";
  let type = "";
  if (state.vitals.oxygen <= 38) {
    message = "酸素低下、処置を優先して";
    type = "oxygen";
  } else if (state.vitals.stability <= 38) {
    message = "患者状態が不安定";
    type = "stability";
  } else if (state.vitals.infection >= 78) {
    message = "感染反応が上昇";
    type = "infection";
  } else if (state.vitals.inflammation >= 78) {
    message = "炎症反応が上昇";
    type = "inflammation";
  }
  if (!message) return;
  state.vitalsWarningCooldown = 240;
  triggerVitalWarning(type);
  showNurseMessage(message, 105, { priority: 5, key: `danger:${type}`, cooldown: 220, force: true });
}

function triggerVitalWarning(type) {
  state.vitalWarningType = type;
  state.vitalWarningTimer = 72;
  state.vitalsHudFlashTimer = 60;
  if (type === "stability") state.uiNoiseTimer = Math.max(state.uiNoiseTimer, 8);
  playTreatmentCue("danger");
}

function spawnVitalPopups(changes, x = 790, y = 190) {
  if (!changes) return;
  const entries = Object.entries(changes)
    .filter(([, amount]) => Math.abs(amount) >= 0.75)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 2);
  entries.forEach(([key, amount], index) => {
    const badIncrease = (key === "infection" || key === "inflammation") ? amount > 0 : amount < 0;
    const labels = { infection: "感染", inflammation: "炎症", oxygen: "酸素", stability: "安定" };
    state.vitalPopups.push({
      text: `${labels[key]} ${amount > 0 ? "UP" : "DOWN"}`,
      x,
      y: y + index * 16,
      vy: -0.28,
      life: 64,
      color: badIncrease ? "#ff8297" : "#8ef6ff",
    });
  });
  if (state.vitalPopups.length > 6) state.vitalPopups.splice(0, state.vitalPopups.length - 6);
}

function updateVitalPopups() {
  for (const popup of state.vitalPopups) {
    popup.life -= 1;
    popup.y += popup.vy;
  }
  state.vitalPopups = state.vitalPopups.filter((popup) => popup.life > 0);
}

function getTreatmentProfile(area = getCurrentArea()) {
  return ROUTE_TREATMENT_PROFILES[area.id] || null;
}

function spawnTreatmentTarget(area = getCurrentArea()) {
  const profile = getTreatmentProfile(area);
  if (!profile || state.bossActive || state.bossSpawnQueued) return;
  const activeCount = state.treatmentTargets.filter((target) => !target.resolved && target.areaId === area.id).length;
  if (activeCount >= 2) return;
  state.treatmentTargetSerial += 1;
  state.treatmentTargets.push({
    id: state.treatmentTargetSerial,
    areaId: area.id,
    type: profile.type,
    label: profile.label,
    x: GAME.width - 34,
    y: 112 + Math.random() * 292,
    w: 46,
    h: 46,
    hp: profile.hp,
    maxHp: profile.hp,
    vx: -1.25,
    pulse: Math.random() * Math.PI * 2,
    scan: Math.random() * 40,
    hitFlash: 0,
    treatmentStarted: false,
    resolved: false,
  });
  showNurseMessage(profile.message, 96, { priority: 2, key: `target:${area.id}`, cooldown: 180 });
}

function updateTreatmentTargets() {
  for (const target of state.treatmentTargets) {
    if (target.resolved) continue;
    target.pulse += 0.08;
    target.scan = (target.scan + 0.7) % 42;
    target.hitFlash = Math.max(0, target.hitFlash - 1);
    target.x += target.vx - getScrollAdjustment() * 0.24;
    target.y += Math.sin(target.pulse) * 0.12;
    if (target.x < -50) missTreatmentTarget(target);
  }
  state.treatmentTargets = state.treatmentTargets.filter((target) => !target.resolved);
}

function hitTreatmentTarget(target, damage, x, y) {
  if (target.resolved) return;
  target.hp -= damage;
  target.hitFlash = 10;
  if (!target.treatmentStarted) {
    target.treatmentStarted = true;
    playTreatmentCue("start");
    showNurseMessage("処置開始、反応あり", 72, { priority: 2, key: `treat:${target.id}`, cooldown: 9999 });
  }
  spawnTreatmentSparks(x, y, 2);
  if (target.hp <= 0) completeTreatmentTarget(target);
}

function completeTreatmentTarget(target) {
  if (target.resolved) return;
  const profile = ROUTE_TREATMENT_PROFILES[target.areaId];
  target.resolved = true;
  state.treatmentStats.completed += 1;
  state.score += profile?.score || 400;
  improveVitals(profile?.improve, { x: target.x + 22, y: target.y - 12 });
  state.treatmentEffects.push({ kind: "complete", x: target.x, y: target.y, life: 78, maxLife: 78, text: "STABILIZED" });
  spawnTreatmentSparks(target.x, target.y, 8);
  state.treatmentGlowTimer = Math.max(state.treatmentGlowTimer, 14);
  playTreatmentCue("complete");
  showNurseMessage("処置完了、患者反応が改善", 105, { priority: 5, key: "treatmentComplete", cooldown: 45, force: true });
  if (!state.player.shield && Math.random() < 0.08) state.player.shield = true;
  else if (state.player.bombs < GAME.maxBombs && Math.random() < 0.05) state.player.bombs += 1;
}

function missTreatmentTarget(target) {
  if (target.resolved) return;
  const profile = ROUTE_TREATMENT_PROFILES[target.areaId];
  target.resolved = true;
  state.treatmentStats.missed += 1;
  worsenVitals(profile?.worsen, { x: 790, y: 190 });
  const activeMissEffect = state.treatmentEffects.find((effect) => effect.kind === "miss");
  if (activeMissEffect) activeMissEffect.life = activeMissEffect.maxLife;
  else state.treatmentEffects.push({ kind: "miss", x: 720, y: 178, life: 78, maxLife: 78, text: "MISSED TREATMENT" });
  state.vitalsHudFlashTimer = Math.max(state.vitalsHudFlashTimer, 52);
  state.vitalWarningType = getDominantVitalChange(profile?.worsen);
  state.vitalWarningTimer = Math.max(state.vitalWarningTimer, 36);
  playTreatmentCue("miss");
  showNurseMessage("処置漏れ、患者状態が悪化", 96, { priority: 5, key: "treatmentMiss", cooldown: 60, force: true });
}

function expireTreatmentTargets(areaId) {
  for (const target of state.treatmentTargets) {
    if (!target.resolved && target.areaId === areaId) missTreatmentTarget(target);
  }
  state.treatmentTargets = state.treatmentTargets.filter((target) => !target.resolved);
}

function showNurseMessage(message, duration = 90, options = {}) {
  if (!message) return;
  if (typeof options === "boolean") options = { force: options, priority: options ? 4 : 1 };
  const priority = options.priority ?? 1;
  const key = options.key || message;
  const cooldownUntil = state.nurseMessageCooldowns[key] || 0;
  if (!options.bypassCooldown && state.frame < cooldownUntil) return;
  if (!options.force && state.nurseMessageTimer > 0 && priority < state.nurseMessagePriority) return;
  state.nurseMessage = message;
  state.nurseMessageTimer = duration;
  state.nurseMessagePriority = priority;
  state.nurseMessageCooldowns[key] = state.frame + (options.cooldown ?? 120);
}

function getDominantVitalChange(changes) {
  if (!changes) return "stability";
  return Object.entries(changes).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0]?.[0] || "stability";
}

function spawnTreatmentSparks(x, y, count) {
  for (let i = 0; i < count; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2.2,
      vy: -0.4 - Math.random() * 1.4,
      life: 12 + Math.random() * 12,
      color: i % 3 === 0 ? "#ffffff" : "#8ef6ff",
      size: 2 + Math.random() * 2,
      kind: "spark",
      alpha: 0.82,
    });
  }
}

function updateTreatmentEffects() {
  for (const effect of state.treatmentEffects) effect.life -= 1;
  state.treatmentEffects = state.treatmentEffects.filter((effect) => effect.life > 0);
}

function getRouteMissionMessage(area = getCurrentArea()) {
  const profile = getTreatmentProfile(area);
  return profile ? `治療目標: ${profile.objective}` : "患者状態を確認しながら進むよ";
}

function calculateTreatmentRank() {
  if (!state.vitals) return "C";
  const vitalScore = ((100 - state.vitals.infection) + (100 - state.vitals.inflammation) + state.vitals.oxygen + state.vitals.stability) / 4;
  const actionScore = state.treatmentStats.completed * 2.5 - state.treatmentStats.missed * 2 - state.treatmentStats.enemiesEscaped * 0.15;
  const total = clamp(vitalScore + actionScore, 0, 100);
  if (total >= 90) return "S";
  if (total >= 76) return "A";
  if (total >= 60) return "B";
  return "C";
}

function getVitalAssessment(key, value) {
  if (key === "infection") return value <= 35 ? "抑制" : value <= 65 ? "改善" : "要観察";
  if (key === "inflammation") return value <= 35 ? "低下" : value <= 65 ? "改善" : "要観察";
  if (key === "oxygen") return value >= 75 ? "安定" : value >= 45 ? "注意" : "低下";
  return value >= 75 ? "安定" : value >= 45 ? "回復中" : "不安定";
}

function getImprovedVitalLabels() {
  if (!state.vitals || !state.initialVitals) return "状態維持";
  const labels = [];
  if (state.vitals.infection < state.initialVitals.infection - 1) labels.push("感染抑制");
  if (state.vitals.inflammation < state.initialVitals.inflammation - 1) labels.push("炎症低下");
  if (state.vitals.oxygen > state.initialVitals.oxygen + 1) labels.push("酸素改善");
  if (state.vitals.stability > state.initialVitals.stability + 1) labels.push("安定化");
  return labels.length ? labels.join(" / ") : "状態維持";
}

function getWorsenedVitalLabels() {
  if (!state.vitals || !state.initialVitals) return "なし";
  const labels = [];
  if (state.vitals.infection > state.initialVitals.infection + 1) labels.push("感染上昇");
  if (state.vitals.inflammation > state.initialVitals.inflammation + 1) labels.push("炎症上昇");
  if (state.vitals.oxygen < state.initialVitals.oxygen - 1) labels.push("酸素低下");
  if (state.vitals.stability < state.initialVitals.stability - 1) labels.push("安定低下");
  return labels.length ? labels.join(" / ") : "なし";
}

function getRouteTreatmentResultMessage() {
  const finalAreaId = getCurrentRoute()[getLastRouteIndex()];
  const success = state.treatmentStats.completed >= state.treatmentStats.missed;
  const messages = {
    mouth: ["口内細菌の増殖を抑制", "口内処置に未処置部位あり"],
    throat: ["喉の炎症保護に成功", "炎症部位の処置が不十分"],
    lung: ["肺胞保護に成功", "肺胞保護が一部不十分"],
    esophagus: ["食道粘膜を保護", "粘膜損傷の処置が不十分"],
    stomach: ["胃内毒素の中和に成功", "毒素中和が不十分"],
    intestine: ["毒素吸収を抑制", "毒素ポケットを一部見逃した"],
    vessel: ["血流閉塞を抑制", "血栓処置が一部不十分"],
    heart: ["心拍安定を維持", "心拍ノードに未処置あり"],
    brain: ["神経ノイズを大幅に抑制", "神経ノイズが一部残存"],
    nerve: ["通電異常の遮断に成功", "短絡部位が一部残存"],
  };
  const pair = messages[finalAreaId] || ["患者状態の安定化に成功", "追加観察が必要"];
  return success ? pair[0] : pair[1];
}

function getCurrentPatientTheme() {
  return getCurrentPatient().selectTheme || {
    accent: "#8ef6ff",
    secondary: "#ff6f8f",
    glow: "rgba(142, 246, 255, 0.28)",
  };
}

function getAreaScrollStyle(area = getCurrentArea()) {
  return area.scrollStyle || {};
}

function getRouteConfig(area = getCurrentArea()) {
  return ROUTES[area.id] || {
    background: area.id,
    ambient: area.ambience || "none",
    particles: null,
    enemyPool: area.enemyTypes || [],
    bossType: "viralCore",
    tint: null,
    bossHp: 1,
    briefingText: area.note || "",
  };
}

function getBossRouteArea() {
  const route = getCurrentRoute();
  const lastRouteId = route[getLastRouteIndex()];
  return getAreaById(lastRouteId);
}

function getBossRouteConfig() {
  return getRouteConfig(getBossRouteArea());
}

function getLastRouteIndex() {
  return Math.max(0, getCurrentRoute().length - 1);
}

function getBossConfig(boss = state.boss) {
  return BOSS_TYPES[boss?.type] || BOSS_TYPES.viralCore;
}

function getCurrentPatientAssetKey(patient = getCurrentPatient()) {
  if (!patient) return null;
  return patient.id === "Patient 02" ? "patient_food_poisoning" : "patient_cold";
}

function getPatientDisplayId(patient = getCurrentPatient()) {
  return String(patient.id || "").replace("Patient", "患者");
}

function getCurrentAreaDuration() {
  const patient = getCurrentPatient();
  const modifier = getStageModifier();
  return modifier.areaDurationByArea?.[getCurrentArea().id] ?? patient.areaDuration ?? GAME.areaDuration;
}

function getStomachTintBoost() {
  return (getStageModifier().stomachTintBoost ?? 0) + (getConditionModifier().stomachTintBoost ?? 0);
}

function getStomachAcidDamageInterval() {
  const base = getStageModifier().stomachAcidDamageInterval ?? 18;
  return Math.max(12, base + (getConditionModifier().stomachAcidDamageIntervalBonus ?? 0));
}

function setPatientBgm(mode) {
  state.currentBgm = `${getCurrentPatient().bgmTheme}:${mode}`;
}

function unlockAudio() {
  if (state.audioReady) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  try {
    state.audioContext = state.audioContext || new AudioCtor();
    state.audioContext.resume?.();
    state.audioReady = true;
  } catch (error) {
    state.audioReady = false;
  }
}

function updateAreaAmbience() {
  const ambience = getConditionModifier().ambience || getRouteConfig().ambient || getCurrentArea().ambience || "none";
  if (state.currentAmbience === ambience) return;
  state.currentAmbience = ambience;
  if (!state.audioReady || !state.audioContext) return;
  startAmbienceTone(ambience);
}

function stopAreaAmbience() {
  state.currentAmbience = "none";
  startAmbienceTone("none");
}

function playRouteEventCue(cue) {
  // TODO: replace oscillator cue hooks with proper short SE assets when audio assets are added.
  if (!cue || !state.audioReady || !state.audioContext) return;
  const audio = state.audioContext;
  const settings = {
    pulse: { freq: 68, type: "sine", gain: 0.035, life: 0.18 },
    bloodRush: { freq: 92, type: "sawtooth", gain: 0.026, life: 0.22 },
    glitch: { freq: 210, type: "square", gain: 0.018, life: 0.12 },
    electric: { freq: 260, type: "square", gain: 0.02, life: 0.16 },
  }[cue];
  if (!settings) return;
  try {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = settings.type;
    osc.frequency.value = settings.freq;
    gain.gain.value = settings.gain;
    osc.connect(gain).connect(audio.destination);
    osc.start();
    gain.gain.setTargetAtTime(0, audio.currentTime + settings.life * 0.35, 0.04);
    osc.stop(audio.currentTime + settings.life);
  } catch (error) {}
}

function playTreatmentCue(kind) {
  if (!kind || !state.audioReady || !state.audioContext) return;
  const audio = state.audioContext;
  const settings = {
    start: { from: 420, to: 560, type: "sine", gain: 0.018, life: 0.1 },
    complete: { from: 480, to: 820, type: "sine", gain: 0.032, life: 0.2 },
    miss: { from: 180, to: 105, type: "sawtooth", gain: 0.022, life: 0.18 },
    danger: { from: 150, to: 118, type: "square", gain: 0.016, life: 0.14 },
    rankS: { from: 520, to: 1040, type: "sine", gain: 0.032, life: 0.32 },
  }[kind];
  if (!settings) return;
  try {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = settings.type;
    osc.frequency.setValueAtTime(settings.from, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(settings.to, audio.currentTime + settings.life);
    gain.gain.setValueAtTime(settings.gain, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + settings.life);
    osc.connect(gain).connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + settings.life + 0.02);
  } catch (error) {}
}

function startAmbienceTone(ambience) {
  const audio = state.audioContext;
  if (!audio) return;
  try {
    if (state.ambienceNode) {
      state.ambienceNode.gain.gain.setTargetAtTime(0, audio.currentTime, 0.05);
      state.ambienceNode.osc.stop(audio.currentTime + 0.12);
      state.ambienceNode = null;
    }
    if (ambience === "none" || ambience === "alert") return;
    const settings = {
      breath: { freq: 96, type: "sine", gain: 0.018 },
      airPulse: { freq: 118, type: "sine", gain: 0.012 },
      fluidFlow: { freq: 74, type: "triangle", gain: 0.012 },
      stomachLiquid: { freq: 58, type: "sawtooth", gain: 0.012 },
      pulse: { freq: 82, type: "sine", gain: 0.014 },
      softBubble: { freq: 104, type: "sine", gain: 0.01 },
      heartbeat: { freq: 54, type: "sine", gain: 0.016 },
      bloodFlow: { freq: 70, type: "sawtooth", gain: 0.011 },
      neuralNoise: { freq: 146, type: "triangle", gain: 0.01 },
      electric: { freq: 190, type: "square", gain: 0.007 },
      feverHum: { freq: 132, type: "sine", gain: 0.011 },
      roughAir: { freq: 88, type: "sawtooth", gain: 0.009 },
      acidMurmur: { freq: 64, type: "triangle", gain: 0.012 },
      dryPulse: { freq: 72, type: "sine", gain: 0.01 },
    }[ambience];
    if (!settings) return;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = settings.type;
    osc.frequency.value = settings.freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(audio.destination);
    osc.start();
    gain.gain.setTargetAtTime(settings.gain, audio.currentTime, 0.08);
    state.ambienceNode = { osc, gain };
  } catch (error) {
    state.ambienceNode = null;
  }
}

function changePatientSelection(direction) {
  if (!PATIENTS.length) return;
  let next = state.currentPatientIndex;
  do {
    next = (next + direction + PATIENTS.length) % PATIENTS.length;
  } while (!PATIENTS[next].unlocked && next !== state.currentPatientIndex);
  if (next === state.currentPatientIndex) return;
  state.currentPatientIndex = next;
  state.learningSummary = [...getCurrentPatient().learningSummary];
  state.uiNoiseTimer = 6;
  state.patientSwapTimer = 20;
}

function getAreaLabel() {
  return `AREA ${state.areaIndex + 1} : ${String(getCurrentArea().name).toUpperCase()}`;
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
  if (state.scene === "patientSelect") {
    state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
    state.patientSwapTimer = Math.max(0, state.patientSwapTimer - 1);
    return;
  }
  if (state.scene === "briefing") {
    state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
    return;
  }
  if (state.scene === "injection") {
    updateInjectionScene();
    return;
  }
  if (state.scene === "extraction") {
    updateExtractionScene();
    return;
  }
  if (state.scene === "gameover" || state.scene === "clear" || state.scene === "result") {
    state.gameOverTimer += 1;
    state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
    state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
    return;
  }

  const player = state.player;
  player.invuln = Math.max(0, player.invuln - 1);
  player.shotTimer = Math.max(0, player.shotTimer - 1);
  state.noteTimer = Math.max(0, state.noteTimer - 1);
  state.areaBannerTimer = Math.max(0, state.areaBannerTimer - 1);
  state.areaEntryTimer = Math.max(0, state.areaEntryTimer - 1);
  state.powerUpNoticeTimer = Math.max(0, state.powerUpNoticeTimer - 1);
  state.routeEventNoticeTimer = Math.max(0, state.routeEventNoticeTimer - 1);
  state.nurseMessageTimer = Math.max(0, state.nurseMessageTimer - 1);
  if (state.nurseMessageTimer === 0) state.nurseMessagePriority = 0;
  state.vitalWarningTimer = Math.max(0, state.vitalWarningTimer - 1);
  state.vitalsHudFlashTimer = Math.max(0, state.vitalsHudFlashTimer - 1);
  state.treatmentGlowTimer = Math.max(0, state.treatmentGlowTimer - 1);
  state.bossWarningTimer = Math.max(0, state.bossWarningTimer - 1);
  state.cameraShake = Math.max(0, state.cameraShake - 0.4);
  state.cameraDriftX *= 0.88;
  state.cameraDriftY *= 0.88;
  state.damageFlashTimer = Math.max(0, state.damageFlashTimer - 1);
  state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
  state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
  state.bossDamageFlashTimer = Math.max(0, state.bossDamageFlashTimer - 1);
  state.bossHitStopCooldown = Math.max(0, state.bossHitStopCooldown - 1);

  if (state.bossSpawnQueued && state.bossWarningTimer === 0 && !state.bossActive) {
    spawnBoss();
  }

  updateCameraDrift();
  updateAreaAmbience();
  updateAreaMotion();
  updateRouteEffects(getCurrentArea());
  updateRouteEvent();

  if (state.bossDefeatTimer > 0) {
    updateBossDefeatSequence();
    return;
  }

  updateStageProgress();
  updateVitals();
  updatePlayer(player);
  updateHelper();
  updateEnemies();
  updateBoss();
  updateShots();
  updateCapsules();
  updateHazards();
  updateTreatmentTargets();
  updateTreatmentEffects();
  updateVitalPopups();
  updateParticles();
  updateScorePopups();
  handleCollisions();
  cleanupEntities();
}

function updateInjectionScene() {
  state.injectionTimer += 1;
  state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
  state.cameraShake = Math.max(0, state.cameraShake - 0.3);
  state.cameraDriftX += (2.2 - state.cameraDriftX) * 0.1;
  state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
  if (state.injectionTimer === 1) {
    setPatientBgm("warning");
  }
  if (state.injectionTimer === 24) {
    state.screenFlashTimer = 8;
    state.uiNoiseTimer = 8;
  }
  if (state.injectionTimer === 118) {
    state.screenFlashTimer = 10;
  }
  if (state.injectionTimer >= 150) {
    beginPlaying();
  }
}

function triggerHitStop(frames) {
  state.hitStopTimer = Math.max(state.hitStopTimer, frames);
}

function updateCameraDrift() {
  const area = getCurrentArea();
  const scrollStyle = getAreaScrollStyle(area);
  const space = getRouteSpaceMotion(area);
  const targetX = clamp(state.globalScrollBonus * 1.1, -2, 5) + (state.boss && !state.boss.entered ? 1.5 : 0) + space.cameraX;
  const targetY = Math.sin(state.frame * 0.03) * (scrollStyle.driftY ?? (area.id === "stomach" ? 0.8 : 0)) + space.cameraY;
  state.cameraDriftX += (targetX - state.cameraDriftX) * 0.08;
  state.cameraDriftY += (targetY - state.cameraDriftY) * 0.08;
}

function getRouteSpaceMotion(area = getCurrentArea()) {
  const f = state.frame;
  const id = area.id;
  if (id === "throat" || id === "esophagus") {
    const squeeze = (Math.sin(f * 0.045) + 1) * 0.5;
    return { cameraX: 0, cameraY: squeeze * 0.45, pushX: 0, pushY: 0.18 + squeeze * 0.16, squeeze };
  }
  if (id === "stomach") {
    return { cameraX: Math.sin(f * 0.026) * 0.55, cameraY: Math.sin(f * 0.038) * 0.75, pushX: 0, pushY: Math.sin(f * 0.04) * 0.08, squeeze: 0 };
  }
  if (id === "vessel") {
    const pulse = (Math.sin(f * 0.07) + 1) * 0.5;
    return { cameraX: 1.1 + pulse * 0.65, cameraY: Math.sin(f * 0.05) * 0.35, pushX: -0.16 - pulse * 0.1, pushY: 0, squeeze: pulse };
  }
  if (id === "heart") {
    const pulse = state.routePulseTimer > 0 ? state.routePulseTimer / 28 : Math.max(0, Math.sin(f * 0.052));
    return { cameraX: pulse * 0.25, cameraY: pulse * 0.35, pushX: 0, pushY: 0, squeeze: pulse };
  }
  if (id === "lung") {
    const breath = Math.sin(f * 0.035);
    return { cameraX: breath * 0.25, cameraY: breath * 0.55, pushX: -0.04, pushY: -0.08 + breath * 0.08, squeeze: (breath + 1) * 0.5 };
  }
  if (id === "brain") {
    const glitch = state.fakeWarningTimer > 0 || state.frame % 180 < 8 ? 1 : 0;
    return { cameraX: glitch ? Math.sin(f * 2.1) * 1.1 : 0, cameraY: glitch ? Math.cos(f * 1.7) * 0.8 : 0, pushX: 0, pushY: 0, squeeze: glitch };
  }
  if (id === "nerve") {
    const pulse = state.frame % 90 < 10 ? 1 : 0;
    return { cameraX: pulse * 0.4, cameraY: Math.sin(f * 0.08) * 0.35, pushX: 0, pushY: 0, squeeze: pulse };
  }
  return { cameraX: 0, cameraY: 0, pushX: 0, pushY: 0, squeeze: 0 };
}

function updateAreaMotion() {
  const area = getCurrentArea();
  const scrollStyle = getAreaScrollStyle(area);
  const condition = getConditionModifier();
  const routeConfig = getRouteConfig(area);
  if (scrollStyle.cameraPulse) {
    state.cameraShake = Math.max(state.cameraShake, 0.45 + Math.sin(state.frame * 0.08) * scrollStyle.cameraPulse);
  }
  const space = getRouteSpaceMotion(area);
  if (area.id === "heart") {
    state.routeScalePulse = Math.max(state.routeScalePulse, Math.min(0.004, space.squeeze * 0.004));
  }
  if (area.id === "vessel") {
    state.globalScrollBonus = Math.max(state.globalScrollBonus, space.squeeze * 0.22);
  }
  if (routeConfig.particles && state.frame % routeConfig.particles.rate === 0) {
    spawnAmbientParticle(routeConfig.particles.color, routeConfig.particles.alpha, routeConfig.particles.speed);
  }
  if (condition.particleRate && state.frame % condition.particleRate === 0) {
    spawnAmbientParticle(condition.particleColor, 0.13, 0.85);
  }
}

function updateRouteEffects(area) {
  state.routePulseTimer = Math.max(0, state.routePulseTimer - 1);
  state.fakeWarningTimer = Math.max(0, state.fakeWarningTimer - 1);
  state.routeScalePulse = Math.max(0, state.routeScalePulse - 0.05);

  getRouteConfig(area).gimmickUpdate?.(area);
}

function getActiveRouteEventDef() {
  return state.activeRouteEvent ? ROUTE_EVENTS[state.activeRouteEvent.id] : null;
}

function getRouteEventModifier() {
  return getActiveRouteEventDef() || {};
}

function maybeStartRouteEvent(area) {
  const routeConfig = getRouteConfig(area);
  if (!routeConfig.events?.length || state.activeRouteEvent || state.routeEventCooldown > 0) return;
  const areaDuration = getCurrentAreaDuration();
  if (state.areaFrame < 160 || areaDuration - state.areaFrame < 150) return;
  if (state.routeEventsTriggered.length >= 2) return;
  if (state.frame % 90 !== 0 || Math.random() > 0.42) return;

  const candidates = routeConfig.events.filter((id) => !state.routeEventsTriggered.includes(id));
  if (!candidates.length) return;
  startRouteEvent(candidates[(Math.random() * candidates.length) | 0]);
}

function startRouteEvent(eventId) {
  const eventDef = ROUTE_EVENTS[eventId];
  if (!eventDef) return;
  state.activeRouteEvent = {
    id: eventId,
    timer: eventDef.duration,
    duration: eventDef.duration,
  };
  state.routeEventsTriggered.push(eventId);
  state.routeEventCooldown = 260;
  state.routeEventNoticeTimer = 60;
  state.routeEventNoticeText = eventDef.label;
  state.uiNoiseTimer = Math.max(state.uiNoiseTimer, eventDef.uiNoise || 0);
  if (eventDef.fakeWarning) state.fakeWarningTimer = Math.max(state.fakeWarningTimer, 96);
  if (eventDef.freezeFrames) triggerHitStop(eventDef.freezeFrames);
  playRouteEventCue(eventDef.cue);
  showNurseMessage(`${eventDef.label}、患者反応を監視して`, 96, true);
}

function updateRouteEvent() {
  state.routeEventCooldown = Math.max(0, state.routeEventCooldown - 1);
  if (!state.bossActive && !state.bossSpawnQueued) {
    maybeStartRouteEvent(getCurrentArea());
  }
  const eventDef = getActiveRouteEventDef();
  if (!eventDef || !state.activeRouteEvent) return;

  state.activeRouteEvent.timer -= 1;
  if (eventDef.scrollBonus) state.globalScrollBonus = Math.max(state.globalScrollBonus, eventDef.scrollBonus);
  if (eventDef.pulseBoost) {
    state.routePulseTimer = Math.max(state.routePulseTimer, 16);
    state.routeScalePulse = Math.max(state.routeScalePulse, eventDef.scalePulse || 0);
  }
  if (eventDef.particleRate && state.activeRouteEvent.timer % eventDef.particleRate === 0) {
    spawnAmbientParticle(eventDef.particleColor || "#ffffff", 0.18, eventDef.scrollBonus ? 1.8 : 1.1);
  }
  if (eventDef.spawnType && state.activeRouteEvent.timer % eventDef.spawnInterval === 0) {
    state.enemies.push(makeEnemy(eventDef.spawnType, GAME.width + 70, 86 + Math.random() * 350));
  }
  if (eventDef.laserInterval && state.activeRouteEvent.timer % eventDef.laserInterval === 0) {
    spawnNerveLaser();
  }
  if (state.activeRouteEvent.timer <= 0) {
    state.activeRouteEvent = null;
  }
}

function updateHeartRoute(area) {
  if (state.frame % 120 !== 0) return;
  state.routePulseTimer = 28;
  state.routeScalePulse = 0.006;
  state.globalScrollBonus = Math.max(state.globalScrollBonus, 0.45);
}

function updateVesselRoute(area) {
  if (state.frame % 150 === 0) {
    state.globalScrollBonus = Math.max(state.globalScrollBonus, 0.6);
  }
}

function updateBrainRoute(area) {
  if (state.frame % 300 === 0) state.fakeWarningTimer = 72;
}

function updateNerveRoute(area) {
  if (state.frame % 210 !== 0) return;
  triggerHitStop(2);
  spawnNerveLaser();
}

function spawnNerveLaser() {
  state.hazards.push({
    kind: "laser",
    x: GAME.width + 20,
    y: 96 + Math.random() * 318,
    vx: -3.2,
    w: 220,
    h: 8,
    life: 120,
    warmup: 34,
  });
}

function updateBossDefeatSequence() {
  state.bossDefeatTimer -= 1;
  state.cameraShake = Math.max(0, state.cameraShake - 0.25);
  state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
  state.enemyShots = [];
  state.enemies = [];
  updateShots();
  updateCapsules();
  updateHazards();
  updateParticles();
  updateScorePopups();
  cleanupEntities();

  if (state.bossDefeatTimer % 14 === 0) {
    const spread = 70 + (GAME.bossDefeatDuration - state.bossDefeatTimer) * 0.5;
    explodeAt(
      state.defeatedBossX + (Math.random() - 0.5) * spread,
      state.defeatedBossY + (Math.random() - 0.5) * spread,
      34 + Math.random() * 26,
      state.bossDefeatTimer % 28 === 0 ? "#ffffff" : "#9ff7ff"
    );
  }

  if (state.bossDefeatTimer <= 0) {
    startExtraction();
  }
}

function startExtraction() {
  const route = getCurrentRoute();
  const lastRouteIndex = Math.max(0, route.length - 1);
  state.scene = "extraction";
  state.extractionTimer = 0;
  state.extractionPhase = 0;
  state.areaIndex = lastRouteIndex;
  state.extractionAreaId = route[lastRouteIndex] || getCurrentArea().id;
  state.gameOverTimer = 0;
  state.screenFlashTimer = 12;
  state.cameraShake = 0;
  state.enemyShots = [];
  state.enemies = [];
  state.hazards = [];
  state.treatmentTargets = [];
  state.activeRouteEvent = null;
  state.routeEventNoticeTimer = 0;
  improveVitals({ infection: -3, inflammation: -3, oxygen: 2, stability: 4 });
  setPatientBgm("extraction");
  // TODO: route / bossTypeごとの帰還BGMへ分岐する場合はここで currentBgm を差し替える。
}

function updateExtractionScene() {
  state.extractionTimer += 1;
  state.extractionPhase = state.extractionTimer < 80 ? 1 : state.extractionTimer < 170 ? 2 : state.extractionTimer < 235 ? 3 : 4;
  state.screenFlashTimer = Math.max(0, state.screenFlashTimer - 1);
  state.uiNoiseTimer = Math.max(0, state.uiNoiseTimer - 1);
  state.cameraDriftX *= 0.9;
  state.cameraDriftY *= 0.9;
  state.globalScrollBonus *= 0.94;
  state.routePulseTimer = Math.max(0, state.routePulseTimer - 1);
  state.fakeWarningTimer = 0;
  state.routeScalePulse = Math.max(0, state.routeScalePulse - 0.06);

  if (state.extractionTimer % 28 === 0 && state.particles.length < GAME.maxParticles - 8) {
    spawnAmbientParticle("#dffcff", 0.12, 0.5);
  }

  if (state.player) {
    const targetX = state.extractionPhase >= 3 ? 770 : GAME.width * 0.5;
    const targetY = state.extractionPhase >= 3 ? 104 : GAME.height * 0.42;
    state.player.x += (targetX - state.player.x) * 0.035;
    state.player.y += (targetY - state.player.y) * 0.035;
    state.player.invuln = 0;
  }

  updateParticles();
  cleanupEntities();

  if (state.extractionTimer >= GAME.extractionDuration) {
    state.scene = "result";
    state.gameOverTimer = 0;
    state.screenFlashTimer = 10;
    if (!state.resultCuePlayed && calculateTreatmentRank() === "S") playTreatmentCue("rankS");
    state.resultCuePlayed = true;
  }
}

function updateStageProgress() {
  if (state.bossActive || state.bossSpawnQueued) {
    return;
  }

  state.areaFrame += 1;
  const area = getCurrentArea();
  spawnAreaEnemies(area);
  spawnAreaHazards(area);
  if (state.areaFrame === 170 || state.areaFrame === 510) spawnTreatmentTarget(area);

  if (state.areaFrame >= getCurrentAreaDuration()) {
    expireTreatmentTargets(area.id);
    state.areaFrame = 0;
    state.areaIndex += 1;
    if (state.areaIndex >= getCurrentRoute().length) {
      startBossWarning();
      return;
    }
    state.noteTimer = GAME.noteDuration;
    state.areaBannerTimer = 180;
    state.areaEntryTimer = 110;
    state.activeRouteEvent = null;
    state.routeEventCooldown = 120;
    state.routeEventsTriggered = [];
    state.routeEventNoticeTimer = 0;
    showNurseMessage(getRouteMissionMessage(), 120, true);
  }
}

function startBossWarning() {
  state.bossSpawnQueued = true;
  state.bossWarningTimer = 96;
  setPatientBgm("warning");
  state.areaIndex = getLastRouteIndex();
  state.areaBannerTimer = 0;
  state.noteTimer = 0;
  state.activeRouteEvent = null;
  state.routeEventNoticeTimer = 0;
  state.treatmentTargets = [];
  state.cameraShake = 6;
  showNurseMessage("感染中枢を確認、最終処置に入るよ", 120, true);
}

function spawnBoss() {
  const routeConfig = getBossRouteConfig();
  const bossMaxHp = Math.round(GAME.bossMaxHp * (getConditionModifier().bossHp ?? 1) * (routeConfig.bossHp ?? 1));
  state.bossSpawnQueued = false;
  state.bossActive = true;
  setPatientBgm("boss");
  state.areaIndex = getLastRouteIndex();
  state.areaBannerTimer = 240;
  state.noteTimer = 200;
  state.cameraShake = 10;
  state.boss = {
    x: GAME.width + 140,
    y: GAME.height / 2,
    w: 132,
    h: 132,
    hp: bossMaxHp,
    maxHp: bossMaxHp,
    attackTimer: 0,
    phase: 0,
    dashTimer: 0,
    summonTimer: 0,
    entered: false,
    type: routeConfig.bossType || "viralCore",
  };
  // TODO: branch boss battle music here with state.boss.type, e.g. boss_heart / boss_brain.
  state.currentBgm = `${state.currentBgm}:${state.boss.type}`;
  state.bossHpLag = state.boss.maxHp;
  state.bossDamageFlashTimer = 18;
  state.bossHitStopCooldown = 0;
  state.screenFlashTimer = 8;
}

function updatePlayer(player) {
  const input = getMovementInput();
  const area = getCurrentArea();
  const scrollStyle = getAreaScrollStyle(area);
  const speedBonus = player.speed;
  const verticalSpeed = speedBonus * (scrollStyle.lowGravity ?? 1);
  player.x += input.x * speedBonus;
  player.y += input.y * verticalSpeed;
  if (area.id === "lung") {
    player.y += Math.sin(state.frame * 0.055) * 0.32;
  }
  if (scrollStyle.flowY) {
    player.y += Math.sin(state.frame * 0.035) * scrollStyle.flowY;
  }
  const spaceMotion = getRouteSpaceMotion(area);
  player.x += spaceMotion.pushX;
  player.y += spaceMotion.pushY;

  let topLimit = 42;
  let bottomLimit = GAME.height - 48;

  if (area.id === "throat" || area.id === "esophagus" || area.id === "intestine" || scrollStyle.narrow) {
    const swallowBoost = area.id === "throat" || area.id === "esophagus" ? 8 + spaceMotion.squeeze * 14 : 0;
    const narrowBoost = (scrollStyle.narrow ? 18 : 0) + swallowBoost + (getRouteEventModifier().narrowBoost ?? 0);
    topLimit = 68 + narrowBoost + Math.sin(state.frame * 0.03) * 10;
    bottomLimit = GAME.height - 72 - narrowBoost + Math.sin(state.frame * 0.03 + 1.5) * 10;
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
  const shotSpeed = getRouteEventModifier().shotSpeed ?? 1;
  return { x, y, vx: vx * shotSpeed, vy: vy * shotSpeed, damage, type, r: type === "capsule" ? 8 : type === "spray" ? 3 : 4 };
}

function spawnMuzzleFlash(x, y, color) {
  if (state.bossActive && state.frame % 2 !== 0) return;
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
  const burstCount = state.bossActive ? 1 : 7;
  for (let i = 0; i < burstCount; i += 1) {
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
  improveVitals({ inflammation: -1.5, oxygen: 1, stability: 3 });
  showNurseMessage("緊急安定化を実施", 90, true);
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

function spawnAmbientParticle(color, alpha, speed) {
  state.particles.push({
    x: GAME.width + 12,
    y: 62 + Math.random() * 410,
    vx: -speed - Math.random() * 0.8,
    vy: (Math.random() - 0.5) * 0.45,
    life: 80 + Math.random() * 34,
    color,
    size: 2 + Math.random() * 3,
    kind: "spark",
    alpha,
  });
}

function spawnAreaEnemies(area) {
  const intervalBase = area.id === "nest" ? 42 : area.id === "throat" ? 58 : area.id === "lung" ? 64 : area.id === "stomach" ? 60 : 68;
  if (state.frame % intervalBase !== 0) return;
  const pool = getRouteConfig(area).enemyPool?.length ? getRouteConfig(area).enemyPool : area.enemyTypes;
  const type = pool[(Math.random() * pool.length) | 0];
  state.enemies.push(makeEnemy(type));
  const condition = getConditionModifier();
  if (condition.enemyCountBonus && Math.random() < condition.enemyCountBonus) {
    state.enemies.push(makeEnemy(pool[(Math.random() * pool.length) | 0], GAME.width + 80, 95 + Math.random() * 320));
  }

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

  if (area.gimmick === "breath" && state.frame % 170 === 0) {
    state.globalScrollBonus = -0.45;
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
    airborneVirus: { hp: 4, vx: -2.35, vy: 1.6, size: 20, score: 180, shot: false },
    floatingBacteria: { hp: 5, vx: -2.05, vy: 1.4, size: 24, score: 190, shot: false },
    clot: { hp: 6, vx: -2.4, vy: 0.6, size: 26, score: 220, shot: false },
    pulseCell: { hp: 4, vx: -3.1, vy: 1.2, size: 22, score: 190, shot: false },
    bloodParasite: { hp: 5, vx: -2.6, vy: 0.9, size: 24, score: 230, shot: true },
    microClot: { hp: 4, vx: -3.6, vy: 0.4, size: 18, score: 180, shot: false },
    parasiteSwarm: { hp: 3, vx: -4.0, vy: 0.9, size: 16, score: 170, shot: false },
    vesselEye: { hp: 7, vx: -2.2, vy: 1.0, size: 28, score: 260, shot: true },
    neuronBug: { hp: 4, vx: -2.8, vy: 1.1, size: 20, score: 190, shot: false },
    hallucinationEye: { hp: 5, vx: -2.4, vy: 1.3, size: 24, score: 240, shot: true },
    synapseCrawler: { hp: 5, vx: -3.0, vy: 0.7, size: 22, score: 220, shot: false },
    sparkMite: { hp: 3, vx: -3.6, vy: 1.0, size: 18, score: 180, shot: false },
    nerveEel: { hp: 5, vx: -2.8, vy: 1.5, size: 28, score: 240, shot: false },
    shockCell: { hp: 5, vx: -2.5, vy: 1.0, size: 23, score: 230, shot: true },
    acidBubble: { hp: 4, vx: -2.8, vy: -0.8, size: 24, score: 170, shot: false },
    acidSlime: { hp: 6, vx: -2.4, vy: 0.55, size: 28, score: 230, shot: false },
    toxicBlob: { hp: 5, vx: -2.15, vy: 0.85, size: 24, score: 240, shot: true },
    foodBlock: { hp: 8, vx: -2, vy: 0, size: 32, score: 240, shot: false },
    metalShard: { hp: 6, vx: -3.6, vy: 0.4, size: 20, score: 200, shot: false },
    badBacteria: { hp: 5, vx: -3, vy: 1.1, size: 24, score: 200, shot: true },
    toxin: { hp: 4, vx: -2.8, vy: 0.7, size: 16, score: 180, shot: true },
    swarmVirus: { hp: 3, vx: -4, vy: 0.6, size: 16, score: 140, shot: false },
    midVirus: { hp: 16, vx: -1.8, vy: 1.1, size: 42, score: 550, shot: true },
  };
  const config = map[type];
  const condition = getConditionModifier();
  const speed = (condition.enemySpeed ?? 1) * (getRouteEventModifier().enemySpeed ?? 1);
  return {
    type,
    x,
    y,
    w: config.size,
    h: config.size,
    hp: config.hp,
    maxHp: config.hp,
    vx: config.vx * speed,
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
    if (enemy.type === "airborneVirus" || enemy.type === "floatingBacteria") enemy.y += Math.sin(enemy.timer * 0.035 + enemy.wave) * 0.72;
    if (enemy.type === "acidSlime" || enemy.type === "toxicBlob") enemy.y += Math.sin(enemy.timer * 0.07 + enemy.wave) * 0.95;
    if (enemy.type === "pulseCell" || enemy.type === "clot") enemy.x -= state.routePulseTimer > 0 ? 0.45 : 0;
    if (enemy.type === "nerveEel" || enemy.type === "shockCell") enemy.y += Math.sin(enemy.timer * 0.14 + enemy.wave) * 0.8;

    if (enemy.shot && enemy.timer % GAME.enemyShotInterval === 0) {
      const dy = state.player.y - enemy.y;
      const distance = Math.max(1, Math.hypot(state.player.x - enemy.x, dy));
      state.enemyShots.push({
        x: enemy.x - 10,
        y: enemy.y,
        vx: -4.1 - (state.routePulseTimer > 0 ? 0.35 : 0),
        vy: (dy / distance) * 1.9,
        r: enemy.type === "toxin" || enemy.type === "toxicBlob" ? 8 : 5,
        type: enemy.type === "toxin" || enemy.type === "toxicBlob" ? "toxin" : "virus",
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
        bossType: boss.type,
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
    state.defeatedBossX = boss.x;
    state.defeatedBossY = boss.y;
    state.boss = null;
    state.bossActive = false;
    state.bossDefeated = true;
    state.bossDefeatTimer = GAME.bossDefeatDuration;
    state.enemies = [];
    state.enemyShots = [];
    state.playerShots = [];
    state.activeRouteEvent = null;
    state.routeEventNoticeTimer = 0;
    improveVitals({ infection: -15, inflammation: -9, oxygen: 5, stability: 8 });
    showNurseMessage("感染源を除去、患者状態を確認", 120, true);
    setPatientBgm("clear");
    state.cameraShake = 18;
    state.screenFlashTimer = 18;
    triggerHitStop(8);
    stopAreaAmbience();
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
  const stomachAcidDamageInterval = getStomachAcidDamageInterval();
  for (const hazard of state.hazards) {
    hazard.life -= 1;
    hazard.x += hazard.vx;
    if (hazard.kind === "bubble") {
      hazard.y += Math.sin((state.frame + hazard.r) * 0.05) * 0.7;
      hazard.r += Math.sin(state.frame * 0.04 + hazard.x * 0.01) * 0.03;
    }
    if (hazard.kind === "laser") {
      hazard.warmup = Math.max(0, hazard.warmup - 1);
      hazard.y += Math.sin(state.frame * 0.08 + hazard.x * 0.01) * 0.35;
    }
  }

  if (area.id === "stomach") {
    const acidTop = GAME.height - 58 - (Math.sin(state.frame * 0.06) * 10 + 14);
    if (state.player.y + state.player.h / 2 > acidTop && state.frame % stomachAcidDamageInterval === 0) {
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
    for (const target of state.treatmentTargets) {
      if (!target.resolved && hitCircleRect(shot.x, shot.y, shot.r, toRect(target))) {
        shot.hit = true;
        hitTreatmentTarget(target, shot.damage, shot.x, shot.y);
        break;
      }
    }
    for (const enemy of state.enemies) {
      if (shot.hit) break;
      if (hitCircleRect(shot.x, shot.y, shot.r, toRect(enemy))) {
        shot.hit = true;
        enemy.hp -= shot.damage;
        spawnShotHitEffect(shot.x, shot.y);
        triggerHitStop(2);
        break;
      }
    }
    if (!shot.hit && state.boss && hitCircleRect(shot.x, shot.y, shot.r, toRect(state.boss))) {
      const shouldHitStop = state.bossHitStopCooldown === 0;
      shot.hit = true;
      state.boss.hp -= shot.damage;
      spawnShotHitEffect(shot.x, shot.y);
      state.bossDamageFlashTimer = Math.max(state.bossDamageFlashTimer, 10);
      if (shouldHitStop) {
        triggerHitStop(2);
        state.bossHitStopCooldown = 12;
      }
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
    if (hazard.kind === "laser" && hazard.warmup <= 0 && rectsOverlap(playerRect(player), { x: hazard.x - hazard.w / 2, y: hazard.y - hazard.h / 2, w: hazard.w, h: hazard.h })) {
      damagePlayer();
      hazard.life = Math.min(hazard.life, 20);
    }
  }
}

function cleanupEntities() {
  state.playerShots = state.playerShots.filter((s) => !s.hit && s.x < GAME.width + 40 && s.y > -30 && s.y < GAME.height + 30);
  state.enemyShots = state.enemyShots.filter((s) => !s.hit && s.x > -40 && s.y > -40 && s.y < GAME.height + 40);
  state.capsules = state.capsules.filter((c) => !c.hit && c.x > -40);
  state.hazards = state.hazards.filter((h) => h.life > 0 && h.x > -160);
  state.particles = state.particles.filter((p) => p.life > 0);
  if (state.playerShots.length > GAME.maxPlayerShots) state.playerShots.splice(0, state.playerShots.length - GAME.maxPlayerShots);
  if (state.enemyShots.length > GAME.maxEnemyShots) state.enemyShots.splice(0, state.enemyShots.length - GAME.maxEnemyShots);
  const particleLimit = state.bossActive ? Math.min(GAME.maxParticles, 110) : GAME.maxParticles;
  if (state.particles.length > particleLimit) state.particles.splice(0, state.particles.length - particleLimit);

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
      improveVitals({ infection: -0.12, inflammation: -0.05 });
      return false;
    }
    if (enemy.x <= -80) {
      onEnemyEscaped();
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
  state.powerUpNoticeText = `強化: ${POWER_LABELS[next] || next}`;
  state.powerUpNoticeTimer = GAME.powerUpNoticeDuration;
  improveVitals({ oxygen: 1, stability: 1.5 });
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
  worsenVitals({ inflammation: 1, oxygen: -1.5, stability: -4 });
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
  drawLivingSpaceLayer();
  drawNonDangerEffects();
  drawHazards();
  drawParticles();
  drawTreatmentTargets();
  drawTreatmentEffects();
  drawEnemiesLayer();
  drawEnemyShotsLayer();
  drawItemsLayer();
  drawScorePopups();
  drawVitalPopups();
  drawPlayerShotsLayer();
  drawHelpersLayer();
  drawPlayerLayer();
  drawUi();
  drawOverlays();
  ctx.restore();
}

function applyCameraShake() {
  const allowCameraMotion = state.scene === "playing" || state.scene === "injection" || state.scene === "extraction";
  if (!allowCameraMotion) return;
  if (state.damageFlashTimer > 0) {
    const zoom = 1 + state.damageFlashTimer * 0.002 + state.routeScalePulse;
    ctx.translate(GAME.width / 2, GAME.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-GAME.width / 2, -GAME.height / 2);
  } else if (state.routeScalePulse > 0) {
    const zoom = 1 + state.routeScalePulse;
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
  if (state.scene === "title" || state.scene === "patientSelect" || state.scene === "briefing" || state.scene === "injection" || state.scene === "result" || state.scene === "gameover" || state.scene === "clear") {
    const uiGrad = ctx.createLinearGradient(0, 0, 0, GAME.height);
    uiGrad.addColorStop(0, "#081018");
    uiGrad.addColorStop(0.55, "#0b1620");
    uiGrad.addColorStop(1, "#09111a");
    ctx.fillStyle = uiGrad;
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    for (let i = 0; i < 18; i += 1) {
      const x = (GAME.width - ((state.frame * 0.35 + i * 53) % (GAME.width + 160))) + 60;
      const y = (i * 71 + Math.sin((state.frame + i * 10) * 0.012) * 26) % GAME.height;
      ctx.fillStyle = "rgba(142, 246, 255, 0.035)";
      ctx.beginPath();
      ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  const area = getCurrentArea();
  const grad = ctx.createLinearGradient(0, 0, 0, GAME.height);
  grad.addColorStop(0, area.colorA);
  grad.addColorStop(1, area.colorB);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, GAME.width, GAME.height);

  const condition = getConditionModifier();
  const routeConfig = getRouteConfig(area);
  if (routeConfig.tint) {
    ctx.fillStyle = routeConfig.tint;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }
  if (condition.tint) {
    ctx.fillStyle = condition.tint;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

  if (area.id === "lung") {
    const pulse = 0.04 + Math.sin(state.frame * 0.04) * 0.018;
    ctx.fillStyle = `rgba(235, 255, 255, ${pulse})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

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
  if (state.scene === "title" || state.scene === "patientSelect" || state.scene === "briefing" || state.scene === "injection" || state.scene === "result" || state.scene === "gameover" || state.scene === "clear") {
    return;
  }
  const area = getCurrentArea();
  const hasBackgroundAsset = drawAreaBackgroundAsset(area);
  drawAreaParallaxBack(area);
  if (!hasBackgroundAsset) {
    const drawer = ROUTE_BACKGROUND_DRAWERS[area.id];
    if (drawer) drawer(area);
  }
  drawAreaParallaxFront(area);
}

function drawAreaBackgroundAsset(area) {
  const map = {
    mouth: "bg_mouth",
    throat: "bg_throat",
    lung: "bg_lung",
    esophagus: "bg_esophagus",
    stomach: "bg_stomach",
    intestine: "bg_intestine",
    heart: "bg_heart",
    vessel: "bg_vessel",
    brain: "bg_brain",
    nerve: "bg_nerve",
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
  } else if (area.id === "lung") {
    const breathe = 1 + Math.sin(state.frame * 0.035) * 0.05;
    ctx.fillStyle = "rgba(220, 252, 255, 0.07)";
    for (let i = 0; i < 5; i += 1) {
      const x = i * 230 - ((state.frame * 0.5) % 230);
      ctx.beginPath();
      ctx.ellipse(x + 120, 165 + (i % 2) * 180, 150 * breathe, 86 * breathe, 0.06, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(214, 251, 255, 0.12)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      const y = 80 + i * 70;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= GAME.width; x += 40) {
        ctx.lineTo(x, y + Math.sin((x + state.frame * 1.4 + i * 55) * 0.014) * 18);
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
  if (area.id === "mouth" || area.id === "throat" || area.id === "lung" || area.id === "esophagus") {
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

function drawLivingSpaceLayer() {
  if (state.scene !== "playing" && state.scene !== "extraction") return;
  const area = getCurrentArea();
  const space = getRouteSpaceMotion(area);
  ctx.save();
  if (area.id === "throat" || area.id === "esophagus") {
    drawSwallowingSpace(space);
  } else if (area.id === "stomach") {
    drawStomachSpace();
  } else if (area.id === "vessel") {
    drawVesselSpace(space);
  } else if (area.id === "heart") {
    drawHeartSpace(space);
  } else if (area.id === "lung") {
    drawLungSpace(space);
  } else if (area.id === "brain") {
    drawBrainSpace(space);
  } else if (area.id === "nerve") {
    drawNerveSpace(space);
  }
  ctx.restore();
}

function drawSwallowingSpace(space) {
  const squeeze = space.squeeze;
  const top = 34 + squeeze * 22;
  const bottom = GAME.height - 34 - squeeze * 22;
  ctx.fillStyle = "rgba(255, 190, 202, 0.1)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let x = 0; x <= GAME.width; x += 28) {
    ctx.lineTo(x, top + Math.sin((x + state.frame * 1.4) * 0.02) * 10);
  }
  ctx.lineTo(GAME.width, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 28) {
    ctx.lineTo(x, bottom + Math.sin((x + state.frame * 1.4 + 90) * 0.02) * 10);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
}

function drawStomachSpace() {
  const waveY = GAME.height - 92 + Math.sin(state.frame * 0.045) * 10;
  ctx.fillStyle = "rgba(255, 240, 120, 0.1)";
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 24) {
    ctx.lineTo(x, waveY + Math.sin((x + state.frame * 2.4) * 0.035) * 7);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 210, 0.11)";
  for (let i = 0; i < 7; i += 1) {
    const x = (i * 137 - state.frame * 0.7) % (GAME.width + 80);
    const y = 360 - ((state.frame * 0.55 + i * 37) % 260);
    ctx.beginPath();
    ctx.arc(x, y, 3 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVesselSpace(space) {
  ctx.strokeStyle = "rgba(255, 180, 190, 0.18)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 7; i += 1) {
    const y = 70 + i * 60;
    const offset = (state.frame * (3.8 + space.squeeze) + i * 80) % (GAME.width + 120);
    ctx.beginPath();
    ctx.moveTo(GAME.width - offset, y);
    ctx.lineTo(GAME.width - offset + 180, y + Math.sin(state.frame * 0.04 + i) * 10);
    ctx.stroke();
  }
}

function drawHeartSpace(space) {
  const pulse = Math.min(1, space.squeeze);
  if (pulse > 0.15) {
    ctx.fillStyle = `rgba(255, 225, 230, ${pulse * 0.07})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }
  ctx.strokeStyle = "rgba(255, 180, 190, 0.16)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.ellipse(GAME.width / 2, GAME.height / 2, 260 - pulse * 14, 160 - pulse * 8, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLungSpace(space) {
  const breath = 1 + (space.squeeze - 0.5) * 0.08;
  ctx.save();
  ctx.translate(GAME.width / 2, GAME.height / 2);
  ctx.scale(breath, breath);
  ctx.translate(-GAME.width / 2, -GAME.height / 2);
  ctx.strokeStyle = "rgba(225, 255, 255, 0.14)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i += 1) {
    const y = 55 + i * 55;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(GAME.width, y + Math.sin(state.frame * 0.025 + i) * 16);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBrainSpace(space) {
  if (!space.squeeze) return;
  ctx.fillStyle = "rgba(204, 188, 255, 0.07)";
  for (let i = 0; i < 5; i += 1) {
    const y = 80 + i * 72 + Math.sin(state.frame + i) * 4;
    ctx.fillRect(0, y, GAME.width, 2);
  }
}

function drawNerveSpace(space) {
  const active = space.squeeze || Math.floor(state.frame / 28) % 2 === 0;
  ctx.strokeStyle = active ? "rgba(215, 251, 255, 0.22)" : "rgba(120, 230, 255, 0.1)";
  ctx.lineWidth = active ? 3 : 2;
  for (let i = 0; i < 5; i += 1) {
    const x = (state.frame * 5 + i * 190) % (GAME.width + 120) - 80;
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x + 40, 160);
    ctx.lineTo(x - 10, 300);
    ctx.lineTo(x + 50, 500);
    ctx.stroke();
  }
}

function drawStomachForegroundVeil() {
  const tintBoost = getStomachTintBoost();
  ctx.fillStyle = `rgba(255, 236, 178, ${0.1 + tintBoost * 0.16})`;
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 24) {
    const y = GAME.height - 118 + Math.sin((x + state.frame * 1.8) * 0.018) * 10 + Math.sin((x + state.frame * 0.8) * 0.042) * 5;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.fillStyle = `rgba(255, 250, 220, ${0.05 + tintBoost * 0.12})`;
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

function drawLungBackground(area) {
  const pulse = 1 + Math.sin(state.frame * 0.04) * 0.06;
  ctx.fillStyle = "rgba(219, 251, 255, 0.14)";
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.ellipse(420 + i * 150, 270, 110 * pulse, 190 * pulse, i === 0 ? -0.16 : 0.16, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(240, 255, 255, 0.18)";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(490, 66);
  ctx.lineTo(490, 222);
  ctx.moveTo(490, 222);
  ctx.quadraticCurveTo(438, 236, 382, 342);
  ctx.moveTo(490, 222);
  ctx.quadraticCurveTo(542, 236, 598, 342);
  ctx.stroke();

  for (let i = 0; i < 18; i += 1) {
    const x = GAME.width - ((state.frame * (1.7 + (i % 3) * 0.4) + i * 74) % (GAME.width + 80));
    const y = 52 + (i * 37) % 430 + Math.sin(state.frame * 0.025 + i) * 18;
    ctx.fillStyle = i % 2 === 0 ? "rgba(235, 255, 255, 0.2)" : "rgba(142, 246, 255, 0.14)";
    ctx.beginPath();
    ctx.arc(x, y, 2 + (i % 4), 0, Math.PI * 2);
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
  const tintBoost = getStomachTintBoost();
  ctx.fillStyle = `rgba(255, 204, 139, ${0.12 + tintBoost * 0.25})`;
  ctx.beginPath();
  ctx.ellipse(500, 250, 330, 180, 0.08, 0, Math.PI * 2);
  ctx.fill();
  const acidY = GAME.height - 54 - (Math.sin(state.frame * 0.06) * 10 + 14);
  ctx.fillStyle = `rgba(229, 230, 110, ${0.72 + tintBoost * 0.18})`;
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 22) {
    ctx.lineTo(x, acidY + Math.sin((x + state.frame * 4) * 0.06) * 8);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.strokeStyle = `rgba(255, 255, 180, ${0.9 + tintBoost * 0.05})`;
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

function drawHeartBackground(area) {
  const pulse = 1 + Math.sin(state.frame * 0.052) * 0.045;
  ctx.fillStyle = "rgba(255, 172, 184, 0.13)";
  ctx.beginPath();
  ctx.ellipse(480, 270, 230 * pulse, 160 * pulse, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 218, 224, 0.16)";
  ctx.lineWidth = 16;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, 110 + i * 92);
    for (let x = 0; x <= GAME.width; x += 32) {
      ctx.lineTo(x, 110 + i * 92 + Math.sin((x + state.frame * 1.6 + i * 60) * 0.016) * 22);
    }
    ctx.stroke();
  }
}

function drawVesselBackground(area) {
  ctx.fillStyle = "rgba(255, 144, 154, 0.11)";
  for (let i = 0; i < 7; i += 1) {
    const y = 58 + i * 70;
    ctx.fillRect(0, y, GAME.width, 22);
  }
  ctx.strokeStyle = "rgba(255, 210, 216, 0.18)";
  ctx.lineWidth = 28;
  ctx.beginPath();
  ctx.moveTo(0, 72);
  ctx.lineTo(GAME.width, 72 + Math.sin(state.frame * 0.02) * 12);
  ctx.moveTo(0, GAME.height - 72);
  ctx.lineTo(GAME.width, GAME.height - 72 + Math.sin(state.frame * 0.02 + 1.6) * 12);
  ctx.stroke();
}

function drawBrainBackground(area) {
  ctx.strokeStyle = "rgba(226, 219, 255, 0.15)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 14; i += 1) {
    const y = 44 + i * 34;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= GAME.width; x += 28) {
      ctx.lineTo(x, y + Math.sin((x + state.frame * 1.1 + i * 42) * 0.025) * 18);
    }
    ctx.stroke();
  }
  if (state.fakeWarningTimer > 0 && Math.floor(state.frame / 5) % 2 === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }
}

function drawNerveBackground(area) {
  ctx.strokeStyle = "rgba(215, 251, 255, 0.18)";
  ctx.lineWidth = 4;
  for (let i = 0; i < 10; i += 1) {
    const y = 40 + i * 50;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= GAME.width; x += 36) {
      ctx.lineTo(x, y + Math.sin((x + state.frame * 2.2 + i * 36) * 0.03) * 14);
    }
    ctx.stroke();
  }
  if (Math.floor(state.frame / 18) % 2 === 0) {
    ctx.fillStyle = "rgba(202, 251, 255, 0.08)";
    ctx.fillRect(0, 252, GAME.width, 3);
  }
}

const ROUTE_BACKGROUND_DRAWERS = {
  mouth: drawMouthBackground,
  throat: drawThroatBackground,
  lung: drawLungBackground,
  esophagus: drawEsophagusBackground,
  stomach: drawStomachBackground,
  intestine: drawIntestineBackground,
  heart: drawHeartBackground,
  vessel: drawVesselBackground,
  brain: drawBrainBackground,
  nerve: drawNerveBackground,
  nest: drawNestBackground,
};

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
  if (area.id === "lung") {
    for (let i = 0; i < 12; i += 1) {
      const x = GAME.width - ((state.frame * (2.1 + (i % 4) * 0.22) + i * 86) % (GAME.width + 100));
      const y = 60 + (i * 41) % 410 + Math.sin(state.frame * 0.04 + i) * 24;
      ctx.fillStyle = i % 3 === 0 ? "rgba(235, 255, 255, 0.18)" : "rgba(126, 200, 220, 0.14)";
      ctx.beginPath();
      ctx.ellipse(x, y, 9 + (i % 3), 3 + (i % 2), 0.2, 0, Math.PI * 2);
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
  if (state.scene === "extraction") return;
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
    if (hazard.kind === "laser") {
      const active = hazard.warmup <= 0;
      ctx.fillStyle = active ? "rgba(202, 251, 255, 0.44)" : "rgba(202, 251, 255, 0.14)";
      ctx.fillRect(hazard.x - hazard.w / 2, hazard.y - hazard.h / 2, hazard.w, hazard.h);
      ctx.strokeStyle = active ? "#ffffff" : "rgba(255,255,255,0.42)";
      ctx.lineWidth = active ? 3 : 1.5;
      ctx.strokeRect(hazard.x - hazard.w / 2, hazard.y - hazard.h / 2, hazard.w, hazard.h);
    }
  }
}

function drawTreatmentTargets() {
  if (state.scene !== "playing") return;
  for (const target of state.treatmentTargets) {
    if (target.resolved) continue;
    drawTreatmentTargetMarker(target);
  }
}

function drawTreatmentTargetMarker(target) {
  const area = getAreaById(target.areaId);
  const accent = area.accent || "#8ef6ff";
  const treatedRatio = 1 - target.hp / target.maxHp;
  const pulse = 1 + Math.sin(target.pulse) * 0.06;
  ctx.save();
  ctx.translate(target.x, target.y);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "rgba(7, 18, 24, 0.82)";
  ctx.beginPath();
  ctx.arc(0, 0, 27, 0, Math.PI * 2);
  ctx.fill();
  drawTreatmentTargetCore(target);

  const ringRadius = 31 - treatedRatio * 7;
  ctx.strokeStyle = target.hitFlash > 0 ? "#ffffff" : accent;
  ctx.lineWidth = target.hitFlash > 0 ? 4 : 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, ringRadius, -Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();
  ctx.strokeStyle = "rgba(223, 252, 255, 0.72)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 21, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (target.hp / target.maxHp));
  ctx.stroke();

  const scanY = -20 + target.scan;
  ctx.strokeStyle = "rgba(142, 246, 255, 0.42)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-20, scanY);
  ctx.lineTo(20, scanY);
  ctx.stroke();

  ctx.fillStyle = "#dffcff";
  ctx.fillRect(-2, -7, 4, 14);
  ctx.fillRect(-7, -2, 14, 4);
  drawTreatmentProgress(target, accent);
  ctx.restore();
}

function drawTreatmentTargetCore(target) {
  const t = state.frame * 0.06;
  if (target.areaId === "mouth") {
    ctx.fillStyle = "rgba(245, 250, 242, 0.5)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 11, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(170, 210, 190, 0.6)";
    ctx.fillRect(-11, -2, 5, 4);
    ctx.fillRect(5, 3, 6, 3);
  } else if (target.areaId === "throat") {
    ctx.fillStyle = "rgba(255, 91, 112, 0.58)";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.arc(Math.cos(i * 1.6) * 9, Math.sin(i * 1.6) * 7, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (target.areaId === "lung") {
    ctx.fillStyle = "rgba(207, 247, 255, 0.58)";
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(Math.cos(i * 1.25) * 10, Math.sin(i * 1.25) * 9, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255, 105, 130, 0.68)";
    ctx.beginPath();
    ctx.arc(4, -3, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (target.areaId === "esophagus") {
    ctx.fillStyle = "rgba(255, 159, 176, 0.55)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 20, Math.sin(t) * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 230, 236, 0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, -13);
    ctx.lineTo(5, 13);
    ctx.stroke();
  } else if (target.areaId === "stomach" || target.areaId === "intestine") {
    ctx.fillStyle = target.areaId === "stomach" ? "rgba(206, 180, 62, 0.72)" : "rgba(170, 111, 224, 0.64)";
    ctx.beginPath();
    ctx.moveTo(-17, -5);
    ctx.quadraticCurveTo(-8, -19, 4, -12);
    ctx.quadraticCurveTo(19, -5, 13, 10);
    ctx.quadraticCurveTo(0, 19, -15, 9);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(244, 232, 119, 0.75)";
    ctx.beginPath();
    ctx.arc(5, 1, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (target.areaId === "vessel") {
    ctx.fillStyle = "rgba(116, 12, 30, 0.78)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 13, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 142, 157, 0.74)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-14, -2);
    ctx.lineTo(14, 2);
    ctx.stroke();
  } else if (target.areaId === "heart") {
    const beat = 1 + Math.max(0, Math.sin(t * 1.4)) * 0.18;
    ctx.save();
    ctx.scale(beat, beat);
    ctx.fillStyle = "rgba(255, 85, 108, 0.66)";
    ctx.beginPath();
    ctx.moveTo(0, -17);
    ctx.lineTo(16, 0);
    ctx.lineTo(0, 17);
    ctx.lineTo(-16, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else if (target.areaId === "brain") {
    ctx.fillStyle = "rgba(184, 157, 255, 0.65)";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(230, 222, 255, 0.8)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const a = i * 1.25 + t * 0.08;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 7, Math.sin(a) * 7);
      ctx.lineTo(Math.cos(a) * 19, Math.sin(a) * 19);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "rgba(174, 245, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(-11, 0, 7, 0, Math.PI * 2);
    ctx.arc(11, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-1, -6);
    ctx.lineTo(3, 6);
    ctx.lineTo(7, 0);
    ctx.stroke();
  }
}

function drawTreatmentProgress(target, accent) {
  const remaining = clamp(target.hp / target.maxHp, 0, 1);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(-28, 34, 56, 5);
  ctx.fillStyle = accent;
  ctx.fillRect(-28, 34, 56 * remaining, 5);
  ctx.fillStyle = target.treatmentStarted ? "#8ef6ff" : "#ffffff";
  ctx.font = "bold 8px monospace";
  ctx.fillText(target.treatmentStarted ? "TREATING" : "SHOT TO TREAT", -28, 50);
}

function drawTreatmentEffects() {
  for (const effect of state.treatmentEffects) {
    const progress = 1 - effect.life / effect.maxLife;
    const alpha = Math.min(1, effect.life / 18);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (effect.kind === "complete") {
      ctx.translate(effect.x, effect.y);
      ctx.strokeStyle = "#8ef6ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 20 + progress * 38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 12 + progress * 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#dffcff";
      ctx.font = "bold 13px monospace";
      ctx.fillText(effect.text, -42, -35 - progress * 8);
    } else {
      ctx.fillStyle = "rgba(70, 6, 18, 0.78)";
      ctx.fillRect(effect.x - 104, effect.y - 18, 208, 36);
      ctx.strokeStyle = "#ff8297";
      ctx.strokeRect(effect.x - 104, effect.y - 18, 208, 36);
      ctx.fillStyle = "#ffe9ed";
      ctx.font = "bold 14px monospace";
      ctx.fillText(effect.text, effect.x - 82, effect.y + 5);
    }
    ctx.restore();
  }
}

function drawVitalPopups() {
  for (const popup of state.vitalPopups) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, popup.life / 16);
    ctx.fillStyle = "rgba(5, 14, 20, 0.72)";
    ctx.fillRect(popup.x - 4, popup.y - 12, 88, 17);
    ctx.fillStyle = popup.color;
    ctx.font = "bold 11px monospace";
    ctx.fillText(popup.text, popup.x, popup.y);
    ctx.restore();
  }
}

function drawAcidHazardZone() {
  const tintBoost = getStomachTintBoost();
  const acidY = GAME.height - 54 - (Math.sin(state.frame * 0.06) * 10 + 14);
  ctx.fillStyle = `rgba(219, 255, 82, ${0.34 + tintBoost * 0.24})`;
  ctx.beginPath();
  ctx.moveTo(0, GAME.height);
  for (let x = 0; x <= GAME.width; x += 18) {
    ctx.lineTo(x, acidY + Math.sin((x + state.frame * 4) * 0.06) * 8);
  }
  ctx.lineTo(GAME.width, GAME.height);
  ctx.fill();
  ctx.strokeStyle = `rgba(255, 246, 130, ${0.98 + tintBoost * 0.02})`;
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
  else if (enemy.type === "airborneVirus") drawAirborneVirusEnemy(enemy);
  else if (enemy.type === "floatingBacteria") drawFloatingBacteriaEnemy(enemy);
  else if (enemy.type === "debris") drawDebrisEnemy(enemy);
  else if (enemy.type === "drifter") drawDrifterEnemy(enemy);
  else if (enemy.type === "acidBubble") drawAcidBubbleEnemy(enemy);
  else if (enemy.type === "acidSlime") drawAcidSlimeEnemy(enemy);
  else if (enemy.type === "toxicBlob") drawToxicBlobEnemy(enemy);
  else if (enemy.type === "clot" || enemy.type === "microClot") drawClotEnemy(enemy);
  else if (enemy.type === "pulseCell") drawPulseCellEnemy(enemy);
  else if (enemy.type === "bloodParasite" || enemy.type === "parasiteSwarm") drawBloodParasiteEnemy(enemy);
  else if (enemy.type === "vesselEye" || enemy.type === "hallucinationEye") drawEyeEnemy(enemy);
  else if (enemy.type === "neuronBug" || enemy.type === "synapseCrawler") drawNeuronEnemy(enemy);
  else if (enemy.type === "sparkMite" || enemy.type === "shockCell") drawSparkEnemy(enemy);
  else if (enemy.type === "nerveEel") drawNerveEelEnemy(enemy);
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

function drawAirborneVirusEnemy(enemy) {
  ctx.fillStyle = "#8edff1";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#effcff", 3);
  drawVirusSpikes(enemy.w / 2, 7, "#c8f7ff");
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2 + 7 + Math.sin(enemy.timer * 0.08) * 2, 0, Math.PI * 2);
  ctx.stroke();
}

function drawFloatingBacteriaEnemy(enemy) {
  ctx.fillStyle = "#bdf6d8";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2 + 2, enemy.h / 2 - 2, Math.sin(enemy.timer * 0.04) * 0.2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#eafff5", 3);
  ctx.fillStyle = "#317b64";
  ctx.fillRect(-6, -3, 4, 4);
  ctx.fillRect(4, -4, 4, 4);
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

function drawAcidSlimeEnemy(enemy) {
  ctx.fillStyle = "#d5e94f";
  ctx.beginPath();
  ctx.ellipse(0, 3, enemy.w / 2 + 5, enemy.h / 2 - 2, 0, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#fff6a4", 3);
  ctx.fillStyle = "rgba(255,255,210,0.75)";
  ctx.beginPath();
  ctx.arc(-6, -4, 4, 0, Math.PI * 2);
  ctx.arc(7, -1, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawToxicBlobEnemy(enemy) {
  ctx.fillStyle = "#9a63ff";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2 + Math.sin(enemy.timer * 0.08) * 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#efe2ff", 3);
  ctx.fillStyle = "#f5e9ff";
  ctx.beginPath();
  ctx.arc(-5, -4, 3.5, 0, Math.PI * 2);
  ctx.arc(6, 3, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawClotEnemy(enemy) {
  ctx.fillStyle = enemy.type === "microClot" ? "#b31f2e" : "#7e1726";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2 + 3, enemy.h / 2, 0.2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#ffd1d8", 3);
}

function drawPulseCellEnemy(enemy) {
  const pulse = 1 + Math.sin(enemy.timer * 0.12) * 0.12;
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#ff8a9b";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#ffe4e8", 3);
}

function drawBloodParasiteEnemy(enemy) {
  ctx.fillStyle = enemy.type === "parasiteSwarm" ? "#ff6e80" : "#c82347";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2, enemy.h / 2 - 3, -0.35, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#ffe1e6", 3);
  drawVirusSpikes(enemy.w / 2 - 2, 5, "#ffbcc5");
}

function drawEyeEnemy(enemy) {
  ctx.fillStyle = enemy.type === "hallucinationEye" ? "#b99cff" : "#ffccd3";
  ctx.beginPath();
  ctx.ellipse(0, 0, enemy.w / 2 + 4, enemy.h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#ffffff", 3);
  ctx.fillStyle = "#30204f";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawNeuronEnemy(enemy) {
  ctx.fillStyle = "#c9b8ff";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
  ctx.fill();
  outlineCurrentShape("#f0eaff", 3);
  ctx.strokeStyle = "#f0eaff";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i += 1) {
    const a = i * Math.PI / 2 + enemy.timer * 0.02;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 4, Math.sin(a) * 4);
    ctx.lineTo(Math.cos(a) * (enemy.w / 2 + 9), Math.sin(a) * (enemy.w / 2 + 9));
    ctx.stroke();
  }
}

function drawSparkEnemy(enemy) {
  ctx.fillStyle = "#d7fbff";
  ctx.beginPath();
  ctx.moveTo(0, -enemy.h / 2);
  ctx.lineTo(enemy.w / 3, -3);
  ctx.lineTo(2, 1);
  ctx.lineTo(enemy.w / 2, enemy.h / 2);
  ctx.lineTo(-enemy.w / 3, 4);
  ctx.lineTo(-2, 0);
  ctx.lineTo(-enemy.w / 2, -enemy.h / 2);
  ctx.closePath();
  ctx.fill();
  outlineCurrentShape("#2aa6c8", 3);
}

function drawNerveEelEnemy(enemy) {
  ctx.strokeStyle = "#cafbff";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-enemy.w / 2, 0);
  ctx.quadraticCurveTo(0, Math.sin(enemy.timer * 0.2) * 12, enemy.w / 2, 0);
  ctx.stroke();
  ctx.strokeStyle = "#1f7893";
  ctx.lineWidth = 3;
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
  drawBossAura(boss);
  if (drawBossAsset(boss)) {
    return;
  }
  ctx.save();
  ctx.translate(boss.x, boss.y);
  drawBossDashWarning(boss);
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

function drawBossAura(boss) {
  const config = getBossConfig(boss);
  const pulse = 1 + Math.sin(state.frame * 0.08) * 0.08;
  ctx.save();
  ctx.translate(boss.x, boss.y);
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = config.aura;
  ctx.beginPath();
  ctx.ellipse(0, 0, 92 * pulse, 78 * pulse, 0, 0, Math.PI * 2);
  ctx.fill();
  if (state.frame % 3 === 0) {
    ctx.fillStyle = config.particle;
    for (let i = 0; i < 3; i += 1) {
      const a = state.frame * 0.03 + i * 2.1;
      const r = 70 + Math.sin(state.frame * 0.05 + i) * 10;
      ctx.fillRect(Math.cos(a) * r, Math.sin(a) * r, 3, 3);
    }
  }
  if (boss.type === "vesselBlockage" && state.routePulseTimer > 0) {
    ctx.strokeStyle = "rgba(255, 220, 160, 0.72)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 82 + state.routePulseTimer * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (boss.type === "brainTumor" && Math.floor(state.frame / 6) % 2 === 0) {
    ctx.strokeStyle = "rgba(220, 210, 255, 0.45)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      const y = -48 + i * 42 + Math.sin(state.frame * 0.18 + i) * 4;
      ctx.beginPath();
      ctx.moveTo(-78, y);
      ctx.lineTo(-34 + Math.sin(state.frame + i) * 8, y + 5);
      ctx.lineTo(18 + Math.cos(state.frame * 0.6 + i) * 7, y - 3);
      ctx.lineTo(76, y + 4);
      ctx.stroke();
    }
  }
  if (boss.type === "electricParasite") {
    ctx.strokeStyle = "rgba(220, 255, 255, 0.68)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-72 + i * 46, -84);
      ctx.lineTo(-54 + i * 42 + Math.sin(state.frame + i) * 10, -44);
      ctx.lineTo(-70 + i * 48, -8);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawBossDashWarning(boss) {
  if (boss.dashTimer <= 36 || Math.floor(boss.dashTimer / 6) % 2 !== 0) return;
  ctx.strokeStyle = "rgba(255, 250, 150, 0.85)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 94, -0.65, 0.72);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 94, Math.PI - 0.72, Math.PI + 0.65);
  ctx.stroke();
}

function drawBossAsset(boss) {
  ctx.save();
  ctx.translate(boss.x, boss.y);
  drawBossDashWarning(boss);
  let drawn = false;
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 84, 0, Math.PI * 2);
  ctx.clip();
  ctx.scale(-1, 1);
  drawn = drawAsset(getBossConfig(boss).asset, -88, -88, 176, 176);
  ctx.restore();
  if (!drawn) {
    ctx.restore();
    return false;
  }
  ctx.beginPath();
  ctx.arc(0, 0, 84, 0, Math.PI * 2);
  outlineCurrentShape("#fff1f5", 5);
  ctx.strokeStyle = getBossConfig(boss).particle;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 91 + Math.sin(state.frame * 0.08) * 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  return true;
}

function drawPlayerShot(shot) {
  if (shot.type === "capsule") {
    ctx.save();
    ctx.shadowBlur = state.bossActive ? 0 : 10;
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
  ctx.shadowBlur = state.bossActive ? 0 : 12;
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
  ctx.shadowBlur = state.bossActive ? 0 : 10;
  if (shot.type === "toxin") {
    ctx.shadowColor = "rgba(185, 117, 255, 0.85)";
    ctx.fillStyle = "#9a63ff";
    ctx.strokeStyle = "#efe2ff";
  } else if (shot.type === "boss") {
    const config = getBossConfig({ type: shot.bossType || "viralCore" });
    ctx.shadowColor = config.shotShadow;
    ctx.fillStyle = config.shotFill;
    ctx.strokeStyle = config.shotStroke;
  } else {
    ctx.shadowColor = "rgba(255, 182, 74, 0.85)";
    ctx.fillStyle = "#ffbf47";
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
  if (state.scene === "patientSelect") {
    drawPatientSelectScreen();
    return;
  }
  if (state.scene === "briefing") {
    drawBriefingScreen();
    return;
  }
  if (state.scene === "injection") {
    drawInjectionScreen();
    return;
  }
  if (state.scene === "extraction") {
    drawExtractionScreen();
    return;
  }
  if (state.scene === "result") {
    drawMissionResultScreen();
    return;
  }

  drawMonitorPanel(12, 10, GAME.width - 24, 42);
  drawStatPanel(20, 14, 154, 26, "スコア", String(state.score).padStart(6, "0"));
  drawStatPanel(184, 14, 82, 26, "残機", String(state.player.lives));
  drawStatPanel(276, 14, 92, 26, "ボム", String(state.player.bombs));
  drawAreaHud(382, 14, 240, 26, `エリア : ${String(getCurrentArea().name).toUpperCase()}`);
  drawEcgLine(634, 15, 126, 24);
  drawConditionWarningHud(766, 15);
  drawRouteMapHud();
  drawVitalsHud();

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
    ctx.fillText(POWER_LABELS[name] || name, x + 14, y + 5);
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

  drawTouchButton(820, 420, 34, "攻撃", touch.shotPressed, "#69dbff");
  drawTouchButton(890, 370, 28, "ボム", touch.bombPressed, "#ffaf6e");
  ctx.globalAlpha = 1;
}

function drawTouchButton(x, y, r, label, active, color) {
  ctx.fillStyle = active ? color : "rgba(255,255,255,0.14)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = active ? "#101320" : "#ffffff";
  ctx.font = label === "攻撃" ? "14px sans-serif" : "12px sans-serif";
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

function drawRouteMapHud() {
  const route = getCurrentRoute();
  const mapY = state.noteTimer > 0 ? 114 : 58;
  const rowH = 18;
  const h = 34 + route.length * rowH;
  drawMonitorPanel(18, mapY, 168, h);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "10px monospace";
  ctx.fillText("ルート", 30, mapY + 16);
  route.forEach((id, index) => {
    const isNow = index === state.areaIndex;
    const label = ROUTE_LABELS[id] || String(id).toUpperCase();
    ctx.fillStyle = isNow ? "#fff5bf" : "rgba(223, 252, 255, 0.82)";
    ctx.font = isNow ? "bold 12px monospace" : "12px monospace";
    ctx.fillText(`${label}${isNow ? " ← 現在地" : ""}`, 44, mapY + 36 + index * rowH);
    if (index < route.length - 1) {
      ctx.fillStyle = "rgba(142, 246, 255, 0.55)";
      ctx.fillText("↓", 31, mapY + 49 + index * rowH);
    }
  });
}

function drawConditionWarningHud(x, y) {
  const condition = getConditionModifier();
  const pulse = Math.floor(state.frame / 26) % 2 === 0;
  drawMonitorPanel(x - 6, y - 1, 176, 28);
  ctx.fillStyle = condition.label === "健康" ? "#8ef6ff" : pulse ? "#fff5bf" : "#ff8ea6";
  ctx.font = "bold 10px monospace";
  ctx.fillText(`状態: ${condition.label}`, x, y + 10);
  ctx.fillStyle = "#dffcff";
  ctx.font = "10px monospace";
  ctx.fillText(condition.warning || "安定", x, y + 22);
}

function drawVitalsHud() {
  if (!state.vitals) return;
  const warningJitter = state.vitalWarningType === "stability" && state.vitalWarningTimer > 0
    ? Math.sin(state.frame * 2.4) * 1.5
    : 0;
  const x = 774 + warningJitter;
  const y = state.noteTimer > 0 ? 114 : 58;
  const w = 168;
  const rows = [
    ["感染", "infection", false],
    ["炎症", "inflammation", false],
    ["酸素", "oxygen", true],
    ["安定", "stability", true],
  ];
  drawMonitorPanel(x, y, w, 104);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "bold 10px monospace";
  ctx.fillText("PATIENT STATUS", x + 10, y + 16);
  rows.forEach(([label, key, positive], index) => {
    const value = state.vitals[key];
    const danger = positive ? value <= 38 : value >= 78;
    const rowY = y + 32 + index * 17;
    ctx.fillStyle = danger && Math.floor(state.frame / 12) % 2 === 0 ? "#ff768d" : "#dffcff";
    ctx.font = "10px monospace";
    ctx.fillText(label, x + 10, rowY);
    ctx.fillText(String(Math.round(value)).padStart(3, "0"), x + 42, rowY);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(x + 70, rowY - 8, 86, 6);
    ctx.fillStyle = danger ? "#ff768d" : positive ? "#8ef6ff" : "#fff5bf";
    const displayValue = positive ? value : 100 - value;
    ctx.fillRect(x + 70, rowY - 8, 86 * (displayValue / 100), 6);
  });
  if (state.vitalsHudFlashTimer > 0 && Math.floor(state.vitalsHudFlashTimer / 5) % 2 === 0) {
    ctx.strokeStyle = "rgba(255, 94, 116, 0.9)";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, 104);
  }
}

function drawNurseMessage() {
  if (state.nurseMessageTimer <= 0 || !state.nurseMessage) return;
  const alpha = Math.min(1, state.nurseMessageTimer / 18);
  ctx.save();
  ctx.globalAlpha = alpha;
  drawMonitorPanel(250, 400, 460, 38);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "bold 11px monospace";
  ctx.fillText("NURSE COM", 266, 416);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText(state.nurseMessage, 354, 424);
  ctx.restore();
}

function drawVitalWarningEffects() {
  if (state.vitalWarningTimer <= 0) return;
  const alpha = Math.min(0.14, state.vitalWarningTimer / 420);
  ctx.save();
  if (state.vitalWarningType === "oxygen") {
    ctx.fillStyle = `rgba(90, 190, 220, ${alpha})`;
    ctx.fillRect(0, 0, 30, GAME.height);
    ctx.fillRect(GAME.width - 30, 0, 30, GAME.height);
    ctx.fillStyle = `rgba(5, 20, 34, ${alpha * 0.72})`;
    ctx.fillRect(0, 0, GAME.width, 18);
    ctx.fillRect(0, GAME.height - 18, GAME.width, 18);
  } else if (state.vitalWarningType === "stability") {
    ctx.strokeStyle = `rgba(255, 110, 132, ${alpha * 4})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 86);
    for (let x = 0; x <= GAME.width; x += 48) {
      ctx.lineTo(x, 86 + Math.sin(state.frame * 0.8 + x) * 7);
    }
    ctx.stroke();
  } else {
    ctx.fillStyle = `rgba(255, 54, 86, ${alpha * 0.7})`;
    ctx.fillRect(0, 0, GAME.width, 10);
    ctx.fillRect(0, GAME.height - 10, GAME.width, 10);
    ctx.fillStyle = `rgba(180, 30, 86, ${alpha * 0.45})`;
    for (let i = 0; i < 5; i += 1) {
      const y = 100 + i * 72 + Math.sin(state.frame * 0.2 + i) * 8;
      ctx.fillRect(0, y, GAME.width, 2);
    }
  }
  ctx.restore();
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
  if (state.scene === "patientSelect") {
    drawPatientSelectEffects();
    return;
  }
  if (state.scene === "briefing") {
    drawBriefingEffects();
    return;
  }
  if (state.scene === "injection") {
    drawInjectionEffects();
    return;
  }
  if (state.scene === "result") {
    drawResultEffects();
    return;
  }
  if (state.scene === "extraction") {
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

  if (state.areaEntryTimer > 0 && !state.bossActive && !state.bossSpawnQueued) {
    const area = getCurrentArea();
    const t = state.areaEntryTimer / 110;
    const alpha = Math.min(0.82, t * 1.2);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(6, 10, 16, 0.52)";
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = "rgba(109, 240, 255, 0.2)";
    ctx.fillRect(0, 198, GAME.width, 78);
    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 198, GAME.width, 78);
    ctx.fillStyle = "#dffcff";
    ctx.font = "bold 18px monospace";
    ctx.fillText("侵入中", 426, 226);
    ctx.fillStyle = area.accent || "#ffffff";
    ctx.font = "bold 36px monospace";
    ctx.fillText(`${String(area.name).toUpperCase()}...`, 370, 260);
    ctx.restore();
  }

  if (state.routePulseTimer > 0) {
    ctx.fillStyle = `rgba(255, 220, 226, ${state.routePulseTimer / 240})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

  const activeEvent = getActiveRouteEventDef();
  if (activeEvent?.screenGlow) {
    ctx.fillStyle = activeEvent.screenGlow;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }

  if (state.routeEventNoticeTimer > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, state.routeEventNoticeTimer / 18);
    ctx.fillStyle = "rgba(8, 14, 22, 0.78)";
    ctx.fillRect(300, 58, 360, 34);
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.strokeRect(300, 58, 360, 34);
    ctx.fillStyle = "#fff5bf";
    ctx.font = "bold 16px monospace";
    ctx.fillText(state.routeEventNoticeText, 324, 80);
    ctx.restore();
  }

  if (state.bossDefeatTimer > 0) {
    ctx.save();
    const alpha = Math.min(1, state.bossDefeatTimer / GAME.bossDefeatDuration);
    ctx.fillStyle = `rgba(255,255,255,${0.1 + (1 - alpha) * 0.16})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = "rgba(8, 14, 22, 0.72)";
    ctx.fillRect(280, 210, 400, 64);
    ctx.strokeStyle = "rgba(255,255,255,0.36)";
    ctx.strokeRect(280, 210, 400, 64);
    ctx.fillStyle = "#dffcff";
    ctx.font = "bold 24px monospace";
    ctx.fillText("標的を無力化", 394, 249);
    ctx.restore();
  }

  if (state.noteTimer > 0) {
    ctx.fillStyle = "rgba(10, 14, 20, 0.72)";
    ctx.fillRect(40, 52, GAME.width - 80, 54);
    ctx.fillStyle = "#fff5bf";
    drawWrappedText(`医療メモ: ${getCurrentArea().note}`, 54, 74, GAME.width - 108, 16, 15);
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
    const bossType = getBossRouteConfig().bossType || "viralCore";
    const bossConfig = getBossConfig({ type: bossType });
    ctx.fillStyle = pulse ? "rgba(20, 0, 0, 0.38)" : "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.fillStyle = pulse ? "rgba(150, 0, 22, 0.78)" : "rgba(96, 0, 18, 0.72)";
    ctx.fillRect(0, 214, GAME.width, 64);
    ctx.strokeStyle = "#ffb3bf";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 214, GAME.width, 64);
    ctx.fillStyle = "#fff2f4";
    ctx.font = "bold 18px monospace";
    ctx.fillText("警告", 408, 236);
    ctx.font = "bold 34px monospace";
    ctx.fillText("危険反応", 374, 262);
    if (state.bossWarningTimer < 60) {
      ctx.fillStyle = bossConfig.shotStroke;
      ctx.font = "bold 18px monospace";
      ctx.fillText(bossConfig.notice, 356, 300);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.beginPath();
    ctx.moveTo(20, 246);
    ctx.lineTo(330, 246);
    ctx.moveTo(630, 246);
    ctx.lineTo(940, 246);
    ctx.stroke();
  }

  if (state.fakeWarningTimer > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(0.65, state.fakeWarningTimer / 42);
    ctx.fillStyle = "rgba(126, 84, 255, 0.34)";
    ctx.fillRect(0, 220, GAME.width, 44);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("信号ノイズ", 394 + Math.sin(state.frame) * 3, 249);
    ctx.restore();
  }

  drawVitalWarningEffects();
  if (state.treatmentGlowTimer > 0) {
    ctx.fillStyle = `rgba(190, 255, 255, ${state.treatmentGlowTimer / 220})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
  }
  drawNurseMessage();

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

  if (state.stageEntryFlashTimer > 0) {
    const alpha = state.stageEntryFlashTimer / 24;
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.38})`;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
    ctx.strokeStyle = `rgba(142,246,255,${alpha * 0.78})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(124, GAME.height / 2, 36 + (1 - alpha) * 180, 84 + (1 - alpha) * 150, 0, 0, Math.PI * 2);
    ctx.stroke();
    state.stageEntryFlashTimer -= 1;
  }

  if (state.scene === "gameover") {
    drawResultOverlay("作戦失敗", "治療ミッションは中断されました。", "スペース / Enter / タップで再開");
  }
  if (state.scene === "clear") {
    drawClearOverlay();
  }
}

function drawTitleEffects() {
  ctx.fillStyle = "rgba(10, 20, 28, 0.42)";
  for (let i = 0; i < 6; i += 1) {
    const x = i * 190 - ((state.frame * 0.42) % 190);
    ctx.fillRect(x, 80, 132, 320);
  }
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
  ctx.moveTo(140, 416);
  ctx.lineTo(248, 416);
  ctx.lineTo(268, 408);
  ctx.lineTo(280, 424);
  ctx.lineTo(296, 394);
  ctx.lineTo(314, 416);
  ctx.lineTo(820, 416);
  ctx.stroke();
  drawScanLines(180, 148, 600, 160, 8);
  if (Math.floor(state.frame / 28) % 2 === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(214, 178, 180, 3);
  }
  if (Math.floor(state.frame / 20) % 2 === 0) {
    ctx.fillStyle = "rgba(255, 242, 165, 0.9)";
    ctx.font = "bold 28px monospace";
    ctx.fillText("スペース / Enter / タップで開始", 246, 452);
  }
}

function drawTitleScreen() {
  drawMonitorPanel(168, 132, 624, 176);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 16px monospace";
  ctx.fillText("人体内ミクロ治療システム", 242, 166);
  ctx.font = "bold 48px sans-serif";
  ctx.fillText("ミクロ・ナース", 194, 226);
  ctx.fillText("トリートメント", 194, 278);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "13px monospace";
  ctx.fillText("MICRO NURSE TREATMENT", 286, 306);
  ctx.fillText("人体内探索シューティング", 280, 326);
  drawMonitorPanel(266, 366, 430, 44);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 14px monospace";
  ctx.fillText("開始", 454, 394);
}

function drawPatientSelectScreen() {
  const patient = getCurrentPatient();
  const theme = getCurrentPatientTheme();
  ctx.fillStyle = "rgba(6, 12, 18, 0.9)";
  ctx.fillRect(58, 38, 844, 468);
  ctx.strokeStyle = "rgba(120, 236, 255, 0.28)";
  ctx.lineWidth = 2;
  ctx.strokeRect(58, 38, 844, 468);
  drawScanLines(64, 44, 832, 456, 7);

  drawMonitorPanel(88, 68, 784, 42);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 26px monospace";
  ctx.fillText("症例選択", 110, 98);
  drawHudDigits(700, 95, "症例ファイル");

  PATIENTS.forEach((entry, index) => {
    const isSelected = index === state.currentPatientIndex;
    const offset = getPatientSelectOffset(index);
    if (Math.abs(offset) > 1) return;
    const cardX = 355 + offset * 260;
    const cardY = 132;
    const cardW = 250;
    const cardH = 240;
    const entryTheme = entry.selectTheme || theme;
    ctx.fillStyle = isSelected ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)";
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeStyle = isSelected ? entryTheme.accent : "rgba(255,255,255,0.16)";
    ctx.lineWidth = isSelected ? 3 : 1.5;
    ctx.strokeRect(cardX, cardY, cardW, cardH);
    if (isSelected) {
      drawPatientCaseSilhouette(entry, cardX + 166, cardY + 124, cardW, cardH, entryTheme);
      ctx.fillStyle = entryTheme.glow;
      ctx.fillRect(cardX + 8, cardY + 8, cardW - 16, 14);
      drawScanLines(cardX + 6, cardY + 6, cardW - 12, cardH - 12, 9);
    }

    ctx.fillStyle = isSelected ? "#ffffff" : "#b2bfcc";
    ctx.font = "bold 18px monospace";
    ctx.fillText(`症例 ${String(index + 1).padStart(2, "0")}`, cardX + 18, cardY + 34);
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(entry.name, cardX + 18, cardY + 72);
    ctx.fillStyle = isSelected ? entryTheme.accent : "#93a8bb";
    ctx.font = "bold 14px monospace";
    drawWrappedText(entry.diagnosis.toUpperCase(), cardX + 18, cardY + 96, cardW - 36, 16, 13);
    ctx.fillStyle = isSelected ? "#dffcff" : "#9baaba";
    ctx.font = "14px sans-serif";
    drawWrappedText(entry.shortDescription, cardX + 18, cardY + 136, cardW - 36, 18, 14);
    ctx.fillStyle = entryTheme.secondary;
    ctx.font = "12px monospace";
    ctx.fillText(`経路: ${getRouteType(entry)}`, cardX + 18, cardY + 178);
    drawRouteIconStrip(entry, cardX + 142, cardY + 166, entryTheme);
    ctx.fillText(`状態: ${getConditionLabel(entry)}`, cardX + 18, cardY + 200);
    ctx.fillText(`難度: ${entry.difficulty}`, cardX + 18, cardY + 222);
    if (!entry.unlocked) {
      ctx.fillStyle = "rgba(0,0,0,0.58)";
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px monospace";
      ctx.fillText("未解放", cardX + 72, cardY + 134);
    } else if (isSelected && Math.floor(state.frame / 18) % 2 === 0) {
      ctx.fillStyle = entryTheme.accent;
      ctx.fillRect(cardX - 12, cardY + 16, 8, 36);
    }
  });

  drawMonitorPanel(96, 394, 712, 74);
  ctx.fillStyle = theme.accent;
  ctx.font = "bold 14px monospace";
  ctx.fillText(`氏名: ${patient.name.toUpperCase()}    年齢: ${patient.age}`, 118, 420);
  ctx.fillText(`経路: ${getRouteType(patient)}    状態: ${getConditionLabel(patient)}    選択可: ${patient.unlocked ? "可" : "不可"}`, 118, 446);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(`治療目標: ${patient.treatmentGoal}`, 118, 464);
  ctx.fillStyle = "#fff5bf";
  ctx.font = "bold 18px monospace";
  ctx.fillText("← / → で変更", 170, 486);
  ctx.fillText("Enterでも決定", 552, 486);

  drawSelectArrowButton(26, 420, "<", theme, false);
  drawSelectArrowButton(900, 420, ">", theme, false);
  drawSelectArrowButton(814, 420, "決定", theme, true);
}

function getPatientSelectOffset(index) {
  const total = PATIENTS.length;
  if (!total) return 0;
  let offset = index - state.currentPatientIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function drawSelectArrowButton(x, y, label, theme, wide) {
  const w = wide ? 72 : 48;
  const h = 48;
  ctx.fillStyle = "rgba(8, 16, 24, 0.86)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = theme.accent;
  ctx.font = wide ? "bold 22px monospace" : "bold 28px monospace";
  ctx.fillText(label, x + (wide ? 20 : 14), y + 31);
}

function drawPatientCaseSilhouette(patient, x, y, cardW, cardH, theme) {
  if (drawPatientCaseAsset(patient, x, y, theme)) {
    return;
  }
  const pulse = 0.06 + Math.sin(state.frame * 0.08) * 0.01;
  const lineColor = theme.accent;
  const secondary = theme.secondary;
  const femaleStyle = patient.id === "Patient 01";

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = Math.max(0.04, Math.min(0.12, pulse));
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;

  for (let i = -70; i <= 70; i += 9) {
    ctx.strokeStyle = i % 18 === 0 ? theme.glow : "rgba(255,255,255,0.025)";
    ctx.beginPath();
    ctx.moveTo(-28, i);
    ctx.lineTo(78, i);
    ctx.stroke();
  }

  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.arc(20, -58, femaleStyle ? 26 : 24, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  if (femaleStyle) {
    ctx.moveTo(-2, -80);
    ctx.quadraticCurveTo(-26, -58, -10, -26);
    ctx.moveTo(42, -80);
    ctx.quadraticCurveTo(66, -56, 48, -22);
    ctx.moveTo(-6, -70);
    ctx.quadraticCurveTo(20, -92, 48, -70);
  } else {
    ctx.moveTo(-2, -72);
    ctx.quadraticCurveTo(20, -90, 44, -72);
    ctx.moveTo(-4, -62);
    ctx.quadraticCurveTo(-16, -36, -2, -20);
    ctx.moveTo(44, -62);
    ctx.quadraticCurveTo(58, -36, 42, -18);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, -30);
  ctx.lineTo(20, 48);
  ctx.moveTo(20, -8);
  ctx.lineTo(-10, 14);
  ctx.moveTo(20, -8);
  ctx.lineTo(48, 16);
  ctx.moveTo(20, 48);
  ctx.lineTo(4, 92);
  ctx.moveTo(20, 48);
  ctx.lineTo(38, 92);
  ctx.stroke();

  ctx.strokeStyle = secondary;
  ctx.beginPath();
  ctx.moveTo(-8, 14);
  ctx.quadraticCurveTo(20, 30, 46, 14);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.strokeRect(-30, -96, 112, 204);

  const sweepX = -24 + ((state.frame * 2.2) % 96);
  ctx.fillStyle = theme.glow;
  ctx.fillRect(sweepX, -92, 10, 196);

  for (let i = 0; i < 5; i += 1) {
    const px = -18 + i * 20 + Math.sin(state.frame * 0.04 + i) * 2;
    const py = -90 + ((state.frame * 1.1 + i * 34) % 180);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(px, py, 2, 2);
  }
  ctx.restore();
}

function drawPatientCaseAsset(patient, x, y, theme) {
  const key = getCurrentPatientAssetKey(patient);
  const asset = assets[key];
  if (!asset) return false;
  const imageReady = asset.ready || (asset.image && asset.image.complete && asset.image.naturalWidth > 0);
  if (!imageReady) return false;

  const swapFade = state.patientSwapTimer > 0 ? 1 - state.patientSwapTimer / 20 : 1;
  const baseAlpha = 0.07 + Math.sin(state.frame * 0.08) * 0.01;
  const alpha = Math.max(0.04, Math.min(0.12, baseAlpha * Math.max(0.35, swapFade)));
  const drawHeight = 164;
  const aspect = asset.image.naturalWidth > 0 ? asset.image.naturalWidth / asset.image.naturalHeight : 0.62;
  const drawWidth = drawHeight * aspect;
  const drawX = x - drawWidth * 0.35;
  const drawY = y - drawHeight * 0.58;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(asset.image, drawX, drawY, drawWidth, drawHeight);
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = theme.accent;
  ctx.globalAlpha = alpha * 0.7;
  ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = theme.secondary;
  ctx.globalAlpha = alpha * 0.28;
  ctx.fillRect(drawX + drawWidth * 0.18, drawY, drawWidth * 0.44, drawHeight);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.08 * Math.max(0.4, swapFade);
  drawScanLines(drawX, drawY, drawWidth, drawHeight, 8);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(drawX - 6, drawY - 8, drawWidth + 12, drawHeight + 16);
  const sweepY = drawY + ((state.frame * 2.4 + (20 - state.patientSwapTimer) * 8) % (drawHeight + 18)) - 9;
  ctx.fillStyle = theme.glow;
  ctx.fillRect(drawX - 4, sweepY, drawWidth + 8, 10);
  for (let i = 0; i < 5; i += 1) {
    const px = drawX + 12 + i * (drawWidth / 5) + Math.sin(state.frame * 0.04 + i) * 3;
    const py = drawY + 12 + ((state.frame * 1.2 + i * 28) % (drawHeight - 18));
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(px, py, 2, 2);
  }
  ctx.restore();
  return true;
}

function drawRouteIconStrip(patient, x, y, theme) {
  const route = getCurrentRoute(patient);
  route.slice(0, 4).forEach((id, index) => {
    const ix = x + index * 28;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(ix, y, 22, 20);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1;
    ctx.strokeRect(ix, y, 22, 20);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9px monospace";
    ctx.fillText(ROUTE_ICONS[id] || "?", ix + 4, y + 13);
  });
}

function drawBriefingScreen() {
  const patient = getCurrentPatient();
  ctx.fillStyle = "rgba(6, 12, 18, 0.88)";
  ctx.fillRect(76, 44, 808, 452);
  ctx.strokeStyle = "rgba(120, 236, 255, 0.34)";
  ctx.lineWidth = 2;
  ctx.strokeRect(76, 44, 808, 452);
  drawScanLines(82, 50, 796, 440, 7);

  drawMonitorPanel(102, 72, 756, 42);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 24px monospace";
  ctx.fillText("患者データ", 122, 100);
  drawHudDigits(680, 97, getPatientDisplayId(patient));

  drawMonitorPanel(104, 132, 306, 254);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("氏名", 126, 160);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(patient.name, 126, 188);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("年齢", 126, 222);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px monospace";
  ctx.fillText(patient.age, 126, 248);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("症状", 126, 286);
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px sans-serif";
  patient.symptoms.forEach((line, index) => {
    ctx.fillText(`- ${line}`, 126, 316 + index * 28);
  });

  drawMonitorPanel(430, 132, 428, 174);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("診断", 452, 162);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(patient.diagnosis, 452, 204);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("任務", 452, 232);
  ctx.fillStyle = "#fff4bf";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(patient.mission, 452, 260);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("治療目標", 452, 282);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(patient.treatmentGoal, 452, 302);

  drawMonitorPanel(430, 318, 428, 116);
  drawEcgLine(444, 326, 192, 24);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("侵入経路", 448, 358);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px monospace";
  ctx.fillText(formatEntryRoute(patient), 448, 380);
  ctx.fillStyle = "#dffcff";
  ctx.font = "13px monospace";
  ctx.fillText(`体内状態 : ${getRouteType(patient)} / ${getConditionLabel(patient)}`, 448, 404);
  ctx.fillStyle = "#fff5bf";
  drawWrappedText(getRouteConfig(getAreaById(getCurrentRoute(patient)[getCurrentRoute(patient).length - 1])).briefingText, 448, 424, 370, 12, 11);

  if (Math.floor(state.frame / 24) % 2 === 0) {
    ctx.fillStyle = "#fff5bf";
    ctx.font = "bold 22px monospace";
    ctx.fillText("スペース / Enter / タップで出動", 292, 446);
  }
}

function drawInjectionScreen() {
  const t = Math.min(1, state.injectionTimer / 150);
  ctx.fillStyle = "rgba(6, 12, 18, 0.92)";
  ctx.fillRect(0, 0, GAME.width, GAME.height);
  drawScanLines(0, 0, GAME.width, GAME.height, 8);

  const centerY = GAME.height / 2;
  const shipX = 180 + t * 360;
  const shipY = centerY + Math.sin(state.frame * 0.08) * 8;
  const gatePulse = Math.max(0, (state.injectionTimer - 104) / 36);
  for (let i = 0; i < 18; i += 1) {
    const x = GAME.width - ((state.frame * (8 + i * 0.2) + i * 56) % (GAME.width + 120));
    ctx.strokeStyle = `rgba(142, 246, 255, ${0.08 + (i % 4) * 0.04})`;
    ctx.lineWidth = 2 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(x, centerY - 88 + i * 10);
    ctx.lineTo(x + 64, centerY - 88 + i * 10);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(142, 246, 255, 0.16)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(600, centerY, 150 + i * 36 + t * 80, 52 + i * 16, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (gatePulse > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(0.72, gatePulse * 0.7);
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(710, centerY, 34 + gatePulse * 32, 80 + gatePulse * 26, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(142,246,255,0.86)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.ellipse(710, centerY, 18 + gatePulse * 20, 56 + gatePulse * 18, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,${Math.min(0.2, gatePulse * 0.18)})`;
    ctx.beginPath();
    ctx.ellipse(710, centerY, 22 + gatePulse * 18, 60 + gatePulse * 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.translate(shipX, shipY);
  ctx.scale(0.92 + t * 0.12, 0.92 + t * 0.12);
  ctx.rotate(Math.sin(state.frame * 0.04) * 0.02);
  ctx.globalAlpha = 0.92;
  if (!drawAsset("player", -56, -34, 112, 68)) {
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.fillRect(-48, -12, 68, 24);
    ctx.fillStyle = "#8ef6ff";
    ctx.fillRect(12, -10, 64, 20);
    ctx.fillStyle = "#dffcff";
    ctx.fillRect(68, -4, 24, 8);
  }
  ctx.restore();

  ctx.fillStyle = "rgba(142, 246, 255, 0.08)";
  ctx.fillRect(shipX - 120, shipY - 2, 280, 4);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 5; i += 1) {
    ctx.fillRect(shipX - 90 - i * 20, shipY - 1, 12, 2);
  }

  ctx.fillStyle = "#8ef6ff";
  ctx.font = "bold 24px monospace";
  ctx.fillText("ミクロナース出動", 318, 132);
  ctx.fillStyle = "#ffffff";
  ctx.font = "15px monospace";
  ctx.fillText("生体カプセル準備完了", 120, 194);
  ctx.fillText("ミクロユニット起動", 120, 220);
  ctx.fillText("信号安定", 120, 246);
  ctx.fillText(`侵入口 : ${formatEntryRoute(getCurrentPatient())}`, 120, 272);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "14px monospace";
  ctx.fillText(`症例 : ${getPatientDisplayId(getCurrentPatient())}`, 610, 194);
  ctx.fillText(`対象 : ${getCurrentPatient().name.toUpperCase()}`, 610, 220);
  ctx.fillText(`診断 : ${getCurrentPatient().diagnosis.toUpperCase()}`, 610, 246);
  ctx.fillText(`状態 : ${getConditionLabel(getCurrentPatient())}`, 610, 272);
  ctx.fillStyle = "#fff5bf";
  ctx.fillText("タップ / Enter でスキップ", 360, 438);
}

function drawExtractionScreen() {
  const t = state.extractionTimer / GAME.extractionDuration;
  ctx.fillStyle = `rgba(210, 255, 255, ${0.08 + t * 0.12})`;
  ctx.fillRect(0, 0, GAME.width, GAME.height);
  drawScanLines(0, 0, GAME.width, GAME.height, 9);

  const beamAlpha = state.extractionPhase >= 3 ? Math.min(0.42, (state.extractionTimer - 170) / 120) : 0.08;
  ctx.save();
  ctx.globalAlpha = beamAlpha;
  ctx.fillStyle = "#dffcff";
  ctx.beginPath();
  ctx.moveTo(720, 0);
  ctx.lineTo(890, 0);
  ctx.lineTo(780, GAME.height);
  ctx.lineTo(610, GAME.height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  drawMonitorPanel(130, 72, 700, 88);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 28px monospace";
  if (state.extractionPhase <= 1) {
    ctx.fillText("BIO SIGNAL STABILIZED", 250, 112);
    ctx.font = "bold 18px monospace";
    ctx.fillText("INFECTION SUPPRESSED", 330, 140);
  } else if (state.extractionPhase === 2) {
    ctx.fillText("体内環境 正常化中", 318, 112);
    ctx.font = "bold 18px monospace";
    ctx.fillText(getExtractionRouteMessage(), 278, 140);
  } else if (state.extractionPhase === 3) {
    ctx.fillText("回収ビーコン起動", 330, 112);
    ctx.font = "bold 18px monospace";
    ctx.fillText("ミクロナース帰還中", 338, 140);
  } else {
    ctx.fillText("MISSION COMPLETE", 316, 112);
    ctx.font = "bold 18px monospace";
    ctx.fillText("PATIENT STATUS STABILIZED", 300, 140);
  }

  drawMonitorPanel(250, 388, 460, 48);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "13px monospace";
  ctx.fillText(`経路: ${formatEntryRoute(getCurrentPatient())}`, 274, 410);
  ctx.fillText(`状態: ${getConditionLabel(getCurrentPatient())} → 安定`, 274, 428);
}

function getExtractionRouteMessage() {
  const areaId = state.extractionAreaId || getCurrentArea().id;
  const map = {
    lung: "空気粒子が静まり、呼吸が安定しています",
    stomach: "胃酸波が落ち着き、粘膜反応が低下しています",
    heart: "心拍が安定し、血流が整いつつあります",
    vessel: "血流速度が正常域へ戻っています",
    brain: "神経ノイズが消失し、信号が整っています",
    nerve: "放電が停止し、神経信号が安定しています",
  };
  return map[areaId] || "体内環境が正常値へ戻っています";
}

function drawMissionResultScreen() {
  const patient = getCurrentPatient();
  const rank = calculateTreatmentRank();
  const vitals = state.vitals || initVitals(patient);
  ctx.fillStyle = "rgba(6, 12, 18, 0.9)";
  ctx.fillRect(86, 52, 788, 436);
  ctx.strokeStyle = "rgba(120, 236, 255, 0.34)";
  ctx.lineWidth = 2;
  ctx.strokeRect(86, 52, 788, 436);
  drawScanLines(92, 58, 776, 424, 7);

  drawMonitorPanel(114, 78, 732, 42);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 28px monospace";
  ctx.fillText("結果", 136, 108);
  drawHudDigits(664, 104, "任務完了");

  drawMonitorPanel(116, 142, 350, 218);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("除去率", 138, 172);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px monospace";
  ctx.fillText(patient.result.removal, 138, 224);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("炎症制御", 138, 266);
  ctx.fillStyle = "#dffcff";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(patient.result.inflammation, 138, 302);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("患者状態", 138, 334);
  ctx.fillStyle = "#fff5bf";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(patient.result.status, 138, 370);

  drawMonitorPanel(116, 382, 350, 48);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "11px monospace";
  ctx.fillText("治療評価", 138, 400);
  ctx.fillText("処置完了", 238, 400);
  ctx.fillText("未処置", 364, 400);
  ctx.fillStyle = rank === "S" ? "#fff5bf" : "#ffffff";
  ctx.font = "bold 22px monospace";
  ctx.fillText(rank, 142, 424);
  ctx.font = "bold 14px monospace";
  ctx.fillText(String(state.treatmentStats.completed), 262, 420);
  ctx.fillText(String(state.treatmentStats.missed), 382, 420);

  drawMonitorPanel(488, 142, 358, 258);
  drawEcgLine(506, 160, 216, 26);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("最終患者状態", 510, 214);
  ctx.fillStyle = "#ffffff";
  ctx.font = "14px monospace";
  ctx.fillText(`感染 ${Math.round(vitals.infection)} : ${getVitalAssessment("infection", vitals.infection)}`, 510, 240);
  ctx.fillText(`炎症 ${Math.round(vitals.inflammation)} : ${getVitalAssessment("inflammation", vitals.inflammation)}`, 664, 240);
  ctx.fillText(`酸素 ${Math.round(vitals.oxygen)} : ${getVitalAssessment("oxygen", vitals.oxygen)}`, 510, 266);
  ctx.fillText(`安定 ${Math.round(vitals.stability)} : ${getVitalAssessment("stability", vitals.stability)}`, 664, 266);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("改善", 510, 292);
  ctx.fillStyle = "#fff5bf";
  drawWrappedText(getImprovedVitalLabels(), 558, 292, 254, 14, 12);
  ctx.fillStyle = "#ffb0bc";
  ctx.font = "12px monospace";
  ctx.fillText("悪化", 510, 314);
  drawWrappedText(getWorsenedVitalLabels(), 558, 314, 254, 14, 12);
  ctx.fillStyle = "#fff5bf";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText(getRouteTreatmentResultMessage(), 510, 340);
  ctx.fillStyle = "#8ef6ff";
  ctx.font = "12px monospace";
  ctx.fillText("学習メモ", 510, 360);
  ctx.fillStyle = "#ffffff";
  drawWrappedText(getRouteLearningLine(patient), 510, 378, 306, 14, 12);
  drawWrappedText(state.learningSummary[1] || patient.learningSummary[1], 510, 396, 306, 12, 10);

  if (Math.floor(state.frame / 24) % 2 === 0) {
    ctx.fillStyle = "#fff5bf";
    ctx.font = "bold 22px monospace";
    ctx.fillText("スペース / Enter / タップで戻る", 292, 438);
  }
}

function drawBriefingEffects() {
  for (let i = 0; i < 18; i += 1) {
    const x = (i * 61 - state.frame * 0.8) % (GAME.width + 40);
    const y = 30 + (i * 31) % 460;
    ctx.fillStyle = "rgba(142, 246, 255, 0.08)";
    ctx.fillRect(x, y, 2, 2);
  }
  drawEcgPulseStrip(96, 468, 768, 18);
  if (Math.floor(state.frame / 18) % 2 === 0) {
    ctx.fillStyle = "rgba(142, 246, 255, 0.8)";
    ctx.fillRect(694, 96, 10, 3);
  }
}

function drawPatientSelectEffects() {
  const theme = getCurrentPatientTheme();
  const swapAlpha = state.patientSwapTimer > 0 ? state.patientSwapTimer / 20 : 0;
  for (let i = 0; i < 24; i += 1) {
    const x = (i * 47 - state.frame * 0.85) % (GAME.width + 40);
    const y = 34 + (i * 23) % 470;
    ctx.fillStyle = i % 3 === 0 ? theme.glow : "rgba(255,255,255,0.06)";
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(94, 514);
  ctx.lineTo(210, 514);
  ctx.lineTo(226, 508);
  ctx.lineTo(236, 520);
  ctx.lineTo(250, 496);
  ctx.lineTo(264, 514);
  ctx.lineTo(866, 514);
  ctx.stroke();
  if (Math.floor(state.frame / 20) % 2 === 0) {
    ctx.fillStyle = theme.secondary;
    ctx.fillRect(118, 92, 12, 3);
  }
  if (swapAlpha > 0) {
    ctx.fillStyle = `rgba(255,255,255,${swapAlpha * 0.08})`;
    for (let i = 0; i < 7; i += 1) {
      const y = 70 + i * 58 + ((state.frame * 5 + i * 11) % 18);
      ctx.fillRect(72, y, 816, 2);
    }
  }
}

function drawInjectionEffects() {
  const alpha = 0.16 + Math.sin(state.frame * 0.24) * 0.08;
  ctx.fillStyle = `rgba(255, 92, 124, ${Math.max(0.08, alpha)})`;
  ctx.fillRect(0, 0, GAME.width, 18);
  ctx.fillRect(0, GAME.height - 18, GAME.width, 18);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(0, GAME.height / 2 - 2, GAME.width, 4);
  for (let i = 0; i < 12; i += 1) {
    const x = GAME.width - ((state.frame * (5.5 + i * 0.12) + i * 82) % (GAME.width + 80));
    const y = 126 + i * 22;
    ctx.fillStyle = "rgba(142, 246, 255, 0.1)";
    ctx.fillRect(x, y, 26, 2);
  }
}

function drawResultEffects() {
  for (let i = 0; i < 16; i += 1) {
    const x = (i * 73 - state.frame * 0.65) % (GAME.width + 40);
    const y = 44 + (i * 34) % 430;
    ctx.fillStyle = "rgba(142, 246, 255, 0.08)";
    ctx.fillRect(x, y, 2, 2);
  }
  drawEcgPulseStrip(110, 382, 736, 18);
}

function drawEcgPulseStrip(x, y, w, h) {
  ctx.strokeStyle = "rgba(142, 246, 255, 0.48)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + h / 2);
  ctx.lineTo(x + 130, y + h / 2);
  ctx.lineTo(x + 154, y + h / 2 - 5);
  ctx.lineTo(x + 166, y + h / 2 + 8);
  ctx.lineTo(x + 182, y + h / 2 - 13);
  ctx.lineTo(x + 198, y + h / 2);
  ctx.lineTo(x + w, y + h / 2);
  ctx.stroke();
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
  ctx.fillText("治療完了", 352, 126);
  ctx.font = "22px sans-serif";
  ctx.fillText("原因: 風邪ウイルスの増殖", 300, 176);
  ctx.fillText("予後: 良好", 392, 212);
  ctx.fillText("学習まとめ", 382, 256);
  ctx.font = "18px sans-serif";
  state.learningSummary.forEach((line, index) => {
    ctx.fillText(`- ${line}`, 234, 300 + index * 34);
  });
  ctx.fillStyle = "#b0495d";
  ctx.fillText("スペース / Enter / タップで再開", 312, 436);
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
  const speed = getAreaScrollStyle().speed ?? 1;
  return GAME.scrollSpeed * speed + state.globalScrollBonus + (getRouteEventModifier().scrollBonus ?? 0);
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
  unlockAudio();
  enterFullscreen();
  if (state.scene === "title") {
    startPatientSelect();
    return;
  }
  if (state.scene === "patientSelect") {
    if (getCurrentPatient().unlocked) startBriefing();
    return;
  }
  if (state.scene === "briefing") {
    startInjection();
    return;
  }
  if (state.scene === "injection") {
    beginPlaying();
    return;
  }
  if (state.scene === "result" || state.scene === "clear") {
    returnToTitle();
    return;
  }
  if (state.scene === "gameover") {
    startPatientSelect();
  }
}

function startPatientSelect() {
  resetGame("patientSelect");
  setPatientBgm("normal");
  stopAreaAmbience();
  state.uiNoiseTimer = 8;
}

function startBriefing() {
  resetGame("briefing");
  setPatientBgm("normal");
  stopAreaAmbience();
  state.uiNoiseTimer = 10;
}

function startInjection() {
  state.scene = "injection";
  state.injectionTimer = 0;
  state.screenFlashTimer = 6;
  state.uiNoiseTimer = 8;
  state.cameraShake = 4;
}

function beginPlaying() {
  state.scene = "playing";
  state.injectionTimer = 0;
  setPatientBgm("normal");
  state.screenFlashTimer = 6;
  state.stageEntryFlashTimer = 20;
  showNurseMessage(getRouteMissionMessage(), 120, true);
}

function returnToTitle() {
  state.scene = "title";
  state.areaIndex = 0;
  state.areaFrame = 0;
  state.boss = null;
  state.bossActive = false;
  state.bossSpawnQueued = false;
  state.gameOverTimer = 0;
  state.noteTimer = 0;
  state.areaBannerTimer = 0;
  state.screenFlashTimer = 0;
  state.uiNoiseTimer = 0;
  state.cameraShake = 0;
  state.cameraDriftX = 0;
  state.cameraDriftY = 0;
  stopAreaAmbience();
}

function enterFullscreen() {
  const target = gameFrame || canvas || document.documentElement;
  lockLandscapeOrientation();
  if (document.fullscreenElement) {
    document.body.classList.add("is-game-fullscreen");
    return;
  }
  if (!target.requestFullscreen) return;
  target.requestFullscreen({ navigationUI: "hide" }).then(() => {
    document.body.classList.add("is-game-fullscreen");
    lockLandscapeOrientation();
  }).catch(() => {
    document.body.classList.add("is-game-fullscreen");
  });
}

function lockLandscapeOrientation() {
  if (screen.orientation?.lock) {
    screen.orientation.lock("landscape").catch(() => {});
  }
}

function onKeyChange(code, pressed) {
  if (code === "ArrowUp" || code === "KeyW") state.keys.up = pressed;
  if (code === "ArrowDown" || code === "KeyS") state.keys.down = pressed;
  if (code === "ArrowLeft" || code === "KeyA") state.keys.left = pressed;
  if (code === "ArrowRight" || code === "KeyD") state.keys.right = pressed;
  if (pressed && state.scene === "patientSelect") {
    if (code === "ArrowLeft" || code === "KeyA") changePatientSelection(-1);
    if (code === "ArrowRight" || code === "KeyD") changePatientSelection(1);
  }
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

function patientSelectRegions(point) {
  return {
    left: point.x >= 16 && point.x <= 80 && point.y >= 412 && point.y <= 476,
    right: point.x >= 896 && point.x <= 956 && point.y >= 412 && point.y <= 476,
    start: point.x >= 806 && point.x <= 894 && point.y >= 412 && point.y <= 476,
    leftPane: point.x < GAME.width * 0.5,
    rightPane: point.x >= GAME.width * 0.5,
  };
}

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  onKeyChange(event.code, true);
});

window.addEventListener("keyup", (event) => onKeyChange(event.code, false));

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-game-fullscreen", Boolean(document.fullscreenElement));
  if (document.fullscreenElement) lockLandscapeOrientation();
});

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
  if (state.scene === "patientSelect") {
    const regions = patientSelectRegions(point);
    if (regions.left) changePatientSelection(-1);
    else if (regions.right) changePatientSelection(1);
    else if (regions.start && getCurrentPatient().unlocked) startBriefing();
    else if (regions.leftPane) changePatientSelection(-1);
    else if (regions.rightPane) changePatientSelection(1);
    return;
  }
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
