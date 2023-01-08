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