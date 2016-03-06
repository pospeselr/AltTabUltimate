const Main = imports.ui.main;

function Switcher() {
	this._init.apply(this, arguments);
}


Switcher.prototype = {
	_init : function() {

	},

	_startWindowSwitcher : function(display, screen, window, binding) {

		global.log("window switcher started");

		Main.wm._startAppSwitcher(display, screen, window, binding);
	}
};