#   CACHE
## 离线检测
H5定义了一个navigator.onLine属性，这个属性值为true表示设备能上网，值为false表示设备离线。  

    if(navigator.onLine){
      //正常工作
    }else{
      //执行离线状态时的任务
    }
由于兼容问题，单独使用navigator.onLine属性不能确定网络是否连通。  
HTML5还定义了两个事件：onLine和offLine，当网络从离线变为在线或从在线变为离线时，分别触发这两个事件。这两个事件在window对象上触发。    

    window.addEventListener("online", function () {
      console.log("Online");
      });
    window.addEventListener("offline", function () {
      console.log("OffLine");
    });
![5HtJjS.png](https://s1.ax2x.com/2018/09/30/5HtJjS.png)  
*测试这个属性，把以太网线接口拔掉和插入，分别触发这两个事件*  

## 应用缓冲
HTML5的 **应用缓冲 (application cache)**,或者简称appcache，是专门为开发离线Web而应用设计的。Appcache就是从浏览器的缓冲中分出来的一块缓冲区，要想在这个缓冲中保存数据，可以使用一个 **描述文件(manifest file)**，列出要下载和缓冲的资源。  

下面是一个简单的描述文件实例：  

    CACHE MANIFEST
    #Version 1
    CACHE:
    css/screen.css
    FALLBACK:
    / offline.html
    NETWORK:
    *
在最简单的情况下，描述文件中列出的都是需要下载的资源，以备离线时使用。
在`<html>`中的manifest属性中指定这个文件的路径。e.g.
`<html manifest="offline.manifest">`  
<a href="http://html5doctor.com/go-offline-with-application-cache/">appcache详解</a>  

这个应用缓冲也有响应的JS API  
这个API的核心是applicatioCache对象，这个对象有一个status属性，属性的值是常量
<li>0 无缓冲，即没有与页面相关的应用程序
<li>1 闲置。即应用缓冲未得到更新
<li>2 检查中，即正在下载描述文件并检查更新
<li>3 下载中，即应用缓冲正在下载描述文件中指定的资源
<li>4 更新完成，即应用缓冲已经更新了资源，而且所有资源都已下载完毕，可以通过swapCache()来使用了
<li>5 废弃，即应用缓冲的描述文件已经不存在了，因而页面已经无法再访问应用缓冲了
