class Particle {
    constructor(_x = 0, _y = 0, _w = 10, _h = 10) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.r = 10;
        this.velocity = {
            x: 9,
            y: 9
        };
    }

    getWidth() {
        return this.w;
    }

    getHeight() {
        return this.h;
    }

    getCentreX() {
        return this.x + (this.getWidth() * 0.5);
    }

    getCentreY() {
        return this.y + (this.h * 0.5);
    }

    getRight() {
        return this.x + this.w;
    }

    getLeft() {
        return this.x;
    }

    getTop() {
        return this.y;
    }

    getBottom() {
        return this.y + this.h;
    }

    getDistX(_obj) {
        return Math.abs(this.x - _obj.x);
    }

    getDistY(_obj) {
        return Math.abs(this.y - _obj.y);
    }

    getAbsDistX(_obj) {
        return this.x - _obj.x;
    }

    getAbsDistY(_obj) {
        return this.y - _obj.y;
    }

    getAbsDistSimX(_x) {
        return this.x - _x;
    }

    getAbsDistSimY(_y) {
        return this.y - _y;
    }

    getDist(_obj) {
        return Math.sqrt(Math.pow(_obj.x - this.x, 2) + Math.pow(_obj.y - this.y, 2));
    }

    setPos(_x, _y) {
        this.x = _x,
            this.y = _y;
    }

    setDim(_w, _h) {
        this.w = _w,
            this.h = _h;
    }

    collideWith(_obj, _add = 0) {
        if (
            (this.getRight() - _add >= _obj.getLeft() &&
                this.getLeft() + _add <= _obj.getRight() &&
                this.getTop() - _add <= _obj.getBottom() &&
                this.getBottom() - _add >= _obj.getTop()
            )) {
            return true;
        }
        return false;
    }

    circCollideWith(_obj, _add = 0) {
        return this.getDist(_obj) <= _obj.r + this.r;
    }
}

class Rect extends Particle {
    constructor(_opt) {
        super();
        this.color = _opt.color;
        this.sprite = _opt.image;
    }

    draw(_ctx) {
        _ctx.fillStyle = this.color;
        _ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Circle extends Particle {
    constructor(_obj) {
        super();
        this.x = _obj.x;
        this.y = _obj.y;
        this.baseX = 0;
        this.baseY = 0;
        this.color = _obj.color;
        this.r = _obj.r;
    }

    draw(_ctx) {
        _ctx.fillStyle = this.color;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0, false);
        _ctx.closePath();
        _ctx.fill();
    }

    update(_ctx, mouse) {
        if (this.getDist(mouse) <= mouse.r + this.r) {
            this.x -= 4;
            this.y -= 4;
        } else {
            if (this.y != this.baseY) {
                this.y += Math.abs(this.y - this.baseY) / 25;
            }
            if (this.x != this.baseX) {
                this.x += Math.abs(this.x - this.baseX) / 25;
            }
        }
        this.draw(_ctx);
    }
}
export {
    Rect,
    Circle
};