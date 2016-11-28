$(function () {
    'use strict';

    $('[data-example]').each(function () {

        var $this = $(this);
        var type = $this.attr('data-example');

        function inject (code) {
            $('#' + type).append('<pre><code>' + code + '</code></pre>');
        }

        if (type === 'html') {
            inject($this);
        }   

        if (type === 'js') {

            $.get($this[0].src, function (js) {
                console.log(js);
                inject(js);
            });

        }

    });

});