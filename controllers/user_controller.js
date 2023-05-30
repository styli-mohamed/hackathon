const {getFirestore} = require("firebase-admin/firestore");

const addUserProfile =async function({profile}){
    const writeResult = await getFirestore()
      .collection("profile")
      .add(profile);
}

const updateUserProfile =async function({profile}){
    const writeResult = await getFirestore()
      .collection("profile")
      .doc(profile.id)
      .set(profile,{merge:true});
}

const deleteUserProfile =async function({profile}){
    const writeResult = await getFirestore()
      .collection("profile")
      .doc(profile.id)
      .delete();
}

const fetchUserProfiles = async function () {
    const snapshot = await getFirestore().collection('profile').get()
    return snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data
    }
        );
}


module.exports = { addUserProfile,updateUserProfile,fetchUserProfiles, deleteUserProfile }

