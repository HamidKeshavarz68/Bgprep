release: all
debug: all
all: ui

ui:
	yarn build
clean:
	rm -f build
