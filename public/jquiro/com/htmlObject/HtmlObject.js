/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 16 _ 03 _ 2014
* clases de JHtmlObjectuiro
**/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var JStyle = (function () {
        function JStyle() {
        }
        JStyle.JQ_TREE_DF = 'jq-Tree-Df';
        JStyle.JQ_TREE_BRANCH_DF = 'jq-Tree-Branch-Df';
        JStyle.JQ_TREE_LEAF_DF = 'jq-Tree-Leaf-Df';

        JStyle.JQ_HIDE = 'jq-Hide';
        JStyle.JQ_SHOW = 'jq-Show';
        JStyle.JQ_FILL_LEFT_IN = 'jq-Fill-Left-in';
        return JStyle;
    })();
    exports.JStyle = JStyle;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 16 _ 03 _ 2014
    * Lista de eventos javascript
    **/
    var JEvent = (function () {
        function JEvent() {
        }
        JEvent.BLUR = 'blur';
        JEvent.CHANGE = 'change';
        JEvent.CLICK = 'click';
        JEvent.DB_LCLICK = 'dblclick';
        JEvent.FOCUS = 'focus';
        JEvent.KEY_DOWN = 'keydown';
        JEvent.KEY_PRESS = 'keypress';
        JEvent.KEY_UP = 'keyup';
        JEvent.LOAD = 'load';
        JEvent.MOUSE_DOWN = 'mousedown';
        JEvent.MOUSE_MOVE = 'mousemove';
        JEvent.MOUSE_OUT = 'mouseout';
        JEvent.MOUSE_OVER = 'mouseover';
        JEvent.MOUSE_UP = 'mouseup';
        JEvent.RESET = 'reset';
        JEvent.SELECT = 'select';
        JEvent.SUBMIT = 'submit';
        return JEvent;
    })();
    exports.JEvent = JEvent;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Observador de clases y eventos
    **/
    var JObserver = (function () {
        function JObserver() {
        }
        JObserver.registerClass = function (_name) {
            var _index = this.collectionClassName.indexOf(_name);

            if (_index > -1) {
                this.collectionClassKey[_index]++;
            } else {
                this.collectionClassName.push(_name);
                this.collectionClassKey.push(1);
            }
            _index = _name = null;
        };

        JObserver.nextKey = function (_name) {
            var _index = this.collectionClassName.indexOf(_name);
            _name = null;
            return this.collectionClassKey[_index];
        };

        JObserver.finalize = function () {
            this.collectionClassKey = null;
            this.collectionClassName = null;
        };
        JObserver.collectionClassName = new Array();
        JObserver.collectionClassKey = new Array();
        return JObserver;
    })();
    exports.JObserver = JObserver;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Atributos y metodos bases para los componentes JHtmlObjectuiro
    **/
    var HtmlObject = (function () {
        function HtmlObject(_baseEle) {
            this.jBaseElement = _baseEle;
            _baseEle = null;
        }
        /** API HtmlObject **/
        HtmlObject.prototype.getjLabel = function () {
            return this.jLabel;
        };

        HtmlObject.prototype.setjLabel = function (_jLabel) {
            this.jLabel = _jLabel;
            _jLabel = null;
        };

        HtmlObject.prototype.getjClassName = function () {
            return this.jClassName;
        };

        HtmlObject.prototype.setjClassName = function (_jClassName) {
            _jClassName = typeof _jClassName === 'undefined' ? this.getNodeName().toLowerCase() : _jClassName.replace(/ /g, '_');
            this.jClassName = _jClassName;
            JObserver.registerClass(this.jClassName);
            _jClassName = null;
        };

        /**
        Agrega un objeto HtmlObject
        */
        HtmlObject.prototype.appendElement = function (_jElement) {
            this.jBaseElement.appendChild(_jElement.toHtml());
            _jElement = null;
        };

        /**
        Inserta un objeto antes del indicado.
        */
        HtmlObject.prototype.appendBeforeElement = function (_jElement, jTargetElement) {
            this.jBaseElement.insertBefore(_jElement.toHtml(), jTargetElement.toHtml());
        };

        /**
        Inserta un objeto antes del indicado.
        */
        HtmlObject.prototype.appendAfertElement = function (_jElement, jTargetElement) {
            if (this.getLastChildElement() === jTargetElement.toHtml()) {
                this.appendElement(_jElement);
            } else {
                this.jBaseElement.insertBefore(_jElement.toHtml(), jTargetElement.getNextSiblingElement());
            }
        };

        /**
        Reemplaza un objeto HtmlObject por uno nuevo
        */
        HtmlObject.prototype.replaceElement = function (_jElement, _oldJElement) {
            this.jBaseElement.replaceChild(_jElement.toHtml(), _oldJElement.toHtml());
            _jElement = _oldJElement = null;
        };

        /**
        Elimina un objeto HtmlObject
        */
        HtmlObject.prototype.removeElement = function (_jElement) {
            this.removeChildElement(_jElement.toHtml());
        };

        /**
        Elimina todos los objetos HtmlObject
        */
        HtmlObject.prototype.removeAllElements = function () {
            var _length = this.getChildNodesElementsLength();

            if (_length > 0) {
                for (var i = _length - 1; i >= 0; i--) {
                    this.removeChildElement(this.getChildNodeElement(i));
                }
            }
            _length = null;
        };

        /**
        Elimina un nodo hijo
        */
        HtmlObject.prototype.removeChildElement = function (_node) {
            this.jBaseElement.removeChild(_node);
            _node = null;
        };

        /**
        Se Elimina  el objeto del Dom
        */
        HtmlObject.prototype.remove = function () {
            this.getParentElement().removeChild(this.jBaseElement);
        };

        /**
        Retorna el tamano del childNodes
        */
        HtmlObject.prototype.getChildNodesElementsLength = function () {
            return this.jBaseElement.childNodes.length;
        };

        /**
        Retorna  childNodes
        */
        HtmlObject.prototype.getChildNodesElements = function () {
            return this.jBaseElement.childNodes;
        };

        /**
        Retorna el nodo del  childNodes
        */
        HtmlObject.prototype.getChildNodeElement = function (_index) {
            return this.jBaseElement.childNodes[_index];
        };

        /**
        Retorna el primer hijo
        */
        HtmlObject.prototype.getFirstChildElement = function () {
            return this.jBaseElement.firstChild;
        };

        /**
        Retorna el ultimo hijo
        */
        HtmlObject.prototype.getLastChildElement = function () {
            return this.jBaseElement.lastChild;
        };

        /**
        Retorna el siguiente hermano
        */
        HtmlObject.prototype.getNextSiblingElement = function () {
            return this.jBaseElement.nextSibling;
        };

        /**
        Retorna el nodo padre
        */
        HtmlObject.prototype.getParentElement = function () {
            return this.jBaseElement.parentNode;
        };

        /**
        Comprueba si dos elementos son iguales
        */
        HtmlObject.prototype.isEqualElement = function (_jElement) {
            return this.jBaseElement.isEqualNode(_jElement.toHtml());
        };

        /**
        Comprueba si dos objetos son los mismos
        */
        HtmlObject.prototype.equals = function (_jElement) {
            return this.getId() === _jElement.getId();
        };

        /**
        Crea un id dinamicamente
        */
        HtmlObject.prototype.createAutoId = function () {
            this.jBaseElement.id = this.jClassName + "[" + JObserver.nextKey(this.jClassName) + "]";
        };

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
        HtmlObject.prototype.toHtml = function () {
            return this.jBaseElement;
        };

        /****** API DE EVENTOS *********/
        HtmlObject.prototype.addEvent = function (_event, _function) {
            this.jBaseElement.addEventListener(_event, _function, false);
        };

        HtmlObject.prototype.removeEvent = function (_event, _function) {
            this.jBaseElement.removeEventListener(_event, _function, false);
        };

        /****** API ID *********/
        HtmlObject.prototype.getId = function () {
            return this.jBaseElement.id;
        };

        HtmlObject.prototype.setId = function (_id) {
            this.jBaseElement.id = _id;
            _id = null;
        };

        HtmlObject.prototype.existId = function (_id) {
            return this.jBaseElement.id == _id;
            _id = null;
        };

        /****** API CLASS *********/
        HtmlObject.prototype.addClass = function (_class) {
            this.jBaseElement.classList.add(_class);
            _class = null;
        };

        HtmlObject.prototype.addCollectionClass = function (_classes) {
            var length = _classes.length;

            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.addClass(_classes[i]);
                }
            }

            length = _classes = null;
        };

        HtmlObject.prototype.removeClass = function (_class) {
            this.jBaseElement.classList.remove(_class);
            _class = null;
        };

        HtmlObject.prototype.removeCollectionClass = function (_classes) {
            var length = _classes.length;

            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.removeClass(_classes[i]);
                }
            }

            length = _classes = null;
        };

        HtmlObject.prototype.removeAllClass = function () {
            var length = this.countClass();
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    this.removeClass(this.getItemClass(i));
                }
            }
            length = null;
        };

        HtmlObject.prototype.toggleClass = function (_class) {
            this.jBaseElement.classList.toggle(_class);
            _class = null;
        };

        HtmlObject.prototype.exitsClass = function (_class) {
            return this.jBaseElement.classList.contains(_class);
            _class = null;
        };

        HtmlObject.prototype.countClass = function () {
            return this.jBaseElement.classList.length;
        };

        HtmlObject.prototype.getItemClass = function (_index) {
            return this.jBaseElement.classList.item(_index);
            _index = null;
        };

        /****** API DATASET *********/
        HtmlObject.prototype.getDateSet = function () {
            return this.jBaseElement.dataset;
        };

        HtmlObject.prototype.addDataSet = function (_key, _value) {
            this.jBaseElement.dataset[_key] = _value;
            _key = _value = null;
        };

        /****** API HTML *********/
        HtmlObject.prototype.getInnerHtml = function () {
            return this.jBaseElement.innerHTML;
        };

        HtmlObject.prototype.setInnerHtml = function (_innerHtml) {
            this.jBaseElement.innerHTML = _innerHtml;
            _innerHtml = null;
        };

        HtmlObject.prototype.getInnerText = function () {
            return this.jBaseElement.innerText;
        };

        HtmlObject.prototype.setInnerText = function (_innerText) {
            this.jBaseElement.innerText = _innerText;
            _innerText = null;
        };

        HtmlObject.prototype.appendHtml = function (_htmlElement) {
            this.jBaseElement.appendChild(_htmlElement);
            _htmlElement = null;
        };

        HtmlObject.prototype.replaceHtml = function (_htmlElement, _oldHtmlElement) {
            this.jBaseElement.replaceChild(_htmlElement, _oldHtmlElement);
            _htmlElement = _oldHtmlElement = null;
        };

        HtmlObject.prototype.isEqualHtml = function (_htmlElement) {
            return this.jBaseElement.isEqualNode(_htmlElement);
            _htmlElement = null;
        };

        /******API NODE ****************/
        HtmlObject.prototype.getNodeName = function () {
            return this.jBaseElement.nodeName;
        };

        HtmlObject.prototype.setNodeName = function (_nodeName) {
            this.jBaseElement.nodeName = _nodeName;
            _nodeName = null;
        };

        /****** API ESTILOS *********/
        HtmlObject.prototype.getStyle = function () {
            return this.jBaseElement.style;
        };

        HtmlObject.prototype.setStyle = function (_style) {
            this.jBaseElement.style = _style;
            _style = null;
        };

        HtmlObject.prototype.getCssWidth = function () {
            return this.jBaseElement.style.width;
        };

        HtmlObject.prototype.setCssWidth = function (_width) {
            return this.jBaseElement.style.width = _width;
        };

        HtmlObject.prototype.applyCss = function (_cssMap) {
            //var _tmpSheet = document.createElement('style');
            //_tmpSheet.innerHTML = _cssMap;
            //document.body.appendChild(_tmpSheet);
        };

        /**Expire***/
        HtmlObject.prototype.expire = function () {
            this.jBaseElement = null;
            this.jLabel = null;
            this.jClassName = null;
        };
        return HtmlObject;
    })();
    exports.HtmlObject = HtmlObject;

    

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <div>
    **/
    var div = (function (_super) {
        __extends(div, _super);
        function div(_className) {
            var _tmpElement = document.createElement('div');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return div;
    })(HtmlObject);
    exports.div = div;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :06/05/2014
    * Definici�n de etiqueta html <header>
    **/
    var header = (function (_super) {
        __extends(header, _super);
        function header(_className) {
            var _tmpElement = document.createElement('header');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return header;
    })(HtmlObject);
    exports.header = header;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <i>
    **/
    var i = (function (_super) {
        __extends(i, _super);
        function i(_className) {
            var _tmpElement = document.createElement('i');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return i;
    })(HtmlObject);
    exports.i = i;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <li>
    **/
    var li = (function (_super) {
        __extends(li, _super);
        function li(_className) {
            var _tmpElement = document.createElement('li');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return li;
    })(HtmlObject);
    exports.li = li;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <p>
    **/
    var p = (function (_super) {
        __extends(p, _super);
        function p(_className) {
            var _tmpElement = document.createElement('p');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return p;
    })(HtmlObject);
    exports.p = p;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <span>
    **/
    var span = (function (_super) {
        __extends(span, _super);
        function span(_className) {
            var _tmpElement = document.createElement('span');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return span;
    })(HtmlObject);
    exports.span = span;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :12/03/2014
    * Definici�n de etiqueta html <ul>
    **/
    var ul = (function (_super) {
        __extends(ul, _super);
        function ul(_className) {
            var _tmpElement = document.createElement('ul');
            _super.call(this, _tmpElement);
            this.setjClassName(_className);
            this.createAutoId();
            _tmpElement = _className = null;
        }
        return ul;
    })(HtmlObject);
    exports.ul = ul;

    

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha :22/03/2014
    * Lista de JHtmlObjectElement
    **/
    var JList = (function () {
        function JList(_parent) {
            this.parent = _parent;
            this.jElements = new Array();
            this.length = 0;
            this.index = -1;
            _parent = null;
        }
        JList.prototype.add = function (_element) {
            this.jElements.push(_element);
            this.parent.appendElement(_element);
            this.length++;
            this.index++;
            _element = null;
        };

        JList.prototype.addIndex = function (_element, _index) {
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
        };

        JList.prototype.getFirst = function () {
            if (!this.isEmpty()) {
                this.index = 0;
                return this.jElements[this.index];
            } else {
                return null;
            }
        };

        JList.prototype.getLast = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.length - 1;
                return this.jElements[this.index];
            } else {
                return null;
            }
        };

        JList.prototype.getNext = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.index === this.length - 1 ? 0 : this.index++;
                return this.jElements[this.index];
            } else {
                return null;
            }
        };

        JList.prototype.getBack = function () {
            if (!this.isEmpty() && this.length > 1) {
                this.index = this.index === 0 ? this.length - 1 : this.index--;
                return this.jElements[this.index];
            } else {
                return null;
            }
        };

        JList.prototype.getItem = function (_index) {
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
        };

        JList.prototype.pullOutFirst = function () {
            if (!this.isEmpty()) {
                var _tmpEle = this.jElements.shift();
                this.length--;
                this.index = this.length === 0 ? -1 : 0;
                this.parent.removeElement(_tmpEle);
                return _tmpEle;
            } else {
                return null;
            }
        };

        JList.prototype.pullOutLast = function () {
            if (!this.isEmpty() && this.length > 1) {
                var _tmpEle = this.jElements.pop();
                this.length--;
                this.index = this.length - 1;
                this.parent.removeElement(_tmpEle);
                return _tmpEle;
            } else {
                return null;
            }
        };

        JList.prototype.pullOutNext = function () {
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
        };

        JList.prototype.pullOutBack = function () {
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
        };

        JList.prototype.pullOutItem = function (_index) {
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
        };

        JList.prototype.remove = function (_element) {
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
        };

        JList.prototype.removeIndex = function (_index) {
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
        };

        JList.prototype.removeAll = function () {
            if (!this.isEmpty()) {
                this.parent.removeAllElements();
                this.clear();
            }
        };

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
        JList.prototype.clear = function () {
            this.jElements = [];
            this.length = 0;
            this.index = -1;
        };

        JList.prototype.destroy = function () {
            this.jElements = null;
            this.length = null;
            this.index = null;
            this.parent = null;
        };

        JList.prototype.isEmpty = function () {
            return this.length <= 0;
        };
        return JList;
    })();
    exports.JList = JList;
});
