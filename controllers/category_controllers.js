const {getFirestore} = require("firebase-admin/firestore");

const categoriesList = async function ({ catdata }) {

    const snapshot = await getFirestore()
        .collection(catdata.root)
        .where('top_cat', 'array-contains-any',
            catdata.top_cat).get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data
    }
    );
}

const addCategory = async function ({ catdata }) {

    const snapshot = await getFirestore()
        .collection(catdata.root)
        .doc(catdata.child.id)
        .set(catdata.child);
    return {status:200}
}



module.exports = {
    categoriesList,
    addCategory
}