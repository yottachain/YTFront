<template>
  <div class="app-container">
    <div class="main-title">
      详情
            <template>
               <el-button
                  type="primary"
                  size="small"
                  @click="dialogVisible=true" style="text-align: right;font-weight:700;font-size: 17px;padding: 7px 10px;">增加记录</el-button>
             <!--弹框-->
              <el-dialog title="增加记录" :visible.sync="dialogVisible" :close-on-click-modal="true" :modal="true" :show-close="true" :top="'%1'">
                <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item :label="item.FieldComment" v-for="(item,index) in title" :key="item.FieldName">
                  <el-input v-model="dataModel[item.FieldName]"  v-if="item.FieldType != 'file'"> </el-input>

                  <el-upload
                    v-else
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit()">保 存</el-button>
                    <el-button @click="dialogVisible  = false">取 消</el-button>
                  </div>

             </el-dialog>
            </template>
      <div class="back" @click="goBack"><返回列表页</div>

    </div>

    <el-table :data="tableData" border style="width: 100%">
      <!-- 遍历列名 -->
      <el-table-column
        v-for="item in title"
        :key="item.id"
        :label="item.FieldComment"
      >
        <!--判断是不是文件 如果是文件的就显示下载按钮  不是文件的显示相应的数据 -->
        <template slot-scope="scope">
          <el-button v-if="item.FieldType == 'file'" type="primary" size="small" @click="download(item,scope)">下载文件 </el-button>
          <span v-else>{{ scope.row[item.FieldName] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="num"
      class="fenye"
      :current-page="page"
    />
  </div>
</template>

<script>
import {getTitle, getList, getObject, insert} from '@/api/table'
import {login} from "@/api/user";

export default {
  data() {
    return {
      dialogVisible: false,
      tabId: 0,
      page: 1,
      num: 1,
      title: [],
      tableData: [],
      fileList:[],
      labelPosition:'left',
      dataModel:[]
    }
  },
  created() {
    // 页面加载前获取上个页面传过来的ID 用于查询详情
    if (this.$route.query && this.$route.query.id) {
      this.tabId = this.$route.query.id
    }
    this.getTitleList()
    // var len = this.title.length
    // for (var i=0;i<len;i++) {
    //   console.log("hahahaha:::::"+this.title[i])
    // }
  },

  methods: {

    onSubmit() {
      insert(this.tabId,this.form)
        .then((res) => {
          if(res) {
            // localStorage.setItem('Authorization', res.access_token);//登陆成功 获取token 存到localstorage

            this.$router.push({ path:'/dashboard' });  //跳转到首页
          }

        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ path:'#/login/index' });
        });
      // localStorage.setItem('token', "222"); // 下面这两个 登陆接口成功之后可以注掉
      // this.$router.push({ path: this.redirect || "/" });
    },


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    getTitleList() {
      // 先注掉了 不然报错返回登录页
      // let parmas = this.tabId;
      console.log('tabId::::', this.tabId)
      getTitle(this.tabId)
        .then((res) => {

          this.title = res.Fields // 获取到的list放入表格list
          // console.log("titl000000000e"+this.title)
          this.title.forEach(e=>{
            // this.dataModel.push(e.FieldName)
            // e.value = ''
            this.dataModel[e.FieldName] = ''
          })
          console.log("dataModel:::"+this.dataModel)
          this.getTableList()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTableList() {
      // 先注掉了 不然报错返回登录页
      const parmas = { // 参数
        tabId: this.tabId,
        page: this.page,
        pageSize: 10,
        startid: 1,
        limit: 10
      }
      getList(parmas, this.tabId)
        .then((res) => {
          this.tableData = res // 获取到的list放入表格list
          console.log('tableData::::', this.tableData)
          this.num = this.tableData.length / 10
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goBack() {
      this.$router.go(-1)
    },
    download(item, scope) {
      const parmas = {
        // code: scope.row[item.FieldName],
        id: this.tabId,
        fieldName: item.FieldName
      }
      console.log(parmas)
      // getObject(this.tabId, parmas.id, parmas.code)
      // eslint-disable-next-line no-undef

      getObject(this.tabId, parmas.id, parmas.fieldName).then((res) => {

        //
        const blob = new Blob([res])
        const fileName = scope.row[item.FieldName]
        const link = document.createElement('a')
        link.download = fileName
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      }).catch((err) => {
        console.log(err)
      })
    },

    insert(){
      let fd = new FormData()
    }

  }
}
</script>
<style scoped>
.app-container {
}
.main-title {
  font-size: 20px;
  margin-bottom: 20px;
}
.fenye {
  margin-top: 20px;
}
.insert {
  font-size: 14px;
  color: blue;
  cursor: pointer;
}
.back {
  float: right;
  font-size: 14px;
  color: blue;
  cursor: pointer;
}

</style>
