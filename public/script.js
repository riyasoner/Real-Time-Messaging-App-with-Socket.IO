const socket = io();

const loginOverlay = document.getElementById("loginOverlay");
const chatContainer = document.getElementById("chatContainer");
const usernameInput = document.getElementById("usernameInput");
const joinBtn = document.getElementById("joinBtn");
const errorMsg = document.getElementById("errorMsg");

const messagesDiv = document.getElementById("messages");
const userList = document.getElementById("userList");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");

let username = null;

joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) return;
  socket.emit("join", name, (error) => {
    if (error) {
      errorMsg.textContent = error;
    } else {
      username = name;
      loginOverlay.style.display = "none";
      chatContainer.style.display = "flex";
    }
  });
});

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.innerHTML = `<b>${data.user}</b> [${data.time || ""}]: ${data.text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("userList", (users) => {
  userList.innerHTML = users.map((u) => `<li>${u}</li>`).join("");
});

sendBtn.addEventListener("click", () => sendMessage());
msgInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = msgInput.value.trim();
  if (!msg) return;
  socket.emit("chatMessage", msg);
  msgInput.value = "";
}
