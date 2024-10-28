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


hatch_stop();
hatch_start= async()=> {
    let breedLimit = 10;
    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();
    let getEff = poke => App.game.party.caughtPokemon.filter(p=>poke.id ==p.id)[0].breedingEfficiency();
    let getMulti = poke => BreedingController.calculateRegionalMultiplier(poke);

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
            App.game.breeding.addPokemonToHatchery(
                App.game.party.caughtPokemon
                .filter(x => !x._breeding())
                .filter(x => x._level() == 100)
                .filter(x => x.id >= 0)
                .reduce(hatchEff)
            );
        }
    })();
}

// hatch_start();