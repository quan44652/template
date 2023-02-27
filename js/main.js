const form = document.querySelector("#form");
const popup = document.querySelector(".popup");
const btn_close = document.querySelector(".btn_close");
const icon_close = document.querySelector(".icon-close");
const croll_top = document.querySelector("#croll-top");
const app = document.getElementById("app");

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

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 1000) {
    croll_top.style.display = "block";
  } else {
    croll_top.style.display = "none";
  }
});

croll_top.addEventListener("click", () => {
  app.scrollIntoView({ behavior: "smooth", block: "start" });
});
