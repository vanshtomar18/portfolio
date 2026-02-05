// 3D Animated Background Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// 3D points
const POINTS = 80;
const DEPTH = 400;
let points = [];
let mouse = { x: width/2, y: height/2 };

function randomPoint() {
  return {
    x: Math.random() * width - width/2,
    y: Math.random() * height - height/2,
    z: Math.random() * DEPTH,
    speed: 0.5 + Math.random() * 1.5
  };
}

function resetPoint(p) {
  p.x = Math.random() * width - width/2;
  p.y = Math.random() * height - height/2;
  p.z = DEPTH;
  p.speed = 0.5 + Math.random() * 1.5;
}

function initPoints() {
  points = [];
  for (let i = 0; i < POINTS; i++) {
    points.push(randomPoint());
  }
}

function project3D(x, y, z) {
  // Perspective projection
  let scale = 600 / (z + 200);
  return {
    x: width/2 + (x + (mouse.x - width/2) * 0.1) * scale,
    y: height/2 + (y + (mouse.y - height/2) * 0.1) * scale
  };
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let p of points) {
    let proj = project3D(p.x, p.y, p.z);
    let size = Math.max(1, 4 - p.z / 120);
    let color = `rgba(0,238,255,${1 - p.z/DEPTH})`;
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.shadowColor = '#0ef';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function animate() {
  for (let p of points) {
    p.z -= p.speed;
    if (p.z < 1) resetPoint(p);
  }
  draw();
  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initPoints();
});

initPoints();
animate();