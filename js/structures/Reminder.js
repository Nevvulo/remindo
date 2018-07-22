const Storage = require('./Storage.js')

class Reminder {
    constructor(reminder) {
        const last = this.lastReminder || {};
        console.log(last.id)
        let id = isNaN(Number(last.id+1)) ? 0 : Number(last.id + 1);
        this.id = id;
        this.title = reminder.title || null; //string
        this.description = reminder.description || null; //string
        this.attachments = reminder.attachments || null; //array
        this.created = reminder.createdAt || null; //date object
        this.updated = reminder.updatedAt || null; //date object
        this.color = reminder.color || null; //string or number/hex code
        this.font = reminder.font || null; //object that contains font.size, font.family and font.style (bold, italics, etc)
        this.completed = reminder.completed || null; //boolean
        this.dueDate = reminder.dueDate || null; //date object
        this.tags = reminder.tags || null; //object placeholder that will contain labels
        this.important = reminder.important || null; //boolean
        this.comments = reminder.comments || null; //array
    }

    get lastReminder() {
        const storage = new Storage({
            name: 'data',
            defaults: {
                "reminders": [],
                "todos": [],
                "tasks": []
            }
          });
        const reminders = storage.get("reminders").sort(item => item.id)
        console.log(reminders)
        console.log(reminders[reminders.length-1])
        return reminders[reminders.length-1];
    }
}

module.exports = Reminder;