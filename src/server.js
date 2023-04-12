import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import router from "./route/web.js"
import connectDB from "./config/connectDB"
require("dotenv").config()
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

connectDB();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// app.use(cors({ credentials:true, origin:'http://localhost:3001' }));
app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());




viewEngine(app);
app.use(router);




let port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


