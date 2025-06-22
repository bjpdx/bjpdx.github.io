// tail.js
const tailLength = 20; // 拖尾点数量
const tail = [];
const colors = [
  "rgba(80,200,255,0.8)",
  "rgba(120,220,255,0.6)",
  "rgba(180,240,255,0.4)"
];

document.addEventListener("mousemove", (e) => {
  tail.push({ x: e.clientX, y: e.clientY });
  if (tail.length > tailLength) tail.shift();
});

function drawTail() {
  let canvas = document.getElementById("tail-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "tail-canvas";
    canvas.style.position = "fixed";
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
  }
  // 自适应窗口变化
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < tail.length; i++) {
    const p = tail[i];
    const size = 18 - (i * 0.8); // 尾巴由大到小
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
  }
  requestAnimationFrame(drawTail);
}

drawTail();
