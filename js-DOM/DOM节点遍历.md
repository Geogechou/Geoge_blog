# DOM-遍历
## NodeIterator
可以用document.createNodeIterator()方法创建它的新实例  
该方法接受四个参数  
<li>root :想要作为搜索起点的树中的节点  
<li>whatToShow :表示要访问那些节点的数字代码  
<li>filter :是一个NodeFilter对象，或者是一个函数  
<li>entityReferenceExpansion： 布尔值，表示是否要扩展尸体引用,在HTML中无效  

WhatToShow参数是一个位掩码，通过应用一或多个过滤器来确定要访问那些节点。  
<li>Nodefilter.SHOW_ALL:显示所有类型的节点  
<li>Nodefilter.SHOW_ELEMENT： 显示元素节点  
<li>Nodefilter.SHOW_TEXT: 显示文本节点  

<strong><font size="5">节点过滤器的函数(node filter)</strong>，每个NodeFilter对象只有一个方法，如果应该访问指定的节点，则该方法返回NodeFilter.FILTER_ACCEPT，如果不应该访问给定的节点，该方法返回NodeFilter.FILTER_SKIP  

例如要访问所有的`<p>`元素  

    var filter=function(node){
      //指定过滤器接受<p>元素
      return node.nodeName.toLowerCase()=="p"?NodeFilter.Filter_ACCEPT：
      NodeFilter.FILTER_SKIP；
    }；
    var iterator=document.createNodeIterator(document.NodeFilter.SHOW_ALL,null,false);
NodeIterator类型的两个主要方法是nextNode()和previousNode()  

nextNode()方法用于向前前进一步，而previousNode()用于向后退一步  
实例：

    <script>
    //过滤器函数
    var filter = function (node) {
        return node.nodeName.toLowerCase() == "li" ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
    }
    var div = document.querySelector("#myDiv");
    var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT,filter, false);
    var node = iterator.nextNode();
    while (node!== null) {
        console.log(node.nodeName + " " + node.textContent);
             //遍历
            node = iterator.nextNode();
    }
    </script>  
## TreeWalker
