<template>
  <div class="control">
    <div class="line">
      <span class="label">Main picture:</span>
      <el-select
        v-model="formData.gameImg"
        :disabled="games.isStart"
        @change="changeGameImg"
      >
        <el-option
          v-for="item in formInline.imgList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="line">
      <span class="label">Grade:</span>
      <el-select v-model="formData.level" :disabled="games.isStart">
        <el-option
          v-for="item in formInline.levelList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="line" v-if="games.isStart">Step Count:{{ games.step }}</div>
    <div class="line">
      <el-button type="primary" @click="changeGame">{{
        games.isStart ? "End Game" : "Start Game"
      }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from "vue"
const props = defineProps<{ games: any }>()

// Start the game and start again
const changeGame = () => {
  props.games.init(formData.value)
}
// Switch main image
const changeGameImg = (img: string) => {
  props.games.setImg(img)
}

const data = reactive({
  formData: {
    gameImg: "zdg",
    level: 3,
  },
  formInline: {
    imgList: [
      { label: "Makup", value: "mh" },
      { label: "Coffe", value: "zdg" },
      { label: "Women", value: "woman" },
      { label: "Man", value: "man" },
      { label: "Office", value: "dp" },
    ],
    levelList: [
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
    ],
  },
})
const { formData, formInline } = toRefs(data)
</script>
<style lang="scss" scoped>
.line {
  display: flex;
  align-items: center;
  justify-content: center;
  & + .line {
    margin-top: 20px;
  }
  .el-select {
    flex: 1;
  }
}
</style>
