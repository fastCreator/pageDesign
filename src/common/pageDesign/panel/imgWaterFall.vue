<template>
  <div
    id="img-water-fall"
    ref="imgWaterFall"
    class="img-water-fall"
    v-loading="loading && busy"
    element-loading-background="rgba(0, 0, 0, 0.4)"
    element-loading-text="拼命加载中"
  >
    <div
      class="scroll"
      v-infinite-scroll="infinite"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <waterfall
        :line-gap="96"
        :watch="innerListData"
      >
        <waterfall-slot
          v-for="(item, index) in innerListData"
          :width="item.width"
          :height="item.height"
          :order="index"
          :key="index"
        >
          <transition name="fade">
            <img
              class="img"
              :src="item.url"
              @click.stop="selectImg(item, index)"
            >
            />
          </transition>
        </waterfall-slot>
      </waterfall>
    </div>
  </div>
</template>

<script>
// 图片素材-瀑布流组件
const NAME = "img-water-fall";

export default {
  name: NAME,
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      busy: false
    };
  },
  created() {
    if (!this.loading) {
      this.busy = true;
    }
  },
  mounted() {},
  computed: {
    innerListData() {
      return this.listData.map(it => ({
        url: it.url,
        width: 90,
        height: 90 / it.ratio,
        value: it
      }));
    }
  },
  watch: {},
  methods: {
    done() {
      setTimeout(() => {
        this.busy = false;
      }, 200);
    },
    infinite() {
      this.busy = true;
      this.$emit("add-img", this.done);
    },
    selectImg(value, index) {
      this.$emit("select-img", value);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl';

.img-water-fall {
  position: relative;
  height: 100%;

  .scroll {
    overflow-x: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
