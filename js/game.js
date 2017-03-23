/*** Created by KH on 19/03/2017.*/

// Check if Jquery is loaded
if (typeof jQuery === 'undefined') {
    console.log('jQuery hasn\'t loaded');
} else {
    console.log('jQuery has loaded');
}

// Variables
var addlog,
    iscultivating = 0,
    isexploring = 0,
    bkfailmin = 0,
    bkfailmax = 0,
    bkloss = 0,
    isdead = 0;

var player =
    {
        name: "Stranger",
        bloodline: 0,
        body: 0,
        technique: 0,
        realm: 0,
        cycle: 0,
        cultivateplace: 0,
        strength: 1,
        dexterity: 1,
        vitality: 1,
        luck: 1,
        luckhelper: 1,
        health: 100,
        maxhealth: 100,
        regen: 1,
        attack: 30,
        defence: 10,
        cultivation: 0,
        cultivationbase: 1,
        cultivationrate: 1,
        cultivationmax: 100,
        karma: 0,
        knowstechnique1: 0,
        knowstechnique2: 0,
        knowstechnique3: 0,
        knowstechnique4: 0,
        knowstechnique5: 0,
        knowstechnique6: 0,
        knowstechnique7: 0,
        knowstechnique8: 0,
        knowstechnique9: 0,
        spiritstones: 0,
        exploreplace: 0,
        gameloaded: 0

    };

var encountermob = {
    name: "Default",
    id: 0,
    attack: 0,
    defence: 0,
    health: 0
};

//Arrays
//Bloodlines: Need Name, Description and Cultivationbonus
_bloodlines = [
    {
        name: "an Ordinary Human Bloodline",
        description: "You possess the bloodline of an ordinary human.",
        cultivationbonus: 1
    }
];

//Realms: Need Name, Description and cultivationmax and a breakthroughchance
_realms = [
    {
        name: "Mortal Realm",
        description: "The first realm in the road of a cultivator.",
        cultivationmax: 100,
        breakthroughchance: 100
    },
    {
        name: "Novice Saint Realm",
        description: "You have ascended the Mortal Realm and started to walk the true path of the Dao.",
        cultivationmax: 1500,
        breakthroughchance: 90
    },
    {
        name: "Profound Saint Realm",
        description: "You start gaining insight on the profoundness of the Dao.",
        cultivationmax: 22500,
        breakthroughchance: 80
    },
    {
        name: "Earth Saint Realm",
        description: "You start gaining insight into the laws of the earth.",
        cultivationmax: 337500,
        breakthroughchance: 70
    },
    {
        name: "Heaven Saint Realm",
        description: "You start gaining insight into the laws of heaven.",
        cultivationmax: 5062500,
        breakthroughchance: 60
    },
    {
        name: "Great Saint Realm",
        description: "You have transcended the laws of heaven and earth and became a Great Saint.",
        cultivationmax: 75937500,
        breakthroughchance: 50
    },
    {
        name: "Novice Emperor Realm",
        description: "Placeholder",
        cultivationmax: 1139062500,
        breakthroughchance: 40
    },
    {
        name: "Profound Emperor Realm",
        description: "Placeholder",
        cultivationmax: 17085937500,
        breakthroughchance: 30
    },
    {
        name: "Earth Emperor Realm",
        description: "Placeholder",
        cultivationmax: 256289062500,
        breakthroughchance: 20
    },
    {
        name: "Heaven Emperor Realm",
        description: "Placeholder",
        cultivationmax: 3844335937500,
        breakthroughchance: 15
    },
    {
        name: "Profound Emperor Realm",
        description: "Placeholder",
        cultivationmax: 57665039062500,
        breakthroughchance: 10
    },
    {
        name: "Great Emperor Realm",
        description: "Placeholder.",
        cultivationmax: 864975585937500,
        breakthroughchance: 5
    },
    {
        name: "Divine Realm",
        description: "Placeholder",
        cultivationmax: 1.29746337890625e+16,
        breakthroughchance: 1
    }
];

//Cycles: Need Name, Description and cultivationmax (multiplier)
_cycles = [
    {
        name: "First Cycle",
        description: "The First Cycle of the ",
        cultivationmax: 1
    },
    {
        name: "Second Cycle",
        description: "The Second Cycle of the ",
        cultivationmax: 2
    },
    {
        name: "Third Cycle",
        description: "The First Cycle of the ",
        cultivationmax: 3
    },
    {
        name: "Fourth Cycle",
        description: "The Fourth Cycle of the ",
        cultivationmax: 4
    },
    {
        name: "Fifth Cycle",
        description: "The Fifth Cycle of the ",
        cultivationmax: 5
    },
    {
        name: "Sixth Cycle",
        description: "The Sixth Cycle of the ",
        cultivationmax: 6
    },
    {
        name: "Seventh Cycle",
        description: "The Seventh Cycle of the ",
        cultivationmax: 7
    },
    {
        name: "Eighth Cycle",
        description: "The First Eighth of the ",
        cultivationmax: 8
    },
    {
        name: "Ninth Cycle",
        description: "The Ninth Cycle of the ",
        cultivationmax: 9
    }

];

