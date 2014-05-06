/// <reference path=".././htmlObject/HtmlObject.ts" />
import HtmlObject = require('.././htmlObject/HtmlObject');

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 22 - 03 - 2014
* Elemento progress de progressBar bootstrap (http://getbootstrap.com/components/#progress)
**/

export class JProgress extends HtmlObject.div implements HtmlObject.IHtmlObjectElement {

    private progressBarList: HtmlObject.JList<JProgressBar>;

    constructor(_JProgressBar:JProgressBar) {

        super('JProgress');

        this.progressBarList = new HtmlObject.JList<JProgressBar>(this);

        this.add(_JProgressBar);

        this.init();
        _JProgressBar = null;
    }

    init() {

        this.addClass(JProgressBarConst.PROGRESS);
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

    add(_JProgressBar: JProgressBar) {

        this.progressBarList.add(_JProgressBar);
    }

    isStaked(): boolean {

        return this.progressBarList.length > 1;
    }

    getProgressBarList(): HtmlObject.JList<JProgressBar> {

        return this.progressBarList;
    }

    setProgressBarList(_progressBar: HtmlObject.JList<JProgressBar>) {

        this.progressBarList = _progressBar;
        _progressBar = null;
    }

    getHtml(): HTMLElement {

        return this.toHtml();
    }

    //clone(): JProgress {

    //    var _tmpProgress = this;
    //    //_tmpProgress.progressBarList = _tmpProgress.progressBarList.clone();
    //    _tmpProgress = <JProgress>_tmpProgress.cloneElement();

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

export class JProgressBar extends HtmlObject.div implements HtmlObject.IHtmlObjectElement {

    private content: HtmlObject.span;
    private contentLegend: HtmlObject.span;
    private loadedAnimated: boolean;
    private showLabel: boolean;
    private legend: boolean;
    private valueNow: number;
    private valueMin: number;
    private valueMax: number;
    private valueMilliSeconds: number;

    constructor(_valueNow: number, _label: string) {

        super('JProgressBar');

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

    init() {

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
    getContent(): HtmlObject.span {

        return this.content;
    }

    setContent(_content: HtmlObject.span) {

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

            this.content.addClass(JProgressBarConst.SR_ONLY);
        }
        _showLabel = null;
    }

    isLegend(): boolean {

        return this.legend;
    }

    setLegend(_legend: boolean) {

        this.legend = _legend;
        if (!this.legend) {

            this.contentLegend.addClass(JProgressBarConst.SR_ONLY);
        }
        _legend = null;
    }

    getContentLegend(): HtmlObject.span {

        return this.contentLegend;
    }

    isContentLegend(_contentLegend: HtmlObject.span) {

        this.contentLegend = _contentLegend;
        _contentLegend = null;
    }

    //clone(): JProgressBar {

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
export class JProgressBarSuccess extends JProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(JProgressBarConst.PROGRESS_BAR_SUCCESS);

    }
}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso info bootstrap (http://getbootstrap.com/components/#progress)
**/
export class JProgressBarInfo extends JProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(JProgressBarConst.PROGRESS_BAR_INFO);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso Warning bootstrap (http://getbootstrap.com/components/#progress)
**/
export class JProgressBarWarning extends JProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(JProgressBarConst.PROGRESS_BAR_WARNING);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso Danger bootstrap (http://getbootstrap.com/components/#progress)
**/
export class JProgressBarDanger extends JProgressBar {

    constructor(_valueNow: number, _label: string) {

        super(_valueNow, _label);
        _valueNow = _label = null;
        this.addClass(JProgressBarConst.PROGRESS_BAR_DANGER);

    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 21 - 03 - 2014
* Barra de progreso striped success bootstrap (http://getbootstrap.com/components/#progress)
**/
export class JProgressStriped extends JProgress {

    private animated: boolean;

    constructor(_JProgressBar:JProgressBar) {

        super(_JProgressBar);
        _JProgressBar;
        this.addClass(JProgressBarConst.PROGRESS_STRIPED);
        this.setAnimated(false);

    }

    isAnimated(): boolean {

        return this.animated;
    }

    setAnimated(_animated: boolean) {        
      
        this.animated = _animated;
        if (this.isAnimated()) {

            this.addClass(JProgressBarConst.ACTIVE);

        } else {

            this.removeClass(JProgressBarConst.ACTIVE);
        }
    }
}
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

export class JProgressBarConst {

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
