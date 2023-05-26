class AABB {
    constructor(x, y, z, l, w, h) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.l = l;
        this.w = w;
        this.h = h;
    }

    isColliding(other) {
        return (
            this.minX <= other.maxX &&
            this.maxX >= other.minX &&
            this.minY <= other.maxY &&
            this.maxY >= other.minY &&
            this.minZ <= other.maxZ &&
            this.maxZ >= other.minZ
        );
    }

    update() {

        this.minX = this.x - this.l/2;
        this.maxX = this.x + this.l/2;
        this.minY = this.y - this.w/2;
        this.maxY = this.y + this.w/2;
        this.minZ = this.z - this.h/2;
        this.maxZ = this.z + this.h/2;

    }

    show(buffer) {
        buffer.push();
        buffer.translate(this.x, this.y, this.z);
        buffer.noFill();
        buffer.strokeWeight(5);
        buffer.stroke(255);
        buffer.box(
            this.l,
            this.w,
            this.h,
        );
        buffer.pop();
    }
}
