/*
 * Tile map example by Julian Kreller - Version 1
 * - References in comments
 * - x/y-Axis for pixels
 * - u/v-Axis for tile count
 */

// Options
let tileCountU = 22;
let tileCountV = 11;
let tileSize = 372;
let currentPoint = {x: 0, y: 0};

window.onload = () => {
	// https://www.w3schools.com/html/html5_canvas.asp
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // https://stackoverflow.com/questions/38142308/canvas-drag-on-mouse-movement
  let drag = false;
  const tiles = [];
  const tileRateX = canvas.width / tileSize;
  const tileRateY = canvas.height / tileSize;

  // Initialize tiles and draw
  setTiles(true);
  draw();

  canvas.addEventListener('mousedown', () => {
    drag = true;
  });

  canvas.addEventListener('mousemove', event => {
    if (drag) {
      setTiles();
      ctx.translate(event.movementX, event.movementY);
      currentPoint.x -= event.movementX;
      currentPoint.y -= event.movementY;
      draw();
    }
  });

  canvas.addEventListener('mouseup', () => {
    drag = false;
  });

  function draw() {
    ctx.clearRect(-canvas.width * 5, -canvas.width * 5, canvas.width * 20, canvas.height * 20);
    tiles.forEach((line, vIndex) => {
    	line.forEach((tile, uIndex) => {
    		if (tile) {
    			ctx.drawImage(tile, (uIndex - 1) * tileSize, (vIndex - 1) * tileSize);
    		}
    	});
    });
  }

  function setTiles(isInitial = false) {
    for (let v = 1; v <= tileCountV; v++) {
      if (isInitial) {
        tiles[v] = [];
      }
      for (let u = 1; u <= tileCountU; u++) {
        const padding = tileSize;
        const x = u * tileSize;
        const y = v * tileSize;

        const minX = currentPoint.x - padding;
        const maxX = currentPoint.x + tileRateX * tileSize + padding;
        const minY = currentPoint.y - padding;
        const maxY = currentPoint.y + tileRateY * tileSize + padding;

        if (x > minX && x < maxX && y > minY && y < maxY && (tiles[v][u] === null || isInitial)) {
          setTile(u, v);
        } else if (isInitial) {
          tiles[v][u] = null;
        }
      }
    }
  }

  function setTile(u, v) {
    let uString = u < 10 ? 0 + u.toString() : u.toString();
    let vString = v < 10 ? 0 + v.toString() : v.toString();

    // https://stackoverflow.com/questions/36649298/how-to-read-a-image-file-using-ajax-and-render-to-canvas?lq=1
    const img = new Image();
    img.src = `load-image.php?filename=world_${uString}${vString}.png`;
    img.onload = () => {
      draw()
    };
    tiles[v][u] = img;
    //const xhr = new XMLHttpRequest();
    //xhr.open('GET', `load-image.php?filename=world_${uString}${vString}.png`, true);
    //xhr.responseType = 'blob';
    //xhr.onload = function() {
    //  const url = URL.createObjectURL(this.response);
    //  const img = new Image();
    //  img.src = url;
    //  img.onload = () => {
    //    URL.revokeObjectURL(this.src);
    //    draw()
    //  };
    //  tiles[v][u] = img;
    //};
    //xhr.send();
  }
};