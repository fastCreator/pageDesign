<template>
  <div
    id="size-control"
    v-if="dActiveElement.record && dActiveElement.uuid !== '-1'"
    :style="{
      transform: `rotate(${rotate}deg)`,
      'transform-origin':`${left+width/2}px ${top+height/2}px`
    }"
  >
    <div
      class="center"
      :style="{
        left: left+ width/2 + 'px',
        top: top+ height/2 + 'px'
      }"
    >
    </div>
    <!-- 旋转 -->
    <div
      class="rotate el-icon-refresh"
      v-if="dActiveElement.record.rotate"
      @mousedown="handlemousedown($event, 'rotate')"
      :style="{
        left: left+ width/2 + 'px',
        top: top + 'px'
      }"
    >
    </div>
    <!-- 拖动 -->
    <div
      v-for="(item,i) in controls"
      :key="i"
      class="square"
      v-show="item.dir.includes(dActiveElement.record.dir)"
      @mousedown="handlemousedown($event, item.event,i)"
      :style="{
        left: item.position.left + 'px',
        top: item.position.top + 'px',
        cursor: getlastc(i).cursor,
      }"
    >
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// 组件大小控制器
const NAME = "size-control";
export default {
  name: NAME,
  data() {
    return {
      dirs: []
    };
  },
  computed: {
    ...mapGetters(["dActiveElement", "dWidgets"]),
    rotate() {
      return parseInt(this.dActiveElement.rotate);
    },
    left() {
      return parseInt(this.dActiveElement.left);
    },
    top() {
      return parseInt(this.dActiveElement.top);
    },
    width() {
      return parseInt(this.dActiveElement.record.width);
    },
    height() {
      return parseInt(this.dActiveElement.record.height);
    },
    cursord() {
      return !(
        (this.rotate > 45 && this.rotate < 135) ||
        (this.rotate > 225 && this.rotate < 315)
      );
    },
    controls() {
      let that = this;
      return [
        {
          cursor: "n-resize",
          event: "top",
          position: {
            left: that.left + that.width / 2,
            top: that.top
          },
          dir: ["vertical", "all"]
        },
        {
          cursor: "ne-resize",
          event: "right-top",
          position: {
            left: that.left + that.width,
            top: that.top
          },
          dir: ["all"]
        },
        {
          cursor: "e-resize",
          event: "right",
          position: {
            left: that.left + that.width,
            top: that.top + that.height / 2
          },
          dir: ["all", "horizontal"]
        },
        {
          cursor: "se-resize",
          event: "right-bottom",
          position: {
            left: that.left + that.width,
            top: that.top + that.height
          },
          dir: ["all"]
        },
        {
          cursor: "s-resize",
          event: "bottom",
          position: {
            left: that.left + that.width / 2,
            top: that.top + that.height
          },
          dir: ["all", "vertical"]
        },
        {
          cursor: "sw-resize",
          event: "left-bottom",
          position: {
            left: that.left,
            top: that.top + that.height
          },
          dir: ["all"]
        },
        {
          cursor: "w-resize",
          event: "left",
          position: {
            left: that.left,
            top: that.top + that.height / 2
          },
          dir: ["all", "horizontal"]
        },
        {
          cursor: "nw-resize",
          event: "left-top",
          position: {
            left: that.left,
            top: that.top
          },
          dir: ["all"]
        }
      ];
    }
  },
  watch: {},
  methods: {
    ...mapActions(["dResize", "initDResize", "dResize", "stopDResize"]),
    getlastc(i) {
      return this.controls[(i + Math.round(this.rotate / 45)) % 8];
    },
    handlemousedown(e, dirs, index) {
      e.stopPropagation();
      this.dirs = dirs.split("-");
      if(index !==undefined){
        this.index = (index + 4) % 8;
        this.box = document.querySelectorAll('#size-control .square')[this.index].getClientRects()[0]
      }
      this.initDResize({
        startX: e.pageX,
        startY: e.pageY,
        originX: this.dActiveElement.left,
        originY: this.dActiveElement.top,
        width: this.width,
        height: this.height,
        rotate: this.rotate
      });

      document.addEventListener("mousemove", this.handlemousemove, true);
      document.addEventListener("mouseup", this.handlemouseup, true);
    },

    handlemousemove(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dResize({
        x: e.pageX,
        y: e.pageY,
        dirs: this.dirs,
        index: this.index,
        obox:this.box
      });
    },

    handlemouseup() {
      document.removeEventListener("mousemove", this.handlemousemove, true);
      document.removeEventListener("mouseup", this.handlemouseup, true);
      this.stopDResize();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl';

#size-control {
  position: absolute;

  .center {
    position: absolute;
  }

  .rotate {
    position: absolute;
    z-index: 1100;
    font-size: 40px;
    color: #44444A;
    margin-left: -20px;
    margin-top: -48px;
    cursor: move;
  }

  .square {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: 999;
    background-color: $color-white;
    outline: 1px solid $color-main;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
