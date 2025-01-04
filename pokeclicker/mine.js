MINE_TICK = 10;

autoMine = true;
currentMine = -1;
function mine_stop() {
    autoMine = false;
}

mine_bomb = () => {
    clearTimeout(currentMine);
    let isBomb = () => App.game.underground.tools._selectedToolType() === 2;
    let isIncomplete = () => !App.game.underground._mine()._completed();
    if (!autoMine) { return; }
    if (!isBomb()) { return; }
    if (isIncomplete()) {
        UndergroundController.clickModalMineSquare(0);
        currentMine = setTimeout(mine_bomb, 10*MINE_TICK);
    } else {
        currentMine = setTimeout(mine_bomb, MINE_TICK);
    }
}

mine_bomb();
