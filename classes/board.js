class Board {
  constructor(dragables) {
    this.dragables = dragables;
    this.offset = 1;
    this.w = width * this.offset;
    this.h = height * this.offset;
    this.buffer = createGraphics(this.w, this.h);
    this.spots = [
      [0, -60],
      [60, 0],
      [0, 60],
      [-60, 0]
    ];
    this.filled = [-1, -1, -1, -1];
    this.complete = false;
  }

  update() {
    this.buffer.clear();
    this.buffer.background(0, 0, 0, 200);
    for (let i = 0; i < this.spots.length; i++) {
      this.buffer.push();
      this.buffer.stroke(255);
      this.buffer.rectMode(CENTER);
      this.buffer.noFill();
      this.buffer.strokeWeight(3);
      this.buffer.rect(this.w/2 + this.spots[i][0], this.h/2 + this.spots[i][1], this.dragables[0].w, this.dragables[0].h);
      this.buffer.pop();
    }
    for (let i = 0; i < this.dragables.length; i++) {
      let curr = this.dragables[i];
      curr.update();
      if (!curr.dragging) {
          for (let j = 0; j < this.spots.length; j++) {
            let currSpot = this.spots[j];
            if (
              curr.x + curr.w/2 > this.w/2 + currSpot[0] - curr.w/2 &&
              curr.x + curr.w/2 < this.w/2 + currSpot[0] + curr.w/2 &&
              curr.y + curr.h/2 > this.h/2 + currSpot[1] - curr.h/2 &&
              curr.y + curr.h/2 < this.h/2 + currSpot[1] + curr.h/2
              ) {
              curr.x = this.w/2 + currSpot[0] - curr.w/2;
              curr.y = this.h/2 + currSpot[1] - curr.h/2;
              this.filled[j] = i;
              } else {
                //this.filled[j] = -1;
                //console.log(this.filled);
              }
          }
      }
      if (JSON.stringify(this.filled) === JSON.stringify([0, 1, 2, 3])) {
        this.complete = true;
      }
      curr.show(this.buffer);
      // console.log(this.complete);
    }
  }
}
