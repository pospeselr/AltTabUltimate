// apis
const Clutter = imports.gi.Clutter;
const St = imports.gi.St;

// gnome shell
const Main = imports.ui.main;
const AltTab = imports.ui.altTab;

const SwitcherPopup = imports.ui.switcherPopup;

// locals
const ExtensionImports = imports.misc.extensionUtils.getCurrentExtension().imports;
const Utilities = ExtensionImports.utilities;

let detours;

function makeDetour(root, prop, func)
{
    let oldValue = root[prop];
    root[prop] = func;
    return {"root" : root, "prop" : prop, "oldValue" : oldValue};
}

function init(metadata) {

}

function enable() {

    global.log("AltTabUltimate: Enable");

    let activeMonitorIndex = Main.layoutManager.primaryIndex;

    detours = [
        // filters out windows which are not on the active monitor
        makeDetour(
            AltTab.WindowSwitcherPopup.prototype,
            "_getWindowList",
            function() {
                // get window list like normal
                let windowList = detours[0].oldValue.call(this);

                // filter out windows based on which monitor they are on
                activeMonitorIndex = Utilities.getActiveMonitorIndex();
                windowList = windowList.filter(function(currentWindow) {
                    return currentWindow.get_monitor() == activeMonitorIndex;
                });
                return windowList;
            }),
        // changes which monitor the alt-tab listing is shown
        makeDetour(
            SwitcherPopup.SwitcherPopup.prototype,
            "_allocate",
            function(actor, box, flags) {
                let childBox = new Clutter.ActorBox();
                let primary = Main.layoutManager.monitors[activeMonitorIndex];

                let leftPadding = this.actor.get_theme_node().get_padding(St.Side.LEFT);
                let rightPadding = this.actor.get_theme_node().get_padding(St.Side.RIGHT);
                let hPadding = leftPadding + rightPadding;

                // Allocate the switcherList
                // We select a size based on an icon size that does not overflow the screen
                let [childMinHeight, childNaturalHeight] = this._switcherList.actor.get_preferred_height(primary.width - hPadding);
                let [childMinWidth, childNaturalWidth] = this._switcherList.actor.get_preferred_width(childNaturalHeight);
                childBox.x1 = Math.max(primary.x + leftPadding, primary.x + Math.floor((primary.width - childNaturalWidth) / 2));
                childBox.x2 = Math.min(primary.x + primary.width - rightPadding, childBox.x1 + childNaturalWidth);
                childBox.y1 = primary.y + Math.floor((primary.height - childNaturalHeight) / 2);
                childBox.y2 = childBox.y1 + childNaturalHeight;
                this._switcherList.actor.allocate(childBox, flags);
            })
    ];
}

function disable() {

    global.log("AltTabUltimate: Disable");

    // restore old values
    for(let i in detours)
    {
        let currentDetour = detours[i];
        currentDetour.root[currentDetour.prop] = currentDetour.oldValue;
    }
}
