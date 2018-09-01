# JavaScript-Function-Expression  
## 定义函数的两种方式
### 1.函数声明
    function functionName(arg0,arg1,arg2){
      //函数体
    }
函数声明的一个最重要特征是，`函数声明提升`。意思是在执行代码之前会读取函数声明。  

    sayHi();
    function sayHi(){
      alert("Hi");
    }
### 2.函数表达式  
     var functionName=function(arg0,arg1,arg2){
       //函数体
     };
这种形式看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量functionName.这种情况下创建的函数叫作`匿名函数`,因为function关键字后面没有标识符。匿名函数有时候也称为`拉姆达函数`。    
函数表达式与其他表达式一样，在使用前必须先赋值。  

     sayHi();//error,函数还不存在
     var sayHi()=function(){
       alert("Hi");
     };
#### 函数表达式和函数声明的区别：  

    if(condition){
      function sayHi(){
        alert("Hi");
      }
    }else{
      function sayHi(){
        alert("Yo!");
      }
    }    
执行这段代码结果可能会出现意外，这在ECMAscript中属于无效语法  

**不过使用函数表达式就没什么问题了。**

    var sayHi;
    //这样写在ES中符合规范
    if(condition){
      sayHi=function(){
        alert("Hi");
      }
    }else{
      sayHi=function(){
        alert("Yo!");
      };
    }
**在把函数当成值来使用的情况都可以使用匿名函数**  
###  递归函数
递归函数是在一个函数通过名字调用自身的情况构成的，Eg：  

      function factorial(num){
        if(num<1)
        return 1;
        else{
          return num*factorial(num-1);
        }
      }
这个是经典的递归阶乘桉树。虽然这个函数表面看来没什么问题，但下面的代码可能会导致它出错。  

    var anotherFactorial=factorial;
    factorial=null;
    alert(anotherFactorial(4));//error!
以上的代码先把factorial()函数保存到变量anotherfactorial中，然后将factorial变量设置为null。结果指向原始函数的引用只剩下一个。但是接下来调用anotherfactorial()时，由于必须执行factorial(),而factorial已经不是函数，所以会导致错误，在这种情况下，使用argument.callee可以解决问题eg：  

      function factorial(num){
        if(num<1)
        return 1;
        else
        {
          return num*使用argument.callee(num-1);
        }
      }
通过使用argument.callee代替函数名，可以确保怎么调用函数都不会出现问题。  
`但在严格模式下，无法用脚本访问argument.callee`  

不过可以使用命名函数表达式来达到相同的结果eg:  

    var factorial=(function f(num){
      if(num<=1)
      return 1;
      else
      return num*f(num-1);
      });
这种方式在严格模式和非严格模式都行得通。
