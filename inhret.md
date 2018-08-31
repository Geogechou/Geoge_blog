# Javascript-Inherit  
## 原型链实现继承  
### 继承原理  
每个构造函数都有一个原型对象，原型对象都包括一个指向构造函数的指针，而实例都包含一个指向原型对象内部的指针。假如我们让原型对象等于另一个类型的实例，结果，此时的原型对象将包含一个指向另一个原型的指针。相应的，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进。构成了`原型的链条`。  
######  
     function SuperType(){
       this.property=true;
     }
     SuperType.prototype.getSuperValue=function(){
       return this.property;
     };
     function SubType(){
       this.SubProperty=false;
     }
     //将SubType的原型指定为SuperType的实例，从而Sub继承了Sup
     SubType.prototype=new SuperType();
     SubType.prototype.getSubValue=function(){
       return this.subProperty;
     };
     var instance=new SubType();
     alert(instance.getSuperValue());//true
subType继承了SuperType,而继承是通过创建SuperType的实例，并将实例赋给SubType.prototype实现的。实现的本质是重写原型对象，代之一个新类型的实例。  
<b>getSuperValue()方法在SuperType的原型中，但是property属性在SubType.property中</b>这是因为peoperty是SuperType实例化  
另外,现在的instance.constructor现在指向的是SuperType,这是因为原来的SubType.prototype中的constructor被重写了的缘故  
`所有对象的默认的原型`  
所有引用类型都继承了Object,也是通过原型链实现的。所有函数的默认原型都是`Object的实例`,因此默认原型都会包含一个内部指针，指向Object.prototype,这也正是所有自定义类型都会继承toString(),ValueOf()等默认参数的根本原因
`SubType继承了SuperType,而SuperType继承了Object`
#### Object中默认的几个方法  
<table>
<tr><th>方法</th><th>调用实例</th></tr>
<tr><td>hasOwnProperty()</td><td>person1.hasOwnProperty("name")</td></tr>
<tr><td>isPrototypeOf()</td><td>Person.prototype.isPrototypeOf(person1)</td></tr>
<tr><td>propertyIsEnumerable()</td><td>person1.propertyIsEnumerable()</td></tr>
<tr><td>toLocalString()</td><td>person1.name.toLocalString()</td></tr>
<tr><td>toString()</td><td>person1.name.toString()</td></tr>
<tr><td>valueOf()</td><td>person1.name.valueOf()</td></tr>
</table>    


#### 确定原型与实例的关系  
1.使用instanceof操作符  
######  
     alert(instance instanceof Object); //true
     alert(instance instanceof SuperType);  //true
     alert(instance instanceof SubType);  //true
由于原型链的关系，我们可以说instance是Object、SuperType、SubType中任何一个类型的实例   
2.使用isPropertyOf()方法    
######  
    alert(Object.prototype.isPrototypeOf(instance));//true
    alert(SuperType.prototype.isprtotypeof(instance));//true
    alert(SubType.prototype.isprototypeof(instance));//true
`tips:`  
通过原型链实现继承,不能使用对象字面量创建原型方法。因为这样就会重写整个原型链，例如：  
######  
    function SuperType(){
      this.property=true;
    }
    SuperType.protoType.getSuperValue=function(){
      return this.property;
    };
    function SubType(){
      this.subproperty=false;
    }
    SubType.protoType=new SuperType();
    //下面通过对象字面量创建原型方法，会重写原型链，使继承失效
    SubType.protoType={
      getSubValue:function(){
        return this.subpeoperty;
      },
      someOtherMethod:function(){
        return false;
      }
    };
    //现在的原型包含的是一个Object的实例，而非SuperType的实例，因此我们设想的原型链已经被切断了
    var instance=new SubType();
    alert(instance.getSuperValue());//error
#### 原型链的问题
     function SuperType(){
       this.colors=["red","blue","green"];
     }
     function SubType(){
     }
     SubType.prototype=new SuperType();
     var instance1=new SubType();
     instance.colors.push("black");
     alert(instance.colors);//"red,blue,green,black"
     var instance2=new SubType();
     alert(instance2.colors);//"red,blue,green,black"
