let cardItems = [
    {item_id:1, item_name:"pize", varation_id:3, addOns:[1,2,3,4,5], quantity:1}, 
    {item_id:1, item_name:"pize", varation_id:1, addOns:[1,2,3,4,5], quantity:1}, 
    {item_id:1, item_name:"pize", varation_id:1, addOns:[1,2,3,4], quantity:1},
    {item_id:2, item_name:"shawrma", varation_id:2, addOns:[1,2,4], quantity:1},  
    {item_id:2, item_name:"shawrma", varation_id:2, addOns:[1,4], quantity:1},  
    {item_id:3, item_name:"pize", varation_id:9, addOns:[1,2,4,5], quantity:2}, 
    {item_id:4, item_name:"shawrma", varation_id:2, addOns:[1,2,4], quantity:1}];

    function arraysEqual(_arr1, _arr2) {

        if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length)
          return false;

        var arr1 = _arr1.concat().sort();
        var arr2 = _arr2.concat().sort();

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;

        }

        return true;

    }

const addItem = (itemId, varationId, addOns) => {
    
        let excistingItemIndex = cardItems.findIndex(item => {return (item.item_id === itemId
                 && item.varation_id === varationId
                 && arraysEqual(item.addOns, addOns))})
            console.log(excistingItemIndex)
        let excistingItem = cardItems[excistingItemIndex]
        let updatedItem;

        if(excistingItem) {
            updatedItem = {...excistingItem};
            updatedItem.quantity = updatedItem.quantity + 1;
            cardItems[excistingItemIndex] = updatedItem
        }else{
            updatedItem = {item_id:itemId, varation_id: varationId, addOns:addOns, quantity: 1}
            cardItems = [...cardItems, updatedItem]
        }

}