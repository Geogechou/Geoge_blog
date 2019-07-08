## JavaScript-DOM-Element
Element节点具有以下特征 

* nodeType的值为1
* nodeName的值为标签名
* nodeValue的值为null
* parentNode可能是Document或Element


要访问元素的标签名，可以使用nodeName属性，也可以使用<font size="4"><i>tagName</i></font>属性；这两个属性会返回相同的值

```html
<body>
<div id="myDiv">s</div>
<script>
console.log("tagName "+document.getElementById("myDiv").tagName);
console.log("nodeName "+document.getElementById("myDiv").nodeName);
</script>
</body>
在HTML中，标签名始终都是全部大写表示。而在XML中标签名则始终会与源代码中的保持一致。假如脚本会在HTML和XML中执行，最好在比较之前将标签名转化为相同的大小写形式e.g.   
```
```js
if(element.tagName.toLowerCase()=="div"){
  //....(适用于任何文本)
}
```
## HTML元素
HTMLElement类型直接继承自Element并添加了一些属性。添加的这些属性分别对应于每个HTML元素中都存在的下列标准特性  
<table>
<tr><th>id</th><td>元素在文中的唯一标识符</td><td>对用户来说是同名不可见的</td></tr>
<tr><th>title</th><td>有关元素的附加说明信息，一般通过工具提示条显示出来</td><td>鼠标地洞到这个元素上才会显示出来</td></tr>
<tr><th>className</th><td>与元素的class相对应，即元素指定的css类。没有将这个属性命名为class，是因为class是ES的保留字</td><td>如果新类关联了与此前不同的CSS样式，会立即采用新的样式</td></tr>
<tr><th>dir</th><td>语言的方向，值为'ltr'或者'rtl'，很少使用</td><td>立即影响页面中文本的左右对齐方式</td></tr>
<tr><th>lang</th><td>元素内容的语言代码，很少使用</td><td>language</td></tr>
</table>  

```js
console.log(document.getElementById("myDiv").dir);
console.log(document.getElementById("myDiv").className);
//即可以取得相应的特性，也可以修改e.g.
document.getElementById("myDiv").title="some other text";
```
### 取得属性
操作特性的DOM方法共有三个  

* getAttribute() 
//传递给getAttribute()的特姓名与实际的特姓名相同
  `div.getAttribute("class");`

### 设置属性
* setAttribute()

//接受两个参数，要设置的特姓名和值,如果属性不存在，将新建一个属性
  `div.setAttribute("class","ft");`  

### 移除属性
* removeAttribute()

可以用于cedilla删除元素的特性 
`div.removeAttribute("class")` 

### attributes属性
想要遍历元素的特性，attributes属性可以派上用场   

```js
<div id="myDiv" dir="rtl" class="textH" title="hel">hello</div>
  <script>
    //这个函数使用了一个数组来保存名值对，最后再以空格为分隔符将他们拼接起来。(这是序列化长字符的一种常用技巧)
   function outputAttribute(element) {
       //js可以用一条语句定义多个变量，只要像下面这样把每个变量用逗号分隔开即可。(初始化或着不初始化都可以)
       var paris = new Array(),
       attrName,
       attrValue,
       i,
       len;

       for (i = 0, len = element.attributes.length; i < len; i++) {
           attrName = element.attributes[i].nodeName;
           attrValue = element.attributes[i].nodeValue;
           paris.push(attrName + "=\"" + attrValue + "\"");
       }
       return paris.join(" ");
   }
   console.log(outputAttribute(document.getElementById("myDiv")));
  </script>

```
### 创建元素
#### document.createElement()方法
可以创建新元素，这个方法只接受一个参数，即要创建元素的标签名。  

```js
var img = document.createElement("img");
img.src = "https://s1.ax2x.com/2018/09/09/5FV7UA.png";
document.body.appendChild(img);
```
需要创建好元素，添加好元素的特性，然后用appendChild()、insertBefore()，replaceChild()方法来添加到文文本树中。`一旦添加到文档树中，浏览器会立即呈现该元素`。  
### 元素的子节点
元素的childNodes属性中包含了它的所有子节点。  

```html
<body>
<ul id="UL">
<li>item 1</li>
<li>item 2</li>
<li>item 3</li>
</ul>
<script>
    var ul=document.getElementById("UL");
    for (var i = 0; i < ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeType==1)//只保留元素节点，去除空格
        console.log(document.getElementById("UL").childNodes[i].nodeName);
    }
</script>
</body>
```
元素的childNodes属性中包含了它的所有子节点。这些子节点有可能是元素,文本节点，注释，处理指令。 
如果需要通过childNodes属性来遍历子节点，通常要先检查一下`nodeType属性`。
**实际上元素也支持getElementByTagName()方法** 
`document.getElementById("UL").getElementByTagName("li")[0];`
获得ul中第一个li元素.