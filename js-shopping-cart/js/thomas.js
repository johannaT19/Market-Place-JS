let carts = document.querySelectorAll('.add-to-cart');

const COURSES = [
    {id: 1, img: 'UI_UX.jpg', title: 'UX/UI', initial_price: 200, price: 9.99, mark: 4, stock: 10, inCart: 0},
    {id: 2, img: 'php.jpg', title: 'PHP 8', initial_price: 200, price: 9.99, mark: 3, stock: 10, inCart: 0},
    {id: 3, img: 'react_js.jpg', title: 'React JS', initial_price: 200, price: 9.99, mark: 2, stock: 5, inCart: 0},
    {id: 4, img: 'node_js.jpg', title: 'Node JS', initial_price: 200, price: 9.99, mark: 5, stock: 3, inCart: 0},
    {id: 5, img: 'my_sql.jpg', title: 'MySQL', initial_price: 200, price: 9.99, mark: 4, stock: 2, inCart: 0}
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click',() => {
     cartNumbers(COURSES[i]);
     totalCost(COURSES[i]);
     location.reload();
    });
 }
 
 // Comptabiliser le nombre de produit clicker sur le localstorage.
 function cartNumbers(courses){
     // Creation de la clé carteNumbers au localstorage
     let productNumbers = localStorage.getItem('cartNumbers');
     // Conversion d'une chaine string en nombre
     productNumbers = parseInt(productNumbers);
 
     // Si il y a deja alors ajouter un en plus.
     if(productNumbers){
         localStorage.setItem('cartNumbers', productNumbers + 1);
         document.querySelector('#cart-table tbody').textContent = productNumbers + 1;
     }else{
         // Sinon ajouter.
         localStorage.setItem('cartNumbers', 1);
         document.querySelector('#cart-table tbody').textContent =1;
     }
     addCart(courses);
 }
 
 // Ajout d'un produit au panier.
 function addCart(courses){
     // Creation de la clé coursesInCart au localstorage
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
     // Conversion d'une chaine nombre
     localStorage.setItem("coursesInCart", JSON.stringify(cartItems));
 }
 
 //calcul du cout total du panier
 function totalCost(courses){
     // Creation de la clé totalCost au localstorage
     let cartCost = localStorage.getItem('totalCost');
 
     if(cartCost != null){
         //si le produit est connue alors addition le prix total 
         cartCost = parseFloat(cartCost);
         cartCost.toFixed(2);
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
     let cartCost = localStorage.getItem('totalCost');
     
     console.log(cartItems);
     if(cartItems && courseContainer){
         courseContainer.innerHTML = '';
         Object.values(cartItems).map(item => {
             courseContainer.innerHTML  += `
             <tbody>
                 <tr>
                     <td><img src="./img/courses/${item.img}"></td>
                     <td>${item.title}</td>
                     <td>${item.price}</td>
                     <td>${item.inCart}</td>
                     <td></td>
                 </tr>
             </tbody>
             `;
             
             
         });
 
         courseContainer.innerHTML += `
             <thead>
                 <tr>
                     <th></th>
                     <th>Total: </th>
                     <th>${cartCost}</th>
                     <th></th>
                 </tr>
             </thead>
         `;
 
     }
 }
 

// Supprimer le panier.
function clearCart() {
    localStorage.removeItem("cartNumbers");
    localStorage.removeItem("coursesInCart");
    localStorage.removeItem("totalCost");
    document.location.reload();
}

// Rediriger vers le formulaire (Valider son panier)
function order() {
    let cartItems = localStorage.getItem("coursesInCart");
    cartItems = JSON.parse(cartItems);
    let courseContainer = document.querySelector("tbody");

    try {
        // si le panier n'est pas vide on affiche le boutton commander
        if(cartItems != null) {
            document.getElementById("buttonAppear").innerHTML = '<button onclick="redirectFormulaire()" class="button u-full-width" >Commander</button>';
        }
    } catch (undefined) {
    }
    finally {
    }
}

// Rediriger vers le formulaire 
function redirectFormulaire() {
    window.location.href = "formulaire.html";
}

// Rediriger vers la commande validée 
function redirectValider() {
    window.location.href = "valider.html";
}

// Rediriger vers le magasin (index)
function redirectRetour() {
    window.location.href = "index.html";
}

displayCart();
order();