<template>
  <div class="dashboard-container">
    <div class="main-title">有权访问数据列表</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="TabId" label="序号" width="180"> </el-table-column>
      <el-table-column prop="TabComment" label="表名"> </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="goDetail(scope.$index, scope.row)"
            >详情</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="authTable(scope.$index, scope.row)"
          >授权</el-button>

          <el-dialog title="授权"
                     :visible.sync="authVisible"
                     :close-on-click-modal="true"
                     :modal="true"
                     :show-close="true">
            <el-form
              ref="form"
              label-width="80px"
            >
              <el-form-item label="用户名">
                <el-input v-model="username"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button type="primary"
                         @click="onAuthUser(scope.$index, scope.row)">确认</el-button>
              <el-button @click="authVisible  = false">取 消</el-button>
            </div>

          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="num"
      class="fenye"
      :current-page="page"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>

<script>
import {auth, getTabList} from "@/api/table";

export default {
  name: "Dashboard",
  data() {
    return {
      page: 1,
      tableData: [],
      num: 1,
      authVisible:false,
      username:"",
      // form: {
      //   uid: ""
      // },
    };
  },
  methods: {

    onAuthUser(index,row) {
      auth(row.TabId,this.username)
        .then((res) => {
          if(res) {
            localStorage.setItem('Authorization', res.access_token);//登陆成功 获取token 存到localstorage
            this.authVisible = false;

            this.$router.push({ path:'/dashboard' });  //跳转到首页

          }

        })
        .catch((error) => {
          console.log(error);

        });
      // localStorage.setItem('token', "222"); // 下面这两个 登陆接口成功之后可以注掉
      // this.$router.push({ path: this.redirect || "/" });
    },



    goDetail(index, row) {
      this.$router.push({ path: "/detail", query: { id: row.TabId } }); //页面跳转到详情页的时候 把这条数据ID穿过去
    },
    authTable(){
      this.authVisible = true
    },
    getList() {
      let parmas = {
        page: this.page,
        pageSize: 10,
      };
      getTabList(parmas)
        .then((res) => {
          this.tableData = res;
          this.num = this.tableData.length/10;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
}
.main-title {
  font-size: 20px;
  margin-bottom: 20px;
}
.fenye {
  margin-top: 20px;
}
</style>
