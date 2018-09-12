# JavaScript-DOM扩展
## 选择符API
### 1.querySelector()方法
querySelector()方法接受一个CSS标签符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。  
e.g.
>//取得body元素  
var body=document.querySelector("body");  
//取得ID为"myDiv"的元素  
var myDiv=document.querySelector("#myDiv");  
//取得类为"selected"的第一个元素  
var selected=document.querySelector(".selected");    

通过Document类型调用querySelector()方法时，会在文档元素的范围内查找匹配的元素。而通过Element类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。
### 2.querySelectorAll()方法  
该方法与querySelector()接受的参数一样，但是返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList的实例。  
能够调用querySelectorAll()方法的类型包括Document,DocumentFragment和Element。e.g.  
>//取得某`<div>中的所有<em>元素`  
var ems=document.getElementById("myDiv").querySelectorAll("em");  
//取得类为 "selected" 的所有元素  
var selected=document.querySelectorAll(".selected");  
//取得所有`<p>元素中的所有<strong>元素`  
var strong=document.querySelectorAll("p strong");

实例e.g.  

    <body>
    <p>p label</p>
    <p>another p label</p>
    <p id="para">use id </p>
    <ul ><li class="paraClass"> ul li item1</li></ul>  
    <p class="paraClass">class test</p>
    <script>
    var p = document.querySelectorAll("p");
    console.log(p);
    </script>
    </body>
![](https://s1.ax2x.com/2018/09/12/5FJhbJ.png)  
  四个p元素  
### 3.atchesSelector()方法  
这个方法接受一个参数，即css选择符，如果调用元素与该选择符匹配，则返回true，否则，返回false。  

    var p =document.getElementsByTagName("p")[0].webkitMatchesSelector("p");  
    //p=true
## 元素遍历
对于元素间的空格，浏览器会返回文本节点，这样就导致在使用childNodes和firstChild等属性时的行为不一致。为了弥补这一差异，Element Traversal规范新定义了一组属性。  

Element Traversal API为DOM元素添加了以下5个属性  
<ul>
<li>childElementCount : 返回子元素(不包含文本节点和注释)的个数</li>
<li>firstElementChild : 指向第一个子元素;firstChild的元素版</li>
<li>lastElementChild  : 指向最后一个子元素;lastChild的元素版</li>
<li>previousElementSibling: 指向前一个同辈元素;previousSibling的元素版</li>
<li>nextElementChild: 指向后一个同辈元素;nextSibling的元素版</li>
</ul>
利用这些元素不必担心空白文本节点，从而可以更方便地查找DOM元素了。  

    <body>
    <ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    </ul>
    <script>
    var ul = document.querySelector("ul");
    //取到第一个子节点元素
    var first = ul.firstElementChild;
    for (var i = 0; i < ul.childElementCount; i++) {
        console.log(first);
        //做遍历所有的Element元素
        first = first.nextElementSibling;
    }
    </script>
    </body>
![5FJeNE.png](https://s1.ax2x.com/2018/09/12/5FJeNE.png)  
## HTML5-与类相关的扩充
### 1.getElementsByClassName()方法

    //取得所有类中包含"username"和"current"的元素,类名的先后顺序无所谓  
    var all=document.getElementsByClassName("username current");  
    //取得ID为"myDiv"的元素中带有类名"selected"的所有元素  
    var=selected=document.getElementById("myDiv").getElementsByClassName("selected");
**该方法返回的对象是NodeList**

### 2.classList属性  
<li>add(value):将给定的字符串值添加到列表中，如果存在，就不添加了
<li>contains(value):表示列表中是否存在给定的值，如果存在则返回true，否则返回false  
<li>remove(value):从列表中删除给定的字符串
<li>toggle(value):如果列表中已经存在给定的值，删除它;如果列表中没有给定的值，添加它  

    var ul = document.querySelector("ul");
    ul.classList.remove("second");
有了classList属性，除非你需要全部删除所有类名，或者完全重写元素的class属性，否则也就用不到className属性了。  
