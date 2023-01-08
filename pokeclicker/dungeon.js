
function dung_startMap() {
    DungeonRunner.initializeDungeon(player.town().dungeon);
    dung_map()
}

let currentDung = (async () => { })();
let autoDung = true;

async function dung_stop() {
    autoDung = false;
    await currentDung;
    autoDung = true;
}

async function dung_single() {
    DungeonRunner.initializeDungeon(player.town().dungeon);
    let board = DungeonRunner.map.board()[0];
    let ind = new Array(board.length).fill(1).map((_, i) => i)
        .flatMap((y) => new Array(board.length).fill(1).map((_, i) => [y, i]));
    let dest = ind.filter(c => board[c[0]][c[1]].type() == 4)[0];

    while (DungeonRunner.map.playerPosition().y != dest[0]) {
        DungeonRunner.map.moveUp();
        DungeonRunner.handleClick();
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    while (DungeonRunner.map.playerPosition().x > dest[1]) {
        DungeonRunner.map.moveLeft();
        DungeonRunner.handleClick();
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    while (DungeonRunner.map.playerPosition().x < dest[1]) {
        DungeonRunner.map.moveRight();
        DungeonRunner.handleClick();
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    while (!DungeonRunner.dungeonFinished()) { 
        DungeonRunner.handleClick();
        await new Promise(resolve => setTimeout(resolve, 1)); 
    }
}

async function dung_until(target) {
    await dung_stop();
    currentDung = (async (target) => {
        let dungIndex = GameConstants.getDungeonIndex(player.town().name);
        while (target > App.game.statistics.dungeonsCleared[dungIndex]()) {
            if (!autoDung) { break; }
            await dung_single();
        }
    })(target);
}

async function dung_times(times) {
    await dung_stop();
    currentDung = (async (times) => {
        for (let i = 0; i < times; i++) {
            if (!autoDung) { break; }
            await dung_single();
        }
    })(times);
}

async function dung_clean_times(times) {
    await dung_stop();

    let impl = async()=>{
        DungeonRunner.initializeDungeon(player.town().dungeon);
        let boards = DungeonRunner.map.board();
    
        for (let floor = 0; floor < boards.length; floor++) {
            let board = boards[floor];
            let boardSize = board.length;
    
            let clickNotBoss = async () => {
                if (DungeonRunner.map.currentTile().type() == 2 ||
                    DungeonRunner.map.currentTile().type() == 3) {
                    DungeonRunner.handleClick();
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
            }
    
            // go all the way right --> {size-1,size-1}
            while (DungeonRunner.map.playerPosition().x < boardSize - 1) {
                await clickNotBoss();
                DungeonRunner.map.moveRight();
                await new Promise(resolve => setTimeout(resolve, 1));
            }
            // starting {5,5} cell 
    
            let x = boardSize - 1; // x=5
            while (DungeonRunner.map.playerPosition().x >= 0) {
    
                // go to bottom of target col
                while (DungeonRunner.map.playerPosition().y != boardSize - 1) {
                    await clickNotBoss();
                    DungeonRunner.map.moveToCoordinates(x, boardSize - 1, floor);
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
                x--;
    
                // go toward top
                while (DungeonRunner.map.playerPosition().y > 0) {
                    // handle cell
                    await clickNotBoss();
                    DungeonRunner.map.moveUp();
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
    
                if (DungeonRunner.map.playerPosition().x == 0 &&
                    DungeonRunner.map.playerPosition().y == 0) {
                    await clickNotBoss();
                    break;
                }
            }
    
    
            let bossX = boardSize-1;
            let bossY = boardSize-1;
            while (bossX > 0) {
                bossY = boardSize-1;
                while (bossY > 0) {
                    if (board[bossY][bossX].type() == 4) { break; }
                    bossY--;
                }
                if (board[bossY][bossX].type() == 4) { break; }
                bossX--;
            }
    
            while (
                DungeonRunner.map.playerPosition().x != bossX ||
                DungeonRunner.map.playerPosition().y != bossY
            ) {
                DungeonRunner.map.moveToCoordinates(bossX, bossY, floor);
                await clickNotBoss();
                await new Promise(resolve => setTimeout(resolve, 1));
            }
    
            while (!DungeonRunner.dungeonFinished()) { 
                DungeonRunner.handleClick();
                await new Promise(resolve => setTimeout(resolve, 1)); 
            }
    
        }
    }



    currentDung = (async (times) => {
        for (let i = 0; i < times; i++) {
            if (!autoDung) { break; }
            await impl();
        }
    })(times);
}


// async function dung_region(target) {
//     await dung_stop();
//     currentDung = (async (times) => {
//         while (true) {
//             if (!autoDung) { break; }
//             await dung_single();
//         }
//     })(times);
// }