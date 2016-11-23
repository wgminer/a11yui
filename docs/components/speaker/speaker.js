'use strict';

var Speaker = (function (document) {

    var module = {};
    var speaker, timeout, body;

    module.play = function (text) {
        speaker.innerHTML = text;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            speaker.innerHTML = '';
        }, 333);
    }

    module.polite = function (text) {
        speaker.setAttribute('aria-live', 'polite');
        module.play(text);
    }

    module.assert = function (text) {
        speaker.setAttribute('aria-live', 'assertive');
        module.play(text);
    }

    var init = function () {
        body = document.getElementsByTagName('body')[0];
        speaker = document.createElement('div');
        speaker.setAttribute('aria-live', 'polite');
        speaker.style.cssText = `
            border: 0;
            clip: rect(0, 0, 0, 0); 
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        `;
        body.appendChild(speaker);
    };

    init();

    return module;

})(document);

