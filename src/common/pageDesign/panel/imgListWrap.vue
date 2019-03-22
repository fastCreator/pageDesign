<template>
  <div id="img-list-wrap">
    <div class="style-tab">
      <span
        class="tab"
        :class="{'active-tab' : activeTab === 0}"
        @click="activeTab = 0"
      >我的</span>
      <span
        class="tab"
        :class="{'active-tab' : activeTab === 1}"
        @click="activeTab = 1"
      >推荐</span>
    </div>
    <div
      class="tab-content"
      v-if="hadShowMyImg"
      :style="getStyle(0)"
    >
      <img-water-fall
        class="img-list"
        :listData="myImgList"
        @delete-img="deleteImg"
        @select-img="selectImg"
        @add-img="getMyImgs"
      />
      <div class="upload-btn-wrap">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          accept="image/png,image/jpeg,image/pjpeg,image/pjpeg,image/bmp"
          :on-success="uploadSuccess"
        >
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-upload"
          >点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <div
      class="tab-content"
      v-if="hadShowRecommendImg"
      :style="getStyle(1)"
    >
      <img-water-fall
        class="img-list"
        :listData="recommendImgList"
        @delete-img="deleteImg"
        @select-img="selectImg"
        @add-img="getRecommendImgs"
      />
    </div>
  </div>
</template>

<script>
// 图片列表
const NAME = "img-list-wrap";

import wImage from "COMMON/pageDesign/widgets/wImage/wImage";
import api from "API";
import { mapGetters, mapActions } from "vuex";

export default {
  name: NAME,
  data() {
    return {
      pageSize: 0,
      activeTab: -1,
      myImgList: [],
      recommendImgList: [],
      hadShowMyImg: false,
      hadShowRecommendImg: false,
      pos: 0
    };
  },
  mounted() {
    this.activeTab = 0;
    this.getMyImgs();
    this.getRecommendImgs();
  },
  watch: {
    activeTab(value) {
      if (value === 0) {
        this.hadShowMyImg = true;
      } else if (value === 1) {
        this.hadShowRecommendImg = true;
      }
    }
  },
  methods: {
    ...mapActions(["addWidget"]),
    uploadSuccess(response, file, fileList) {
      response = {
        id: 6230,
        url: "http://bearcarimg.codeb",
        ratio: 2120 / 2661
      };
      this.myImgList.push(response);
      console.log(this.myImgList);
    },
    async getMyImgs(done) {
      let list = await api.getMyImgs(this.pageSize++);
      this.myImgList = this.myImgList.concat(list);
      done && done();
    },
    async getRecommendImgs(done) {
      let list = await api.getRecommendImgs(this.pageSize++);
      this.recommendImgList = list.concat(this.recommendImgList);
      done && done();
    },
    getStyle(index) {
      return {
        display: this.activeTab === index ? "" : "none"
      };
    },
    selectImg(item) {
      let setting = JSON.parse(JSON.stringify(wImage.setting));
      setting.width = item.width;
      setting.height = item.height;
      setting.imgUrl = item.url;
      this.addWidget(setting);
    },
    deleteImg(item) {
      //
    },
    uploadImg() {}
  }
};
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl';

#img-list-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .style-tab {
    width: 100%;
    display: flex;
    border-bottom: 1px solid $color-dark-gray;

    .tab {
      flex: 1;
      padding: 10px;
      color: $color-white;
      cursor: pointer;
      border-bottom: 2px solid $color-transparent;
      text-align: center;

      &.active-tab {
        color: $color-main;
        border-bottom: 2px solid $color-main;
      }
    }
  }

  .tab-content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    .img-list {
      width: 100%;
      height: calc(100% - 56px);
      flex: 1;
      .img-item {
        width: 33.33%;
        height: auto;
        padding: 6px;
        cursor: pointer;

        &:hover {
          outline: 1px solid $color-main;
        }

        .img {
          width: 100%;
        }
      }
    }

    .upload-btn-wrap {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;

      .upload-btn {
        cursor: pointer;
        width: 80%;
        padding: 10px;
        margin: 15px;
        text-align: center;
        border-radius: 5px;
        color: $color-white;
        background-color: $color-main;

        &:hover {
          background-color: lighten($color-main, 10%);
        }
      }
    }
  }
}
</style>
