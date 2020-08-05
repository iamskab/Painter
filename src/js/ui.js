import { theCanvas } from './canvas'
import { inputs } from './inputs';

class Ui {
    constructor() {
        this.menu = document.querySelector(".main-menu");
        this.newProjectWindow = document.querySelector(".new-project_window");
        this.aboutMenu = document.querySelector(".about-menu");
        this.drawingField = document.querySelector("#main");
        this.notification = document.querySelector(".notification");

        this.isCanvasCreated = false;
        this.eraserToggled = false;
        this.prevColor = null;

        // Buttons
        this.newProjectBtn = document.querySelector("#new-project");
        this.startDrawingBtn = document.querySelector("#draw");
        this.goBackBtn = document.querySelector("#goBack");
        this.aboutBtn = document.querySelector("#about");
        this.save = document.querySelector("#saveDrawing");
        this.exit = document.querySelector("#exit");
        this.closeAbout = document.querySelector("#close-about");
        this.eraser = document.querySelector("#eraser");

        // Inputs
        this.holdingSlider = false;
        this.capTypes = document.querySelectorAll(".cap-type");
        this.lineTypes = document.querySelectorAll(".line-type");
        this.checkboxes = document.querySelectorAll(`input[type="checkbox"]`);

        // Checkbox for toggling between straight line mode on/off
        this.strLineChecked = false;
    }

    // Reset data
    resetData() {
        // Set defualt canvas properties
        this.setCanvasProperties();

        theCanvas.canvas.width = 800;
        theCanvas.canvas.height = 500;
        inputs.widthInput.value = 800;
        inputs.heightInput.value = 500;

        // Reset the information initial canvas was already created
        this.isCanvasCreated = false;

        // Clear the warning text
        document.querySelector("#show-warning").style.display = "none";

        // Display the reseted changes in the UI (text for the inputs)
        ui.displayChanges("all");
        this.displayCanvas("hide");
    }

    // Display new project menu
    displayNewProject(action) {
        if(action === "display") {
            this.newProjectWindow.style.display = "block";
            this.menu.style.display = "none";

            if(this.isCanvasCreated) {
                document.querySelector("#show-warning").style.display = "block";
                this.newProjectWindow.classList.add("active");
            }
        } else if (action === "hide") {
            this.newProjectWindow.style.display = "none";
            
            if(!this.isCanvasCreated) {
                this.menu.style.display = "block";
            }
        }
    }

