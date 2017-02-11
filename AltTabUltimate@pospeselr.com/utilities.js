const Main = imports.ui.main;
const Shell = imports.gi.Shell;

/* prints all of an object's properties */
function printProps(name, object) {
    global.log(name + ": " + object);
    for(let prop in object) {
        global.log(" " + prop);
    }
}

/* sets key binding handler */
function setKeybinding(name, func) {
    Main.wm.setCustomKeybindingHandler(name, Shell.ActionMode.NORMAL, func);
}

/* gets index of monitor mouse cursor is currently on, returns primary monitor on error */
function getActiveMonitorIndex() {
    let x, y, mask;
    [x, y, mask] = global.get_pointer();
    try {
        for (let i in Main.layoutManager.monitors){
            let currentMonitor = Main.layoutManager.monitors[i];

            let minX = currentMonitor.x;
            let minY = currentMonitor.y;
            let maxX = minX + currentMonitor.width;
            let maxY = minY + currentMonitor.height;

            if(x >= minX && x < maxX && y >= minY && y < maxY) {
                return i;
            }
        }
    } catch(e) {
        global.log("caught: " + e);
    }

    return Main.layoutManager.primaryIndex;
}

function getActiveMonitor() {
    return Main.layoutManager.monitors[getActiveMonitorIndex()];
}