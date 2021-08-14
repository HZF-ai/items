let overmove1 = document.getElementById('over-move1');
let overmove2 = document.getElementById('over-move2');
let hiddenv = document.getElementById('hidden-v');
console.log(hiddenv);
let top0 = document.getElementById('top0');
let bottom = document.getElementById('bottom0');
let footer = document.getElementById('footer0');

// let menu = document.getElementById('menu');
overmove1.onclick = function() {
    // c.src = '../task-Dribbble/imgs/quxiao.svg';
    overmove1.style.display = 'none';
    overmove2.style.display = 'block';
    hiddenv.style.display = 'block';
    top0.style.display = 'none';
    bottom.style.display = 'none';
    footer.style.display = 'none';
}
overmove2.onclick = function() {
    // c.src = '../task-Dribbble/imgs/icon-menu.svg';
    overmove2.style.display = 'none';
    overmove1.style.display = 'block';
    hiddenv.style.display = 'none';
    top0.style.display = 'block';
    bottom.style.display = 'block';
    footer.style.display = 'block';
}