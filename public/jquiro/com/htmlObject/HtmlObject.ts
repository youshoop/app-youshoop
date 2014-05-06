/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 16 _ 03 _ 2014
* clases de JHtmlObjectuiro
**/

export class JStyle {

    /***CLASES PARA COMPONENTE TREE***/

    static JHtmlObject_TREE_DF = 'JHtmlObject-Tree-Df';
    static JHtmlObject_TREE_BRANCH_DF = 'JHtmlObject-Tree-Branch-Df';
    static JHtmlObject_TREE_LEAF_DF = 'JHtmlObject-Tree-Leaf-Df';

    /******CLASES DE ANIMACIONES *******/

    static JHtmlObject_HIDE = 'JHtmlObject-Hide';
    static JHtmlObject_SHOW = 'JHtmlObject-Show';
    static JHtmlObject_FILL_LEFT_IN = 'JHtmlObject-Fill-Left-in';

}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 16 _ 03 _ 2014
* Lista de eventos javascript
**/

export class JEvent {

    static BLUR = 'blur';
    static CHANGE = 'change';
    static CLICK = 'click';
    static DB_LCLICK = 'dblclick';
    static FOCUS = 'focus';
    static KEY_DOWN = 'keydown';
    static KEY_PRESS = 'keypress';
    static KEY_UP = 'keyup';
    static LOAD = 'load';
    static MOUSE_DOWN = 'mousedown';
    static MOUSE_MOVE = 'mousemove';
    static MOUSE_OUT = 'mouseout';
    static MOUSE_OVER = 'mouseover';
    static MOUSE_UP = 'mouseup';
    static RESET = 'reset';
    static SELECT = 'select';
    static SUBMIT = 'submit';

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Observador de clases y eventos
**/

export class JObserver {

    private static collectionClassName = new Array<string>();
    private static collectionClassKey = new Array<number>();

    static registerClass(_name: string) {

        var _index = this.collectionClassName.indexOf(_name);

        if (_index > -1) {

            this.collectionClassKey[_index]++;

        } else {

            this.collectionClassName.push(_name);
            this.collectionClassKey.push(1);
        }
        _index = _name = null;

    }

    static nextKey(_name: string): number {

        var _index = this.collectionClassName.indexOf(_name);
        _name = null;
        return this.collectionClassKey[_index];
    }

