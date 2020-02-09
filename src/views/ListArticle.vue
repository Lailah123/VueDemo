<template>
    <div class="element-table">
        <el-table :data="tableData">
            <el-table-column prop="id" label="编号" width="140">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="password" label="地址">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteRow(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page=currentPage
            :page-sizes="[5, 10, 50, 100]"
            :page-size=pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
            </el-pagination>
        </div>
        <!-- dialog -->
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
        <el-dialog ref="dialog" title="信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.addr" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRowConfirm()">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog ref="dialog1" title="信息" :visible.sync="dialogdetalVisible">
            <el-form :model="detailRow">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <!-- <el-input v-model="detailRow.name" autocomplete="off"></el-input> -->
                <span class="detail">{{detailRow.name}}</span>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <!-- <el-input v-model="detailRow.addr" autocomplete="off"></el-input> -->
                <span class="detail">{{detailRow.addr}}</span>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>

</template>

<script>
import { connect } from 'net';
import Vue from 'vue'
// import { METHODS } from 'http';
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        Confirm:false,
        id:'',
        tableData: null,
        total:0,
        pageSize:5,
        currentPage:1,
        dialogFormVisible: false,
        dialogdetalVisible: false,
        form: {
          name: '123',
          addr: 'addr',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        detailRow:{
            name:'',
            addr:''
        },
        formLabelWidth: '80px'
      }
    },
    mounted:function(){
        this.getCount()
        this.getPage()
    },
    methods:{
        detail(row) {
            console.log('detail')
            console.log(this.detailRow)
            console.log(row)
            this.dialogdetalVisible = true
            this.detailRow.name = row.password
            this.detailRow.addr = row.username
        },
        handleClick(row) {
        console.log(row);
        },
        editRowConfirm(){
            let $this = this
            this.$axios.post('/api/v1/redis/editUser',{name:this.form.name,passWord:this.form.addr,id:this.id})
                    .then(()=>{
                        $this.$message({
                            message:"编辑成功！",
                            type:"success",
                            duration:"1000"
                        }),
                        // $this.$notify({
                        //     title: '成功',
                        //     message: '这是一条成功的提示消息',
                        //     type: 'success'
                        // });
                        $this.getPage(),
                        $this.dialogFormVisible = false
                    })
        },
        editRow(row){
            console.log(row)
            this.dialogFormVisible = true //显示弹框
            let _row = row
            this.form.name = _row.username
            this.form.addr = _row.password
            this.id = _row.id
        },
        deleteRow(id){
            console.log(id);
            let $this = this
            this.$axios.post('/api/v1/redis/deleteUser',{id:id})
                .then(()=>{
                    $this.$message({
                        message:"删除成功！",
                        type:"success",
                        duration:"1000"
                    }),
                    $this.getPage()
                })
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getPage();
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.getPage();
        },
        getCount(){
            this.$axios.post('/api/v1/redis/queryCount')
            .then(res=>
                this.total = res.data
            )
        },
        getPage(){
            this.$axios.post('/api/v1/redis/queryByPage',{
                pageSize:this.pageSize,
                currectPage:this.currentPage
            })
            .then(res=>
                this.tableData = res.data
            )
        }
    }
  };
</script>

<style>
    .element-table{
        margin-left: 50px;
    }
    span.detail{
        margin-left: 30px
    }
</style>