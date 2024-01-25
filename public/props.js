chrome.storage.local.get(
  {
    _color: null,
    _bgImg: null,
  },
  (items) => {
    // 如果设置的有背景图片，背景图片生效
    if (items._bgImg) {
      setTimeout(() => {
        document.body.style.backgroundImage = `url('${items._bgImg}')`;
        document.body.style.backgroundAttachment = "fixed";
      }, 500);

      return false;
    }
    Array.from(document.querySelectorAll("div,body,html,header,footer")).map(
      (v) => {
        v.style.backgroundColor = items._color;
      }
    );
  }
);
