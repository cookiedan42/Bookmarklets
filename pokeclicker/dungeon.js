function dung_map() {
    for (let board of DungeonRunner.map.board()) {
        board.forEach(x => {
            console.log(x
                .map(a => { return a.type() })
                .map(b => { let arr = ["O", "S", " ", "_", "E"]; return arr[b] })
                .reduce((p, n) => { return p + n })
            )
        });
        console.log('------------');
    }
}

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

    for (let board of DungeonRunner.map.board()) {
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

async function dung_clean(){
    let clickNotBoss = async () => {
        if (DungeonRunner.map.currentTile().type() == 2 ||
            DungeonRunner.map.currentTile().type() == 3) {
            DungeonRunner.handleClick();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
    let getPosition = ()=>{
        return DungeonRunner.map.playerPosition();
    }
    let itemIfLess = async (name)=>{
        let timeBase = player.effectTimer[name]();
        let blockNo = timeBase.split(":").length;
        if (timeBase == ""){blockNo=0;}
    
        for (let index = blockNo; index < 3; index++) {
            timeBase = "00:"+timeBase;        
        }
        if (timeBase.endsWith(":")){
            timeBase = timeBase.slice(0,-1);
        }
    
        let target = new Date("1970-01-01T" + timeBase +"+00:00");
        target = target.getTime()/1000;
    
        if (target <= 60){
            ItemHandler.useItem(name,2);
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }


    await itemIfLess("Dowsing_machine");
    await itemIfLess("xAttack");
    await itemIfLess("xClick");
    DungeonRunner.initializeDungeon(player.town().dungeon);
    let boards = DungeonRunner.map.board();
      
    for (let floor = 0; floor < boards.length; floor++) {
        let board = boards[floor];
        let boardSize = board.length;

        // go all the way right --> {size-1,size-1}
        while (getPosition().x < boardSize - 1) {
            await clickNotBoss();
            DungeonRunner.map.moveRight();
            await new Promise(resolve => setTimeout(resolve, 1));
        }


        let x = boardSize - 1;
        while (getPosition().x >= 0) {

            // go to bottom of target col
            while (getPosition().y != boardSize - 1) {
                await clickNotBoss();
                DungeonRunner.map.moveToCoordinates(x, boardSize - 1, floor);
                await new Promise(resolve => setTimeout(resolve, 1));
            }
            x--;

            // go toward top
            while (getPosition().y > 0) {
                await clickNotBoss();
                DungeonRunner.map.moveUp();
                await new Promise(resolve => setTimeout(resolve, 1));
            }

            if (getPosition().x == 0 && getPosition().y == 0) {
                await clickNotBoss();
                break;
            }
        }

        let bossX = 0;
        let bossY = 0;

        for (let bossXin = 0; bossXin < boardSize; bossXin++) {
            for (let bossYin = 0; bossYin < boardSize; bossYin++) {
                bossX = bossXin; bossY = bossYin;
                if (board[bossY][bossX].type() == 4) { break; }
            }
            if (board[bossY][bossX].type() == 4) { break; }
        }

        while ( getPosition().x != bossX || getPosition().y != bossY ) {
            DungeonRunner.map.moveToCoordinates(bossX, bossY, floor);
            await clickNotBoss();
            await new Promise(resolve => setTimeout(resolve, 1));
        }

        while (!DungeonRunner.dungeonFinished() && getPosition().floor == floor) {
            DungeonRunner.handleClick();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
}

async function dung_clean_times(times) {
    await dung_stop();

    currentDung = (async (times) => {
        for (let i = 0; i < times; i++) {
            if (!autoDung) { break; }
            await dung_clean();
        }
    })(times);
}

async function frontier_farm(){
    await dung_stop();
    currentDung = (async ()=>{
        while(true){
            if (!autoDung) { break; }
            if (!BattleFrontierRunner.started()){
                BattleFrontierRunner.start(true);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        };
    })

}


