import {
    getNewsLatest,
    getBeforeNews,
    getThemeList,
    getThemeContent
} from '../../request/request';
import {
    splitDateStr
} from '../../utils/utils';

const weekdayStr = ['日', ' 一', '二', '三', '四', '五', '六'];

Page({
    data: {
        pageData: [],
        themeListData: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        indicatorActiveColor: '#fff',
        currentDate: '',
        loadingMore: false,
        currentIndex: '-1',
        open: false,
        mark: 0,
        newmark: 0,
        istoright: true
    },
    onLoad () {
        getNewsLatest((data) => {
            let tempStack = [];
            data.pageTitle = '今日热文';
            tempStack.push(data);
            this.setData({
                currentDate: data.date,
                pageData: tempStack
            });
        }, () => {
            console.log("请求最新新闻失败");
        }, null);
        getThemeList((data) => {
            this.setData({
                themeListData: data
            });
        }, () => {
            console.log("请求主题失败");
        }, null)
    },
    loadingMore () {
        if (this.data.currentDate !== '') {
            if (this.data.loadingMore) {
                return;
            }
            this.setData({
                loadingMore: true
            });
            let date = splitDateStr(this.data.currentDate);
            let tempStack = this.data.pageData;
            let yesterday = new Date(Date.parse(date.year + '-' + date.month + '-' + date.day) - 1000 * 60 * 60 * 24);
            let y = yesterday.getFullYear();
            let m = (yesterday.getMonth() + 1);
            let d = yesterday.getDate();
            m = m > 9 ? m : '0' + m;
            d = d > 9 ? d : '0' + d;
            getBeforeNews(this.data.currentDate, (data) => {
                data.pageTitle = ([y, '年', m, '月', d, '日'].join('') + '  星期' + weekdayStr[yesterday.getDay()]);
                tempStack.push(data);
                this.setData({
                    currentDate: data.date,
                    pageData: tempStack
                });
            }, () => {
                console.log("请求历史新闻失败");
            }, () => {
                setTimeout(() => {
                    this.setData({
                        loadingMore: false
                    });
                }, 200);
            });
        }
    },
    toDetailPage (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        });
    },
    toIndex (e) {
        getNewsLatest((data) => {
            let tempStack = [];
            data.pageTitle = '今日热文';
            tempStack.push(data);
            this.setData({
                currentDate: data.date,
                pageData: tempStack
            });
        }, () => {
            console.log("请求最新新闻失败");
        }, null);
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
        console.log(this.data.currentIndex);
    },
    toTheme (e) {
        let id = e.currentTarget.dataset.id;
        getThemeContent(id, (data) => {
            let tempStack = [];
            data.pageTitle = data.name;
            tempStack.push(data);
            this.setData({
                currentDate: '',
                pageData: tempStack
            });
        }, () => {
            console.log("请求主题内容失败");
        }, null);
        let index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
        console.log(index);
    },
    tap_start (e) {
        // touchstart事件
        this.data.mark = this.data.newmark = e.touches[0].pageX;
    },
    tap_drag (e) {
        // touchmove事件

        /*
         * 手指从左向右移动
         * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
         */
        this.data.newmark = e.touches[0].pageX;
        if (this.data.mark < this.data.newmark) {
            this.istoright = true;
        }
        /*
         * 手指从右向左移动
         * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
         */
        if (this.data.mark > this.data.newmark) {
            this.istoright = false;

        }
        this.data.mark = this.data.newmark;

    },
    tap_end () {
        // touchend事件
        this.data.mark = 0;
        this.data.newmark = 0;
        if (this.istoright) {
            this.setData({
                open: true
            });
        } else {
            this.setData({
                open: false
            });
        }
    }
});
