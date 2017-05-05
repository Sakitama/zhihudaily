import {
    getNewsDetail
} from '../../request/request';
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        pageData: {}
    },
    onLoad: function (options) {
        let id = options.id;
        getNewsDetail(id, (data) => {
            this.setData({
                pageData: data
            });
            WxParse.wxParse('article', 'html', data.body, this, 5);
        }, () => {
            console.log("请求新闻详情失败");
        }, null);
    },
});