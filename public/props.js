chrome.storage.local.get(
  {
    _color: null,
    _bgImg: null,
    _imp: null,
    _check: null,
  },
  (items) => {
    const _imp = items._imp;
    if (!items._check && _imp) {
      // 如果没有点击查看，则弹出提示，否则不弹出提示
      for (let i = 0; i < _imp.length; i++) {
        const item = _imp[i];
        if (item.day === getTimer()) {
          // 进行消息通知
          const cf = window.confirm(`您今天有${item.info}待办哦!`);
          if (cf) {
            chrome.storage.local.set({
              _check: true,
            });
          }
          return false;
        }
      }
    }
    // 如果设置的有背景图片，背景图片生效
    if (items._bgImg) {
      setTimeout(() => {
        document.body.style.backgroundImage = `url('${items._bgImg}')`;
        document.body.style.backgroundAttachment = "fixed";
      }, 1000);

      return false;
    }
    Array.from(document.querySelectorAll("div,body,html,header,footer")).map(
      (v) => {
        v.style.backgroundColor = items._color;
      }
    );
  }
);

function getTimer () {
  const myDate = new Date();
  const y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  const m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  const d = myDate.getDate(); //获取当前日(1-31)

  return `${y}/${m}/${d}`;
}
