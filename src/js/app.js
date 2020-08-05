// Import modules
import { ui }  from './ui';
import { inputs } from './inputs';
import { history } from './controlHistory';
import { theCanvas }  from './canvas';

// Import SCSS
import '../scss/main';


// Color picker
const colorInfo = document.querySelector("#color-info");
let pickingColor = false;
colorInfo.addEventListener("click", function() {
    pickingColor = !pickingColor;

    // Display notification
    
    if(pickingColor) {
        this.style.color = "#444"
        ui.displayNotification("Enabled color picker");
    } else {
        this.style.color = "#0097e6"
        ui.displayNotification("Disabled color picker");
    }
})

// Get the mouse position in the canvas
function getElementPosition(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

// Get the canvas position
function getEventLocation(element,event){
    const pos = getElementPosition(element);
    
    return {
        x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

// Transform the RGB color to HEX color
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

// Get the color(image) data from the canvas from the clicked location
theCanvas.canvas.addEventListener("click", e => {
    if(!pickingColor) return;
	const eventLocation = getEventLocation(theCanvas.canvas,e);
    // Get the data of the pixel according to the location generate by the getEventLocation function
    const pixelData = theCanvas.ctx.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        coord += " (Transparent color detected, cannot be converted to HEX)";
    }

    // Update the UI with the HEX color value
    let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    document.querySelector("#colorPalette").value = hex;
    theCanvas.ctx.strokeStyle = hex;
    document.querySelector("#current-drawColor").textContent = hex;

    // Reset the color picker color to default
    colorInfo.style.color = "#0097e6";

    // Display a notification for the color picker
    ui.displayNotification("Disabled color picker");

    // Set the color picker to false after user gets the HEX value for the color
    pickingColor = false;
},false);

// Burger menu
const burger = document.querySelector(".burger-menu");
burger.addEventListener("click", () => {
    // Toggle active class on the burger and controls container
    burger.classList.toggle("active");
    document.querySelector(".controls").classList.toggle("controlsActive");

    // Toggle active class on the main section - container for canvas and controls section
    setTimeout(() => {
        document.querySelector("#main").classList.toggle("mainDisplay");
    }, 50);
})

// Info box
const infoBtn = document.querySelector("#info");
const infoBox = document.querySelector(".info-box");
const closeInfoBtn = document.querySelector("#close-info");
infoBtn.addEventListener("click", () => {
    infoBox.style.display = "flex";
})
closeInfoBtn.addEventListener("click", () => {
    infoBox.style.display = "none";
})
