/**
 * scripts.js
 * Form Validasyon Motoru
 * Senior Refactoring by Özay Can KIRLI Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("validationForm");
  const submitButton = document.getElementById("submitBtn");

  // Validasyon Kuralları (Data-driven approach)
  const VALIDATION_RULES = {
    firstName: {
      regex: /^[A-Za-zğüşıöçĞÜŞİÖÇ]{2,30}$/,
      message: "Ad 2-30 karakter arası harf olmalıdır.",
    },
    lastName: {
      regex: /^[A-Za-zğüşıöçĞÜŞİÖÇ]{2,30}$/,
      message: "Soyad 2-30 karakter arası harf olmalıdır.",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Geçerli bir e-posta adresi giriniz.",
    },
    password: {
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*,.])[A-Za-z\d!@#$%^&*]{8,}$/,
      message:
        "Şifre en az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermelidir.",
    },
    telephone: {
      regex: /^(05|5)\d{9}$/,
      message: "Geçerli bir telefon numarası giriniz (5xx xxx xxxx).",
    },
    bio: {
      regex: /^.{10,250}$/,
      message: "Biyografi 10-250 karakter arasında olmalıdır.",
    },
  };

  //Error Handling
  const getErrorElement = (input) => {
    let errorEl = input.parentElement.querySelector(".error-message");
    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.className = "error-message";
      errorEl.setAttribute("aria-live", "polite"); // Erişilebilirlik dokunuşu
      input.parentElement.appendChild(errorEl);
    }
    return errorEl;
  };

  //Doğrulama
  const validateField = (input) => {
    const rule = VALIDATION_RULES[input.id];
    if (!rule) return true;

    const value = input.value.trim();
    const isValid = rule.regex.test(value);
    const errorEl = getErrorElement(input);

    if (!isValid && value !== "") {
      input.classList.add("invalid");
      input.classList.remove("valid");
      errorEl.textContent = rule.message;
      return false;
    } else if (isValid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorEl.textContent = "";
      return true;
    } else {
      // Boş bırakıldığında veya henüz yazılmaya başlandığında nötr durum
      input.classList.remove("invalid", "valid");
      errorEl.textContent = "";
      return false;
    }
  };

  //Tüm formun geçerlilik durumunu kontrol eder

  const checkFormValidity = () => {
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const isFormValid = inputs.every((input) => {
      const rule = VALIDATION_RULES[input.id];
      return rule ? rule.regex.test(input.value.trim()) : true;
    });

    if (isFormValid) {
      submitButton.classList.add("is-valid");
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove("is-valid");
      submitButton.disabled = true;
    }
    return isFormValid;
  };

  Object.keys(VALIDATION_RULES).forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      // "input" anında hem o alanı hem de buton durumunu güncelle
      input.addEventListener("input", () => {
        validateField(input);
        checkFormValidity();
      });

      // "blur" (odaktan çıkma) anında kullanıcıya hatasını hatırlat
      input.addEventListener("blur", () => validateField(input));
    }
  });

  // Form Gönderimi
  form.addEventListener("submit", (e) => {
    if (!checkFormValidity()) {
      e.preventDefault();
      alert("Lütfen formu eksiksiz ve doğru doldurunuz.");
      form.querySelector(".invalid")?.focus();
    } else {
      console.log("Form başarıyla gönderildi!");
      // Backend işlemleri burada başlar
    }
  });
});