    static finalize() {

        this.collectionClassKey = null;
        this.collectionClassName = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Atributos y metodos bases para los componentes JHtmlObjectuiro
**/

export class HtmlObject {

    jBaseElement: HTMLElement;
    private jLabel: string;
    private jClassName: string;

    constructor(_baseEle: HTMLElement) {

        this.jBaseElement = _baseEle;
        _baseEle = null;
    }

    /** API HtmlObject **/


    getjLabel(): string {

        return this.jLabel;
    }

    setjLabel(_jLabel: string) {

        this.jLabel = _jLabel;
        _jLabel = null;
    }

    getjClassName(): string {

        return this.jClassName;
    }

    setjClassName(_jClassName: string) {

        _jClassName = typeof _jClassName === 'undefined' ? this.getNodeName().toLowerCase() : _jClassName.replace(/ /g, '_');
        this.jClassName = _jClassName;
        JObserver.registerClass(this.jClassName);
        _jClassName = null;
    }
    /**
     Agrega un objeto HtmlObject
    */
    appendElement(_jElement: HtmlObject) {

        this.jBaseElement.appendChild(_jElement.toHtml());
        _jElement = null;
    }
    /**
    Inserta un objeto antes del indicado.
    */
    appendBeforeElement(_jElement: HtmlObject, jTargetElement: HtmlObject) {

        this.jBaseElement.insertBefore(_jElement.toHtml(), jTargetElement.toHtml());

    }
    /**
    Inserta un objeto antes del indicado.
    */
    appendAfertElement(_jElement: HtmlObject, jTargetElement: HtmlObject) {

        if (this.getLastChildElement() === jTargetElement.toHtml()) {

            this.appendElement(_jElement);

        } else {

            this.jBaseElement.insertBefore(_jElement.toHtml(), jTargetElement.getNextSiblingElement());
        }

    }
    /**
    Reemplaza un objeto HtmlObject por uno nuevo
    */
    replaceElement(_jElement: HtmlObject, _oldJElement: HtmlObject) {

        this.jBaseElement.replaceChild(_jElement.toHtml(), _oldJElement.toHtml());
        _jElement = _oldJElement = null;
    }
    /**
    Elimina un objeto HtmlObject
    */
    removeElement(_jElement: HtmlObject) {

        this.removeChildElement(_jElement.toHtml());
    }
    /**
    Elimina todos los objetos HtmlObject
    */
    removeAllElements() {

        var _length = this.getChildNodesElementsLength();

        if (_length > 0) {

            for (var i = _length - 1; i >= 0; i--) {

                this.removeChildElement(this.getChildNodeElement(i));
            }
        }
        _length = null;
    }

    /**
    Elimina un nodo hijo
    */
    removeChildElement(_node: Node) {

        this.jBaseElement.removeChild(_node);
        _node = null;
    }
    /**
    Se Elimina  el objeto del Dom
    */
    remove() {

        this.getParentElement().removeChild(this.jBaseElement);
    }
    /**
    Retorna el tamano del childNodes
    */
    getChildNodesElementsLength(): number {

        return this.jBaseElement.childNodes.length;
    }
    /**
    Retorna  childNodes
    */
    getChildNodesElements(): NodeList {

        return this.jBaseElement.childNodes;
    }
    /**
       Retorna el nodo del  childNodes
     */
    getChildNodeElement(_index): Node {

        return this.jBaseElement.childNodes[_index];
    }
    /**
    Retorna el primer hijo
    */
    getFirstChildElement(): Node {

        return this.jBaseElement.firstChild;
    }

    /**
     Retorna el ultimo hijo
     */
    getLastChildElement(): Node {

        return this.jBaseElement.lastChild;
    }
    /**
     Retorna el siguiente hermano
     */
    getNextSiblingElement(): Node {

        return this.jBaseElement.nextSibling;
    }

    /**
    Retorna el nodo padre
    */
    getParentElement(): Node {

        return this.jBaseElement.parentNode;
    }

    /**
     Comprueba si dos elementos son iguales
    */
    isEqualElement(_jElement: HtmlObject): boolean {

        return this.jBaseElement.isEqualNode(_jElement.toHtml());

    }
    /**
    Comprueba si dos objetos son los mismos
    */
    equals(_jElement: HtmlObject): boolean {

        return this.getId() === _jElement.getId();
    }

    /**
    Crea un id dinamicamente
    */
    createAutoId() {

        this.jBaseElement.id = this.jClassName + "[" + JObserver.nextKey(this.jClassName) + "]";
    }
    /**
    Clona  este objeto
    */
    //cloneElement(): HtmlObject {


    //    var _tmpElement = this;


    //    _tmpElement.jBaseElement = <HTMLElement> _tmpElement.jBaseElement.cloneNode(true);
    //    var _class = _tmpElement.getjClassName();
    //    _tmpElement.setjClassName(_class + '[cloned]');
    //    //var _length = _tmpElement.getChildNodesElementsLength();
    //    //for (var i = _length - 1; i >= 0; i--) {

    //    //    var _elem = <HTMLElement> _tmpElement.getChildNodeElement(i);
    //    //    _elem.id = ''+i;
    //    //}
    //    _tmpElement.createAutoId();
    //    _class = null;
    //    return _tmpElement;
    //}

    toHtml(): HTMLElement {

        return this.jBaseElement;
    }



    /****** API DE EVENTOS *********/

    addEvent(_event: string, _function) {

        this.jBaseElement.addEventListener(_event, _function, false);
    }

    removeEvent(_event: string, _function) {

        this.jBaseElement.removeEventListener(_event, _function, false);
    }



    /****** API ID *********/

    getId(): string {

        return this.jBaseElement.id;
    }

    setId(_id: string) {

        this.jBaseElement.id = _id;
        _id = null;

    }

    existId(_id: string): boolean {

        return this.jBaseElement.id == _id;
        _id = null;
    }

    /****** API CLASS *********/

    addClass(_class: string) {

        this.jBaseElement.classList.add(_class);
        _class = null;
    }

    addCollectionClass(_classes: string[]) {

        var length = _classes.length;

        if (length > 0) {

            for (var i = 0; i < length; i++) {

                this.addClass(_classes[i]);
            }
        }

        length = _classes = null;

    }

    removeClass(_class: string) {

        this.jBaseElement.classList.remove(_class);
        _class = null;
    }

    removeCollectionClass(_classes: string[]) {

        var length = _classes.length;

        if (length > 0) {

            for (var i = 0; i < length; i++) {

                this.removeClass(_classes[i]);
            }
        }

        length = _classes = null;
    }

    removeAllClass() {

        var length = this.countClass();
        if (length > 0) {

            for (var i = 0; i < length; i++) {

                this.removeClass(this.getItemClass(i));
            }
        }
        length = null;

    }

    toggleClass(_class: string) {

        this.jBaseElement.classList.toggle(_class);
        _class = null;
    }

    exitsClass(_class: string): boolean {

        return this.jBaseElement.classList.contains(_class);
        _class = null;
    }

    countClass(): number {

        return this.jBaseElement.classList.length;
    }

    getItemClass(_index: number): string {

        return this.jBaseElement.classList.item(_index);
        _index = null;
    }

    /****** API DATASET *********/

    getDateSet(): DOMStringMap {
        return this.jBaseElement.dataset;

    }

    addDataSet(_key: string, _value) {

        this.jBaseElement.dataset[_key] = _value;
        _key = _value = null;
    }

    /****** API HTML *********/

    getInnerHtml(): string {

        return this.jBaseElement.innerHTML;
    }

    setInnerHtml(_innerHtml: string) {

        this.jBaseElement.innerHTML = _innerHtml;
        _innerHtml = null;
    }

    getInnerText(): string {

        return this.jBaseElement.innerText;
    }

    setInnerText(_innerText: string) {

        this.jBaseElement.innerText = _innerText;
        _innerText = null;
    }

    appendHtml(_htmlElement: HTMLElement) {

        this.jBaseElement.appendChild(_htmlElement);
        _htmlElement = null;
    }

    replaceHtml(_htmlElement: HTMLElement, _oldHtmlElement: HTMLElement) {

        this.jBaseElement.replaceChild(_htmlElement, _oldHtmlElement);
        _htmlElement = _oldHtmlElement = null;
    }

    isEqualHtml(_htmlElement: HTMLElement): boolean {

        return this.jBaseElement.isEqualNode(_htmlElement);
        _htmlElement = null;
    }

    /******API NODE ****************/
    getNodeName(): string {

        return this.jBaseElement.nodeName;
    }

    setNodeName(_nodeName: string) {

        this.jBaseElement.nodeName = _nodeName;
        _nodeName = null;
    }


    /****** API ESTILOS *********/

    getStyle(): MSStyleCSSProperties {

        return this.jBaseElement.style;
    }

    setStyle(_style: MSStyleCSSProperties) {

        this.jBaseElement.style = _style;
        _style = null;
    }

    getCssWidth(): string {

        return this.jBaseElement.style.width;

    }

    setCssWidth(_width: string) {

        return this.jBaseElement.style.width = _width;

    }

    applyCss(_cssMap: string) {

        //var _tmpSheet = document.createElement('style');
        //_tmpSheet.innerHTML = _cssMap;
        //document.body.appendChild(_tmpSheet);

    }

    /**Expire***/
    expire() {

        this.jBaseElement = null;
        this.jLabel = null;
        this.jClassName = null;

    }
}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Interfaz IHtmlObjectElement
**/

export interface IHtmlObjectElement {

    init(): void;
    create(id: HTMLElement): void;
   // clone(): HtmlObject;
    getHtml(): HTMLElement;
    finalize(): void;

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <div>
**/

export class div extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('div');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }


}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <i>
**/

export class i extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('i');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <li>
**/

export class li extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('li');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <p>
**/

export class p extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('p');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <span>
**/

export class span extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('span');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <ul>
**/

export class ul extends HtmlObject {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('ul');
        super(_tmpElement);
        this.setjClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Interfaz IJList
**/

export interface IJList {

