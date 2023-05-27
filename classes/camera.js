class Camera {
	constructor(buffer) {
		this.cam = buffer.createCamera();
		this.sensitivity = 0.002;
		this.speed = 3.0;
		this.position = createVector(-1000, -50, 0);
		this.velocity = createVector(0, 0, 0);
		this.up = createVector(0, 1, 0);
		this.forward = createVector(0, 0, 1);
		this.right = createVector(1, 0, 0);
		this.yaw = 0.0;
		this.pitch = 0.0;
		this.roll = 0.0;
		this.friction = 0.75;
	}

	update() {
		this.forward = createVector(cos(this.yaw), tan(this.pitch), sin(this.yaw));
		this.forward.normalize();
		this.right = createVector(cos(this.yaw - PI / 2.0), 0, sin(this.yaw - PI / 2.0));
		this.velocity.mult(this.friction);
		this.position.add(this.velocity);
		let center = p5.Vector.add(this.position, this.forward);
		this.cam.camera(this.position.x, this.position.y, this.position.z, center.x, center.y, center.z, this.up.x, this.up.y, this.up.z);
		console.log(this.yaw,this.pitch);
	}
	moveX(speed) {
		this.velocity.add(p5.Vector.mult(this.right, speed));
	}

	moveZ(speed) {
		this.velocity.add(p5.Vector.mult(this.forward, speed));
	}

	pan(angle) {
		this.yaw += angle;
	}

	tilt(angle) {
		this.pitch += angle;
		this.pitch = this.clamp(this.pitch, -PI / 2.01, PI / 2.01);
		if(this.pitch == PI / 2.0) {
			this.pitch += 0.001;
		}
	}

	clamp(num, min, max) {
		if(num > max) {
			return max;
		}
		if(num < min) {
			return min;
		}
		return num;
	}
}
