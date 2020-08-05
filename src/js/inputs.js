import { ui } from './ui';
import { theCanvas } from './canvas'

class Inputs {
    constructor() {
        this.colorInputs = document.querySelectorAll(`input[type="color"]`);
        this.colorBoxes = document.querySelectorAll(".color-box");
        this.widthInput = document.querySelector("#width-input");
        this.heightInput = document.querySelector("#height-input");
        this.capWidth = document.querySelector("#capWidth");
    }

    // Change the drawing cap size
    changeCapSize(e) {
        e = e || event;

        // Change cap size using the slider
        if(ui.holdingSlider) {
            theCanvas.ctx.lineWidth = e.target.value;
            const capDisplay = document.querySelector("#capWidth-display");
            capDisplay.style.width = `${e.target.value}px`;
            capDisplay.style.height = `${theCanvas.ctx.lineWidth}px`;
            capDisplay.style.backgroundColor = theCanvas.ctx.strokeStyle;
            console.log(capDisplay);
        }

        // If user presses [, decrease size. If user presses ], increase cap size
        if(e.keyCode === 219) {
            theCanvas.ctx.lineWidth--;
            this.capWidth.value = theCanvas.ctx.lineWidth;
        } else if (e.keyCode === 221) {
            theCanvas.ctx.lineWidth++;
            this.capWidth.value = theCanvas.ctx.lineWidth;
        }

        ui.displayChanges("capSize");
    }
}

export const inputs = new Inputs();

// Input field
inputs.capWidth.addEventListener("mousedown", () => ui.holdingSlider = true)
inputs.capWidth.addEventListener("mouseup", () => {
    ui.holdingSlider = false
    document.querySelector("#capWidth-display").style.width = "0px";
    document.querySelector("#capWidth-display").style.height = "0px";
})
inputs.capWidth.addEventListener("mousemove", inputs.changeCapSize.bind(inputs));
inputs.capWidth.addEventListener("click", e => {
    theCanvas.ctx.lineWidth = e.target.value;

    ui.displayChanges("capSize");
});
document.addEventListener("keydown", inputs.changeCapSize.bind(inputs));

// Choose colors for drawing and for the background fill
inputs.colorInputs.forEach(input => input.addEventListener("change", () => {
    if(input.id === 'colorPalette') {
        theCanvas.ctx.strokeStyle = input.value;

        // Display changes
        ui.displayChanges("draw-color");
    } else if (input.id === "backgroundColor") {
        theCanvas.ctx.fillStyle = input.value;
        theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);

        // Display changes
        ui.displayChanges("fill-color", input.value);
    }
}))

inputs.colorBoxes.forEach(box => box.addEventListener("click", e => {
    let parentID = e.target.parentElement.id;
    if(parentID === "draw-color") {
        theCanvas.ctx.strokeStyle = box.dataset.color;

        // Update the UI with the proper color name
        ui.displayChanges("draw-color");
    } else if (parentID === "fill-color") {
        theCanvas.ctx.fillStyle = box.dataset.color;
        theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);
        
        // Update the UI with the proper color name
        ui.displayChanges("fill-color", box.dataset.color);
    }
    // console.log(e.target.parentElement.id);
}));