javascript:( function() { 

    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));
 } 
    async function clickWhenReady(id) { while (!clickIfExist(id)) { await sleep(1);
 } } 
    function clickIfExist(id) { if (document.getElementById(id) == null) { return false;
 } document.getElementById(id).click();
 return true;
 } 
    async function eliteBuy() { while (true) { for (let i = 6;
 i >= 0;
 i--) { if (clickIfExist("upgrade-partner-fee-" + i)) { break;
 } } await sleep(10);
 } } 
    async function hitEnemy() { while (true) { clickIfExist("dpc-button");
 await sleep(10);
 } } 
    async function delayPrestige(ms) { await sleep(ms);
 await clickWhenReady("prestige-area-div").then(await clickWhenReady("prestige-ok-button"));
 } 
 autoBattler = (async () => { hitEnemy();
 await clickWhenReady("dpc-button");
 await clickWhenReady("dpc-button");
 await clickWhenReady("dpc-button");
 await clickWhenReady("dpc-button");
 await clickWhenReady("button-buy-multiplier-0");
 await clickWhenReady("upgrade-level-button");
 eliteBuy();
 for (let i = 0;
 i <= 5;
 i++) { clickWhenReady("upgrade-skill-button-" + i).then(await clickWhenReady("upgrade-skill-button-" + i)).then(await clickWhenReady("use-skill-button-" + i));
 } await delayPrestige(30 * 1000);
 });
 
    autoBattler();


})();
