enum ObjectState {
    ALIVE,
    DEAD,
    EXPLODING,
    IMMORTAL
}

enum ObstacleType {
    ASTEROID,
    OTHER
}

enum PowerUpType {
    SHIELD,
    MISSILE,
    LIFE,
    BLITZ,
    ENERGY
}

enum GameState {
    NOTSTARTED,
    RUNNING,
    LEVELFINISHED,
    GAMEOVER,
    COMPLETED
}

enum UserAction {
    SHIP1_ACCELERATE = 87,
    SHIP1_LEFT = 65,
    SHIP1_RIGHT = 68,
    SHIP1_FIRE = 83,
    SHIP1_MISILE = 81,
    SHIP1_SHIELD = 69,
    SHIP2_ACCELERATE2 = 79,
    SHIP2_LEFT2 = 75,
    SHIP2_RIGHT2 = 192,
    SHIP2_FIRE2 = 76,
    SHIP2_MISILE2  = 73,
    SHIP2_SHIELD = 80,
    MUTEAUDIO = 77
}

enum BulletTypes {
    LAZER,
    MISILE
}

enum AsteroidSize {
    POWERUP = 32,
    SMALLEST = 48,
    SMALLER = 56,
    SMALL = 64,
    MEDIUM = 96,
    BIG = 128
}