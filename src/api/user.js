import request from '@/utils/request'

export function login(params) {
  return request({
    // url: '/vue-admin-template/user/login',  //登陆过接口地址
    url:'/login',
    method: 'get',
    params
  })
}


export function logout() {
  return request({
    url: '/vue-admin-template/user/logout', //登出接口
    method: 'post'
  })
}
