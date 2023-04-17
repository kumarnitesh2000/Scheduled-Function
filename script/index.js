const { fetchStates, fetchUsers } = require("./helper/dbhelper");
const { hashingJSON } = require("./helper/misc");
const { addDataToSheet } = require("./helper/sheetupdater");
const { hashedSchema } = require("./model/hashedlabel");
const { connect, disconnect } = require("./utils/dbconnection");

async function main() {

    try {
        const { sdeDB, userDB } = await connect();

        const states = await fetchStates(sdeDB);
        console.log(states);

        const users = await fetchUsers(userDB);
        console.log(users);

        for (let i=0; i<states.length; i++) {
            let state = states[i];
            let userId = ""

            let hashedKey = hashingJSON({ userId, state })
            const label = hashedSchema.findOne({ label: hashedKey })

            if(!label) {
                await addDataToSheet()
            }
        }

        await disconnect();
    } 
    catch (err) {
        console.log(err);
    }
}

main();