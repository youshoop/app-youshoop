///<reference path=".././com/progressBar/JProgressBar.ts"/>
/// <reference path=".././com/tree/JTree.ts"/>



import JProgressBarMD = require('.././com/progressBar/JProgressBar');
import JTreeMD = require('.././com/tree/JTree');




var sectProg = document.getElementById('progress');

var progressBarInfo = new JProgressBarMD.JProgressBarInfo(80, 'CSS 3');
var progress = new JProgressBarMD.JProgress(progressBarInfo);
progress.create(sectProg);

var progressBar = new JProgressBarMD.JProgressBar(20, 'HTML 5');
var progressStriped = new JProgressBarMD.JProgressStriped(progressBar);
progressStriped.create(sectProg);

var progressStacked = new JProgressBarMD.JProgressStriped(new JProgressBarMD.JProgressBarDanger(50, 'java'));
progressStacked.add(new JProgressBarMD.JProgressBarSuccess(50, 'c#'));
progressStacked.setAnimated(true);
progressStacked.create(sectProg);




var treeId = document.getElementById('treeSimple');

var h = new JTreeMD.JLeaf('hoja');
var hoja1 = new JTreeMD.JLeaf('hoja 1');
var hoja2 = new JTreeMD.JLeaf('hoja 2');

hoja1.setReadOnly(true);

var hoja3 = new JTreeMD.JLeaf('hoja 3');
var hoja4 = new JTreeMD.JLeaf('hoja 4');

var hoja5 = new JTreeMD.JLeaf('hoja 5');
var hoja6 = new JTreeMD.JLeaf('hoja 6');

var rama1 = new JTreeMD.JBranch('rama 1');
rama1.addLeaf(hoja1);
rama1.addLeaf(hoja2);



var rama2 = new JTreeMD.JBranch('rama 2');
rama2.addLeaf(hoja3);
rama2.addLeaf(hoja4);

var rama21 = new JTreeMD.JBranch('rama 2.1');
rama21.addLeaf(hoja5);
rama21.addLeaf(hoja6);

var rama22 = new JTreeMD.JBranch('rama 2.2');
rama22.addLeaf(new JTreeMD.JLeaf('hoja 7'));
rama22.addLeaf(new JTreeMD.JLeaf('hoja 8'));
rama22.addLeaf(new JTreeMD.JLeaf('hoja 9'));

rama21.addBranch(rama22);
rama2.addBranch(rama21);





var arbol = new JTreeMD.JTree('arbol 1');
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










