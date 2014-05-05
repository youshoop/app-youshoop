/// <reference path=".././base_component/JQElement.ts" />
import jqE = require('.././base_component/JQElement');

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 22 - 03 - 2014
* Elemento progress de progressBar bootstrap (http://getbootstrap.com/components/#progress)
**/

export class jqProgress extends jqE.div implements jqE.IJQElement {

    private progressBarList: jqE.jqList<jqProgressBar>;

    constructor(_jqProgressBar:jqProgressBar) {

        super('jqProgress');

        this.progressBarList = new jqE.jqList<jqProgressBar>(this);

        this.add(_jqProgressBar);

        this.init();
        _jqProgressBar = null;
    }

    init() {

        this.addClass(jqProgressBarConst.PROGRESS);
    }

    create(_id: HTMLElement) {

        _id.appendChild(this.getHtml());
        _id = null;
        this.start();
    }

    start() {

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
    }

    add(_jqProgressBar: jqProgressBar) {

        this.progressBarList.add(_jqProgressBar);
    }

    isStaked(): boolean {

        return this.progressBarList.length > 1;
    }

    getProgressBarList(): jqE.jqList<jqProgressBar> {

        return this.progressBarList;
    }

    setProgressBarList(_progressBar: jqE.jqList<jqProgressBar>) {

        this.progressBarList = _progressBar;
        _progressBar = null;
    }

    getHtml(): HTMLElement {

        return this.toHtml();
    }

    //clone(): jqProgress {

    //    var _tmpProgress = this;
    //    //_tmpProgress.progressBarList = _tmpProgress.progressBarList.clone();
    //    _tmpProgress = <jqProgress>_tmpProgress.cloneElement();

    //    return _tmpProgress;
    //}

    finalize() {

        this.progressBarList.destroy();
        this.progressBarList = null;
        this.expire();
    }


}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 22 - 03 - 2014
* Elemento progressBar de progressBar bootstrap (http://getbootstrap.com/components/#progress)
**/

export class jqProgressBar extends jqE.div implements jqE.IJQElement {

    private content: jqE.span;
    private contentLegend: jqE.span;
    private loadedAnimated: boolean;
    private showLabel: boolean;
    private legend: boolean;
    private valueNow: number;
    private valueMin: number;
    private valueMax: number;
    private valueMilliSeconds: number;

    constructor(_valueNow: number, _label: string) {

        super('jqProgressBar');

        this.content = new jqE.span('jqContent');
        this.content.setInnerHtml(_label);
        this.contentLegend = new jqE.span('jqContentLegend');

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

    init() {

        this.addClass(jqProgressBarConst.PROGRESS_BAR);
        this.addClass(jqE.jqStyle.JQ_FILL_LEFT_IN);

        if (!this.isShowLabel()) {

            this.content.addClass(jqProgressBarConst.SR_ONLY);
        }

        if (!this.isLegend()) {

            this.contentLegend.addClass(jqProgressBarConst.SR_ONLY);
        }

        this.contentLegend.getStyle().marginLeft = '0.5%';
        this.contentLegend.setInnerHtml(this.valueNow + '%');

        this.appendElement(this.content);
        this.appendElement(this.contentLegend);
    }

    create(_id: HTMLElement) {

        _id.appendChild(this.getHtml());
        _id = null;

        if (this.isLoadedAnimated()) {

            this.start();

        } else {

            this.setCssWidth(this.valueNow + '%');
        }



    }

    start() {

        if (this.isLoadedAnimated()) {

            window.setTimeout(() => {

                this.setCssWidth(this.valueNow + '%');

            }, this.valueMilliSeconds);

        } else {

            this.setCssWidth(this.valueNow + '%');
        }
    }

    isRangeValid(_value: number): boolean {

        return _value >= this.valueMin && _value <= this.valueMax;
    }
    getContent(): jqE.span {

        return this.content;
    }

    setContent(_content: jqE.span) {

        this.content = _content;
        _content = null;
    }

    isLoadedAnimated() {

        return this.loadedAnimated;
    }

    setLoadedAnimated(_loadedAnimated) {

        this.loadedAnimated = _loadedAnimated;
        _loadedAnimated = null;
    }

    getValueNow(): number {

        return this.valueNow;
    }

    setValueNow(_valueNow: number) {

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
    }

    getValueMin(): number {

        return this.valueMin;
    }

    setValueMin(_valueMin: number) {

        this.valueMin = _valueMin
        _valueMin = null;
    }

    getValueMax(): number {

        return this.valueMax;
    }

    setValueMax(_valueMax: number) {

        this.valueMax = _valueMax
        _valueMax = null;
    }

    getValueMilliSeconds(): number {

        return this.valueMilliSeconds;
    }

    setValueMilliSeconds(_milliSeconds: number) {

        this.valueMilliSeconds = _milliSeconds;
    }

    isShowLabel(): boolean {

        return this.showLabel;
    }

    setShowLabel(_showLabel: boolean) {

        this.showLabel = _showLabel;
        if (!this.showLabel) {

            this.content.addClass(jqProgressBarConst.SR_ONLY);
        }
        _showLabel = null;
    }

    isLegend(): boolean {

        return this.legend;
    }

    setLegend(_legend: boolean) {

        this.legend = _legend;
        if (!this.legend) {

            this.contentLegend.addClass(jqProgressBarConst.SR_ONLY);
        }
        _legend = null;
    }

    getContentLegend(): jqE.span {

        return this.contentLegend;
    }

    isContentLegend(_contentLegend: jqE.span) {

        this.contentLegend = _contentLegend;
        _contentLegend = null;
    }

    //clone(): jqProgressBar {

    //    return this.clone();
    //}

    getHtml(): HTMLElement {

        return this.toHtml();

    }

    finalize() {

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
    }
}



/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso success bootstrap (http://getbootstrap.com/components/#progress)
**/
export class jqProgressBarSuccess extends jqProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(jqProgressBarConst.PROGRESS_BAR_SUCCESS);

    }
}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso info bootstrap (http://getbootstrap.com/components/#progress)
**/
export class jqProgressBarInfo extends jqProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(jqProgressBarConst.PROGRESS_BAR_INFO);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso Warning bootstrap (http://getbootstrap.com/components/#progress)
**/
export class jqProgressBarWarning extends jqProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(jqProgressBarConst.PROGRESS_BAR_WARNING);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso Danger bootstrap (http://getbootstrap.com/components/#progress)
**/
export class jqProgressBarDanger extends jqProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(jqProgressBarConst.PROGRESS_BAR_DANGER);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso striped success bootstrap (http://getbootstrap.com/components/#progress)
**/
export class jqProgressStriped extends jqProgress {

    private animated: boolean;

    constructor(_jqProgressBar:jqProgressBar) {

        super(_jqProgressBar);
        _jqProgressBar;
        this.addClass(jqProgressBarConst.PROGRESS_STRIPED);
        this.setAnimated(false);

    }

    isAnimated(): boolean {

        return this.animated;
    }

    setAnimated(_animated: boolean) {        
      
        this.animated = _animated;
        if (this.isAnimated()) {

            this.addClass(jqProgressBarConst.ACTIVE);

        } else {

            this.removeClass(jqProgressBarConst.ACTIVE);
        }
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso striped info bootstrap (http://getbootstrap.com/components/#progress)
**/
//export class jqProgressStripedInfo extends jqProgressInfo {

//    private animated: boolean;

//    constructor(_jqProgressBar:jqProgressBar) {

//        super(_jqProgressBar);
//        this.addClass(jqProgressBarConst.PROGRESS_STRIPED);

//        this.setAnimated(false);

//    }

//    isAnimated(): boolean {

//        return this.animated;
//    }

//    setAnimated(_animated: boolean) {

//        this.animated = _animated;
//        if (this.isAnimated()) {

//            this.addClass(jqProgressBarConst.ACTIVE);

//        } else {

//            this.removeClass(jqProgressBarConst.ACTIVE);
//        }
//    }
//}
///**
//@ Autor : Yonatan Alexis Quintero Rodriguez
//@ Version: 0.1
//@ Fecha : 21 - 03 - 2014
//* Barra de progreso striped warning bootstrap (http://getbootstrap.com/components/#progress)
//**/
//export class jqProgressStripedWarning extends jqProgressWarning {

//    private animated: boolean;

//    constructor(_jqProgressBar:jqProgressBar) {

//        super(_jqProgressBar);
//        this.addClass(jqProgressBarConst.PROGRESS_STRIPED);

//        this.setAnimated(false);

//    }

//    isAnimated(): boolean {

//        return this.animated;
//    }

//    setAnimated(_animated: boolean) {

//        this.animated = _animated;
//        if (this.isAnimated()) {

//            this.addClass(jqProgressBarConst.ACTIVE);

//        } else {

//            this.removeClass(jqProgressBarConst.ACTIVE);
//        }
//    }
//}
///**
//@ Autor : Yonatan Alexis Quintero Rodriguez
//@ Version: 0.1
//@ Fecha : 21 - 03 - 2014
//* Barra de progreso striped danger bootstrap (http://getbootstrap.com/components/#progress)
//**/
//export class jqProgressStripedDanger extends jqProgressDanger {

//    private animated: boolean;

//   constructor(_jqProgressBar:jqProgressBar) {

//        super(_jqProgressBar);
//        this.addClass(jqProgressBarConst.PROGRESS_STRIPED);

//        this.setAnimated(false);

//    }

//    isAnimated(): boolean {

//        return this.animated;
//    }

//    setAnimated(_animated: boolean) {

//        this.animated = _animated;
//        if (this.isAnimated()) {

//            this.addClass(jqProgressBarConst.ACTIVE);

//        } else {

//            this.removeClass(jqProgressBarConst.ACTIVE);
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

export class jqProgressBarConst {

    static PROGRESS = 'progress';
    static PROGRESS_BAR = 'progress-bar';
    static SR_ONLY = 'sr-only';
    static PROGRESS_BAR_SUCCESS = 'progress-bar-success';
    static PROGRESS_BAR_INFO = 'progress-bar-info';
    static PROGRESS_BAR_WARNING = 'progress-bar-warning';
    static PROGRESS_BAR_DANGER = 'progress-bar-danger';
    static PROGRESS_STRIPED = 'progress-striped';
    static ACTIVE = "active";

}
