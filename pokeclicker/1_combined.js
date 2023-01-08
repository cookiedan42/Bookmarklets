
let currentFarm = (async () => { })();
let autoFarm = true;
let BerryTick = 100;

async function farm_stop() {
    autoFarm = false;
    await currentFarm;
    autoFarm = true;
}

async function farm_clear() {
    await farm_stop();
    currentFarm = (async () => {
        while (true) {
            if (!autoFarm) { break; }
            App.game.farming.harvestAll();
            await new Promise(resolve => setTimeout(resolve, BerryTick));
        }
    })();
}

async function farm_uniformFarm(BerryType_var) {
    await farm_stop();
    currentFarm = (async () => {
        while (true) {
            if (!autoFarm) { break; }
            App.game.farming.harvestAll();
            App.game.farming.plantAll(BerryType_var);
            await new Promise(resolve => setTimeout(resolve, BerryTick));
        }
    })();
}

async function farm_cheriFarm() {
    await farm_uniformFarm(BerryType.Cheri);
}

async function farm_uniformFarm2(BerryType_var) {
    await farm_stop();
    currentFarm = (async () => {
        while (true) {
            if (!autoFarm) { break; }
            App.game.farming.plantAll(BerryType_var);
            await new Promise(resolve => setTimeout(resolve, BerryTick));
        }
    })();
}

async function farm_cheriFarm2() {
    await farm_uniformFarm2(BerryType.Cheri);
}





// async function farm_loopingFarm() {
//     await farm_stop();
//     currentFarm = (async () => {
//         while (true) {
//             if (!autoFarm) { break; }
//             App.game.farming.harvestAll();
//             for (let index = 0; index < App.game.farming.plotList.length; index++) {
//                 let plot = App.game.farming.plotList[index];
//                 if (plot.isEmpty() && plot.isUnlocked) {
//                     let berry = Math.max(plot._lastPlanted(), 0);
//                     App.game.farming.plant(index, berry, false);
//                 }
//             }
//             await new Promise(resolve => setTimeout(resolve, 100));
//         }
//     })()
// }



// async function farm_breedPayapa() {
//     let BT = BerryType;
//     await farm_breeding([
//         BT.Wiki, BT.None, BT.Cornn, BT.None, BT.Wiki,
//         BT.Bluk, BT.None, BT.Pamtre, BT.None, BT.Bluk,
//         BT.None, BT.None, BT.None, BT.None, BT.None,
//         BT.Cornn, BT.None, BT.Wiki, BT.None, BT.Cornn,
//         BT.Pamtre, BT.None, BT.Bluk, BT.None, BT.Pamtre,
//     ]);

//     // let waccan = [
//     //     BT.Iapapa,  BT.None,    BT.Pinap,   BT.None,    BT.Iapapa,
//     //     BT.Qualot,  BT.None,    BT.Grepa,   BT.None,    BT.Qualot,
//     //     BT.None,    BT.None,    BT.None,    BT.None,    BT.None,
//     //     BT.Iapapa,  BT.None,    BT.Pinap,   BT.None,    BT.Iapapa,
//     //     BT.Qualot,  BT.None,    BT.Grepa,   BT.None,    BT.Qualot,
//     // ];

// }

// async function farm_breeding(berriesData) {
//     // BERRY LAYOUT
//     // | 0| 1| 2| 3| 4|
//     // | 5| 6| 7| 8| 9|
//     // |10|11|12|13|14|
//     // |15|16|17|18|19|
//     // |20|21|22|23|24|
//     let farms = App.game.farming;
//     let BT = BerryType;

//     await farm_stop();
//     currentFarm = (async () => {
//         while (true) {
//             if (!autoFarm) { break; }
//             for (index = 0; index < berriesData.length; index++) {
//                 let plot = App.game.farming.plotList[index];
//                 if (!plot.isUnlocked) { continue; }
//                 if (berriesData[index] == BT.None) { farms.harvest(index, false); continue; }
//                 if (plot.isEmpty()) { farms.plant(index, berriesData[index], false); continue; }

//                 let currentBerry = plot.berry;
//                 if (currentBerry != berriesData[index] || plot.age >= farms.berryData[currentBerry].growthTime[4]) {
//                     farms.harvest(index, false);
//                     farms.plant(index, berriesData[index], false);
//                 }
//             }
//             await new Promise(resolve => setTimeout(resolve, 100));
//         }
//     })();
// }


