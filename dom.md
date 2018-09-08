# Javascript-DOM-Node
## Node类型
每个节点都有一个nodeType属性，表明节点的类型。节点类型是以下定义的12个数值来表示  
<table>
<tr><td>1.Node.ELEMENT_NODE(1)</td></tr>
<tr><td>2.Node.ATTRIBUTE_NODE(2)</td></tr>
<tr><td>3.Node.TETX_NODE(3)</td></tr>
<tr><td>4.Node.CDATA_SECTION_NODE(4)</td></tr>
<tr><td>5.Node.ENTITY_REFERENCE_NODE(5)</td></tr>
<tr><td>6.Node.ENTITY_NODE(6)</td></tr>
<tr><td>7.Node.PROCESSING_INSTRUCTION_NODE(7)</td></tr>
<tr><td>8.Node.COMMENT_NODE(8)</td></tr>
<tr><td>9.Node.DOCUMENT_NODE(9)</td></tr>
<tr><td>10.Node.DOCUMENT_TYPE_NODE(10)</td></tr>
<tr><td>11.Node.DOCUMENT_FRAGMENT_NODE(11)</td></tr>
<tr><td>12.Node.NOTATION_NODE(12)</td></tr>
 </table>  

通过这些变量可以确定节点的类型，e.g.  

    <p>this is a paragraph text</p>
    <script>
    if (document.getElementsByTagName("p")[0].nodeType == Node.ELEMENT_NODE)
    console.log("element.node");
    </script>
### 1.nodeName和nodeValue属性  

    <p>this is a paragraph text</p>
    <script>
    var temp=document.getElementsByTagName("p")[0];
    if (temp.nodeType == Node.ELEMENT_NODE)
    {
        console.log("element.node");
        console.log(temp.nodeName);
        console.log(temp.nodeValue);
    }
    </script>
