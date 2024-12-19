function addListener() {
    canvas.addEventListener("click", function __handler__(evt) {
        let rect = canvas.getBoundingClientRect();
        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;

        let data = {
            id: hero.id,
            x: x,
            y: y
        }
        sendWsMessage("move", data);
    });
}

function heroMove(id, x, y) {
    heroArray.forEach(hero => {
        if (hero.id == id) {
            hero.x = x;
            hero.y = y;
        }
    });
}