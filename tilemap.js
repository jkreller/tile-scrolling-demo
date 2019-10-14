/*
 * Tile map example by Julian Kreller
 * - References in comments
 * - x/y-Axis for pixels
 * - u/v-Axis for tile count
 */

// Options
/////// TODO Make as object
let tileCountU = 22;
let tileCountV = 11;
let tileSize = 372;
let completeSize = {x: tileCountU * tileSize, y: tileCountV * tileSize};
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

  // Initialize tiles
  setTiles(true);

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
    if (isInitial) {
      for (let v = 1; v <= tileCountV; v++) {
        tiles[v] = [];
      }
    }

    const currentPointUV = pixelToTileCountScale(currentPoint);

    let lastU = currentPointUV.u + Math.ceil(tileRateX);
    if (lastU > tileCountU) {
      lastU = tileCountU;
    }
    let lastV = currentPointUV.v + Math.ceil(tileRateY);
    if (lastV > tileCountV) {
      lastV = tileCountV;
    }

    for (let v = currentPointUV.v; v <= lastV; v++) {
      for (let u = currentPointUV.u; u <= lastU; u++) {
        const padding = 1;

        const minU = currentPointUV.u - padding;
        const maxU = currentPointUV.u + Math.ceil(tileRateX) + padding;
        const minV = currentPointUV.v - padding;
        const maxV = currentPointUV.v + Math.ceil(tileRateY) + padding;

        if (u > minU && u < maxU && v > minV && v < maxV && (tiles[v] && !tiles[v][u] || isInitial)) {
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
      draw();
    };
    tiles[v][u] = img;
  }

  function pixelToTileCountScale(pixelPoint) {
    const tileCountScalePoint = {u: 1, v: 1};

    if (pixelPoint.x > completeSize.x) {
      tileCountScalePoint.u = tileCountU;
    } else if (pixelPoint.x > 0) {
      tileCountScalePoint.u = Math.ceil(pixelPoint.x / tileSize);
    }

    if (pixelPoint.y > completeSize.y) {
      tileCountScalePoint.v = tileCountV;
    } else if (pixelPoint.y > 0) {
      tileCountScalePoint.v = Math.ceil(pixelPoint.y / tileSize);
    }

    return tileCountScalePoint;
  }
};