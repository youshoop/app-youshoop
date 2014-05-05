/// <reference path=".././base_component/JQElement.ts" />
/// <reference path="../icon/jqicon.ts" />
import jqE = require('.././base_component/JQElement');
import jqI = require('.././icon/jqicon');
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 13 - 03 - 2014
Estructura arbol
**/
export class jqTree {

    private tree: jqE.ul;
    private branchList: jqBranch[];


    constructor(_jqLabel: string) {

        this.tree = new jqE.ul('jqTree');
        this.tree.setJQLabel(_jqLabel);


        this.branchList = new Array<jqBranch>();

        this.init();
        _jqLabel = null;
    }

    private init(): void {

        this.tree.addClass(jqI.jqFontAwesome.FA_UL);
        this.tree.addClass(jqE.jqStyle.JQ_TREE_DF);

    }

    collapse() {

        var i = 0;
        var _length = this.branchList.length;
        while (i < _length) {

            var _branch = this.branchList[i];
            _branch.collapseLeaves();
            _branch.collapseBranchs();
            _branch = null;
            i++;
        }
        _length = i = null;
    }

    expand() {

        var i = 0;
        var _length = this.branchList.length;
        while (i < _length) {

            var _branch = this.branchList[i];
            _branch.collapseLeaves();
            _branch.expandBranchs();
            _branch = null;
            i++;
        }
        _length = i = null;
    }

    addBranch(_branch: jqBranch): void {

        this.tree.appendElement(_branch.getBranch());
        this.tree.appendElement(_branch.getLeaves());
        this.branchList.push(_branch);
        _branch = null;
    }

    create(_id: HTMLElement) {

        _id.appendChild(this.getHtmlTree());
        this.collapse();
        _id = null;
    }

    getHtmlTree(): HTMLElement {

        return this.tree.toHtml();
    }

    getTree(): jqE.ul {

        return this.tree;
    }

    setTree(_tree: jqE.ul) {

        this.tree = _tree;
        _tree = null;
    }
    getBranchList(): jqBranch[] {

        return this.branchList;
    }

    setBranchList(_branchList: jqBranch[]) {

        this.branchList = _branchList;
        _branchList = null;
    }

    finalize() {

        this.tree.expire();
        this.tree = null;
        this.branchList = null;
    }

}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 13 - 03 - 2014
* Rama de la estructura arbol
**/

export class jqBranch {

    private branch: jqE.li;
    private content: jqE.span;
    private leaves: jqE.ul;
    private iconOpen: jqI.jqIcon;
    private iconClose: jqI.jqIcon;
    private iconCurrent: jqI.jqIcon;
    private open: boolean;
    private collapse: boolean;
    private readOnly: boolean;
    private branchList: jqBranch[];
    private leavesList: jqLeaf[];


    constructor(_jqLabel: string) {

        this.branch = new jqE.li('JQBranch');
        this.branch.setJQLabel(_jqLabel);

        this.leaves = new jqE.ul('JQBranchLeaves');

        this.content = new jqE.span('JQBranchContent');
        this.content.setInnerHtml(_jqLabel);

        this.iconCurrent = new jqI.jqIcon(jqI.jqFontAwesome.FA_CHECK_SQUARE_O, jqI.jqFontAwesome.LIST_ICONS);
        this.iconOpen = new jqI.jqIcon(jqI.jqFontAwesome.FA_ARROW_CIRCLE_DOWN, jqI.jqFontAwesome.LIST_ICONS);
        this.iconClose = new jqI.jqIcon(jqI.jqFontAwesome.FA_ARROW_CIRCLE_RIGHT, jqI.jqFontAwesome.LIST_ICONS);

        this.open = true;
        this.collapse = true;
        this.readOnly = false;

        this.branchList = new Array<jqBranch>();
        this.leavesList = new Array<jqLeaf>();

        this.init();
        _jqLabel = null;
    }

