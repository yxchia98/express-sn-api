import express, { Express, Request } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authentication";
import * as http from "http";
import * as fs from "fs";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port: number = parseInt(<string>process.env.PORT) || 8080;

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// initialize connection to pgsql
// setup();

app.use(express.json());

app.use(`/auth`, authRouter);

// setup swagger api documentation page
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
// const swaggerDocument = YAML.load(path.resolve("./src/swagger.yml"));
const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API",
        version: "1.0.0",
        description: "Express API documentation between React Native and ServiceNow",
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: "Development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec: object = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// http server setup
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
