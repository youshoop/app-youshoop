define(["require", "exports", '.././htmlObject/HtmlObject', '.././icon/JIcon'], function(require, exports, HtmlObject, JIconMD) {
    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    Estructura arbol
    **/
    var JTree = (function () {
        function JTree() {
            this.tree = new HtmlObject.ul('JTree');

            this.branchList = new Array();

            this.init();
        }
        JTree.prototype.init = function () {
            this.tree.addClass(JIconMD.JFontAwesome.FA_UL);
            this.tree.addClass(HtmlObject.JStyle.JQ_TREE_DF);
        };

        JTree.prototype.collapse = function () {
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
        };

        JTree.prototype.expand = function () {
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
        };

        JTree.prototype.addBranch = function (_branch) {
            this.tree.appendElement(_branch.getBranch());
            this.tree.appendElement(_branch.getLeaves());
            this.branchList.push(_branch);
            _branch = null;
        };

        JTree.prototype.create = function (_id) {
            _id.appendChild(this.getHtmlTree());
            this.collapse();
            _id = null;
        };

        JTree.prototype.getHtmlTree = function () {
            return this.tree.toHtml();
        };

        JTree.prototype.getTree = function () {
            return this.tree;
        };

        JTree.prototype.setTree = function (_tree) {
            this.tree = _tree;
            _tree = null;
        };
        JTree.prototype.getBranchList = function () {
            return this.branchList;
        };

        JTree.prototype.setBranchList = function (_branchList) {
            this.branchList = _branchList;
            _branchList = null;
        };

        JTree.prototype.finalize = function () {
            this.tree.expire();
            this.tree = null;
            this.branchList = null;
        };
        return JTree;
    })();
    exports.JTree = JTree;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    * Rama de la estructura arbol
    **/
    var JBranch = (function () {
        function JBranch(_JLabel) {
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

            this.branchList = new Array();
            this.leavesList = new Array();

            this.init();
            _JLabel = null;
        }
        JBranch.prototype.init = function () {
            var _this = this;
            this.branch.addClass(HtmlObject.JStyle.JQ_TREE_BRANCH_DF);

            this.leaves.addClass(JIconMD.JFontAwesome.FA_UL);

            this.iconCurrent = this.iconOpen;
            this.branch.appendElement(this.iconOpen);
            this.branch.appendElement(this.content);

            this.branch.addEvent(HtmlObject.JEvent.CLICK, function (e) {
                if (_this.isOpen()) {
                    _this.collapseLeaves();
                    _this.collapseBranchs();
                } else {
                    _this.expandLeaves();
                    _this.expandBranchs();
                }
            });
        };

        JBranch.prototype.addLeaf = function (_leaf) {
            this.leaves.appendElement(_leaf.getLeaf());
            this.leavesList.push(_leaf);
            _leaf = null;
        };

        JBranch.prototype.addBranch = function (_branch) {
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
            _length = i = null;
        };

        JBranch.prototype.collapseBranchs = function () {
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
        };

        JBranch.prototype.collapseLeaves = function () {
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
        };

        JBranch.prototype.expandBranchs = function () {
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
        };

        JBranch.prototype.expandLeaves = function () {
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
        };

        JBranch.prototype.setReadOnlyLeaves = function () {
            var _length = this.leavesList.length;

            for (var i = _length - 1; i >= 0; i--) {
                var _leaf = this.leavesList[i];
                _leaf.setReadOnly(this.readOnly);
                _leaf = null;
            }
        };

        JBranch.prototype.setReadOnlyBranchs = function () {
            var _length = this.branchList.length;

            for (var i = _length - 1; i >= 0; i--) {
                var _branch = this.branchList[i];
                _branch.setReadOnly(this.readOnly);
                _branch = null;
            }
        };

        /*** GETTERS AND SETTERS ***/
        JBranch.prototype.getBranch = function () {
            return this.branch;
        };

        JBranch.prototype.setBranch = function (_branch) {
            this.branch = _branch;
            _branch = null;
        };

        JBranch.prototype.getLeaves = function () {
            return this.leaves;
        };

        JBranch.prototype.setLeaves = function (_leaves) {
            this.leaves = _leaves;
            _leaves = null;
        };

        JBranch.prototype.getIconOpen = function () {
            return this.iconOpen;
        };

        JBranch.prototype.setIconOpen = function (_icon) {
            this.iconOpen = _icon;
            _icon = null;
        };

        JBranch.prototype.getIconClose = function () {
            return this.iconClose;
        };

        JBranch.prototype.setIconClose = function (_icon) {
            this.iconClose = _icon;
            _icon = null;
        };

        JBranch.prototype.getContent = function () {
            return this.content;
        };

        JBranch.prototype.setContent = function (_content) {
            this.content = _content;
            _content = null;
        };

        JBranch.prototype.isOpen = function () {
            return this.open;
        };

        JBranch.prototype.setOpen = function (_open) {
            this.open = _open;
            _open = null;
        };

        JBranch.prototype.getBranchList = function () {
            return this.branchList;
        };

        JBranch.prototype.setBranchList = function (_branchList) {
            this.branchList = _branchList;
            _branchList = null;
        };

        JBranch.prototype.getLeavesList = function () {
            return this.leavesList;
        };

        JBranch.prototype.setLeavesList = function (_leavesList) {
            this.leavesList = _leavesList;
            _leavesList = null;
        };
        JBranch.prototype.getIconCurrent = function () {
            return this.iconCurrent;
        };

        JBranch.prototype.setIconCurrent = function (_icon) {
            this.iconCurrent = _icon;
            _icon = null;
        };

        JBranch.prototype.isCollapse = function () {
            return this.collapse;
        };

        JBranch.prototype.setCollapse = function (_collapse) {
            this.collapse = _collapse;
            _collapse = null;
        };

        JBranch.prototype.isReadOnly = function () {
            return this.readOnly;
        };

        JBranch.prototype.setReadOnly = function (_readOnly) {
            this.readOnly = _readOnly;
            this.setReadOnlyLeaves();
            this.setReadOnlyBranchs();
            _readOnly = null;
        };

        JBranch.prototype.finalize = function () {
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
        };
        return JBranch;
    })();
    exports.JBranch = JBranch;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    * Hoja de estructura de arbol
    **/
    var JLeaf = (function () {
        function JLeaf(_JLabel) {
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
        JLeaf.prototype.init = function () {
            var _this = this;
            this.leaf.addClass(HtmlObject.JStyle.JQ_TREE_LEAF_DF);

            this.content.setInnerHtml(this.leaf.getjLabel());
            this.iconCurrent = this.iconUnSelected;
            this.leaf.appendElement(this.iconUnSelected);
            this.leaf.appendElement(this.content);

            this.leaf.addEvent(HtmlObject.JEvent.CLICK, function (e) {
                if (!_this.isReadOnly()) {
                    if (_this.isSelected()) {
                        _this.unSelectedLeaf();
                    } else {
                        _this.selectedLeaf();
                    }
                }
            });
        };

        JLeaf.prototype.selectedLeaf = function () {
            if (!this.isReadOnly()) {
                this.selected = true;

                if (this.iconSelected !== this.iconCurrent) {
                    this.leaf.replaceElement(this.iconSelected, this.iconUnSelected);
                    this.iconCurrent = this.iconSelected;
                }
            }
        };

        JLeaf.prototype.unSelectedLeaf = function () {
            if (!this.isReadOnly()) {
                this.selected = false;

                if (this.iconUnSelected !== this.iconCurrent) {
                    this.leaf.replaceElement(this.iconUnSelected, this.iconSelected);
                    this.iconCurrent = this.iconUnSelected;
                }
            }
        };

        JLeaf.prototype.getLeaf = function () {
            return this.leaf;
        };

        JLeaf.prototype.setLeaf = function (_leaf) {
            this.leaf = _leaf;
            _leaf = null;
        };

        JLeaf.prototype.getIconSelected = function () {
            return this.iconSelected;
        };

        JLeaf.prototype.setIconSelected = function (_icon) {
            this.iconSelected = _icon;
            _icon = null;
        };

        JLeaf.prototype.getIconUnSelected = function () {
            return this.iconUnSelected;
        };

        JLeaf.prototype.setIconUnSelected = function (_icon) {
            this.iconUnSelected = _icon;
            _icon = null;
        };

        JLeaf.prototype.getIconCurrent = function () {
            return this.iconCurrent;
        };

        JLeaf.prototype.setIconCurrent = function (_icon) {
            this.iconCurrent = _icon;
            _icon = null;
        };

        JLeaf.prototype.getContent = function () {
            return this.content;
        };

        JLeaf.prototype.setContent = function (_content) {
            this.content = _content;
            _content = null;
        };

        JLeaf.prototype.isSelected = function () {
            return this.selected;
        };

        JLeaf.prototype.setSelected = function (_selected) {
            this.selected = _selected;
            _selected = null;
        };

        JLeaf.prototype.isReadOnly = function () {
            return this.readOnly;
        };

        JLeaf.prototype.setReadOnly = function (_readOnly) {
            this.readOnly = _readOnly;
            _readOnly = null;
        };

        JLeaf.prototype.finalize = function () {
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
        };
        return JLeaf;
    })();
    exports.JLeaf = JLeaf;
});