    private init() {

        this.branch.addClass(jqE.jqStyle.JQ_TREE_BRANCH_DF);

        this.leaves.addClass(jqI.jqFontAwesome.FA_UL);

        this.iconCurrent = this.iconOpen;
        this.branch.appendElement(this.iconOpen);
        this.branch.appendElement(this.content);

        this.branch.addEvent(jqE.jqEvent.CLICK, (e) => {


            if (this.isOpen()) {

                this.collapseLeaves();
                this.collapseBranchs();

            } else {

                this.expandLeaves();
                this.expandBranchs();
            }
        });
    }

    addLeaf(_leaf: jqLeaf) {

        this.leaves.appendElement(_leaf.getLeaf());
        this.leavesList.push(_leaf);
        _leaf = null;
    }

    addBranch(_branch: jqBranch) {

        this.leaves.appendElement(_branch.getBranch());
        this.leaves.appendElement(_branch.getLeaves());
        this.branchList.push(_branch);
        /** validar si la rama que se inserta tiene mas ramas hijas**/
        var _length = _branch.getBranchList().length;
        if (_length > 0) {

            var i = 0;
            while (i < _length) {

                this.branchList.push(_branch.getBranchList()[i]);
                i++;
            }
        }
        _length = i  = null;

    }

    collapseBranchs() {

        if (this.isCollapse()) {

            var i = 0;
            var _length = this.branchList.length;

            while (i < _length) {

                var _branch = this.branchList[i];

                var _tmpIconClose = _branch.getIconClose();
                var _tmpIconOpen = _branch.getIconOpen();
                var _tmpIconCurrent = _branch.getIconCurrent();

                _branch.setOpen(false);

                if (_tmpIconClose !== _tmpIconCurrent) {

                    _branch.getBranch().replaceElement(_tmpIconClose, _tmpIconOpen);
                    _branch.setIconCurrent(_tmpIconClose);
                }

                _branch.collapseLeaves();

                _branch.getBranch().removeClass(jqE.jqStyle.JQ_SHOW);
                _branch.getBranch().addClass(jqE.jqStyle.JQ_HIDE);

                i++;
                _tmpIconClose = _tmpIconOpen = _tmpIconCurrent = _branch = null;
            }

            i = _length = null;

            this.setOpen(false);

            if (this.iconClose !== this.iconCurrent) {

                this.branch.replaceElement(this.iconClose, this.iconOpen);
                this.iconCurrent = this.iconClose;
            }
        }
    }

    collapseLeaves() {

        if (this.isCollapse()) {

            var i = 0;
            var _length = this.leavesList.length;

            while (i < _length) {

                var _leaf = this.leavesList[i];
                _leaf.getLeaf().removeClass(jqE.jqStyle.JQ_SHOW);
                _leaf.getLeaf().addClass(jqE.jqStyle.JQ_HIDE);
                i++;
                _leaf = null;

            }

            i = _length = null;

            this.setOpen(false);

            if (this.iconClose !== this.iconCurrent) {

                this.branch.replaceElement(this.iconClose, this.iconOpen);
                this.iconCurrent = this.iconClose;
            }
        }
    }


    expandBranchs() {

        if (this.isCollapse()) {


            var i = 0;
            var _length = this.branchList.length;

            while (i < _length) {

                var _branch = this.branchList[i];
                var _tmpIconClose = _branch.getIconClose();
                var _tmpIconOpen = _branch.getIconOpen();
                var _tmpIconCurrent = _branch.getIconCurrent();

                _branch.setOpen(true);

                if (_tmpIconOpen !== _tmpIconCurrent) {

                    _branch.getBranch().replaceElement(_tmpIconOpen, _tmpIconClose);
                    _branch.setIconCurrent(_tmpIconOpen);
                }

                _branch.expandLeaves();

                _branch.getBranch().removeClass(jqE.jqStyle.JQ_HIDE);
                _branch.getBranch().addClass(jqE.jqStyle.JQ_SHOW);
                i++;
                _tmpIconClose = _tmpIconOpen = _tmpIconCurrent = _branch = null;
            }

            i = _length = null;

            this.setOpen(true);

            if (this.iconOpen !== this.iconCurrent) {

                this.branch.replaceElement(this.iconOpen, this.iconClose);
                this.iconCurrent = this.iconOpen;
            }
        }
    }


