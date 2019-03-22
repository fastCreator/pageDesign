<template>
  <div
    id="page-list-wrap"
    class="scroll"
  >
    <div
      class="page-preview-wrap"
      v-for="(it,i) in dPagesList"
      :key="i.uuid"
    >
      <i
        class="deletePage el-icon-error"
        @click="deletePage(i)"
      ></i>
      <page-preview
        :dWidgets="it.dWidgets"
        @click.native="selectCurrentPage(i)"
      ></page-preview>
    </div>
    <el-button
      @click="addPage"
      class="addPage"
      type="primary"
      size="medium"
      icon="el-icon-plus"
    >新增页面</el-button>
  </div>
</template>

<script>
// 图片列表
const NAME = "page-list-wrap";

import api from "API";
import { mapGetters, mapActions } from "vuex";

export default {
  name: NAME,
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapGetters(["dPagesList"])
  },
  watch: {},
  methods: {
    ...mapActions(["selectCurrentPage", "addPage", "deletePage"])
  }
};
</script>

<style lang="stylus" scoped>

.addPage {
  width: calc(100% - 10px);
  margin-left: 4px;
  margin-top: 10px;
}

.page-preview-wrap {
  position: relative;
  &:hover {
    .deletePage {
      display: inline;
    }
  }
  .deletePage {
    display: none;
    position: absolute;
    right: 4px;
    top: 12px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 26px;
    z-index: 100;
    cursor: pointer;
  }
}
</style>
