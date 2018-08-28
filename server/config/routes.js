const toDoCtrl = require('./../controllers/toDo.ctrl.js');

module.exports = (app) => {

    // register a new User
    app.post('/user', function(newUser, res){
        console.log('request body in the routes', newUser.body)
        toDoCtrl.createUser(newUser, res);
    })

    // login a user
    app.post('/login/', function(userCredentials, res){
        console.log("In the routes for login", userCredentials.body.email);
        toDoCtrl.userLogin(userCredentials, res);
    })

    app.get('/tasks', function(req, res){
        toDoCtrl.showTasks(req, res)
    })

    app.post('/task/new', function(newTask, res){
        // console.log("I'll create a task if you're bored", newTask[0]);
        toDoCtrl.newTask(newTask, res);
    })

    app.delete('/delete/task/:taskID', function(req, res){
        console.log("in the routes to delete the task");
        toDoCtrl.delete(req, res);
    })

    app.put('/task/edit/:id', function(req, res) {
        console.log("Route", req.params.id);
        toDoCtrl.update(req, res);
    })

    app.get('/user/logout', function(req, res){
        toDoCtrl.logout(req, res);
    })
}