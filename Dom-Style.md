## DOM-Style
下表列出几个常见的css属性及其在style对象中对应的属性名  
<table>
<tr><th>CSS属性</th><th>JavaScript属性</th></tr>
<tr><td>background-color</td><td>style.backgroundColor</td></tr>
<tr><td>color</td><td>style.color</td></tr>
<tr><td>display<td>style.display</td></tr>
<tr><td>font-family</td><td>style.fontFamily</td></tr>
<tr><td>float</td><td>style.cssFloat</td></tr>
</table>

### 访问元素的样式

    var myDiv=document.querySelector("#myDiv");
    //设置背景颜色
    myDiv.style.backgroundColor="red";

    //设置大小
    myDiv.style.width="100px";

    //指定边框
    myDiv.style.border="1px solid black";
在以这种方式改变样式时，元素的外观会自动更新  
### style 的一系列属性和方法
#### cssText属性
    var temp = document.querySelector("#myDiv");
    //在写入模式下，重写整个style特性的值
    temp.style.cssText = "width:100px; height:100px; background-color:green";
    //在读出模式下，取得所有css属性
    console.log(temp.style.cssText);
### getPropertyValue()方法
该方法始终取得的都是CSS属性值的字符串表示

    for (var i = 0; i < temp.style.length; i++) {
      var prop = temp.style[i];
      var value = temp.style.getPropertyValue(prop);
      console.log(prop+" "+value);
    }
![5FyRHY.png](https://s1.ax2x.com/2018/09/13/5FyRHY.png)  
### removeProperty()方法
从元素的样式中移除某个css属性  

        myDiv.style.removeProperty("background-color");
        //移除背景颜色的css属性
### 计算的样式
`document.defaultView.getComputedStyle()`  

该方法接受两个参数，第一个为要取得计算样式的元素和一个伪元素字符串，如果不需要伪元素信息，可以设置为null

    <!DOCTYPE html>
    <html lang="zh-cn" xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8" />
    <title>this is a demo</title>
    <style>
    #myDiv{
      background-color:blue;
      width:100px;
      height:200px;
    }
    </style>
    </head>
    <body>
    <div id="myDiv" style="background-color:red; border:1px solid black">一个div块级元素</div>
    <script>
    var temp = document.querySelector("#myDiv");
    var comput = document.defaultView.getComputedStyle(temp, null);
    //计算层叠后的背景颜色
    console.log(comput.backgroundColor);
    console.log(comput.border);
    </script>
    </body>
    </html>
所有计算的样式都是只读的
### styleSheets集合
<table>
<tr><th>属性</th><th>含义</th><th>值</th></tr>
<tr><td>disabled</td><td>表示样式表是否被禁用</td></tr>
<tr><td>title</td><td>ownerNode中的title属性</td></tr>
<tr><td>type</td><td>表示样式表类型的字符串</td><td>"type/css"</td></tr>
</table>

    var sheet = null;
    for (var i = 0, len = document.styleSheets.length; i < len; i++) {
      sheet = document.styleSheets[i];
      //打印出样式表的href属性
      console.log(sheet.href);
    }
应用于文档的所有样式表是通过document.styleSheets集合表示的，通过这个集合的length属性可以获知文档中样式表的数量  
