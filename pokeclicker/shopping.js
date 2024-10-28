let shopper = (async () => { })();
let shopping = true;


async function shop_stop(){
    shopping = false;
    await shopper;
    shopping = true;

}

async function shop_start() {
    await shop_stop();

    let POKEBALL_LIMIT = 1000;
    let ITEM_LIMIT = 100;
    let MULCH_LIMIT = 5;
    let SHOVEL_LIMIT = 5;

    shopper = (async () => {

        let getCashAmt = App.game.wallet.currencies[0];
        let getFarmPt = App.game.wallet.currencies[4];

        let getPrice = ind => ShopHandler.shopObservable().items[ind].price();
        let getBasePrice = ind => ShopHandler.shopObservable().items[ind].basePrice;
        let isBasePrice = ind => getPrice(ind) === getBasePrice(ind);
        let getPokeNo = ind => App.game.pokeballs.pokeballs[ind].quantity();

        while (shopping){
            ShopHandler.showShop(pokeMartShop)
            for (let i = 0; i <= 2; i++) {
                while (isBasePrice(i) &&
                    getCashAmt() >= getPrice(i) &&
                    getPokeNo(i) < POKEBALL_LIMIT
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 3; i <= 8; i++) {
                while (isBasePrice(i) &&
                    getCashAmt() >= getPrice(i) &&
                    player.itemList[ShopHandler.shopObservable().items[i].name]() < ITEM_LIMIT 
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 0; i < 5; i++) {
                ShopHandler.showShop(SinnohBerryMaster);
                while(isBasePrice(i) &&
                    getFarmPt() >= getPrice(i) &&
                    App.game.farming.mulchList[i]() <= MULCH_LIMIT
                ){
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            ShopHandler.showShop(SinnohBerryMaster);
            while (isBasePrice(5) &&
                getFarmPt() >= getPrice(5) &&
                App.game.farming.shovelAmt() < SHOVEL_LIMIT
            ) {
                ShopHandler.setSelected(5);
                ShopHandler.buyItem();
            }
            
            while (isBasePrice(6) &&
                getFarmPt() >= getPrice(6) &&
                App.game.farming.mulchShovelAmt() < SHOVEL_LIMIT
            ) {
                ShopHandler.setSelected(6);
                ShopHandler.buyItem();
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })()
}


shop_start();