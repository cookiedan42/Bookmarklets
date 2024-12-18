
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
            App.game.farming.plotList.filter(plot => plot._wanderer()).map(plot => App.game.farming.handleWanderer(plot));
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
            App.game.farming.plotList.filter(plot => plot._wanderer()).map(plot => App.game.farming.handleWanderer(plot));
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

farm_loop = async (target) => {
    await farm_stop();
    currentFarm = (async () => {
        let AGE = App.game.farming.berryData[target].growthTime[4];
        while (true) {
            if (!autoFarm) { break; }
            let age = App.game.farming.plotList[0]._age();
            if (age + 2 > AGE) {
                App.game.farming.harvestAll();
            }
            App.game.farming.plantAll(target);
            App.game.farming.plotList.filter(plot => plot._wanderer()).map(plot => App.game.farming.handleWanderer(plot));
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    })()
}


farm_fast_loop = async (target) => {
    await farm_stop();
    currentFarm = (async () => {
        let WACAN_AGE = App.game.farming.berryData[BerryType.Wacan].growthTime[4];
        let PASSHO_AGE = App.game.farming.berryData[BerryType.Passho].growthTime[4];
        let TARGET_AGE = App.game.farming.berryData[target].growthTime[4];
        while (true) {
            if (!autoFarm) { break; }

            // Wacan for boost speed
            [0,2, 4,5,7,9,15,17,19,20,22,24].map(
                pltIndex => {
                    let age = App.game.farming.plotList[pltIndex]._age();
                    if (age + 2 > WACAN_AGE) {
                        // replant
                        App.game.farming.harvest(pltIndex);
                    }
                    App.game.farming.plant(pltIndex, BerryType.Wacan);
                }
            );

            // Passho for boost drop
            [10, 12, 14].map(
                pltIndex => {
                    let age = App.game.farming.plotList[pltIndex]._age();
                    if (age + 2 > PASSHO_AGE) {
                        // replant
                        App.game.farming.harvest(pltIndex);
                    }
                    App.game.farming.plant(pltIndex, BerryType.Passho);
                }
            );

            // target berry
            [1, 3, 6, 8, 11, 13, 16, 18, 21, 23].map(
                pltIndex => {
                    let age = App.game.farming.plotList[pltIndex]._age();
                    if (age + 2 > TARGET_AGE) {
                        App.game.farming.harvest(pltIndex);
                    }
                    App.game.farming.plant(pltIndex, target);
                }
            )
            App.game.farming.plotList.filter(plot => plot._wanderer()).map(plot => App.game.farming.handleWanderer(plot));
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    })()
}


farm_dupe = async (target) => {
    await farm_stop();
    currentFarm = (async () => {
        let WACAN_AGE = App.game.farming.berryData[BerryType.Wacan].growthTime[4];
        let PASSHO_AGE = App.game.farming.berryData[BerryType.Passho].growthTime[4];
        while (true) {
            if (!autoFarm) { break; }

            // Wacan for boost speed
            [0,4,7,15,19,22].map(
                pltIndex => {
                    let age = App.game.farming.plotList[pltIndex]._age();
                    if (age + 2 > WACAN_AGE) {
                        // replant
                        App.game.farming.harvest(pltIndex);
                    }
                    App.game.farming.plant(pltIndex, BerryType.Wacan);
                }
            );

            // Passho for boost drop
            [2, 5, 9, 10, 12, 14, 17,20,24].map(
                pltIndex => {
                    let age = App.game.farming.plotList[pltIndex]._age();
                    if (age + 2 > PASSHO_AGE) {
                        // replant
                        App.game.farming.harvest(pltIndex);
                    }
                    App.game.farming.plant(pltIndex, BerryType.Passho);
                }
            );

            // target berry
            [1,3,6,8,11,13,16,18,21,23].map(
                pltIndex => {
                    App.game.farming.harvest(pltIndex);
                    App.game.farming.plant(pltIndex, target);
                }
            )
            App.game.farming.plotList.filter(plot => plot._wanderer()).map(plot => App.game.farming.handleWanderer(plot));
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    })()
}










// for (let i = 20; i < 30; i++) {
//     App.game.farming.gainBerry(BerryType[i], 1, false)
// }






//App.game.farming.plotList[0].berryData
//App.game.farming.plotList[0].formattedTimeLeft()
//App.game.farming.plotList[0].lastPlanted

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
function fake_kill(){
    Battle.enemyPokemon().damage(Battle.enemyPokemon().health()-1);
}


function dung_map() {
    for (let board of DungeonRunner.map.board()) {
        board.forEach(x => {
            console.log(x
                .map(a => { return a.type() })
                .map(b => { let arr = ["O", "S", " ", "_", "B","L"]; return arr[b] })
                .reduce((p, n) => { return p + n })
            )
        });
        console.log('------------');
    }
}

function dung_startMap() {
    DungeonRunner.initializeDungeon(player.town.dungeon);
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
    await itemIfLess("Dowsing_machine");
    await itemIfLess("xAttack");
    let getPosition = ()=>{
        return DungeonRunner.map.playerPosition();
    }

    DungeonRunner.initializeDungeon(player.town.dungeon);
    
    for (let board of DungeonRunner.map.board()) {
        let currentFloor = getPosition().floor;
        let ind = new Array(board.length).fill(1).map((_, i) => i)
            .flatMap((y) => new Array(board.length).fill(1).map((_, i) => [y, i]));
        let dest = ind.filter(c => board[c[0]][c[1]].type() >= 4)[0];
        while (DungeonRunner.map.playerPosition().y != dest[0] && currentFloor== getPosition().floor) {
            DungeonRunner.map.moveUp();
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        while (DungeonRunner.map.playerPosition().x > dest[1] && currentFloor== getPosition().floor) {
            DungeonRunner.map.moveLeft();
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        while (DungeonRunner.map.playerPosition().x < dest[1] && currentFloor== getPosition().floor) {
            DungeonRunner.map.moveRight();
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        while (!DungeonRunner.dungeonFinished() && currentFloor== getPosition().floor) {
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
}

async function dung_until(target) {
    await dung_stop();
    currentDung = (async (target) => {
        let dungIndex = GameConstants.getDungeonIndex(player.town.name);
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

dung_clean = async () => {
    let clickNotBoss = async () => {
        if (DungeonRunner.map.currentTile().type() == 2 ||
            DungeonRunner.map.currentTile().type() == 3) {
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
    let getPosition = ()=>{
        return DungeonRunner.map.playerPosition();
    }

    await itemIfLess("Dowsing_machine");
    await itemIfLess("xAttack");
    // await itemIfLess("xClick");
    DungeonRunner.initializeDungeon(player.town.dungeon);
    let boards = DungeonRunner.map.board();
      
    for (let floor = 0; floor < boards.length; floor++) {
        let board = boards[floor];
        let boardSize = board.length;

        // go all the way right --> {size-1,size-1}
        while (getPosition().x < boardSize - 1) {
            await clickNotBoss();
            if (DungeonRunner.dungeonFinished()) { return; }
            DungeonRunner.map.moveRight();
            await new Promise(resolve => setTimeout(resolve, 1));
        }


        let x = boardSize - 1;
        while (getPosition().x >= 0) {
            // go to bottom of target col
            while (getPosition().y != boardSize - 1) {
                await clickNotBoss();
                if (DungeonRunner.dungeonFinished()) { return; }
                DungeonRunner.map.moveToCoordinates(x, boardSize - 1, floor);
                await new Promise(resolve => setTimeout(resolve, 1));
            }
            x--;

            // go toward top
            while (getPosition().y > 0) {
                await clickNotBoss();
                if (DungeonRunner.dungeonFinished()) { return; }
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
                if (board[bossY][bossX].type() >= 4) { break; }
            }
            if (board[bossY][bossX].type() >= 4) { break; }
        }

        while ( getPosition().x != bossX || getPosition().y != bossY ) {
            if (DungeonRunner.dungeonFinished()) { return; }
            DungeonRunner.map.moveToCoordinates(bossX, bossY, floor);
            await clickNotBoss();
            await new Promise(resolve => setTimeout(resolve, 1));
        }

        while (!DungeonRunner.dungeonFinished() && getPosition().floor == floor) {
            DungeonRunner.handleInteraction();
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
}

dung_clean_times= async (times) => {
    await dung_stop();

    currentDung = (async (times) => {
        for (let i = 0; i < times; i++) {
            if (!autoDung) { break; }
            await dung_clean();
        }
    })(times);
}

async function frontier_farm() {
    await dung_stop();
    currentDung = (async () => {
        while (true) {
            if (!autoDung) { break; }
            if (!BattleFrontierRunner.started()) {
                BattleFrontierRunner.start(true);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        };
    })();

}
frontier_stop = dung_stop

async function temp_fight(){
    await dung_stop();
    currentDung = (async ()=>{
        while(true){
            if (!autoDung) { break; }
            if (TemporaryBattleBattle.enemyPokemon().health()>0){
                TemporaryBattleBattle.clickAttack();
            }
            await new Promise(resolve => setTimeout(resolve, 10));
        };
    })
}
let currentHatch = (async () => { })();
let autoHatch = true;


/*
    App.game.breeding.addPokemonToHatchery(PokedexHelper.getList().filter(p=>p.id == 113)[0])

    const egg = this.createEgg(pokemon.id);
    const success = this.gainEgg(egg, eggSlot);

    if (
        BreedingController.regionalAttackDebuff() > -1 
    && PokemonHelper.calcNativeRegion(pokemon.name) !== BreedingController.regionalAttackDebuff()
    ) {
        return App.game.party.getRegionAttackMultiplier();
    }


*/

async function hatch_stop() {
    autoHatch = false;
    await currentHatch;
    autoHatch = true;
}


hatch_start = async()=> {
    let breedLimit = 150;
    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();
    let getEff = poke => App.game.party.caughtPokemon.filter(p=>poke.id ==p.id)[0].breedingEfficiency();
    let getMulti = poke => BreedingController.calculateRegionalMultiplier(poke);
    let maxVitamins = () => (player.highestRegion() + 1) * 5 ;
    let forMega = poke =>(PokemonHelper.hasMegaEvolution(poke.name) && (poke.totalVitaminsUsed()>=maxVitamins())&&(poke.baseAttack *500 > poke.attack));
    let isShadow = poke =>(poke.shadow>0 );
    let isNotShadow = poke =>(poke.shadow === 0 );
    let hatchEffP = (a, b) => getEff(a) * getMulti(a) > getEff(b) * getMulti(b) ? a : b;
    let hatchEff = (a, b) => {
        if (getHatched(a) >= breedLimit || getHatched(b) >= breedLimit) {
            return hatchNo(a,b);
        }  
        return getEff(a)*getMulti(a) > getEff(b)*getMulti(b) ? a : b;
    };

    let hatchNo = (a, b) => {
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
            
            let getFilterList = () => App.game.party.caughtPokemon
                .filter(x => !x._breeding())
                .filter(x => x._level() == 100);

            if (getFilterList().filter(forMega).length > 0){
                App.game.breeding.addPokemonToHatchery(
                    getFilterList().filter(forMega).reduce(hatchEffP)
                );
            } 
            if (!App.game.purifyChamber.canPurify() && getFilterList().filter(isShadow).length > 0){
                App.game.breeding.addPokemonToHatchery(
                    getFilterList().filter(isShadow).reduce(hatchEff)
                );
            }
            App.game.breeding.addPokemonToHatchery(
                getFilterList().reduce(hatchEff)
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

async function clickAttack() {
    await route_stop();
    currentRoute = (async () => {
       while(true){
            if (!autoRoute) { break; }
            Battle.clickAttack()
            await new Promise(resolve => setTimeout(resolve, 1)); 
       }
    })();
}

route_items = async () => {
    await route_stop();
    currentRoute = (async () => {
        while (true) {
            if (!autoRoute) { break; }
            await itemIfLess("xAttack");
            await itemIfLess("Lucky_egg"); 
            await itemIfLess("Token_collector"); 
            await itemIfLess("Dowsing_machine");
            await itemIfLess("Lucky_incense");
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    })();
}

function route_10k() { route_autoFightLimit(10000); }
function route_1k() { route_autoFightLimit(1000); }
function route_100() { route_autoFightLimit(100); }
let currentGym = (async () => { })();
let autoGym = true;
let GymTick = 10;

async function gym_stop() {
    autoGym = false;
    await currentGym;
    autoGym = true;
}

itemIfLess = async (name) => {
    let timeBase = player.effectTimer[name]();
    let blockNo = timeBase.split(":").length;
    if (timeBase == "") { blockNo = 0; }

    for (let index = blockNo; index < 3; index++) {
        timeBase = "00:" + timeBase;
    }
    if (timeBase.endsWith(":")) {
        timeBase = timeBase.slice(0, -1);
    }

    let target = new Date("1970-01-01T" + timeBase + "+00:00");
    target = target.getTime() / 1000;

    if (target <= 60) {
        ItemHandler.useItem(name, 2);
        await new Promise(resolve => setTimeout(resolve, 1));
    }
}

gym_times = async (times) => {
    await gym_stop();
    currentGym = (async (times) => {
        let gymArr = player.town.content.filter(x => x.town);
        for (let index = 0; index < gymArr.length; index++) {
            let gym = gymArr[index];
            let badgeNo = GameConstants.getGymIndex(gym.town);
            let target = times + App.game.statistics.gymsDefeated[badgeNo]();
            while (autoGym && App.game.statistics.gymsDefeated[badgeNo]() < target) {
                GymRunner.startGym(GymList[gym.town], false, false);
                while (GymRunner.running()) {
                    if (GymBattle.enemyPokemon().health() > 0) {
                        GymBattle.clickAttack();
                    }
                    await new Promise(resolve => setTimeout(resolve, GymTick));
                }
            }
        }
    })(times);
}

gym_until= async (target) => {
    await gym_stop();
    currentGym = (async (target) => {
        let gymArr = player.town.content.filter(x=>x.town);
        for (let index = 0; index < gymArr.length; index++) {
            let gym = gymArr[index];
            let badgeNo = GameConstants.getGymIndex(gym.town);
            while (autoGym && App.game.statistics.gymsDefeated[badgeNo]() < target){
                await itemIfLess("Lucky_egg");
                await itemIfLess("Lucky_incense");
                GymRunner.startGym(GymList[gym.town], false, false); 
                while (GymRunner.running()) {
                    if (GymBattle.enemyPokemon().health()>0){
                        GymBattle.clickAttack();
                    } 
                    await new Promise(resolve => setTimeout(resolve, GymTick));}
            }
        }
    })(target);
}

// async function gym_region(target) {
//     await gym_stop();
//     currentGym = (async (target) => {
//         let gymArr = [
//             ...GameConstants.KantoGyms,
//             // ...GameConstants.JohtoGyms,
//             // ...GameConstants.HoennGyms,
//             // ...GameConstants.SinnohGyms,
//             //...GameConstants.UnovaGyms,
//             // ...GameConstants.KalosGyms,
//         ].map(x=>GymList[x]);
//         for (let index = 0; index < gymArr.length; index++) {
//             while (target > App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gymArr[index].town)]()) {
//                 if (!autoGym) {break;}
//                 GymRunner.startGym(gymArr[index], false, false);
//                 while (GymBattle.index() < Math.min(6,GymBattle.gym.pokemons.length)) {
//                     if (GymBattle.enemyPokemon().health()>0){
//                         GymBattle.clickAttack();
//                     }
//                     await new Promise(resolve => setTimeout(resolve, GymTick));
//                 }
//             }
//         }
//     })(target);
// }
let shopper = (async () => { })();
let shopping = true;


async function shop_stop(){
    shopping = false;
    await shopper;
    shopping = true;

}

shop_start = async () => {
    await shop_stop();

    let POKEBALL_LIMIT = 1000;
    let ITEM_LIMIT = 100;
    let MULCH_LIMIT = 2000;
    let SHOVEL_LIMIT = 100;

    shopper = (async () => {

        let getCashAmt = App.game.wallet.currencies[0];
        let getFarmPt = App.game.wallet.currencies[4];

        let getPrice = ind => ShopHandler.shopObservable().items[ind].price();
        let getBasePrice = ind => ShopHandler.shopObservable().items[ind].basePrice;
        let isBasePrice = ind => getPrice(ind) === getBasePrice(ind);
        let getPokeNo = ind => App.game.pokeballs.pokeballs[ind].quantity();

        while (shopping){
            ShopHandler.showShop(pokeMartShop)
            for (let i = 0; i <= 2; i++) {
                while (isBasePrice(i) &&
                    getCashAmt() >= getPrice(i) &&
                    getPokeNo(i) < POKEBALL_LIMIT
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 3; i <= 8; i++) {
                while (isBasePrice(i) &&
                    getCashAmt() >= getPrice(i) &&
                    player.itemList[ShopHandler.shopObservable().items[i].name]() < ITEM_LIMIT 
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 0; i < 6; i++) {
                ShopHandler.showShop(DriftveilBerryMaster);
                while(isBasePrice(i) &&
                    getFarmPt() >= getPrice(i) &&
                    App.game.farming.mulchList[i]() <= MULCH_LIMIT
                ){
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            ShopHandler.showShop(DriftveilBerryMaster);
            while (isBasePrice(6) &&
                getFarmPt() >= getPrice(6) &&
                App.game.farming.shovelAmt() < SHOVEL_LIMIT
            ) {
                ShopHandler.setSelected(6);
                ShopHandler.buyItem();
            }
            
            while (isBasePrice(7) &&
                getFarmPt() >= getPrice(7) &&
                App.game.farming.mulchShovelAmt() < SHOVEL_LIMIT
            ) {
                ShopHandler.setSelected(7);
                ShopHandler.buyItem();
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })()
}


shop_start();
