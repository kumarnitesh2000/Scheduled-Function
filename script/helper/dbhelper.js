async function fetchStates(db) {

    let data = [];
    console.log("fetching states from db");
    try {
        const collection = db.collection("states");
        const cursor = collection.find({});
        data = await cursor.toArray();
    }
    catch(error) {
        let msg = `[Error] fetching error: ${error}`
        console.log(msg);
    }
    return data;
}

async function fetchUsers(db) {

    let data = [];
    console.log("fetching users from db");
    try {
        const collection = db.collection("users");
        const cursor = collection.find({});
        data = await cursor.toArray();
    }
    catch(error) {
        let msg = `[Error] fetching error: ${error}`
        console.log(msg);
    }
    return data;
}

module.exports = { fetchStates, fetchUsers };