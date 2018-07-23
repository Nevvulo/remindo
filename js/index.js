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
        $('.grid-stack').on('dragstop', function(event, ui) {
            var grid = this;
            var element = event.target;
            saveGridPositions(grid, element)
        });
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
        position: {x: 0, y: 0, width: Math.floor(1 + 6 * Math.random()), height: Math.floor(1 + 5 * Math.random())},
        attachments: null,
        created: Date.now(),
        updated: Date.now(),
        color: $('#action-color-picker').val(),
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

function saveGridPositions(grid, element) {
    let reminders = storage.get("reminders");
    var node = $(element).data('_gridstack_node');
    if (!node) return;
    console.log($(element).data("objectId"))
    console.log(node)
    console.log(reminders[$(element).data("objectId")])
    reminders[$(element).data("objectId")].position = {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
    };
    storage.set("reminders", reminders)
    return false;
}

function populateReminderSection() {
    const grid = $('.grid-stack').data('gridstack');
    grid.removeAll();

    for (let reminder of storage.get("reminders")) {
        const position = reminder.position;
        let positions = position
        console.log(positions)
        if (!positions) positions = {x: 0, y: 0, width: Math.floor(1 + 6 * Math.random()), height: Math.floor(1 + 5 * Math.random())}
        console.log(reminder.color)
        grid.addWidget($(`<div data-object-id=${reminder.id}>
        <div style="overflow: hidden;" class="grid-stack-item-content card blue-grey darken-1" style="background-color: ${reminder.color} !important;">
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
        </div>`), positions.x, positions.y, positions.width, positions.height);
        console.log(positions.x)
        //Math.floor(1 + 3 * Math.random())
    }
}