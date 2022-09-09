class PVector{
    constructor(x, y, z){
        this.x  = x;
        this.y  = y;
        this.z  = z;
    }

    toMatrix(){
        return [[this.x], 
                [this.y], 
                [this.z],]
    }

    mult(factor){
        this.x *= factor
        this.y *= factor
        this.z *= factor
    }
}

function angleToRadians(degree){
    return degree*(Math.PI/180)
}

class Cube{
    constructor(canvas, x, y, z, width, height, leng){
        this.x          = x;
        this.y          = y;
        this.z          = z;
        this.width      = width;
        this.height     = height;
        this.leng       = leng; //    Length was taken
        this.projected  = [8]
        this.scale = 100


        this.points = [
            new PVector(-this.width+this.x, -this.height-this.y, this.leng+this.z),
            new PVector(this.width+this.x, -this.height-this.y, this.leng+this.z),
            new PVector(this.width+this.x, this.height-this.y, this.leng+this.z),
            new PVector(-this.width+this.x, this.height-this.y, this.leng+this.z),
            new PVector(-this.width+this.x, -this.height-this.y, -this.leng+this.z),
            new PVector(this.width+this.x, -this.height-this.y, -this.leng+this.z),
            new PVector(this.width+this.x, this.height-this.y, -this.leng+this.z),
            new PVector(-this.width+this.x, this.height-this.y, -this.leng+this.z),
        ]


        this.angleX = angleToRadians(0)
        this.angleY = angleToRadians(0)
        this.angleZ = angleToRadians(0)
    //  Rotation Matrix
        this.rotationUpdate()
    }

    updateScale( amount ){
        this.scale = amount; 
    }

    rotationUpdate(){
        this.rotationX = [
            [ 1, 0, 0],
            [ 0, Math.cos(this.angleX), -Math.sin(this.angleX)],
            [ 0, Math.sin(this.angleX),  Math.cos(this.angleX)], 
        ]
    
        this.rotationY = [
            [ Math.cos(this.angleY), 0, Math.sin(this.angleY)],
            [ 0, 1, 0],
            [ -Math.sin(this.angleY), 0, Math.cos(this.angleY)],
        ]
    
        this.rotationZ = [
            [ Math.cos(this.angleZ), -Math.sin(this.angleZ), 0 ],
            [ Math.sin(this.angleZ),  Math.cos(this.angleZ), 0 ],
            [ 0, 0, 1],
        ]
    }

    transformAngleX( amount ){
        this.angleX = angleToRadians(amount)
    }

    transformAngleY( amount ){
        this.angleY = angleToRadians(amount)
    }

    transformAngleZ( amount ){
        this.angleZ = angleToRadians(amount)
    }

    project(){
        this.points.forEach((v, i) => {
            let rotated2D = multiplyMatrix(this.rotationX, v.toMatrix())
            rotated2D = multiplyMatrix(this.rotationY, rotated2D.toMatrix())
            rotated2D = multiplyMatrix(this.rotationZ, rotated2D.toMatrix())

            let distance = 3
            let z = 1/(distance - rotated2D.z)
            let projection = [
                [z, 0, 0],
                [0, z, 0],
            ]

            let projected2D = multiplyMatrix(projection, rotated2D.toMatrix())
            projected2D.mult(this.scale)
            this.projected[i] = projected2D
        })
    }

    ConnectPoints(i, j, data){
        let a = data[i]
        let b = data[j]
    
        ctx.beginPath()
        ctx.strokeStyle = "rgb(255, 255, 255)"
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
    }
    
    draw(){
        this.rotationUpdate()
        ctx.fillStyle = "rgb(255, 0, 255)"

        this.project()
        this.projected.forEach((v) => {
            ctx.fillRect(v.x-2, v.y-2, 4, 4)
        })

        this.ConnectPoints(0, 1, this.projected)
        this.ConnectPoints(0, 4, this.projected)
        this.ConnectPoints(4, 5, this.projected)
        this.ConnectPoints(5, 1, this.projected)
    
        this.ConnectPoints(3, 2, this.projected)
        this.ConnectPoints(2, 6, this.projected)
        this.ConnectPoints(3, 7, this.projected)
        this.ConnectPoints(7, 6, this.projected)
    
        this.ConnectPoints(0, 3, this.projected)
        this.ConnectPoints(4, 7, this.projected)
        this.ConnectPoints(5, 6, this.projected)
        this.ConnectPoints(1, 2, this.   projected)
    }

}

//  *STOLEN* https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
//  I was too lazy to write matrix multiplier
function multiplyMatrix(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length, bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return new PVector(m[0], m[1], m[2]);
}