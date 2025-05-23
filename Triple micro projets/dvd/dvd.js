 const obj = document.getElementById('dvd');
    const svg = obj.querySelector('svg');

    let posX = 100;
    let posY = 100;

    let speedX = 3;
    let speedY = 3;

    function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

    function move() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const objWidth = obj.offsetWidth;
    const objHeight = obj.offsetHeight;

    const maxX = screenWidth - objWidth;
    const maxY = screenHeight - objHeight;

    posX += speedX;
    posY += speedY;

    let bounced = false;

    if (posX <= 0) {
    posX = 0;
    speedX = Math.abs(speedX);
    bounced = true;
} else if (posX >= maxX) {
    posX = maxX;
    speedX = -Math.abs(speedX);
    bounced = true;
}

    if (posY <= 0) {
    posY = 0;
    speedY = Math.abs(speedY);
    bounced = true;
} else if (posY >= maxY) {
    posY = maxY;
    speedY = -Math.abs(speedY);
    bounced = true;
}

    obj.style.transform = `translate(${posX}px, ${posY}px)`;

    if (bounced) {
    svg.style.fill = randomColor();
}

    requestAnimationFrame(move);
}

    requestAnimationFrame(move);