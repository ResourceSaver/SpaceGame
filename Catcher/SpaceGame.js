class AudioLibrary {
    static Initialize() {
        AudioLibrary.audioCollection = new Array();
        AudioLibrary.AddAudioFile("explosion.mp3", 0.45, false);
        AudioLibrary.AddAudioFile("laser.mp3", 0.2, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.9, true);
        AudioLibrary.AddAudioFile("missile.mp3", 0.7, false);
        AudioLibrary.AddAudioFile("powerup.mp3", 0.51, false);
        AudioLibrary.AddAudioFile("emptymisile.mp3", 0.3, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.9, true);
        AudioLibrary.AddAudioFile("music.mp3", 0.3, true);
        AudioLibrary.AddAudioFile("levelup.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("gameover.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("win.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("clash.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("shield.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("shield.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("thunder.mp3", 0.75, false);
    }
    static AddAudioFile(fileName, volume, loop) {
        let audio = new Audio('Resources\\Audio\\' + fileName);
        audio.volume = System.Volume * volume;
        audio.innerText = volume.toString();
        audio.loop = loop;
        AudioLibrary.audioCollection.push(audio);
    }
    static ToggleMute() {
        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {
            AudioLibrary.audioCollection[i].muted = !AudioLibrary.audioCollection[i].muted;
        }
    }
    static Play(index) {
        this.audioCollection[index].currentTime = 0;
        this.audioCollection[index].play();
    }
    static Stop(index) {
        this.audioCollection[index].currentTime = 0;
        this.audioCollection[index].pause();
    }
    static PauseLoop(index) {
        this.prevVol = this.audioCollection[index].volume;
        this.audioCollection[index].volume = 0;
        this.audioCollection[index].pause();
        this.audioCollection[index].volume = this.prevVol;
    }
}
AudioLibrary.prevVol = 0;
class Canvas {
    constructor(canvasName) {
        this.xx = 1.0;
        this.dd = 0;
        this.x0 = 0;
        this.x1 = 0;
        this.y0 = 0;
        this.y1 = 0;
        let canvas = document.getElementById(canvasName);
        canvas.height = System.resolutionY;
        canvas.width = System.resolutionX;
        this.context = canvas.getContext("2d");
        this.context.lineWidth = 2;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Verdana";
        this.context.strokeStyle = 'skyblue';
        this.context.fillStyle = 'lightblue';
    }
    Clear() { this.context.clearRect(0, 0, System.resolutionX, System.resolutionY); }
    DrawObject(gameObject) {
        if (System.DebugMode) {
            this.context.strokeRect(gameObject.GetBoundingX(), gameObject.GetBoundingY(), gameObject.boundingBoxWidth, gameObject.boundingBoxHeight);
        }
        this.DrawDrawable(gameObject.GetDrawableCollection().GetCurrentDrawable(), gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    }
    DrawHitCircle(gameObject) {
        this.width = gameObject.boundingBoxHeight > gameObject.boundingBoxWidth ? gameObject.boundingBoxHeight : gameObject.boundingBoxWidth;
        this.DrawCircle(gameObject.GetCenterX(), gameObject.GetCenterY(), this.width, gameObject.hitColor, gameObject.hitCounter, this.width * 0.75);
    }
    DrawObjectRotate(gameObject) {
        this.x = gameObject.x + gameObject.widthHalf;
        this.y = gameObject.y + gameObject.heightHalf;
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y);
        this.DrawObject(gameObject);
        this.context.restore();
    }
    DrawObjectRotateAround(gameObject) {
        this.x = gameObject.GetCenterX();
        this.y = gameObject.GetCenterY();
        this.context.save();
        this.context.translate(this.x, this.y - gameObject.boundingBoxHeight + 20);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y + gameObject.boundingBoxHeight - 20);
        this.DrawObject(gameObject);
        this.context.restore();
    }
    DrawDrawable(drawable, x, y, width, height) {
        this.context.drawImage(drawable.GetImage(), drawable.GetOffsetX(), drawable.GetOffSetY(), drawable.GetWidth(), drawable.GetHeight(), x, y, width, height);
    }
    DrawImage(image, x, y, w, h, alpha = 1) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h);
        this.context.restore();
    }
    DrawStar(x, y, radius, alpha) {
        this.context.save();
        this.context.strokeStyle = 'white';
        this.context.fillStyle = 'lightblue';
        this.context.globalAlpha = alpha;
        this.context.beginPath();
        this.context.arc(x, y, radius / 2, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }
    DrawCircle(x, y, radius, color, alpha, lineWidth) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.strokeStyle = color;
        this.context.fillStyle = "transparent";
        this.context.beginPath();
        this.context.arc(x, y, radius / 2, 0, 2 * Math.PI, false);
        this.context.lineWidth = lineWidth;
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }
    DrawRectangle(x, y, h, w, color = "lightblue") {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
        this.context.restore();
    }
    DrawParticle(x, y, r, hue) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = "hsla(" + hue + ",100%,50%,1)";
        this.context.fill();
        this.context.restore();
    }
    DrawLevelText(text, fontSize, alpha) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.fillStyle = 'white';
        this.context.font = fontSize + "px Impact";
        this.context.fillText(text, System.resolutionX / 2, System.resolutionY / 2);
        this.context.restore();
    }
    DrawText(x, y, string, font, alpha = 1) {
        this.context.save();
        this.context.fillStyle = 'white';
        this.context.globalAlpha = alpha;
        this.context.font = font;
        this.context.textAlign = "left";
        this.context.fillText(string, x, y);
        this.context.textAlign = "center";
        this.context.restore();
    }
    Blitz() {
        this.xx = 1;
        AudioLibrary.Play(14);
        this.x0 = System.resolutionX * Math.random();
        this.y0 = System.resolutionY * Math.random();
        this.x1 = System.resolutionX * Math.random();
        this.y1 = System.resolutionY * Math.random();
    }
    DrawLight() {
        if (this.xx > 0) {
            this.xx = this.xx - 0.1;
        }
        else {
            return;
        }
        this.context.save();
        this.context.globalCompositeOperation = 'lighter';
        this.dd = (1 + Math.sin(this.xx)) / 2;
        var radialGradient = this.context.createLinearGradient(this.x0, this.y0, this.x1, this.y1);
        radialGradient.addColorStop(0.0 * this.dd, '#320D42');
        radialGradient.addColorStop(0.25 * this.dd, '#5D1A7F');
        radialGradient.addColorStop(0.5 * this.dd, '#A032C1');
        radialGradient.addColorStop(0.75, '#FAA8FF');
        radialGradient.addColorStop(1.0, '#FFF2FB');
        this.context.fillStyle = radialGradient;
        this.context.globalAlpha = this.xx;
        this.context.fillRect(0, 0, System.resolutionX, System.resolutionY);
        this.context.globalAlpha = 1;
        this.context.restore();
    }
}
class Drawable {
    constructor(name, image, offsetX = 0, offsetY = 0, width = image.width, height = image.height) {
        this.image = image;
        this.offsetx = offsetX;
        this.offsety = offsetY;
        this.width = width;
        this.height = height;
        this.name = name;
    }
    GetImage() { return this.image; }
    GetOffsetX() { return this.offsetx; }
    GetOffSetY() { return this.offsety; }
    GetWidth() { return this.width; }
    GetHeight() { return this.height; }
    GetName() { return this.name; }
}
class DrawableAnimation extends Drawable {
    constructor(image, length, offsetX, offsetY, width, height, speed, name, finishedEventHandler = null) {
        super(name, image, offsetX, offsetY, width, height);
        this.numberOfFrames = length;
        this.currentFrame = 0;
        this.animationSpeed = speed;
        this.animationSpeedCounter = speed;
        this.animationFinishedEvent = finishedEventHandler;
    }
    GetOffsetX() {
        if (this.animationSpeedCounter <= 0) {
            this.animationSpeedCounter = this.animationSpeed;
            this.currentFrame++;
            if (this.currentFrame == this.numberOfFrames - 1 && this.animationFinishedEvent != null) {
                this.animationFinishedEvent();
            }
            else if (this.currentFrame >= this.numberOfFrames) {
                this.currentFrame = 0;
            }
        }
        this.animationSpeedCounter -= 1;
        return super.GetOffsetX() + (this.GetWidth() * this.currentFrame);
    }
}
class DrawableCollection {
    constructor() {
        this.currentDrawable = 0;
        this.drawables = new Array(0);
    }
    AddDrawable(drawable) {
        this.drawables.push(drawable);
        this.currentDrawable = this.drawables.length - 1;
    }
    GetCurrentDrawable() {
        return this.drawables[this.currentDrawable];
    }
    SetCurrentDrawable(name) {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i].GetName() === name) {
                this.currentDrawable = i;
                return;
            }
        }
    }
}
class Level {
    constructor(levelName) {
        this.levelName = levelName;
        this.obstacles = new Array();
    }
    GetObstacles() {
        return this.obstacles;
    }
    AddObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }
    GetLevelName() {
        return this.levelName;
    }
}
class LightSource {
    Act() {
        System.canvas.DrawLight();
    }
}
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
class GameObject {
    constructor(width, height, x, y, canvas) {
        this.drawRotate = false;
        this.vector = new Vector(0, 0, 0);
        this.drawableCollection = new DrawableCollection();
        this.state = ObjectState.ALIVE;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.hitCounter = 0;
        this.heightHalf = this.height / 2;
        this.widthHalf = this.width / 2;
        this.AdjustBoundingbox(0, 0);
    }
    AdjustBoundingbox(widthDiff, heightDiff) {
        this.boundingBoxHeight = this.height + heightDiff;
        this.boundingBoxWidth = this.width + widthDiff;
        this.boundingBoxHeightHalf = this.boundingBoxHeight / 2;
        this.boundingBoxWidthHalf = this.boundingBoxWidth / 2;
    }
    GetDrawableCollection() { return this.drawableCollection; }
    Act() {
        this.x += this.vector.x;
        this.y -= this.vector.y;
        if (this.x > System.resolutionX) {
            this.x = 0 - this.width;
        }
        else if (this.x + this.width < 0) {
            this.x = System.resolutionX;
        }
        if (this.y > System.resolutionY) {
            this.y = 0 - this.height;
        }
        else if (this.y + this.height < 0) {
            this.y = System.resolutionY;
        }
    }
    HitByBullet(attack) {
        this.hitCounter = 0.2;
        AudioLibrary.Play(11);
    }
    Draw() {
        if (this.drawRotate) {
            this.DrawObjectRotate();
        }
        else {
            this.DrawNonRotate();
        }
    }
    DrawNonRotate() {
        this.canvas.DrawObject(this);
        this.DrawHitCircle();
    }
    DrawObjectRotate() {
        this.canvas.DrawObjectRotate(this);
        this.DrawHitCircle();
    }
    DrawHitCircle() {
        if (this.hitCounter > 0 && this.Is(ObjectState.ALIVE)) {
            this.hitCounter -= 0.007;
            if (this.hitCounter < 0) {
                this.hitCounter = 0;
            }
            this.canvas.DrawHitCircle(this);
        }
    }
    CollisionCheck(gameObject) {
        this.Dx = Math.abs(this.GetCenterX() - gameObject.GetCenterX());
        this.Dy = Math.abs(this.GetCenterY() - gameObject.GetCenterY());
        return (this.Dx < (this.boundingBoxWidthHalf + gameObject.boundingBoxWidthHalf) && this.Dy < (this.boundingBoxHeightHalf + gameObject.boundingBoxHeightHalf));
    }
    GetCenterX() {
        return this.x + this.widthHalf;
    }
    GetCenterY() {
        return this.y + this.heightHalf;
    }
    GetBoundingX() {
        return this.x + this.widthHalf - this.boundingBoxWidthHalf;
    }
    GetBoundingY() {
        return this.y + this.heightHalf - this.boundingBoxHeightHalf;
    }
    SetState(objectState) { this.state = objectState; }
    Is(objectState) { return this.state == objectState; }
    IsNot(objectState) { return this.state != objectState; }
}
class GamePad {
    static Setup(game) {
        this.spaceGame = game;
        this.keys = new Array(15);
    }
    static Act() {
        this.gp = navigator.getGamepads()[0];
        if (this.gp == undefined)
            return;
        for (var i = 0; i < this.gp.buttons.length; i++) {
            if (this.gp.buttons[i].pressed) {
                if (!this.keys[i]) {
                    this.keys[i] = true;
                    this.spaceGame.KeyDown(this.Mapping(i));
                }
            }
            else if (this.keys[i]) {
                this.keys[i] = false;
                this.spaceGame.KeyUp(this.Mapping(i));
            }
        }
    }
    static Mapping(i) {
        switch (i) {
            case 0:
                return UserAction.SHIP1_ACCELERATE;
            case 1:
                return UserAction.SHIP1_MISILE;
            case 2:
                return UserAction.SHIP1_FIRE;
            case 3:
                return UserAction.SHIP1_SHIELD;
            case 14:
                return UserAction.SHIP1_LEFT;
            case 15:
                return UserAction.SHIP1_RIGHT;
            default:
                return null;
        }
    }
    static UnMapping(ua) {
        switch (ua) {
            case UserAction.SHIP1_ACCELERATE:
                return 0;
            case UserAction.SHIP1_MISILE:
                return 1;
            case UserAction.SHIP1_FIRE:
                return 2;
            case UserAction.SHIP1_SHIELD:
                return 3;
            case UserAction.SHIP1_LEFT:
                return 14;
            case UserAction.SHIP1_RIGHT:
                return 15;
            default:
                return -1;
        }
    }
    static IsKeyDown(action) {
        return this.keys[this.UnMapping(action)];
    }
}
class Keyboard {
    static Setup(game) {
        this.spaceGame = game;
        this.keys = new Array();
        document.addEventListener("keydown", (e) => this.KeyDown(e.keyCode), false);
        document.addEventListener("keyup", (e) => this.KeyUp(e.keyCode), false);
    }
    static KeyDown(action) {
        if (this.keys[action] == true) {
            return;
        }
        else if (action == UserAction.MUTEAUDIO) {
            AudioLibrary.ToggleMute();
        }
        this.keys[action] = true;
        this.spaceGame.KeyDown(action);
    }
    static KeyUp(action) {
        this.keys[action] = false;
        this.spaceGame.KeyUp(action);
    }
    static IsKeyDown(action) {
        return this.keys[action];
    }
}
let chosenRequestFrame;
let spaceGame;
let fpsLabel, systemPerformance;
window.onload = () => { new Images(() => this.OnImagesLoaded()); };
function OnImagesLoaded() {
    this.chosenRequestFrame = GetFrame();
    this.spaceGame = System.Initialize();
    if (System.DebugMode) {
        this.fpsLabel = document.getElementById("fpsLabel");
        this.systemPerformance = new SystemPerformance();
        RunGameDebugMode();
    }
    else {
        RunGame();
    }
}
function RunGame() {
    GamePad.Act();
    this.spaceGame.Act();
    this.chosenRequestFrame(RunGame);
}
function RunGameDebugMode() {
    this.fpsLabel.innerHTML = this.systemPerformance.GetFPS();
    GamePad.Act();
    this.spaceGame.Act();
    this.chosenRequestFrame(RunGameDebugMode);
}
function GetFrame() {
    return this.window.requestAnimationFrame ||
        this.window.webkitRequestAnimationFrame ||
        this.window.mozRequestAnimationFrame ||
        this.window.oRequestAnimationFrame ||
        this.window.msRequestAnimationFrame ||
        function (callback, element) {
            this.window.setTimeout(callback, 1000 / 60);
        };
}
class Vector {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    Rotate(amount) {
        this.angle = (this.angle + amount) % 360;
    }
    Accelerate(amount) {
        this.radian = this.angle * Math.PI / 180;
        this.y += Math.cos(this.radian) * amount;
        this.x += Math.sin(this.radian) * amount;
    }
    ConstantSpeed(amount) {
        this.radian = (this.angle * Math.PI) / 180;
        this.y = Math.cos(this.radian) * amount;
        this.x = Math.sin(this.radian) * amount;
    }
    Copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.angle = vector.angle;
    }
    Reset() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }
    SetValues(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}
