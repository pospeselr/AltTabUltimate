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
        Utilities.SetKeybinding('switch-applications', startSwitcher);
        Utilities.SetKeybinding('switch-group', startSwitcher);
        Utilities.SetKeybinding('switch-applications-backward', startSwitcher);
        Utilities.SetKeybinding('switch-group-backward', startSwitcher);
    },

    disable : function() {

        global.log("AltTabUltimate: Disable");

        Utilities.SetKeybinding('switch-applications', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.SetKeybinding('switch-group', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.SetKeybinding('switch-applications-backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
        Utilities.SetKeybinding('switch-group-backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
    },

    _startSwitcher : function(display, screen, window, binding) {

        global.log("Switcher started");

        Main.wm._startAppSwitcher(display, screen, window, binding);
    }
};