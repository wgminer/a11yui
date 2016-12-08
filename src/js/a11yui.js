var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

$(function () {
    'use strict';

    $('.example .tab-list button').click(function () {
        var $this = $(this);
        var $panel = $('#' + $this.attr('data-tab'));
        $('.example .tab.is--active, .example .tab-panel.is--active').removeClass('is--active');
        $this.parents('.tab').addClass('is--active');
        $panel.addClass('is--active');
        hljs.initHighlightingOnLoad();
    })

    $('[data-example]').each(function () {

        var $this = $(this);
        var type = $this.attr('data-example');

        function inject (code) {
            $('#' + type).append('<pre><code>' + code + '</code></pre>');
           
        }

        if (type === 'html') {
            var html = $this[0].innerHTML;
            // console.log(html, html.trim());
            var indent = html.replace(html.trim(), '');
            var lines = html.split('\n');
            var lines = lines.filter(function (value) {
                return value != '';
            });

            lines.forEach(function (line, i) {
                lines[i] = lines[i].replace('        ', '');
                lines[i] = lines[i].replace('  ', '    ');
                console.log(lines[i]);
            });

            console.log(lines);


            var html = lines.join('\n');

            inject(escapeHtml(html));
        }   

        if (type === 'js') {

            $.get($this[0].src, function (js) {
                inject(js);
            });

        }

    });

    hljs.initHighlightingOnLoad();

});