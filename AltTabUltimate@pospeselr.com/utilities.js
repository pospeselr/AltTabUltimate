const Main = imports.ui.main;
const Shell = imports.gi.Shell;

/* prints all of an object's properties */
function PrintProps(name, object) {
    global.log(name + ": " + object);
    for(let prop in object) {
        global.log(" " + prop);
    }
}

/* sets key binding handler */
function SetKeybinding(name, func) {
    Main.wm.setCustomKeybindingHandler(name, Shell.ActionMode.NORMAL, func);
}

/* gets index of monitor mouse cursor is currently on, returns primary monitor on error */
function getActiveMonitor: function() {
    let x, y, mask;
    [x, y, mask] = global.get_pointer();
    try {
        for each (var currentMonitor in Main.layoutManager.monitors){
            var minX = currentMonitor.x;
            var minY = currentMonitor.y;
            var maxX = minX + currentMonitor.width;
            var maxY = minY + currentMonitor.height;

            if(x >= minX && x < maxX && y >= minY && y < maxY) {
                return currentMonitor;
            }
        }
    } catch(e) {
        global.log("caught: " + e);
    }

    return Main.layoutManager.primaryMonitor;
},