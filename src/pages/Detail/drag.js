export function MySizeChange(obj, w, h, x, y) {
  this.x = x;
  this.y = y;
  this.preWidth = w;
  this.preHeight = h;
  this.obj = obj;
  this.down = false;
  this.pressX = 0;
  this.pressY = 0;

  this.onMouseWheel = function(e) {
    let width = parseInt(this.obj.style.width, 10) || w;
    var delta = Math.round(e.wheelDelta);
    width += delta;
    // console.log(width);

    if (width > w) {
      let k = width / this.preWidth; //缩放倍数

      obj.style.width = width + 'px';
      this.preWidth = width; //保存上一次宽度

      let height = Math.round(this.preHeight * k);
      //本次

      this.obj.style.height = height + 'px';
      this.preHeight = height;

      let deltaX = Math.round((width * (k - 1)) / 2);
      let deltaY = Math.round((height * (k - 1)) / 2);

      this.x = this.x - deltaX;
      this.y = this.y - deltaY;

      this.obj.style.left = this.x + 'px';
      this.obj.style.top = this.y + 'px';
      //减少到800 还原
    } else {
      this.obj.style.width = w + 'px';
      this.obj.style.height = h + 'px';
      this.obj.style.top = y + 'px';
      this.obj.style.left = x + 'px';

      this.x = x;
      this.y = y;
    }
  };
  this.onMouseDown = function(e) {
    // console.log(e);
    this.down = true;
    this.pressX = e.layerX;
    this.pressY = e.layerY;
  };
  this.onMouseMove = function(e) {
    if (this.down) {
      let offsetX = e.layerX - this.pressX;
      let offsetY = e.layerY - this.pressY;
      this.x = this.x + offsetX;
      this.y = this.y + offsetY;
      this.obj.style.left = this.x + 'px';
      this.obj.style.top = this.y + 'px';
    }
  };
  this.onMouseUp = function(e) {
    this.down = false;
  };
}