上面这段代码，SubType继承了SuperType，但是当instance1修改了SubType.protoType.colors,修改了SubType的原型，所以所有的SubType实例都会被修改  
### 借用构造函数
     function SuperType(){
       this.colors=["red","blue","green"];
     }
     function SubType(){
       //继承了SuperType,此处用call(this)方法，相当于把作用域限定在SubType中
       //函数只不过是在特定环境中执行代码的对象，因此通过使用apply()和call()方法也可以在新创建的对象上执行构造函数
       SuperType.call(this);
     }
     var instance1=new SubType();
     //借用构造函数，并没有修改subtype的原型，修改的是实例
     instance1.colors.push("black");
     alert(instance.colors);//"red,blue,green,black"
     var instance2=new SubType();
     alert(instance2.colors);//"red,blue,green"                                
1.传递参数  
可以在子类型构造函数中向超类型构造函数传递参数
######   
     function SuperType(name){
       this.name=name;
     }
     function SubtType(){
       //继承了SuperType，同时又传递了参数
       SuperType.call(this,"nicholas");
       this.age=29;
     }
     var instacne=new SubType();
     alert(instance.name);//"nicholas"
     alert(instance.age);//29
2.借用构造函数的问题  
函数都在构造函数中定义，无法避免构造函数模式存在的问题---无法进行函数的复用  
### 组合继承(combination inheritance)
概述：组合继承有时候也叫伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的原理思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数实现对实例属性的继承。这样既能通过原型上定义方法实现了函数复用，又能保证每个实例都有自己的属性。  
######  
    function SuperType(name){
      this.name=name;
      this.color=["red","blue","green"];
    }
    SuperType.protoType.sayName=function(){
      alert(this.name);
    };
    function SubType(name,age){
      //继承属性
      SuperType.call(this,name);
      this.age=age;
    }
    //继承方法
    SubType.prototype=new SuperType();
    //更改子类型的原型的构造函数指向，指向SubType函数
    SubType.prototype.constructor=SubType;
    SubType.prototype.sayAge=function(){
      alert(this.age);
    };
    var instance1=new SubType("nicholas",29);
    instance1.color.push("black");
    alert(instance1.color);//"red,blue,green,black"
    instance1.sayName();//"nicholas"
    instance1.sayAge();//29
    var instance2=new SubType("grey",27);
    alert(instance2.colors);//"red,blue,green"
    instance2.sayName();//"grey"
    instance2.sayAge();//27
1.组合继承避免了原型链和借用构造函数的缺陷，融合了他们的优点，是JavaScript最常用的继承模式  
2.组合继承的缺点：组合及成果无论在什么情况，都会调用两次超类型构造函数，一次是创建子类型的时候，另一次是在子类型构造函数内部  
######  
    function SuperType(name){
      this.name=name;
      this.colros=["red","blue","green"];
    }
    SuperType.prototype.sayName=function(){
      alert(this.name);
    };
    function SubType(name,age){
      //第二次调用了SuperType();
      SuperType.call(this,name);
      this.age=age;
    }
    //第一次调用了SuperType()
    SubType.prototype=new SuperType();
    SubType.prototype.constructor=SubType;
    SubType.prototype.sayAge=function(){
      alert(this.age);
    }
<li>1.在第一次调用SuperType构造函数时，SubType构造函数时，SubType.prototype会得到两个属性，name和color，它们都是SuperType的实例属性，只不过现在位于SubType的原型中。  
<li>2.当调用SubType构造函数时，又会调用一次SuperType的构造函数，这一次又在新对象上创建了实例属性name和colors，于是，实例属性就屏蔽了原型中的同名属性    
<li>有两组name和color属性，一组在实例上，一组在SubType的原型中
###  寄生组合式继承  
基本思路：不必为指定类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本  
寄生组合式继承的基本模式如下:  
######
          function inheritprototype(subType,superType){
          var prototype=Object(superType.prototype);
          prototype.constructor=SubType;
          subType.prototype=prototype;
          }

######  
        function SuperType(name){
          this.name=name;
          this.colros=["red","blue","green"];
        }
        SuperType.prototype.sayName=function(){
          alert(this.name);
        };
        function SubType(name,age){
          SuperType.call(this,name);
          this.age=age;
        }
        inheritprototype(SubType,SuperType);
        SubType.prototype.sayAge=function(){
          alert(this.age);
        }
寄生组合式继承是实现基于类型继承的最有效的方式  


<i>本文摘自Professional Javascript for Web Developers <small>3rd Edition<small></i>
