function err(e) {
    console.log(e);
}

class Map {
    constructor(path) {
        console.log(path);
        this.map = loadTable(path, 'csv', err);
        this.corners = [];
        this.scale = 500;
        this.wallHeight = 800;
        this.wallWidth  = 200;
        // console.log(this.map.getString(0, 0));
    }

    load(tex) {
        this.texture = tex;
        for (let r = 0; r < this.map.getRowCount(); r++) {
            let coord = [];
            coord[0] = parseInt(this.map.getString(r, 0));
            coord[1] = parseInt(this.map.getString(r, 1));
            this.corners.push(coord);
        }
        let n = this.corners.length;
        // for (let i = 0; i < n; i++) {
        //     let currCorner = this.corners[i];
        //     let prevCorner = this.corners[(((i-1)%n) + n)%n];
        //     if (prevCorner[0] == currCorner[0]) {
        //         this.boundingBoxes.push(new AABB(
        //             this.scale * (currCorner[0] + prevCorner[0])/2 - width/4,
        //             0,
        //             this.scale * (currCorner[1] + prevCorner[1])/2 - width/8,
        //             this.wallWidth, 
        //             this.wallHeight, 
        //             (this.scale + this.wallWidth / 8) * Math.abs(prevCorner[1] - currCorner[1])
        //         ));
        //     } else {
        //         this.boundingBoxes.push(new AABB(
        //             this.scale * (currCorner[0] + prevCorner[0])/2 - width/4,
        //             0,
        //             this.scale * (currCorner[1] + prevCorner[1])/2 - width/8,
        //             (this.scale + this.wallWidth / 8) * Math.abs(prevCorner[1] - currCorner[1]),
        //             this.wallHeight, 
        //             this.wallWidth,
        //         ));
        //     }
        // }
    }

    showMap(playerAABB, buffer) {
        this.boundingBoxes = [];
        this.normals = [];
        let n = this.corners.length;
        for (let i = 0; i < n; i++) {
            let currCorner = this.corners[i];
            let prevCorner = this.corners[(((i-1)%n) + n)%n];

            buffer.strokeWeight(5);
            //line(
            //    this.scale * currCorner[0] - width/4, 300, this.scale * currCorner[1] - height/4,
            //    this.scale * prevCorner[0] - width/4, 300, this.scale * prevCorner[1] - height/4
            //);

            buffer.push();
            buffer.noStroke();
            //buffer.ambientLight(10, 10, 10);
            // directionalLight(200, 200, 0, 1, 0, 0);
            //buffer.pointLight(100, 100, 100, playerAABB.x, playerAABB.y, playerAABB.z);
            buffer.translate(
                this.scale * (currCorner[0] + prevCorner[0])/2,
                0,
                this.scale * (currCorner[1] + prevCorner[1])/2
            );
            //buffer.sphere(50);
            let l;
            let w;
            let h;
            buffer.texture(this.texture);
            //console.log(prevCorner[0], currCorner[0]);
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

            // console.log(currCorner, prevCorner);
            // line(
            //     this.scale * currCorner[0] - width/4, this.scale * currCorner[1] - height/4,
            //     this.scale * prevCorner[0] - width/4, this.scale * prevCorner[1] - height/4
            // );
        }
        for (let i = 0; i < this.boundingBoxes.length; i++) {
            let curr = this.boundingBoxes[i];
            curr.update();
            //curr.show(buffer);
            if (curr.isColliding(playerAABB)) {
                //console.log(i);
            }
        }
        //     curr.update();
        //     buffer.stroke(255);
        //     buffer.translate(
        //         curr.x, curr.y, curr.z
        //     );
        //     buffer.sphere(
        //         100
        //     );
        //     // buffer.line(
        //     //     curr.minX, curr.minY, curr.minZ,
        //     //     curr.minX, curr.minY, curr.maxZ
        //     // );
        // }
    }
}