const Storage = require('./js/structures/Storage.js')
const Reminder = require('./js/structures/Reminder.js')
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
        $('.loading').slideUp(750, function() {
            $(this).css("display", "none");
            $(this).remove();
        });
        
        $('.preloader-wrapper').addClass("fadeOutUp");
        $('.main-app').show(650)
        populateReminderSection();
    }, 1000)
    
    
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

function dialog(message, severity, buttons = []) {
    let color;
    let html = '';

    switch (severity) {
        case "critical":
            color = "red";
            severity = "Error";
            break;
        
        case "warning":
            color = "orange";
            severity = "Warning";
            break;
        
        case "info":
            color = "teal";
            severity = "Information";
            break;

        default:
            color = "blue-grey";
            severity = "Dialog";
    }

    html += `<div class="row dialog">
    <div class="col">
    <div class="card z-depth-5 ${color} darken-1">
        <div class="card-content white-text">
        <span class="card-title"><b>${severity}</b></span>
        <p>${message}</p>
        </div>
        <div class="card-action">
        <a href="#" class="btn green darken-2" onclick="viewReminder(this)">${buttons[0] || "Yes"}</a>
        <a href="#" class="btn red darken-1" onclick="markAsComplete(this)">${buttons[1] || "No"}</a>
        </div>
    </div>
    </div>
</div>`;
    html += '</div>';

    $('.main-app-dialog').html("");
    $('.main-app-dialog').html(html);

    dialogBlurBackground("main-app-dialog");
}

function dialogBlurBackground(dialog = "current-selected-dialog") {
    if ($(`.${dialog}`).is(":hidden")) {
        $(`.${dialog}`).show();
        $(`.main-app>*:not(.${dialog})`).addClass("blur");
        $(`.${dialog}`).addClass("current-selected-dialog");
        $(`.${dialog}`).removeClass("zoomOut");
        $(`.${dialog}`).addClass("zoomIn");
    } else {
        $(`.main-app>*:not(.${dialog})`).removeClass("blur");
        $(`.${dialog}`).removeClass("zoomIn");
        $(`.${dialog}`).addClass("zoomOut");
        $(`.${dialog}`).removeClass("current-selected-dialog");
        setTimeout(() => { $(`.${dialog}`).hide(); }, 600);
        return;
    }
}

function actionButtonClicked(element) {
    console.log(element)
    reminderCreationMenu();
}

function reminderCreationMenu() {
    const body = document.getElementsByTagName('body')[0];
    const elem = document.querySelectorAll('.creation-menu')[0];

    $('#action-color-picker').colorpicker({
        component: '.colorpicker-btn'
    });

    dialogBlurBackground("creation-menu");
}

function actionAddHandler(type) {
    const dataType = storage.get(`${type}s`)
    //TODO: use reminder structure instead of manually creating object
    const item = new Reminder({
        title: $('.reminder-creation-title').val(), //string
        description: $('.reminder-creation-description').val(), //string
        attachments: null,
        created: Date.now(),
        updated: Date.now(),
        color: null,
        font: null,
        completed: null,
        dueDate: null,
        tags: null,
        important: null,
        comments: null
    })
    dataType.push(item);
    return add(type, dataType);
}

function add(type, data) {
    //data is any object, like a reminder object
    storage.set(`${type}s`, data)
    populateReminderSection();
}

function markAsComplete(id) {
    //Implement an ID based system for reminders to remove reminders once created
    //Just pass in the reminder ID and remove/archive it 
    let reminders = storage.get("reminders");
    console.log(reminders)
    console.log(reminders.filter(item => item.id != id))
    storage.set("reminders", reminders.filter(item => item.id != id)); 

    populateReminderSection();
}

function populateReminderSection() {
    console.log($('.grid-stack'))
    const grid = $('.grid-stack').data('gridstack');
    grid.removeAll();
    for (let reminder of storage.get("reminders")) {
        grid.addWidget($(`<div>
        <div style="overflow: hidden;" class="grid-stack-item-content card blue-grey darken-1" style="background-color: ${reminder.color}">
            <div class="card-content white-text">
                <span class="card-title">
                <b>${reminder.title}</b>
                </span>
                <p>${reminder.description}</p>
            </div>
            <div class="card-action">
                <a href="#" class="btn yellow darken-3" onclick="viewReminder(${reminder.id})">View</a>
                <a href="#" class="btn green lighten-1" onclick="markAsComplete(${reminder.id})">Mark as completed</a>
            </div>
        </div>
        </div>`), 0, 0, Math.floor(1 + 3 * Math.random()), Math.floor(1 + 3 * Math.random()), true);
    }
}