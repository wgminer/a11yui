var Modal = (function (document) {
    'use strict';

    var body = document.getElementsByTagName('body')[0];
    var triggers = document.querySelectorAll('[data-open-modal]');

    var siblings = function(node, children) {
        var children = [].slice.call(node.parentNode.childNodes);
        return children.filter(function(child) {
            return node != child && child.nodeType === 1;
        });
    }

    var init = function(trigger) {

        var modalSelector = trigger.getAttribute('data-open-modal');
        var modal = document.querySelectorAll(modalSelector)[0];
        var trapStart = modal.querySelectorAll('[data-trap-start]')[0];
        var trapEnd = modal.querySelectorAll('[data-trap-end]')[0];

        var open = function () {

            // 1. Add no scroll class
            body.className += ' u--no-scroll';

            // 2. Aria hide adjacent elements
            siblings(modal).forEach(function (sibling) {
                sibling.setAttribute('aria-hidden', true);
            });

            // 3. Show modal
            modal.style.display = 'block';

            // 4. Focus the first :focusable element
            modal.querySelectorAll('[data-open-focus]')[0].focus();

            // 5. Setup focus trap
            trapEnd.addEventListener('keydown', function (e) {
                if (e.which == 9 && !e.shiftKey) {
                    e.preventDefault(); 
                    trapStart.focus();
                }
            });

            trapStart.addEventListener('keydown', function (e) {
                if (e.shiftKey && e.keyCode == 9) {
                    e.preventDefault(); 
                    trapEnd.focus();
                }
            });

            // 6. Setup closing modal listeners

            // Close on esc
            document.addEventListener('keyup', function(e) {
                if (e.keyCode == 27) {
                    close();
                }
            });

            // Close on modal-overlay click
            modal.addEventListener('click', function (e) {
                if (e.target == modal) {
                    close();
                }
            });


            // Close on any other data-close-modal attributed elements
            modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
                el.addEventListener('click', function (e) {
                    close();
                });
            });
            
        }

        var close = function () {

            // 1. Hide the modal
            modal.style.display = 'none';

            // 2. Nullify the aria-hidden on siblings
            siblings(modal).forEach(function (sibling) {
                sibling.setAttribute('aria-hidden', false);
            });
            
            // 3. Remove the no-scroll on the <body>
            body.className = body.className.replace(' u--no-scroll', '');

            // 4. place :focus back on the trigger
            trigger.focus();
            
        }

        trigger.addEventListener('click', function (e) {
            open();
        });

    }

    triggers.forEach(init);

})(document);