//Bodies: Need Name, Description and cultivationbonus
_bodies = [
    {
        name: "an Ordinary Human Body",
        description: "You possess the body of an ordinary human.",
        cultivationbonus: 1
    }
];

//Cultivationplaces: Need Name, Description and cultivationbonus
_cultivationplaces = [
    {
        name: "Songyan Village",
        description: "Home Village",
        cultivationbonus: 0
    }
];

_explorationplaces = [
    {
        name: "Songyan Forest",
        description: "Forest outside your Home Village",
        treasurerate: 10,
        treasuretier: 1,
        encounterchance: 20,
        encountertier: 1
    }
];

_cultivationtechniques = [
    {
        name: "Mortal Cultivation Technique",
        description: "An ordinary cultivation Technique",
        cultivationbonus: 0,
        level: 1,
        insight: 0,
        insightmax: 100
    },
    {
        name: "Dragonfire Cultivation Technique",
        description: "An ordinary cultivation Technique",
        cultivationbonus: 100,
        level: 1,
        insight: 0,
        insightmax: 1000
    }
];

_battlemonsters = [
    {
        name: "Wolf",
        description: "Description",
        attacklow: 3,
        attackhigh: 8,
        defencelow: 1,
        defencehigh: 5,
        healthlow: 50,
        healthhigh: 100
    }
];

function resetGame() {
    var player =
        {
            name: "Stranger",
            bloodline: 0,
            body: 0,
            technique: 0,
            realm: 0,
            cycle: 0,
            cultivateplace: 0,
            strength: 1,
            dexterity: 1,
            vitality: 1,
            luck: 1,
            luckhelper: 1,
            health: 100,
            maxhealth: 100,
            regen: 1,
            attack: 30,
            defence: 10,
            cultivation: 0,
            cultivationbase: 1,
            cultivationrate: 1,
            cultivationmax: 100,
            karma: 0,
            knowstechnique1: 0,
            knowstechnique2: 0,
            knowstechnique3: 0,
            knowstechnique4: 0,
            knowstechnique5: 0,
            knowstechnique6: 0,
            knowstechnique7: 0,
            knowstechnique8: 0,
            knowstechnique9: 0,
            spiritstones: 0,
            exploreplace: 0,
            gameloaded: 0
        };
}

//On document ready
$(document).ready(function () {
    loadGame();
    updateStats();
    $(".breakthrough").hide();
    $(".fightbtn").hide();
    $(".fleebtn").hide();
    console.log('ready!');

});


//JQUERY
$(function () {

    $(".showcultivationitems").on("click", function () {
        $(".cultivationitems").toggle();
        if ($(".showcultivationitems").text() === "Hide Cultivation Items") {
            $(".showcultivationitems").text('Show Cultivation Items');
        }
        else {
            $(".showcultivationitems").text('Hide Cultivation Items');
        }
    });
    $(".showcultivationtechniques").on("click", function () {
        $(".cultivationtechniques").toggle();
        if ($(".showcultivationtechniques").text() === "Hide Cultivation Techniques") {
            $(".showcultivationtechniques").text('Show Cultivation Techniques');
        }
        else {
            $(".showcultivationtechniques").text('Hide Cultivation Techniques');
        }

    });
    $(".showkeyitems").on("click", function () {
        $(".keyitems").toggle();
        if ($(".showkeyitems").text() === "Hide Keyitems") {
            $(".showkeyitems").text('Show Keyitems');
        }
        else {
            $(".showkeyitems").text('Hide Keyitems');
        }
    });
    $(".showlocations").on("click", function () {
        $(".locations").toggle();
        if ($(".showlocations").text() === "Hide Locations") {
            $(".showlocations").text('Show Locations');
        }
        else {
            $(".showlocations").text('Hide Locations');
        }
    });
    $(".breakthrough").on("click", function () {
        if (player.cultivation >= player.cultivationmax) {
            if (chance.bool({likelihood: _realms[player.realm].breakthroughchance}) === true) {
                if (player.cycle === 8) {
                    player.realm++;
                    player.cycle = 0;
                    addlog = "You have entered a new realm!";
                    $(".breakthrough").toggle();
                }
                else {
                    player.cycle++;
                    addlog = "You have entered a new cycle!";
                    $(".breakthrough").toggle();

                }
                player.cultivation = 0;
            }
            else {
                bkloss = chance.integer({min: bkfailmin, max: bkfailmax});
                player.cultivation -= bkloss;
                addlog = "You failed to breakthrough and lost " + bkloss + " cultivation!";
                $(".breakthrough").toggle();

            }
            appendDOM(addlog);
        }

    });
    $(".cultivatebtn").on("click", function () {
        if (iscultivating === 0) {
            iscultivating = 1;
            isexploring = 0;

        }
        else {
            iscultivating = 0;
        }
    });

    $(".explorebtn").on("click", function () {
        if (isexploring === 0) {
            isexploring = 1;
            iscultivating = 0;

        }
        else {
            isexploring = 0;
        }
    });
    $(".loadbtn").on("click", function () {
        loadGame();
    });
    $(".savebtn").on("click", function () {
        saveGame();
    });
    $(".fleebtn").on("click", function () {
        addlog = "You decided to flee.";
        appendDOM(addlog);
        isexploring = 1;
        $(".fightbtn").toggle();
        $(".fleebtn").toggle();
        $(".explorebtn").toggleDisabled();
    });
    $(".fightbtn").on("click", function () {
        addlog = "You decided to fight.";
        appendDOM(addlog);
        $(".fightbtn").toggle();
        $(".fleebtn").toggle();
        battle();
    });

});

