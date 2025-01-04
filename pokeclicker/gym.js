let currentGym = (async () => { })();
let autoGym = true;
let GymTick = 10;

async function gym_stop() {
    autoGym = false;
    await currentGym;
    autoGym = true;
}

itemIfLess = (name) => {
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
