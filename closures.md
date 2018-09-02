# JavaScript-function-closures 闭包
## 闭包定义
闭包是指有权访问另一个函数作用域中的变量的函数。
## 创建闭包常用方式  
就是在一个函数内部创建另一个函数。e.g.  

     function createComparisonFunction(propertyName){
        return function(object1,object2){
          //这两行代码，访问了外部的propertyName
          var value=object1[propertyName];
          var value2=object2[propertyName];
          //注意这两行代码
          if(value1<value2){
          return -1  
          }else if(value1>value2){
            return 1;
          }else{
            return 0;
          }
        };
     }
## 闭包原理     
在这个例子中，其中注释的两句代码，这两行代码访问了外部函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方调用了，但他仍然可以访问变量propertyName。之所以能够访问这个变量，是因为内部函数的作用域链中包含createComparisonFunction()的作用域。   

当某个函数被调用时，会创建一个执行环境(execution content)以及相应的作用域链。然后使用arguments和其他命名参数的值来初始化函数的活动对象(activation object)。但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位....直至作为作用域链终点的全局执行环境。  

`作用域链`本质上是一个指向变量对象的指针列表，它只引用，但不实际包含变量对象。  

一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中进保存全局作用域(全局执行环境的变量对象)。  

在另一个函数内部定义的函数会将包含函数(即外部函数)的活动对象添加到它的作用域链中。因此在createComparisonFunction()函数内部定义的匿名函数的作用域链中，实际将会包含外部函数createComparisonFunction()的活动对象。  

     var compare=createComparisonFunction("name");
     var result=compare({name:"nicholas"},{name:"grey"});

在匿名函数从createComparisonFunction()返回之后，它的作用域链被初始化为包含createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在createComparisonFunction()中定义的所有变量。直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁。e.g  

     //创建函数
     var compareName=createComparisonFunction("name");
     //调用函数
     var result=compareName({name:"nicholas"},{name:"grey"});
     //接触对匿名函数的引用(以便于释放内存)
     compareName=null;
`由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存`  

### 模仿块级作用域
JavaScript没有块级作用域的概念。这意味着`在块语句中定义的变量，实际上是在包含函数中而非与语句中创建的`。

    function outputNumbers(count){
      for(var i=0;i<count;i++){
        alert(i);
      }
      var i;//重新声明变量
      alert(i);//计数，依然是count-1
    }
遇到这种情况，它只会对后续的声明视而不见。  

    function outputNumbers(count){
      for(var i=0;i<count;i++){
        alert(i);
      }
      var i=1;
      alert(i);//i=1
    }
重新声明之后，i=1。被后面的声明重新修改了。  

用作块级作用域(通常称为`私有作用域`)的匿名函数的语法如下：  

    (function(){
      //块级作用域
      })();
**将函数声明包括在一堆圆括号中，表示它实际上是一个函数表达式，而紧跟其后的另一对圆括号会立即调用这个函数**  
但是不能这样调用函数e.g.  

    function(){
      //块级作用域
    }();//error!
错误原因在于：JavaScript将function关键字当作一个函数声明的开始，而函数声明后不能跟圆括号。然而，`函数表达式`后面可以跟圆括号。  
**要想将函数声明转化为函数表达式，只需要给他加上一对圆括号即可。**  

    (function(){
      //块级作用域
      })();
<i><b style="font-size:20px">无论什么时候，只要临时需要一些变量，就可以使用私有作用域e.g.</b></i>  

    function outputNumbers(count){
      (function(){
        for(var i=0;i<count;i++){
          alert(i);//i的私有作用域，作用之后被销毁
        }
        })();
        alert(i);//error!i执行完被销毁
    }
在匿名函数中定义的任何变量，都会在结束时被销毁，因此，变量i只能在for循环中使用，使用后被销毁。而在私有作用域中能够访问变量count，是因为匿名函数是一个闭包，可以访问包含作用域中的所有变量。  
<i><b style="font-size:20px">这种计数经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数</b></i>  
***
### 私有变量
<b style="font-size:20px">定义：</b>任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数外部访问这些变量，私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。e.g.

    function add(num1,num2){
      var num=num1+num2;
      return num;
    }
在这个函数内部，有3个私有变量:sum，num1，num2。在函数内部可以访问这几个变量，但在函数外部则不能访问他们。如果在这个`函数内部创建一个闭包`，则闭包通过自己的作用域链也可以访问这些变量。  
我们把有权访问私有变量和私有函数的公有方法称为`特权方法`(previleged method)。有两种在对象上创建特权方法的方式。  
#### 1.在构造函数中定义特权方法  

    function MyObject(){
      //私有变量和私有函数
      var priviateVariable=10;
      function privateFunction(){
        return priviateVariable;
      }
      //特权方法
      this.publicMethod=function(){
        priviateVariable++;
        return privateFunction();
      };
    }
例子中的特权方法相当于一个外部的接口，供外部来调用，来处理私有的函数和私有数据  
在创建MyObject的实例后，除了使用publicMethod()这一途径外，没有任何方法访问privateVariable和privateFunction()。  

利用私有和特权成员，可以隐藏那些不应该直接修改的数据  

    function Person(name){
      this.getName=function(){
        return name;
      };
      this.setName=function(value){
        name=value;
      };
    }
    var person=new Person("nicholas");
    alert(person.getName());//"nicholas"
    person.setName("grey");
    alert(person.getName());//"grey"

## 静态私有变量，模块模式，增强的模块模式------先不看了！！！
