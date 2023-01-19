let shopper = (async () => { })();
let shopping = true;


async function shop_stop(){
    shopping = false;
    await shopper;
    shopping = true;

}

async function shop_start() {
    await shop_stop();

    shopper = (async () => {
        let isBasePrice = (sh,index) => {return (
            sh[index].price() ===
            sh[index].basePrice
        ); }
        while (shopping){
            ShopHandler.showShop(pokeMartShop)
            for (let i = 0; i <= 2; i++) {
                while (isBasePrice(ShopHandler.shopObservable().items,i) &&
                App.game.pokeballs.pokeballs[i].quantity() < 100000
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 3; i <= 8; i++) {
                while (isBasePrice(ShopHandler.shopObservable().items,i) &&
                player.itemList[ShopHandler.shopObservable().items[i].name]() < 1000
                ) {
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            for (let i = 0; i < 5; i++) {
                ShopHandler.showShop(SinnohBerryMaster);
                while(isBasePrice(ShopHandler.shopObservable().items,i) &&
                    App.game.farming.mulchList[i]() <=5000 &&
                    App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[i].price()
                ){
                    ShopHandler.setSelected(i);
                    ShopHandler.buyItem();
                }
            }

            ShopHandler.showShop(SinnohBerryMaster);
            while (isBasePrice(ShopHandler.shopObservable().items,5) &&
                App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[5].price() &&
                App.game.farming.shovelAmt() < 500
            ) {
                ShopHandler.setSelected(5);
                ShopHandler.buyItem();
            }
            
            while (isBasePrice(ShopHandler.shopObservable().items,6) &&
                App.game.wallet.currencies[4]()>= ShopHandler.shopObservable().items[6].price() &&
                App.game.farming.mulchShovelAmt() < 500
            ) {
                ShopHandler.setSelected(6);
                ShopHandler.buyItem();
            }



            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    })()
}


shop_start();