    jElements: HtmlObject[];
    length: number;
    index: number;


    add(element: HtmlObject): void;
    addIndex(element: HtmlObject, index: number): void;

    getFirst(): HtmlObject;
    getLast(): HtmlObject;
    getNext(): HtmlObject;
    getBack(): HtmlObject;
    getItem(index: number): HtmlObject;


    pullOutFirst(): HtmlObject;
    pullOutLast(): HtmlObject;
    pullOutNext(): HtmlObject;
    pullOutBack(): HtmlObject;
    pullOutItem(index: number): HtmlObject;

    remove(element: HtmlObject): void;
    removeIndex(index: number): void;
    removeAll(): void;

    //clone(): IJList;

    clear(): void;
    destroy(): void;
    isEmpty(): boolean;

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Lista de JHtmlObjectElement
**/
export class JList<JHtmlObject extends HtmlObject> implements IJList {

    jElements: JHtmlObject[];
    length: number;
    index: number;
    private parent: HtmlObject;

    constructor(_parent: HtmlObject) {

        this.parent = _parent;
        this.jElements = new Array<JHtmlObject>();
        this.length = 0;
        this.index = -1;
        _parent = null;
    }

    add(_element: JHtmlObject) {

        this.jElements.push(_element);
        this.parent.appendElement(_element);
        this.length++;
        this.index++;
        _element = null;

    }

