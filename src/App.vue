<template> 
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router collapse-transition :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-eleme"></i>内容管理</template>
          <el-menu-item-group>
            <el-menu-item index="/listArticle"><i class="el-icon-tickets"></i>文章列表</el-menu-item>
            <el-menu-item index="/newArticle"><i class="el-icon-plus"></i>新建文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>阿秀</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template> 

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .pagination{
    margin-bottom: 10px;
  }
</style>

<script>
  export default {
    data() {

      return {
    
      }
    }
  };
</script>