setInterval(() => {
    player.health -= Math.abs(player.pos.y / 10000);
}, 1000);