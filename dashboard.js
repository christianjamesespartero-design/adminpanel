if (sessionStorage.getItem("isAdmin") !== "true") {
  window.location.href = "admin.html";
}

const table = document.getElementById("userTable");
const users = JSON.parse(localStorage.getItem("users")) || [];

users.forEach(user => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.username}</td>
    <td>${user.status || "wala pa di pa na gana"}</td>
    <td>${user.lastActive || "sa susunod na aayusin"}</td>
  `;
  table.appendChild(row);
});

function logout() {
  sessionStorage.removeItem("isAdmin");
  window.location.href = "admin.html";
}
