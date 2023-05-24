class Player extends Camera{
	constructor(buffer) {
		super(buffer);
		this.dimensions = createVector(1, 3, 1);
		this.velocity = createVector(0, 0, 0);
		this.sensitivity = 0.001;
		this.speed = 1.0;
	}

	update() {
		this.input();
		this.forward = createVector(cos(this.yaw), tan(this.pitch), sin(this.yaw));
		this.forward.normalize();
		this.right = createVector(cos(this.yaw - PI / 2.0), 0, sin(this.yaw - PI / 2.0));
		this.velocity.mult(this.friction);
		this.position.add(this.velocity);
		let center = p5.Vector.add(this.position, this.forward);
		this.cam.camera(this.position.x, this.position.y, this.position.z, center.x, center.y, center.z, this.up.x, this.up.y, this.up.z);
	}

	moveX(speed) {
		this.velocity.add(p5.Vector.mult(this.right, speed));
		this.velocity.y = 0;
	}

	moveZ(speed) {
		this.velocity.add(p5.Vector.mult(this.forward, speed));
		this.velocity.y = 0;
	}
}