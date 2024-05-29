import { connectToDB, getSchema } from '../src/db.js'

// Completely resets everything
async function reset() {
	console.log("Resetting database...")
	const { sequelize, models } = await connectToDB()
	await sequelize.sync({ force: true });
	console.log("Done")	
}

reset()