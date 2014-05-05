///<reference path=".././com/jquiro/progress_bar/JQProgressBar.ts"/>
/// <reference path=".././com/jquiro/tree/JQTree.ts"/>



import jqPro = require('.././com/jquiro/progress_bar/JQProgressBar');
import jqTr = require('.././com/jquiro/tree/JQTree');




var sectProg = document.getElementById('progress');

var progressBarInfo = new jqPro.jqProgressBarInfo(80, 'CSS 3');
var progress = new jqPro.jqProgress(progressBarInfo);
progress.create(sectProg);

var progressBar = new jqPro.jqProgressBar(20, 'HTML 5');
var progressStriped = new jqPro.jqProgressStriped(progressBar);
progressStriped.create(sectProg);

var progressStacked = new jqPro.jqProgressStriped(new jqPro.jqProgressBarDanger(50, 'java'));
progressStacked.add(new jqPro.jqProgressBarSuccess(50, 'c#'));
progressStacked.setAnimated(true);
progressStacked.create(sectProg);




var treeId = document.getElementById('treeSimple');

var h = new jqTr.jqLeaf('hoja');
var hoja1 = new jqTr.jqLeaf('hoja 1');
var hoja2 = new jqTr.jqLeaf('hoja 2');

hoja1.setReadOnly(true);

var hoja3 = new jqTr.jqLeaf('hoja 3');
var hoja4 = new jqTr.jqLeaf('hoja 4');

var hoja5 = new jqTr.jqLeaf('hoja 5');
var hoja6 = new jqTr.jqLeaf('hoja 6');

var rama1 = new jqTr.jqBranch('rama 1');
rama1.addLeaf(hoja1);
rama1.addLeaf(hoja2);



var rama2 = new jqTr.jqBranch('rama 2');
rama2.addLeaf(hoja3);
rama2.addLeaf(hoja4);

var rama21 = new jqTr.jqBranch('rama 2.1');
rama21.addLeaf(hoja5);
rama21.addLeaf(hoja6);

var rama22 = new jqTr.jqBranch('rama 2.2');
rama22.addLeaf(new jqTr.jqLeaf('hoja 7'));
rama22.addLeaf(new jqTr.jqLeaf('hoja 8'));
rama22.addLeaf(new jqTr.jqLeaf('hoja 9'));

rama21.addBranch(rama22);
rama2.addBranch(rama21);





var arbol = new jqTr.jqTree('arbol 1');
arbol.addBranch(rama1);
arbol.addBranch(rama2);


arbol.create(treeId);
hoja3.setReadOnly(true);
rama2.setReadOnly(true);

//rama1.collapseLeaves();
rama1.setCollapse(false);
hoja6.setReadOnly(false);
hoja6.getLeaf().addEvent('click', () => {

    if (hoja6.isSelected()) {

        
        rama1.setCollapse(true);
        rama1.expandLeaves();
        rama1.setCollapse(false);
        
    }

});
arbol.finalize();










