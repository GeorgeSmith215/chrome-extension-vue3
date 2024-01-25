chrome.storage.local.get(
  {
    _color: null,
  },
  (items) => {
    Array.from(document.querySelectorAll("div,body,html,header,footer")).map(
      (v) => {
        v.style.backgroundColor = items._color;
      }
    );
  }
);
