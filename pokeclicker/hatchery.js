let currentHatch = (async () => { })();
let autoHatch = true;


/*
    App.game.breeding.addPokemonToHatchery(PokedexHelper.getList().filter(p=>p.id == 113)[0])
*/

async function hatch_stop() {
    autoHatch = false;
    await currentHatch;
    autoHatch = true;
}


hatch_start = async () => {
    let breedLimit = 150;
    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();
    let getEff = poke => App.game.party.caughtPokemon.filter(p => poke.id == p.id)[0].breedingEfficiency();
    let getMulti = poke => BreedingController.calculateRegionalMultiplier(poke);
    let maxVitamins = () => (player.highestRegion() + 1) * 5;
    let forMega = poke => (PokemonHelper.hasMegaEvolution(poke.name) && (poke.totalVitaminsUsed() >= maxVitamins()) && (poke.baseAttack * 500 > poke.attack));
    let isShadow = poke => (poke.shadow > 0);
    let isNotShadow = poke => (poke.shadow === 0);
    let isMagikarp = poke => (poke.id >= 129 && poke.id < 130 && poke.totalVitaminsUsed() >= maxVitamins());
    let hatchEffP = (a, b) => getEff(a) * getMulti(a) > getEff(b) * getMulti(b) ? a : b;
    let hatchNo = (a, b) => getHatched(a) <= getHatched(b) ? a : b;
    let hatchEff = (a, b) =>  (getHatched(a) >= breedLimit || getHatched(b) >= breedLimit) ? hatchNo(a, b) : hatchEffP(a, b);

    let getFilterList = () => App.game.party.caughtPokemon.filter(x => !x._breeding()).filter(x => x._level() == 100);
    let addPokemonToHatchery = (arr,reducer) => arr[0]? App.game.breeding.addPokemonToHatchery(arr.reduce(reducer)): null;

    await hatch_stop();
    currentHatch = (async () => {
        while (autoHatch) {
            await new Promise(resolve => setTimeout(resolve, tickSpeed));
            if (App.game.breeding.queueList().length >= 2) { continue; }

            addPokemonToHatchery(getFilterList().filter(forMega), hatchEffP);
            addPokemonToHatchery(getFilterList().filter(isMagikarp), hatchEff);
            (!App.game.purifyChamber.canPurify()) && addPokemonToHatchery(getFilterList().filter(isShadow), hatchEff);
            addPokemonToHatchery(getFilterList(), hatchEff);
        }
    })();
}

hatch_start();
