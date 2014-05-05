/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 16 _ 03 _ 2014
* clases de jquiro
**/

export class jqStyle {

    /***CLASES PARA COMPONENTE TREE***/

    static JQ_TREE_DF = 'jq-Tree-Df';
    static JQ_TREE_BRANCH_DF = 'jq-Tree-Branch-Df';
    static JQ_TREE_LEAF_DF = 'jq-Tree-Leaf-Df';

    /******CLASES DE ANIMACIONES *******/

    static JQ_HIDE = 'jq-Hide';
    static JQ_SHOW = 'jq-Show';
    static JQ_FILL_LEFT_IN = 'jq-Fill-Left-in';

}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 16 _ 03 _ 2014
* Lista de eventos javascript
**/

export class jqEvent {

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

export class jqObserver {

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
* Atributos y metodos bases para los componentes JQuiro
**/

export class jqBaseComponent {

    jqElementHtml: HTMLElement;
    private jqLabel: string;
    private jqClassName: string;

    constructor(_baseEle: HTMLElement) {

        this.jqElementHtml = _baseEle;
        _baseEle = null;
    }

    /** API JQBaseComponent **/


    getJQLabel(): string {

        return this.jqLabel;
    }

    setJQLabel(_jqLabel: string) {

        this.jqLabel = _jqLabel;
        _jqLabel = null;
    }

    getJQClassName(): string {

        return this.jqClassName;
    }

    setJQClassName(_jqclassName: string) {

        _jqclassName = typeof _jqclassName === 'undefined' ? this.getNodeName().toLowerCase() : _jqclassName.replace(/ /g, '_');
        this.jqClassName = _jqclassName;
        jqObserver.registerClass(this.jqClassName);
        _jqclassName = null;
    }
    /**
     Agrega un objeto jqBaseComponent
    */
    appendElement(_jqElement: jqBaseComponent) {

        this.jqElementHtml.appendChild(_jqElement.toHtml());
        _jqElement = null;
    }
    /**
    Inserta un objeto antes del indicado.
    */
    appendBeforeElement(_jqElement: jqBaseComponent, jqTargetElement: jqBaseComponent) {

        this.jqElementHtml.insertBefore(_jqElement.toHtml(), jqTargetElement.toHtml());

    }
    /**
    Inserta un objeto antes del indicado.
    */
    appendAfertElement(_jqElement: jqBaseComponent, jqTargetElement: jqBaseComponent) {

        if (this.getLastChildElement() === jqTargetElement.toHtml()) {

            this.appendElement(_jqElement);

        } else {

            this.jqElementHtml.insertBefore(_jqElement.toHtml(), jqTargetElement.getNextSiblingElement());
        }

    }
    /**
    Reemplaza un objeto jqBaseComponent por uno nuevo
    */
    replaceElement(_jqElement: jqBaseComponent, _oldJqElement: jqBaseComponent) {

        this.jqElementHtml.replaceChild(_jqElement.toHtml(), _oldJqElement.toHtml());
        _jqElement = _oldJqElement = null;
    }
    /**
    Elimina un objeto jqBaseComponent
    */
    removeElement(_jqElement: jqBaseComponent) {

        this.removeChildElement(_jqElement.toHtml());
    }
    /**
    Elimina todos los objetos jqBaseComponent
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

        this.jqElementHtml.removeChild(_node);
        _node = null;
    }
    /**
    Se Elimina  el objeto del Dom
    */
    remove() {

        this.getParentElement().removeChild(this.jqElementHtml);
    }
    /**
    Retorna el tamano del childNodes
    */
    getChildNodesElementsLength(): number {

        return this.jqElementHtml.childNodes.length;
    }
    /**
    Retorna  childNodes
    */
    getChildNodesElements(): NodeList {

        return this.jqElementHtml.childNodes;
    }
    /**
       Retorna el nodo del  childNodes
     */
    getChildNodeElement(_index): Node {

        return this.jqElementHtml.childNodes[_index];
    }
    /**
    Retorna el primer hijo
    */
    getFirstChildElement(): Node {

        return this.jqElementHtml.firstChild;
    }

