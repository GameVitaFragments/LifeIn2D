let interactbutton = false;

class Player extends Camera {
    constructor(position, speed, buffer) {
        super(buffer);
        this.speed = speed;
        this.position = position;
        this.sensitivity = 0.001;
        this.size = createVector(250, 100, 250);
        this.aabb = new AABB(this.position.x, this.position.y, this.position.z, this.size.x, this.size.y, this.size.z);
        this.isInteracting = false;
    }

    interactionState(item) {
        let distvec = p5.Vector.sub(item.pos, this.position);
        let distance = p5.Vector.mag(distvec);        distvec.normalize();
        let dotPro = p5.Vector.dot(this.aimforward, distvec);

        if(this.isInteracting && interactbutton) {
            this.isInteracting = false;
            interactbutton = false;
            return -1;
        }
        if(!this.isInteracting && dotPro >= 0.98 && distance <= item.minDist && interactbutton) {
            this.isInteracting = true;
            interactbutton = false;
            return 1;
        }
        if(dotPro >= 0.98 && distance <= 600) {
            return 0;
        }
        return -1;
    }

    update(currMap) {
        this.input(currMap);
        this.aabb.x = this.position.x;
        this.aabb.y = this.position.y;
        this.aabb.z = this.position.z;
        this.aabb.update();
        this.aimforward = createVector(cos(this.yaw), tan(this.pitch), sin(this.yaw));
        this.forward = createVector(cos(this.yaw), 0, sin(this.yaw));
        this.aimforward.normalize();
        this.forward.normalize();
        this.aimright = createVector(cos(this.yaw - PI / 2.0), tan(this.pitch), sin(this.yaw - PI / 2.0));
        this.right = createVector(cos(this.yaw - PI / 2.0), 0, sin(this.yaw - PI / 2.0));
        this.aimright.normalize();
        this.right.normalize();
        this.velocity.mult(this.friction);

        let vel = this.velocity.copy();
        let pos = this.position.copy();
        pos.add(vel.mult(2));
        let currentAABB = new AABB(pos.x, pos.y, pos.z, this.size.x, this.size.y, this.size.z);
        currentAABB.update();

        let colliding = [];
        let colnormal = [];

        for (let i = 0; i < currMap.boundingBoxes.length; i++) {
            if (currentAABB.isColliding(currMap.boundingBoxes[i])) {
                colliding.push(currMap.boundingBoxes[i]);
                colnormal.push(currMap.normals[i]);
            }
        }

        if (colliding.length > 0) {
            for (let i = 0; i < colliding.length; i++) {
                let curr = colliding[i];
                let currnormal = colnormal[i];
                //console.log(currnormal);
                if (this.velocity.mag() != 0) {
                    if(currnormal == -1) {
                        this.velocity.x = 0;
                    }
                    if(currnormal == 1) {
                        this.velocity.z = 0;
                    }
                }
            }
        }

        this.position.add(this.velocity);
        let center = p5.Vector.add(this.position, this.aimforward);
        this.cam.camera(this.position.x, this.position.y, this.position.z, center.x, center.y, center.z, this.up.x, this.up.y, this.up.z);
    }

    input(currMap) {
        if(this.isInteracting) {
            return;
        }
        this.pan(movedX * this.sensitivity);
        this.tilt(movedY * this.sensitivity);
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.moveX(this.speed, currMap);
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.moveX(-this.speed, currMap)
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.moveZ(this.speed, currMap);
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.moveZ(-this.speed, currMap);
        }
    }

    moveX(speed) {
        this.velocity.add(p5.Vector.mult(this.right, speed));
    }

    moveZ(speed) {
        this.velocity.add(p5.Vector.mult(this.forward, speed));
    }
}

function keyPressed() {
    if(keyCode == 70) {
        interactbutton = true;
    }
    else {
        interactbutton = false;
    }
}

