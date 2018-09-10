# JavaScript-DOM-Text类型
文本节点由Text类型表示，包含的是可以照字面解释的纯文本内容。纯文本内容可以包含转义后的HTML字符，但不能包含HTML代码。  
>Text节点具有以下特征  
  <ul>
  <li>nodeType的值为3</li>
  <li>nodeName的值为"#text"</li>
  <li>nodeValue的值为节点所包含的文本</li>
  <li>parentNode是一个Element</li>
  <li>没有子节点</li>
  </ul>

### 通过nodeValue属性来修改文本节点   

    <div>this is a div block</div>
    <script>
    var div = document.getElementsByTagName("div")[0];
    console.log(div.firstChild.nodeName);
    //修改文本节点的值
    div.firstChild.nodeValue= "Now i am changed";
    </script>
![5Fd6SB.png](https://s1.ax2x.com/2018/09/10/5Fd6SB.png)  
### 创建文本节点  
#### document.createTextNode()方法
这个方法接受一个参数，要插入节点中的文本。e.g.  

    <body>
    <div></div>
    <script>
    var div = document.getElementsByTagName("div")[0];
    //创建一个文本节点
    var textNode = document.createTextNode("hello world!");
    //插入到网页中
    div.appendChild(textNode);
    </script>
    </body>
### 规范化文本节点
#### normalize()方法
DOM中存在相邻的同胞文本节点很容易混乱，催生出一个能够将相邻文本节点合并的方法，名叫normalize()方法,e.g.   

    <body>
    <div></div>
    <script>
    var div = document.getElementsByTagName("div")[0];
    var text1 = document.createTextNode("hello");
    div.appendChild(text1);
    var text2 = document.createTextNode(" Geoge ");
    div.appendChild(text2);
    var text3 = document.createTextNode("chou");
    div.appendChild(text3);
    console.log("插入之后的子节点数 " + div.childNodes.length);
    //规范化文本节点
    div.normalize();
    console.log("normalize()之后的文本节点数 " + div.childNodes.length);
    </script>
    </body>
![5FjTaO.png](https://s1.ax2x.com/2018/09/10/5FjTaO.png)    
### 分割文本节点
#### splitText()方法
该方法会将一个文本节点分成两个文本节点，原来的文本节点将包含从开始到指定位置之前的内容，新文本节点包含剩下的文本,e.g.  

    <div>hello world!</div>
    <script>
    var div = document.getElementsByTagName("div")[0];
    //从位置5分割为两个节点
    div.firstChild.splitText(5);
    console.log(div.childNodes.length);
    console.log(div.childNodes[0].nodeValue);
    console.log(div.childNodes[1].nodeValue);
    </script>
![5FjH0A.png](https://s1.ax2x.com/2018/09/10/5FjH0A.png)  
分割文本节点是从文本节点中提取数据的一种常用的DOM解析计数
