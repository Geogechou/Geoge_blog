### setTimeout()
```javascript
//推荐调用方式
setTimeout(function(){
  alert("hello world");
  },1000);
```
第一个参数可以是一个包含js代码的字符串，也可以是一个函数。      
第二个参数是表示等待多长时间的一个毫秒数  
这个函数返回一个数值ID,表示超时调用。这个超时调用id是计划执行代码的唯一标识符，**可以用来取消超时调用**
```javascript
 //设置超时调用
 var timeoutId=setTimeout(function(){
   alert("hello world");
   },1000);
   //取消定时
  clearTimeout(timeoutId);
```
---
###   setInterval
方法是`setInterval()`,它接受的参数与setTimeout()相同，取消的行为也相同。e.g.  
```javascript
    var num=0;
    var max=10;
    var intervalID=null;
    function incrementNumber(){
      num++;
      console.log(num);
      //取消重复执行的条件
      if(num==10){
        clearInterval(intervalID);
        console.log("done!");
      }
    }
    intervalID=setInterval(incrementNumber,1000);  
```
**注：一般很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动，因为JavaScript是一个单线程语言**
