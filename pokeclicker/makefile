# JS files
JS_TARGET	:= 1_combined.js

JS_SOURCES 	:= 	berry.js \
				dungeon.js \
				hatchery.js \
				poke.js \
				gym.js \
				shopping.js

all:
	grep -h -v '^import.*;' $(JS_SOURCES) > $(JS_TARGET)