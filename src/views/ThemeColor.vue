<template>
  <div class="themecolor">
    <!-- 吸色器组件 -->
    <ColorPicker v-model="color"></ColorPicker>
    <div class="todos">
      <div class="viewColor" :style="'background-color:' + color"></div>
      <div class="btnWarp">
        <div class="primary btn" @click="insureHandle">确定</div>
        <div class="warning return btn" @click="router.go(-1)">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import ColorPicker from "../components/ColorPicker.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    ColorPicker,
  },
  setup() {
    const router = useRouter();
    const color = ref("#000");
    const insureHandle = () => {
      const script = `Array.from(document.querySelectorAll("body,html,header,footer")).map(
          (v) => {
            v.style.backgroundColor = "${color.value}";
          }
        );`;
      chrome.tabs.executeScript({
        code: script,
      });

      chrome.storage.local.set(
        {
          _color: color.value,
        },
        () => {
          console.log("设置成功");
        }
      );
    };
    onMounted(() => {
      // 读取缓存，如果有，则使用缓存
      chrome.storage.sync.get(
        {
          _color: null,
        },
        (items) => {
          color.value = items._color;
          insureHandle();
        }
      );
    });
    return {
      color,
      router,
      insureHandle,
    };
  },
};
</script>
<style lang="scss" scoped>
.themecolor {
  display: block;
  .todos {
    padding-left: 60px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .viewColor {
      width: 120px;
      height: 38px;
      border-radius: 5px;
    }
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
      }
    }
  }
}
</style>
