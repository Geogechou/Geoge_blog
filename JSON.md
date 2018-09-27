# JSON
JSON是JavaScript的一个严格的子集，利用了JavaScript中的一些模式来表示结构化数据。  
## 语法
### 简单值
使用与JavaScript相同的语法，可以在JSON中表示字符串，数值，布尔值和null。   

    5  
    "hello world"
    //以上均为简单值
### 对象
JSON中的对象与js中的对象有两个地方不同，首先是没有声明变量(JSON中没有变量的概念)，其次，是没有末尾的分号。(因为这不是JavaScript语句，无需分号)。  

    {
      "name":"Nicholas",
      "age":29
    }
另外，对象的值可以是简单值，也可以是复杂值    

    {
      "name":"Nicholas",
      "age":29,
      "school":{
        "name":"Merrimack College",
        "location":"North Andover, MA"
      }
    }
JSON中的对象的属性名任何时刻都必须加双引号。  
### 数组
    [25,"hi",true]
上式是一个JSON数组，同样，JSON数组也没有变量和分号  
把数组和对象结合起来可以构成更复杂的数据集合      

    [
            {
                "title": "professional JavaScript",
                "author": ["Nicholas C.zakas"],
                "edition": 3,
                "year": 2011
            },
            {
                "title": "Professional JavaScript",
                "author": ["Nicholas C.zakas"],
                "edition": 2,
                "year": 2009
            },
            {
                "title": "Professional Ajax",
                "author": [
                    "Nicholas C.zakas",
                    "Jermy McPeak",
                    "Joe Fawcett"
                ],
                "edition":1,
                "year":2010
            },

    ]

## 解析与序列化
可以把JSON数据结构解析为有用的JavaScript对象  
JSON有两个方法： stringify()和parse()  

    var book={
      title:"Professional JavaScript",
      author:["Nicholas C.zakas"],
      edition:3,
      year:2011
    };
    var jsonText=JSON.stringify(book);
这个例子用JSON.stringify()把一个JavaScript对象序列化为一个JSON字符串，然后保存到jsonText中。    
把JSON字符串直接传递给JSON.parse()就可以得到相应的JavaScript对象  

    var bookcopy=JSON.parse(jsonText);
如果给JSON.parse()的字符串不是有效的JSON，该方法会抛出错误。  
### 序列化选项
JSON.stringigy()除了要序列化的js对象外，还接受另外两个参数，第一个参数是过滤器(可以是一个数组，也可以是一个函数);第二个参数是一个选项，表示是否在JSON字符串中保留缩进    
#### 过滤结果
##### 第二个参数是一个数组

    var book={
      title:"Professional JavaScript",
      author:["Nicholas C.zakas"],
      edition:3,
      year:2011
    };
    var jsonText=JSON.stringify(book,["title","edition"]);
JSON.stringify()的第二个参数是一个数组，其中包括两个字符串："title"和"edition"。这两个属性与将要序列化的对象中的属性是对应的。**因此在返回的结果字符串中，只会包含这两个属性**。  
##### 第二个参数是一个函数
    var book={
      title:"Professional JavaScript",
      author:["Nicholas C.zakas"],
      edition:3,
      year:2011
    };
    var jsonText=JSON.stringify(book,function(key,value){
      switch(key){
        case "author":
          return value.join(",");
        case "year":
          return 5000;
        case "edition":
          return undefined;
        default:
          return value;
      }
      });
这里，函数过滤器会根据传入的值来决定结果，如果值为"author",就将数组链接为一个字符串。如果键为"year"，就将其值设置为5000，如果键为“edition”,通过返回undefined删除该属性，最后，一定要提供default项，此时返回传入的值，以便其他值都能正常出现在结果中。  
##### 字符串缩进
JSON.stringify()第三个参数用于控制结果中的缩进和空白符。如果这个参数是个数值，则表示的是每个级别缩进的空格数。

    var jsonText=JSON.stringify(book,null,4);
缩进4个空格
## 解析选项
JSON.parse()方法也可以接受另一个参数，该参数是一个函数，将每个键值对儿上调用。这个函数叫还原函数(reviver)。  

    var book={
      title:"Professional JavaScript",
      author:["Nicholas C.zakas"],
      edition:3,
      year:2011,
      releaseDate:new Date(2011,11,1)
      };
    var jsonText=JSON.stringify(book);
    var bookCopy=JSON.parse(jsonText,function(key,value){
      if(key=="releaseDate")
      return new Date(value);
      else
      return value;
      });
      console.log(bookCopy.releaseDate.getFullYear());
在解析中，在还原函数中遇到"releaseDate"键时，会基于相应的值创建一个新的Date对象。结果就是bookCopy.releaseDate属性中保存了一个Date对象
