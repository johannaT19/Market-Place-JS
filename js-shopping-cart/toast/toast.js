const Toast = {
    init() {
      this.hideTimeout = null;
  
      this.el = document.createElement("div");
      this.el.className = "toast";
      document.body.appendChild(this.el);
    },
  
    show(message, state) {
      clearTimeout(this.hideTimeout);
  
      this.el.textContent = message;
      message = 'Produit ajouté au panier';
      this.el.className = "toast toast--visible";
  
      if (state) {
        this.el.classList.add(`toast--${state}`);
      }
  
      this.hideTimeout = setTimeout(() => {
        this.el.classList.remove("toast--visible");
      }, 2000);
    }
};
  
document.addEventListener("DOMContentLoaded", () => Toast.init());

// fonction pour afficher la notification à l'ajout d'un produit dans le panier
function callNotif() {

    // contenu du panier
    let cartItems = localStorage.getItem("coursesInCart");

    // le nombre d'articles dans le panier
    let cartNumberItem = localStorage.getItem("cartNumbers");

    // le numéro de référence permet de savoir s'il faut afficher la notification ou non
    let referenceNumber = localStorage.getItem("reference");
    cartItems = JSON.parse(cartItems);

    try {

        // si le panier possède au moins 1 article 
        // et que le numéro de référence est différent du nombre d'articles dans le panier
        if(cartItems != null && cartNumberItem != referenceNumber) {

            // on affiche la notification
            document.addEventListener("DOMContentLoaded", () => Toast.show('Produit ajouté au panier', 'success'));
        }
    } catch (undefined) {
    }
    finally {
    }

    // si le numéro de référence est différent du nombre d'articles dans le panier on le rend identique
    if(referenceNumber != cartNumberItem) {
        localStorage.setItem('reference', cartNumberItem);
    }
  }

callNotif();