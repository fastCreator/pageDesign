<template>
  <div id="appindex">
    <div class="viewWrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
#appindex {
  min-width: 1180px;

  .viewWrap {
    background-color: $color-white;
    min-height: calc(110vh - 110px);
    min-width: 1170px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  /* 滚动条样式 */
}

.scroll {
  overflow: auto;
  height: 100%;
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    -webkit-border-radius: 3px;
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30px;
    background-color: rgba(255,255,255,0.4);
    -webkit-border-radius: 7px;
    outline-offset: -2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    height: 30px;
    background-color: rgba(255,255,255,0.8);
    -webkit-border-radius: 8px;
  }
}
</style>


