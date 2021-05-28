<template>
  <div class="app-container">
    <div class="main-title">
      详情
      <!--      <template>-->
      <!--         <el-button-->
      <!--            type="primary"-->
      <!--            size="small"-->
      <!--            @click="dialogVisible=true" style="text-align: right;font-weight:700;font-size: 17px;padding: 7px 10px;">增加记录</el-button>-->
      <!--       &lt;!&ndash;弹框&ndash;&gt;-->
      <!--          <el-dialog title="增加记录" :visible.sync="dialogVisible" :close-on-click-modal="true" :modal="true" :show-close="true" :center="true">-->
      <!--          <el-form :model="newForm"  :rules="rules1" ref="newForm" :label-width="formLabelWidth">-->
      <!--          <el-form-item label="厂家名称" prop="nickName">-->
      <!--            <el-input  auto-complete="off" style="width:70%;"></el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="账号" prop="userAccount">-->
      <!--            <el-input  @blur="checkName" auto-complete="off" style="width:70%;"></el-input>-->
      <!--          </el-form-item>-->

      <!--          <el-form-item label="实体店最大数量" prop="maxNumber">-->
      <!--            <el-input  auto-complete="off" style="width:70%;"></el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="到期时间" prop="useTime">-->
      <!--              <el-date-picker-->

      <!--                format="yyyy-MM-dd"-->
      <!--                style="width:70%;"-->
      <!--                type="date"-->
      <!--                placeholder="选择日期">-->
      <!--              </el-date-picker>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="备注">-->
      <!--            <el-input auto-complete="off" style="width:70%;"></el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--        <div slot="footer" class="dialog-footer">-->
      <!--          <el-button type="primary">保 存</el-button>-->
      <!--          <el-button>取 消</el-button>-->
      <!--        </div>-->

      <!--         </el-dialog>-->
      <!--      </template>-->
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
import { getTitle, getList, getObject } from '@/api/table'

export default {
  data() {
    return {
      dialogVisible: false,
      tabId: 0,
      page: 1,
      num: 1,
      title: [],
      tableData: []
    }
  },
  created() {
    // 页面加载前获取上个页面传过来的ID 用于查询详情
    if (this.$route.query && this.$route.query.id) {
      this.tabId = this.$route.query.id
    }
    this.getTitleList()
  },

  methods: {
    getTitleList() {
      // 先注掉了 不然报错返回登录页
      // let parmas = this.tabId;
      console.log('tabId::::', this.tabId)
      getTitle(this.tabId)
        .then((res) => {
          this.title = res.Fields // 获取到的list放入表格list
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
        code: scope.row[item.FieldName],
        id: this.tabId
      }
      console.log(parmas)
      getObject(this.tabId, parmas.id, parmas.code)
      // eslint-disable-next-line no-undef

      // getObject(this.tabId, parmas.id, parmas.code).then((res) => {
      //
      //   //
      //   // const blob = new Blob([res])
      //   // res.headers
      //   // const fileName = '黄皮书.docx'
      //   // const link = document.createElement('a')
      //   // link.download = fileName
      //   // link.style.display = 'none'
      //   // link.href = URL.createObjectURL(blob)
      //   // document.body.appendChild(link)
      //   // link.click()
      //   // URL.revokeObjectURL(link.href)
      //   // document.body.removeChild(link)
      // }).catch((err) => {
      //   console.log(err)
      // })
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
