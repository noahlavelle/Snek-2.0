//canvas setup
const canvas = $('#game');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = camvas.height;
const gridsize = 30;

function render(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridsize, gridsize);
}

function clear() {
    ctx.fillStyle = '#23272a';
    ctx.fillRect (0, 0, w, h);
}

function text(text, line) {

}