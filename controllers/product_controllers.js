const {getFirestore} = require("firebase-admin/firestore");
const {FieldValue,FieldPath} = require("firebase-admin/firestore");
const sizeMapper  = require('../controllers/size_map_controller');

const addProduct = async function({data}){
    const snapshot = await getFirestore()
    .collection("product")
    .add(data);
return {status:200}
}

const addProductToOutFit = async function({from,relateto}){
    const snapshot = await getFirestore()
    .collection("product")
    .doc(from)
    .update({related_outfits: FieldValue.arrayUnion(relateto)});
return {status:200}
}

const listRelated = async function({profile,relateto}){
    const snapshot = await getFirestore()
    .collection("product")
    .where(FieldPath.documentId(), 'in', relateto).get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        data.preferredSizeN = sizeMapper.sizeMapping({product:data,profile:profile});
        return data
    }
    );
}

const listProducts = async function({category,profile}){    
    const snapshot = await getFirestore()
    .collection("product")
    .where('L1', '==', profile.gender)
    .where('L3', 'array-contains-any', category.L3)
    .where('L4', 'array-contains-any', category.L4)
    .get();
    return snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        data.preferredSize = "M";
        return data
    }
    );
}

module.exports = {
    addProduct,
    addProductToOutFit,
    listRelated,
    listProducts
}