    /**
     Retorna el ultimo hijo
     */
    getLastChildElement(): Node {

        return this.jqElementHtml.lastChild;
    }
    /**
     Retorna el siguiente hermano
     */
    getNextSiblingElement(): Node {

        return this.jqElementHtml.nextSibling;
    }

    /**
    Retorna el nodo padre
    */
    getParentElement(): Node {

        return this.jqElementHtml.parentNode;
    }

    /**
     Comprueba si dos elementos son iguales
    */
    isEqualElement(_jqElement: jqBaseComponent): boolean {

        return this.jqElementHtml.isEqualNode(_jqElement.toHtml());

    }
    /**
    Comprueba si dos objetos son los mismos
    */
    equals(_jqElement: jqBaseComponent): boolean {

        return this.getId() === _jqElement.getId();
    }

    /**
    Crea un id dinamicamente
    */
    createAutoId() {

        this.jqElementHtml.id = this.jqClassName + "[" + jqObserver.nextKey(this.jqClassName) + "]";
    }
    /**
    Clona  este objeto
    */
    //cloneElement(): jqBaseComponent {


    //    var _tmpElement = this;


    //    _tmpElement.jqElementHtml = <HTMLElement> _tmpElement.jqElementHtml.cloneNode(true);
    //    var _class = _tmpElement.getJQClassName();
    //    _tmpElement.setJQClassName(_class + '[cloned]');
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

        return this.jqElementHtml;
    }



    /****** API DE EVENTOS *********/

    addEvent(_event: string, _function) {

        this.jqElementHtml.addEventListener(_event, _function, false);
    }

    removeEvent(_event: string, _function) {

        this.jqElementHtml.removeEventListener(_event, _function, false);
    }



    /****** API ID *********/

    getId(): string {

        return this.jqElementHtml.id;
    }

    setId(_id: string) {

        this.jqElementHtml.id = _id;
        _id = null;

    }

    existId(_id: string): boolean {

        return this.jqElementHtml.id == _id;
        _id = null;
    }

    /****** API CLASS *********/

    addClass(_class: string) {

        this.jqElementHtml.classList.add(_class);
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

        this.jqElementHtml.classList.remove(_class);
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

        this.jqElementHtml.classList.toggle(_class);
        _class = null;
    }

    exitsClass(_class: string): boolean {

        return this.jqElementHtml.classList.contains(_class);
        _class = null;
    }

    countClass(): number {

        return this.jqElementHtml.classList.length;
    }

    getItemClass(_index: number): string {

        return this.jqElementHtml.classList.item(_index);
        _index = null;
    }

    /****** API DATASET *********/

    getDateSet(): DOMStringMap {
        return this.jqElementHtml.dataset;

    }

    addDataSet(_key: string, _value) {

        this.jqElementHtml.dataset[_key] = _value;
        _key = _value = null;
    }

    /****** API HTML *********/

    getInnerHtml(): string {

        return this.jqElementHtml.innerHTML;
    }

    setInnerHtml(_innerHtml: string) {

        this.jqElementHtml.innerHTML = _innerHtml;
        _innerHtml = null;
    }

    getInnerText(): string {

        return this.jqElementHtml.innerText;
    }

    setInnerText(_innerText: string) {

        this.jqElementHtml.innerText = _innerText;
        _innerText = null;
    }

    appendHtml(_htmlElement: HTMLElement) {

        this.jqElementHtml.appendChild(_htmlElement);
        _htmlElement = null;
    }

    replaceHtml(_htmlElement: HTMLElement, _oldHtmlElement: HTMLElement) {

        this.jqElementHtml.replaceChild(_htmlElement, _oldHtmlElement);
        _htmlElement = _oldHtmlElement = null;
    }

