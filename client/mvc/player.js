//Player instance with name + score attributes
export class Player {

    constructor() {
        this.score = 0;
    }

    setName(name) {
        this.name = name;
    }

    setScore(score) {
        this.score = score;
    }

    setMode(mode) {

        this.mode = mode;
    }

    setLevel(level) {
        this.level = level;
    }
    getMode() {
        return this.mode;
    }
    getScore() {
        return this.score;
    }
    getName() {
        return this.name;
    }
    getLevel() {
        return this.level;
    }
}