// async function farm_4xBreeding() {
//     let BT = BerryType;
//     let O = BT.None
//     let a = BT.Iapapa;
//     let b = BT.Pinap;
//     let c = BT.Qualot;
//     let d = BT.Grepa;
//     let layout = [
//         a, O, b, O, a,
//         c, O, d, O, c,
//         O, O, O, O, O,
//         b, O, a, O, b,
//         d, O, c, O, d,
//     ];


//     let berryData = App.game.farming.berryData;

//     // console.log(berryData[a]);
//     // console.log(berryData[b]);
//     // console.log(berryData[c]);
//     // console.log(berryData[d]);

//     console.log(
//         [a,b,c,d]
//         .map(x=>berryData[x])
//         .map(x=>x.growthTime[3])
//         .reduce((x,y)=>x>y?x:y)
//     )

// }
// farm_4xBreeding()

    // let farms = App.game.farming;

    // await farm_stop();
    // currentFarm = (async () => {
    //     while (true) {
    //         if (!autoFarm) { break; }
    //         for (index = 0; index < berriesData.length; index++) {
    //             let plot = App.game.farming.plotList[index];
    //             if (!plot.isUnlocked) { continue; }
    //             if (berriesData[index] == BT.None) { farms.harvest(index, false); continue; }
    //             if (plot.isEmpty()) { farms.plant(index, berriesData[index], false); continue; }

    //             let currentBerry = plot.berry;
    //             if (currentBerry != berriesData[index] || plot.age >= farms.berryData[currentBerry].growthTime[4]) {
    //                 farms.harvest(index, false);
    //                 farms.plant(index, berriesData[index], false);
    //             }
    //         }
    //         await new Promise(resolve => setTimeout(resolve, 100));
    //     }
    // })();
