window.onload = () => {
  // https://www.w3schools.com/html/html5_canvas.asp
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const img = new Image();
  img.src = 'img/tiles/world_0101.png';
  img.onload = () => draw();

  // ????? https://www.youtube.com/watch?v=jabYMh9sI8Q&t=132s

  // https://stackoverflow.com/questions/38142308/canvas-drag-on-mouse-movement
  let drag = false;
  let dragStart;
  let dragEnd;

  draw();

  canvas.addEventListener('mousedown', (event) => {
    drag = true;
    dragStart = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    }
  });

  canvas.addEventListener('mousemove', (event) => {
    if (drag) {
      dragEnd = {
        x: event.pageX - canvas.offsetLeft,
        y: event.pageY - canvas.offsetTop
      };
      ctx.translate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      dragStart = dragEnd;
      draw();
    }
  });

  canvas.addEventListener('mouseup', (event) => {
    drag = false;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }
};