    addIndex(_element: JHtmlObject, _index: number) {

        if (_index <= this.length && _index >= 0) {

            this.parent.appendBeforeElement(_element, this.jElements[_index]);
            this.jElements.splice(_index, 0, _element);
            this.index = _index;
            this.length++;
            _index = _element = null;

        } else {

            throw new Error('Indice ' + _index + '  fuera de rango ');
            _index = _element = null;
        }

    }

    getFirst(): JHtmlObject {

        if (!this.isEmpty()) {

            this.index = 0;
            return this.jElements[this.index];

        } else {

            return null;

        }
    }

    getLast(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.length - 1;
            return this.jElements[this.index];

        } else {

            return null;

        }
    }

    getNext(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.index === this.length - 1 ? 0 : this.index++;
            return this.jElements[this.index];

        } else {

            return null;

        }
    }

    getBack(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.index === 0 ? this.length - 1 : this.index--;
            return this.jElements[this.index];

        } else {

            return null;

        }
    }

    getItem(_index: number): JHtmlObject {

        if (!this.isEmpty()) {

            if (_index <= this.length && _index >= 0) {

                this.index = _index;
                _index = null;
                return this.jElements[this.index];

            } else {

                throw new Error('Indice ' + _index + '  fuera de rango ');
                _index = null;
                return null;
            }

        } else {

            _index = null;
            return null;

        }
    }

    pullOutFirst(): JHtmlObject {

        if (!this.isEmpty()) {

            var _tmpEle = this.jElements.shift();
            this.length--;
            this.index = this.length === 0 ? -1 : 0;
            this.parent.removeElement(_tmpEle);
            return _tmpEle;

        } else {

            return null;

        }
    }

