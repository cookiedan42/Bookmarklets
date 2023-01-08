selectAll = ()=> game.sidebar.upgrade_pane.select_die(this.game.dice);


resp = setInterval(()=>KeyBindings(game).roll(),1000);
clearInterval(resp);


game.purchase_die();


 buy: function(what) {
        var pane = this.game.sidebar.upgrade_pane;
        if(!pane.upgrade_targets().length) {
            return;
        }
        this.game.sidebar.set_pane(pane);

        pane.upgrader['onBuy' + what[0].toUpperCase() + what.slice(1)]();
    },

'q': buy('power'),
'w': buy('toMagic'),
'e': buy('toMaxSides'),
't': buy('multiplier'),



 var colorkeys = ['none', 'z','x','c','v','b','n'];
buyColor(v);
Die.colors = Array(7) [ "white", "red", "blue", "green", "yellow", "purple", "pink" ]
buyColor: function(color) {
        var pane = this.game.sidebar.upgrade_pane;
        if(!pane.upgrade_targets().length) {
            return;
        }

        this.game.sidebar.set_pane(pane);
        
        pane.upgrader.color_rows[color].buy_color();
        //console.log("pretending to click for ", color);
        //pane.upgrader.onColorClick(color);
    },