    expandLeaves() {

        if (this.isCollapse()) {

            var i = 0;
            var _length = this.leavesList.length;

            while (i < _length) {

                var _leaf = this.leavesList[i];
                _leaf.getLeaf().removeClass(jqE.jqStyle.JQ_HIDE);
                _leaf.getLeaf().addClass(jqE.jqStyle.JQ_SHOW);
                i++;
                _leaf = null;
            }

            i = _length = null;

            this.setOpen(true);

            if (this.iconOpen !== this.iconCurrent) {

                this.branch.replaceElement(this.iconOpen, this.iconClose);
                this.iconCurrent = this.iconOpen;
            }
        }
    }

    setReadOnlyLeaves() {
        
        var _length = this.leavesList.length;

        for (var i = _length - 1; i >= 0; i--) {

            var _leaf = this.leavesList[i];
            _leaf.setReadOnly(this.readOnly);
            _leaf = null;
        }

    }

    setReadOnlyBranchs() {

        var _length = this.branchList.length;

        for (var i = _length - 1; i >= 0; i--) {

            var _branch = this.branchList[i];
            _branch.setReadOnly(this.readOnly);
            _branch = null;
        }
    }


    /*** GETTERS AND SETTERS ***/

    getBranch(): jqE.i {

        return this.branch;
    }

    setBranch(_branch: jqE.i) {

        this.branch = _branch;
        _branch = null;
    }

    getLeaves(): jqE.ul {

        return this.leaves;
    }

    setLeaves(_leaves: jqE.ul) {

        this.leaves = _leaves;
        _leaves = null;
    }

    getIconOpen(): jqI.jqIcon {

        return this.iconOpen;
    }

    setIconOpen(_icon: jqI.jqIcon) {

        this.iconOpen = _icon;
        _icon = null;
    }

    getIconClose(): jqI.jqIcon {

        return this.iconClose;
    }

    setIconClose(_icon: jqI.jqIcon) {

        this.iconClose = _icon;
        _icon = null;
    }


    getContent(): jqE.span {

        return this.content;
    }

    setContent(_content: jqE.span) {

        this.content = _content;
        _content = null;
    }

    isOpen(): boolean {

        return this.open;
    }

    setOpen(_open: boolean) {

        this.open = _open;
        _open = null;
    }

    getBranchList(): jqBranch[] {

        return this.branchList;
    }

    setBranchList(_branchList: jqBranch[]) {

        this.branchList = _branchList;
        _branchList = null;
    }

    getLeavesList(): jqLeaf[] {

        return this.leavesList;
    }

    setLeavesList(_leavesList: jqLeaf[]) {

        this.leavesList = _leavesList;
        _leavesList = null;
    }
    getIconCurrent(): jqI.jqIcon {

        return this.iconCurrent;
    }

    setIconCurrent(_icon: jqI.jqIcon) {

        this.iconCurrent = _icon;
        _icon = null;
    }

    isCollapse(): boolean {

        return this.collapse;
    }

    setCollapse(_collapse: boolean) {

        this.collapse = _collapse;
        _collapse = null;
    }

    isReadOnly(): boolean {

        return this.readOnly;
    }

    setReadOnly(_readOnly: boolean) {

        this.readOnly = _readOnly;
        this.setReadOnlyLeaves();
        this.setReadOnlyBranchs();
        _readOnly = null;
    }

    finalize() {

        this.branch.expire();
        this.branch = null;
        this.content.expire();
        this.content = null;
        this.leaves.expire();
        this.leaves = null;
        this.iconOpen.finalize();
        this.iconOpen = null;
        this.iconClose.finalize();
        this.iconClose = null;
        this.iconCurrent.finalize();
        this.iconCurrent = null;
        this.open = null;
        this.collapse = null;
        this.readOnly = null;
        this.branchList = null;
        this.leavesList = null;
    }
}
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 13 - 03 - 2014
* Hoja de estructura de arbol
**/
export class jqLeaf {