    pullOutLast(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpEle = this.jElements.pop();
            this.length--;
            this.index = this.length - 1;
            this.parent.removeElement(_tmpEle);
            return _tmpEle;

        } else {

            return null;
        }
    }

    pullOutNext(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpIndex = this.index;
            this.index = this.index === this.length - 1 ? 0 : this.index++;
            var _arrTmpEle = this.jElements.splice(this.index, 1);
            this.length--;
            this.index = _tmpIndex;
            _tmpIndex = null;
            this.parent.removeElement(_arrTmpEle[0]);
            return _arrTmpEle[0];

        } else {

            return null;

        }
    }

    pullOutBack(): JHtmlObject {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpIndex = this.index;
            this.index = this.index === 0 ? this.length - 1 : this.index--;
            var _arrTmpEle = this.jElements.splice(this.index, 1);
            this.length--;
            this.index = _tmpIndex;
            _tmpIndex = null;
            this.parent.removeElement(_arrTmpEle[0]);
            return _arrTmpEle[0];

        } else {

            return null;

        }
    }

    pullOutItem(_index: number): JHtmlObject {

        if (!this.isEmpty()) {

            if (_index <= this.length && _index >= 0) {

                this.index = _index;
                _index = null;
                var _arrTmpEle = this.jElements.splice(this.index, 1);
                this.length--;
                this.index = this.index === 0 ? this.length - 1 : this.index--;
                this.parent.removeElement(_arrTmpEle[0]);
                return _arrTmpEle[0];

            } else {

                throw new Error('Indice ' + _index + '  fuera de rango ');
                _index = null;
                return null;
            }

        } else {

            _index = null;
            return null;

        }
    }

    remove(_element: JHtmlObject) {

        if (!this.isEmpty()) {

            if (this.length > 1) {

                var _length = this.length;

                for (var i = _length - 1; i >= 1; i--) {

                    var _tmpElement = this.jElements[i];

                    if (_tmpElement.equals(_element)) {

                        this.jElements.splice(i, 1);
                        this.length--;
                        this.index = this.index === 0 ? this.length - 1 : this.index--;
                        this.parent.removeElement(_element);
                        _element = _length = _tmpElement = null;
                        return;
                    }
                    _tmpElement = null;
                }
                _length = _element = null;

            } else {

                this.jElements.unshift();
                this.length--;
                this.index = -1;
                this.parent.removeElement(_element);
                _element = null;
            }

        }
    }

    removeIndex(_index: number) {

        if (!this.isEmpty()) {

            if (_index <= this.length && _index >= 0) {

                this.index = _index;
                _index = null;
                var _arrTmpEle = this.jElements.splice(this.index, 1);
                this.length--;
                this.index = this.index === 0 ? this.length - 1 : this.index--;
                this.parent.removeElement(_arrTmpEle[0]);

            } else {

                throw new Error('Indice ' + _index + '  fuera de rango ');
                _index = null;
                
            }
        }
    }

    removeAll() {

        if (!this.isEmpty()) {

            this.parent.removeAllElements();
            this.clear();
        }

    }

    //clone() :JList<JHtmlObject>{

    //    console.log(this);
    //    var _self = this;
    //    console.log(this);
    //    var _tmpList = _self.jElements;
    //    var _length = _tmpList.length;
    //    var i = 0;
    //    _self.removeAll();

    //    while (i < _length) {

    //        var _element = _tmpList[i];
    //        var _clone = <JHtmlObject>_element.cloneElement();
    //        _self.add(_clone);
    //        _element = _clone = null;
    //        i++;
    //    }

    //    _tmpList = _length = i = null;

    //    return _self;
    //}

    clear() {

        this.jElements = [];
        this.length = 0;
        this.index = -1;
    }

    destroy() {

        this.jElements = null;
        this.length = null;
        this.index = null;
        this.parent = null;

    }

    isEmpty(): boolean {

        return this.length <= 0;
    }


}




