let currentGym = (async () => { })();
let autoGym = true;
let GymTick = 10;

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
            while (GymRunner.running()) { 
                if (GymBattle.enemyPokemon().health()>0){
                    GymBattle.clickAttack();
                }
                await new Promise(resolve => setTimeout(resolve, GymTick)); 
            }
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
                while (GymRunner.running()) {
                    if (GymBattle.enemyPokemon().health()>0){
                        GymBattle.clickAttack();
                    } 
                    await new Promise(resolve => setTimeout(resolve, GymTick));}
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
                    if (GymBattle.enemyPokemon().health()>0){
                        GymBattle.clickAttack();
                    }
                    await new Promise(resolve => setTimeout(resolve, GymTick));
                }
            }
        }
    })(target);
}