INSTALL_PATH = ~/.local/share/gnome-shell/extensions
INSTALL_NAME = AltTabUltimate@pospeselr.com

install: build
	rm -rf $(INSTALL_PATH)/$(INSTALL_NAME)
	mkdir -p $(INSTALL_PATH)/$(INSTALL_NAME)
	cp -r _build/* $(INSTALL_PATH)/$(INSTALL_NAME)
	rm -rf _build
	echo Installed in $(INSTALL_PATH)/$(INSTALL_NAME)

build: compile-schema
	rm -rf _build
	mkdir _build
	cp -r $(INSTALL_NAME)/* _build
	echo Build was successfull

compile-schema: ./$(INSTALL_NAME)/schemas/org.gnome.shell.extensions.alttabultimate.gschema.xml
	glib-compile-schemas $(INSTALL_NAME)/schemas

clean:
	rm -rf _build
