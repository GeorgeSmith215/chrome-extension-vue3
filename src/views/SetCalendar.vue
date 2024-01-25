<template>
  <div class="setCalendar">
    <Calendar @choseDay="choose" :markDate="impData"></Calendar>
    <div class="todos">
      <div class="txtWrap">
        <textarea
          class="txt"
          :placeholder="'记录' + oneTerm.day + '当天重要事项'"
          cols="30"
          v-model="oneTerm.info"
          rows="10"
        ></textarea>
      </div>
      <div class="btnWarp">
        <div class="primary btn" @click="priHandle" v-show="oneTerm.day">确定</div>
        <div class="return btn" @click="router.go(-1)">返回</div>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "../components/vue-calendar-component/calendar.vue";
import calendarUtil from "../components/vue-calendar-component/calendar"

import { nextTick, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  getLocalStorage,
  addLocalStorage,
  delLocalStorage,
} from "../units/localStorage.js";
export default {
  components: {
    Calendar,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      impData: [""],
      oneTerm: {
        day: "",
        info: "",
      },
    });
    const choose = async (val) => {
      state.oneTerm.day = val;

      console.log(val);
      const { info } = await getLocalStorage(val);

      state.oneTerm.info = info;
    };
    // 点击确定
    const priHandle = async () => {
      if (state.oneTerm.info === "") {
        // 删除
        delLocalStorage(state.oneTerm.day);
      } else {
        addLocalStorage(state.oneTerm.day, state.oneTerm.info);
      }
      // 确认保存成功
      setTimeout(async () => {
        const { days } = await getLocalStorage();
        state.impData = days;
        if(state.oneTerm.info) {
            chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: '../logo.png',
            title: '设置成功！',
            message: `${state.oneTerm.day}当天会自动提示您哦`,
          });
        }
      }, 500);
    };
    onMounted(async () => {
      const { days } = await getLocalStorage();
      state.impData = days;
      nextTick(() => {
        choose(calendarUtil["dateFormat"](new Date()))
      })
    });

    return {
      ...toRefs(state),
      choose,
      priHandle,
      router,
    };
  },
};
</script>

<style scoped lang="scss">
.setCalendar {
  display: block;
  width: 300px;
  .todos {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-items: center;
    margin-top: 10px;
    .txtWrap {
      padding: 0 10px;
      .txt {
        padding: 5px;
      }
    }

    .btnWarp {
      display: flex;
      margin-top: 10px;
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

      .return {
        background-color: goldenrod;
      }
    }
  }
}
</style>
