# cookie
web开发者将数据存在客户端上，第一个方案是cookie  
一定不要在cookie中存储重要和敏感的数据，其中包含的任何数据都可以被他人访问到。
## cookie的构成
<li>名称:一个唯一确定cookie名称。cookie名称不区分大小写，cookie名称必须经过URL编码
<li>值：储存在cookie中的字符串值
<li>域：cookie对哪个域是有效的，所有向该域发送的请求都包含这个cookie信息。这个值可以包括子域(.wrox.com,则对于wrox.com的所有子域都有效)，如果没有明确设定，那么这个域会被认作来自设置cookie的那个域
<li>路径：对于指定域中的那个路径，应该向服务器发送cookie
<li>失效时间：表示cookie何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个cookie)。这个值是个GMT格式的日期，用于指定应该删除cookie的准确时间。因此，cookie可在浏览器关闭后仍然保存在用户的机器上
<li>安全标志：指定后，cookie只有在使用SSL连接的时候才发送到服务器  


## 封装cookie方法

     var CookieUtil = {
         //获取cookie
         get: function (name) {
             var cookieName = encodeURIComponent(name) + "=",
                 cookieStart = document.cookie.indexOf(cookieName),
                 cookieValue = null;
             if (cookieStart > -1) {
                 var cookieEnd = document.cookie.indexOf(";", cookieStart);
                 if (cookieEnd == -1)
                     cookieEnd = document.cookie.length;
                 cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
             }
             return cookieValue;
         },
         //设置cookie
         set: function (name, value, expires,path,domain,secure) {
             var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
             if (expires instanceof Date) {
                 cookieText += ";expires=" + expires.toGMTString();
             }
             if (path) {
                 cookieText += ";path=" + path;
             }
             if (domain) {
                 cookieText += ";domain=" + domain;
             }
             if (secure) {
                 cookieText += ";secure";
             }
             document.cookie = cookieText;
         },
         //删除cookie
         unset: function (name,path,domain,secure) {
             this.set(name, "", new Date(0),path,domain,secure);
         }
     };

** 设置cookie**

     var time = new Date(2019, 3, 3);
     CookieUtil.set("cookie1", "zzh", time);
     //获取cookie
     console.log(CookieUtil.get("cookie1"));
![5H6vOB.png](https://s1.ax2x.com/2018/09/30/5H6vOB.png)    
** 删除cookie**

      cookieUtil.unset("cookie1");
![5H6ye6.png](https://s1.ax2x.com/2018/09/30/5H6ye6.png)