    isEqualHtml(_htmlElement: HTMLElement): boolean {

        return this.jqElementHtml.isEqualNode(_htmlElement);
        _htmlElement = null;
    }

    /******API NODE ****************/
    getNodeName(): string {

        return this.jqElementHtml.nodeName;
    }

    setNodeName(_nodeName: string) {

        this.jqElementHtml.nodeName = _nodeName;
        _nodeName = null;
    }


    /****** API ESTILOS *********/

    getStyle(): MSStyleCSSProperties {

        return this.jqElementHtml.style;
    }

    setStyle(_style: MSStyleCSSProperties) {

        this.jqElementHtml.style = _style;
        _style = null;
    }

    getCssWidth(): string {

        return this.jqElementHtml.style.width;

    }

    setCssWidth(_width: string) {

        return this.jqElementHtml.style.width = _width;

    }

    applyCss(_cssMap: string) {

        //var _tmpSheet = document.createElement('style');
        //_tmpSheet.innerHTML = _cssMap;
        //document.body.appendChild(_tmpSheet);

    }

    /**Finalize***/
    expire() {

        this.jqElementHtml = null;
        this.jqLabel = null;
        this.jqClassName = null;

    }
}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Interfaz IJQElement
**/

export interface IJQElement {

    init(): void;
    create(id: HTMLElement): void;
   // clone(): jqBaseComponent;
    getHtml(): HTMLElement;
    finalize(): void;

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :12/03/2014
* Definición de etiqueta html <div>
**/

export class div extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('div');
        super(_tmpElement);
        this.setJQClassName(_className);
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

export class i extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('i');
        super(_tmpElement);
        this.setJQClassName(_className);
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

export class li extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('li');
        super(_tmpElement);
        this.setJQClassName(_className);
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

export class p extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('p');
        super(_tmpElement);
        this.setJQClassName(_className);
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

export class span extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('span');
        super(_tmpElement);
        this.setJQClassName(_className);
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

export class ul extends jqBaseComponent {

    constructor(_className?: string) {

        var _tmpElement = document.createElement('ul');
        super(_tmpElement);
        this.setJQClassName(_className);
        this.createAutoId();
        _tmpElement = _className = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Interfaz IJQList
**/

export interface IJQList {

    jqElements: jqBaseComponent[];
    length: number;
    index: number;


    add(element: jqBaseComponent): void;
    addIndex(element: jqBaseComponent, index: number): void;

    getFirst(): jqBaseComponent;
    getLast(): jqBaseComponent;
    getNext(): jqBaseComponent;
    getBack(): jqBaseComponent;
    getItem(index: number): jqBaseComponent;


    pullOutFirst(): jqBaseComponent;
    pullOutLast(): jqBaseComponent;
    pullOutNext(): jqBaseComponent;
    pullOutBack(): jqBaseComponent;
    pullOutItem(index: number): jqBaseComponent;

    remove(element: jqBaseComponent): void;
    removeIndex(index: number): void;
    removeAll(): void;

    //clone(): IJQList;

    clear(): void;
    destroy(): void;
    isEmpty(): boolean;

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha :22/03/2014
* Lista de JQElement
**/
export class jqList<JQ extends jqBaseComponent> implements IJQList {

    jqElements: JQ[];
    length: number;
    index: number;
    private parent: jqBaseComponent;

    constructor(_parent: jqBaseComponent) {

        this.parent = _parent;
        this.jqElements = new Array<JQ>();
        this.length = 0;
        this.index = -1;
        _parent = null;
    }

    add(_element: JQ) {

        this.jqElements.push(_element);
        this.parent.appendElement(_element);
        this.length++;
        this.index++;
        _element = null;

    }

    addIndex(_element: JQ, _index: number) {

        if (_index <= this.length && _index >= 0) {

            this.parent.appendBeforeElement(_element, this.jqElements[_index]);
            this.jqElements.splice(_index, 0, _element);
            this.index = _index;
            this.length++;
            _index = _element = null;

        } else {

            throw new Error('Indice ' + _index + '  fuera de rango ');
            _index = _element = null;
        }

    }

    getFirst(): JQ {

        if (!this.isEmpty()) {

            this.index = 0;
            return this.jqElements[this.index];

        } else {

            return null;

        }
    }

    getLast(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.length - 1;
            return this.jqElements[this.index];

        } else {

            return null;

        }
    }

    getNext(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.index === this.length - 1 ? 0 : this.index++;
            return this.jqElements[this.index];

        } else {

            return null;

        }
    }

    getBack(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            this.index = this.index === 0 ? this.length - 1 : this.index--;
            return this.jqElements[this.index];

        } else {

            return null;

        }
    }

