'use strict';

var Modal = (function () {

    var body = document.getElementsByTagName('body')[0];
    var triggers = document.querySelectorAll('[data-open-modal]');

    var init = function(trigger) {

        var modalSelector = trigger.getAttribute('data-open-modal');
        var modal = document.querySelectorAll(modalSelector)[0];
        var trapStart = modal.querySelectorAll('[data-trap-start]')[0];
        var trapEnd = modal.querySelectorAll('[data-trap-end]')[0];
        var listeners = [];

        console.log('Setup');

        var open = function () {

            console.log('Opening modal!');

            // 1. Add no scroll class
            body.className += ' u--no-scroll';

            // 2. Aria hide adjacent elements
            // $modal.siblings().attr('aria-hidden', true);

            // 3. Show modal
            modal.style.display = 'block';

            // 4. Focus the first :focusable element
            modal.querySelectorAll('[data-open-focus]')[0].focus();

            // 5. Setup focus trap
            listeners.push({element: trapEnd, event: 'keydown'});
            trapEnd.addEventListener('keydown', function (e) {
                if (e.which == 9 && !e.shiftKey) {
                    e.preventDefault(); 
                    trapStart.focus();
                }
            });

            listeners.push({element: trapStart, event: 'keydown'});
            trapStart.addEventListener('keydown', function (e) {
                if (e.shiftKey && e.keyCode == 9) {
                    e.preventDefault(); 
                    trapEnd.focus();
                }
            });

            // 6. Setup closing modal listeners
            document.addEventListener('keyup', function(e) {
                if (e.keyCode == 27) {
                    close();
                }
            });

            modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
                el.addEventListener('click', function (e) {
                    close();
                });
            });
            
        }

        var close = function () {

            modal.style.display = 'none';

            // $modal.siblings().attr('aria-hidden', false);
            
            body.className = body.className.replace(' u--no-scroll', '');

            trigger.focus();
            
            console.log('close!');
        }

        open();

    }

    triggers.forEach(init);

})();