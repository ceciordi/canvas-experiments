/* Index.js */

var aniFrameId,
    boxObjs = [
        {
            w: 55,
            h: 55,
            x: 0,
            y: 0,
            sx: 2,
            sy: 3
        }
    ],

    boxesColor = '#FF0000',
    SW = 377,
    SH = 377;

function constrainSquare (square) {
    // Destructuring (search mdn for docs)
    const {x, y, w, h} = square;
    if (x + w > SW || x < 0) {
        square.sx *= -1;
    }
    if (y + h > SH || y < 0) {
        square.sy *= -1;
    }
}
function getAnimate(ctx) {
  return function animate() {

        ctx.clearRect(0, 0, SW, SH);
        ctx.beginPath();
        boxObjs.forEach(box => {
            constrainSquare(box);
            drawSquare(ctx, box);
            box.x += box.sx;
            box.y += box.sy;
        });

        ctx.closePath();
        aniFrameId = requestAnimationFrame(animate);
    }
};

function drawSquare(gContext, boxObj) {
    gContext.fillStyle = boxesColor;
    gContext.rect(boxObj.x, boxObj.y, boxObj.w, boxObj.h);
    gContext.fill();

}

function init() {
    const canvas = document
        .querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    getAnimate(ctx,
        canvas.width,
        canvas.height
    )();
}

window.addEventListener('load', init);
