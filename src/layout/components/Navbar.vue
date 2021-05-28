<template>
  <div class="navbar">
    <div class="content">
      <div class="left-name">
        <img src="../../assets/user.png" />
        <span style="display: block"> {{ username }}</span>
      </div>
      <div class="right-menu">
        <div @click="logout">
          <span style="display: block">退出登陆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    username() {
      return localStorage.getItem('uid')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 150px;
  position: relative;
  background: #2d3246;
  .content {
    height: 150px;
    background: url("../../assets/bg.png");
    margin: 0 20%;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .left-name {
    float: left;
    height: 100%;
    line-height: 80px;
    color: #fff;
    margin-left: 10px;
    display: flex;
    img{
      width: 32px;
      height: 32px;
      position: relative;
      top: 24px;
      margin-right: 10px;
    }
    span {
      font-size: 14px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 80px;
    display: inline-block;
    cursor: pointer;
    color: #fff;
    margin-right: 10px;
    &:focus {
      outline: none;
    }
  }
}
</style>
