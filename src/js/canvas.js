import { ui } from './ui';

class Canvas {
    constructor() {
        this.lastX = 0;
        this.lastY = 0;
        this.direction = true;
        this.isDrawing = false;
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.clear = document.querySelector("#clearCanvas");

        // Canvas property
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 20;
        this.ctx.strokeStyle = "#000000";

        // Drawing a straight line
        this.needFirstPoint = true;
    }

    // Draw on the canvas
    draw(e) {
        // If user is not drawing anymore, end the function
        if(!this.isDrawing) return;

        if(!ui.strLineChecked) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
    
            // Re-save the position
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
        }
    }

    // Draw a straight line between two button clicks
    drawStraightLine(x, y) {
        if(ui.strLineChecked) {
            if(this.needFirstPoint) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.needFirstPoint = false;
            } else {
                this.ctx.lineTo(x, y)
                this.ctx.stroke();
                this.needFirstPoint = true;
            }
        }
    }
    
    // Clear the canvas
    clearCanvas() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}
export const theCanvas = new Canvas();

// Canvas (drawing) event listeners
theCanvas.canvas.addEventListener("mousedown", e => {
    theCanvas.isDrawing = true;
    theCanvas.lastX = e.offsetX;
    theCanvas.lastY = e.offsetY;
})
theCanvas.canvas.addEventListener("mousemove", theCanvas.draw.bind(theCanvas));
theCanvas.canvas.addEventListener("mouseup", () => theCanvas.isDrawing = false);
theCanvas.canvas.addEventListener("mouseout", () => theCanvas.isDrawing = false);
theCanvas.clear.addEventListener("click", theCanvas.clearCanvas.bind(theCanvas));
theCanvas.canvas.addEventListener("click", e => {
    let x = e.offsetX;
    let y = e.offsetY;
    theCanvas.drawStraightLine(x, y);
})
