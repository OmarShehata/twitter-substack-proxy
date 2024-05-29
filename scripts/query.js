import { connectToDB, getSchema } from '../src/db.js'

let doPrintToken = process.argv.some(item =>
                                      item == "--print-token")
async function queryTest() {
	const { sequelize, models } = await connectToDB()

  const users = await sequelize.query(`
    SELECT 
      users.name,
      users.id,
      rules.title,
      users.token
	  FROM 
	    "users"
	   INNER JOIN 
	   	rules ON users.id = rules.author_id
	   WHERE
	   	rules.edited = true
    `)

  const rulesPerUser = {}
  for (let item of users[0]) {
  	if (rulesPerUser[item.id] == undefined) {
  		rulesPerUser[item.id] = { name: item.name, token: item.token, rules: [] }
  	}
  		
  	rulesPerUser[item.id].rules.push(item)
  }

  let count = 0
  for (let userId in rulesPerUser) {
  	const user = rulesPerUser[userId]
  	count ++
  	console.log(`User ${user.name} (${userId}) has ${user.rules.length} rules`)
  	if (doPrintToken) {
      console.log(user.token)
    }
    const rules = user.rules.slice(0, 5).map(item => item.title)
  	for (let r of rules){
  		console.log(`		${r}`)
  	}
  	
  	console.log("------------")
  }

  console.log(`Total: ${count}`)

}


queryTest()
