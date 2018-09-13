## 焦点管理
首先是document.activeElement属性，这个属性始终会引用DOM中当前获得焦点的元素，元素获得焦点的方式有页面加载，用户输入(通常是按Tab键)和在代码中调用focus()方法。e.g.

    <button id="mybutton">按钮</button>
    <script>
    var butt = document.querySelector("#mybutton");
    butt.focus();
    console.log(document.activeElement == butt);//true
    </script>
默认情况下，文档刚刚加载完成时，document.activeElement中保存的是document.body元素的引用。文档加载期间，document.activeElement的值为null。  
### document.hasFocus()方法
***这个方法用于确认文档是否获得焦点***

    var butt = document.querySelector("#mybutton");
    butt.focus();
    console.log(document.hasFocus());
通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互  
### 自定义数据属性
HTML5规定可以为元素添加非标准的属性，但是要加前缀'data-'  
`<div id="myDiv" data-identify="123456"></div>`  

    //获取属性
    console.log(div.dataset.identify);
### innerHTML 插入标记
<li>在读模式下，innerHTML属性返回调用元素的所有子节点(包含元素，注释和文本节点)对应的HTML标记。  
<li>在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点。  

大多数浏览器都不支持通过innerHTML插入`<script>`元素。  

不支持innerHTML的元素有:`<head>,<html>,>style>,<table>,<tbody>,<thead>,<tfoot>,<tr>`  
### outerHTML
outerHTML返回调用它的元素以及子元素
