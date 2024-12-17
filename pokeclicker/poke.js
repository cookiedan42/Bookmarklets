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