# Ajax-XMLHttpRequest 2级
## FormData
现代Web应用中频繁使用的一项功能就是表单数据的序列化，XMLHttpRequest 2级为此定义了FormData类型。   

    var data=bew FormData();
    data.append("name","Nicholas");
**append()函数接受两个值，键和值，分别对应于表单字段的名字和字段中包含的值**  
可以通过FormData的构造函数中传入表单元素。  

    xhr.open("post","postexample.php",true);
    xhr.form=document.getElementById("user-info");
    xhr.send(new FormData(form));
使用FormData的方便之处体现在不必明确地在XHR对象上设置请求头部。XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。  
## 超时设定
XHR对象添加了一个timeout属性，表示请求在等待响应多少毫秒之后终止。如果在规定的时间内浏览器还没有接受响应，那么会触发timeout事件，进而调用ontimeout事件处理程序。   

      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          try{
            if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
              console.log(xhr.responseText);
            }else{
              console.log("request was unsuccessful "+xhr.status);
            }
          }catch(ex){
            //假设由ontimeout事件处理程序
          }
        }
      }
      xhr.open("get","timeout.php",true);
      xhr.timeout=1000;
      xhr.ontimeout=function(){
        console.log("request did not return in a second");
      };
      xhr.send(null);
如果在超时终止请求之后再访问status属性，就会导致错误，为避免浏览器报告错误，可以将status属性的语句封装在一个try-catch语句块中。  
## 进度事件
### load事件  
只要浏览器接受到服务器的响应，不管其状态如何，都会触发load事件，因此必须检查status属性，才能确保数据是否真的可用了。  

    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
      if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
        console.log(xhr.responseText);
      }else{
        console.log("Request was unsuccessful "+xhr.status);
      }
    };
    xhr.open("get","altevents.php",true);
    xhr.send(null);
### progress事件(进度指示器)
这个事件会在浏览器接受新数据期间周期性地触发，而onprogress事件处理程序会接受一个event对象，其target属性是XHR对象，但包含三个额外的属性：lengthComputable, position, totalSize  
<li>lengthComputable:表示进度信息是否可用的布尔值
<li>position：表示已经接受的字节数
<li>totalSize:表示根据Content-Length响应头部确定的预期字节数    

我们就可以为用户创建一个进度指示器了。  


    xhr.onprogress = function (event) {
        console.log(event.lengthComputable);
        if (event.lengthComputable)
            console.log("received " + event.position + " of " + event.totalSize + " bytes ");
        }
    };
为了保证正常运行，必须在调用open()方法之前添加onprogress()事件处理程序。
>写出 http 头时候，附加 “Content-Length”和Content-Encoding，这样 JS 端的progress 事件的 event.lengthComputable 值才会为 true， event.total 才会在数据传输完毕之前取得值，否则 event.lengthComputable 值会返回 false， event.total 在数据完成之前值都是0。(以后去了解后台)
