<template>
  <header class="header">
    <div class="container"><h1>
      <a href="" class="router-link-active">在线画板</a></h1>
      <ul class="nav">
        <li class="nav-item"><a href="/" :class="{'active' : selectedMenu === '/'}"></a></li>
      </ul>
    </div>
  </header>
</template>
<style lang="scss">
  @import "./header.scss";
</style>
<script type="text/babel">
  export default{
    data(){
      return {
        selectedMenu : '/app'
      }
    },
    computed:{

    },
    mounted(){
      this.selectedMenu = window.location.pathname.toLowerCase().replace(/\/$/,'');
    }
  }
</script>
