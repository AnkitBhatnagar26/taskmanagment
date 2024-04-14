const router = require("express").Router();

const TaskController = require("../controllers/taskController");

let resHandler = require("../handlers/responseHandler");
// const checkAuth = require("../middlewares/auth");
// const checkRole = require("../middlewares/roles");

function getAllTasks(req, res) {
  TaskController.getAllTasks(req)
    .then((data) => {
      if (data.code == 204) {
        res
          .status(200)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      } else {
        res
          .status(data.code)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      }
    })
    .catch((error) => {
      res.status(error.code).json(resHandler(error.code, error.msg));
    });
}

function addTask(req, res) {
  TaskController.addTask(req)
    .then((data) => {
      if (data.code == 204) {
        res
          .status(200)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      } else {
        res
          .status(data.code)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      }
    })
    .catch((error) => {
      res.status(error.code).json(resHandler(error.code, error.msg));
    });
}

function updateTask(req, res) {
  TaskController.updateTask(req)
    .then((data) => {
      if (data.code == 204) {
        res
          .status(200)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      } else {
        res
          .status(data.code)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      }
    })
    .catch((error) => {
      res.status(error.code).json(resHandler(error.code, error.msg));
    });
}

function deleteTask(req, res) {
  TaskController.deleteTask(req)
    .then((data) => {
      if (data.code == 204) {
        res
          .status(200)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      } else {
        res
          .status(data.code)
          .json(resHandler(data.code, data.result ? data.result : data.msg));
      }
    })
    .catch((error) => {
      res.status(error.code).json(resHandler(error.code, error.msg));
    });
}

/**
 * @swagger
 * /api/task:
 *  get:
 *    tags:
 *      - Task
 *    description: Get All Tasks
 *    parameters:
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 */
router.get("/", getAllTasks);

/**
 * @swagger
 * /api/task/:
 *  post:
 *    tags:
 *      - Task
 *    description: Add new Task
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: Task body that needs to be saved
 *      schema:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 */
router.post("/", addTask);

/**
 * @swagger
 * /api/task:
 *  put:
 *    tags:
 *      - Task
 *    description: Update an existing task
 *    parameters:
 *    - in: body
 *      name: body
 *      description: updated task's body.
 *      schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 */
router.put("/", updateTask);

/**
 * @swagger
 * /api/task:
 *  delete:
 *    tags:
 *      - Task
 *    description: Delete an existing task
 *    parameters:
 *    - in: body
 *      name: body
 *      description:  Delete task's body.
 *      schema:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 */
router.delete("/", deleteTask);

module.exports = router;
