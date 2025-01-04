let shopper = (async () => { })();
let shopping = true;


async function shop_stop(){
    shopping = false;
    await shopper;
    shopping = true;

}

shop_start = async () => {
    await shop_stop();

    let POKEBALL_LIMIT = 1000;
    let ITEM_LIMIT = 100;
    let MULCH_LIMIT = 2000;
    let SHOVEL_LIMIT = 100;

    let getCashAmt = () => App.game.wallet.currencies[0]();
    let getQuestPt = () => App.game.wallet.currencies[1]();
    let getFarmPt = () => App.game.wallet.currencies[4]();

    let getPrice = ind => ShopHandler.shopObservable().items[ind].price();
    let getBasePrice = ind => ShopHandler.shopObservable().items[ind].basePrice;
    let isBasePrice = ind => getPrice(ind) === getBasePrice(ind);
    let setAndBuy = (i) => {ShopHandler.setSelected(i); ShopHandler.buyItem();}

    let getPokeBallCount = ind => App.game.pokeballs.pokeballs[ind].quantity();
    let buyBall = (i,limit) => {
        ShopHandler.showShop(pokeMartShop);
        isBasePrice(i) && getCashAmt() >= getPrice(i) && getPokeBallCount(i) < limit && setAndBuy(i);
    };
    let buyBeast = (limit) => {
        ShopHandler.showShop(RoadsideMotelShop);
        isBasePrice(0) && getQuestPt() >= getPrice(0) && getPokeBallCount(13) < limit && setAndBuy(0);
    }

    let getItemCount = (i) => player.itemList[ShopHandler.shopObservable().items[i].name]();
    let buyItem = (i,limit) => {
        ShopHandler.showShop(pokeMartShop);
        isBasePrice(i) && getCashAmt() >= getPrice(i) && getItemCount(i) < limit && setAndBuy(i);
    };

    let buyMulch = (i,limit) => {
        ShopHandler.showShop(DriftveilBerryMaster);
        isBasePrice(i) && getFarmPt() >= getPrice(i) && App.game.farming.mulchList[i]() <= limit && setAndBuy(i);
    }
    let buyShovel = (limit) => {
        ShopHandler.showShop(DriftveilBerryMaster);
        isBasePrice(6) && getFarmPt() >= getPrice(6) && App.game.farming.shovelAmt() < limit && setAndBuy(6);
    }
    let buyMulchShovel = (limit) => {
        ShopHandler.showShop(DriftveilBerryMaster);
        isBasePrice(7) && getFarmPt() >= getPrice(7) && App.game.farming.mulchShovelAmt() < limit && setAndBuy(7);
    }

    shopper = (async () => {

        while (shopping){
            buyBeast(10); // beast ball

            buyBall(0, POKEBALL_LIMIT); // poke ball
            buyBall(1, POKEBALL_LIMIT); // great ball
            buyBall(2, POKEBALL_LIMIT); // ultra ball

            buyItem(3, ITEM_LIMIT); // X attack
            buyItem(4, ITEM_LIMIT); // X Click
            buyItem(5, ITEM_LIMIT); // Lucky Egg

            buyItem(6, ITEM_LIMIT); // Token Collector
            buyItem(7, ITEM_LIMIT); // Dowsing Machine
            buyItem(8, ITEM_LIMIT); // Lucky Incense

            buyMulch(0, 10*MULCH_LIMIT); // boost mulch
            buyMulch(1, MULCH_LIMIT); // rich mulch
            buyMulch(2, MULCH_LIMIT); // surprise mulch
            buyMulch(3, MULCH_LIMIT); // amaze mulch
            buyMulch(4, MULCH_LIMIT); // freeze mulch  
            buyMulch(5, MULCH_LIMIT); // gooey mulch

            buyShovel(SHOVEL_LIMIT); // shovel
            buyMulchShovel(SHOVEL_LIMIT); // mulch shovel

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })()
}

shop_start();
