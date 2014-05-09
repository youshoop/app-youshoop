
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '.././htmlObject/HtmlObject'], function(require, exports, HtmlObject) {
    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 22 - 03 - 2014
    * Elemento progress de jumbotron bootstrap (http://getbootstrap.com/components/#jumbotron)
    **/
    var JJumbotron = (function (_super) {
        __extends(JJumbotron, _super);
        function JJumbotron() {
            _super.call(this, 'jjumbotron');

            this.addClass('jumbotron');
        }
        JJumbotron.prototype.init = function () {
        };

        JJumbotron.prototype.create = function (_id) {
            _id.appendChild(this.getHtml());
            _id = null;
        };

        JJumbotron.prototype.getHtml = function () {
            return this.toHtml();
        };

        JJumbotron.prototype.finalize = function () {
            this.expire();
        };
        return JJumbotron;
    })(HtmlObject.div);
    exports.JJumbotron = JJumbotron;
});