function dung_map () {
    let board = DungeonRunner.map.board()[0];
    board.forEach(x => {
        console.log(x
            .map(a => { return a.type() })
            .map(b => { let arr = ["O", "S", " ", "_", "E"]; return arr[b] })
            .reduce((p, n) => { return p + n })
        )
    });

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
let currentHatch = (async () => { })();
let autoHatch = true;

async function hatch_stop() {
    autoHatch = false;
    await currentHatch;
    autoHatch = true;
}

hatch_start= async()=> {

    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();

    let max = (a, b) => a >= b ? a : b;
    let maxHatched = App.game.party.caughtPokemon.map(x=>getHatched(x)).reduce(max);

    let reducer = (a, b) => {
        if (getHatched(a) != getHatched(b)) {
            return getHatched(a) < getHatched(b) ? a : b;
        }
        return a.id > b.id ? a : b;
    };

    await hatch_stop();
    currentHatch = (async () => {
        while (autoHatch) {
            await new Promise(resolve => setTimeout(resolve, tickSpeed));
            if (App.game.breeding.queueList().length >= 2) { continue;}
            App.game.breeding.addPokemonToHatchery(
                App.game.party.caughtPokemon
                .filter(x => !x._breeding())
                .filter(x => x._level() == 100)
                .filter(x => x.id >= 0)
                .reduce(reducer)
            );
        }
    })();
}

hatch_start();
let currentRoute = (async () => { })();
let autoRoute = true;

async function route_stop() {
    autoRoute = false;
    await currentRoute;
    autoRoute = true;
}

async function route_shinyWander(limit) {
    await route_stop();
    currentRoute = (async () => {
        let wanderers = [...Array(10).keys()].map(x => RoamingPokemonList.list[x]).filter(x => x).flat(2).map(x => x.pokemon.id);
        let keep = () => { return Battle.enemyPokemon().shiny || wanderers.includes(Battle.enemyPokemon().id) };
        while (autoRoute && limit > 0) {
            while (keep()) { await new Promise(resolve => setTimeout(resolve, 1000)) }
            while (!keep()) { Battle.generateNewEnemy(); }
            limit--;
        }
    })();
}

async function route_name(pokeName) {
    await route_stop();
    currentRoute = (async () => {
        while (autoRoute) {
            await new Promise(resolve => setTimeout(resolve, 1))
            while (Battle.enemyPokemon().name != pokeName) { Battle.generateNewEnemy(); }
        }
    })();
}

async function route_autoFight() {
    await route_stop();
    currentRoute = (async () => {
        let wanderers = [...Array(10).keys()].map(x => RoamingPokemonList.list[x]).filter(x => x).flat(2).map(x => x.pokemon.id);
        let keep = () => { return Battle.enemyPokemon().shiny || wanderers.includes(Battle.enemyPokemon().id) };
        while (true) {
            if (!autoRoute) { break; }
            while (keep()) { await new Promise(resolve => setTimeout(resolve, 10)); }
            Battle.defeatPokemon();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    })();
}

async function route_autoFightLimit(target) {
    await route_stop();
    currentRoute = (async (target) => {
        let wanderers = [...Array(10).keys()].map(x => RoamingPokemonList.list[x]).filter(x => x).flat(2).map(x => x.pokemon.id);
        let keep = () => { return Battle.enemyPokemon().shiny || wanderers.includes(Battle.enemyPokemon().id) };
        while (true) {
            if (target < App.game.statistics.routeKills[player.region][player.route()]()) { break; }
            if (!autoRoute) { break; }
            while (keep()) { await new Promise(resolve => setTimeout(resolve, 10)); }
            Battle.defeatPokemon();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    })(target);
}

async function clickAttack(times) {
    while (times > 0){
        times --;
        Battle.clickAttack()
        await new Promise(resolve => setTimeout(resolve, 1)); 
    }
}

function route_10k() { route_autoFightLimit(10000); }
function route_1k() { route_autoFightLimit(1000); }
function route_100() { route_autoFightLimit(100); }
let currentGym = (async () => { })();
let autoGym = true;
let GymTick = 100;

async function gym_stop() {
    autoGym = false;
    await currentGym;
    autoGym = true;
}

async function gym_times(times) {
    await gym_stop();
    currentGym = (async (times) => {
        while (autoGym && times-- > 0){
            GymRunner.startGym(GymList[player.town().name], false, false);
            while (GymRunner.running()) { await new Promise(resolve => setTimeout(resolve, GymTick)); }
        }
    })(times);
}

async function gym_until(target) {
    await gym_stop();
    currentGym = (async (target) => {
        let gymArr = player.town().content.filter(x=>x.town);
        for (let index = 0; index < gymArr.length; index++) {
            let gym = gymArr[index];
            let badgeNo = GameConstants.getGymIndex(gym.town);
            while (autoGym && App.game.statistics.gymsDefeated[badgeNo]() < target){
                GymRunner.startGym(GymList[gym.town], false, false); 
                while (GymRunner.running()) { await new Promise(resolve => setTimeout(resolve, GymTick));}
            }
        }
    })(target);
}

async function gym_region(target) {
    await gym_stop();
    currentGym = (async (target) => {
        let gymArr = [
            ...GameConstants.KantoGyms,
            ...GameConstants.JohtoGyms,
            ...GameConstants.HoennGyms,
            ...GameConstants.SinnohGyms,
            //...GameConstants.UnovaGyms,
            // ...GameConstants.KalosGyms,
        ].map(x=>GymList[x]);
        for (let index = 0; index < gymArr.length; index++) {
            while (target > App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gymArr[index].town)]()) {
                if (!autoGym) {break;}
                GymRunner.startGym(gymArr[index], false, false);
                while (GymBattle.index() < Math.min(6,GymBattle.gym.pokemons.length)) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    })(target);
}
let shopper = (async () => { })();
let shopping = true;


async function shop_stop(){
    shopping = false;
    await shopper;
    shopping = true;

}

async function shop_start() {
    await shop_stop();

    shopper = (async () => {
        let isBasePrice = (sh,index) => {return (
            sh[index].price() ===
            sh[index].basePrice
        ); }
        while (shopping){
            ShopHandler.showShop(pokeMartShop)
            for (let i = 0; i <= 2; i++) {
                while (isBasePrice(ShopHandler.shopObservable().items,i) &&
                App.game.pokeballs.pokeballs[i].quantity() < 100000
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 0; i < 5; i++) {
                ShopHandler.showShop(SinnohBerryMaster);
                while(isBasePrice(ShopHandler.shopObservable().items,i) &&
                    App.game.farming.mulchList[i]() <=5000 &&
                    App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[i].price()
                ){
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            ShopHandler.showShop(SinnohBerryMaster);
            while (isBasePrice(ShopHandler.shopObservable().items,5) &&
                App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[5].price() &&
                App.game.farming.shovelAmt() < 500
            ) {
                ShopHandler.setSelected(5);
                ShopHandler.buyItem();
            }
            
            while (isBasePrice(ShopHandler.shopObservable().items,6) &&
                App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[6].price() &&
                App.game.farming.mulchShovelAmt() < 500
            ) {
                ShopHandler.setSelected(6);
                ShopHandler.buyItem();
            }



            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })()
}


shop_start();
