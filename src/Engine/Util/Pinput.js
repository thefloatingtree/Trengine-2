// https://github.com/ichub/pinput
// Heavily modified to use ES6 classes and imports/exports

const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const realState = {
    keyStates: new Array(256),
    mouseStates: new Array(3),
    mousePosition: { x: 0, y: 0 }
}

window.onkeydown = (e) => {
    if (e.which == 18)
        e.preventDefault();
    realState.keyStates[e.which] = true;
};

window.onkeyup = (e) => {
    realState.keyStates[e.which] = false;
};

window.onmousedown = function(e) {
	realState.mouseStates[e.button] = true;
};

window.onmouseup = function(e) {
	realState.mouseStates[e.button] = false;
};

window.onmousemove = function(e) {
	realState.mousePosition.x = e.clientX;
	realState.mousePosition.y = e.clientY;
}

init();

export class Pinput {

    constructor() {
        // creates arrays to store information about the state of 
        // each of the keys. true if pressed, false otherwise. the
        // *previousKeyStates* array is used to store the state of 
        // the keys during the previous update cycle.

        this.keyStates = new Array(256);
        this.previousKeyStates = new Array(256);

        // analogous to *keyStates* and *previousKeyStates* 
        this.mouseStates = new Array(3);
        this.previousMouseStates = new Array(3);

        this.useRealState = false;

        this.mousePosition = {
            x: 0,
            y: 0,
        }

        this.lastMousePosition = {
            x: 0,
            y: 0,
        }

        // initializes all the keyStates to their resting 
        // position - not pressed
        for (var i = 0; i < this.keyStates.length; i++) {
            this.keyStates[i] = false;
            this.previousKeyStates[i] = false;
        }

        // same as *keyStates* initialization
        for (var i = 0; i < this.mouseStates.length; i++) {
            this.mouseStates[i] = false;
            this.previousMouseStates[i] = false;
        }
    }

    isReleased(combo) {
        return !checkCombo(combo, this.mouseStates, this.keyStates) &&
            checkCombo(combo, this.previousMouseStates, this.previousKeyStates);
    }

    isPressed(combo) {
        return checkCombo(combo, this.mouseStates, this.keyStates) &&
            !checkCombo(combo, this.previousMouseStates, this.previousKeyStates);
    }

    isDown(combo) {
        if (this.useRealState) {
            this.mousePosition.x = realState.mousePosition.x;
            this.mousePosition.y = realState.mousePosition.y;
            return checkCombo(combo, realState.mouseStates, realState.keyStates);
        }
        return checkCombo(combo, this.mouseStates, this.keyStates);
    };

    // updates the key and mouse states of the current *pinput* instance.
    // the previous key and mouse states are set to the current ones, and
    // the current ones are set to reflect the actual state of the keyboard
    // and mouse.
    update() {
        this.previousKeyStates = this.keyStates.slice(0);
        this.keyStates = realState.keyStates.slice(0);

        this.previousMouseStates = this.mouseStates.slice(0);
        this.mouseStates = realState.mouseStates.slice(0);

        this.lastMousePosition.x = this.mousePosition.x;
        this.lastMousePosition.y = this.mousePosition.y;

        this.mousePosition.x = realState.mousePosition.x;
        this.mousePosition.y = realState.mousePosition.y;
    };
}

// removes all whitespace from a given string.
function removeWhiteSpace(string) {
    var input = input + "";
    return string.replace(/\s+/, '');
};

// replaces all consecutive instances of whitespace in a given
// string with one space.
function stripWhiteSpace(string) {
    var input = input + "";
    return string.replace(/\s+/, ' ');
};

// converts a string to a keycode
function convertStringToKeycode(key) {
    var key = removeWhiteSpace(key);
    key = key.toUpperCase();

    switch (key) {
        case "BACKSPACE":
            return ['key', 8];
        case "SPACEBAR":
            return ['key', 32];
        case "TAB":
            return ['key', 9];
        case "ENTER":
            return ['key', 13];
        case "SHIFT":
            return ['key', 16];
        case "CONTROL":
            return ['key', 17];
        case "ALT":
            return ['key', 18];
        case "CAPSLOCK":
            return ['key', 20];
        case "ESCAPE":
            return ['key', 27];
        case "PAGEUP":
            return ['key', 33];
        case "PAGEDOWN":
            return ['key', 34];
        case "ARROWLEFT":
            return ['key', 37];
        case "ARROWUP":
            return ['key', 38];
        case "ARROWRIGHT":
            return ['key', 39];
        case "ARROWDOWN":
            return ['key', 40];
        case "INSERT":
            return ['key', 45];
        case "DELETE":
            return ['key', 46];
        case "+":
            return ['key', isFireFox ? 61 : 187];
        case "=":
            return ['key', isFireFox ? 61 : 187];
        case "-":
            return ['key', isFireFox ? 173 : 189];
        case "[":
            return ['key', 219];
        case "]":
            return ['key', 221];
        case "/":
            return ['key', 191];
        case "\\":
            return ['key', 220];
        default:
            return ['key', key.charCodeAt(0)];

    }
};

// same as *convertStringToKeyCombo* but with mouse buttons
function convertStringToButtonCode(buttonCode) {
    var code = removeWhiteSpace(buttonCode);
    code = code.toUpperCase();

    switch (buttonCode) {
        case "MOUSELEFT":
            return ['mouse', 0];
        case "MOUSEMIDDLE":
            return ['mouse', 1];
        case "MOUSERIGHT":
            return ['mouse', 2];
        default:
            return null;
    }
};

function convertStringToCombo(combo) {
    var combo = stripWhiteSpace(combo);
    var tokens = combo.split(' ');
    var keysAndButtons = [];

    for (var i = 0; i < tokens.length; i++) {
        var code = convertStringToButtonCode(tokens[i]);

        if (code != null) {
            keysAndButtons.push(code)
        }
        else {
            keysAndButtons.push(convertStringToKeycode(tokens[i]));
        }
    }

    return keysAndButtons;
}

function checkCombo(combination, mouseStates, keyStates) {
    var combo = convertStringToCombo(combination);

    for (var i = 0; i < combo.length; i++) {
        if (combo[i][0] === 'mouse') {
            if (!mouseStates[combo[i][1]]) {
                return false;
            }
        }
        else {
            if (!keyStates[combo[i][1]]) {
                return false;
            }
        }
    }
    return true;
}

// initializes the *realState* with the default values
function init() {
    for (var i = 0; i < realState.keyStates.length; i++) {
        realState.keyStates[i] = false;
    }

    for (var i = 0; i < realState.mouseStates.length; i++) {
        realState.mouseStates[i] = false;
    }
};