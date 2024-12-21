MINE_TICK = 100;

autoMine = true;

function mine_stop() {
    autoMine = false;
}

mine_bomb = () => {
    let isBomb = () => App.game.underground.tools._selectedToolType() === 2;
    let isIncomplete = () => !App.game.underground._mine()._completed();
    if (!autoMine) { return; }
    if (!isBomb()) { return; }
    if (isIncomplete()) {
        UndergroundController.clickModalMineSquare(0);
    }
    setTimeout(mine_bomb, MINE_TICK);
}
