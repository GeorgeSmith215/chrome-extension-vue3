<template>
  <div class="themeImg">
    <ImgCutter @cutDown="cutDown" @clearImg="clearImg" @routerBack="router.go(-1)"></ImgCutter>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import ImgCutter from "../components/ImgCutter.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    ImgCutter,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      count: 0,
    });
    const getCurrentTabUrl = (callback) => {
      let queryInfo = {
        active: true,
        currentWindow: true,
      };

      chrome.tabs.query(queryInfo, (tab) => {
        let url = tab.url;
        callback(url);
      });
    };
    const clearImg = () => {
      const script = `
        document.body.style.backgroundImage = '';
        document.body.style.backgroundAttachment = '';
        `;
        chrome.tabs.executeScript({
          code: script,
        });
        chrome.storage.local.set(
          {
            _bgImg: '',
          },
          () => {
            chrome.notifications.create(null, {
              type: 'basic',
              iconUrl: '../logo.png',
              title: '清空背景图片成功！',
              message: `不需要刷新浏览器就可查看效果哦！`,
            });
          }
        );
    }
    const cutDown = (item) => {
      /*-------------- */
      getCurrentTabUrl((url) => {
        const script = `
        document.body.style.backgroundImage = url('${item.dataURL}');
        document.body.style.backgroundAttachment = "fixed";
        `;
        chrome.tabs.executeScript({
          code: script,
        });
        chrome.storage.local.set(
          {
            _bgImg: item.dataURL,
          },
          () => {
            chrome.notifications.create(null, {
              type: 'basic',
              iconUrl: '../logo.png',
              title: '设置背景图片成功！',
              message: `刷新浏览器后可查看效果哦！`,
            });
          }
        );
      });
    };
    return {
      ...toRefs(state),
      clearImg,
      cutDown,
      router,
    };
  },
};
</script>

<style lang="scss" scoped></style>
