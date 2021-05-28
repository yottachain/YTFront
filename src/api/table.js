import request from '@/utils/request'
import {getToken} from '@/utils/auth'
export function getTabList(params) {
  return request({
    url: '/list', // 接口地址
    method: 'get', // 方法
    params
  })
}
export function getTitle(params) {
  return request({
    url: `/${params}/schema`,
    method: 'get'
  })
}
export function getList(params, tabId) {
  return request({
    url: `/${tabId}/list`,
    method: 'get',
    params
  })
}

export function getObject(tabId, id, fieldname) {
  return request({
    url: `/${tabId}/down?id=${id}&fieldname=${fieldname}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
  })
  // let url
  // let token
  // token = getToken()
  // url= `/${tabId}/down?id=${id}&code=${code}&token=${token}`
  // window.location.href = url

}
