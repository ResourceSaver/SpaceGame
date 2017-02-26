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

enum Actions {
    ACCELERATE,
    LEFT,
    RIGHT,
    FIRE,
    MISILE,
    SHIELD,

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