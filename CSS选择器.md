### 通配选择器
```
    *{
    
    }
```
描述：以文档的所有元素作为选择符    
### jquery操作css
```js
    $(".btn").click(function(){
        $(this).css("color","red");
    })
```
### 层次选择器
<table>
    <tr><td>选择器</td><td>描述</td><td>实例</td></tr>
    <tr><td>$("ancestor descendant")</td><td>选择ancestor元素里所有descendant后代元素</td><td>$("div span")选取div里所有span元素</td></tr>
    <tr><td>$("parent>child")</td><td>选取parent元素下的child元素，与$("ancestor descentdant")有区别，$("ancestor descentdant")选择的是后代元素</td><td>$("div>span")选取div元素下元素名是span的子元素</td></tr>
    <tr><td>$("prev+next")</td><td>选取紧接在prev元素后的next元素</td><td>$(".one+div")选取class为one的下一个div同辈元素</td></tr>
    <tr><td>$("prev~siblings")</td><td>选取prev元素之后的所有siblings元素</td><td>$("#two~div")选取id为two元素后面所有div同辈元素</td></tr>
</table>

###  基本过滤器
<table>
<tr><td>选择器</td><td>描述</td><td>实例</td></tr>
<tr><td>:first</td><td>选取第1个元素</td><td>$("div:first")选取所有div元素中第1个Div元素</td></tr>
<tr><td>:last</td><td>选取最后一个元素</td><td>$("div:last")选取所有div元素中最后一个div元素</td></tr>
<tr><td>:not(selector)</td><td>去除所有与给定选择器匹配的元素</td><td>$("input:not(.myClass)")选取class不是myClass的input元素</td></tr>
<tr><td>:even</td><td>选取索引是偶数的所有元素,索引从0开始</td><td>$("input:even")选取索引是偶数的input元素</td></tr>
<tr><td>:odd</td><td>选取索引是奇数的所有元素，索引从0开始</td><td>$("input:odd")选取索引是奇书的input元素</td></tr>
<tr><td>:eq(index)</td><td>选取索引等于index的元素</td><td>$("input:eq(1)")选取索引等于1的元素</td></tr>
<tr><td>:gt(index)</td><td>选取索引大于index的元素</td><td>$("input:gt(1)")选取索引大于1的input元素</td></tr>
<tr><td>:lt(index)</td><td>选取索引小于index的元素</td><td>$("input:lt(1)")选取索引小于1的input元素</td></tr>
<tr><td>:header</td><td>选取所有的标题元素，例如h1,h2,h3等</td><td>$(":header")选取网页中所有的h1,h2,h3的元素</td></tr>
<tr><td>:animated</td><td>选取当前正在执行的动画的所有元素</td><td>$("div:animated")选取正在执行动画的div元素</td></tr>
<tr><td>:focus</td><td>选取当前获得焦点的元素</td><td>$(":focus")选取当前获得焦点的元素</td></tr>
</table>

### 内容过滤器
<table>
<tr><td>选择器</td><td>描述</td><td>实例</td></tr>
<tr><td>:contains(text)</td><td>选择含有文本内容为"text"的元素</td><td>$("div:contains('我')")选取含有文本"我"的div元素</td></tr>
<tr><td>:empty</td><td>选取不包含子元素或者文本的空元素</td><td>$("div:empty")选取不包含子元素(包含文本元素)的div空元素</td></tr>
<tr><td>:has(selector)</td><td>选取含有选择选择器所匹配的元素的元素</td><td>$("div:has(p)")选取含有p元素的div元素</td></tr>
<tr><td>:parent</td><td>选择含有子元素或文本元素</td><td>$("div:parent")选取拥有子元素(包含文本元素)的div元素</td></tr>
</table>

### 可见性过滤器
<table>
<tr><td>:hidden</td><td>选取所有不可见的元素</td><td>$("div:hidden")选取所有不可见的元素</td></tr>
<tr><td>:visible</td><td>选取所有可见的元素</td><td>$("div:visible")</td></tr>
</table>

### 属性过滤器

<table>
<tr><td>[attribute]</td><td>选择拥有此属性的元素</td><td>$("div[id]")选择拥有属性id的元素</td></tr>
<tr><td>[attribute=value]</td><td>选择属性为value的元素</td><td>$("div[title=test]")选择属性title为test的div元素</td></tr>
<tr><td>[attribute!=value]</td><td>选择属性值不为value的元素</td><td>$("div[title!=test]")选取属性title不等于test的div元素</td></tr>
<tr><td>[attribute^=value]</td><td>选取属性以value值开始的元素</td><td>$("div[title^=test]")选取属性title以test开始的div元素</td></tr>
<tr><td>[attribute$=value]</td><td>选择属性的值以value为结束的元素</td><td>$("div[title$=test]")选取属性title以test为结束的div元素</td></tr>
<tr><td>[attribute*=value]</td><td>选择属性的值含有value的元素</td><td>$("div[title*=test]")选取属性title含有test的div元素</td></tr>
<tr><td>[attribute|=value]</td><td>选取属性等于给定字符串以该字符串为前缀(该字符串后跟一个连字符-)的元素</td><td>$("div[title|='en']")选取属性title等于en或者en为前缀(该字符串最后跟一个连字符-)的元素</td></tr>
<tr><td>[attibute~=value]</td><td>选取属性用空格分隔的值中包含一个给定值的元素</td><td>$('div[title~="uk"]')选取属性title用空格分隔的值中包含字符uk的元素</td></tr>
<tr><td>[attribute1][attribute2][attributeN]</td><td>用属性选择器合并成一个符合属性选择器，满足多个条件</td><td>$("div[id][title$='test']")选取拥有属性id并且属性title以test为结束的div元素</td></tr>
</table>

### 子元素过滤选择器
    nth-child()索引从1开始，
**$(.one :nth-child(1)),注意的是:与之前有一个空格间隔。**  

选择器使用 *$("div.one")*，相当于选择div元素，并且class="one"的元素，如果中间有分隔符如 *$("div .one)*表示选择div元素的子元素，子元素class="one"的元素。
<table>
<tr><td>:nth-child()</td><td>选取每个父元素下的第index个子元素</td><td>$("div.one :nth-child(1)")选择class="one"的div元素的第一个子元素</td></tr>
<tr><td>:last-child</td><td>选取父元素下的最后一个元素</td><td></td></tr>
<tr><td>:first-child</td><td>选取父元素下的第一个元素</td><td></td></tr>
<tr><td> :only-child</td><td>如果父元素下有唯一的元素会被匹配</td><td></td></tr>
</table>

### 表单选择器
<table>
    <tr><td>:checked</td><td>选中所有被选中的元素</td><td>$("input:checked")</td></tr>
    <tr><td>:selected</td><td>选中所有被选中的选项元素</td><td>$("input:selected")</td></tr>
</table>