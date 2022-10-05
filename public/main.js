// const PATH = "http://localhost:8080" || "0"
// const PATH = "https://kmylo-websockets-carlosazaustre-55j6x6q5qwhvgq5-8080.githubpreview.dev/"
const PATH = ""

var socket = io.connect(PATH, { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  socket.emit("new-message", message);
  return false;
}