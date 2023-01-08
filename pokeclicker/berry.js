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
