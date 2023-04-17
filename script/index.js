const { fetchStates, fetchUsers } = require("./helper/dbhelper");
const { hashingJSON } = require("./helper/misc");
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
            

        }

        await disconnect();
    } 
    catch (err) {
        console.log(err);
    }
}

main();