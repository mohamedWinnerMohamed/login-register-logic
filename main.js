const path = window.location.pathname;

if (path.endsWith("/")) {
  setLandingPage();
} else if (path.endsWith("/logIn.html")) {
  setupLoginPage();
} else if (path.endsWith("/register.html")) {
  setupRegisterPage();
} else if (path.endsWith("/home.html")) {
  setupHomePage();
}

function setLandingPage() {
  const logInBtn = document.querySelector(".logIn-btn");
  const signUpBtn = document.querySelector(".signUp-btn");

  logInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "logIn.html";
  });
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "register.html";
  });
}

function setupHomePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const profileName = document.querySelector(".name");
  const paragraph = document.querySelector(".user-name");
  const image = document.querySelector("#image");
  const profileALt = document.querySelector(".profile");
  const detailsList = document.querySelector(".details");
  const signOutBtn = document.querySelector(".signOut-btn");

  paragraph.innerText = ` ${userInfo.userName.split(" ")[0]} !`;
  profileName.innerText = `${userInfo.userName}`;
  // .........................................
  function createSquare() {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.left = Math.random() * 100 + "vw";
    square.style.backgroundColor = getRandomColor();

    document.body.appendChild(square);

    setTimeout(() => {
      square.remove();
    }, 1000);
  }

  function getRandomColor() {
    const colors = [
      "#e74c3c",
      "#2ecc71",
      "#3498db",
      "#f1c40f",
      "#9b59b6",
      "#1abc9c",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const interval = setInterval(createSquare, 50);

  setTimeout(() => {
    clearInterval(interval);
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
  }, 1000);
  window.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".main");

    setTimeout(() => {
      main.classList.add("show");
    }, 100);
  });

  window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    setTimeout(() => {
      header.classList.add("animate");
    }, 100);
  });
  // .........................................
  image.addEventListener("mouseover", () => {
    profileALt.classList.remove("hide");
  });
  image.addEventListener("mouseleave", () => {
    profileALt.classList.add("hide");
  });
  image.addEventListener("click", (e) => {
    e.stopPropagation();
    image.classList.add("border");
    detailsList.classList.remove("hide");
  });
  document.addEventListener("click", () => {
    image.style.border = "";
    image.classList.remove("border");
    detailsList.classList.add("hide");
  });
  signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("userInfo");
    window.location.href = "index.html";
  });
}

function setupLoginPage() {
  const form = document.querySelector("#form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const logInBtn = document.querySelector(".logIn-Btn");
  const signUpBtn = document.querySelector(".signUp-Btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popup = document.getElementById("successPopup");
  const popupMessage = document.getElementById("popupMessage");
  let userInfo;
  let users = [];
  // ........
  window.addEventListener("DOMContentLoaded", () => {
    const welcome = document.querySelector(".welcome-text");
    setTimeout(() => {
      welcome.classList.add("show");
    }, 100);
  });
  // ........
  logInBtn.style.backgroundColor = "rgba(37, 100, 235, 0.567)";
  signUpBtn.style.backgroundColor = "transparent";

  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
  }

  popupOverlay.classList.add("show");
  setTimeout(() => {
    popupOverlay.classList.remove("show");
  }, 1000);

  function showPopup(message) {
    popupMessage.textContent = message;
    popupOverlay.classList.add("show");
    popup.classList.remove("hide");
    popup.classList.add("show");
    setTimeout(() => {
      hidePopup();
    }, 1650);
  }
  function hidePopup() {
    popup.classList.remove("show");
    popup.classList.add("hide");
    popupOverlay.classList.remove("show");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    users.forEach((element) => {
      if (
        element.email === emailInput.value.trim() &&
        element.password === passwordInput.value.trim()
      ) {
        userInfo = {
          userName: element.name,
          userEmail: element.email,
          userPassword: element.password,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.location.href = "home.html";
      } else {
        showPopup(`User not found! ❌`);
      }
    });
    form.reset();
  });
}

function setupRegisterPage() {
  const nameInput = document.querySelector("#userName");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const form = document.querySelector("#form");
  const logInBtn = document.querySelector(".logIn-Btn");
  const signUpBtn = document.querySelector(".signUp-Btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popup = document.getElementById("successPopup");
  const popupMessage = document.getElementById("popupMessage");
  let users = [];
  // .......
  window.addEventListener("DOMContentLoaded", () => {
    const welcome = document.querySelector(".welcome-text");
    setTimeout(() => {
      welcome.classList.add("show");
    }, 100);
  });
  // .......
  logInBtn.style.backgroundColor = "transparent";
  signUpBtn.style.backgroundColor = "rgba(37, 100, 235, 0.567)";
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  popupOverlay.classList.add("show");
  setTimeout(() => {
    popupOverlay.classList.remove("show");
  }, 1000);

  function showPopup(message) {
    popupMessage.textContent = message;
    popupOverlay.classList.add("show");
    popup.classList.remove("hide");
    popup.classList.add("show");
    setTimeout(() => {
      hidePopup();
    }, 1650);
    setTimeout(() => {
      window.location.href = "logIn.html";
    }, 1650);
  }

  function hidePopup() {
    popup.classList.remove("show");
    popup.classList.add("hide");
    popupOverlay.classList.remove("show");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };
    if (newUser.name || newUser.email || newUser.password) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    form.reset();
    showPopup(`User registered successfully! 🎉`);
  });
}
