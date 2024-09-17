const { fetchStates } = require("./helper/dbhelper");
const { connect, disconnect } = require("./utils/dbconnection");
const recommedationEngine = require("./utils/recommendation");

async function main() {

    try {
        const { roadmapDbInstance } = await connect();

        const states = await fetchStates(roadmapDbInstance);
        console.log(`fetched ${states.length} states`);
        states.forEach((state) => {
            const recommendedContent = recommedationEngine(state);
            console.log(recommendedContent);
        });
        await disconnect();
    } 
    catch (err) {
        console.log(err);
    }
}

main();