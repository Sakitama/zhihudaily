# zhihudaily

高仿知乎日报 Android 版的微信小程序

小程序越来越火了，不尝试一下总觉得不爽。平时喜欢刷知乎日报，于是就用小程序仿写了一个知乎日报，写完之后小程序给我的感觉就是低配版  Ract 和 Vue，demo如下：

启动页：

![](./demo/1.gif)

停留3秒之后跳转到首页。

首页，核心组件采用了小程序提供的 scroll-view 和 swiper，前者用于全屏滚动，监听滚动到底部的事件，请求新一页数据。后者用于展示轮播图。

![](./demo/2.gif)

文章详情页。最大的坑在这，小程序原生不支持 webview，偏偏知乎日报 api 返回的数据是 html，没办法，用了一个名为 wxParse 的插件，作用是解析 html 并转换为小程序的 wxml，效果还凑合，但不完美，后期考虑自己实现一个。

![](./demo/3.gif)

主题列表。往右滑动，显示出底层的主题列表页。原理是给顶层的文章列表页添加 bindtouchstart、bindtouchmove 和 boundtouchend 事件，通过 CSS3 的 transform 的 translate 改变其位置。

![](./demo/4.gif)

切换主题，文章列表更新。

![](./demo/5.gif)

遇到的问题：
1、小程序原生不支持webview
解决方法：使用 wxParse 进行解析
2、知乎日报图片防盗链问题
解决方法：给每个图片 url 地址前添加 "http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl="。