    private leaf: jqE.li;
    private iconSelected: jqI.jqIcon;
    private iconUnSelected: jqI.jqIcon;
    private iconCurrent: jqI.jqIcon;
    private content: jqE.span;
    private selected: boolean;
    private readOnly: boolean;


    constructor(_jqLabel: string) {

        this.leaf = new jqE.li('JQLeaf');
        this.leaf.setJQLabel(_jqLabel);

        this.content = new jqE.span();

        this.iconCurrent = new jqI.jqIcon(jqI.jqFontAwesome.FA_CHECK_SQUARE_O, jqI.jqFontAwesome.LIST_ICONS);
        this.iconSelected = new jqI.jqIcon(jqI.jqFontAwesome.FA_CHECK_SQUARE_O, jqI.jqFontAwesome.LIST_ICONS);
        this.iconUnSelected = new jqI.jqIcon(jqI.jqFontAwesome.FA_SQUARE_O, jqI.jqFontAwesome.LIST_ICONS);

        this.selected = false;
        this.readOnly = false;

        this.init();
        _jqLabel = null;
    }



    private init() {


        this.leaf.addClass(jqE.jqStyle.JQ_TREE_LEAF_DF);

        this.content.setInnerHtml(this.leaf.getJQLabel());
        this.iconCurrent = this.iconUnSelected;
        this.leaf.appendElement(this.iconUnSelected);
        this.leaf.appendElement(this.content);

        this.leaf.addEvent(jqE.jqEvent.CLICK, (e) => {

            if (!this.isReadOnly()) {



                if (this.isSelected()) {

                    this.unSelectedLeaf();

                } else {

                    this.selectedLeaf();
                }
            }
        });

    }

    selectedLeaf() {

        if (!this.isReadOnly()) {

            this.selected = true;

            if (this.iconSelected !== this.iconCurrent) {

                this.leaf.replaceElement(this.iconSelected, this.iconUnSelected);
                this.iconCurrent = this.iconSelected;

            }
        }

    }

    unSelectedLeaf() {

        if (!this.isReadOnly()) {

            this.selected = false;

            if (this.iconUnSelected !== this.iconCurrent) {

                this.leaf.replaceElement(this.iconUnSelected, this.iconSelected);
                this.iconCurrent = this.iconUnSelected;
            }
        }
    }

    getLeaf(): jqE.li {

        return this.leaf;
    }

    setLeaf(_leaf: jqE.li) {

        this.leaf = _leaf;
        _leaf = null;

    }

    getIconSelected(): jqI.jqIcon {

        return this.iconSelected;
    }

    setIconSelected(_icon: jqI.jqIcon) {

        this.iconSelected = _icon;
        _icon = null;
    }

    getIconUnSelected(): jqI.jqIcon {

        return this.iconUnSelected;
    }

    setIconUnSelected(_icon: jqI.jqIcon) {

        this.iconUnSelected = _icon;
        _icon = null;
    }

    getIconCurrent(): jqI.jqIcon {

        return this.iconCurrent;
    }

    setIconCurrent(_icon: jqI.jqIcon) {

        this.iconCurrent = _icon;
        _icon = null;
    }

    getContent(): jqE.span {

        return this.content;
    }

    setContent(_content: jqE.span) {

        this.content = _content;
        _content = null;
    }

    isSelected(): boolean {

        return this.selected;
    }

    setSelected(_selected: boolean) {

        this.selected = _selected;
        _selected = null;
    }

    isReadOnly(): boolean {

        return this.readOnly;
    }

    setReadOnly(_readOnly: boolean) {

        this.readOnly = _readOnly;
        _readOnly = null;
    }

    finalize() {

        this.leaf.expire();
        this.leaf = null;
        this.iconSelected.finalize();
        this.iconSelected = null;
        this.iconUnSelected.finalize();
        this.iconUnSelected = null;
        this.iconCurrent.finalize();
        this.iconCurrent = null;
        this.content.expire();
        this.content = null;
        this.selected = null;
        this.readOnly = null;

    }



}
