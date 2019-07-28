/* global SSCD */
/* exported Brick */
"use strict";

const BRICK_WIDTH = 64;
const BRICK_HEIGHT = 32;
let brickimg;

class Brick {
    constructor(posX, posY, world, id) {
        this.pos = new SSCD.Vector(posX, posY);

        const tl = new SSCD.Vector(this.pos.x, this.pos.y);
        const tr = new SSCD.Vector(this.pos.x + this.pos.y, posY);
        const bl = new SSCD.Vector(this.pos.x, this.pos.y + BRICK_HEIGHT);
        const br = new SSCD.Vector(this.pos.x + BRICK_WIDTH, this.pos.y + BRICK_HEIGHT);

        this.collisionShapes = [
            new SSCD.Line(tl, tr.sub(tl)),
            new SSCD.Line(bl, br.sub(bl)),
            new SSCD.Line(tl, bl.sub(tl)),
            new SSCD.Line(tr, br.sub(tr))
        ];

        for (let i = 0; i < 4; i++) {
            world.add(this.collisionShapes[i]);
        }

        this.collisionShapes[0].set_collision_tags(`Brick_${id}_TOP`);
        this.collisionShapes[1].set_collision_tags(`Brick_${id}_BOTTOM`);
        this.collisionShapes[2].set_collision_tags(`Brick_${id}_LEFT`);
        this.collisionShapes[3].set_collision_tags(`Brick_${id}_RIGHT`);

        this.isHidden = false;
    }

    draw() {
        if (!this.isHidden) {
            image(brickimg, this.pos.x, this.pos.y);
        }
    }

    hide(world) {
        this.isHidden = true;
        this.collisionShapes.forEach((line) => {
            world.remove(line);
        });
    }
}
