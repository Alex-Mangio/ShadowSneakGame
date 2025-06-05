export default class KeyInputs {

    constructor(){
        this.wPressed = false;
        this.aPressed = false;
        this.sPressed = false;
        this.dPressed = false;

        window.addEventListener("keydown", (e) => {
            if (e.key === 'w'|| e.key === "ArrowUp") this.wPressed = true;
            if (e.key === 'a'|| e.key === "ArrowLeft") this.aPressed = true;
            if (e.key === 's'|| e.key === "ArrowDown") this.sPressed = true;
            if (e.key === 'd'|| e.key === "ArrowRight") this.dPressed = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.key === 'w'|| e.key === "ArrowUp") this.wPressed = false;
            if (e.key === 'a'|| e.key === "ArrowLeft") this.aPressed = false;
            if (e.key === 's'|| e.key === "ArrowDown") this.sPressed = false;
            if (e.key === 'd'|| e.key === "ArrowRight") this.dPressed = false;
        });
    }
}