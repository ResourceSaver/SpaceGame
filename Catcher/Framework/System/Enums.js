var ObjectState;
(function (ObjectState) {
    ObjectState[ObjectState["ALIVE"] = 0] = "ALIVE";
    ObjectState[ObjectState["DEAD"] = 1] = "DEAD";
    ObjectState[ObjectState["EXPLODING"] = 2] = "EXPLODING";
    ObjectState[ObjectState["IMMORTAL"] = 3] = "IMMORTAL";
})(ObjectState || (ObjectState = {}));
var ObstacleType;
(function (ObstacleType) {
    ObstacleType[ObstacleType["ASTEROID"] = 0] = "ASTEROID";
    ObstacleType[ObstacleType["OTHER"] = 1] = "OTHER";
})(ObstacleType || (ObstacleType = {}));
var PowerUpType;
(function (PowerUpType) {
    PowerUpType[PowerUpType["SHIELD"] = 0] = "SHIELD";
    PowerUpType[PowerUpType["MISSILE"] = 1] = "MISSILE";
    PowerUpType[PowerUpType["LIFE"] = 2] = "LIFE";
    PowerUpType[PowerUpType["BLITZ"] = 3] = "BLITZ";
    PowerUpType[PowerUpType["ENERGY"] = 4] = "ENERGY";
})(PowerUpType || (PowerUpType = {}));
var GameState;
(function (GameState) {
    GameState[GameState["NOTSTARTED"] = 0] = "NOTSTARTED";
    GameState[GameState["RUNNING"] = 1] = "RUNNING";
    GameState[GameState["LEVELFINISHED"] = 2] = "LEVELFINISHED";
    GameState[GameState["GAMEOVER"] = 3] = "GAMEOVER";
    GameState[GameState["COMPLETED"] = 4] = "COMPLETED";
})(GameState || (GameState = {}));
var UserAction;
(function (UserAction) {
    UserAction[UserAction["SHIP1_ACCELERATE"] = 87] = "SHIP1_ACCELERATE";
    UserAction[UserAction["SHIP1_LEFT"] = 65] = "SHIP1_LEFT";
    UserAction[UserAction["SHIP1_RIGHT"] = 68] = "SHIP1_RIGHT";
    UserAction[UserAction["SHIP1_FIRE"] = 83] = "SHIP1_FIRE";
    UserAction[UserAction["SHIP1_MISILE"] = 81] = "SHIP1_MISILE";
    UserAction[UserAction["SHIP1_SHIELD"] = 69] = "SHIP1_SHIELD";
    UserAction[UserAction["SHIP2_ACCELERATE2"] = 79] = "SHIP2_ACCELERATE2";
    UserAction[UserAction["SHIP2_LEFT2"] = 75] = "SHIP2_LEFT2";
    UserAction[UserAction["SHIP2_RIGHT2"] = 192] = "SHIP2_RIGHT2";
    UserAction[UserAction["SHIP2_FIRE2"] = 76] = "SHIP2_FIRE2";
    UserAction[UserAction["SHIP2_MISILE2"] = 73] = "SHIP2_MISILE2";
    UserAction[UserAction["SHIP2_SHIELD"] = 80] = "SHIP2_SHIELD";
    UserAction[UserAction["MUTEAUDIO"] = 77] = "MUTEAUDIO";
})(UserAction || (UserAction = {}));
var BulletTypes;
(function (BulletTypes) {
    BulletTypes[BulletTypes["LAZER"] = 0] = "LAZER";
    BulletTypes[BulletTypes["MISILE"] = 1] = "MISILE";
})(BulletTypes || (BulletTypes = {}));
var AsteroidSize;
(function (AsteroidSize) {
    AsteroidSize[AsteroidSize["POWERUP"] = 32] = "POWERUP";
    AsteroidSize[AsteroidSize["SMALLEST"] = 48] = "SMALLEST";
    AsteroidSize[AsteroidSize["SMALLER"] = 56] = "SMALLER";
    AsteroidSize[AsteroidSize["SMALL"] = 64] = "SMALL";
    AsteroidSize[AsteroidSize["MEDIUM"] = 96] = "MEDIUM";
    AsteroidSize[AsteroidSize["BIG"] = 128] = "BIG";
})(AsteroidSize || (AsteroidSize = {}));
