const ExtensionImports = imports.misc.extensionUtils.getCurrentExtension().imports;
const Utilities = ExtensionImports.utilities;

const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;

const AltTab = imports.ui.altTab;

function Switcher() {
    this._init.apply(this, arguments);
}

Switcher.prototype = {
    _init : function() {

    },

    enable : function() {

        let startSwitcher = Lang.bind(this, this._startSwitcher);
        Utilities.setKeybinding('switch-applications', startSwitcher);
        Utilities.setKeybinding('switch-group', startSwitcher);
        Utilities.setKeybinding('switch-applications-backward', startSwitcher);
        Utilities.setKeybinding('switch-group-backward', startSwitcher);
    },

    disable : function() {

        global.log("AltTabUltimate: Disable");

        Utilities.setKeybinding('switch-applications', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.setKeybinding('switch-group', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.setKeybinding('switch-applications-backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.setKeybinding('switch-group-backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
    },

    _startSwitcher : function(display, screen, window, binding) {

        global.log("Switcher started");

        Main.wm._startAppSwitcher(display, screen, window, binding);
    }
};