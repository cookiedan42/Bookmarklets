// I put quite a bit of work into breaking pokeclicker, would be a shame to delete it.

// gymFight
javascript:(function(){
    let fightTime = 7 * 1000;
    gymFight = setInterval(function(){GymRunner.startGym(player.town().gym())},fightTime);
    alert("Fighting" + player.town().gym().leaderName);
})();

// stop gymFight
javascript:(function(){
    clearInterval(eliteFight);
    alert("stopped fighting gym");
})();

// start eliteFight
javascript:(function(){
    let eliteNames = player.town().gymList().map(function(x){return x().leaderName+"\n"});
    let note = "";
    for(i = 0;i<eliteNames.length;i++){
        note+= i+":"+eliteNames[i];
    }
    let eliteNo = parseInt(prompt("Elites\n\n"+note+"\nFight No:","3"),10);
    let fightTime = 7 * 1000;
    eliteFight = setInterval(function(){GymRunner.startGym(player.town().gymList()[eliteNo]())},fightTime);
    alert("fighting "+player.town().gymList()[eliteNo]().leaderName);
})();

// stop eliteFight
javascript:(function(){
    clearInterval(eliteFight);
    alert("stopped fighting elite");
})();

//egg hatchery
javascript:(function(){
    eggHatch = setInterval(function(){ 
        App.game.breeding._eggList.map(function(x){if (x().progress()>= 100){App.game.breeding.hatchPokemonEgg(App.game.breeding._eggList.indexOf(x))}});
        if (App.game.breeding.hasFreeEggSlot()){
            App.game.breeding.addPokemonToHatchery(App.game.party.caughtPokemon.filter(function(x){return !x._shiny()}).filter(function(x){return 100 == x._level()}).filter(function(x){return !x._breeding()})[0]);
        }
    },1000);
})();
// stop eggs
javascript:(function(){
    clearInterval(eggHatch);
    alert("stopped eggHatch");
})();





// BERRY LAYOUT
// | 0| 1| 2| 3| 4|
// | 5| 6| 7| 8| 9|
// |10|11|12|13|14|
// |15|16|17|18|19|
// |20|21|22|23|24|


// Breeding farm
javascript:(function(){
    let a = 4;
    let b = 17;
    // let c = 16;
    let berriesData = [
        [ 0,4],
        [ 1,17],
        [ 2,4],
        [ 3,17],
        [ 4,4],

        [5,17],
        [ 6,4],
        [7,17],
        [ 8,4],
        [9,17],

        [10,4],
        [11,17],
        [12,17],
        [13,17],
        [14,4],
        [15,17],
        
        [16,4],
        [16,17],
        [17,17],
        [18,4],
        [19,17],

        [20,4],
        [21,17],
        [22,4],
        [23,17],
        [24,4],
    ];
    berryFarm = setInterval(function(){
        for (i = 0;i<berriesData.length;i++){
            if(App.game.farming.plotList[berriesData[i][0]].isEmpty()){
                App.game.farming.plant(berriesData[i][0],berriesData[i][1],false);
            }
        }
    },1000);
})();

// Breeding farm 4 near
javascript:(function(){
    let a = BerryType.Razz;
    let b = BerryType.Figy;
    let c = BerryType.Tamato;
    let d = BerryType.Spelon;
    let berriesData = [
        [ 5,a],
        [ 9,a],
        [17,a],

        [ 1,b],
        [13,b],
        [21,b],

        [3,c],
        [11,c],
        [23,c],
        
        [7,d],
        [15,d],
        [19,d],
    ];
    berryFarm = setInterval(function(){
        for (i = 0;i<berriesData.length;i++){
            if(App.game.farming.plotList[berriesData[i][0]].isEmpty()){
                App.game.farming.plant(berriesData[i][0],berriesData[i][1],false);
            }
        }
    },1000);
})();

// Breeding farm evolveCols
javascript:(function(){
    let a = BerryType.Razz;
    let b = BerryType.Pomeg;

    let berriesData = [
        [ 0,a],
        [ 5,a],
        [10,a],
        [15,a],
        [20,a],

        [ 2,a],
        [ 7,a],
        [12,a],
        [17,a],
        [22,a],

        [ 4,a],
        [ 9,a],
        [14,a],
        [19,a],
        [24,a],

        [ 1,b],
        [ 6,b],
        [11,b],
        [16,b],
        [21,b],

        [ 3,b],
        [ 8,b],
        [13,b],
        [18,b],
        [23,b],
    ];
    berryFarm = setInterval(function(){
        for (i = 0;i<berriesData.length;i++){
            if(App.game.farming.plotList[berriesData[i][0]].isEmpty()){
                App.game.farming.plant(berriesData[i][0],berriesData[i][1],false);
            }
        }
    },1000);
})();

//breedAll
javascript:(function(){
    berryFarm = setInterval(function(){
        App.game.farming.harvestAll();
        App.game.farming.plantAll(19);
    },1000);
})();


javascript:(function(){
    DungRun = setInterval(function(){
    
        DungeonRunner.initializeDungeon(player.town().dungeon());
    

    },1000);
})();

// Treasure : DungeonRunner.map.currentTile().type() == 2
// Boss     : DungeonRunner.map.currentTile().type() == 3

//DungeonRunner.map.moveUp
//DungeonRunner.map.moveDown
//DungeonRunner.map.moveLeft
//DungeonRunner.map.moveRight



//testing
javascript:(function(){
    L = setInterval(function(){console.log("hi")},1000);
})();
// test stop
javascript:(clearInterval(L))

