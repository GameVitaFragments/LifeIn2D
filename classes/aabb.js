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

class staticAABB {
    constructor(vertices, s) {
        this.vertices = vertices;
        this.s = s;
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

    update(vertices, pos) {
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.minZ = 0;
        this.maxZ = 0;
        for (let i = 0; i < this.vertices.length; i++) {
            let curr = this.vertices[i];
            if (curr.x < this.minX) {
                this.minX = curr.x;
            }
            if (curr.x > this.maxX) {
                this.maxX = curr.x;
            }
            if (curr.y < this.minY) {
                this.minY = curr.y;
            }
            if (curr.y > this.maxY) {
                this.maxY = curr.y;
            }
            if (curr.z < this.minZ) {
                this.minZ = curr.z;
            }
            if (curr.z > this.maxZ) {
                this.maxZ = curr.z;
            }
        }
        this.minX *= this.s;
        this.maxX *= this.s;
        this.minY *= this.s;
        this.maxY *= this.s;
        this.minZ *= this.s;
        this.maxZ *= this.s;


        this.minX = pos.x + this.minX;
        this.maxX = pos.x + this.maxX;
        this.minY = pos.y + this.minY;
        this.maxY = pos.y + this.maxY;
        this.minZ = pos.z + this.minZ;
        this.maxZ = pos.z + this.maxZ;
    }

    show(buffer, pos) {
        buffer.push();
        buffer.translate(
            pos.x,
            pos.y,
            pos.z
        );
        buffer.noStroke();

        buffer.noFill();
        buffer.strokeWeight(5);
        buffer.stroke(255);
        buffer.box(
            (this.minX - this.maxX),
            (this.minY - this.maxY),
            (this.minZ - this.maxZ),
         );

        buffer.pop();
    }
}
