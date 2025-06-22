// genshin-tail.js
const tailLength = 24; // 拖尾点数量
const tail = [];
const colorA = "rgba(80,200,255,1)";
const colorB = "rgba(30,144,255,0.0)";

document.addEventListener("mousemove", (e) => {
    tail.push({ x: e.clientX, y: e.clientY });
    if (tail.length > tailLength) tail.shift();
});

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function drawTail() {
    let canvas = document.getElementById("genshin-tail-canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "genshin-tail-canvas";
        canvas.style.position = "fixed";
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.style.pointerEvents = "none";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
    }
    // 自适应窗口
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (tail.length > 2) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = tail.length - 1; i > 0; i--) {
            const p0 = tail[i];
            const p1 = tail[i - 1];
            const t = i / tail.length;
            const width = lerp(18, 2, t);
            // 渐变色
            const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
            grad.addColorStop(0, colorA);
            grad.addColorStop(1, colorB);

            ctx.strokeStyle = grad;
            ctx.shadowColor = "rgba(80,200,255,0.8)";
            ctx.shadowBlur = 16 * (1 - t);

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineWidth = width;
            ctx.globalAlpha = 0.5 + 0.5 * (1 - t); // 前端更亮
            ctx.stroke();
        }
        ctx.restore();
    }

    requestAnimationFrame(drawTail);
}
drawTail();
