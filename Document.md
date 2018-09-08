# JavaScript-DOM-Document
## 文档的子节点
document对象还有一个body属性,直接指向<body>元素e.g.

    <body>
    <script>
    console.log(document.body.nodeName);
    </script>
    </body>  
![5Fm0mH.png](https://s1.ax2x.com/2018/09/08/5Fm0mH.png)  
## 文档信息
### title
title显示在浏览器窗口的标题栏或者标签栏上，通过这个属性可以取得到标题，也可以修改title的值e.g.

    <!DOCTYPE html>
    <html lang="zh-cn" xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8" />
    <title>this is a demo</title>
    </head>
    <body>
    <script>
      console.log(document.title);
      document.title = "Now i am changed";
      </script></body>
    </html>
![5FmQZN.png](https://s1.ax2x.com/2018/09/08/5FmQZN.png)  
### URL，domain，referrer
URL属性中包含页面完整的URL(即地址栏中显示的URL)  
domain属性中只包含页面的域名  
referrer属性中则保存着连接到当前页面的那个页面的URL  

    <script>
    console.log(document.URL);
    console.log(document.domain);
    console.log(document.referrer);
    </script>
运行在XAMPP上  

![5FmOnq.png](https://s1.ax2x.com/2018/09/08/5FmOnq.png)   
## 查找元素
### 1.getElementById()
### 2.getElementByTagName()
这个方法接受一个参数（要取得的元素的标签名）,而返回的是包含零或多个元素的NodeList。
`var myImg=document.getElementByTagName("img");`   
### 3.getElementByName()
最常用的方法是取得单选按钮，为了确保发送给浏览器的值正确无误，所有单选按钮必须具有相同的name特性。如下。  

    <body>
    <fieldset>
        <legend>Which color do you prefer</legend>
        <ul>
            <li>
                <input type="radio" value="red" name="color" id="colorRed">
                <label for="colorRed">Red</label></li>
            <li>
                <input type="radio" value="green" name="color" id="colorGreen">
                <label for="colorGreen">Green</label></li>
            <li>
                <input type="radio" value="blue" name="color" id="colorBlue">
                <label for="colorBlue">Blue</label></li>
        </ul>
    </fieldset>

    <script>
    document.getElementsByTagName("fieldset")[0].onclick = function () {
        var radios = document.getElementsByName("color");
        (function(){
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked)
                    console.log(radios[i].value);
            }
        })();
    }
    </script>
    </body>
**使用label标签中的for属性可以与input属性绑定，当点击了label，input自动获得焦点，所有的但选项的name属性为同名**  
![5Fm6pE.png](https://s1.ax2x.com/2018/09/08/5Fm6pE.png)  
## 文档写入

<table>
<tr><td>open()</td><td>close()</td></tr>
<tr><td>write()</td><td>writeln()</td></tr>
</table>
write()和writeln的区别在于，writeln在一行后会添加"\n"(一个空格),而write()则无空格  

    document.write("<script src='hello.js'> +<\/script>");
**可以用write方法动态地包含外部资源，例如JavaScript文件等。**  
如果在文档加载借宿后再调用document.write()，那么输出的内容会重写整个页面。  
方法open()和close()分别用于打开和关闭网页的输出流，如果在网页的加载期间使用write()和writeln()方法，则不需要用到这两个方法。  

    <script language="javascript">
    var newWindow = window.open('about:blank',"new","width=300,height=400");
    newWindow.document.open(); // 打开弹出窗口的输入流
    document.write("hello"); // 在原窗口写
    newWindow.document.write(" world");//在打开的窗口写
    newWindow.document.close(); // 关闭弹出窗口的输入流
    </script>
![5FmI1Q.png](https://s1.ax2x.com/2018/09/08/5FmI1Q.png)
 
不用open()方法会直接在原窗口中写入，用open()之后在新打开的窗口写入。
