import {
    isFunction
} from '../utils/utils';
import {
    API_V4,
    API_V7
} from '../api/api';

function getSplashCoverUrl (size) {
    return API_V7 + '/prefetch-launch-images/' + size;
}

function getNewsLatestUrl () {
    return API_V4 + '/news/latest';
}

function getBeforeNewsUrl (date) {
    return API_V4 + '/news/before/' + date;
}

function getNewsDetailUrl (id) {
    return API_V4 + '/news/' + id;
}

function getThemeListUrl () {
    return API_V4 + '/themes';
}

function getThemeContentUrl (id) {
    return API_V4 + '/theme/' + id;
}

let app = getApp();

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param failCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
function requestData (url, data, successCallback, failCallback, completeCallback) {
    if (app.debug) {
        console.log('requestData url: ', url);
    }
    wx.request({
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success (res) {
            if (app.debug) {
                console.log('response data: ', res.data);
            }
            if (res.statusCode == 200) {
                isFunction(successCallback) && successCallback(res.data);
            } else {
                isFunction(failCallback) && failCallback();
            }
        },
        fail () {
            isFunction(failCallback) && failCallback();
        },
        complete () {
            isFunction(completeCallback) && completeCallback();
        }
    });
}

function getSplashCover (size, successCallback, failCallback, completeCallback) {
    requestData(getSplashCoverUrl(size), {}, successCallback, failCallback, completeCallback);
}

function getNewsLatest (successCallback, failCallback, completeCallback) {
    requestData(getNewsLatestUrl(), {}, successCallback, failCallback, completeCallback);
}

function getBeforeNews (date, successCallback, failCallback, completeCallback) {
    requestData(getBeforeNewsUrl(date), {}, successCallback, failCallback, completeCallback);
}

function getNewsDetail (id, successCallback, failCallback, completeCallback) {
    requestData(getNewsDetailUrl(id), {}, successCallback, failCallback, completeCallback);
}

function getThemeList (successCallback, failCallback, completeCallback) {
    requestData(getThemeListUrl(), {}, successCallback, failCallback, completeCallback);
}

function getThemeContent (id, successCallback, failCallback, completeCallback) {
    requestData(getThemeContentUrl(id), {}, successCallback, failCallback, completeCallback);
}

export {
    getSplashCover,
    getNewsLatest,
    getBeforeNews,
    getNewsDetail,
    getThemeList,
    getThemeContent
};