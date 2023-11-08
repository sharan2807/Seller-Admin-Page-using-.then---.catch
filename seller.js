 function test(event) {
    event.preventDefault();

    const Price = event.target.sellingPrice.value; //to get the values typed in from input boxes
    const Name = event.target.productName.value;
    const Category = event.target.category.value;
    // console.log(Price,Name,Category)
    const Obj = {                        //saving them in an Object
        PRICE: Price,
        NAME: Name,
        CATEGORY: Category
    }
    // console.log(Obj)

     axios.post("https://crudcrud.com/api/0ee60c0757ce4396940ebe27ab440b8a/SellersAdminPage", Obj)                      //to post all details to crudcrud server
        .then((res) => {
            showOnScreen(res.data)
            // console.log(res)
        })
        .catch((err) => console.log(err))
    // showOnScreen(Obj)
  

}
// axios.delete("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage/64d75023448b8e03e877d312")
// axios.delete("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage/64d7508d448b8e03e877d317")

//--------------------EVERYTHING BELOW SHOULD BE PART OF THE GLOBAL SCOPE NOT WITHIN FUNCTION TEST()----------------------

window.addEventListener("DOMContentLoaded", () => {                      //to get all details from crudcrud server on page refresh
    axios.get("https://crudcrud.com/api/0ee60c0757ce4396940ebe27ab440b8a/SellersAdminPage")
        .then((res) => {
            console.log(res);
            for(var i=0;i<res.data.length;i++){
                showOnScreen(res.data[i]);
            }
        })
        .catch((err) => console.log(err))
})


function showOnScreen(Obj) {
    // console.log(Obj.CATEGORY)
    var parent;                     //to set parent as a global variable so that it can be accessed within the below if statements
    if (Obj.CATEGORY == "Food") {                     //to be able to show details under Food Items <li> tag if food is selected
         parent = document.getElementById("foodItems");                     //to be able to show details under Food Items <li> tag by chosing this as parent 
       
    }
    else if (Obj.CATEGORY == "Electronic") {
         parent = document.getElementById("electronicItems");
        // let child = document.createElement('li')
        // child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';
        // parent.appendChild(child);
    } else {
         parent = document.getElementById("skincareItems");
        // let child = document.createElement('li')
        // child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';
        // parent.appendChild(child);
    }
    let child = document.createElement('li')
    child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';

    const deleteButton = document.createElement('input')
    deleteButton.type = "button"
    deleteButton.value = "Delete Product"
    deleteButton.className="btn btn-danger"
    deleteButton.onclick = () => {
        let deletedElem = Obj._id;                    //to get the id for delete operation
        axios.delete(`https://crudcrud.com/api/0ee60c0757ce4396940ebe27ab440b8a/SellersAdminPage/${deletedElem}`) 
        parent.removeChild(child)
    }
    child.appendChild(deleteButton)
    parent.appendChild(child);

}