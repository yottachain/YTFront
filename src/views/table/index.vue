<template>
  <div class="app-container">
    <div class="main-title">
      详情
      <template>
        <el-button type="primary"
                   size="small"
                   @click="dialogVisible=true"
                   style="text-align: right;font-weight:900;font-size: 17px;padding: 7px 10px;">增加记录</el-button>
        <!--增加记录弹框-->
        <el-dialog title="增加记录"
                   :visible.sync="dialogVisible"
                   :close-on-click-modal="true"
                   :modal="true"
                   :show-close="true"
                   :top="'%1'">
          <el-form :label-position="labelPosition"
                   label-width="100px">
            <el-form-item :label="item.FieldComment"
                          v-for="item in title"
                          :key="item.FieldName">
              <el-input v-model="dataModel[item.FieldName]"
                        :placeholder="item.FieldType"
                        v-if="item.FieldType != 'file'"> </el-input>
              <input type="file"
                     v-else
                     @change="onFileChange($event,item.FieldName)" />

            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="onSubmit()">保 存</el-button>
            <el-button @click="dialogVisible  = false">取 消</el-button>
          </div>

        </el-dialog>
        <!--修改记录弹框-->
        <el-dialog title="修改"
                   :visible.sync="updateVisible"
                   :close-on-click-modal="true"
                   :modal="true"
                   :show-close="true"
                   :top="'%1'">
          <el-form :label-position="labelPosition"
                   label-width="100px">
            <el-form-item :label="item.FieldComment"
                          v-for="item in title"
                          :key="item.FieldName">
              <el-input v-model="dataModel[item.FieldName] "

                        v-if="item.FieldType != 'file'"> </el-input>
              <input type="file"
                     v-else
                     @change="onFileChange($event,item.FieldName)" />

            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="onSubmitUpdataData()">保 存</el-button>
            <el-button @click="updateVisible  = false">取 消</el-button>
          </div>

        </el-dialog>
      </template>
      <div class="back"
           @click="goBack">
        返回列表页</div>

    </div>

    <el-table :data="tableData"
              height="800"
              border
              style="width: 100%">
      <!-- 遍历列名 -->
      <el-table-column v-for="item in title"
                       :key="item.id"
                       :label="item.FieldComment">
        <!--判断是不是文件 如果是文件的就显示下载按钮  不是文件的显示相应的数据 -->
        <template slot-scope="scope">
          <el-button v-if="item.FieldType == 'file'"
                     type="primary"
                     size="small"
                     @click="download(item,scope)">下载文件 </el-button>
          <span v-else>{{ scope.row[item.FieldName] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="update(scope.row)"
            style="text-align: right;font-weight:900;font-size: 17px;padding: 7px 10px;">修改</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteRecord(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-pagination background-->
<!--                   layout="prev, pager, next"-->
<!--                   :total="num"-->
<!--                   class="fenye"-->
<!--                   :current-page="page" />-->
  </div>
</template>

<script>
import { getTitle, getList, getObject, insert,deleteData,updateData } from '@/api/table'
import { login } from "@/api/user";

export default {
  data () {
    return {
      dialogVisible: false,
      updateVisible: false,
      tabId: 0,
      page: 1,
      num: 1,
      title: [],
      tableData: [],
      fileList: [],
      labelPosition: 'left',
      dataModel: [],
      form: {
      },
    }
  },
  created () {
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
    update(row) {
      this.dataModel = row
      this.updateVisible = true
    },
    onFileChange (e, mod) {
      console.log(e);
      console.log(mod);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      console.log(files[0]);
      this.dataModel[mod] = files[0];
    },
    onSubmit () {
      let fd = new FormData()
      this.title.forEach(e => {
        console.log("key:::" + e.FieldName + " ,value::::" + this.dataModel[e.FieldName])
        fd.append(e.FieldName, this.dataModel[e.FieldName])

      })

      insert(this.tabId, fd)
        .then((res) => {
          if (res) {
            this.getTableList();
            this.dialogVisible = false
          }

        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ path: '#/detail' });
        });
    },
    onSubmitUpdataData() {
      let fd = new FormData()
      this.title.forEach(e => {
        console.log("key:::" + e.FieldName + " ,value::::" + this.dataModel[e.FieldName])
        fd.append(e.FieldName, this.dataModel[e.FieldName])

      })
      updateData(this.tabId,fd)
        .then((res) =>{
          if(res){
            this.getTableList();
            this.updateVisible = false
          }

        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ path: '#/detail' });
        });
    },




    handleChange (file, fileList) {
      this.fileListCache = fileList;
    },


    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.total--;
      this.handleChange(file, fileList);

    },
    handlePreview (file) {
      console.log(file);
      this.handlePreview(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getTitleList () {
      // 先注掉了 不然报错返回登录页
      // let parmas = this.tabId;
      console.log('tabId::::', this.tabId)
      getTitle(this.tabId)
        .then((res) => {

          this.title = res.Fields // 获取到的list放入表格list
          // console.log("titl000000000e"+this.title)
          this.title.forEach(e => {
            // this.dataModel.push(e.FieldName)
            e.value = ''
            // this.dataModel[e.FieldName] = ''
          })
          console.log("dataModel:::" + this.dataModel)
          this.getTableList()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTableList () {
      // 先注掉了 不然报错返回登录页
      const parmas = { // 参数
        tabId: this.tabId,
        page: this.page,
        pageSize: 20,
        startid: 1,
        limit: 100
      }
      getList(parmas, this.tabId)
        .then((res) => {
          this.tableData = res // 获取到的list放入表格list
          console.log('tableData::::', this.tableData)
          this.num = this.tableData.length / 10
          console.log("this.num" + this.num)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    deleteRecord (scope) {
      //   deleteData(this.tabId,scope.row["id"]).then((res) => {
      //     console.log("delete:"+res)
      //     this.getTableList();
      // }).catch((err) => {
      //     console.log(err)
      // })
      this.openDelConfirm().then(() =>{
          deleteData(this.tabId,scope.row["id"]).then((res) => {
            console.log("delete:"+res)
            this.getTableList();
        }).catch((err) => {
            console.log(err)
        })
      })
    },

    download (item, scope) {
      const parmas = {
        // code: scope.row[item.FieldName],
        id: scope.row["id"],
        fieldName: item.FieldName
      }
      console.log(parmas)

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

    insert () {
      let fd = new FormData()
    },

    openDelConfirm() {
      return this.$confirm(`此操作将删除整条记录不可恢复, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
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
