# JavaScript Object-Oriented
## Object对象
ECMAscript中没有类的概念  
``对象的定义：无需属性的集合，其属性可以包括基本值，对象，函数 ``  
###  引用类型
引用类型的值(对象)是`引用类型`的一个实例，在ECMAscript中，引用类型是一种数据结构，用于将数据和功能组织在一起    
#### 创建object实例的两种方法
##### 1.new操作符后跟Object构造函数
     var person=new Object();
     //添加属性
     person.name="nicholas";
     person.age=29;
     //添加方法
     person.sayName=function(){
       alert(this.name);
     }
##### 2.使用对象字面量表示法  
     var person={
       name:"nicholas",
       age:29，
       sayName:function(){
         alert(this.name);
       }
     }
#### 访问对象属性  
     alert(person.name);//nicholas
     alert(person["name"]);//nicholas
     //两种方法是一样的，区别在于，使用方括号访问，可以用变量来访问
### 创建对象
引言：虽然object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建了很多对象，会产生大量的重复代码，为解决这个问题，人们开始使用工厂模式  
#### 工厂模式
     function createObject(name,age,job){
       var o=new Object();
       o.name=name;
       o.age=age;
       o.job=job;
       o.sayname=function(){
         alert(this.name);
       }
       return o;
     }
     var person1=createObject("nicholas",29,"software engineer");
     var person2=createObject("grey",28,"doctor");
工厂模式问题在于，没有解决对象识别的问题，即无法通过instanceof判别是什么类型     
#### 构造函数模式
    function Person(name,age,job){
      this.name=name;
      this.age=age;
      this.job=job;
      this.sayname=function(){
        alert(this.name);
      }
    }
    var person1=new Person("nicholas",29,"software engineer");
    var person2=new Person("grey",28,"doctor");
创建自定义的构造函数意味着将来可以将它的山谷里标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方  
`alert(person1 instanceof Person);`//true   
`alert(person1 instanceof Object);`//true  
任何函数，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么两样  
######  
     //当作构造函数使用
     var person=new Person("nicholas",29,"software engineer");
     person.sayName();
     //当作普通函数调用
     person("grey",27,"doctor");//添加到window中
     window.sayName();
构造函数的缺点在于，每个方法都要在每个实例中重新创建一遍，如果使用使用全局函数，又会导致无封装性  

---
#### 原型模式
我们创建的每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。  
使用原型的好处是可以由所有对象共享它所包含的属性和方法  
######  

    function Person(){  
    }
    //定义原型的属性和方法，由所有实例共享
    Person.prototype.name="nicholas";
    Person.prototype.age=29;
    Person.prototype.job="software engineer";
    Person.prototype.sayName=function(){
      alert(this.name);
    };
    var person1=new Person();
    person1.sayName();//"nicholas"
    var person2=new Person();
    person2.sayName();//"nicholas"
###### 理解原型对象  
1.只要创建了一个新函数，就会为函数创建一个prototype属性，这个属性指向函数的原型对象，所有原型对象都会自动获得一个constructor属性，这个属性是一个指向函数的指针  
2.当调用构造函数创建一个实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ECMA script将这个指针叫[[prototype]]。这个连接出现在实例与构造函数的原型对象之间。  
3.虽然咋所有实现中无法访问到[[prototype]]，但可以通过isPropertypeOf()来确定对象之间是否存在这种关系。  
`alert(Person.prototype.isPropertypeOf(person1));`//true  
4.ES5中，一个方法是Object.getPrototypeOf(),这个方法可以返回[[prototype]]的值  
`alert(Object.getPrototypeOf(person1).name);`//"nicholas"  
5.当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性。不过使用delete操作符则完全可以删除实例属性，从而能够访问原型属性  
######  
    function Person(){
    }
    Person.prototype.name="nicholas";
    Person.prototype.age=29;
    Person.prototype.job="software engineer";
    Person.prototype.sayName=function(){
      alert(this.name);
    };
    var Person1=new Person();
    person1.name="rey";
    alert(person1.name);//rey
    delete person1.name;//删除实例的属性
    alert(person1name);//nicholas，显示原型的属性
6.使用hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在原型中。  
例：  
`person1=new Person();`  
`alert(person1.使用hasOwnProperty("name"));`//false，因为是原型的属性  
`person1.name="grey";`  
`alert(person1.hasOwnProperty("name"));`//true是实例定义的属性  

7.原型与in操作符  
<code>alert("name" in person1)</code>//true,在实例或者原型都返回true  

8.要取得对象中所有可枚举的实例属性，可以用ES5中的Object.keys()方法，这个方法接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。  
例如：  
<code>var keys=Object.keys(Person.prototype);</code>  
<code>alert(keys);</code>// "name", "age", "job", "sayName"  
如果定义了实例属性，则只显示实例中定义的属性  

9.更简单的原型语法--<b>用一个包含所有属性和方法的对象字面量来重写整个原型对象  </b>
######  
     function Person(){
     };
     Person.prototype={
       name:"nicholas",
       age:29,
       job:"software engineer",
       sayName:function(){
         alert(this.name);
       }
     };
     var friend=new Person();
在上面的代码中，我们将整个person.prototype重写了，所以constructor属性也指向了Object构造函数  
<code>alert(person1.constructor==Person);</code>//false  
<code>alert(person1.constructor==Object;)</code>//true  
如果constructor真的很重要，可以像下面这样特意将它设置成适当的值
######  
     function Person(){
     }
     Person.prototype={
       constructor:"Person",
       name:"nicholas",
       age:29,
       job:"software engineer",
       sayName: function(){
         alert(this.name);
       }
     }
10.原型对象的问题  
所有实例在默认情况下都取得相同的属性值。例子如下：  
######   
     function Person(){
     }
     Person.prototype={
       constructor:Person,
       name:"nicholas",
       age:29,
       job:"software engineer",
       friends:["shelly","court"],
       sayName:function(){
         alert(this.name);
       }
     };
     var person1=new Person();
     var person2=new Person();
     person1.friends.push("van");
     alert(person1.friends);//"shelly","court","van"
     //修改一个实例的属性时，则其他实例也收到了影响
     alert(person1.friends);//"shelly","court","van"
     //这个原因正是很少有人使用原型模式的原因
---
### 组合使用构造函数模式和原型模式
构造函数用于定义实例属性，而原型模式用于定义方法和共享的属性，结果，每个实例都有一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节约了内存，另外这种混合模式还支持向构造函数传递参数
####  
    //使用构造函数定义基本数据类型
     function Person(name,age,job){
       this.name=name;
       this.age=age;
       this.job=job;
       this.friends=["shelly","court"];
     }
     //使用原型，定义函数的方法
     Person.prototype={
       constructor:Person,
       sayName: function(){
         alert(this.name);
       }
     }
     var person1=new Person("nicholas",29,"software engineer");
     var person2=new Person("grey",28,"doctor");
    person1.friends.push("Van");
    alert(person1.frineds);// "shelly","court","van"

    //修改person1.frineds不会影响到prson2.friends
    alert(person2.friends);//"shelly","court"
