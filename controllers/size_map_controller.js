const keySizeMapping = require('../response_structures/size_mapping.json');

const sizeMapping = function ({product:product, profile:profile}){
    const l1 = product.L1; //M
    const l3 =  product.L3[0]; //casual 
    const l4 =  product.L4[0]; //bottomwear
    const fit = product.fit;
    const brand = product.brand;

    var currentSize = "M";
    if(l4 === "bottomwear"){
        currentSize = profile.bottom_size.size;
    }
    if(l4 === "topwear"){
        currentSize = profile.top_size.size;
    }
    if(l4 === "shoewear"){
        currentSize = profile.shoe_size.size;
    }

    return mapSize({currentSize : currentSize,brand:brand,l4:l4});
}

const mapSize = ({currentSize,brand,l4})=>{
    var newSize = currentSize;
    const sizes = keySizeMapping[brand][l4];    
    return newSize;
}


module.exports = {
    sizeMapping
};