//Function to update and Bind stats to HTML
function updateStats() {
    $('.playername').html(player.name);
    $('.playerhealth').html(player.health);
    $('.encountnerhealth').html(encountermob.health);
    $('.playercultivation').html(player.cultivation);
    $('.playercultivationmax').html(player.cultivationmax);
    $('.playerrealm').html(_cycles[player.cycle].description + _realms[player.realm].name);
    $('.technique0').html(_cultivationtechniques[0].insight + "|" + _cultivationtechniques[0].insightmax);
    $('.technique0lvl').html(_cultivationtechniques[0].level);
    $('.technique0btn').attr('aria-label', "A Technique that can be learned by anyone");
    $('.cultivatebtn').attr('aria-label', player.cultivationrate + " per second");
    $('.explorebtn').attr('aria-label', "Explore " + _explorationplaces[player.exploreplace].name);
    $('.playerbloodline')
        .html(_bloodlines[player.bloodline].name)
        .attr('aria-label', _bloodlines[player.bloodline].description);
    $('.playerplace')
        .html(_cultivationplaces[player.cultivateplace].name)
        .attr('aria-label', _cultivationplaces[player.cultivateplace].description);
    $('.playerbody')
        .html(_bodies[player.body].name)
        .attr('aria-label', _bodies[player.body].description);
    $('.playertechnique')
        .html(_cultivationtechniques[player.technique].name)
        .attr('aria-label', _cultivationtechniques[player.technique].description);
    $('.breakthrough').attr('aria-label', _realms[player.realm].breakthroughchance + "% Chance to Breakthrough");
}

//Get Cultivation Max Function
function getCultivationmax() {
    player.cultivationmax = _realms[player.realm].cultivationmax * _cycles[player.cycle].cultivationmax;
    bkfailmin = player.cultivationmax / 25;
    bkfailmax = player.cultivationmax / 3;
}

//Get Cultivationrate Function
function getCultivationrate() {
    player.cultivationrate = (player.cultivationbase + _cultivationplaces[player.cultivateplace].cultivationbonus + (_cultivationtechniques[player.technique].cultivationbonus * _cultivationtechniques[player.technique].level)) * _bloodlines[player.bloodline].cultivationbonus * _bodies[player.body].cultivationbonus;
}

//Cultivation Function
function cultivate() {
    getCultivationrate();
    player.cultivation += player.cultivationrate;
    addlog = "Cultivation increased by " + player.cultivationrate;
    appendDOM(addlog);
    if (chance.bool({likelihood: player.luck / 100}) === true) {
        gainInsight();

    }
    if (player.health < player.maxhealth) {
        player.health += player.regen;
        addlog = "Health increased by " + player.regen;
    }
}

//Insight Function
function gainInsight() {
    _cultivationtechniques[player.technique].insight += chance.integer({min: 1, max: 20});
    if (_cultivationtechniques[player.technique].insight >= _cultivationtechniques[player.technique].level * _cultivationtechniques[player.technique].insightmax) {
        _cultivationtechniques[player.technique].insight = 0;
        _cultivationtechniques[player.technique].level++;
        addlog = "You have gained some Insight on your cultivation technique!";
        appendDOM(addlog);
    }
}

//Explore Function
function explore() {
    if (chance.bool({likelihood: player.luck / 100}) === true) {
        gainInsight();
    }
    if (chance.bool({likelihood: _explorationplaces[player.exploreplace].encounterchance * player.luck * player.luckhelper}) === true) {
        $(".fightbtn").toggle();
        $(".fleebtn").toggle();
        isexploring = 0;
        player.luckhelper = 1;
        addlog = "Battle";
        appendDOM(addlog);
        $(".explorebtn").toggleDisabled();
    }

    if (chance.bool({likelihood: _explorationplaces[player.exploreplace].treasurerate * player.luck}) === true) {
        getLoot();
        player.luckhelper = 1;
        isexploring = 0;
        addlog = "Loot";
        appendDOM(addlog);
    }
    if (isexploring === 1) {
        addlog = "You found nothing";
        appendDOM(addlog);
        player.luckhelper++;
    }
}

