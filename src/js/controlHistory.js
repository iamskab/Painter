import { theCanvas } from './canvas';
import { ui } from './ui';

class History { 
    constructor() {
        this.redo_list = [];
        this.undo_list = [];
        
        // Undo & Redo buttons
        this.undoBtn = document.querySelector("#undo");
        this.redoBtn = document.querySelector("#redo");
    }

    // Save the state
    saveState(canvas, list, keep_redo) {
        keep_redo = keep_redo || false;
        if(!keep_redo) {
            this.redo_list = [];
        }
        
        (list || this.undo_list).push(canvas.toDataURL());  
    }

    // Undo action
    undo(canvas, ctx) {
        this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
        ui.displayNotification("Undo");
    }

    // Redo action
    redo(canvas, ctx) {
      this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
      ui.displayNotification("Redo");        
    }

    // Restore the state
    restoreState(canvas, ctx, pop, push) {
        if(pop.length) {
            this.saveState(canvas, push, true);
            var restore_state = pop.pop();
            const src = restore_state;
    
            const img = new Image();
            img.setAttribute('src', src);
            img.onload = function() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  
            }
        }
    }
    
    // Call undo / redo with keyboards
    keyCapture(e) { 
        e = e || event;

        // Ctrl + Z combination
        if(e.ctrlKey && e.keyCode === 90) {
            this.undo(cvs, ctx);
        }
        
        // Ctrl + Y combination
        if (e.ctrlKey && e.keyCode === 89) {
            this.redo(cvs, ctx);
        }
    }
}

export const history = new History();
const cvs = theCanvas.canvas;
const ctx = theCanvas.ctx;

history.undoBtn.addEventListener("click", history.undo.bind(history, cvs, ctx));
history.redoBtn.addEventListener("click", history.redo.bind(history, cvs, ctx));
theCanvas.canvas.addEventListener("mousedown", () => history.saveState(cvs));
document.addEventListener("keyup", history.keyCapture.bind(history));
