const ExtensionImports = imports.misc.extensionUtils.getCurrentExtension().imports;
const Utilities = ExtensionImports.utilities;

const Clutter = imports.gi.Clutter;


const Main = imports.ui.main;

let switcher;

function init(metadata) {

}

function enable() {

    global.log("AltTabUltimate: Enable");

    switcher = new ExtensionImports.switcher.Switcher();
    switcher.enable()
}

function disable() {

    global.log("AltTabUltimate: Disable");

    switcher.disable();
}
