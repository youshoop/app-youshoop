/// <reference path=".././htmlObject/HtmlObject.ts" />
import HtmlObject = require('.././htmlObject/HtmlObject');

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 22 - 03 - 2014
* Elemento progress de jumbotron bootstrap (http://getbootstrap.com/components/#jumbotron)
**/
export class JJumbotron extends HtmlObject.div implements HtmlObject.IHtmlObjectElement{
    
    constructor(){
         
        super('jjumbotron');
        
        this.addClass('jumbotron');
    }
    
    init(){}

    create(_id: HTMLElement){
          
        _id.appendChild(this.getHtml());
        _id = null;
    }
   
    getHtml(): HTMLElement{
        
        return this.toHtml();
    }
    
    finalize(){
         
        this.expire(); 
    }
}