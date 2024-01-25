// 获取缓存
class Storage {
  constructor() {
    this.isCho = chrome.storage; // 如果存在,则说明运行环境是浏览器插件
  }
  // 设置
  set (val) {
    if (this.isCho) {
      chrome.storage.local.set(
        {
          _imp: val,
        },
        () => {
          console.log("success");
        }
      );
    } else {
      localStorage._imp = JSON.stringify(val);
    }
  }
  // 获取
  get () {
    return new Promise((res, req) => {
      if (this.isCho) {
        chrome.storage.local.get(
          {
            _imp: null,
          },
          (item) => {
            if (item._imp) {
              res(item._imp);
            } else {
              res([]);
            }
          }
        );
      } else {
        res(JSON.parse(localStorage._imp));
      }
    });
  }
}
const storage = new Storage();

async function getLocalStorage (day) {
  let _imp = await storage.get(),
    info,
    days = [""];


  console.log('get', _imp);
  if (!_imp) return false;
  // _imp = JSON.parse(localStorage._imp);

  _imp.forEach((item) => {
    if (item.day === day) {
      info = item.info;
    }
    days.push(item.day);
  });

  return {
    _imp,
    days,
    info,
  };
}

// 增加缓存
async function addLocalStorage (day, info) {
  let _imp = (await storage.get()) || [];
  const editIndex = _imp.findIndex((item) => item.day === day)
  if(editIndex !== -1) {
    _imp[editIndex].info = info;
  } else {
    _imp.push({
      day,
      info,
    });
  }
  storage.set(_imp);
}
// 修改缓存
async function editLocalStorage (day, info) {
  // const _imp = JSON.parse(localStorage._imp);
  const _imp = await storage.get();
  _imp.forEach((item) => {
    if (item.day === day) {
      item.info = info;
    }
  });
}
// 删除缓存
async function delLocalStorage (day) {
  // const _imp = JSON.parse(localStorage._imp);
  const _imp = await storage.get();

  for (let i = 0; i < _imp.length; i++) {
    if (_imp[i].day === day) {
      _imp.splice(i, 1);
      // localStorage._imp = JSON.stringify(_imp);
      storage.set(_imp);
      return false;
    }
  }
}

// chrome.storage.local.set(

export { getLocalStorage, addLocalStorage, editLocalStorage, delLocalStorage };
