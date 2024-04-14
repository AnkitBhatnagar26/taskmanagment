require("dotenv").config();

const task = require("../models/task");
// const userDetail = require("../models/userDetail");
const db = require("../db/db");

// const user = require("../models/user");

class TaskController {
  constructor() {}

  getAllTasks() {
    return new Promise((resolve, reject) => {
      task
        .find({})
        .then((data) => {
          console.log("DATA: ", data);
          if (data.length == 0) {
            resolve({
              code: 204,
              msg: "No Tasks found!!!",
            });
          } else {
            resolve({
              code: 200,
              result: data,
            });
          }
        })
        .catch((err) =>
          reject({
            code: 500,
            msg: `${err}`,
          })
        );
    });
  }

  addTask(req) {
    return new Promise(async (resolve, reject) => {
      if (!Object.keys(req.body).length) {
        reject({
          code: 400,
          msg: "No data passed in request body!!!",
        });
      } else if (!req.body.title || !req.body.description || !req.body.status) {
        reject({
          code: 400,
          msg: "Some of the fields are missing!!!",
        });
      } else {
        let data = {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
        };

        let Task = new task(data);
        Task.save()
          .then((data) => {
            resolve({
              code: 200,
              result: data,
            });
          })
          .catch((err) => {
            reject({
              code: 500,
              msg: `${err}`,
            });
          });
      }
    });
  }

  updateTask(req) {
    return new Promise(async (resolve, reject) => {
      if (!Object.keys(req.body).length) {
        reject({
          code: 400,
          msg: "No data passed in request body!!!",
        });
      } else if (!req.body.id) {
        reject({
          code: 400,
          msg: "task id missing!!!",
        });
      } else {
        var keys = Object.keys(req.body);
        var temp = {};
        keys.map((x) => {
          if (x != "_id") {
            temp[x] = req.body[x];
          }
        });
        if (Object.keys(temp).length > 0) {
          task
            .findOne({
              _id: req.body.id,
            })
            .then((result) => {
              if (result != null) {
                task
                  .update(
                    {
                      _id: req.body.id,
                    },
                    temp
                  )
                  .then(() => {
                    resolve({
                      code: 200,
                      result: "Update Successful!!!",
                    });
                  })
                  .catch((err) => {
                    reject({
                      code: 500,
                      msg: `${err}`,
                    });
                  });
              } else {
                reject({
                  code: 400,
                  msg: "task not found!!!",
                });
              }
            })
            .catch((err) => {
              reject({
                code: 500,
                msg: `${err}`,
              });
            });
        } else {
          reject({
            code: 400,
            msg: "Data to update not found!!!",
          });
        }
      }
    });
  }

  deleteTask(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.id) {
        reject({
          code: 400,
          msg: "Id missing!!!",
        });
      } else {
        task
          .findOne({
            _id: req.body.id,
          })
          .then((result) => {
            if (result != null) {
              task
                .deleteOne({
                  _id: req.body.id,
                })
                .then(() => {
                  resolve({
                    code: 200,
                    msg: "Delete Successful!!!",
                  });
                })
                .catch((err) => {
                  reject({
                    code: 500,
                    msg: `${err}`,
                  });
                });
            } else {
              reject({
                code: 400,
                msg: "Task not found!!!",
              });
            }
          })
          .catch((err) => {
            reject({
              code: 500,
              msg: `${err}`,
            });
          });
      }
    });
  }
}

module.exports = new TaskController();
