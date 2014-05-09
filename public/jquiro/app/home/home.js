
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 06/05/2014
* Lista de eventos javascript
**/
define(["require", "exports", '../.././com/htmlObject/HtmlObject', '../.././com/jumbotron/JJumbotron'], function(require, exports, HtmlObject, JumbotronMD) {
    var home = (function () {
        function home() {
            this.body = document.getElementById('home');

            this.init();
        }
        home.prototype.init = function () {
            this.createHeader();
        };

        home.prototype.createHeader = function () {
            this.header = new HtmlObject.header();
            this.header.addClass('container-fluid');
            this.body.appendChild(this.header.toHtml());

            var row_div_1 = new HtmlObject.div();
            row_div_1.addClass('col_md_8');

            this.header.appendElement(row_div_1);

            var jumbotron = new JumbotronMD.JJumbotron();
            jumbotron.create(row_div_1.toHtml());
        };
        return home;
    })();
    exports.home = home;
});

