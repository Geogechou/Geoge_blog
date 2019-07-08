# AJAX-XMLHttpRequest
> asychronous JavaScript+ XML的间写，这一技术能够向服务器请求额外的数据而无须卸载页面。会带来更好的用户体验，Ajax技术的核心是XMLHttpRequest对象(简称XHR),虽然AJAX中有XML的成分，但AJAX通信与数据格式无关。这种技术就是无须刷新页面即可从服务器取得数据，但不一定是XML数据。

## XMLRequest对象
在这些浏览器中创建XHR对象要像下面这样使用XMLHttpRequest的构造函数  

    var xhr=new XMLHttpRequest();
### XHR的用法
#### 1.open()方法  
在使用XHR对象时，要调用的第一个方法是open()，它接受3个参数：要发送的请求类型("get","post"等)，请求的URL和 表示是否异步发送请求的布尔值。  

    xhr.open("get","example.php",false);
调用open()方法并不会真正发送请求，而只是启动一个请求以备发送。  
要发送特定的请求，必须像下面这样调用send()方法：  
#### 2.send()方法
    xhr.open("get","example.php",true);
    xhr.send(null);
这里send()方法接受一个参数，即作为请求主体要发送的数据。如果不需要通过请求主题发送数据，则必须传入null，因为这个参数对有些浏览器说是必需的。*调用send()方法后，请求会被分派到服务器。*  

在收到响应后，响应的数据会自动填充XHR对象的属性。  
<li>responseText:作为响应主体被返回的文本
<li>responseXML
<li>status: 响应的HTTP状态<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status">HTTP响应代码</a>  
<li>statusText: HTTP状态的说明
在接受到响应后，第一步检查status属性，以确定响应已经成功返回。


    xhr.open("get","example.php",true);
    xhr.send(null);
    if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
      console.log(xhr.responseText);
    }else{
      console.log("request was unsuccessful: "+xhr.status);
    }
建议通过检测status来决定下一步的操作，不要依赖statusText。  
### readyState属性
0：未初始化。尚未调用open()方法  
1: 启动。已经调用open()方法，但尚未调用send()方法  
2：发送。已经调用send()方法，但尚未接受到响应。  
3：接受。已经接受到部分响应数据。  
4：完成。已经接受到全部响应数据，而且已经可以在客户端使用了。

只要readyState属性的值由一个值变为另一个值，都会触发一次readystatechange事件。可以利用这个事件来检测每次状态变换后readyState的值。通常，我们只对readyState值为4的阶段感兴趣，因为这时所有的数据都已经就绪了。  

    var xhr=new XMLHttpRequest();
    xhr.onreadyStatechange=function(){
      if(xhr.readyState==4){
        if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
          console.log(xhr.responseText);
        }else{
          console.log("Request was unsuccessful: "+xhr.status);
        }
      }
    };
    xhr.open("get","example.php",true);
    xhr.send(null);
在接受到响应之前还可以调用abort()方法来取消异步请求。  

    xhr.abort();
调用这个方法后，xhr对象会停止触发事件，而且也不允许访问任何与响应有关的对象属性。  

---
## HTTP头部信息
每个HTTP请求和响应都会带有响应的头部信息  
默认情况下，在发送XHR请求的同时，还会发送下列头部信息。  
<table>
<tr><td>Accept</td><td>浏览器能够处理的内容类型</td></tr>
<tr><td>Accept-Charset</td><td>浏览器能够显示的字符集</td></tr>
<tr><td>Accept-Encoding</td><td>浏览器能够处理的压缩编码</td></tr>
<tr><td>Accept-Language</td><td>浏览器当前设置的语言</td></tr>
<tr><td>Connection</td><td>浏览器与服务器之间连接的类型</td></tr>
<tr><td>Cookie</td><td>当前页面设置的任何Cookie</td></tr>
<tr><td>Host</td><td>发出请求的页面所在的域</td></tr>
<tr><td>Referer</td><td>发出请求的页面的URI</td></tr>
<tr><td>User-Agent</td><td>浏览器用户代理字符串</td></tr>
</table>

### setRequestHeader()方法
使用setRequestHeader()方法可以设置自定义的请求头部信息，这个方法接受两个参数：头部字段的名称和头部字段的值，要成功发送请求头部信息，必须在调用open()方法之后调用send()方法之前调用setRequestHeader()。  

    var xhr=new XMLHttpRequest();
    xhr.onreadyStatechange=function(){
      if(xhr.readyState==4){
        if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
          console.log(xhr.responseText);
        }else{
          console.log("Request was unsuccessful: "+xhr.status);
        }
      }
    };
    xhr.open("get","example.php",true);
    xhr.setRequestHeader("myHeader","myValue");
    xhr.send(null);
### getResponseHeader()方法
调用XHR对象的getResponseHeader()方法并传入头部字段名称，就可以取得相应的响应头部信息。
### getAllResponseHeader()方法
可以取得一个包含所有头部信息的长字符串  
![5HUIpd.png](https://s1.ax2x.com/2018/09/29/5HUIpd.png)  
## GET请求
GET是最常见的请求类型，最常用于向服务器查询某些信息。  
使用GET请求经常发生的一个错误，就是查询字符串的格式有问题，查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到URL的末尾；而且所有的名-值对必须由和号(&)分隔。  

    xhr.open("get","example.php?name1=value1&name2=value2",true);
## POST请求
使用频率仅次于GET的是个POST请求，通常用于向服务器发送保存的数据。  
POST请求应该把数据作为请求的主体提交。POST请求的主体可以包含非常多的数据。发送POST第二步就是向send()方法传入某些数据。
