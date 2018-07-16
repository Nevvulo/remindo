const Storage = require('./js/structures/Storage.js')

const data = new Storage({
    name: 'data',
    defaults: {
        "reminders": [],
        "todos": [],
        "tasks": []
    }
  });

function load() {
    $('body>*:not(.loading)').hide();
    setTimeout(() => { 
        $('.preloader-wrapper').show();
        $('.preloader-wrapper').addClass("fadeInUp");
    }, 600)
    //$('.loading').addClass("zoomOut");
}

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
    load();
  });

function actionButtonClicked(element) {
    console.log(element)
    reminderCreationMenu();
}

function reminderCreationMenu() {
    const body = document.getElementsByTagName('body')[0];
    const elem = document.querySelectorAll('.creation-menu')[0];
    if ($('.creation-menu').is(":hidden")) {
        $('.creation-menu').show();
        $('body>*:not(.creation-menu)').addClass("blur");
        $('.creation-menu').removeClass("flipOutX");
        $('.creation-menu').addClass("flipInX");
    } else {
        $('body>*:not(.creation-menu)').removeClass("blur");
        $('.creation-menu').removeClass("flipInX");
        $('.creation-menu').addClass("flipOutX");
        setTimeout(() => { $('.creation-menu').hide(); }, 600);
        return;
    }

    
}