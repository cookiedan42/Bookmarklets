import { BerryType } from "./berry_data.js";

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