    getItem(_index: number): JQ {

        if (!this.isEmpty()) {

            if (_index <= this.length && _index >= 0) {

                this.index = _index;
                _index = null;
                return this.jqElements[this.index];

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

    pullOutFirst(): JQ {

        if (!this.isEmpty()) {

            var _tmpEle = this.jqElements.shift();
            this.length--;
            this.index = this.length === 0 ? -1 : 0;
            this.parent.removeElement(_tmpEle);
            return _tmpEle;

        } else {

            return null;

        }
    }

    pullOutLast(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpEle = this.jqElements.pop();
            this.length--;
            this.index = this.length - 1;
            this.parent.removeElement(_tmpEle);
            return _tmpEle;

        } else {

            return null;
        }
    }

    pullOutNext(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpIndex = this.index;
            this.index = this.index === this.length - 1 ? 0 : this.index++;
            var _arrTmpEle = this.jqElements.splice(this.index, 1);
            this.length--;
            this.index = _tmpIndex;
            _tmpIndex = null;
            this.parent.removeElement(_arrTmpEle[0]);
            return _arrTmpEle[0];

        } else {

            return null;

        }
    }

    pullOutBack(): JQ {

        if (!this.isEmpty() && this.length > 1) {

            var _tmpIndex = this.index;
            this.index = this.index === 0 ? this.length - 1 : this.index--;
            var _arrTmpEle = this.jqElements.splice(this.index, 1);
            this.length--;
            this.index = _tmpIndex;
            _tmpIndex = null;
            this.parent.removeElement(_arrTmpEle[0]);
            return _arrTmpEle[0];

        } else {

            return null;

        }
    }

    pullOutItem(_index: number): JQ {

        if (!this.isEmpty()) {

            if (_index <= this.length && _index >= 0) {

                this.index = _index;
                _index = null;
                var _arrTmpEle = this.jqElements.splice(this.index, 1);
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

    remove(_element: JQ) {

        if (!this.isEmpty()) {

            if (this.length > 1) {

                var _length = this.length;

                for (var i = _length - 1; i >= 1; i--) {

                    var _tmpElement = this.jqElements[i];

                    if (_tmpElement.equals(_element)) {

                        this.jqElements.splice(i, 1);
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

                this.jqElements.unshift();
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
                var _arrTmpEle = this.jqElements.splice(this.index, 1);
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

    //clone() :jqList<JQ>{

    //    console.log(this);
    //    var _self = this;
    //    console.log(this);
    //    var _tmpList = _self.jqElements;
    //    var _length = _tmpList.length;
    //    var i = 0;
    //    _self.removeAll();

    //    while (i < _length) {

    //        var _element = _tmpList[i];
    //        var _clone = <JQ>_element.cloneElement();
    //        _self.add(_clone);
    //        _element = _clone = null;
    //        i++;
    //    }

    //    _tmpList = _length = i = null;

    //    return _self;
    //}

    clear() {

        this.jqElements = [];
        this.length = 0;
        this.index = -1;
    }

    destroy() {

        this.jqElements = null;
        this.length = null;
        this.index = null;
        this.parent = null;

    }

    isEmpty(): boolean {

        return this.length <= 0;
    }


}




