function Enemy(initialX, y) {
  this.initialX = initialX;
  this.y = y;
  this.currentX = initialX;
  this.speed = 6;
  this.minDistance = 5;
  this.groundlevel = y;

  this.isPlummeting = false;
  this.isFalling = false;
  this.isJumping = false;
  this.jumpSpeed = 0;
  this.gravity = 2;

  this.update = function (targetX, canyons) {
    if (this.currentX < targetX - this.minDistance) {
      this.currentX += this.speed;
    } else if (this.currentX > targetX + this.minDistance) {
      this.currentX -= this.speed;
    }

    let nextCanyon = null;

    let s = 0.7;
    let feetX = this.currentX - 260 * s;

    for (let c of canyons) {
      let canyonFront = c.x;

      if (
        feetX > canyonFront - 10 &&
        feetX < canyonFront + 5 &&
        !this.isJumping
      ) {
        nextCanyon = c;
        break;
      }
    }

    if (nextCanyon && !this.isJumping) {
      this.isJumping = true;

      let jumpStrength = -18;
      if (nextCanyon.width > 50) {
        jumpStrength -= 10;
      }

      this.jumpSpeed = jumpStrength;
    }

    if (this.isJumping) {
      this.jumpSpeed += this.gravity;
      this.y += this.jumpSpeed;

      if (this.y >= this.groundlevel) {
        this.y = this.groundlevel;
        this.isJumping = false;
        this.jumpSpeed = 0;
      }
    }
  };

  this.reset = function () {
    this.currentX = this.initialX;
    this.y = this.groundlevel;
    this.isJumping = false;
    this.jumpSpeed = 0;
  };
  this.draw = function (targetX) {
    let s = 0.7;
    this.update(character.x, canyon);
    if (this.isJumping) {
      noStroke();
      fill(65, 28, 71);
      beginShape();

      // head
      vertex(this.currentX - 200 * s, this.y - 365 * s);
      vertex(this.currentX - 130 * s, this.y - 365 * s);
      vertex(this.currentX - 100 * s, this.y - 345 * s);
      vertex(this.currentX - 100 * s, this.y - 325 * s);

      // Mouth
      vertex(this.currentX - 130 * s, this.y - 315 * s);
      vertex(this.currentX - 160 * s, this.y - 325 * s);

      // Neck
      vertex(this.currentX - 140 * s, this.y - 315 * s);
      vertex(this.currentX - 190 * s, this.y - 285 * s);

      // Back
      vertex(this.currentX - 195 * s, this.y - 366 * s);
      vertex(this.currentX - 226 * s, this.y - 345 * s);
      vertex(this.currentX - 248 * s, this.y - 351 * s);
      vertex(this.currentX - 251 * s, this.y - 336 * s);
      vertex(this.currentX - 272 * s, this.y - 345 * s);
      vertex(this.currentX - 275 * s, this.y - 328 * s);
      vertex(this.currentX - 295 * s, this.y - 338 * s);
      vertex(this.currentX - 300 * s, this.y - 322 * s);
      vertex(this.currentX - 317 * s, this.y - 325 * s);
      vertex(this.currentX - 321 * s, this.y - 310 * s);
      vertex(this.currentX - 335 * s, this.y - 313 * s);
      vertex(this.currentX - 336 * s, this.y - 295 * s);
      vertex(this.currentX - 349 * s, this.y - 298 * s);

      // Tail
      vertex(this.currentX - 345 * s, this.y - 279 * s);
      vertex(this.currentX - 430 * s, this.y - 285 * s);
      vertex(this.currentX - 480 * s, this.y - 290 * s);
      vertex(this.currentX - 440 * s, this.y - 280 * s);

      // Belly
      vertex(this.currentX - 374 * s, this.y - 259 * s);
      vertex(this.currentX - 350 * s, this.y - 245 * s);

      // leg 1
      vertex(this.currentX - 399 * s, this.y - 190 * s);
      vertex(this.currentX - 383 * s, this.y - 196 * s);
      vertex(this.currentX - 377 * s, this.y - 188 * s);
      vertex(this.currentX - 366 * s, this.y - 195 * s);
      vertex(this.currentX - 363 * s, this.y - 180 * s);
      vertex(this.currentX - 320 * s, this.y - 227 * s);

      vertex(this.currentX - 312 * s, this.y - 224 * s);
      vertex(this.currentX - 300 * s, this.y - 230 * s);
      vertex(this.currentX - 289 * s, this.y - 237 * s);
      vertex(this.currentX - 262 * s, this.y - 189 * s);

      vertex(this.currentX - 257 * s, this.y - 202 * s);
      vertex(this.currentX - 239 * s, this.y - 196 * s); // feet
      vertex(this.currentX - 235 * s, this.y - 206 * s);
      vertex(this.currentX - 220 * s, this.y - 203 * s);
      vertex(this.currentX - 245 * s, this.y - 245 * s);
      vertex(this.currentX - 240 * s, this.y - 253 * s);
      vertex(this.currentX - 190 * s, this.y - 275 * s);

      endShape(CLOSE);

      // arms
      beginShape();
      vertex(this.currentX - 220 * s, this.y - 305 * s);
      vertex(this.currentX - 200 * s, this.y - 295 * s);
      vertex(this.currentX - 210 * s, this.y - 285 * s);
      vertex(this.currentX - 230 * s, this.y - 295 * s);
      endShape(CLOSE);
      // eye
      fill("red");
      ellipse(this.currentX - 145 * s, this.y - 350 * s, 8 * s, 8 * s);
    } else {
      noStroke();
      fill(65, 28, 71);

      beginShape();

      // Head
      vertex(this.currentX - 200 * s, this.y - 365 * s);
      vertex(this.currentX - 130 * s, this.y - 365 * s);
      vertex(this.currentX - 100 * s, this.y - 345 * s);
      vertex(this.currentX - 100 * s, this.y - 325 * s);

      // Mouth
      vertex(this.currentX - 130 * s, this.y - 315 * s);
      vertex(this.currentX - 160 * s, this.y - 325 * s);

      // Neck
      vertex(this.currentX - 140 * s, this.y - 315 * s);
      vertex(this.currentX - 190 * s, this.y - 285 * s);

      // Back
      vertex(this.currentX - 195 * s, this.y - 366 * s);
      vertex(this.currentX - 226 * s, this.y - 345 * s);
      vertex(this.currentX - 248 * s, this.y - 351 * s);
      vertex(this.currentX - 251 * s, this.y - 336 * s);
      vertex(this.currentX - 272 * s, this.y - 345 * s);
      vertex(this.currentX - 275 * s, this.y - 328 * s);
      vertex(this.currentX - 295 * s, this.y - 338 * s);
      vertex(this.currentX - 300 * s, this.y - 322 * s);
      vertex(this.currentX - 317 * s, this.y - 325 * s);
      vertex(this.currentX - 321 * s, this.y - 310 * s);
      vertex(this.currentX - 335 * s, this.y - 313 * s);
      vertex(this.currentX - 336 * s, this.y - 295 * s);
      vertex(this.currentX - 349 * s, this.y - 298 * s);

      // Tail
      vertex(this.currentX - 345 * s, this.y - 279 * s);
      vertex(this.currentX - 430 * s, this.y - 285 * s);
      vertex(this.currentX - 480 * s, this.y - 290 * s);
      vertex(this.currentX - 440 * s, this.y - 280 * s);

      vertex(this.currentX - 374 * s, this.y - 259 * s);
      vertex(this.currentX - 350 * s, this.y - 245 * s);

      // Leg 1
      vertex(this.currentX - 348 * s, this.y - 180 * s);
      vertex(this.currentX - 338 * s, this.y - 192 * s);
      vertex(this.currentX - 337 * s, this.y - 180 * s);
      vertex(this.currentX - 326 * s, this.y - 192 * s);
      vertex(this.currentX - 317 * s, this.y - 180 * s);
      vertex(this.currentX - 320 * s, this.y - 227 * s);

      vertex(this.currentX - 312 * s, this.y - 224 * s);
      vertex(this.currentX - 300 * s, this.y - 230 * s);
      vertex(this.currentX - 289 * s, this.y - 237 * s);
      vertex(this.currentX - 275 * s, this.y - 180 * s);

      vertex(this.currentX - 271 * s, this.y - 198 * s);
      vertex(this.currentX - 260 * s, this.y - 180 * s);
      vertex(this.currentX - 255 * s, this.y - 221 * s);
      vertex(this.currentX - 245 * s, this.y - 180 * s);
      vertex(this.currentX - 245 * s, this.y - 245 * s);
      vertex(this.currentX - 240 * s, this.y - 253 * s);
      vertex(this.currentX - 190 * s, this.y - 275 * s);

      endShape(CLOSE);

      // Arms
      beginShape();
      vertex(this.currentX - 220 * s, this.y - 305 * s);
      vertex(this.currentX - 200 * s, this.y - 295 * s);
      vertex(this.currentX - 210 * s, this.y - 285 * s);
      vertex(this.currentX - 230 * s, this.y - 295 * s);
      endShape(CLOSE);

      // Eye
      fill("red");
      ellipse(this.currentX - 145 * s, this.y - 350 * s, 8 * s, 8 * s);
    }
  };
  this.checkContact = function (gc_x, gc_y) {
    let s = 0.7;

    let left = this.currentX - 220 * s;
    let right = this.currentX - 90 * s;
    let top = this.y - 380 * s;
    let bottom = this.y - 160 * s;

    return gc_x > left && gc_x < right && gc_y > top && gc_y < bottom;
  };
}
