export default class Scene {
    constructor(_opt) {
        this.el = _opt.el;
        this.w = _opt.w;
        this.h = _opt.h;
        this.buffer = null;
        this.canvas = document.createElement("canvas");
    }

    static Create(_id, _width, _height) {
        return new Scene({ el: document.querySelector(_id), w: _width, h: _height });
    }

    init() {
        this.buffer = this.canvas.getContext("2d");
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.el.appendChild(this.canvas);
    }
    
    resize(_w, _h) {
        this.canvas.width = _w;
        this.canvas.height = _h;
    }
}