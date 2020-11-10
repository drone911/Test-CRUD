const dotenv = require("dotenv");
const { valid } = require("joi");
const joi = require("joi");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = joi
	.object()
	.keys({
		NODE_ENV: joi
			.string()
			.valid("production", "test", "development")
			.required(),
		MONGO_URI: joi.string().required(),
		PORT: joi.number().default(8080),
		JWT_SECRET: joi.string().required(),
	})
	.unknown(true);

const { value, error } = envSchema
	.prefs({ errors: { label: "key" } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	mongo: {
		uri: value.MONGO_URI,
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	jwt: value.JWT_SECRET,
	port: value.PORT,
	nodeEnv: value.NODE_ENV,
};
