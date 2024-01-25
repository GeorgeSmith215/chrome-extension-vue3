<template>
  <div class="upload">
    <input
      id="imgInput"
      class="uploadInput"
      type="file"
      accept="image/*"
      multiple="multiple"
      @change="changeImg($event)"
    />
    <div class="uploadBtn" @click="clickUploadImg">上传图片</div>
  </div>
</template>

<script>
export default {
  props: {
    quality: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const useImgToBase64 = (image) => {
      let w = image.width,
        h = image.height,
        scale = w / h;
      w = 200;
      h = w / scale;
      // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
      const quality = props.quality;
      //生成canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // 创建属性节点
      const anw = document.createAttribute("width");
      anw.nodeValue = w;
      const anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(image, 0, 0, w, h);
      const ext = image.src
        .substring(image.src.lastIndexOf(".") + 1)
        .toLowerCase(); //图片格式
      console.log(quality);
      const base64 = canvas.toDataURL("image/" + ext, quality);
      return base64;
    };

    const changeImg = (e) => {
      const files = e.target.files.item(0);
      const image = new Image();
      const imgType = ["image/png", "image/jpeg", "image/gif"];
      if (!imgType.includes(files.type)) return false;
      image.src = window.URL.createObjectURL(files);
      image.onload = () => {
        const b64 = useImgToBase64(image);
        emit("success", b64);
      };
    };

    const clickUploadImg = () => {
      const imgInput = document.querySelector('#imgInput')
      imgInput.click()
    }

    return {
      changeImg,
      clickUploadImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload {
  position: relative;
  height: 36px;
  padding: 10px;
  .uploadInput {
    position: absolute;
    z-index: 2;
    width: 100px;
    height: 36px;
    opacity: 0;
  }
  .uploadBtn {
    position: absolute;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    top: 0;
    left: 0;
    width: 100px;
    height: 36px;
    background: #1989fa;
    cursor: pointer;
  }
}
</style>
