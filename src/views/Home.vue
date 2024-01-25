<template>
  <div class="main">
    <div class="warp">
      <div class="changeColor">
        <img
          src="../assets/color.png"
          alt=""
          @click="routerChange('/themecolor')"
        />
        <img src="../assets/bg.png" @click="routerChange('/themeimg')" alt="" />
      </div>
      <div class="calendar">
        <img
          src="../assets/timer.png"
          @click="routerChange('/setcalendar')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const routerChange = (url) => {
      router.push(url);
    };
    return {
      routerChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 520px;
  height: 300px;
  background-image: url("../assets/bg.gif");
  background-size: 100% 100%;
  .warp {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 48px;
    left: -16px;
    img {
      cursor: pointer;
    }
    .changeColor {
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      margin-top: 30px;
    }
  }
}
</style>
