const { fetchStates, fetchUsers, fetchUserById } = require("./helper/dbhelper");
const { hashingJSON } = require("./helper/misc");
const { addDataToSheet } = require("./helper/sheetupdater");
const { hashedSchema } = require("./model/hashedlabel");
const { connect, disconnect } = require("./utils/dbconnection");

async function main() {

    try {
        const { roadmapDbInstance, userDbInstance } = await connect();

        const states = await fetchStates(roadmapDbInstance);
        console.log(`fetched ${states.length} states`);
        states.forEach(async (state) => {
            let userId = state.userId;
            let user = await fetchUserById(userDbInstance,userId);
            console.log(user);
          });

        // await disconnect();
    } 
    catch (err) {
        console.log(err);
    }
}

main();