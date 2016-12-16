var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AudioLibrary = (function () {
    function AudioLibrary() {
    }
    AudioLibrary.Initialize = function () {
        AudioLibrary.audioCollection = new Array();
        AudioLibrary.AddAudioFile("explosion.mp3", 0.4, false);
        AudioLibrary.AddAudioFile("laser.mp3", 0.2, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.85, true);
        AudioLibrary.AddAudioFile("missile.mp3", 0.7, false);
        AudioLibrary.AddAudioFile("powerup.mp3", 0.51, false);
        AudioLibrary.AddAudioFile("emptymisile.mp3", 0.3, false);
        AudioLibrary.AddAudioFile("thrust2.mp3", 0.85, true);
        AudioLibrary.AddAudioFile("music.mp3", 0.65, true);
        AudioLibrary.AddAudioFile("levelup.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("gameover.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("win.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("clash.mp3", 0.5, false);
        AudioLibrary.AddAudioFile("shield.mp3", 0.6, true);
        AudioLibrary.AddAudioFile("shield.mp3", 0.6, true);
    };
    AudioLibrary.AddAudioFile = function (fileName, volume, loop) {
        var audio = new Audio('Resources\\Audio\\' + fileName);
        audio.volume = System.Volume * volume;
        audio.innerText = volume.toString();
        audio.loop = loop;
        AudioLibrary.audioCollection.push(audio);
    };
    AudioLibrary.Mute = function () {
        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {
            AudioLibrary.audioCollection[i].volume = 0;
        }
    };
    AudioLibrary.UnMute = function () {
        for (var i = 0; i < AudioLibrary.audioCollection.length; i++) {
            AudioLibrary.audioCollection[i].volume = +AudioLibrary.audioCollection[i].innerText;
        }
    };
    AudioLibrary.ToggleMute = function () {
        AudioLibrary.Muted = !AudioLibrary.Muted;
        if (!AudioLibrary.Muted) {
            AudioLibrary.UnMute();
            AudioLibrary.Play(7);
        }
        else {
            AudioLibrary.Mute();
            AudioLibrary.Stop(7);
        }
    };
    AudioLibrary.Play = function (index) {
        this.audioCollection[index].currentTime = 0;
        this.audioCollection[index].play();
    };
    AudioLibrary.Stop = function (index) {
        this.audioCollection[index].pause();
    };
    AudioLibrary.Muted = false;
    return AudioLibrary;
}());
var Canvas = (function () {
    function Canvas(canvasName) {
        var canvas = document.getElementById(canvasName);
        canvas.height = System.resolutionY;
        canvas.width = System.resolutionX;
        this.context = canvas.getContext("2d");
        this.context.lineWidth = 2;
        //this.DisableSmoothing(this.context);
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Verdana";
        this.context.strokeStyle = 'skyblue';
        this.context.fillStyle = 'lightblue';
    }
    //public DisableSmoothing(context) {
    //    if (context.imageSmoothingEnabled) { context.imageSmoothingEnabled = false; }
    //    else if (context.mozImageSmoothingEnabled) { context.mozImageSmoothingEnabled = false; }
    //    else if (context.msImageSmoothingEnabled) { context.msImageSmoothingEnabled = false; }
    //    else if (context.webkitImageSmoothingEnabled) { context.webkitImageSmoothingEnabled = false; }
    //}
    Canvas.prototype.Clear = function () { this.context.clearRect(0, 0, System.resolutionX, System.resolutionY); };
    Canvas.prototype.DrawObject = function (gameObject) {
        if (System.DebugMode) {
            this.context.strokeRect(gameObject.GetBoundingX(), gameObject.GetBoundingY(), gameObject.boundingBoxWidth, gameObject.boundingBoxHeight);
        }
        if (gameObject.hitCounter > 0) {
            gameObject.hitCounter -= 0.007;
            if (gameObject.hitCounter < 0) {
                gameObject.hitCounter = 0;
            }
            this.width = gameObject.boundingBoxHeight > gameObject.boundingBoxWidth ? gameObject.boundingBoxHeight : gameObject.boundingBoxWidth;
            if (!gameObject.Is(ObjectState.EXPLODING)) {
                this.DrawCircle(gameObject.GetCenterX(), gameObject.GetCenterY(), this.width, gameObject.hitColor, gameObject.hitCounter, this.width * 0.75);
            }
        }
        this.DrawDrawable(gameObject.GetDrawableCollection().GetCurrentDrawable(), gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    };
    Canvas.prototype.DrawObjectRotate = function (gameObject) {
        this.x = gameObject.x + gameObject.widthHalf;
        this.y = gameObject.y + gameObject.heightHalf;
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y);
        this.DrawObject(gameObject);
        this.context.restore();
    };
    Canvas.prototype.DrawObjectRotateAround = function (gameObject) {
        this.x = gameObject.GetCenterX();
        this.y = gameObject.GetCenterY();
        this.context.save();
        this.context.translate(this.x, this.y - gameObject.boundingBoxHeight + 20);
        this.context.rotate((gameObject.vector.angle * Math.PI) / 180);
        this.context.translate(-this.x, -this.y + gameObject.boundingBoxHeight - 20);
        this.DrawObject(gameObject);
        this.context.restore();
    };
    Canvas.prototype.DrawDrawable = function (drawable, x, y, width, height) {
        this.context.drawImage(drawable.GetImage(), drawable.GetOffsetX(), drawable.GetOffSetY(), drawable.GetWidth(), drawable.GetHeight(), x, y, width, height);
    };
    Canvas.prototype.DrawImage = function (image, x, y, w, h, alpha) {
        if (alpha === void 0) { alpha = 1; }
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.drawImage(image, 0, 0, image.width, image.height, x, y, w, h);
        this.context.restore();
    };
    Canvas.prototype.DrawStar = function (x, y, radius, alpha) {
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
    };
    Canvas.prototype.DrawCircle = function (x, y, radius, color, alpha, lineWidth) {
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
    };
    Canvas.prototype.DrawRectangle = function (x, y, h, w, color) {
        if (color === void 0) { color = "lightblue"; }
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
        this.context.restore();
    };
    Canvas.prototype.DrawParticle = function (x, y, r, hue) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = "hsla(" + hue + ",100%,50%,1)";
        this.context.fill();
        this.context.restore();
    };
    Canvas.prototype.DrawLevelText = function (text, fontSize, alpha) {
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.fillStyle = '#916DFF';
        this.context.font = fontSize + "px Impact";
        this.context.fillText(text, System.resolutionX / 2, System.resolutionY / 2);
        this.context.restore();
    };
    Canvas.prototype.DrawText = function (x, y, string, font, alpha) {
        if (alpha === void 0) { alpha = 1; }
        this.context.save();
        this.context.globalAlpha = alpha;
        this.context.font = font;
        this.context.textAlign = "left";
        this.context.fillText(string, x, y);
        this.context.textAlign = "center";
        this.context.restore();
    };
    return Canvas;
}());
var Drawable = (function () {
    function Drawable(name, image, offsetX, offsetY, width, height) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (width === void 0) { width = image.width; }
        if (height === void 0) { height = image.height; }
        this.image = image;
        this.offsetx = offsetX;
        this.offsety = offsetY;
        this.width = width;
        this.height = height;
        this.name = name;
    }
    Drawable.prototype.GetImage = function () { return this.image; };
    Drawable.prototype.GetOffsetX = function () { return this.offsetx; };
    Drawable.prototype.GetOffSetY = function () { return this.offsety; };
    Drawable.prototype.GetWidth = function () { return this.width; };
    Drawable.prototype.GetHeight = function () { return this.height; };
    Drawable.prototype.GetName = function () { return this.name; };
    return Drawable;
}());
var DrawableAnimation = (function (_super) {
    __extends(DrawableAnimation, _super);
    function DrawableAnimation(image, length, offsetX, offsetY, width, height, speed, name, finishedEventHandler) {
        if (finishedEventHandler === void 0) { finishedEventHandler = null; }
        _super.call(this, name, image, offsetX, offsetY, width, height);
        this.numberOfFrames = length;
        this.currentFrame = 0;
        this.animationSpeed = speed;
        this.animationSpeedCounter = speed;
        this.animationFinishedEvent = finishedEventHandler;
    }
    DrawableAnimation.prototype.GetOffsetX = function () {
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
        return _super.prototype.GetOffsetX.call(this) + (this.GetWidth() * this.currentFrame);
    };
    return DrawableAnimation;
}(Drawable));
var DrawableCollection = (function () {
    function DrawableCollection() {
        this.currentDrawable = 0;
        this.drawables = new Array(0);
    }
    DrawableCollection.prototype.AddDrawable = function (drawable) {
        this.drawables.push(drawable);
        this.currentDrawable = this.drawables.length - 1;
    };
    DrawableCollection.prototype.GetCurrentDrawable = function () {
        return this.drawables[this.currentDrawable];
    };
    DrawableCollection.prototype.SetCurrentDrawable = function (name) {
        for (var i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i].GetName() === name) {
                this.currentDrawable = i;
                return;
            }
        }
    };
    return DrawableCollection;
}());
var Level = (function () {
    function Level(levelNumber) {
        this.levelNumber = levelNumber;
        this.obstacles = new Array();
    }
    Level.prototype.GetObstacles = function () {
        return this.obstacles;
    };
    Level.prototype.AddObstacle = function (obstacle) {
        this.obstacles.push(obstacle);
    };
    Level.prototype.GetLevelNumber = function () {
        return this.levelNumber;
    };
    return Level;
}());
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
    UserAction[UserAction["DEBUGMODE"] = 66] = "DEBUGMODE";
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
var GameObject = (function () {
    function GameObject(width, height, x, y, canvas) {
        this.vector = new Vector(0, 0, 0);
        this.drawableCollection = new DrawableCollection();
        this.state = ObjectState.ALIVE;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.heightHalf = this.height / 2;
        this.widthHalf = this.width / 2;
        this.AdjustBoundingbox(0, 0);
    }
    GameObject.prototype.AdjustBoundingbox = function (widthDiff, heightDiff) {
        this.boundingBoxHeight = this.height + heightDiff;
        this.boundingBoxWidth = this.width + widthDiff;
        this.boundingBoxHeightHalf = this.boundingBoxHeight / 2;
        this.boundingBoxWidthHalf = this.boundingBoxWidth / 2;
    };
    GameObject.prototype.GetDrawableCollection = function () { return this.drawableCollection; };
    GameObject.prototype.Act = function () {
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
    };
    GameObject.prototype.Draw = function () {
        this.canvas.DrawObject(this);
    };
    GameObject.prototype.CollisionCheck = function (gameObject) {
        this.Dx = Math.abs(this.GetCenterX() - gameObject.GetCenterX());
        this.Dy = Math.abs(this.GetCenterY() - gameObject.GetCenterY());
        return (this.Dx < (this.boundingBoxWidthHalf + gameObject.boundingBoxWidthHalf) && this.Dy < (this.boundingBoxHeightHalf + gameObject.boundingBoxHeightHalf));
    };
    GameObject.prototype.GetCenterX = function () {
        return this.x + this.widthHalf;
    };
    GameObject.prototype.GetCenterY = function () {
        return this.y + this.heightHalf;
    };
    GameObject.prototype.GetBoundingX = function () {
        return this.x + this.widthHalf - this.boundingBoxWidthHalf;
    };
    GameObject.prototype.GetBoundingY = function () {
        return this.y + this.heightHalf - this.boundingBoxHeightHalf;
    };
    GameObject.prototype.SetState = function (objectState) { this.state = objectState; };
    GameObject.prototype.Is = function (objectState) { return this.state == objectState; };
    GameObject.prototype.IsNot = function (objectState) { return this.state != objectState; };
    GameObject.prototype.Hit = function () {
        this.hitCounter = 0.2;
        AudioLibrary.Play(11);
    };
    return GameObject;
}());
var Vector = (function () {
    function Vector(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    Vector.prototype.Rotate = function (amount) {
        this.angle = (this.angle + amount) % 360;
    };
    Vector.prototype.Accelerate = function (amount) {
        this.radian = this.angle * Math.PI / 180;
        this.y += Math.cos(this.radian) * amount;
        this.x += Math.sin(this.radian) * amount;
    };
    Vector.prototype.ConstantSpeed = function (amount) {
        this.radian = (this.angle * Math.PI) / 180;
        this.y = Math.cos(this.radian) * amount;
        this.x = Math.sin(this.radian) * amount;
    };
    Vector.prototype.Copy = function (vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.angle = vector.angle;
    };
    Vector.prototype.Reset = function () {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    };
    Vector.prototype.SetValues = function (x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    };
    return Vector;
}());
var Jewel = (function (_super) {
    __extends(Jewel, _super);
    function Jewel() {
        _super.call(this, 32, 32, System.resolutionX / 2, System.resolutionY / 2, System.canvas);
        //this.drawableCollection = DrawableLibrary.GetJewel();
        this.drawableCollection.SetCurrentDrawable("jewel");
    }
    Jewel.prototype.Act = function () {
        _super.prototype.Act.call(this);
        //this.Draw();
    };
    return Jewel;
}(GameObject));
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(size, width, height, x, y, canvas, energy) {
        _super.call(this, width, height, x, y, canvas);
        this.hitColor = "green";
        this.size = size;
        this.energy = energy;
        this.vector.x = Math.random() * -6 + 3;
        this.vector.y = Math.random() * -6 + 3;
        this.type = ObstacleType.OTHER;
        this.SetRandomCoordinates();
    }
    Obstacle.prototype.SetRandomCoordinates = function () {
        if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? System.resolutionX : -this.width;
            this.y = Math.random() * System.resolutionY;
        }
        else {
            this.x = Math.random() * System.resolutionX;
            this.y = Math.random() > 0.5 ? System.resolutionY : -this.height;
        }
    };
    Obstacle.prototype.HitByBullet = function (attack) {
        _super.prototype.Hit.call(this);
        this.energy -= attack;
    };
    Obstacle.prototype.GetEnergy = function () {
        return this.energy;
    };
    Obstacle.prototype.Explode = function () {
        ParticleSystem.Build(this.x + this.widthHalf, this.y + this.heightHalf);
        this.state = ObjectState.EXPLODING;
        this.drawableCollection.SetCurrentDrawable("explosion");
        AudioLibrary.Play(0);
    };
    Obstacle.prototype.GetSize = function () {
        return this.size;
    };
    Obstacle.prototype.IsType = function (type) {
        return this.type == type;
    };
    Obstacle.prototype.SetCoordinates = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Obstacle;
}(GameObject));
var MoveStrategy = (function () {
    function MoveStrategy(obstacle, speed) {
        this.changeDirectionCount = 0;
        this.changeDirection = 50;
        this.targetAngle = 0;
        this.targetAngleCount = 0;
        this.obstacle = obstacle;
        this.speed = speed;
        this.obstacle.vector.angle = Math.round(Math.random() * 360);
        this.obstacle.vector.ConstantSpeed(this.speed);
    }
    MoveStrategy.prototype.SetChangeDirection = function (value) {
        this.changeDirection = value;
    };
    MoveStrategy.prototype.Act = function () {
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
    };
    return MoveStrategy;
}());
var ShootStrategy = (function () {
    function ShootStrategy(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    ShootStrategy.prototype.Act = function () {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.obstacle.vector);
            this.shotCount = 0;
        }
    };
    return ShootStrategy;
}());
var ShootThreeSixtyStrategy = (function () {
    function ShootThreeSixtyStrategy(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = shotSpeed;
        this.obstacle = obstacle;
    }
    ShootThreeSixtyStrategy.prototype.Act = function () {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shotSpeed) {
            for (var i = 0; i < 360; i = i + 30) {
                this.vector.SetValues(0, 0, i);
                this.vector.ConstantSpeed(1);
                SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            }
            this.shotCount = 0;
        }
    };
    return ShootThreeSixtyStrategy;
}());
var TwirvlShootStrategy = (function () {
    function TwirvlShootStrategy(obstacle) {
        this.shotCount = 0;
        this.shotSpeed = 0;
        this.angle = 0;
        this.vector = new Vector(0, 0, 0);
        this.shotSpeed = 1;
        this.obstacle = obstacle;
    }
    TwirvlShootStrategy.prototype.Act = function () {
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
    };
    return TwirvlShootStrategy;
}());
var ShootRandomStrategy = (function () {
    function ShootRandomStrategy(shotSpeed, obstacle) {
        this.shotCount = 0;
        this.shot = 0;
        this.vector = new Vector(0, 0, 0);
        this.shot = shotSpeed;
        this.obstacle = obstacle;
    }
    ShootRandomStrategy.prototype.Act = function () {
        this.shotCount++;
        if (this.obstacle.Is(ObjectState.ALIVE) && this.shotCount > this.shot) {
            this.vector.SetValues(0, 0, Math.random() * 360);
            this.vector.ConstantSpeed(1);
            SpaceGame.poolObstacleBullet.Spawn(this.obstacle, this.vector);
            this.shotCount = 0;
        }
    };
    return ShootRandomStrategy;
}());
var Shield = (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        _super.call(this, 156, 156, 0, 0, System.canvas);
        this.drawableCollection = DrawableLibrary.GetShield();
    }
    Shield.prototype.ShadowDraw = function (x, y, angle) {
        this.x = x - this.widthHalf;
        this.y = y - this.heightHalf;
        this.vector.angle = angle;
        this.canvas.DrawObjectRotate(this);
    };
    return Shield;
}(GameObject));
var TextDrawer = (function (_super) {
    __extends(TextDrawer, _super);
    function TextDrawer() {
        _super.call(this, 0, 0, 0, 0, System.canvas);
        this.maxVal = 2;
        this.count = 0;
        this.alpha = 0;
        this.startValue = 75;
        this.fontSize = this.startValue;
    }
    TextDrawer.prototype.SetText = function (value) {
        this.fontSize = this.startValue;
        this.count = 0;
        this.text = value;
    };
    TextDrawer.prototype.Act = function () {
        if (this.count > this.maxVal)
            return false;
        this.alpha = -1 * Math.pow(this.count, 2) + 2 * this.count;
        this.count += 0.03;
        this.fontSize += 3;
        this.canvas.DrawLevelText(this.text, this.fontSize, this.alpha);
        return (this.count > this.maxVal);
    };
    return TextDrawer;
}(GameObject));
var Thrust = (function (_super) {
    __extends(Thrust, _super);
    function Thrust(ship) {
        _super.call(this, ship.width, ship.height, ship.x, ship.y + ship.height - 20, System.canvas);
        this.drawableCollection = DrawableLibrary.GetThrust();
        this.thrusting = false;
        this.ship = ship;
    }
    Thrust.prototype.Spawn = function () {
        this.x = this.ship.x;
        this.y = this.ship.y + this.ship.height - 20;
        this.SetThrusting(false);
    };
    Thrust.prototype.Draw = function () { this.canvas.DrawObjectRotateAround(this); };
    Thrust.prototype.Act = function () {
        this.vector.Copy(this.ship.vector);
        _super.prototype.Act.call(this);
        if (!this.thrusting || this.ship.Is(ObjectState.DEAD) || this.ship.Is(ObjectState.EXPLODING))
            return;
        this.Draw();
    };
    Thrust.prototype.SetThrusting = function (value) {
        this.thrusting = value;
    };
    return Thrust;
}(GameObject));
var LevelManager = (function () {
    function LevelManager() {
        this.levels = new Array();
        this.levels.push(new Level0());
        this.levels.push(new Level1());
        this.levels.push(new Level2());
        this.levels.push(new Level3());
        this.levels.push(new Level4());
        this.levels.push(new Level5());
    }
    LevelManager.prototype.GetNextLevel = function () {
        return this.levels.shift();
    };
    LevelManager.prototype.PeakAtNextLevel = function () {
        return this.levels[0];
    };
    return LevelManager;
}());
var Level0 = (function (_super) {
    __extends(Level0, _super);
    function Level0() {
        _super.call(this, 0);
    }
    return Level0;
}(Level));
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.call(this, 1);
        this.AddObstacle(new AsteroidMedium());
        //this.AddObstacle(new AsteroidSmall());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
        //this.AddObstacle(new AsteroidSmaller());
    }
    return Level1;
}(Level));
var Level2 = (function (_super) {
    __extends(Level2, _super);
    function Level2() {
        _super.call(this, 2);
        this.AddObstacle(new Slicer());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new BugEye());
        this.AddObstacle(new Scythe());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Spikey());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new SaucerBig());
    }
    return Level2;
}(Level));
var Level3 = (function (_super) {
    __extends(Level3, _super);
    function Level3() {
        _super.call(this, 3);
        this.AddObstacle(new SaucerBig());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
    }
    return Level3;
}(Level));
var Level4 = (function (_super) {
    __extends(Level4, _super);
    function Level4() {
        _super.call(this, 4);
        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new AsteroidSmaller());
    }
    return Level4;
}(Level));
var Level5 = (function (_super) {
    __extends(Level5, _super);
    function Level5() {
        _super.call(this, 5);
        this.AddObstacle(new SaucerBig());
        this.AddObstacle(new Saucer());
        this.AddObstacle(new Blades());
        this.AddObstacle(new Fighter());
        this.AddObstacle(new Slicer());
        this.AddObstacle(new Spikey());
        this.AddObstacle(new BugEye());
        this.AddObstacle(new Scythe());
        this.AddObstacle(new AsteroidMedium());
        this.AddObstacle(new AsteroidSmall());
        this.AddObstacle(new AsteroidSmaller());
    }
    return Level5;
}(Level));
var Particle = (function () {
    function Particle(i) {
        this.id = i;
        this.orgHue = rand(50, 0, 1);
        this.active = false;
    }
    Particle.prototype.Build = function (x, y) {
        this.r = rand(7, 2, 1);
        this.x = x;
        this.y = y;
        this.active = true;
        this.hue = this.orgHue;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        this.gravity = 0.01;
        System.canvas.DrawParticle(this.x, this.y, this.r, this.hue);
    };
    Particle.prototype.Draw = function () {
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
    };
    return Particle;
}());
var ParticleSystem = (function () {
    function ParticleSystem() {
        ParticleSystem.init();
    }
    ParticleSystem.init = function () {
        for (var i = 0; i < this.particleNum; i++) {
            this.particles.push(new Particle(i));
        }
    };
    ParticleSystem.Build = function (x, y) {
        this.x = x;
        this.y = y;
    };
    ParticleSystem.Draw = function () {
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
    };
    ParticleSystem.particleNum = 60;
    ParticleSystem.particles = [];
    ParticleSystem.count = 10;
    return ParticleSystem;
}());
//helper functions
function rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1, min = min || 0, gen = min + (max - min) * Math.random();
    return (_int) ? Math.round(gen) : gen;
}
;
var BulletPool = (function () {
    function BulletPool(ship, color) {
        this.ship = ship;
        this.maxBullets = 5;
        this.bullets = new Array();
        this.LoadBulletsOfColor(color);
    }
    BulletPool.prototype.LoadBulletsOfColor = function (color) {
        for (var i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet(color));
        }
    };
    BulletPool.prototype.SpawnMisile = function () {
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
    };
    BulletPool.prototype.SpawnLaser = function () {
        if (this.Spawn(BulletTypes.LAZER)) {
            AudioLibrary.Play(1);
        }
    };
    BulletPool.prototype.Spawn = function (type) {
        if (this.ship.IsNot(ObjectState.ALIVE) && this.ship.IsNot(ObjectState.IMMORTAL)) {
            return false;
        }
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(this.ship, type, this.ship.vector);
            this.bullets.unshift(this.bullets.pop());
            return true;
        }
        return false;
    };
    BulletPool.prototype.Act = function () {
        for (var i = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].Is(ObjectState.DEAD)) {
                return;
            }
            if (this.bullets[i].Act()) {
                this.KillBullet(i);
            }
        }
    };
    BulletPool.prototype.KillBullet = function (i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
        return true;
    };
    BulletPool.prototype.Collide = function (object) {
        for (var i = 0; i < this.maxBullets; i++) {
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
    };
    return BulletPool;
}());
var DrawableLibrary = (function () {
    function DrawableLibrary() {
    }
    DrawableLibrary.GetShip = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        var ship = Images.GetImage("ship");
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(ship, 15, 6272, 0, 128, 128, 7, "idle"));
        return drawableCollection;
    };
    DrawableLibrary.GetShield = function () {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("shield"), 20, 0, 0, 192, 192, 0, "shield", null));
        return drawableCollection;
    };
    DrawableLibrary.GetSaucer = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("saucer"), 16, 0, 0, 128, 128, 6, "saucer"));
        return drawableCollection;
    };
    DrawableLibrary.GetAsteroid = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid"), 16, 0, 0, 64, 64, 3, "asteroid"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid3"), 16, 0, 0, 64, 64, 3, "asteroid3"));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("asteroid4"), 16, 0, 0, 64, 64, 3, "asteroid4"));
        return drawableCollection;
    };
    DrawableLibrary.GetFighter = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("fighter"), 16, 0, 0, 128, 128, 6, "fighter"));
        return drawableCollection;
    };
    DrawableLibrary.GetSlicer = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("slicer"), 16, 0, 0, 128, 128, 6, "slicer"));
        return drawableCollection;
    };
    DrawableLibrary.GetBlades = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("blades"), 16, 0, 0, 128, 128, 6, "blades"));
        return drawableCollection;
    };
    DrawableLibrary.GetLazer = function (color) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0, 32, 32));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bullet" + color), 16, 0, 0, 32, 64, 1, "bullet"));
        return drawableCollection;
    };
    DrawableLibrary.GetPowerUps = function () {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new Drawable("missile", Images.GetImage("missile"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("life", Images.GetImage("shipsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("shield", Images.GetImage("shieldsmall"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("blitz", Images.GetImage("blitz"), 0, 0));
        drawableCollection.AddDrawable(new Drawable("energy", Images.GetImage("lifesmall"), 0, 0));
        return drawableCollection;
    };
    DrawableLibrary.GetThrust = function () {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("thrust"), 24, 0, 0, 128, 128, 1, "thrust"));
        return drawableCollection;
    };
    DrawableLibrary.GetSpikey = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("spikey"), 16, 0, 0, 128, 128, 6, "spikey"));
        return drawableCollection;
    };
    DrawableLibrary.GetBugEye = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("bugeye"), 16, 0, 0, 128, 128, 6, "bugeye"));
        return drawableCollection;
    };
    DrawableLibrary.GetScythe = function (explotionFinishedEventHandler) {
        var drawableCollection = new DrawableCollection();
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("explosion"), 34, 0, 0, 128, 128, 2, "explosion", explotionFinishedEventHandler));
        drawableCollection.AddDrawable(new DrawableAnimation(Images.GetImage("scythe"), 16, 0, 0, 128, 128, 6, "scythe"));
        return drawableCollection;
    };
    return DrawableLibrary;
}());
var Images = (function () {
    function Images(callback) {
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
        // power ups
        this.AddImage("shipsmall.png", "shipsmall");
        this.AddImage("shieldsmall.png", "shieldsmall");
        this.AddImage("asteroidsmall.png", "asteroidsmall");
        this.AddImage("blitz.png", "blitz");
        this.AddImage("lifesmall.png", "lifesmall");
        // obstacles
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
    Images.prototype.AddImage = function (file, name) {
        var _this = this;
        var image = new Image();
        image.id = name;
        image.onload = function () {
            _this.imagesLoaded++;
            if (_this.imagesLoaded == Images.images.length) {
                _this.callback();
            }
        };
        image.src = "Resources/Images/" + file;
        Images.images.push(image);
    };
    Images.GetImage = function (name) {
        for (var i = 0; i < Images.images.length; i++) {
            if (Images.images[i].id == name) {
                return Images.images[i];
            }
        }
        alert("Image: " + name + " not found");
    };
    return Images;
}());
var System = (function () {
    function System() {
    }
    System.Initialize = function () {
        System.canvas = new Canvas("mainCanvas");
        System.backgroundCanvas = new Canvas("backgroundCanvas");
        System.backgroundCanvas.DrawDrawable(new Drawable("background", Images.GetImage("background")), 0, 0, System.resolutionX, System.resolutionY);
    };
    System.resolutionX = 1920;
    System.resolutionY = 1080;
    System.DebugMode = false;
    System.Volume = 0.5;
    return System;
}());
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.Setup = function (game) {
        var _this = this;
        this.spaceGame = game;
        this.keys = new Array();
        document.addEventListener("keydown", function (e) { return _this.KeyDown(e.keyCode); }, false);
        document.addEventListener("keyup", function (e) { return _this.KeyUp(e.keyCode); }, false);
    };
    Keyboard.KeyDown = function (action) {
        if (action == UserAction.DEBUGMODE) {
            System.DebugMode = !System.DebugMode;
            document.getElementById("fpsLabel").style.visibility = System.DebugMode ? "visible" : "hidden";
        }
        else if (action == UserAction.MUTEAUDIO) {
            AudioLibrary.ToggleMute();
        }
        else if (this.keys[action] == true) {
            return;
        }
        this.keys[action] = true;
        this.spaceGame.KeyDown(action);
    };
    Keyboard.KeyUp = function (action) {
        this.keys[action] = false;
        this.spaceGame.KeyUp(action);
    };
    Keyboard.IsKeyDown = function (action) {
        return this.keys[action];
    };
    return Keyboard;
}());
var GamePad = (function () {
    function GamePad() {
    }
    GamePad.Setup = function (game) {
        this.spaceGame = game;
        this.keys = new Array();
    };
    GamePad.Act = function () {
        //if ("getGamepads" in navigator) {
        var gp = navigator.getGamepads()[0];
        for (var i = 0; i < gp.buttons.length; i++) {
            if (gp.buttons[i].pressed) {
                if (!this.keys[i]) {
                    this.keys[i] = true;
                    this.spaceGame.KeyDown(this.Mapping(i));
                }
            }
            else {
                if (this.keys[i]) {
                    this.keys[i] = false;
                    this.spaceGame.KeyUp(this.Mapping(i));
                }
            }
        }
        //}
    };
    GamePad.Mapping = function (i) {
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
            default: return null;
        }
    };
    GamePad.UnMapping = function (ua) {
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
            default: return -1;
        }
    };
    GamePad.IsKeyDown = function (action) {
        return this.keys[this.UnMapping(action)];
    };
    return GamePad;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(size, energy) {
        var _this = this;
        _super.call(this, size, size, size, 0, 0, System.canvas, energy);
        this.type = ObstacleType.ASTEROID;
        this.drawableCollection = DrawableLibrary.GetAsteroid(function () { return _this.state = ObjectState.DEAD; });
    }
    Asteroid.prototype.HitByBullet = function () {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.Explode();
            return true;
        }
        return false;
    };
    Asteroid.prototype.Act = function () {
        _super.prototype.Act.call(this);
        _super.prototype.Draw.call(this);
    };
    return Asteroid;
}(Obstacle));
var AsteroidMedium = (function (_super) {
    __extends(AsteroidMedium, _super);
    function AsteroidMedium() {
        _super.call(this, AsteroidSize.SMALL, 1);
        this.drawableCollection.SetCurrentDrawable("asteroid");
        this.AdjustBoundingbox(-20, -20);
    }
    return AsteroidMedium;
}(Asteroid));
var AsteroidSmall = (function (_super) {
    __extends(AsteroidSmall, _super);
    function AsteroidSmall() {
        _super.call(this, AsteroidSize.SMALLER, 1);
        this.AdjustBoundingbox(-30, -30);
        this.drawableCollection.SetCurrentDrawable("asteroid3");
    }
    return AsteroidSmall;
}(Asteroid));
var AsteroidSmaller = (function (_super) {
    __extends(AsteroidSmaller, _super);
    function AsteroidSmaller() {
        _super.call(this, AsteroidSize.SMALLEST, 1);
        this.AdjustBoundingbox(-25, -25);
        this.drawableCollection.SetCurrentDrawable("asteroid4");
    }
    return AsteroidSmaller;
}(Asteroid));
var Blades = (function (_super) {
    __extends(Blades, _super);
    function Blades() {
        var _this = this;
        _super.call(this, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 10);
        this.shooterStrategy = new ShootThreeSixtyStrategy(150, this);
        this.AdjustBoundingbox(-50, -50);
        this.drawableCollection = DrawableLibrary.GetBlades(function () { return _this.state = ObjectState.DEAD; });
    }
    Blades.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shooterStrategy.Act();
        _super.prototype.Draw.call(this);
    };
    return Blades;
}(Obstacle));
var Spikey = (function (_super) {
    __extends(Spikey, _super);
    function Spikey() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 15);
        this.drawableCollection = DrawableLibrary.GetSpikey(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-80, -80);
    }
    Spikey.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
    };
    Spikey.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.moveStrategy.Act();
        this.Draw();
    };
    return Spikey;
}(Obstacle));
var BugEye = (function (_super) {
    __extends(BugEye, _super);
    function BugEye() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetBugEye(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-90, -55);
    }
    BugEye.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
    };
    BugEye.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.moveStrategy.Act();
        this.Draw();
    };
    return BugEye;
}(Obstacle));
var SaucerBig = (function (_super) {
    __extends(SaucerBig, _super);
    function SaucerBig() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 5);
        this.shooterStrategy = new TwirvlShootStrategy(this);
        this.drawableCollection = DrawableLibrary.GetSaucer(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-60, -60);
    }
    SaucerBig.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shooterStrategy.Act();
        _super.prototype.Draw.call(this);
    };
    return SaucerBig;
}(Obstacle));
var Saucer = (function (_super) {
    __extends(Saucer, _super);
    function Saucer() {
        var _this = this;
        _super.call(this, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, AsteroidSize.MEDIUM, 0, 0, System.canvas, 5);
        this.shooterStrategy = new ShootRandomStrategy(80, this);
        this.drawableCollection = DrawableLibrary.GetSaucer(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-45, -45);
    }
    Saucer.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shooterStrategy.Act();
        _super.prototype.Draw.call(this);
    };
    return Saucer;
}(Obstacle));
var Fighter = (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 15);
        this.shootingStrategy = new ShootStrategy(100, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.moveStrategy.SetChangeDirection(Math.random() * 200 + 100);
        this.drawableCollection = DrawableLibrary.GetFighter(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-50, -60);
    }
    Fighter.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
    };
    Fighter.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    };
    return Fighter;
}(Obstacle));
var Scythe = (function (_super) {
    __extends(Scythe, _super);
    function Scythe() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.shootingStrategy = new ShootStrategy(20, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetScythe(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-60, -70);
    }
    Scythe.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
    };
    Scythe.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    };
    return Scythe;
}(Obstacle));
var Slicer = (function (_super) {
    __extends(Slicer, _super);
    function Slicer() {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
        this.shootingStrategy = new ShootStrategy(20, this);
        this.moveStrategy = new MoveStrategy(this, 1);
        this.drawableCollection = DrawableLibrary.GetSlicer(function () { return _this.state = ObjectState.DEAD; });
        this.AdjustBoundingbox(-90, -40);
    }
    Slicer.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
    };
    Slicer.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.shootingStrategy.Act();
        this.moveStrategy.Act();
        this.Draw();
    };
    return Slicer;
}(Obstacle));
//class Slicer extends Obstacle {
//    private shootingStrategy: ShootStrategy;
//    private moveStrategy: MoveStrategy;
//    private getJewelStrategy: GetJewelStrategy;
//    constructor() {
//        super(AsteroidSize.BIG, AsteroidSize.BIG, AsteroidSize.BIG, 0, 0, System.canvas, 30);
//        this.shootingStrategy = new ShootStrategy(20, this);
//        this.moveStrategy = new MoveStrategy(this, 1);
//        this.drawableCollection = DrawableLibrary.GetSlicer(() => this.state = ObjectState.DEAD);
//        this.AdjustBoundingbox(-130, -80);
//        this.getJewelStrategy = new GetJewelStrategy(this);
//        this.vector.angle = 100;
//        this.x = System.resolutionX / 2 + 400;
//        this.y = System.resolutionY / 2 - 400;
//    }
//    public Draw() {
//        this.canvas.DrawObjectRotate(this);
//    }
//    private setDirection: boolean = false;
//    public Act() {
//        if (!this.setDirection) {
//            this.getJewelStrategy.SetDirection(this.x, this.y);
//            this.setDirection = true;
//        }
//        this.getJewelStrategy.Act();
//        //super.Act();
//        //this.shootingStrategy.Act();
//        //this.moveStrategy.Act();
//        this.Draw();
//    }
//} 
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(color) {
        _super.call(this, 32, 64, 0, 0, System.canvas);
        this.reach = 70;
        this.reachCounter = 0;
        this.attack = 0;
        this.state = ObjectState.DEAD;
        this.drawableCollection = DrawableLibrary.GetLazer(color);
    }
    Bullet.prototype.Spawn = function (ship, type, vector) {
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
    };
    Bullet.prototype.Draw = function () { this.canvas.DrawObjectRotate(this); };
    Bullet.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.reachCounter++;
        this.Draw();
        return this.reachCounter > this.reach;
    };
    return Bullet;
}(GameObject));
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(leftAction, rightAction, accelerateAction, x, y, thrustSoundNumber, shieldSoundNumber) {
        var _this = this;
        _super.call(this, AsteroidSize.BIG, AsteroidSize.BIG, x, y, System.canvas);
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
        this.hitColor = "#FF6549";
        this.energy = 5;
        this.AdjustBoundingbox(-80, -50);
        this.thrust = new Thrust(this);
        this.thrustSoundNumber = thrustSoundNumber;
        this.shieldSoundNumber = shieldSoundNumber;
        this.drawableCollection = DrawableLibrary.GetShip(function () { return _this.state = ObjectState.DEAD; });
        this.rightAction = rightAction;
        this.leftAction = leftAction;
        this.accelerateAction = accelerateAction;
        this.orginalX = x;
        this.orginalY = y;
        this.shieldObject = new Shield();
        this.Spawn();
        this.UpdateScore(0);
    }
    Ship.prototype.Spawn = function () {
        this.energy = 5;
        this.respawnCounter = 0;
        this.drawableCollection.SetCurrentDrawable("idle");
        this.state = ObjectState.IMMORTAL;
        this.x = this.orginalX;
        this.y = this.orginalY;
        this.vector.ConstantSpeed(0);
        this.vector.angle = 0;
        this.thrust.Spawn();
    };
    Ship.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
        if (this.isShielding || this.state == ObjectState.IMMORTAL) {
            this.shieldObject.ShadowDraw(this.x + this.widthHalf, this.y + this.heightHalf, this.vector.angle);
        }
    };
    Ship.prototype.Explode = function () {
        ParticleSystem.Build(this.x + this.widthHalf, this.y + this.heightHalf);
        this.state = ObjectState.EXPLODING;
        this.ShieldOff();
        this.drawableCollection.SetCurrentDrawable("explosion");
        this.numberOfLives--;
        this.vector.Reset();
        AudioLibrary.Play(0);
        AudioLibrary.Stop(this.thrustSoundNumber);
    };
    Ship.prototype.HitByBullet = function () {
        _super.prototype.Hit.call(this);
        this.energy--;
    };
    Ship.prototype.Act = function () {
        if (this.state == ObjectState.DEAD) {
            if (this.numberOfLives == 0)
                return;
            this.respawnCounter++;
            if (this.respawnCounter > this.respawnValue) {
                this.Spawn();
            }
        }
        _super.prototype.Act.call(this);
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
            AudioLibrary.Stop(this.shieldSoundNumber);
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
    };
    Ship.prototype.ShieldOn = function () {
        if (this.state != ObjectState.ALIVE || this.shieldAmount <= 0) {
            return;
        }
        AudioLibrary.Play(this.shieldSoundNumber);
        this.isShielding = true;
    };
    Ship.prototype.ShieldOff = function () {
        this.isShielding = false;
        AudioLibrary.Stop(this.shieldSoundNumber);
    };
    Ship.prototype.SetMoveAnimation = function () {
        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) {
            return;
        }
        this.thrust.SetThrusting(true);
        AudioLibrary.Play(this.thrustSoundNumber);
    };
    Ship.prototype.SetIdleAnimation = function () {
        if (this.IsNot(ObjectState.ALIVE) && this.IsNot(ObjectState.IMMORTAL)) {
            return;
        }
        this.thrust.SetThrusting(false);
        AudioLibrary.Stop(this.thrustSoundNumber);
    };
    Ship.prototype.GetShield = function () {
        return this.shieldAmount;
    };
    Ship.prototype.IsShilding = function () {
        return this.isShielding;
    };
    Ship.prototype.ChargeShield = function () {
        this.shieldAmount = 200;
    };
    Ship.prototype.UpdateScore = function (value) {
        this.numberOfKills += value;
        this.score = "0000" + this.numberOfKills;
        this.score = this.score.substr(this.score.length - 4);
    };
    return Ship;
}(GameObject));
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(width, height, x, y, canvas, speed, ship) {
        _super.call(this, width, height, x, y, canvas);
        this.shootingStar = false;
        this.steps = 100;
        this.slowDownFactor = 0.95;
        this.vector = new Vector(speed, speed, 0);
        this.speed = speed;
        this.blink = false;
        this.starLight = (speed * 5 + 5) / 10;
        this.starFaded = (speed * 2 + 2) / 10;
        this.blinkSpeed = Math.round(Math.random() * 30 + 25);
        this.blinkCounter = 0;
        this.ship = ship;
    }
    Star.prototype.ShootingStart = function () {
        this.shootingStar = true;
        this.destX = Math.random() * System.resolutionX;
        this.destY = Math.random() + System.resolutionY;
        this.deltaX = this.destX - this.x;
        this.deltaY = this.destY - this.y;
        this.speedX = this.deltaX / this.steps;
        this.speedY = this.deltaY / this.steps;
        this.stepsTaken = 0;
    };
    Star.prototype.Act = function () {
        _super.prototype.Act.call(this);
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
        this.blinkCounter++;
        if (this.blinkCounter > this.blinkSpeed) {
            this.blink = !this.blink;
            this.blinkCounter = 0;
        }
        this.alpha = this.blink ? this.starFaded : this.starLight;
        this.canvas.DrawStar(this.x, this.y, this.width, this.alpha);
    };
    return Star;
}(GameObject));
var ObstacleBulletPool = (function () {
    function ObstacleBulletPool(ship1, ship2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.maxBullets = 50;
        this.bullets = new Array();
        this.LoadBulletsOfColor();
    }
    ObstacleBulletPool.prototype.LoadBulletsOfColor = function () {
        for (var i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet("green"));
        }
    };
    ObstacleBulletPool.prototype.Spawn = function (obstacle, vector) {
        if (this.bullets[this.maxBullets - 1].Is(ObjectState.DEAD)) {
            this.bullets[this.maxBullets - 1].Spawn(obstacle, BulletTypes.LAZER, vector);
            this.bullets.unshift(this.bullets.pop());
        }
    };
    ObstacleBulletPool.prototype.Act = function () {
        for (var i = 0; i < this.maxBullets; i++) {
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
    };
    ObstacleBulletPool.prototype.CheckShipBulletCollision = function (ship, index) {
        if (ship.Is(ObjectState.ALIVE) && this.bullets[index].CollisionCheck(ship)) {
            if (!ship.IsShilding()) {
                ship.HitByBullet();
                if (ship.energy == 0) {
                    ship.Explode();
                }
            }
            this.KillBullet(index);
            return true;
        }
        return false;
    };
    ObstacleBulletPool.prototype.KillBullet = function (i) {
        this.bullets[i].SetState(ObjectState.DEAD);
        this.bullets.push(this.bullets.splice(i, 1)[0]);
    };
    return ObstacleBulletPool;
}());
var ObstaclePool = (function () {
    function ObstaclePool(ship1, ship2, bulletPool1, bulletPool2) {
        this.ship1 = ship1;
        this.ship2 = ship2;
        this.bulletPool1 = bulletPool1;
        this.bulletPool2 = bulletPool2;
        this.obstacles = new Array(0);
    }
    ObstaclePool.prototype.Act = function () {
        for (var i = 0; i < this.obstacles.length; i++) {
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
    };
    ObstaclePool.prototype.CollisionCheckObstacleShip = function (ship, i) {
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
    };
    ObstaclePool.prototype.CollisionCheckObstacleBullet = function (obstacle, bulletPool, ship) {
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
                for (var x = 0; x < this.amount; x++) {
                    this.obstacles.push(this.GetAsteroidFromSize(this.size, obstacle.x, obstacle.y));
                }
            }
        }
    };
    ObstaclePool.prototype.GetAsteroidFromSize = function (size, x, y) {
        var obstacle;
        if (size == AsteroidSize.SMALLER) {
            obstacle = new AsteroidSmall();
        }
        else if (size == AsteroidSize.SMALLEST) {
            obstacle = new AsteroidSmaller();
        }
        obstacle.SetCoordinates(x, y);
        return obstacle;
    };
    ObstaclePool.prototype.SetObstacles = function (obstacles) {
        this.obstacles = obstacles;
    };
    ObstaclePool.prototype.Nuclear = function () {
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].Explode();
        }
    };
    return ObstaclePool;
}());
var PowerUp = (function (_super) {
    __extends(PowerUp, _super);
    function PowerUp() {
        _super.call(this, AsteroidSize.POWERUP, AsteroidSize.POWERUP, 0, 0, System.canvas);
        this.stayAliveFor = 500;
        this.circleSize = AsteroidSize.POWERUP / 2;
        this.drawableCollection = DrawableLibrary.GetPowerUps();
    }
    PowerUp.prototype.Spawn = function () {
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
    };
    PowerUp.prototype.Act = function () {
        _super.prototype.Act.call(this);
        this.vector.angle += 5;
        this.stayAliveCounter++;
        this.Draw();
        this.isAlive = this.stayAliveCounter < this.stayAliveFor;
    };
    PowerUp.prototype.Draw = function () {
        this.canvas.DrawObjectRotate(this);
        this.canvas.DrawCircle(this.x + this.circleSize, this.y + this.circleSize, 60, this.color, 0.2, 12);
    };
    PowerUp.prototype.Collide = function () {
        this.stayAliveCounter = this.stayAliveFor + 1;
        this.isAlive = false;
    };
    PowerUp.prototype.GetType = function () {
        return this.type;
    };
    return PowerUp;
}(GameObject));
var PowerUpMisile = (function (_super) {
    __extends(PowerUpMisile, _super);
    function PowerUpMisile() {
        _super.call(this);
        this.color = "#FF6868";
        this.type = PowerUpType.MISSILE;
        this.drawableCollection.SetCurrentDrawable("missile");
    }
    PowerUpMisile.GetInstance = function () {
        if (this.instance == null) {
            this.instance = new PowerUpMisile();
        }
        return this.instance;
    };
    return PowerUpMisile;
}(PowerUp));
var PowerUpLife = (function (_super) {
    __extends(PowerUpLife, _super);
    function PowerUpLife() {
        _super.call(this);
        this.drawableCollection.SetCurrentDrawable("life");
        this.type = PowerUpType.LIFE;
        this.color = "#BFFF00";
    }
    PowerUpLife.GetInstance = function () {
        if (this.instance == null) {
            this.instance = new PowerUpLife();
        }
        return this.instance;
    };
    return PowerUpLife;
}(PowerUp));
var PowerUpShield = (function (_super) {
    __extends(PowerUpShield, _super);
    function PowerUpShield() {
        _super.call(this);
        this.drawableCollection.SetCurrentDrawable("shield");
        this.type = PowerUpType.SHIELD;
        this.color = "#72BBFF";
    }
    PowerUpShield.GetInstance = function () {
        if (this.instance == null) {
            this.instance = new PowerUpShield();
        }
        return this.instance;
    };
    return PowerUpShield;
}(PowerUp));
var PowerUpBlitz = (function (_super) {
    __extends(PowerUpBlitz, _super);
    function PowerUpBlitz() {
        _super.call(this);
        this.drawableCollection.SetCurrentDrawable("blitz");
        this.type = PowerUpType.BLITZ;
        this.color = "#FFD447";
    }
    PowerUpBlitz.GetInstance = function () {
        if (this.instance == null) {
            this.instance = new PowerUpBlitz();
        }
        return this.instance;
    };
    return PowerUpBlitz;
}(PowerUp));
var PowerUpEnergy = (function (_super) {
    __extends(PowerUpEnergy, _super);
    function PowerUpEnergy() {
        _super.call(this);
        this.drawableCollection.SetCurrentDrawable("energy");
        this.type = PowerUpType.ENERGY;
        this.color = "#FF16E0";
    }
    PowerUpEnergy.GetInstance = function () {
        if (this.instance == null) {
            this.instance = new PowerUpEnergy();
        }
        return this.instance;
    };
    return PowerUpEnergy;
}(PowerUp));
var ShipInformationBar = (function () {
    function ShipInformationBar() {
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
        this.font = "24px Impact";
        this.show = false;
        this.yDiff = 12;
        this.max = 90;
        this.energyCounter = 0;
        this.shieldCounter = 0;
        this.fadeFactor = 10;
    }
    // todo ship x og y kan sætte i draw 1 gange
    ShipInformationBar.prototype.Draw = function (ship) {
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
        //if (this.currentShield != ship.GetShield()) {
        //    this.currentShield = ship.GetShield();
        //    this.shieldCounter = this.max;
        //}
        if (this.show) {
        }
        else {
            //this.energyCounter = this.max;
            //this.DrawEnergy(ship);
            this.DrawLife(ship, 100, 5);
            this.DrawMissile(ship, 100 + this.xBigDiff, 5);
            if (this.energyCounter > 0) {
                this.energyCounter--;
                this.DrawEnergy(ship);
            }
            if (this.currentShield != ship.GetShield()) {
                this.currentShield = ship.GetShield();
                this.DrawShield(ship);
            }
        }
    };
    ShipInformationBar.prototype.DrawLife = function (ship, x, y) {
        System.canvas.DrawImage(this.shipsmall, x, y, this.iconSize, this.iconSize, this.alpha);
        System.canvas.DrawText(x + this.xDiff, y + this.yDiff, ship.numberOfLives.toString(), this.font);
    };
    ShipInformationBar.prototype.DrawMissile = function (ship, x, y) {
        System.canvas.DrawImage(this.misilePicture, x, y, this.iconSize, this.iconSize, this.alpha);
        System.canvas.DrawText(this.xDiff + x, y + this.yDiff, ship.numberOfMisiles.toString(), this.font);
    };
    ShipInformationBar.prototype.DrawScores = function (ship, x) {
        System.canvas.DrawImage(this.asteroidsmall, x, 5, this.iconSize, this.iconSize);
        x += this.xDiff;
        System.canvas.DrawText(x, 5 + 12, ship.score, this.font);
    };
    ShipInformationBar.prototype.DrawEnergy = function (ship) {
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
    };
    ShipInformationBar.prototype.DrawShield = function (ship) {
        this.height = this.barHeight;
        //if (this.shieldCounter < this.max / this.fadeFactor) {
        //    this.height = this.height * this.shieldCounter / (this.max / this.fadeFactor);
        //}
        this.shipCenterX = ship.x + ship.widthHalf - (this.barWidth / 2);
        this.shipCenterY = ship.y + ship.height + this.height + 12;
        System.canvas.DrawRectangle(this.shipCenterX - 4, this.shipCenterY - 4, this.height + 8, this.barWidth + 8, "white");
        System.canvas.DrawRectangle(this.shipCenterX - 2, this.shipCenterY - 2, this.height + 4, this.barWidth + 4, "black");
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.barWidth, "#2E2F7C");
        this.perc = (ship.GetShield() / this.maxShipShield) * this.barWidth;
        System.canvas.DrawRectangle(this.shipCenterX, this.shipCenterY, this.height, this.perc, "#7F7FFF");
    };
    return ShipInformationBar;
}());
var SpaceGame = (function () {
    function SpaceGame() {
        this.gameState = GameState.RUNNING;
        this.spawnPowerUp = 1000;
        this.spawnPowerUpCounter = 0;
        this.particleSystem = new ParticleSystem();
        this.powerUps = new Array();
        this.levelManager = new LevelManager();
        this.player1 = new Ship(UserAction.SHIP1_LEFT, UserAction.SHIP1_RIGHT, UserAction.SHIP1_ACCELERATE, System.resolutionX / 3, System.resolutionY / 2, 2, 12);
        this.poolBullet1 = new BulletPool(this.player1, "red");
        // this.player1.useGamePad = true;
        this.player2 = new Ship(UserAction.SHIP2_LEFT2, UserAction.SHIP2_RIGHT2, UserAction.SHIP2_ACCELERATE2, System.resolutionX / 3 * 2, System.resolutionY / 2, 6, 13);
        this.poolBullet2 = new BulletPool(this.player2, "blue");
        this.shipInformationBar = new ShipInformationBar();
        this.poolObstacle = new ObstaclePool(this.player1, this.player2, this.poolBullet1, this.poolBullet2);
        SpaceGame.poolObstacleBullet = new ObstacleBulletPool(this.player1, this.player2);
        this.poolStar = new StarPool(this.player1);
        this.textdrawer = new TextDrawer();
        this.textdrawer.SetText(this.levelManager.PeakAtNextLevel().GetLevelNumber().toString());
        this.NextLevel();
        AudioLibrary.ToggleMute();
        AudioLibrary.Play(7);
    }
    SpaceGame.prototype.Act = function () {
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
        //if (Math.random() < 0.0001) {
        //    this.poolObstacle.AddObstacle(new Spikey());
        //}
        this.CheckPowerUpCollision();
        this.poolStar.Act();
        SpaceGame.poolObstacleBullet.Act();
        this.poolBullet1.Act();
        this.poolBullet2.Act();
        this.player1.Act();
        //this.ship2.Act();
        if (this.textdrawer.Act()) {
            this.TextWriterFinished();
        }
        if (this.poolObstacle.Act()) {
            this.nextLevel = this.levelManager.PeakAtNextLevel();
            if (this.gameState == GameState.RUNNING && this.nextLevel != null) {
                this.textdrawer.SetText("Level " + this.nextLevel.GetLevelNumber().toString());
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
    };
    SpaceGame.prototype.KeyDown = function (action) {
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
    };
    SpaceGame.prototype.KeyUp = function (action) {
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
    };
    SpaceGame.prototype.TextWriterFinished = function () {
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
    };
    SpaceGame.prototype.NextLevel = function () {
        this.nextLevel = this.levelManager.GetNextLevel();
        this.poolObstacle.SetObstacles(this.nextLevel.GetObstacles());
    };
    SpaceGame.prototype.SpawnPowerUp = function () {
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
    };
    SpaceGame.prototype.CheckPowerUpCollision = function () {
        for (var i = 0; i < this.powerUps.length; i++) {
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
    };
    SpaceGame.prototype.PowerUpAction = function (powerUp, ship) {
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
                this.poolObstacle.Nuclear();
                break;
            case PowerUpType.ENERGY:
                ship.energy = 5;
                break;
        }
    };
    return SpaceGame;
}());
var StarPool = (function () {
    function StarPool(ship) {
        this.count = 0;
        this.shootingStar = 25000;
        this.stars = new Array();
        this.ship = ship;
        this.CreateStars(120);
    }
    StarPool.prototype.CreateStars = function (number) {
        var x, y, ran, size, speed;
        for (var i = 0; i < number; i++) {
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
    };
    StarPool.prototype.Act = function () {
        for (var i = 0; i < this.stars.length; i++) {
            this.count++;
            this.stars[i].Act();
            if (this.count == this.shootingStar) {
                this.stars[i].ShootingStart();
                this.count = 0;
            }
        }
    };
    return StarPool;
}());
//# sourceMappingURL=SpaceGame.js.map