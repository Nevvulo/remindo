const Storage = require('./js/structures/Storage.js')
const storage = new Storage({
    name: 'data',
    defaults: {
        "reminders": [],
        "todos": [],
        "tasks": []
    }
  });

$(document).ready(function() {
    load();
});

function load() {
    setTimeout(() => {
        $('.loading').addClass("fadeOut");
        $('.preloader-wrapper').addClass("fadeOutUp");
        $('.main-app').show(650);
    }, 1000)
    populateReminderSection();
}

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });

    $('.main-app').hide();

    setTimeout(() => {
        $('.preloader-wrapper').show();
        $('.preloader-wrapper').addClass("fadeInUp");
    }, 600)

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

function populateReminderSection() {
    console.log("RENDERING");
    let html = '';
    for (let reminder of storage.data.reminders) {
        html += `<div class="row">
        <div class="col">
        <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <span class="card-title"><b>${reminder.title}</b></span>
            <p>${reminder.description}</p>
            </div>
            <div class="card-action">
            <a href="#" class="btn yellow darken-3" onclick="viewReminder(this)">View</a>
            <a href="#" class="btn green lighten-1" onclick="markAsComplete(this)">Mark as completed</a>
            </div>
        </div>
        </div>
    </div>`;
        html += '</div>';
    }
    $('.reminder-container').html(html);
}