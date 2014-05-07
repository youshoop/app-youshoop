/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 06/05/2014
* Lista de eventos javascript
**/

///<reference path="../.././com/progressBar/JProgressBar.ts"/>
/// <reference path="../.././com/tree/JTree.ts"/>
/// <reference path="../.././com/htmlObject/HtmlObject.ts"/>
/// <reference path="../.././com/jumbotron/JJumbotron.ts"/>
import JProgressBarMD = require('../.././com/progressBar/JProgressBar');
import JTreeMD = require('../.././com/tree/JTree');
import HtmlObject  = require('../.././com/htmlObject/HtmlObject');
import JumbotronMD  = require('../.././com/jumbotron/JJumbotron');

export class home{
 
     body:HTMLElement;
     header:HtmlObject.header;     
     
     constructor(){
         
         this.body = document.getElementById('home');
         
         this.init();
    }
     
    private init(){
        
        this.createHeader();  

    }
    
    private createHeader(){
         
        this.header = new HtmlObject.header();
        this.header.addClass('container-fluid');        
        this.body.appendChild(this.header.toHtml());
        
        var row_div_1 = new HtmlObject.div();
        row_div_1.addClass('col_md_8');         
        
        this.header.appendElement(row_div_1);        
        
        var jumbotron = new JumbotronMD.JJumbotron();
        jumbotron.create(row_div_1.toHtml());        
        
   }
}



