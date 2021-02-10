let carts = document.querySelectorAll('.add-to-cart');

const COURSES = [
    {id: 1, img: 'UI/UX.jpg', title: 'UX/UI', initial_price: 200, price: 9.99, mark: 4, stock: 10, inCart: 0},
    {id: 2, img: 'php.jpg', title: 'PHP 8', initial_price: 200, price: 9.99, mark: 3, stock: 10, inCart: 0},
    {id: 3, img: 'react_js.jpg', title: 'React JS', initial_price: 200, price: 9.99, mark: 2, stock: 5, inCart: 0},
    {id: 4, img: 'node_js.jpg', title: 'Node JS', initial_price: 200, price: 9.99, mark: 5, stock: 3, inCart: 0},
    {id: 5, img: 'my_sql.jpg', title: 'MySQL', initial_price: 200, price: 9.99, mark: 4, stock: 2, inCart: 0}
];

for (let i=0; i < carts.length; i++){
   carts[i].addEventListener('click',() => {
    cartNumbers(COURSES[i]);
    totalCost(COURSES[i]);
   })
}

//sauvegarde les données du panier quand la page s'actualise
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        // document.querySelector('#cart-table tbody').textContent = productNumbers;
    }
}

//ajout au localstorage, conversion d'un string en nombre et check de
//l'article s'il existe ou non pour ajouter une valeur. 
function cartNumbers(courses){
    //envoi de la clés carteNumbers au localstorage
    let productNumbers = localStorage.getItem('cartNumbers');
    //conversion string en nombre
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        // document.querySelector('#cart-table tbody').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        // document.querySelector('#cart-table tbody').textContent =1;
    }
    setItems(courses);
    document.location.reload();
}

//
function setItems(courses){
    //envoi de la clés coursesInCart au localstorage
    let cartItems =localStorage.getItem('coursesInCart');
    cartItems = JSON.parse(cartItems);

    //si le produit est connu fait +1 sur la quantité
    if(cartItems != null){
        if(cartItems[courses.title] == undefined){
            cartItems = {
                ...cartItems,
                [courses.title]: courses
            }
        }
        cartItems[courses.title].inCart += 1;
    }else{
        //sinon ajoute le produit 
        courses.inCart = 1;
        cartItems = {
            [courses.title]: courses
        }
    }
    localStorage.setItem("coursesInCart", JSON.stringify(cartItems));
}

//calcul du cout total du panier
function totalCost(courses){
    //envoi de la clés totalCost au localstorage
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        //si le produit est connue alors addition le prix total 
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + courses.price);
    }else{
        //sinon ajout juste le produit 
        localStorage.setItem("totalCost", courses.price);
    }   
}

//ajout visuel produit au panier 
function displayCart(){

    let cartItems = localStorage.getItem("coursesInCart");
    cartItems = JSON.parse(cartItems);
    let courseContainer = document.querySelector("tbody");
    
    if(cartItems && courseContainer){
        courseContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            courseContainer.innerHTML  += `
            <thead>
                <tr>
                    <th></th>
                    <th>${item.title}</th>
                    <th>${item.price} €</th>
                    <th>x${item.inCart}</th>
                </tr>
            </thead>
            `
        })
    }
}

function clearCart() {
        localStorage.removeItem("cartNumbers");
        localStorage.removeItem("coursesInCart");
        localStorage.removeItem("totalCost");
        document.location.reload();
}

onloadCartNumbers();
displayCart();
