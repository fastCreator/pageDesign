<template>
  <div id="page-preview"
    ref="page-preview">
    <div
      class="out-page">
      <div
        class="design-canvas"
        :data-type="dPage.type"
        :data-uuid="dPage.uuid"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          zoom: 280/dPage.width,
          backgroundColor: dPage.backgroundColor,
          backgroundImage: 'url(\'' + (dPage.backgroundImage ? dPage.backgroundImage : '') + '\')',
          opacity: dPage.opacity + (dZoom < 100 ? dPage.tag : 0)
        }">
        <grid-size />
        <component
          :is="layer.type"
          class="layer"
          :data-title="layer.type"
          v-for="layer in getlayers()"
          :key="layer.uuid"
          :params="layer"
          :parent="dPage"
          :data-type="layer.type"
          :data-uuid="layer.uuid">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// 页面设计组件
const NAME = 'page-preview'

import { move } from 'MIXINS/move'

export default {
  name: NAME,
  props: ['dWidgets'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'dPage',
      'dZoom',
      'dScreen',
      'dActiveElement',
      'dHoverUuid',
      'dSelectWidgets',
      'dAltDown'
    ])
  },
  mixins: [move],
  mounted () {
    this.getScreen()
  },
  beforeDestroy () {
  },
  created() {
    console.log(this.dWidgets)
  },
  methods: {
    ...mapActions([
      'updateScreen',
      'selectWidget',
      'deleteWidget'
    ]),
    getScreen () {
      let screen = this.$refs['page-preview']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
    },
    getlayers () {
      return this.dWidgets.filter(
        item => item.parent === this.dPage.uuid
      )
    },
    getChilds (uuid) {
      return this.dWidgets.filter(
        item => item.parent === uuid
      )
    },
    getIsActive (uuid) {
      if (this.dSelectWidgets.length > 0) {
        let widget = this.dSelectWidgets.find(item => item.uuid === uuid)
        if (widget) {
          return true
        }
        return false
      } else {
        return uuid === this.dActiveElement.uuid
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#page-preview
  position: relative
  overflow: auto
  .out-page
    pointer-events: none;
    padding-left:10px;
    .design-canvas
      position: relative
      margin: 10px auto
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
      overflow hidden
</style>


