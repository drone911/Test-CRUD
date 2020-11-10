const app = require("./app");
const http = require("http");
const { port, mongo } = require("./config/config");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const { func } = require("joi");

const server = http.createServer(app);
(async ()=> {
    await mongoose.connect(mongo.uri, mongo.options);
    logger.info("Connected to Mongo Atlas")
    server.listen(port, () => {
        logger.info(`Server listening at port: ${port}`);
    });    
})();

function exitServer() {
	if (server) {
		server.close();
		logger.info("Server Closed");
		process.exit(1);
	} else {
		process.exit(1);
	}
}
function unexpectedErrorHandler(error) {
	logger.error(error);
	exitServer();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	logger.info("SIGTERM'ED");
	server && server.close();
	process.exit(0);
});
process.on("SIGINT", () => {
	logger.info("SIGINT'ED");
	server && server.close();
	process.exit(0);
});
