import dotenv from "dotenv";
dotenv.config( {
    path: ".env"

} );

import app from "./app.js";
import connectDB from "../database.js";

const startserver = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.error(`Error: ${error.message}`);
            throw error;
        });
        app.listen(process.env.PORT || 8000 ,  () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);

    }
}
startserver();
