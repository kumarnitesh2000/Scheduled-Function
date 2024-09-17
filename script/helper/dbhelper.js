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

async function fetchUserById(db, id) {
    let data = null;
    console.log("fetching user from db");
    try {
      const collection = db.collection("users");
      data = await collection.findOne({ _id: id });
    } catch (error) {
      let msg = `[Error] fetching error: ${error}`;
      console.error(msg);
    }
    return data;
  }  

module.exports = { fetchStates, fetchUserById };