![5FT523.png](https://s1.ax2x.com/2018/09/07/5FT523.png)  
**对于元素节点，nodeName中保存的始终是元素的标签名，而nodeValue的值则始终是null**  
### 2.节点关系
每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。`虽然可以通过方括号语法来访问NodeList的值，而且这个对象也有length属性，但它不是Array实例`。e.g.

    <!DOCTYPE html>
    <html lang="zh-cn" xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8" />
    <title></title>
    <script>
      window.onload = function () {
          var temp = document.getElementsByTagName("body")[0];
          for (var i = 0; i < temp.childNodes.length; i++)
              console.log(temp.childNodes[i].nodeName);
          console.log(temp.childNodes.length);
      }
    </script>
    </head>
    <body><p>this is a paragraph text</p><input type="button" value="button E.G."/></body>
    </html>
![5FTbsA.png](https://s1.ax2x.com/2018/09/07/5FTbsA.png)  
//最后一个#text元素暂时还不清楚，把空格，换行全部去掉了还是有#text  

---
每个节点都有`parentNode`,该属性指向文档树中的父节点，包含在childNodes列表中的所有节点都具有相同的父节点。  
包含在childNodes列表中的每个节点相互之间都是同胞节点。使用列表中的每个节点的`previousSibling`和`nextSibling`属性，可以访问同一列表中的其他节点。列表中的第一个节点的previousSibling是null。e.g.

    window.onload = function () {
      var temp = document.getElementsByTagName("p")[0];
      console.log(temp.parentNode.nodeName);
      console.log(temp.previousSibling);
      console.log(temp.nextSibling.nodeName);
    }
![5FTpAO.png](https://s1.ax2x.com/2018/09/07/5FTpAO.png)

---
父节点的firstChild和lastChild属性分别指向childNodes列表中的第一个和最后一个节点。

hasChildNodes()也是一个非常有用的方法，这个方法在节点包含一或多个子节点的情况返回true；e.g.  

    <script >
    window.onload = function () {
      var temp = document.getElementsByTagName("p")[0];
      console.log(temp.hasChildNodes());
      console.log(temp.childNodes[0].nodeValue);
    }
    </script>
    </head>
    <body><p>this is a paragraph text</p><input type="button" value="button E.G."/></body>
![5FTsqq.png](https://s1.ax2x.com/2018/09/07/5FTsqq.png)  

---
所有节点都有最后一个属性是ownerDocument,该属性指向整个文档的文档节点，通过这个属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是直接访问文档节点。   
### 操作节点
`appendChild(),向childNodes里末尾中添加一个节点。更新完成后，appendChild()返回新增的节点`  

      <script>
      window.onload = function () {
        var node = document.createElement("LI");//创建一个节点
        var text = document.createTextNode("fourth");//创建节点的文本节点
        node.appendChild(text);
        document.getElementsByTagName("ul")[0].appendChild(node);//把节点插入到ul中
      }
      </script>
      </head>
      <body>
      <ul>
        <li id="first">first</li>
        <li>second</li>
        <li>third</li>
        </ul>
      </body>
示例中将fourth插入到third之后      
![5FXjR6.png](https://s1.ax2x.com/2018/09/08/5FXjR6.png)  
**如果传入到appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来位置转移到新位置。**

    <ul id="firstUl">
    <li>first</li>
    <li>second</li>
    <li>third</li>
    </ul>
    <ul id="secondUl">
    <li>2 First</li>
    <li>2 Second</li>
    </ul>
    <button>点击</button>
    <script>
    document.getElementsByTagName("button")[0].onclick= function () {
        var second = document.getElementById("secondUl");
        document.getElementById("firstUl").appendChild(second.lastChild);
      }
    </script>
任何DOM节点也不能同时出现在文档中的多个位置上。  
*<font size="5">insertBefore()方法</font>*  
如果需要把节点放在childNodes列表中某个特定的位置上，而不是放在末尾，那么需要insertBefore()方法，接受两个参数`要插入的节点`和`作为参照的节点`。如果参照节点是null，则insertBefore()与appendChild()执行相同的操作。  

    <body>
    <ul id="firstUl">
    <li>first</li>
    <li>second</li>
    <li>third</li></ul>
    <ul id="secondUl">
    <li>2 First</li>
    <li>2 Second</li>
    </ul>
    <button>点击</button>
    <script>
    document.getElementsByTagName("button")[0].onclick= function () {
        var second = document.getElementById("secondUl");
        var first = document.getElementById("firstUl");
        //插入到最后一个节点之前
        first.insertBefore(second.lastChild, first.lastChild);
        //注意如果ul中最后一个li后有空格的时候也算一个节点
      }
    </script>
    </body>
*<font size="5">replaceChild()方法</font>*  
该方法接受两个参数是：要插入的节点和要替换的节点e.g.

    <body>
    <ul id="firstUl">
      <li>first</li>
      <li>second</li>
      <li>third</li></ul>
      <ul id="secondUl"><li>2 First</li><li>2 Second</li></ul>
      <button>点击</button>
    <script>
    document.getElementsByTagName("button")[0].onclick= function () {
          var second = document.getElementById("secondUl");
          var first = document.getElementById("firstUl");
          //插入到最后一个节点之前
          first.replaceChild(second.firstChild, first.lastChild);
          //注意如果ul中最后一个li后有空格的时候也算一个节点
    }
    </script>
  </body>
  
*<font size="5">removeChild()方法</font>*   
只想移除节点而非替换节点，可以使用removeChild()方法，接受一个参数，即要移除的节点。e.g.   

    <body>
    <ul id="firstUl">
    <li>first</li>
    <li>second</li>
    <li>third</li></ul>
    <ul id="secondUl"><li>2 First</li><li>2 Second</li></ul>
    <button>点击</button>
    <script>
    document.getElementsByTagName("button")[0].onclick= function () {
        var first = document.getElementById("firstUl");
        first.removeChild(first.lastChild);
      }
    </script>
    </body>
*<font size="5">cloneNode()方法</font>*   
cloneNode()方法接受一个布尔值参数，表示是否执行深复制，在参数为true时，执行深复制(复制节点以及整个子节点数);在参数为false的情况下，执行浅复制（只复制节点本身）。

    <body>
    <ul id="firstUl">
    <li>first</li>
    <li>second</li>
    <li>third</li></ul>
    <ul id="secondUl"><li>2 First</li><li>2 Second</li></ul>
    <button>点击</button>
    <script>
    document.getElementsByTagName("button")[0].onclick= function () {
        var temp = document.getElementById("firstUl");
        var copies = temp.cloneNode(true);
        document.getElementsByTagName("body")[0].appendChild(copies);
      }
    </script>
    </body>
*<font size="5">normalize()方法</font>*   
处理文档树中的文本节点