    // Display canvas
    displayCanvas(action) {
        if(action === "display") {
            this.drawingField.style.display = "grid";
            this.newProjectWindow.style.display = "none";

            // Pre-set the canvas properties
            this.setCanvasProperties();

            // Fill in the canvas with color
            theCanvas.ctx.fillStyle = "#fff";
            theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);

            // Mark that the initial canvas was created
            this.isCanvasCreated = true;

        } else if (action === "hide") {
            this.menu.style.display = "block";
            this.drawingField.style.display = "none";
            this.newProjectWindow.classList.remove("active");

            // If user clicked EXIT, clear the canvas
            theCanvas.clearCanvas();
        }
    }

    // Set canvas properties and size
    setCanvasProperties() {
        // Set canvas properties
        theCanvas.canvas.width = inputs.widthInput.value;
        theCanvas.canvas.height = inputs.heightInput.value;
        theCanvas.ctx.lineCap = "round";
        theCanvas.ctx.lineWidth = 20;
        inputs.capWidth.value = theCanvas.ctx.lineWidth;
        document.querySelector("#current-capSize").textContent =`${theCanvas.ctx.lineWidth}px`;

        // Reset the values to the default ones
        inputs.capWidth.value = theCanvas.ctx.lineWidth;
        inputs.colorInputs.forEach(input => input.value = "#000000");

        // Reset the checkboxes to default ones
        const checkboxes = [...this.checkboxes];
        checkboxes.forEach(cap => cap.checked = false);
        this.capTypes[0].checked = true;

        this.displayChanges('all');
    }

    // About menu
    openAndCloseMenu(action) {
        if(action === "open") {
            this.aboutMenu.style.display = "block";
        } else if (action === "close") {
            this.aboutMenu.style.display = "none";
        }
    }

    // Filter the clicked checkboxes and pass their name as a line cap and line join property
    filterBoxes(id, name) {
        let boxes = null;
        if(name === "cap-type") {
            // Convert checkboxes node list to an array
            boxes = [...this.capTypes];

            // Filter the checkboxes
            boxes.filter(box => {
                if(box.id !== id) {
                    // Uncheck all the boxes that DON'T match the ID of the clicked box.
                    box.checked = false;
                } else if(box.id === id) {
                    // If user clicks on the same box that is already checked,
                    // it CAN'T be un-checked
                    box.checked = true;

                    // Use the clicked box name as a property for the cap type
                    theCanvas.ctx.lineCap = box.name;
                }
            })
        } else {
            boxes = [...this.checkboxes];

            boxes.filter(box => {
                if(box.id === "strLine") {
                    this.strLineChecked = !this.strLineChecked;
                    if(this.strLineChecked) {
                        this.displayNotification("Enabled straight line");
                    } else {
                        this.displayNotification("Disabled straight line");  
                    }
                }
            });
        }
    }

    // Save the drawing
    saveDrawing() {
        this.save.href = theCanvas.canvas.toDataURL();
        this.save.download = "mypainting.png"; 
    }

    // Display changes made to the cap size, drawing color and background fill.
    displayChanges(change, value) {
        const capSizeText = document.querySelector("#current-capSize");
        const drawColorText = document.querySelector("#current-drawColor");
        const fillColorText = document.querySelector("#current-bgColor");

        if(change === "capSize") {
            // Change the text value for the cap size
            capSizeText.textContent = `${theCanvas.ctx.lineWidth}px`;
        } else if (change === "draw-color") {
            drawColorText.textContent = `${theCanvas.ctx.strokeStyle}`;
        } else if (change === "fill-color") {
            fillColorText.textContent = `${value}`;
        } else if (change === "all") {
            capSizeText.textContent = `${theCanvas.ctx.lineWidth}px`;
            drawColorText.textContent = `${theCanvas.ctx.strokeStyle}`;
            fillColorText.textContent = `none`;
        }
    }

    displayNotification(text) {
        // Display notification
        document.querySelector("#notification-text").textContent = text;
        ui.notification.classList.add("notificationActive");
        setTimeout(() => {
            ui.notification.classList.remove("notificationActive");
        }, 1000);
    }
}

export const ui = new Ui();

// About menu event listeners
ui.aboutBtn.addEventListener("click", ui.openAndCloseMenu.bind(ui, "open"));;
ui.closeAbout.addEventListener("click", ui.openAndCloseMenu.bind(ui, "close"));
document.body.addEventListener("keyup", e => {
    e = e || event;
    if (e.keyCode === 27) {
        ui.openAndCloseMenu("close");
    }
})

// Draw menu listeners
ui.startDrawingBtn.addEventListener("click", ui.displayCanvas.bind(ui, "display"));
ui.exit.addEventListener("click", ui.resetData.bind(ui));
ui.save.addEventListener("click", ui.saveDrawing.bind(ui));
ui.checkboxes.forEach(box => box.addEventListener("click", () => {
    const id = box.id;
    const name = box.className;
    ui.filterBoxes(id, name);
}))

// Toggle eraser on and off
ui.eraser.addEventListener("click", () => {    
    ui.eraserToggled = !ui.eraserToggled;
    
    if(ui.eraserToggled) {
        // We save the value of the previously used color before using the eraser
        ui.prevColor = theCanvas.ctx.strokeStyle;

        // We set the stroke color to the default canvas color
        theCanvas.ctx.strokeStyle = "#fff";

        // Display a notification
        ui.displayNotification("Enabled Eraser");
    } else {
        // We restore the stroke color to the saved value
        theCanvas.ctx.strokeStyle = ui.prevColor;
        ui.displayNotification("Disabled Eraser");
    }
})

// Toggle between main menu and new project window that leads towrads the canvas
ui.newProjectBtn.addEventListener("click", ui.displayNewProject.bind(ui, 'display'));
ui.goBackBtn.addEventListener("click", ui.displayNewProject.bind(ui, 'hide'));

document.querySelector("#canvas-size").addEventListener("click", ui.displayNewProject.bind(ui, "display"));