//Battle Function
async;
function battle() {
    switch (_explorationplaces[player.exploreplace].encountertier) {
        case 1:
            encountermob.id = chance.integer({min: 0, max: 0});

    }
    encountermob.name = _battlemonsters[encountermob.id].name;
    encountermob.attack = chance.integer({
        min: _battlemonsters[encountermob.id].attacklow,
        max: _battlemonsters[encountermob.id].attackhigh
    });
    encountermob.defence = chance.integer({
        min: _battlemonsters[encountermob.id].defencelow,
        max: _battlemonsters[encountermob.id].defencehigh
    });
    encountermob.health = chance.integer({
        min: _battlemonsters[encountermob.id].healthlow,
        max: _battlemonsters[encountermob.id].healthhigh
    });
    while (encountermob.health > 0) {
        encountermob.health -= player.attack - encountermob.defence;
        addlog = encountermob.name + " took " + (player.attack - encountermob.defence) + " damage!";
        appendDOM(addlog);
        await;
        sleep(1000);

        if (encountermob.attack - player.defence > 0) {
            player.health -= encountermob.attack - player.defence;
            addlog = player.name + " took " + (encountermob.attack - player.defence) + " damage!";
            appendDOM(addlog);
            await;
            sleep(1000);

        }
        else {
            addlog = "Your defences are superior, you took no damage!";
            appendDOM(addlog);
            await;
            sleep(1000);

        }
        if (player.health <= 0) {
            addlog = "You died!";
            isdead = 1;
            break;
        }

        updateStats();

    }
    $(".explorebtn").toggleDisabled();
}

//Get loot Function
function getLoot() {

}

// Game Loop
window.setInterval(function () {
    if (player.name === "Stranger") {
        player.name = chance.pickone(['Shao ', 'Xiao ', 'Zhen ', 'Cheng ', 'Tao ', 'Xue ', 'Yan ', 'Yuan ', 'Cai ', 'Zhao ', 'Ming ']);
        player.name = player.name + chance.pickone(['Shi', 'Ling', 'Tang', 'Chen', 'Hua', 'Feng', 'Meng', 'Huang', 'Xue', 'Mu', 'Ming', 'Bai']);
    }
    getCultivationmax();
    if (player.cultivation >= player.cultivationmax) {
        $('.breakthrough').show();
        iscultivating = 0;
        player.cultivation = player.cultivationmax;


    }
    if (iscultivating === 1) {
        cultivate();
        $(".cultivatebtn").text('Stop Cultivating');
    }
    else {
        $(".cultivatebtn").text('Start Cultivating');
    }
    if (isexploring === 1) {
        explore();
        $(".explorebtn").text('Stop Exploring');

    }
    else {
        $(".explorebtn").text('Start Exploring');
    }

    updateStats();
    saveGame();


}, 1000);

//Random things

// Sleep
function sleep(ms) {
    return new Promise(resolve = > setTimeout(resolve, ms);
)
}

//ScrollToBottom for the Log
function scrollToBottom() {
    //noinspection JSJQueryEfficiency,JSJQueryEfficiency
    $('#TerminalDOM').scrollTop($('#TerminalDOM')[0].scrollHeight);
}

//Saving and Loading
function saveGame() {
    localStorage.setItem("save", JSON.stringify(player));
}
function loadGame() {
    $.extend(true, player, JSON.parse(localStorage.getItem('save')));
}

//Tab function
$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
});

//Function to clean log
function cleanDOM() {
    var begin = new Date().getTime();
    var terminal = $('#TerminalDOM')[0];
    while (terminal.firstChild) {
        terminal.removeChild(terminal.firstChild);
    }
    var end = new Date().getTime();

    //noinspection JSJQueryEfficiency
    $('#ResultDOMClean').empty();
    //noinspection JSJQueryEfficiency
    $('#ResultDOMClean').append((end - begin) + 'ms');
}

//Function to add log
function appendDOM(addlog) {
    var terminal = $('#TerminalDOM')[0];

    terminal.appendChild(document.createTextNode(addlog));
    terminal.appendChild(document.createElement('br'));
    scrollToBottom()
}

//Disable Toggle Function
(function ($) {
    $.fn.toggleDisabled = function () {
        return this.each(function () {
            var $this = $(this);
            if ($this.attr('disabled')) $this.removeAttr('disabled');
            else $this.attr('disabled', 'disabled');
        });
    };
})(jQuery);