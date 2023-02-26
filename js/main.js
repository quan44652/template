const form = document.querySelector("#form");
const popup = document.querySelector(".popup");
const btn_close = document.querySelector(".btn_close");
const icon_close = document.querySelector(".icon-close");

const handlerPopup = (callback) => {
  callback.addEventListener("click", () => {
    setTimeout(() => {
      popup.style.display = "none";
    }, 500);
  });
};

handlerPopup(btn_close);
handlerPopup(icon_close);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setTimeout(() => {
    popup.style.display = "block";
  }, 2000);
});