class Obstacle extends GameObject {
    constructor(size, width, height, x, y, canvas, energy) {
        super(width, height, x, y, canvas);
        this.hitColor = "green";
        this.size = size;
        this.energy = energy;
        this.vector.x = Math.random() * -6 + 3;
        this.vector.y = Math.random() * -6 + 3;
        this.type = ObstacleType.OTHER;
        this.SetRandomCoordinates();
    }
    SetRandomCoordinates() {
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : -this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : -this.height;
        }
    }
    HitByBullet(attack) {
        super.HitByBullet(attack);
        this.energy -= attack;
    }
    GetEnergy() {
        return this.energy;
    }
    Explode() {
        ParticleSystem.Build(this.x + this.widthHalf, this.y + this.heightHalf);
        this.state = ObjectState.EXPLODING;
        this.drawableCollection.SetCurrentDrawable("explosion");
        AudioLibrary.Play(0);
    }
    GetSize() {
        return this.size;
    }
    IsType(type) {
        return this.type == type;
    }
    SetCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}
class MoveStrategy {
    constructor(obstacle, speed) {
        this.changeDirectionCount = 0;
        this.changeDirection = 50;
        this.targetAngle = 0;
        this.targetAngleCount = 0;
        this.obstacle = obstacle;
        this.speed = speed;
        this.obstacle.vector.angle = Math.round(Math.random() * 360);
        this.obstacle.vector.ConstantSpeed(this.speed);
    }
    SetChangeDirection(value) {
        this.changeDirection = value;
    }
    Act() {
        if (Math.abs(this.targetAngle) != this.targetAngleCount) {
            if (this.obstacle.IsNot(ObjectState.EXPLODING)) {
                if (this.targetAngle < 0) {
                    this.obstacle.vector.Rotate(-1);
                }
                else {
                    this.obstacle.vector.Rotate(1);
                }
                this.targetAngleCount++;
                this.obstacle.vector.ConstantSpeed(this.speed);
            }
        }
        else {
            this.changeDirectionCount++;
            if (this.changeDirectionCount > this.changeDirection) {
                this.changeDirectionCount = 0;
                this.targetAngle = Math.round(Math.random() * -360 + 180);
                this.targetAngleCount = 0;
            }
        }
    }
}
class ShootStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.obstacle.vector);
            this.shotCount = 0;
        }
    }
}
class ShootThreeSixtyStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shotSpeed) {
            for (let i = 0; i < 360; i = i + 30) {
                this.vector.SetValues(0, 0, i);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            }
            this.shotCount = 0;
        }
    }
}
class TwirvlShootStrategy {
    constructor(obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.angle = 0;
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = 1;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE)) {
            if (this.shotCount > this.shotSpeed) {
                this.vector.SetValues(0, 0, this.angle);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
                this.shotCount = 0;
                this.angle += 30;
                if (this.angle > 360) {
                    this.angle = 0;
                }
            }
        }
    }
}
class ShootRandomStrategy {
    constructor(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.vector = new Vector(0, 0, 0);
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    Act() {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            this.vector.SetValues(0, 0, Math.random() * 360);
            this.vector.ConstantSpeed(1);
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            this.shotCount = 0;
        }
    }
}
class ChargeStrategy {
    constructor(obstacle) {
        this.steps = 100;
        this.stepCounter = 1;
        this.obstacle = obstacle;
        this.SetDestination();
    }
    Act() {
        if (this.obstacle.Is(ObjectState.EXPLODING))
            return;
        if (this.obstacle.vector.angle != this.angleDestination) {
            if (this.obstacle.vector.angle - this.angleDestination > 0) {
                this.obstacle.vector.Rotate(-0.5);
            }
            else {
                this.obstacle.vector.Rotate(0.5);
            }
        }
        else {
            if (this.stepCounter == 1) {
                this.obstacle.vector.ConstantSpeed(20);
            }
            else if (this.stepCounter > this.steps) {
                this.SetDestination();
            }
            this.stepCounter++;
        }
    }
    SetDestination() {
        this.obstacle.vector.ConstantSpeed(0);
        this.stepCounter = 0;
        this.angleDestination = rand(180, -180, 1);
    }
}
class Shield extends GameObject {
    constructor() {
        super(156, 156, 0, 0, System.canvas);
        this.drawableCollection = DrawableLibrary.GetShield();
    }
    ShadowDraw(x, y, angle) {
        this.x = x - this.widthHalf;
        this.y = y - this.heightHalf;
        this.vector.angle = angle;
        this.canvas.DrawObjectRotate(this);
    }
}
class TextDrawer extends GameObject {
    constructor() {
        super(0, 0, 0, 0, System.canvas);
        this.maxVal = 2;
        this.count = 0;
        this.alpha = 0;
        this.startValue = 75;
        this.fontSize = this.startValue;
    }
    SetText(value) {
        this.fontSize = this.startValue;
        this.count = 0;
        this.text = value;
    }
    Act() {
        if (this.count > this.maxVal)
            return false;
        this.alpha = -1 * Math.pow(this.count, 2) + 2 * this.count;
        this.count += 0.03;
        this.fontSize += 3;
        this.canvas.DrawLevelText(this.text, this.fontSize, this.alpha);
        return (this.count > this.maxVal);
    }
}
class Thrust extends GameObject {
    constructor(ship) {
        super(ship.width, ship.height, ship.x, ship.y + ship.height - 20, System.canvas);
        this.drawableCollection = DrawableLibrary.GetThrust();
        this.thrusting = false;
        this.ship = ship;
    }
    Spawn() {
        this.x = this.ship.x;
        this.y = this.ship.y + this.ship.height - 20;
        this.SetThrusting(false);
    }
    Draw() { this.canvas.DrawObjectRotateAround(this); }
    Act() {
        this.vector.Copy(this.ship.vector);
        super.Act();
        if (!this.thrusting || this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING))
            return;
        this.Draw();
    }
    SetThrusting(value) {
        this.thrusting = value;
    }
}
class LevelManager {
    constructor() {
        this.levels = new Array();
        this.levels.push(new Level1());
        this.levels.push(new Level2());
        this.levels.push(new Level3());
        this.levels.push(new Level4());
        this.levels.push(new Level5());
        this.levels.push(new Level6());
        this.levels.push(new Level7());
        this.levels.push(new Level8());
        this.levels.push(new Level9());
        this.levels.push(new Level10());
        this.levels.push(new Level11());
    }
    GetNextLevel() {
        return this.levels.shift();
    }
    PeakAtNextLevel() {
        return this.levels[0];
    }
}
class Level0 extends Level {
    constructor() {
        super('0');
    }
}
class Level1 extends Level {
    constructor() {
        super('Level 1');
        this.AddObstacle(new AsteroidSmaller());
    }
}
class Level2 extends Level {
    constructor() {
        super('Level 2');
        this.AddObstacle(new AsteroidSmall());
    }
}
class Level3 extends Level {
    constructor() {
        super('Level 3');
        this.AddObstacle(new AsteroidMedium());
    }
}
class Level4 extends Level {
    constructor() {
        super('Level 4');
        this.AddObstacle(new Slicer());
    }
}
class Level5 extends Level {
    constructor() {
        super('Level 5');
        this.AddObstacle(new Fighter());
    }
}
class Level6 extends Level {
    constructor() {
        super('Level 6');
        this.AddObstacle(new BugEye());
    }
}
class Level7 extends Level {
    constructor() {
        super('Level 7');
        this.AddObstacle(new Scythe());
    }
}
class Level8 extends Level {
    constructor() {
        super('Level 8');
        this.AddObstacle(new Blades());
    }
}
class Level9 extends Level {
    constructor() {
        super('Level 9');
        this.AddObstacle(new Spikey());
    }
}
class Level10 extends Level {
    constructor() {
        super('Level 10');
        this.AddObstacle(new Saucer());
    }
}
class Level11 extends Level {
    constructor() {
        super('Final boss');
        this.AddObstacle(new SaucerBig());
    }
}
class Particle {
    constructor(i) {
        this.id = i;
        this.orgHue = rand(50, 0, 1);
        this.active = false;
    }
    Build(x, y) {
        this.r = rand(7, 2, 1);
        this.x = x;
        this.y = y;
        this.active = true;
        this.hue = this.orgHue;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        this.gravity = 0.01;
        System.canvas.DrawParticle(this.x, this.y, this.r, this.hue);
    }
    Draw() {
        this.active = true;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.hue -= 0.5;
        this.r = Math.abs(this.r - .1);
        System.canvas.DrawParticle(this.x, this.y, this.r, this.hue);
        if (this.r <= .05) {
            this.active = false;
        }
    }
}
class ParticleSystem {
    constructor() {
        ParticleSystem.init();
    }
    static init() {
        for (var i = 0; i < this.particleNum; i++) {
            this.particles.push(new Particle(i));
        }
    }
    static Build(x, y) {
        this.x = x;
        this.y = y;
    }
    static Draw() {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].active === true) {
                this.particles[i].Draw();
            }
            else if (this.x != -1) {
                this.particles[i].Build(this.x, this.y);
                this.count++;
                if (this.count > 30) {
                    this.x = -1;
                }
            }
        }
        this.count = 0;
        this.x = -1;
    }
}
ParticleSystem.particleNum = 60;
ParticleSystem.particles = [];
ParticleSystem.count = 10;
function rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1, min = min || 0, gen = min + (max - min) * Math.random();
    return (_int) ? Math.round(gen) : gen;
}
;
class BulletPoolShip {
    constructor(ship, color) {
        this.ship = ship;
        this.maxBullets = 8;
        this.bullets = new Array();
        this.LoadBulletsOfColor(color);
    }
    LoadBulletsOfColor(color) {
        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet(color));
        }
    }
    SpawnMisile() {
        if (this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING)) {
            return;
        }
        else if (this.ship.numberOfMisiles == 0) {
            AudioLibrary.Play(5);
            return;
        }
        ;
        this.ship.numberOfMisiles--;
        if (this.Spawn(BulletTypes.MISILE)) {
            this.ship.vector.Accelerate(-3);
            AudioLibrary.Play(3);
        }
    }
    SpawnLaser() {
        if (this.Spawn(BulletTypes.LAZER)) {
            AudioLibrary.Play(1);
        }
    }
    Spawn(type) {
        if (this.ship.IsNot(ObjectState.ALIVE) && this.ship.IsNot(ObjectState.IMMORTAL)) {
            return false;
        }
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(this.ship, type, this.ship.vector);
            this.bullets.unshift(this.bullets.pop());
            return true;
        }
        return false;
    }
    Act() {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }
            if (this.bullets[i].Act()) {
                this.KillBullet(i);
            }
        }
    }
    KillBullet(i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
        return true;
    }
    Collide(object) {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return 0;
            }
            if (object.CollisionCheck(this.bullets[i])) {
                this.attack = this.bullets[i].attack;
                this.KillBullet(i);
                return this.attack;
            }
        }
        return 0;
    }
}
class DrawableLibrary {
    static GetShip(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        let ship = Images.GetImage("ship");
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(ship, 15, 6272, 0, 128, 128, 7, "idle"));
        return drawableCollection;
    }
    static GetShield() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("shield"), 20, 0, 0, 192, 192, 0, "shield", null));
        return drawableCollection;
    }
    static GetSaucer(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("saucer"), 16, 0, 0, 128, 128, 6, "saucer"));
        return drawableCollection;
    }
    static GetAsteroid(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid"), 16, 0, 0, 64, 64, 3, "asteroid"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid3"), 16, 0, 0, 64, 64, 3, "asteroid3"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid4"), 16, 0, 0, 64, 64, 3, "asteroid4"));
        return drawableCollection;
    }
    static GetFighter(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("fighter"), 16, 0, 0, 128, 128, 6, "fighter"));
        return drawableCollection;
    }
    static GetSlicer(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("slicer"), 16, 0, 0, 128, 128, 6, "slicer"));
        return drawableCollection;
    }
    static GetBlades(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("blades"), 16, 0, 0, 128, 128, 6, "blades"));
        return drawableCollection;
    }
    static GetLazer(color) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0, 32, 32));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bullet" + color), 16, 0, 0, 32, 64, 1, "bullet"));
        return drawableCollection;
    }
    static GetPowerUps() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("life", Images.GetImage("shipsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("shield", Images.GetImage("shieldsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("blitz", Images.GetImage("blitz"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("energy", Images.GetImage("lifesmall"), 0, 0));
        return drawableCollection;
    }
    static GetThrust() {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("thrust"), 24, 0, 0, 128, 128, 1, "thrust"));
        return drawableCollection;
    }
    static GetSpikey(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("spikey"), 16, 0, 0, 128, 128, 6, "spikey"));
        return drawableCollection;
    }
    static GetBugEye(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bugeye"), 16, 0, 0, 128, 128, 6, "bugeye"));
        return drawableCollection;
    }
    static GetScythe(explotionFinishedEventHandler) {
        let drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("scythe"), 16, 0, 0, 128, 128, 6, "scythe"));
        return drawableCollection;
    }
}
class Images {
    constructor(callback) {
        this.imagesLoaded = 0;
        this.callback = callback;
        Images.images = new Array();
        this.AddImage("background.png", "background");
        this.AddImage("ship.png", "ship");
        this.AddImage("thrust.png", "thrust");
        this.AddImage("shield.png", "shield");
        this.AddImage("bulletred.png", "bulletred");
        this.AddImage("bulletgreen.png", "bulletgreen");
        this.AddImage("bulletblue.png", "bulletblue");
        this.AddImage("missile.png", "missile");
        this.AddImage("shield.png", "shield");
        this.AddImage("explosion.png", "explosion");
        this.AddImage("shipsmall.png", "shipsmall");
        this.AddImage("shieldsmall.png", "shieldsmall");
        this.AddImage("asteroidsmall.png", "asteroidsmall");
        this.AddImage("blitz.png", "blitz");
        this.AddImage("lifesmall.png", "lifesmall");
        this.AddImage("blades.png", "blades");
        this.AddImage("slicer.png", "slicer");
        this.AddImage("bugeye.png", "bugeye");
        this.AddImage("scythe.png", "scythe");
        this.AddImage("spikey.png", "spikey");
        this.AddImage("saucer.png", "saucer");
        this.AddImage("fighter.png", "fighter");
        this.AddImage("asteroid.png", "asteroid");
        this.AddImage("asteroid3.png", "asteroid3");
        this.AddImage("asteroid4.png", "asteroid4");
    }
    AddImage(file, name) {
        let image = new Image();
        image.id = name;
        image.onload = () => {
            this.imagesLoaded++;
            if (this.imagesLoaded == Images.images.length) {
                this.callback();
            }
        };
        image.src = "Resources/Images/" + file;
        Images.images.push(image);
    }
    static GetImage(name) {
        for (let i = 0; i < Images.images.length; i++) {
            if (Images.images[i].id == name) {
                return Images.images[i];
            }
        }
        alert("Image: " + name + " not found");
    }
}
class System {
    static Initialize() {
        AudioLibrary.Initialize();
        System.canvas = new Canvas("mainCanvas");
        let backgroundCanvas = new Canvas("backgroundCanvas");
        backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);
        var game = new SpaceGame();
        GamePad.Setup(game);
        Keyboard.Setup(game);
        return game;
    }
}
System.resolutionX = 1920;
System.resolutionY = 1080;
System.DebugMode = false;
System.Volume = 0.5;
class SystemPerformance {
    constructor() {
        this.startTime = 0;
        this.frameNumber = 0;
        this.d = 0;
        this.currentTime = 0;
        this.result = 0;
    }
    GetFPS() {
        this.frameNumber++;
        this.d = new Date().getTime();
        this.currentTime = (this.d - this.startTime) / 1000;
        this.result = Math.floor((this.frameNumber / this.currentTime));
        if (this.currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return this.result;
    }
}
class Asteroid extends Obstacle {
    constructor(size, energy) {
        super(size, size, size, 0, 0, System.canvas, energy);
        this.type = ObstacleType.ASTEROID;
        this.drawableCollection = DrawableLibrary.GetAsteroid(() => this.state = ObjectState.DEAD);
    }
    HitByBullet() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.Explode();
            return true;
        }
        return false;
    }
    Act() {
        super.Act();
        super.Draw();
    }
}
class AsteroidMedium extends Asteroid {
    constructor() {
        super(AsteroidSize.SMALL, 1);
        this.drawableCollection.SetCurrentDrawable("asteroid");
        this.AdjustBoundingbox(-20, -20);
    }
}
class AsteroidSmall extends Asteroid {
    constructor() {
        super(AsteroidSize.SMALLER, 1);
        this.AdjustBoundingbox(-30, -30);
        this.drawableCollection.SetCurrentDrawable("asteroid3");
    }
}
class AsteroidSmaller extends Asteroid {
    constructor() {
        super(AsteroidSize.SMALLEST, 1);
        this.AdjustBoundingbox(-25, -25);
        this.drawableCollection.SetCurrentDrawable("asteroid4");
    }
}
class Blades extends Obstacle {
    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 10);
        this.AdjustBoundingbox(-50, -50);
        this.drawableCollection = DrawableLibrary.GetBlades(() => this.state = ObjectState.DEAD);
    }
    Act() {
        super.Act();
        super.Draw();
    }
}
class Spikey extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 15);
        this.drawableCollection = DrawableLibrary.GetSpikey(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-80, -80);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class BugEye extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetBugEye(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-90, -55);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class SaucerBig extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 5);
        this.shooterStrategy = new TwirvlShootStrategy(this);
        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-60, -60);
    }
    Act() {
        super.Act();
        this.shooterStrategy.Act();
        super.Draw();
    }
}
class Saucer extends Obstacle {
    constructor() {
        super(AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 5);
        this.shooterStrategy = new ShootThreeSixtyStrategy(150, this);
        this.drawableCollection = DrawableLibrary.GetSaucer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-45, -45);
    }
    Act() {
        super.Act();
        this.shooterStrategy.Act();
        super.Draw();
    }
}
class Fighter extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 15);
        this.shootingStrategy = new ShootStrategy(100, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.moveStrategy.SetChangeDirection(Math.random() * 200 + 100);
        this.drawableCollection = DrawableLibrary.GetFighter(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-50, -60);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class Scythe extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.shootingStrategy = new ShootStrategy(20, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetScythe(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-60, -70);
        this.drawRotate = true;
    }
    Act() {
        super.Act();
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    }
}
class Slicer extends Obstacle {
    constructor() {
        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.attackStrategy = new ChargeStrategy(this);
        this.drawableCollection = DrawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);
        this.AdjustBoundingbox(-90, -40);
        this.drawRotate = true;
    }
    Act() {
        this.attackStrategy.Act();
        super.Act();
        this.Draw();
    }
}
class Bullet extends GameObject {
    constructor(color) {
        super(32, 64, 0, 0, System.canvas);
        this.reach = 70;
        this.reachCounter = 0;
        this.attack = 0;
        this.state = ObjectState.DEAD;
        this.drawableCollection = DrawableLibrary.GetLazer(color);
    }
    Spawn(ship, type, vector) {
        this.vector.Copy(vector);
        if (type == BulletTypes.LAZER) {
            this.drawableCollection.SetCurrentDrawable("bullet");
            this.reach = 70;
            this.attack = 1;
            this.AdjustBoundingbox(-20, -20);
            this.vector.Accelerate(8);
        }
        else if (type == BulletTypes.MISILE) {
            this.reach = 140;
            this.attack = 50;
            this.drawableCollection.SetCurrentDrawable("missile");
            this.vector.Accelerate(4);
        }
        this.reachCounter = 0;
        this.state = ObjectState.ALIVE;
        this.x = ship.x + ship.widthHalf - this.widthHalf;
        this.y = ship.y + ship.heightHalf - this.heightHalf;
    }
    Draw() { this.canvas.DrawObjectRotate(this); }
    Act() {
        super.Act();
        this.reachCounter++;
        this.Draw();
        return this.reachCounter > this.reach;
    }
}
class Ship extends GameObject {
    constructor(leftAction, rightAction, accelerateAction, x, y, thrustSoundNumber, shieldSoundNumber) {
        super(AsteroidSize.BIG, AsteroidSize.BIG, x, y, System.canvas);
        this.rotateSpeed = 2;
        this.accelerationSpeed = 0.1;
        this.shieldAmount = 200;
        this.isShielding = false;
        this.numberOfLives = 3;
        this.numberOfMisiles = 3;
        this.numberOfKills = 0;
        this.useGamePad = false;
        this.respawnCounter = 0;
        this.respawnValue = 100;
        this.drawRotate = true;
        this.hitColor = "#FF6549";
        this.energy = 5;
        this.AdjustBoundingbox(-80, -50);
        this.thrust = new Thrust(this);
        this.thrustSoundNumber = thrustSoundNumber;
        this.shieldSoundNumber = shieldSoundNumber;
        this.drawableCollection = DrawableLibrary.GetShip(() => this.state = ObjectState.DEAD);
        this.rightAction = rightAction;
        this.leftAction = leftAction;
        this.accelerateAction = accelerateAction;
        this.orginalX = x;
        this.orginalY = y;
        this.shieldObject = new Shield();
        this.Spawn();
        this.UpdateScore(0);
    }
    Spawn() {
        this.energy = 5;
        this.respawnCounter = 0;
        this.drawableCollection.SetCurrentDrawable("idle");
        this.state = ObjectState.IMMORTAL;
        this.x = this.orginalX;
        this.y = this.orginalY;
        this.vector.ConstantSpeed(0);
        this.vector.angle = 0;
        this.thrust.Spawn();
    }
    Draw() {
        super.Draw();
        if (this.isShielding || this.state == ObjectState.IMMORTAL) {
            this.shieldObject.ShadowDraw(this.x + this.widthHalf, this.y + this.heightHalf, this.vector.angle);
        }
    }
    Explode() {
        ParticleSystem.Build(this.x + this.widthHalf, this.y + this.heightHalf);
        this.state = ObjectState.EXPLODING;
        this.ShieldOff();
        this.drawableCollection.SetCurrentDrawable("explosion");
        this.numberOfLives--;
        this.vector.Reset();
        AudioLibrary.Play(0);
        AudioLibrary.PauseLoop(this.thrustSoundNumber);
    }
    HitByBullet(attack) {
        super.HitByBullet(attack);
        this.energy--;
    }
    Act() {
        if (this.state == ObjectState.DEAD) {
            if (this.numberOfLives == 0)
                return;
            this.respawnCounter++;
            if (this.respawnCounter > this.respawnValue) {
                this.Spawn();
            }
        }
        super.Act();
        this.thrust.Act();
        if (this.state == ObjectState.IMMORTAL) {
            this.respawnCounter++;
            if (this.respawnCounter > this.respawnValue) {
                this.respawnCounter = 0;
                this.state = ObjectState.ALIVE;
            }
        }
        if (this.isShielding && this.shieldAmount == 0) {
            this.isShielding = false;
            AudioLibrary.PauseLoop(this.shieldSoundNumber);
        }
        else if (this.isShielding && this.shieldAmount >= 0) {
            this.shieldAmount--;
        }
        if (this.state == ObjectState.DEAD) {
            return;
        }
        if (this.state == ObjectState.ALIVE || this.state == ObjectState.IMMORTAL) {
            if (this.useGamePad) {
                if (GamePad.IsKeyDown(this.leftAction)) {
                    this.vector.Rotate(-this.rotateSpeed);
                }
                if (GamePad.IsKeyDown(this.rightAction)) {
                    this.vector.Rotate(this.rotateSpeed);
                }
                if (GamePad.IsKeyDown(this.accelerateAction)) {
                    this.vector.Accelerate(this.accelerationSpeed);
                }
            }
            else {
                if (Keyboard.IsKeyDown(this.leftAction)) {
                    this.vector.Rotate(-this.rotateSpeed);
                }
                if (Keyboard.IsKeyDown(this.rightAction)) {
                    this.vector.Rotate(this.rotateSpeed);
                }
                if (Keyboard.IsKeyDown(this.accelerateAction)) {
                    this.vector.Accelerate(this.accelerationSpeed);
                }
            }
        }
        this.Draw();
    }
    ShieldOn() {
        if (this.state != ObjectState.ALIVE || this.shieldAmount <= 0) {
            return;
        }
        AudioLibrary.Play(this.shieldSoundNumber);
        this.isShielding = true;
    }
    ShieldOff() {
        this.isShielding = false;
        AudioLibrary.PauseLoop(this.shieldSoundNumber);
    }
    SetMoveAnimation() {
        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) {
            return;
        }
        this.thrust.SetThrusting(true);
        AudioLibrary.Play(this.thrustSoundNumber);
    }
    SetIdleAnimation() {
        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) {
            return;
        }
        this.thrust.SetThrusting(false);
        AudioLibrary.PauseLoop(this.thrustSoundNumber);
    }
    GetShield() {
        return this.shieldAmount;
    }
    IsShilding() {
        return this.isShielding;
    }
    ChargeShield() {
        this.shieldAmount = 200;
    }
    UpdateScore(value) {
        this.numberOfKills += value;
        this.score = "0000" + this.numberOfKills;
        this.score = this.score.substr(this.score.length - 4);
    }
}
class Star extends GameObject {
    constructor(width, height, x, y, canvas, speed, ship) {
        super(width, height, x, y, canvas);
        this.shootingStar = false;
        this.steps = 100;
        this.slowDownFactor = 0.95;
        this.vector = new Vector(speed, speed, 0);
        this.speed = speed;
        this.starLight = (speed * 5 + 5) / 10;
        this.blinkCounter = 1000;
        this.blinkSpeed = (0.05 * Math.random()) + 0.03;
        this.ship = ship;
    }
    ShootingStart() {
        this.shootingStar = true;
        this.destX = Math.random() * System.resolutionX;
        this.destY = Math.random() + System.resolutionY;
        this.deltaX = this.destX - this.x;
        this.deltaY = this.destY - this.y;
        this.speedX = this.deltaX / this.steps;
        this.speedY = this.deltaY / this.steps;
        this.stepsTaken = 0;
    }
    Act() {
        super.Act();
        if (this.shootingStar) {
            this.vector.x = this.speedX;
            this.vector.y = this.speedY;
            this.stepsTaken++;
            if (this.stepsTaken >= this.steps) {
                this.shootingStar = false;
                this.vector.x = 0;
                this.vector.y = 0;
                this.x = Math.random() * System.resolutionX;
                this.y = Math.random() * System.resolutionY;
            }
        }
        else {
            if (this.ship.vector.x != 0) {
                this.vector.x = -1 * (this.ship.vector.x / 2) * this.speed;
            }
            else {
                this.vector.x = this.vector.x * this.slowDownFactor;
            }
            if (this.ship.vector.y != 0) {
                this.vector.y = -1 * (this.ship.vector.y / 2) * this.speed;
            }
            else {
                this.vector.y = this.vector.y * this.slowDownFactor;
            }
        }
        this.blinkCounter += this.blinkSpeed;
        if (this.blinkCounter % 100 == 0) {
            this.blinkCounter = 0;
        }
        this.alpha = this.starLight * (Math.abs(Math.sin(this.blinkCounter)) + 0.2);
        this.canvas.DrawStar(this.x, this.y, this.width, this.alpha);
    }
}
class BulletPoolObstacle {
    constructor(ship1, ship2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.maxBullets = 50;
        this.bullets = new Array();
        this.LoadBulletsOfColor();
    }
    LoadBulletsOfColor() {
        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet("green"));
        }
    }
    Spawn(obstacle, vector) {
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(obstacle, BulletTypes.LAZER, vector);
            this.bullets.unshift(this.bullets.pop());
        }
    }
    Act() {
        for (let i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }
            if (this.bullets[i].Act()) {
                this.KillBullet(i);
            }
            if (!this.CheckShipBulletCollision(this.ship1, i)) {
                this.CheckShipBulletCollision(this.ship2, i);
            }
        }
    }
    CheckShipBulletCollision(ship, index) {
        if (ship.Is(ObjectState.ALIVE) && this.bullets[index].CollisionCheck(ship)) {
            if (!ship.IsShilding()) {
                ship.HitByBullet(0);
                if (ship.energy == 0) {
                    ship.Explode();
                }
            }
            this.KillBullet(index);
            return true;
        }
        return false;
    }
    KillBullet(i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
    }
}
class ObstaclePool {
    constructor(ship1, ship2, bulletPool1, bulletPool2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.bulletPool1 = bulletPool1;
        this.bulletPool2 = bulletPool2;
        this.obstacles = new Array(0);
    }
    Act() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].Is(ObjectState.DEAD)) {
                this.obstacles.splice(i, 1);
                i--;
                continue;
            }
            this.obstacles[i].Act();
            if (this.obstacles[i].IsNot(ObjectState.ALIVE)) {
                continue;
            }
            if (this.CollisionCheckObstacleShip(this.ship1, i)) {
                continue;
            }
            else if (this.CollisionCheckObstacleShip(this.ship2, i)) {
                continue;
            }
            this.CollisionCheckObstacleBullet(this.obstacles[i], this.bulletPool1, this.ship1);
            this.CollisionCheckObstacleBullet(this.obstacles[i], this.bulletPool2, this.ship2);
        }
        return this.obstacles.length == 0;
    }
    CollisionCheckObstacleShip(ship, i) {
        if (!this.obstacles[i].CollisionCheck(ship)) {
            return false;
        }
        if (ship.IsShilding()) {
            this.obstacles[i].Explode();
            return true;
        }
        else if (ship.Is(ObjectState.ALIVE)) {
            ship.Explode();
            this.obstacles[i].Explode();
            return true;
        }
        return false;
    }
    CollisionCheckObstacleBullet(obstacle, bulletPool, ship) {
        this.attack = bulletPool.Collide(obstacle);
        if (this.attack > 0) {
            obstacle.HitByBullet(this.attack);
            this.exploding = obstacle.GetEnergy() <= 0;
            if (this.exploding) {
                obstacle.Explode();
                ship.UpdateScore(1);
            }
            if (obstacle.IsType(ObstacleType.ASTEROID) && this.exploding && obstacle.GetSize() != AsteroidSize.SMALLEST) {
                this.size = obstacle.GetSize() == AsteroidSize.SMALL ? AsteroidSize.SMALLER : AsteroidSize.SMALLEST;
                this.amount = obstacle.GetSize() == AsteroidSize.SMALL ? 4 : 10;
                for (let x = 0; x < this.amount; x++) {
                    this.obstacles.push(this.GetAsteroidFromSize(this.size, obstacle.x, obstacle.y));
                }
            }
        }
    }
    GetAsteroidFromSize(size, x, y) {
        let obstacle;
        if (size == AsteroidSize.SMALLER) {
            obstacle = new AsteroidSmall();
        }
        else if (size == AsteroidSize.SMALLEST) {
            obstacle = new AsteroidSmaller();
        }
        obstacle.SetCoordinates(x, y);
        return obstacle;
    }
    SetObstacles(obstacles) {
        this.obstacles = obstacles;
    }
    Nuclear() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].Explode();
        }
    }
}
class PowerUp extends GameObject {
    constructor() {
        super(AsteroidSize.POWERUP, AsteroidSize.POWERUP, 0, 0, System.canvas);
        this.stayAliveFor = 500;
        this.circleSize = AsteroidSize.POWERUP / 2;
        this.count = 0;
        this.radius = 50;
        this.drawableCollection = DrawableLibrary.GetPowerUps();
    }
    Spawn() {
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : -this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : -this.height;
        }
        this.vector.angle = Math.random() * 360;
        this.vector.ConstantSpeed(1);
        this.stayAliveCounter = 0;
        this.isAlive = true;
    }
    Act() {
        super.Act();
        this.count = (this.count + 0.03) % 300;
        this.vector.angle += 5;
        this.stayAliveCounter++;
        this.Draw();
        this.isAlive = this.stayAliveCounter < this.stayAliveFor;
    }
    Draw() {
        this.canvas.DrawCircle(this.x + this.circleSize, this.y + this.circleSize, this.radius * ((5 + Math.abs(Math.sin(this.count))) / 6), this.color, 0.2, 12);
        this.canvas.DrawObjectRotate(this);
    }
    Collide() {
        this.stayAliveCounter = this.stayAliveFor + 1;
        this.isAlive = false;
    }
    GetType() {
        return this.type;
    }
}
class PowerUpMisile extends PowerUp {
    constructor() {
        super();
        this.color = "#FF6868";
        this.type = PowerUpType.MISSILE;
        this.drawableCollection.SetCurrentDrawable("missile");
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpMisile();
        }
        return this.instance;
    }
}
class PowerUpLife extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("life");
        this.type = PowerUpType.LIFE;
        this.color = "#BFFF00";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpLife();
        }
        return this.instance;
    }
}
class PowerUpShield extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("shield");
        this.type = PowerUpType.SHIELD;
        this.color = "#72BBFF";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpShield();
        }
        return this.instance;
    }
}
class PowerUpBlitz extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("blitz");
        this.type = PowerUpType.BLITZ;
        this.color = "#FFD447";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpBlitz();
        }
        return this.instance;
    }
}
class PowerUpEnergy extends PowerUp {
    constructor() {
        super();
        this.drawableCollection.SetCurrentDrawable("energy");
        this.type = PowerUpType.ENERGY;
        this.color = "#FF16E0";
    }
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new PowerUpEnergy();
        }
        return this.instance;
    }
}
class ShipInformationBar {
    constructor() {
        this.misilePicture = Images.GetImage("missile");
        this.shipsmall = Images.GetImage("shipsmall");
        this.sheildSmall = Images.GetImage("shieldsmall");
        this.lifesmall = Images.GetImage("lifesmall");
        this.asteroidsmall = Images.GetImage("asteroidsmall");
        this.barWidth = 65;
        this.barHeight = 5;
        this.xDiff = 32;
        this.xBigDiff = 55;
        this.iconSize = 24;
        this.font = "22px Source Sans Pro Black";
        this.show = false;
        this.yDiff = 12;
        this.max = 90;
        this.energyCounter = 0;
        this.shieldCounter = 0;
        this.fadeFactor = 10;
    }
    Draw(ship) {
        if (this.maxShipShield === undefined) {
            this.maxShipShield = ship.GetShield();
            this.maxShipEnergy = ship.energy;
            this.currentEnergy = ship.energy;
            this.currentShield = ship.GetShield();
        }
        this.DrawScores(ship, 0);
        if (ship.Is(ObjectState.EXPLODING)) {
            this.currentEnergy = ship.energy;
            this.currentShield = ship.GetShield();
            this.energyCounter = 0;
            this.shieldCounter = 0;
        }
        if (this.currentEnergy != ship.energy) {
            this.currentEnergy = ship.energy;
            this.energyCounter = this.max;
        }
        if (this.currentShield != ship.GetShield()) {
            this.currentShield = ship.GetShield();
            this.shieldCounter = this.max;
        }
        if (this.show) {
        }
        else {
            this.DrawLife(ship, 100, 5);
            this.DrawMissile(ship, 100 + this.xBigDiff, 5);
            if (this.energyCounter > 0) {
                this.energyCounter--;
                this.DrawEnergy(ship);
            }
            if (this.shieldCounter > 0) {
                this.shieldCounter--;
                this.DrawShield(ship);
            }
        }
    }
    DrawLife(ship, x, y) {
        System.canvas.DrawImage(this.shipsmall, x, y, this.iconSize, this.iconSize, this.alpha);
        System.canvas.DrawText(x + this.xDiff, y + this.yDiff, ship.numberOfLives.toString(), this.font);
    }
    DrawMissile(ship, x, y) {
        System.canvas.DrawImage(this.misilePicture, x, y, this.iconSize, this.iconSize, this.alpha);
        System.canvas.DrawText(this.xDiff + x, y + this.yDiff, ship.numberOfMisiles.toString(), this.font);
    }
    DrawScores(ship, x) {
        System.canvas.DrawImage(this.asteroidsmall, x, 5, this.iconSize, this.iconSize);
        x += this.xDiff;
        System.canvas.DrawText(x, 5 + 12, ship.score, this.font);
    }
    DrawEnergy(ship) {
        this.height = this.barHeight;
        if (this.energyCounter < this.max / this.fadeFactor) {
            this.height = this.height * this.energyCounter / (this.max / this.fadeFactor);
        }
        this.shipCenterX = ship.x + ship.widthHalf - (this.barWidth / 2);
        this.shipCenterY = ship.y + ship.height;
        System.canvas.DrawRectangle(this.shipCenterX - 4, this.shipCenterY - 4, this.height + 8, this.barWidth + 8, "white");
        System.canvas.DrawRectangle(this.shipCenterX - 2, this.shipCenterY - 2, this.height + 4, this.barWidth + 4, "black");
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.barWidth, "#003300");
        this.perc = (ship.energy / this.maxShipEnergy) * this.barWidth;
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.perc, "#00CC00");
    }
    DrawShield(ship) {
        this.height = this.barHeight;
        if (this.shieldCounter < this.max / this.fadeFactor) {
            this.height = this.height * this.shieldCounter / (this.max / this.fadeFactor);
        }
        this.shipCenterX = ship.x + ship.widthHalf - (this.barWidth / 2);
        this.shipCenterY = ship.y + ship.height + this.height + 12;
        System.canvas.DrawRectangle(this.shipCenterX - 4, this.shipCenterY - 4, this.height + 8, this.barWidth + 8, "white");
        System.canvas.DrawRectangle(this.shipCenterX - 2, this.shipCenterY - 2, this.height + 4, this.barWidth + 4, "black");
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.barWidth, "#2E2F7C");
        this.perc = (ship.GetShield() / this.maxShipShield) * this.barWidth;
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.perc, "#7F7FFF");
    }
}
class SpaceGame {
    constructor() {
        this.gameState = GameState.RUNNING;
        this.spawnPowerUp = 1000;
        this.spawnPowerUpCounter = 0;
        this.particleSystem = new ParticleSystem();
        this.powerUps = new Array();
        this.levelManager = new LevelManager();
        this.player1 = new Ship(UserAction.SHIP1_LEFT, UserAction.SHIP1_RIGHT, UserAction.SHIP1_ACCELERATE, System.resolutionX / 3, System.resolutionY / 2, 2, 12);
        this.poolBullet1 = new BulletPoolShip(this.player1, "red");
        this.player1.useGamePad = true;
        this.player2 = new Ship(UserAction.SHIP2_LEFT2, UserAction.SHIP2_RIGHT2, UserAction.SHIP2_ACCELERATE2, System.resolutionX / 3 * 2, System.resolutionY / 2, 6, 13);
        this.poolBullet2 = new BulletPoolShip(this.player2, "blue");
        this.shipInformationBar = new ShipInformationBar();
        this.poolObstacle = new ObstaclePool(this.player1, this.player2, this.poolBullet1, this.poolBullet2);
        SpaceGame.poolObstacleBullet = new BulletPoolObstacle(this.player1, this.player2);
        this.poolStar = new StarPool(this.player1);
        this.textdrawer = new TextDrawer();
        this.textdrawer.SetText(this.levelManager.PeakAtNextLevel().GetLevelName().toString());
        this.NextLevel();
        AudioLibrary.ToggleMute();
        AudioLibrary.Play(7);
        this.light = new LightSource();
    }
    Act() {
        System.canvas.Clear();
        this.spawnPowerUpCounter++;
        if (this.spawnPowerUpCounter > this.spawnPowerUp) {
            this.spawnPowerUpCounter = 0;
            this.spawnPowerUp = Math.random() * 1000;
            this.SpawnPowerUp();
        }
        if (this.player1.numberOfLives == 0 && this.player2.numberOfLives == 0) {
            this.gameState = GameState.GAMEOVER;
            this.textdrawer.SetText("Game Over");
            AudioLibrary.Play(9);
        }
        this.CheckPowerUpCollision();
        this.poolStar.Act();
        SpaceGame.poolObstacleBullet.Act();
        this.poolBullet1.Act();
        this.poolBullet2.Act();
        this.player1.Act();
        if (this.textdrawer.Act()) {
            this.TextWriterFinished();
        }
        if (this.poolObstacle.Act()) {
            this.nextLevel = this.levelManager.PeakAtNextLevel();
            if (this.gameState == GameState.RUNNING && this.nextLevel != null) {
                this.textdrawer.SetText(this.nextLevel.GetLevelName().toString());
                this.gameState = GameState.LEVELFINISHED;
                AudioLibrary.Play(8);
            }
            else if (this.gameState == GameState.RUNNING) {
                this.textdrawer.SetText("Game Finished");
                this.gameState = GameState.COMPLETED;
                AudioLibrary.Play(10);
            }
        }
        else if (this.gameState == GameState.LEVELFINISHED) {
            this.gameState = GameState.RUNNING;
        }
        this.shipInformationBar.Draw(this.player1);
        ParticleSystem.Draw();
        this.light.Act();
    }
    KeyDown(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.player1.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.player2.SetMoveAnimation();
        }
        else if (action == UserAction.SHIP1_FIRE) {
            this.poolBullet1.SpawnLaser();
        }
        else if (action == UserAction.SHIP2_FIRE2) {
            this.poolBullet2.SpawnLaser();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.player1.ShieldOn();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.player2.ShieldOn();
        }
        else if (action == UserAction.SHIP1_MISILE) {
            this.poolBullet1.SpawnMisile();
        }
        else if (action == UserAction.SHIP2_MISILE2) {
            this.poolBullet2.SpawnMisile();
        }
    }
    KeyUp(action) {
        if (action == UserAction.SHIP1_ACCELERATE) {
            this.player1.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP2_ACCELERATE2) {
            this.player2.SetIdleAnimation();
        }
        else if (action == UserAction.SHIP1_SHIELD) {
            this.player1.ShieldOff();
        }
        else if (action == UserAction.SHIP2_SHIELD) {
            this.player2.ShieldOff();
        }
    }
    TextWriterFinished() {
        if (this.gameState == GameState.LEVELFINISHED) {
            this.NextLevel();
            this.gameState = GameState.RUNNING;
        }
        else if (this.gameState == GameState.GAMEOVER) {
            this.gameState = GameState.NOTSTARTED;
        }
        else if (this.gameState == GameState.COMPLETED) {
            this.gameState = GameState.NOTSTARTED;
        }
    }
    NextLevel() {
        this.nextLevel = this.levelManager.GetNextLevel();
        this.poolObstacle.SetObstacles(this.nextLevel.GetObstacles());
    }
    SpawnPowerUp() {
        this.randomPowerUpType = Math.random();
        if (this.randomPowerUpType < 0.2) {
            this.powerUp = PowerUpMisile.GetInstance();
        }
        else if (this.randomPowerUpType < 0.4) {
            this.powerUp = PowerUpLife.GetInstance();
        }
        else if (this.randomPowerUpType < 0.6) {
            this.powerUp = PowerUpShield.GetInstance();
        }
        else if (this.randomPowerUpType < 0.8) {
            this.powerUp = PowerUpBlitz.GetInstance();
        }
        else if (this.randomPowerUpType <= 1.0) {
            this.powerUp = PowerUpEnergy.GetInstance();
        }
        if (this.powerUp.isAlive) {
            return;
        }
        this.powerUp.Spawn();
        this.powerUps.push(this.powerUp);
    }
    CheckPowerUpCollision() {
        for (let i = 0; i < this.powerUps.length; i++) {
            if (!this.powerUps[i].isAlive) {
                this.powerUps.splice(i, 1);
                i--;
                continue;
            }
            this.powerUps[i].Act();
            if (this.player1.Is(ObjectState.ALIVE) && this.player1.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.player1);
            }
            else if (this.player2.Is(ObjectState.ALIVE) && this.player2.CollisionCheck(this.powerUps[i])) {
                this.PowerUpAction(this.powerUps[i], this.player2);
            }
        }
    }
    PowerUpAction(powerUp, ship) {
        powerUp.Collide();
        AudioLibrary.Play(4);
        switch (powerUp.GetType()) {
            case PowerUpType.LIFE:
                ship.numberOfLives++;
                break;
            case PowerUpType.MISSILE:
                ship.numberOfMisiles += 3;
                break;
            case PowerUpType.SHIELD:
                ship.ChargeShield();
                break;
            case PowerUpType.BLITZ:
                System.canvas.Blitz();
                this.poolObstacle.Nuclear();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }
    }
}
class StarPool {
    constructor(ship) {
        this.count = 0;
        this.shootingStar = 25000;
        this.stars = new Array();
        this.ship = ship;
        this.CreateStars(120);
    }
    CreateStars(number) {
        let x, y, ran, size, speed;
        for (let i = 0; i < number; i++) {
            x = Math.round(Math.random() * System.resolutionX);
            y = Math.round(Math.random() * System.resolutionY);
            ran = Math.random();
            size = ran * 1.3;
            speed = ran;
            if (size < 0.07) {
                size = 0.07;
            }
            this.stars.push(new Star(size, size, x, y, System.canvas, speed, this.ship));
        }
    }
    Act() {
        for (let i = 0; i < this.stars.length; i++) {
            this.count++;
            this.stars[i].Act();
            if (this.count == this.shootingStar) {
                this.stars[i].ShootingStart();
                this.count = 0;
            }
        }
    }
}
