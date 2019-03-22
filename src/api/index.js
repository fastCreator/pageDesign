import axios from 'axios'
import mocha from './mocha'
const API_ROOT = ''

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function () {
  let error = {
    data: {
      msg: '请求出错'
    }
  }
  return Promise.reject(error)
})

export default {
  getMyImgs: getMyImgs,
  getRecommendImgs: getRecommendImgs,
  getPageData: getPageData
}

// 获取我的图片
function getMyImgs (pageSize) {
  console.log('getMyImgs')
  return moachAjax(mocha.img)
}

// 获取推荐图片
function getRecommendImgs (pageSize) {
  return moachAjax(mocha.img)
}

// 初始化页面
function getPageData () {
  return moachAjax(mocha.pages)
}

function moachAjax (data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
