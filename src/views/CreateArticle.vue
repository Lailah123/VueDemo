<template>
    <el-form class = "articleFrom" ref="form" :model="form" label-width="120px">
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
           <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button type="info" @click="reSet">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        form: {
          name: '',
          passWord: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form.name+" "+this.form.passWord)
        this.submitData()
      },
      reSet() {
          this.form.name=""
          this.form.passWord=""
      },
      submitData(){
          var that = this;
          if(this.form.name!="" && this.form.password!=""){
              this.$axios.post('/api/v1/redis/insertUser',
                this.form
            )
            .then(function(){
                that.success("插入成功");
                that.form.name = "";
                that.form.passWord = "";
            })
          }
      },
      success(msg){
        this.$message({
            message:msg,
            type:"success",
            duration:"1000"
        });
      }
    }
  }
</script>

<style>
    .articleFrom{
        width: 500px;
    }
</style>