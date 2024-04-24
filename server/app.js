require("dotenv").config();
const express = require("express");
const http = require("http");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const cors = require("cors");

let resHandler = require("./handlers/responseHandler");
const router = require("./router");
const port = normalizePort(process.env.PORT || "8080");

//App Setup
app.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Donation App",
      description: "API Documentation",
      contact: {
        name: "Ankit",
      },
      servers: ["http://localhost:8080"],
    },
    // basePath: '/api/v1'
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    openapi: "3.0.0",
  },
  apis: ["app.js", "./routers/*.js"],
};

app.use("/public", express.static("public"));

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(cors());

// app.use(bodyParser.json({ type: "*/*" }));
router(app);
app.use("/api/task", require("./routers/taskRoute"));

/**
 * @swagger
 * /api:
 *  get:
 *    tags:
 *    - Home
 *    description: Just a welcome endpoint
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/api", (req, res) => {
  res.status(200).json({
    code: 200,
    msg: "Welcome to server!!!",
  });
});

//Server Setup
app.listen(port, console.log(`Listening to port ${port}...`));

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
