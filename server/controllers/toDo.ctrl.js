var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var Task = mongoose.model('ToDo');
// var today = new Date();

module.exports = {
    //  creat new user by register
    createUser: function (newUser, res) {
        // console.log("Now I'm in the ctrl and doing nothing my dear", newUser.password);
        if (newUser.body.password == newUser.body.c_pw) {
            bcrypt.hash(newUser.body.password, 10, function (err, hashedPassw) { //10 = hash the password with 10 values
                if (err) {
                    for (var key in err.errors) {
                        newUser.flash('addNewUser', err.errors[key].message);
                        // console.log("im inside the error", err);
                    }
                }
                else { //check if email address already exist in db
                    User.findOne({ email: newUser.body.email }, function (err, oneUser) {
                        if (err) {
                            for (var key in err.errors) {
                                newUser.flash('addNewUser', err.errors[key].message);
                                // console.log("im inside the error", err);
                            }
                            res.json({ message: "Find a user" });
                        }
                        else {
                            // oneUser only exists in this if statement
                            if (oneUser) {
                                console.log("Email already exists");
                                res.json({ message: "Email already exists", user: oneUser });
                            }
                            else { //create a new user
                                console.log("I creat a new user now");
                                User.create({
                                    fname: newUser.body.fname,
                                    lname: newUser.body.lname,
                                    email: newUser.body.email,
                                    password: hashedPassw,
                                    // confirmPassword: newUser.body.c_pw,
                                }, function (err, user) {
                                    // as mention before oneUser doesn't exists here that's why you have to return user:user
                                    if (err) { //if there is an error send error message
                                        for (var key in err.errors) {
                                            newUser.flash('addNewUser', err.errors[key].message);
                                            // console.log("im inside the error", err);
                                        }
                                        res.json({ message: "Error with creating a new user" });
                                    }
                                    else { //if there is no error set the user id to session id 
                                        newUser.session.userId = user._id;
                                        newUser.session.fname = user.fname;
                                        console.log("Password is hashed: ", user.password);
                                        res.json({ message: "User is created", user: user });
                                    }
                                })
                            }
                        }

                    })
                }
            })
        }
        else {
            res.json({ user: oneUser });
        }
    },

    userLogin: function (userCredentials, res) {
        // console.log("Check if user exist", userCredentials.body.email)
        var password = '';
        // check if email exists in db
        User.findOne({ email: userCredentials.body.email })
            .then(user => {
                if (!user) {
                    console.log("I'm not even checking if you exist :P");
                    // userCredentials.flash('logInUser', 'User does not exists');
                    res.json({ message: "No User exist in DB" });
                }
                else {
                    if (user) {
                        // console.log("Email exist in DB and now check the bcrypt password");
                        // console.log("Testing my sessions!!!!!!!!!!", userCredentials.session);
                        // check if saved hashed password matches insertes password in the form
                        bcrypt.compare(userCredentials.body.password, user.password)
                            .then(result => {
                                console.log(user);
                                if (result) {
                                    // console.log('result OK session ===>', userCredentials.session.userId);
                                    userCredentials.session.userId = user._id;
                                    userCredentials.session.fname = user.fname;
                                    // console.log('NEW SESSION ID ------->', userCredentials.session.userId);
                                    // console.log("That's the sessionID and also userID---------", user._id);
                                    res.json({ message: "OK login", user: user });
                                }
                                else {
                                    userCredentials.flash('logInUser', 'You can not login, because your password is wrong');
                                    res.json({ message: "Login failed" });
                                }
                            })
                    }
                }
            })
    },

    showTasks: function (req, res) {
        // console.log("In the showTASKS@@@@@@@@@@@@@@@@@@@@@@@@@@", req.body);
        Task.find({}, (err, task) => {
            if (err) {
                console.log("Can't show you the tasks from the controller side")
                res.json({ message: "Error", error: err })
            }
            else {
                console.log("These are all the tasks");
                res.json({ Message: "User with TASKS", task: task })
            }

        });
    },

    newTask: function (req, res) {
        console.log("I'm creating a new Task", req.body.date);
        var doneDate = req.body.date.toString();
        console.log("The date now with String", doneDate)
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1 //January is 0 that's why + 1 
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        console.log("Thats the new date", today);

        if (doneDate < today && doneDate <= today) {
                res.json({message: "Task can't be created as the date is in the past. It needs to be in the future" })
        }
        else {
            var newTask = new Task({
                task: req.body.task,
                date: req.body.date,
                description: req.body.desc,
            })
            newTask.save(function (err, newTask) {
                if (err) {
                    console.log("I can't create a new Task");
                    res.json({ message: "Error", error: err });
                }
                else {
                    console.log("Task is created", req.body.task);
                    res.json({ message: "Success" });
                }
            })
        }
        // }

    },

    delete: function (req, res) {
        console.log("in the controller for delete", req.params.taskID)
        Task.findOneAndRemove({ _id: req.params.taskID }, function (err, task) {
            console.log("HERE", task);
            if (err) {
                console.log("in the controller and task not found", req.params.taskID);
                res.json({ message: "Can't find a task to delete", err });
            }
            else {
                res.json({ message: "Task is deleted" });
            }
        })
    },

    // update a Task
    update: function (req, res) {
        console.log("I'm going to udpate params:", req.params.id);
        Task.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
            if (err) {
                res.json({ message: "Error in edit controller", error: err });
            }
            else {
                User.findOneAndUpdate({ _id: req.session.userId }, { $pull: { tasks: { _id: req.params.id } } }, function (err) {
                    if (err) {
                        res.json(err);
                    } else {
                        Task.findById({ _id: req.params.id }, function (err, task) {
                            if (err) {
                                res.json(err);
                            } else {
                                User.findOneAndUpdate({ _id: req.session.userId }, { $push: { tasks: task } }, err => {
                                    if (err) {
                                        res.json({ message: "error", err });
                                    }
                                    else {
                                        res.json({ message: "Success", task: task });
                                    }
                                })
                            }
                        })
                    }
                });

            }
        })
    },

    logout: function (req, res) {
        console.log("in the controller for logout", req.session)
        req.session.destroy(function (err) {
            if (err) {
                res.json({ message: "error in the logout", error: err })
            }
            else {
                console.log("in the logout controller");
                res.json({ message: "Let's logout" })
            }
        })
    }
}

