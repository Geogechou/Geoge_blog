## 媒体元素
不必以来任何插件就能在网页中嵌入跨浏览器的音频或者视频内容。这两个标签就是`<video>和<audio>`
<li>src:指向要加载的媒体文件
<li>width，height： 指定视频播放器的大小
<li>controls：浏览器应该显示UI控件，以便用户直接操作媒体
<li>poster： 指定图像的URL可以在加载视频内容期间显示一副图像(即视频的封面)
<li>autoplay: 指定自动播放，autoplay="autoplay"
<li> 位于开始和结束标签之间的 任何内容都可以作为后备内容，在浏览器不支持这两个媒体元素的情况显示  

因为并非所有浏览器都支持所有媒体格式，所以可以指定多个不同的媒体来源。为此，不同在标签中指定src属性。而是要像下面这样使用一或多个`<source>`元素  

    <video id="myVideo">
        <source src="conference.webm" type="video/webm">
        <source src="conference.ogv" type="video/ogg">
        <source src="conference.mpg">
        Video player not available.
    </video>
效果图
![5Hj31r.png](https://s1.ax2x.com/2018/09/23/5Hj31r.png)  

属性&事件
>Professional JavaScript for Web Developers 3rd Edition P.487 P.488  


一个小的自定义播放器，通过按钮控制视频的播放与暂停

    <body>
    <div>
        <video src="video1.mp4" id="myVideo" poster="pic1.png" autoplay="autoplay" controls>Video player not aviable</video>
    </div>
    <input type="button"  id="video-btn" value="play">
    <p id="curtime">0</p>
    <script>
        var video = document.getElementById("myVideo"),
            btn = document.getElementById("video-btn"),
            curtime = document.getElementById("curtime"),
            duration = document.getElementById("duration");
        //更新播放时间
        btn.addEventListener("click", function (event) {
            if (video.paused) {
                video.play();
                btn.value = "pause";
            } else {
                video.pause();
                btn.value = "play";
            }
        });
        setInterval(function () {
            //定时更新当前时
            curtime.innerHTML = video.currentTime;

        }, 250);
    </script>
    </body>
## 检测编解码的情况
video和audio都有一个canplayType()方法，该方法接受一种格式/编解码器字符串，返回"probably"，"mybe"或""(空字符串是假值)。  
可以用if语句来检测是否支持   

    if(aduio.canPlayType("audio/mpeg")){
      //进一步处理
    }

    if(audio.canPlayType("audio/ogg; code=\"vorbis\"")){
      //进一步处理
    }

实例  

    var audio = document.getElementById("aud");
    console.log(audio.canPlayType("audio/mpeg"));
## Audio类型
`<audio>`元素还有一个原生的JS构造函数Audio，可以在任何时候播放音频。但Audio不用必须插入文档中。只要创建个实例，并传入音频源即可。  

      var audio = new Audio("audio1.flac");
      //可以用作背景音乐，加载完毕即播放
      audio.addEventListener("canplaythrough", function (event) {
      audio.play();
      });
