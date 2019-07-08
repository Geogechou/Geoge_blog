## Web存储机制
## sessionStorage & globalStorage
Web Storage的目的是克服由cookie带来的一些限制，当数据需要被严格控制在客户端上，无需持续地将数据发回服务器。
### storage类型
storage类型提供最大的存储空间来存储名值对儿。Storage的实例与其他对象类似。有如下方法 
* clear(): 删除所有值
* getItem(name)： 根据指定的名字name获取响应的值
* key(index):获取index位置处值的名字
* removeItem(name):删除由name指定的名值对儿
* setItem(name,value):未指定的name设置一个对应的值
* 属性length:判读有多少命值对儿存放在storage对象中
### sessionStorage对象
该对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。存储在sessionStorage中的数据可以跨越页面刷新而存在。  

设置键值对

    sessionStorage.setItem("name", "geoge");
使用方法读取数据

    sessionStorage.getItem("name")
移除数据

    sessionStorage.removeItem("name")
清空数据

    sessionStorage.clear();
迭代数据

     for (var i = 0, len = sessionStorage.length; i < len;i++) {
         var key = sessionStorage.key(i);
         var value = sessionStorage.getItem(key);
         console.log(key + "=" + value);
     }
或者用for-in迭代数据

     for (var key in sessionStorage) {
         console.log(key + "=" + sessionStorage.getItem(key));
     }


sessionStorage对象主要用于仅针对会话的小段数据的存储，如果需要跨域绘画存储器,那么使用globalStorage或者localStorage更为合适  

---
### localStorage 对象
localStorage对象在修改过的H5规范中作为持久保存客户端数据的方案取代了globalStorage，要访问同一个localStorage对象，页面必须来自同一个域名(子域名)无效，使用同一种协议，在同一个端口上。这相当于globalStorage[location.host]  
```js
    //使用方法存储数据
    localStorage.setItem("name","nicholas");
    //使用方法读取数据
    var name=localStorage.getItem("mame");
```
数据保存到通过JavaScript删除或者用户清除浏览器缓冲
### storage事件
**(尚不支持)**  
对Storage对象进行任何修改，都会在文档上触发Storage事件。   
使用setItem()方法保存数据，使用removeItem()删除数据，或者使用clear()方法时，都会发生该事件。这个事件event对象有如下属性：  
* domain:发生变化的存储空间的域名
* key：设置或者删除的键名
* newValue:如果设置值，则是新值；如果删除键，则是null

* oldValue:键被更改之前的值

```js
document.addEventListener("storae",function(event){
	console.log("storage changed for "+event.domain);
});
```
无论对sessionStorage存储还是localStorge进行操作，都会触发storage事件，但不做区分。
