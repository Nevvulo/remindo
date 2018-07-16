class Reminder {
    constructor(reminder) {
        this.title = reminder.title; //string
        this.description = reminder.description; //string
        this.attachments = reminder.attachments; //array
        this.created = reminder.createdAt; //date object
        this.updated = reminder.updatedAt; //date object
        this.color = reminder.cosmetics.color; //string or number/hex code
        this.font = reminder.cosmetics.font; //object that contains font.size, font.family and font.style (bold, italics, etc)
        this.completed = reminder.completed; //boolean
        this.dueDate = reminder.dueDate; //date object
        this.tags = reminder.tags; //object placeholder that will contain labels
        this.important = reminder.important; //boolean
        this.comments = reminder.comments; //array
    }

}

module.exports = Reminder;