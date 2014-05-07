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
    @ Fecha : 06/05/2014
    * Elemento progress de progressBar bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgress = (function (_super) {
        __extends(JProgress, _super);
        function JProgress(_JProgressBar) {
            _super.call(this, 'JProgress');

            this.progressBarList = new HtmlObject.JList(this);

            this.add(_JProgressBar);

            this.init();
            _JProgressBar = null;
        }
        JProgress.prototype.init = function () {
            this.addClass(JProgressBarConst.PROGRESS);
        };

        JProgress.prototype.create = function (_id) {
            _id.appendChild(this.getHtml());
            _id = null;
            this.start();
        };

        JProgress.prototype.start = function () {
            var _lenght = this.progressBarList.length;

            if (_lenght > 1) {
                for (var i = _lenght - 1; i >= 0; i--) {
                    var _tmpProgressBar = this.progressBarList.getItem(i);
                    _tmpProgressBar.start();
                    _tmpProgressBar = null;
                }
            } else {
                this.progressBarList.getFirst().start();
            }

            _lenght = null;
        };

        JProgress.prototype.add = function (_JProgressBar) {
            this.progressBarList.add(_JProgressBar);
        };

        JProgress.prototype.isStaked = function () {
            return this.progressBarList.length > 1;
        };

        JProgress.prototype.getProgressBarList = function () {
            return this.progressBarList;
        };

        JProgress.prototype.setProgressBarList = function (_progressBar) {
            this.progressBarList = _progressBar;
            _progressBar = null;
        };

        JProgress.prototype.getHtml = function () {
            return this.toHtml();
        };

        //clone(): JProgress {
        //    var _tmpProgress = this;
        //    //_tmpProgress.progressBarList = _tmpProgress.progressBarList.clone();
        //    _tmpProgress = <JProgress>_tmpProgress.cloneElement();
        //    return _tmpProgress;
        //}
        JProgress.prototype.finalize = function () {
            this.progressBarList.destroy();
            this.progressBarList = null;
            this.expire();
        };
        return JProgress;
    })(HtmlObject.div);
    exports.JProgress = JProgress;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 22 - 03 - 2014
    * Elemento progressBar de progressBar bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressBar = (function (_super) {
        __extends(JProgressBar, _super);
        function JProgressBar(_valueNow, _label) {
            _super.call(this, 'JProgressBar');

            this.content = new HtmlObject.span('JContent');
            this.content.setInnerHtml(_label);
            this.contentLegend = new HtmlObject.span('JContentLegend');

            this.loadedAnimated = true;
            this.showLabel = true;
            this.legend = true;

            this.valueMin = 0;
            this.valueMax = 100;
            this.valueMilliSeconds = 105;
            this.setValueNow(_valueNow);

            this.init();

            _label = _valueNow = null;
        }
        JProgressBar.prototype.init = function () {
            this.addClass(JProgressBarConst.PROGRESS_BAR);
            this.addClass(HtmlObject.JStyle.JQ_FILL_LEFT_IN);

            if (!this.isShowLabel()) {
                this.content.addClass(JProgressBarConst.SR_ONLY);
            }

            if (!this.isLegend()) {
                this.contentLegend.addClass(JProgressBarConst.SR_ONLY);
            }

            this.contentLegend.getStyle().marginLeft = '0.5%';
            this.contentLegend.setInnerHtml(this.valueNow + '%');

            this.appendElement(this.content);
            this.appendElement(this.contentLegend);
        };

        JProgressBar.prototype.create = function (_id) {
            _id.appendChild(this.getHtml());
            _id = null;

            if (this.isLoadedAnimated()) {
                this.start();
            } else {
                this.setCssWidth(this.valueNow + '%');
            }
        };

        JProgressBar.prototype.start = function () {
            var _this = this;
            if (this.isLoadedAnimated()) {
                window.setTimeout(function () {
                    _this.setCssWidth(_this.valueNow + '%');
                }, this.valueMilliSeconds);
            } else {
                this.setCssWidth(this.valueNow + '%');
            }
        };

        JProgressBar.prototype.isRangeValid = function (_value) {
            return _value >= this.valueMin && _value <= this.valueMax;
        };
        JProgressBar.prototype.getContent = function () {
            return this.content;
        };

        JProgressBar.prototype.setContent = function (_content) {
            this.content = _content;
            _content = null;
        };

        JProgressBar.prototype.isLoadedAnimated = function () {
            return this.loadedAnimated;
        };

        JProgressBar.prototype.setLoadedAnimated = function (_loadedAnimated) {
            this.loadedAnimated = _loadedAnimated;
            _loadedAnimated = null;
        };

        JProgressBar.prototype.getValueNow = function () {
            return this.valueNow;
        };

        JProgressBar.prototype.setValueNow = function (_valueNow) {
            if (this.isRangeValid(_valueNow)) {
                if (this.isLoadedAnimated()) {
                    this.valueNow = _valueNow;
                } else {
                    this.valueNow = _valueNow;
                    this.setCssWidth(this.valueNow + '%');
                }
            } else {
                throw new Error('El valor especificado esta fuera del rango permitido !');
            }
            _valueNow = null;
        };

        JProgressBar.prototype.getValueMin = function () {
            return this.valueMin;
        };

        JProgressBar.prototype.setValueMin = function (_valueMin) {
            this.valueMin = _valueMin;
            _valueMin = null;
        };

        JProgressBar.prototype.getValueMax = function () {
            return this.valueMax;
        };

        JProgressBar.prototype.setValueMax = function (_valueMax) {
            this.valueMax = _valueMax;
            _valueMax = null;
        };

        JProgressBar.prototype.getValueMilliSeconds = function () {
            return this.valueMilliSeconds;
        };

        JProgressBar.prototype.setValueMilliSeconds = function (_milliSeconds) {
            this.valueMilliSeconds = _milliSeconds;
        };

        JProgressBar.prototype.isShowLabel = function () {
            return this.showLabel;
        };

        JProgressBar.prototype.setShowLabel = function (_showLabel) {
            this.showLabel = _showLabel;
            if (!this.showLabel) {
                this.content.addClass(JProgressBarConst.SR_ONLY);
            }
            _showLabel = null;
        };

        JProgressBar.prototype.isLegend = function () {
            return this.legend;
        };

        JProgressBar.prototype.setLegend = function (_legend) {
            this.legend = _legend;
            if (!this.legend) {
                this.contentLegend.addClass(JProgressBarConst.SR_ONLY);
            }
            _legend = null;
        };

        JProgressBar.prototype.getContentLegend = function () {
            return this.contentLegend;
        };

        JProgressBar.prototype.isContentLegend = function (_contentLegend) {
            this.contentLegend = _contentLegend;
            _contentLegend = null;
        };

        //clone(): JProgressBar {
        //    return this.clone();
        //}
        JProgressBar.prototype.getHtml = function () {
            return this.toHtml();
        };

        JProgressBar.prototype.finalize = function () {
            this.loadedAnimated = null;
            this.showLabel = null;
            this.valueNow = null;
            this.valueMin = null;
            this.valueMax = null;
            this.valueMilliSeconds = null;
            this.content.expire();
            this.contentLegend.expire();
            this.content = null;
            this.contentLegend = null;
            this.expire();
        };
        return JProgressBar;
    })(HtmlObject.div);
    exports.JProgressBar = JProgressBar;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso success bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressBarSuccess = (function (_super) {
        __extends(JProgressBarSuccess, _super);
        function JProgressBarSuccess(_valueNow, _label) {
            _super.call(this, _valueNow, _label);
            _valueNow = _label = null;
            this.addClass(JProgressBarConst.PROGRESS_BAR_SUCCESS);
        }
        return JProgressBarSuccess;
    })(JProgressBar);
    exports.JProgressBarSuccess = JProgressBarSuccess;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso info bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressBarInfo = (function (_super) {
        __extends(JProgressBarInfo, _super);
        function JProgressBarInfo(_valueNow, _label) {
            _super.call(this, _valueNow, _label);
            _valueNow = _label = null;
            this.addClass(JProgressBarConst.PROGRESS_BAR_INFO);
        }
        return JProgressBarInfo;
    })(JProgressBar);
    exports.JProgressBarInfo = JProgressBarInfo;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso Warning bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressBarWarning = (function (_super) {
        __extends(JProgressBarWarning, _super);
        function JProgressBarWarning(_valueNow, _label) {
            _super.call(this, _valueNow, _label);
            _valueNow = _label = null;
            this.addClass(JProgressBarConst.PROGRESS_BAR_WARNING);
        }
        return JProgressBarWarning;
    })(JProgressBar);
    exports.JProgressBarWarning = JProgressBarWarning;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso Danger bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressBarDanger = (function (_super) {
        __extends(JProgressBarDanger, _super);
        function JProgressBarDanger(_valueNow, _label) {
            _super.call(this, _valueNow, _label);
            _valueNow = _label = null;
            this.addClass(JProgressBarConst.PROGRESS_BAR_DANGER);
        }
        return JProgressBarDanger;
    })(JProgressBar);
    exports.JProgressBarDanger = JProgressBarDanger;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso striped success bootstrap (http://getbootstrap.com/components/#progress)
    **/
    var JProgressStriped = (function (_super) {
        __extends(JProgressStriped, _super);
        function JProgressStriped(_JProgressBar) {
            _super.call(this, _JProgressBar);
            _JProgressBar;
            this.addClass(JProgressBarConst.PROGRESS_STRIPED);
            this.setAnimated(false);
        }
        JProgressStriped.prototype.isAnimated = function () {
            return this.animated;
        };

        JProgressStriped.prototype.setAnimated = function (_animated) {
            this.animated = _animated;
            if (this.isAnimated()) {
                this.addClass(JProgressBarConst.ACTIVE);
            } else {
                this.removeClass(JProgressBarConst.ACTIVE);
            }
        };
        return JProgressStriped;
    })(JProgress);
    exports.JProgressStriped = JProgressStriped;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 21 - 03 - 2014
    * Barra de progreso striped info bootstrap (http://getbootstrap.com/components/#progress)
    **/
    //export class JProgressStripedInfo extends JProgressInfo {
    //    private animated: boolean;
    //    constructor(_JProgressBar:JProgressBar) {
    //        super(_JProgressBar);
    //        this.addClass(JProgressBarConst.PROGRESS_STRIPED);
    //        this.setAnimated(false);
    //    }
    //    isAnimated(): boolean {
    //        return this.animated;
    //    }
    //    setAnimated(_animated: boolean) {
    //        this.animated = _animated;
    //        if (this.isAnimated()) {
    //            this.addClass(JProgressBarConst.ACTIVE);
    //        } else {
    //            this.removeClass(JProgressBarConst.ACTIVE);
    //        }
    //    }
    //}
    ///**
    //@ Autor : Yonatan Alexis Quintero Rodriguez
    //@ Version: 0.1
    //@ Fecha : 21 - 03 - 2014
    //* Barra de progreso striped warning bootstrap (http://getbootstrap.com/components/#progress)
    //**/
    //export class JProgressStripedWarning extends JProgressWarning {
    //    private animated: boolean;
    //    constructor(_JProgressBar:JProgressBar) {
    //        super(_JProgressBar);
    //        this.addClass(JProgressBarConst.PROGRESS_STRIPED);
    //        this.setAnimated(false);
    //    }
    //    isAnimated(): boolean {
    //        return this.animated;
    //    }
    //    setAnimated(_animated: boolean) {
    //        this.animated = _animated;
    //        if (this.isAnimated()) {
    //            this.addClass(JProgressBarConst.ACTIVE);
    //        } else {
    //            this.removeClass(JProgressBarConst.ACTIVE);
    //        }
    //    }
    //}
    ///**
    //@ Autor : Yonatan Alexis Quintero Rodriguez
    //@ Version: 0.1
    //@ Fecha : 21 - 03 - 2014
    //* Barra de progreso striped danger bootstrap (http://getbootstrap.com/components/#progress)
    //**/
    //export class JProgressStripedDanger extends JProgressDanger {
    //    private animated: boolean;
    //   constructor(_JProgressBar:JProgressBar) {
    //        super(_JProgressBar);
    //        this.addClass(JProgressBarConst.PROGRESS_STRIPED);
    //        this.setAnimated(false);
    //    }
    //    isAnimated(): boolean {
    //        return this.animated;
    //    }
    //    setAnimated(_animated: boolean) {
    //        this.animated = _animated;
    //        if (this.isAnimated()) {
    //            this.addClass(JProgressBarConst.ACTIVE);
    //        } else {
    //            this.removeClass(JProgressBarConst.ACTIVE);
    //        }
    //    }
    //}
    /**Se crea clase de constantes para progress bar de bootstrap, sabiendo que solo se van a usar con progressbar***/
    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 19 - 03 - 2014
    * clases progress bar bootstrap
    **/
    var JProgressBarConst = (function () {
        function JProgressBarConst() {
        }
        JProgressBarConst.PROGRESS = 'progress';
        JProgressBarConst.PROGRESS_BAR = 'progress-bar';
        JProgressBarConst.SR_ONLY = 'sr-only';
        JProgressBarConst.PROGRESS_BAR_SUCCESS = 'progress-bar-success';
        JProgressBarConst.PROGRESS_BAR_INFO = 'progress-bar-info';
        JProgressBarConst.PROGRESS_BAR_WARNING = 'progress-bar-warning';
        JProgressBarConst.PROGRESS_BAR_DANGER = 'progress-bar-danger';
        JProgressBarConst.PROGRESS_STRIPED = 'progress-striped';
        JProgressBarConst.ACTIVE = "active";
        return JProgressBarConst;
    })();
    exports.JProgressBarConst = JProgressBarConst;
});
