/// <reference path=".././htmlObject/HtmlObject.ts" />
/// <reference path="../icon/JIcon.ts" />
import HtmlObject = require('.././htmlObject/HtmlObject');
import JIconMD = require('.././icon/JIcon');
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 13 - 03 - 2014
Estructura arbol
**/
export class JTree {

    private tree: HtmlObject.ul;
    private branchList: JBranch[];


    constructor() {

        this.tree = new HtmlObject.ul('JTree');      

        this.branchList = new Array<JBranch>();

        this.init();        
    }

    private init(): void {

        this.tree.addClass(JIconMD.JFontAwesome.FA_UL);
        this.tree.addClass(HtmlObject.JStyle.JQ_TREE_DF);

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

    addBranch(_branch: JBranch): void {

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

    getTree(): HtmlObject.ul {

        return this.tree;
    }

    setTree(_tree: HtmlObject.ul) {

        this.tree = _tree;
        _tree = null;
    }
    getBranchList(): JBranch[] {

        return this.branchList;
    }

    setBranchList(_branchList: JBranch[]) {

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

export class JBranch {

    private branch: HtmlObject.li;
    private content: HtmlObject.span;
    private leaves: HtmlObject.ul;
    private iconOpen: JIconMD.JIcon;
    private iconClose: JIconMD.JIcon;
    private iconCurrent: JIconMD.JIcon;
    private open: boolean;
    private collapse: boolean;
    private readOnly: boolean;
    private branchList: JBranch[];
    private leavesList: JLeaf[];


    constructor(_JLabel: string) {

        this.branch = new HtmlObject.li('JBranch');
        this.branch.setjLabel(_JLabel);

        this.leaves = new HtmlObject.ul('JBranchLeaves');

        this.content = new HtmlObject.span('JBranchContent');
        this.content.setInnerHtml(_JLabel);

        this.iconCurrent = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_CHECK_SQUARE_O, JIconMD.JFontAwesome.LIST_ICONS);
        this.iconOpen = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_ARROW_CIRCLE_DOWN, JIconMD.JFontAwesome.LIST_ICONS);
        this.iconClose = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_ARROW_CIRCLE_RIGHT, JIconMD.JFontAwesome.LIST_ICONS);

        this.open = true;
        this.collapse = true;
        this.readOnly = false;

        this.branchList = new Array<JBranch>();
        this.leavesList = new Array<JLeaf>();

        this.init();
        _JLabel = null;
    }

    private init() {

        this.branch.addClass(HtmlObject.JStyle.JQ_TREE_BRANCH_DF);

        this.leaves.addClass(JIconMD.JFontAwesome.FA_UL);

        this.iconCurrent = this.iconOpen;
        this.branch.appendElement(this.iconOpen);
        this.branch.appendElement(this.content);

        this.branch.addEvent(HtmlObject.JEvent.CLICK, (e) => {


            if (this.isOpen()) {

                this.collapseLeaves();
                this.collapseBranchs();

            } else {

                this.expandLeaves();
                this.expandBranchs();
            }
        });
    }

    addLeaf(_leaf: JLeaf) {

        this.leaves.appendElement(_leaf.getLeaf());
        this.leavesList.push(_leaf);
        _leaf = null;
    }

    addBranch(_branch: JBranch) {

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

                _branch.getBranch().removeClass(HtmlObject.JStyle.JQ_SHOW);
                _branch.getBranch().addClass(HtmlObject.JStyle.JQ_HIDE);

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
                _leaf.getLeaf().removeClass(HtmlObject.JStyle.JQ_SHOW);
                _leaf.getLeaf().addClass(HtmlObject.JStyle.JQ_HIDE);
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

                _branch.getBranch().removeClass(HtmlObject.JStyle.JQ_HIDE);
                _branch.getBranch().addClass(HtmlObject.JStyle.JQ_SHOW);
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
                _leaf.getLeaf().removeClass(HtmlObject.JStyle.JQ_HIDE);
                _leaf.getLeaf().addClass(HtmlObject.JStyle.JQ_SHOW);
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

    getBranch(): HtmlObject.i {

        return this.branch;
    }

    setBranch(_branch: HtmlObject.i) {

        this.branch = _branch;
        _branch = null;
    }

    getLeaves(): HtmlObject.ul {

        return this.leaves;
    }

    setLeaves(_leaves: HtmlObject.ul) {

        this.leaves = _leaves;
        _leaves = null;
    }

    getIconOpen(): JIconMD.JIcon {

        return this.iconOpen;
    }

    setIconOpen(_icon: JIconMD.JIcon) {

        this.iconOpen = _icon;
        _icon = null;
    }

    getIconClose(): JIconMD.JIcon {

        return this.iconClose;
    }

    setIconClose(_icon: JIconMD.JIcon) {

        this.iconClose = _icon;
        _icon = null;
    }


    getContent(): HtmlObject.span {

        return this.content;
    }

    setContent(_content: HtmlObject.span) {

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

    getBranchList(): JBranch[] {

        return this.branchList;
    }

    setBranchList(_branchList: JBranch[]) {

        this.branchList = _branchList;
        _branchList = null;
    }

    getLeavesList(): JLeaf[] {

        return this.leavesList;
    }

    setLeavesList(_leavesList: JLeaf[]) {

        this.leavesList = _leavesList;
        _leavesList = null;
    }
    getIconCurrent(): JIconMD.JIcon {

        return this.iconCurrent;
    }

    setIconCurrent(_icon: JIconMD.JIcon) {

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
export class JLeaf {

    private leaf: HtmlObject.li;
    private iconSelected: JIconMD.JIcon;
    private iconUnSelected: JIconMD.JIcon;
    private iconCurrent: JIconMD.JIcon;
    private content: HtmlObject.span;
    private selected: boolean;
    private readOnly: boolean;


    constructor(_JLabel: string) {

        this.leaf = new HtmlObject.li('JLeaf');
        this.leaf.setjLabel(_JLabel);

        this.content = new HtmlObject.span();

        this.iconCurrent = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_CHECK_SQUARE_O, JIconMD.JFontAwesome.LIST_ICONS);
        this.iconSelected = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_CHECK_SQUARE_O, JIconMD.JFontAwesome.LIST_ICONS);
        this.iconUnSelected = new JIconMD.JIcon(JIconMD.JFontAwesome.FA_SQUARE_O, JIconMD.JFontAwesome.LIST_ICONS);

        this.selected = false;
        this.readOnly = false;

        this.init();
        _JLabel = null;
    }



    private init() {


        this.leaf.addClass(HtmlObject.JStyle.JQ_TREE_LEAF_DF);

        this.content.setInnerHtml(this.leaf.getjLabel());
        this.iconCurrent = this.iconUnSelected;
        this.leaf.appendElement(this.iconUnSelected);
        this.leaf.appendElement(this.content);

        this.leaf.addEvent(HtmlObject.JEvent.CLICK, (e) => {

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

    getLeaf(): HtmlObject.li {

        return this.leaf;
    }

    setLeaf(_leaf: HtmlObject.li) {

        this.leaf = _leaf;
        _leaf = null;

    }

    getIconSelected(): JIconMD.JIcon {

        return this.iconSelected;
    }

    setIconSelected(_icon: JIconMD.JIcon) {

        this.iconSelected = _icon;
        _icon = null;
    }

    getIconUnSelected(): JIconMD.JIcon {

        return this.iconUnSelected;
    }

    setIconUnSelected(_icon: JIconMD.JIcon) {

        this.iconUnSelected = _icon;
        _icon = null;
    }

    getIconCurrent(): JIconMD.JIcon {

        return this.iconCurrent;
    }

    setIconCurrent(_icon: JIconMD.JIcon) {

        this.iconCurrent = _icon;
        _icon = null;
    }

    getContent(): HtmlObject.span {

        return this.content;
    }

    setContent(_content: HtmlObject.span) {

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
