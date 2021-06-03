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

export function deleteData(tabId,id){
  return request({
    url: `/${tabId}/delete?id=${id}`,
    method: 'get',
  })
}

export function updateData(tabId,formData) {
  return request({
    url: `/${tabId}/update`,
    method: 'post',
    data:formData
  })
}

export function insert(tabId,formData) {
  return request({
    url:`/${tabId}/insert`,
    method: 'post',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    data:formData
  })
}
//
// export function insert(params) {
//   return request({
//     // url: '/vue-admin-template/user/login',  //登陆过接口地址
//     url:'/login',
//     method: 'get',
//     params
//   })
// }
