## alert/confirm/prompt
浏览器通过alert(),confirm(),prompt()方法可以调用系统对话框向用户显示信息。**显示这些对话框时，代码会停止执行**，而关掉这些对话框之后代码又会恢复执行。  
### alert()    
### confirm()

```js
    alert("this is a alert window");
    if (confirm("are you sure?"))
    console.log("yes I am so glad you're sure!");
    else
    console.log("I'm so sorry to hear you're not sure!");
```
confirm()函数返回一个布尔值，true表示单击了ok，false表示点击了cancel或单击右上角的X按钮。      
### prompt()

prompt()函数接受两个参数：要显示给用户的文本提示和文本输入域的默认值(可以是一个空字符串)。
prompt()函数的返回值，如果用户点击了OK，则返回文本输入域的值，否则该方法返回null.

```javascript
    var result = prompt("what is your name?", "geoge");
    if (result !== null) {
    alert("welcome, " + result);
    }
```