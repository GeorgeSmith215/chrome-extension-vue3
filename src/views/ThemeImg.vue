<template>
  <div class="themimg">
    <div class="uploadImg">
      <UploadImg @success="uploadSuccess" :quality="1"></UploadImg>
      <img :src="imgUrl" alt="" />
    </div>
    <div class="todos">
      <div class="btnWarp">
        <div class="primary btn" @click="insureHandle">确定</div>
        <div class="warning return btn" @click="router.go(-1)">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import UploadImg from "../components/UploadImg.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    UploadImg,
  },
  setup() {
    const router = useRouter();
    const imgUrl = ref("");
    const uploadSuccess = (url) => {
      imgUrl.value = url;
    };
    const insureHandle = () => {
      const script = `
        document.body.style.backgroundImage = url('${imgUrl.value}');
        document.body.style.backgroundAttachment = "fixed";
        `;
      chrome.tabs.executeScript({
        code: script,
      });

      chrome.storage.local.set(
        {
          _bgImg: imgUrl.value,
        },
        () => {
          console.log("设置成功");
        }
      );
    };
    return {
      uploadSuccess,
      imgUrl,
      router,
      insureHandle,
    };
  },
};
</script>

<style lang="scss" scoped>
.themimg {
  display: block;
  .uploadImg {
    width: 200px;
    height: 200px;
  }
  .todos {
    padding-left: 60px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btnWarp {
      display: flex;
      margin-top: 50px;
      .btn {
        width: 80px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
      }
      .primary {
        background: #1989fa;
        margin-right: 5px;
      }

      .warning {
        background-color: goldenrod;
        margin-right: 15px;
      }
    }
  }
}
</style>
