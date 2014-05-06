define(["require", "exports", '.././base_component/JQElement', '.././icon/JQIcon'], function(require, exports, jqE, jqI) {
    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    Estructura arbol
    **/
    var jqTree = (function () {
        function jqTree(_jqLabel) {
            this.tree = new jqE.ul('jqTree');
            this.tree.setJQLabel(_jqLabel);

            this.branchList = new Array();

            this.init();
            _jqLabel = null;
        }
        jqTree.prototype.init = function () {
            this.tree.addClass(jqI.jqFontAwesome.FA_UL);
            this.tree.addClass(jqE.jqStyle.JQ_TREE_DF);
        };

        jqTree.prototype.collapse = function () {
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

        jqTree.prototype.expand = function () {
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

        jqTree.prototype.addBranch = function (_branch) {
            this.tree.appendElement(_branch.getBranch());
            this.tree.appendElement(_branch.getLeaves());
            this.branchList.push(_branch);
            _branch = null;
        };

        jqTree.prototype.create = function (_id) {
            _id.appendChild(this.getHtmlTree());
            this.collapse();
            _id = null;
        };

        jqTree.prototype.getHtmlTree = function () {
            return this.tree.toHtml();
        };

        jqTree.prototype.getTree = function () {
            return this.tree;
        };

        jqTree.prototype.setTree = function (_tree) {
            this.tree = _tree;
            _tree = null;
        };
        jqTree.prototype.getBranchList = function () {
            return this.branchList;
        };

        jqTree.prototype.setBranchList = function (_branchList) {
            this.branchList = _branchList;
            _branchList = null;
        };

        jqTree.prototype.finalize = function () {
            this.tree.expire();
            this.tree = null;
            this.branchList = null;
        };
        return jqTree;
    })();
    exports.jqTree = jqTree;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    * Rama de la estructura arbol
    **/
    var jqBranch = (function () {
        function jqBranch(_jqLabel) {
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

            this.branchList = new Array();
            this.leavesList = new Array();

            this.init();
            _jqLabel = null;
        }
        jqBranch.prototype.init = function () {
            var _this = this;
            this.branch.addClass(jqE.jqStyle.JQ_TREE_BRANCH_DF);

            this.leaves.addClass(jqI.jqFontAwesome.FA_UL);

            this.iconCurrent = this.iconOpen;
            this.branch.appendElement(this.iconOpen);
            this.branch.appendElement(this.content);

            this.branch.addEvent(jqE.jqEvent.CLICK, function (e) {
                if (_this.isOpen()) {
                    _this.collapseLeaves();
                    _this.collapseBranchs();
                } else {
                    _this.expandLeaves();
                    _this.expandBranchs();
                }
            });
        };

        jqBranch.prototype.addLeaf = function (_leaf) {
            this.leaves.appendElement(_leaf.getLeaf());
            this.leavesList.push(_leaf);
            _leaf = null;
        };

        jqBranch.prototype.addBranch = function (_branch) {
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

        jqBranch.prototype.collapseBranchs = function () {
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
        };

        jqBranch.prototype.collapseLeaves = function () {
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
        };

        jqBranch.prototype.expandBranchs = function () {
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
        };

        jqBranch.prototype.expandLeaves = function () {
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
        };

        jqBranch.prototype.setReadOnlyLeaves = function () {
            var _length = this.leavesList.length;

            for (var i = _length - 1; i >= 0; i--) {
                var _leaf = this.leavesList[i];
                _leaf.setReadOnly(this.readOnly);
                _leaf = null;
            }
        };

        jqBranch.prototype.setReadOnlyBranchs = function () {
            var _length = this.branchList.length;

            for (var i = _length - 1; i >= 0; i--) {
                var _branch = this.branchList[i];
                _branch.setReadOnly(this.readOnly);
                _branch = null;
            }
        };

        /*** GETTERS AND SETTERS ***/
        jqBranch.prototype.getBranch = function () {
            return this.branch;
        };

        jqBranch.prototype.setBranch = function (_branch) {
            this.branch = _branch;
            _branch = null;
        };

        jqBranch.prototype.getLeaves = function () {
            return this.leaves;
        };

        jqBranch.prototype.setLeaves = function (_leaves) {
            this.leaves = _leaves;
            _leaves = null;
        };

        jqBranch.prototype.getIconOpen = function () {
            return this.iconOpen;
        };

        jqBranch.prototype.setIconOpen = function (_icon) {
            this.iconOpen = _icon;
            _icon = null;
        };

        jqBranch.prototype.getIconClose = function () {
            return this.iconClose;
        };

        jqBranch.prototype.setIconClose = function (_icon) {
            this.iconClose = _icon;
            _icon = null;
        };

        jqBranch.prototype.getContent = function () {
            return this.content;
        };

        jqBranch.prototype.setContent = function (_content) {
            this.content = _content;
            _content = null;
        };

        jqBranch.prototype.isOpen = function () {
            return this.open;
        };

        jqBranch.prototype.setOpen = function (_open) {
            this.open = _open;
            _open = null;
        };

        jqBranch.prototype.getBranchList = function () {
            return this.branchList;
        };

        jqBranch.prototype.setBranchList = function (_branchList) {
            this.branchList = _branchList;
            _branchList = null;
        };

        jqBranch.prototype.getLeavesList = function () {
            return this.leavesList;
        };

        jqBranch.prototype.setLeavesList = function (_leavesList) {
            this.leavesList = _leavesList;
            _leavesList = null;
        };
        jqBranch.prototype.getIconCurrent = function () {
            return this.iconCurrent;
        };

        jqBranch.prototype.setIconCurrent = function (_icon) {
            this.iconCurrent = _icon;
            _icon = null;
        };

        jqBranch.prototype.isCollapse = function () {
            return this.collapse;
        };

        jqBranch.prototype.setCollapse = function (_collapse) {
            this.collapse = _collapse;
            _collapse = null;
        };

        jqBranch.prototype.isReadOnly = function () {
            return this.readOnly;
        };

        jqBranch.prototype.setReadOnly = function (_readOnly) {
            this.readOnly = _readOnly;
            this.setReadOnlyLeaves();
            this.setReadOnlyBranchs();
            _readOnly = null;
        };

        jqBranch.prototype.finalize = function () {
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
        return jqBranch;
    })();
    exports.jqBranch = jqBranch;

    /**
    @ Autor : Yonatan Alexis Quintero Rodriguez
    @ Version: 0.1
    @ Fecha : 13 - 03 - 2014
    * Hoja de estructura de arbol
    **/
    var jqLeaf = (function () {
        function jqLeaf(_jqLabel) {
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
        jqLeaf.prototype.init = function () {
            var _this = this;
            this.leaf.addClass(jqE.jqStyle.JQ_TREE_LEAF_DF);

            this.content.setInnerHtml(this.leaf.getJQLabel());
            this.iconCurrent = this.iconUnSelected;
            this.leaf.appendElement(this.iconUnSelected);
            this.leaf.appendElement(this.content);

            this.leaf.addEvent(jqE.jqEvent.CLICK, function (e) {
                if (!_this.isReadOnly()) {
                    if (_this.isSelected()) {
                        _this.unSelectedLeaf();
                    } else {
                        _this.selectedLeaf();
                    }
                }
            });
        };

        jqLeaf.prototype.selectedLeaf = function () {
            if (!this.isReadOnly()) {
                this.selected = true;

                if (this.iconSelected !== this.iconCurrent) {
                    this.leaf.replaceElement(this.iconSelected, this.iconUnSelected);
                    this.iconCurrent = this.iconSelected;
                }
            }
        };

        jqLeaf.prototype.unSelectedLeaf = function () {
            if (!this.isReadOnly()) {
                this.selected = false;

                if (this.iconUnSelected !== this.iconCurrent) {
                    this.leaf.replaceElement(this.iconUnSelected, this.iconSelected);
                    this.iconCurrent = this.iconUnSelected;
                }
            }
        };

        jqLeaf.prototype.getLeaf = function () {
            return this.leaf;
        };

        jqLeaf.prototype.setLeaf = function (_leaf) {
            this.leaf = _leaf;
            _leaf = null;
        };

        jqLeaf.prototype.getIconSelected = function () {
            return this.iconSelected;
        };

        jqLeaf.prototype.setIconSelected = function (_icon) {
            this.iconSelected = _icon;
            _icon = null;
        };

        jqLeaf.prototype.getIconUnSelected = function () {
            return this.iconUnSelected;
        };

        jqLeaf.prototype.setIconUnSelected = function (_icon) {
            this.iconUnSelected = _icon;
            _icon = null;
        };

        jqLeaf.prototype.getIconCurrent = function () {
            return this.iconCurrent;
        };

        jqLeaf.prototype.setIconCurrent = function (_icon) {
            this.iconCurrent = _icon;
            _icon = null;
        };

        jqLeaf.prototype.getContent = function () {
            return this.content;
        };

        jqLeaf.prototype.setContent = function (_content) {
            this.content = _content;
            _content = null;
        };

        jqLeaf.prototype.isSelected = function () {
            return this.selected;
        };

        jqLeaf.prototype.setSelected = function (_selected) {
            this.selected = _selected;
            _selected = null;
        };

        jqLeaf.prototype.isReadOnly = function () {
            return this.readOnly;
        };

        jqLeaf.prototype.setReadOnly = function (_readOnly) {
            this.readOnly = _readOnly;
            _readOnly = null;
        };

        jqLeaf.prototype.finalize = function () {
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
        return jqLeaf;
    })();
    exports.jqLeaf = jqLeaf;
});
