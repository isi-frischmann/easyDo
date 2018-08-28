const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please fill out - otherwise you don't have something to do"], minlength: [3]
        },
    description: {type: String},
    date: {type: String},
    // userID: [UserSchema]
    }, { timestamps: true });

    // create collection for ToDo
    mongoose.model('ToDo', ToDoSchema);
    

// create new Schema for User
const UserSchema = new mongoose.Schema({
    fname: { type: String, required: [true, 'Firstname is required'],  minlength: [3, "First name needs to have more then 3 characters"] },
    lname: { type: String, required: [true, 'Firstname is required'] },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    confirmPassword: String,
    tasks: [ToDoSchema]
}, {timestamps: true})

// create collection
mongoose.model('User', UserSchema);
var User = mongoose.model('User');