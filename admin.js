const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


function adminLogin() {
  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();
  const panel = document.getElementById("adminPanel");
  const msg = document.getElementById("msg");
  msg.innerText = "";

  if (!user || !pass) { msg.innerText = "Enter username and password ❌"; return; }

  if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
   
    sessionStorage.setItem("isAdmin", "true");
    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "Invalid credentials ❌";
  }
}


function createUser() {
  const username = document.getElementById("newUser").value.trim();
  const password = document.getElementById("newPass").value.trim();
  const msg = document.getElementById("msg");
  msg.innerText = "";

  if (!username || !password) { msg.innerText = "Fill all fields ❌"; return; }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.username === username)) { msg.innerText = "User exists ❌"; return; }

  users.push({ username, password, status: "Offline", lastActive: "Never" });
  localStorage.setItem("users", JSON.stringify(users));
  msg.innerText = "User created successfully ✅";
  document.getElementById("newUser").value = "";
  document.getElementById("newPass").value = "";
}


const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const closeForm = document.getElementById("closeForm");
const overlay = document.getElementById("overlay");

loginBtn.onclick = () => { loginForm.classList.add("active-panel"); overlay.style.display = "block"; };
closeForm.onclick = closeModal;
overlay.onclick = closeModal;

function closeModal() {
  loginForm.classList.remove("active-panel");
  overlay.style.display = "none";
  document.getElementById("adminPanel").classList.remove("active-panel");
  document.getElementById("msg").innerText = "";
}


const dots = document.querySelectorAll(".scroll-indicator span");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = 0;
  sections.forEach((sec, i) => {
    if (pageYOffset >= sec.offsetTop - window.innerHeight / 2) current = i;
  });
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[current]) dots[current].classList.add("active");
});

dots.forEach((dot,i)=>{ dot.onclick = ()=>sections[i].scrollIntoView({behavior:"smooth"}); });
