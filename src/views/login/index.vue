<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
      class="login-form"
    >
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.secret_key" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="onSubmit(form.uid)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      form: {
        uid: "",
        secret_key: "",
      },
    };
  },
  methods: {

    onSubmit(username) {
      login(this.form)
        .then((res) => {
          if(res) {
            localStorage.setItem('Authorization', res.access_token);//登陆成功 获取token 存到localstorage

            this.$router.push({ path:'/dashboard' });  //跳转到首页
          }
          console.log('uid===',username)
          localStorage.setItem('uid',username)

        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ path:'#/login/index' });
        });
      // localStorage.setItem('token', "222"); // 下面这两个 登陆接口成功之后可以注掉
      // this.$router.push({ path: this.redirect || "/" });
    },
  },
};
</script>

<style acoped>
.login-form {
  width: 350px;
  height: 450px;
  margin: 100px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}
.login-form input {
  background: transparent;
  color: #fff;
}
.login-form label {
  background: transparent;
  color: #fff;
}
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/Starry.png");
}

/* 标题 */
.login-title {
  color: #fff;
  text-align: center;
}
.login-btn {
  margin-top: 10%;
  width: 100%;
}
</style>
