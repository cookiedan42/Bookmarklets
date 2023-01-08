
//cheat
javascript:(function(){
    for (let y = 0; y < Mine.rewardGrid.length; y++) {
        let line = "";
        for (let x = 0; x < Mine.rewardGrid[0].length; x++) {
            if (Mine.rewardGrid[y][x] !=0){
                Mine.breakTile(y,x,5);
            }
        }
    };
    })();
    
//legit chisel
javascript:(function(){
    for (let y = 0; y < Mine.rewardGrid.length; y++) {
        let line = "";
        for (let x = 0; x < Mine.rewardGrid[0].length; x++) {
            if (Mine.rewardGrid[y][x] !=0){
                Mine.chisel(y,x);
            }
        }
    };
})();


//map
javascript:(function(){
    for (let y = 0; y < Mine.rewardGrid.length; y++) {
        let line = "";
        for (let x = 0; x < Mine.rewardGrid[0].length; x++) {
            if (Mine.rewardGrid[y][x] !=0){
                line+="X";
            } else {
                line += x%10;
            }
        }
        console.log(line);
    };
})();
