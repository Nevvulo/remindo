const Storage = require('./js/structures/Storage.js')

const data = new Storage({
    name: 'data',
    defaults: {
        "reminders": [],
        "todos": [],
        "tasks": []
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
  });

function actionButtonClicked(element) {
    console.log(element)
    reminderCreationMenu();
}

function reminderCreationMenu() {
    const body = document.getElementsByTagName('body')[0];
    const elem = document.querySelectorAll('.creation-menu')[0];
    if (elem.style.display === "none") {
        elem.style.display = "block";
        $('body>*:not(.creation-menu)').addClass("blur");
    } else {
        elem.style.display = "none";
        $('body>*:not(.creation-menu)').removeClass("blur");
        return;
    }

    
}