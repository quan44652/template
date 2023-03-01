const submit = document.querySelector(".submit");
const loading = document.querySelector(".loading");
const popup = document.querySelector(".popup");
const btn_close = document.querySelector(".btn_close");
const icon_close = document.querySelector(".icon-close");
const croll_top = document.querySelector("#croll-top");
const app = document.getElementById("app");

// Xử lí close popup
const handlerPopup = (callback) => {
  callback.addEventListener("click", () => {
    setTimeout(() => {
      popup.style.display = "none";
    }, 500);
  });
};

handlerPopup(btn_close);
handlerPopup(icon_close);

// xử lí crollTop

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

const Validator = (options) => {
  // Hàm valide
  const validate = (inputElement, rule) => {
    const errorMessage = rule.test(inputElement.value);
    const errorElement =
      inputElement.parentElement.querySelector(".form-message");
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }

    return !errorMessage;
  };

  // Lấy element form cần validate
  const formElement = document.querySelector(options.form);
  if (formElement) {
    // submit form
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let isFormValid = true;

      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);
        const valid = validate(inputElement, rule);
        if (!valid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        submit.style.display = "none";
        loading.style.display = "block";
        loading.style.transform = "360deg";
        setTimeout(() => {
          submit.style.display = "block";
          loading.style.display = "none";
          popup.style.display = "block";
        }, 2000);
      }
    };

    options.rules.forEach((rule) => {
      const inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        // Xử lí trường hợp blur ra ngoài
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // Xử lí khi người dùng nhập
        inputElement.oninput = () => {
          const errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
};

// Định nghĩa Rules

Validator.isRequired = (selector) => {
  return {
    selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};

Validator.isEmail = (selector) => {
  return {
    selector,
    test: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Trường này phải là email";
    },
  };
};

Validator.isMobile = (selector) => {
  return {
    selector,
    test: function (value) {
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      return regex.test(value) ? undefined : "Trường này phải là số điện thoại";
    },
  };
};
