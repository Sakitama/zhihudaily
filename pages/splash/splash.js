import {
    getSplashCover
} from '../../request/request';

Page({
    data: {
        url: '',
        screenHeight: 0,
        screenWidth: 0
    },
    onLoad () {
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth,
                });
            }
        });
    },
    onReady () {
        let size = this.data.screenWidth + '*' + this.data.screenHeight;
        getSplashCover(size, (data) => {
            this.setData({
                url: 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + data.creatives[0].url
            });
        }, () => {
            console.log('请求封面图片失败！')
        }, () => {
            toIndexPage();
        });
    }
});

/**
 * 跳转到首页
 */
function toIndexPage () {
    setTimeout(() => {
        wx.redirectTo({
            url: '../index/index'
        });
    }, 3000);
}