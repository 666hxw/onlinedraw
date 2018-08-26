<template>
  <app-layout>
    <el-container>
      <el-aside width="250px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu v-for="(menu, index) in menuData" :key="index" :index="index + ''">
            <template slot="title">
              <i :class="'el-icon-' + menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item v-for="(item, itemIndex) in menu.submenu" :key="itemIndex" :index=" index + '-' + itemIndex" @click="goto(item)">
              {{ item.title }}
            </el-menu-item>
          </el-submenu>
          </el-menu>
      </el-aside>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </app-layout>
</template>
<style lang="scss">
  .el-menu-item a {
    color: #fff;
  }
</style>
<script type="text/babel">
  export default {
    data() {
      return {
        menuData: [
          {
            title: '画板管理',
            icon: 'picture',
            submenu: [
              {
                title: '画板列表',
                url: '/draw/list',
              },
              {
                title: '创建画板',
                url: '/draw/create',
              },
            ]
          },
          {
            title: '用户管理',
            icon: 'setting',
            submenu: [
              {
                title: '用户列表',
                url: '/user/list',
              },
              {
                title: '创建用户',
                url: '/user/create',
              },
            ]
          },
        ]
      }
    },
    methods: {
      goto(data) {
        this.$router.push(data.url);
      }
    },
    computed: {

    },
    mounted(){

    }
  }
</script>
