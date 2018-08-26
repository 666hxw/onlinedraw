<template>
   <div style="height: 100%; width: 100%;">
      <LayoutHeader></LayoutHeader>
      <LayoutContent>
        <div slot="content" style="height: 100%; width: 100%;">
          <slot name="main"></slot>
        </div>
     </LayoutContent>
   </div>
</template>
<style>
  html, body, #app {
    margin: 0 0px;
    height: 100%;
    width: 100%;
  }
  a{
    text-decoration: none;
  }
  @import "../../../asset/css/global.css";
</style>
<script type="text/babel">
  import LayoutHeader from './header/header';
  import LayoutContent from './content/content';
  export default{
    components: {
      LayoutHeader,
      LayoutContent
    }
  }
</script>
