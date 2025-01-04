currentHatch = -1;
autoHatch = true;

/*
    App.game.breeding.addPokemonToHatchery(PokedexHelper.getList().filter(p=>p.id == 113)[0])
*/

async function hatch_stop() {
    autoHatch = false;
    clearTimeout(currentHatch);
    autoHatch = true;
}

hatch_filler = () => {
    let tickSpeed = 100;
    let getFilterList = () => App.game.party.caughtPokemon.filter(x => !x._breeding()).filter(x => x._level() == 100).filter(x => x._pokerus() !== 0);
    let addPokemonToHatchery = (arr, reducer) => arr[0] ? App.game.breeding.addPokemonToHatchery(arr.reduce(reducer)) || true : false;
    let weakest = (a, b) => a.attack < b.attack ? a : b;

    hatch_stop();
    let f = () => {
        if (!autoHatch) { return; }
        if (App.game.breeding.queueList().length < 2) { 
            addPokemonToHatchery(getFilterList(), weakest)
        }
        currentHatch = setTimeout(f, tickSpeed);
    };

    f();
}

hatch_start = () => {
    let breedRatio = 100;
    let megaRatio = 500;
    let breedLimit = 500;
    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();
    let getEff = poke => App.game.party.caughtPokemon.filter(p => poke.id == p.id)[0].breedingEfficiency();
    let getMulti = poke => BreedingController.calculateRegionalMultiplier(poke);
    let maxVitamins = () => (player.highestRegion() + 1) * 5;

    // filters
    let hasRatio = (poke,ratio) => poke.baseAttack * ratio > poke.attack;
    let forMega = poke => (PokemonHelper.hasMegaEvolution(poke.name) && (poke.totalVitaminsUsed() >= maxVitamins()) && hasRatio(poke,megaRatio));
    let isShadow = poke => (poke.shadow > 0);
    let isNotShadow = poke => (poke.shadow === 0);
    let isMagikarp = poke => (poke.id >= 129 && poke.id < 130 && poke.totalVitaminsUsed() >= maxVitamins());
    let isXerneas = poke => (poke.id === 716 && poke.attack < 26_000);

    // reducers
    let hatchEffP = (a, b) => getEff(a) * getMulti(a) > getEff(b) * getMulti(b) ? a : b;
    let hatchNo = (a, b) => getHatched(a) <= getHatched(b) ? a : b;
    let hatchEff = (a, b) => (getHatched(a) >= breedLimit || getHatched(b) >= breedLimit) ? hatchNo(a, b) : hatchEffP(a, b);

    let getFilterList = () => App.game.party.caughtPokemon.filter(x => !x._breeding()).filter(x => x._level() == 100).filter(x => x._pokerus() !== 0);
    let addPokemonToHatchery = (arr, reducer) => arr[0] ? App.game.breeding.addPokemonToHatchery(arr.reduce(reducer)) || true : false;

    hatch_stop();
    let f = () => {
        if (!autoHatch) { return; }
        if (App.game.breeding.queueList().length < 2) { 
            addPokemonToHatchery(getFilterList().filter(forMega), hatchEffP) || addPokemonToHatchery(getFilterList().filter(isMagikarp), hatchEff);
            // (!App.game.purifyChamber.canPurify()) && addPokemonToHatchery(getFilterList().filter(isShadow), hatchEff);
            addPokemonToHatchery(getFilterList().filter((poke) => hasRatio(poke,100)), hatchEffP);    
        }
        currentHatch = setTimeout(f, tickSpeed);
    };
    f();
}

hatch_magikarp = () => {
    let breedLimit = 200;
    let tickSpeed = 100;
    let getHatched = poke => App.game.statistics.pokemonHatched[poke.id]();
    let getEff = poke => App.game.party.caughtPokemon.filter(p => poke.id == p.id)[0].breedingEfficiency();
    let getMulti = poke => BreedingController.calculateRegionalMultiplier(poke);
    let maxVitamins = () => (player.highestRegion() + 1) * 5;
    let forMega = poke => (PokemonHelper.hasMegaEvolution(poke.name) && (poke.totalVitaminsUsed() >= maxVitamins()) && (poke.baseAttack * 500 > poke.attack));
    let isShadow = poke => (poke.shadow > 0);
    let isNotShadow = poke => (poke.shadow === 0);
    let isMagikarp = poke => (poke.id >= 129 && poke.id < 130 && poke.totalVitaminsUsed() >= maxVitamins());
    let isXerneas = poke => (poke.id === 716 && poke.attack < 26_000);
    let hatchEffP = (a, b) => getEff(a) * getMulti(a) > getEff(b) * getMulti(b) ? a : b;
    let hatchNo = (a, b) => getHatched(a) <= getHatched(b) ? a : b;
    let hatchEff = (a, b) => (getHatched(a) >= breedLimit || getHatched(b) >= breedLimit) ? hatchNo(a, b) : hatchEffP(a, b);

    let getFilterList = () => App.game.party.caughtPokemon.filter(x => !x._breeding()).filter(x => x._level() == 100).filter(x => x._pokerus() !== 0);
    let addPokemonToHatchery = (arr, reducer) => arr[0] ? App.game.breeding.addPokemonToHatchery(arr.reduce(reducer)) || true : false;

    hatch_stop();
    let f = () => {
        if (!autoHatch) { return; }
        if (App.game.breeding.queueList().length < 2) {
            addPokemonToHatchery(getFilterList().filter(isMagikarp), hatchEff) ||
            addPokemonToHatchery(getFilterList().filter(forMega), hatchEffP) ||
            (!App.game.purifyChamber.canPurify()) && addPokemonToHatchery(getFilterList().filter(isShadow), hatchEff)||
            addPokemonToHatchery(getFilterList(), hatchEff);
        }
        currentHatch = setTimeout(f, tickSpeed);
    };
    f();
}

hatch_start();

