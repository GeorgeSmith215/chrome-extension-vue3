// 获取缓存
function getLocalStorage(day) {
  let _imp,
    info,
    days = [""];
  if (!localStorage._imp) return false;
  _imp = JSON.parse(localStorage._imp);
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
function addLocalStorage(day, info) {
  let _imp = [];
  if (localStorage._imp) {
    _imp = JSON.parse(localStorage._imp);
  }
  _imp.push({
    day,
    info,
  });

  localStorage._imp = JSON.stringify(_imp);
}
// 修改缓存
function editLocalStorage(day, info) {
  const _imp = JSON.parse(localStorage._imp);
  _imp.forEach((item) => {
    if (item.day === day) {
      item.info = info;
    }
  });
}
// 删除缓存
function delLocalStorage(day) {
  const _imp = JSON.parse(localStorage._imp);

  for (let i = 0; i < _imp.length; i++) {
    if (_imp[i].day === day) {
      _imp.splice(i, 1);
      console.log(_imp);
      localStorage._imp = JSON.stringify(_imp);
      return false;
    }
  }
}
export { getLocalStorage, addLocalStorage, editLocalStorage, delLocalStorage };
