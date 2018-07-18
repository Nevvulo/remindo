class Reminder {
    constructor(reminder) {
        this.id = reminder.id || 0
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

}

module.exports = Reminder;