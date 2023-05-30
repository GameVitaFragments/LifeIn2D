function err(e) {
	console.log(e); 
}

class Map {
	constructor(path, i) {
		this.map = loadTable(path, 'csv', err);
		this.corners = [];
		this.scale = 350;
		this.wallHeight = 800;
		this.wallWidth  = 200;
		this.teleport = [[36 * this.scale, 8 * this.scale]];
		this.end = [[41, 3]];
		this.spawn1 = [[2 * this.scale, 2 * this.scale]];
		this.spawn2 = [[3.5 * this.scale, 3.5 * this.scale]];
		this.type = i;
		if (i == 1) {
			this.npcPos = [
				[4,61],
				[24,85],
				[84,11]
			];
		}
	}

	load(tex) {
		this.texture = tex;
		for (let r = 0; r < this.map.getRowCount(); r++) {
			let coord = [];
			coord[0] = parseInt(this.map.getString(r, 0));
			coord[1] = parseInt(this.map.getString(r, 1));
			this.corners.push(coord);
		}
	}

	showMap(playerAABB, buffer) {
		this.boundingBoxes = [];
		this.normals = [];
		let n = this.corners.length;
		for (let i = 0; i < n; i++) {
			let currCorner = this.corners[i];
			let prevCorner = this.corners[(((i-1)%n) + n)%n];
			let col = random(-25, 25);
			let noiseVal = noise((millis()/20)*0.02, millis()/20*0.02)*25;
			buffer.strokeWeight(5);
			buffer.push();
			buffer.ambientLight(0);
			buffer.directionalLight(noiseVal + 200,noiseVal+ 200,noiseVal + 200, player.forward.x, player.forward.y, player.forward.z);
			buffer.noStroke();
			buffer.translate(
				this.scale * (currCorner[0] + prevCorner[0])/2,
				0,
				this.scale * (currCorner[1] + prevCorner[1])/2
			);

			let l;
			let w;
			let h;

			buffer.texture(this.texture);

			if (prevCorner[0] == currCorner[0]) {
				buffer.box(this.wallWidth, this.wallHeight, (this.scale + this.wallWidth / 8) * Math.abs(prevCorner[1] - currCorner[1]));
				l = this.wallWidth;
				w = this.wallHeight;
				h = this.scale * Math.abs(prevCorner[1] - currCorner[1]);
				this.normals.push(-1);
			} else {
				buffer.box((this.scale + this.wallWidth / 8)* Math.abs(prevCorner[0] - currCorner[0]), this.wallHeight, this.wallWidth);
				l = this.scale * Math.abs(prevCorner[0] - currCorner[0]);
				w = this.wallHeight;
				h = this.wallWidth;
				this.normals.push(1);
			}





			this.boundingBoxes.push(
				new AABB(
					this.scale * (currCorner[0] + prevCorner[0])/2,
					0,
					this.scale * (currCorner[1] + prevCorner[1])/2,
					l,
					w,
					h,
				)
			);

			buffer.pop();

		}
		if (this.type == 2) {
			renderBuffer.push();
			renderBuffer.translate(
				3.5 * this.scale,
				0,
				0
			)
			renderBuffer.texture(avatarImages[3]);
			renderBuffer.box(500);
			renderBuffer.pop();

			renderBuffer.push();
			renderBuffer.translate(
				7 * this.scale,
				0,
				3.5 * this.scale
			)
			renderBuffer.texture(avatarImages[0]);
			renderBuffer.box(500);
			renderBuffer.pop();

			renderBuffer.push();
			renderBuffer.translate(
				3.5 * this.scale,
				0,
				7 * this.scale
			)
			renderBuffer.texture(avatarImages[1]);
			renderBuffer.angleMode(DEGREES);
			renderBuffer.rotateZ(90);
			renderBuffer.box(500);
			renderBuffer.pop();

			renderBuffer.push();
			renderBuffer.translate(
				0,
				0,
				3.5 * this.scale
			)
			renderBuffer.texture(avatarImages[2]);
			renderBuffer.box(500);
			renderBuffer.pop();
		}
		for (let i = 0; i < this.boundingBoxes.length; i++) {
			let curr = this.boundingBoxes[i];
			curr.update();
		}
	}
}
