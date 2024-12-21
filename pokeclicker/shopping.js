shopper = -1;
shopping = true;


async function shop_stop(){
    shopping = false;
    clearTimeout(shopper);
    shopping = true;
}

shop_start = async () => {
    await shop_stop();

    let POKEBALL_LIMIT = 1000;
    let ITEM_LIMIT = 100;
    let MULCH_LIMIT = 2000;
    let SHOVEL_LIMIT = 100;

    let getCashAmt =() => App.game.wallet.currencies[0];
    let getFarmPt  =() => App.game.wallet.currencies[4];
    let getPrice = ind => ShopHandler.shopObservable().items[ind].price();
    let getBasePrice = ind => ShopHandler.shopObservable().items[ind].basePrice;
    let isBasePrice = ind => getPrice(ind) === getBasePrice(ind);
    let getPokeNo = ind => App.game.pokeballs.pokeballs[ind].quantity();
    let f = (async () => {
        if (!shopping){return;}

        for (let i = 0; i <= 2; i++) {
            ShopHandler.showShop(pokeMartShop)
            while (isBasePrice(i) &&
                getCashAmt() >= getPrice(i) &&
                getPokeNo(i) < POKEBALL_LIMIT
            ) {
                ShopHandler.setSelected(i);
                ShopHandler.buyItem();
            }
        }

        for (let i = 3; i <= 8; i++) {
            ShopHandler.showShop(pokeMartShop)
            while (isBasePrice(i) &&
                getCashAmt() >= getPrice(i) &&
                player.itemList[ShopHandler.shopObservable().items[i].name]() < ITEM_LIMIT 
            ) {
                ShopHandler.setSelected(i);
                ShopHandler.buyItem();
            }
        }

        for (let i = 0; i < 6; i++) {
            ShopHandler.showShop(DriftveilBerryMaster);
            while(isBasePrice(i) &&
                getFarmPt() >= getPrice(i) &&
                App.game.farming.mulchList[i]() <= MULCH_LIMIT
            ){
                ShopHandler.setSelected(i);
                ShopHandler.buyItem();
            }
        }

        ShopHandler.showShop(DriftveilBerryMaster);
        while (isBasePrice(6) &&
            getFarmPt() >= getPrice(6) &&
            App.game.farming.shovelAmt() < SHOVEL_LIMIT
        ) {
            ShopHandler.setSelected(6);
            ShopHandler.buyItem();
        }
        
        ShopHandler.showShop(DriftveilBerryMaster);
        while (isBasePrice(7) &&
            getFarmPt() >= getPrice(7) &&
            App.game.farming.mulchShovelAmt() < SHOVEL_LIMIT
        ) {
            ShopHandler.setSelected(7);
            ShopHandler.buyItem();
        }

        shopper = setTimeout(f, 1000);
    })
    shopper = f();
}


shop_start();