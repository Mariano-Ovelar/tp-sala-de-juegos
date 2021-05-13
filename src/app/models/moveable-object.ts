export abstract class MoveableObject {

    constructor(private height: number, 
                private width: number, 
                private maxSpeed: number, 
                private position: Position) {
    }

    move(speedRatio: SpeedRatio): void {
        this.position.x += this.maxSpeed * speedRatio.x;
        this.position.y += this.maxSpeed * speedRatio.y;
    }

    getPosition(): Position { ... }

    getCollisionBoundaries(): Boundaries {
        return {
            top: this.position.y - this.height / 2,
            bottom: this.position.y + this.height / 2,
            right: this.position.x + this.width / 2,
            left: this.position.x - this.width / 2
        }
    }

    getWidth(): number { ... }

    getHeight(): number { ... }
}
