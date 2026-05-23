import ServerlessHttp from "serverless-http";
import app from "./app";

const handler = ServerlessHttp(app);

export default handler;
