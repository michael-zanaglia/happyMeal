
export async function fermerModale(overlay,modale,croix,titleModale,ingredients,listeIngredients,titleIngredients,etape){
    croix.style.display = "none";
    overlay.style.display = "none";
    modale.style.display = "none";
    titleModale.remove();
    ingredients.remove();
    titleIngredients.remove();
    listeIngredients.remove();
    etape.remove();
    
};
async function printModale(valeur){
    const overlay = document.querySelector(".overlay");
    const modale = document.querySelector(".modal-home");
    const croix = document.querySelector(".croix");
    const titleModale = document.createElement("div");
    const ingredients = document.createElement("div");
    const listeIngredients = document.createElement("div");
    const titleIngredients = document.createElement("div");
    const etape = document.createElement("div");
    console.log("heeeeyy coucouuuuuuuuu")
    fetch("/JavaScript/happyMeal/SOURCE/data.json")
        .then(resultat => resultat.json())
        .then(data => {
            const recettes = data.recettes;
            let verif = []
            recettes.forEach(recette => {
                if(recette.nom === valeur && !verif.includes(valeur)){
                    verif.push(valeur)
                    croix.addEventListener("click", () => {
                        fermerModale(overlay,modale,croix,titleModale,ingredients,listeIngredients,titleIngredients,etape);
                    });
                    document.querySelector("body").addEventListener("click", () => {
                        fermerModale(overlay,modale,croix,titleModale,ingredients,listeIngredients,titleIngredients,etape);
                    });
                    croix.style.display = "block";
                    overlay.style.display = "block";
                    overlay.style.opacity = "0.5";
                    modale.style.backgroundColor = "#FF8F33";
                    modale.style.position = "absolute";
                    modale.style.top = "50%";
                    modale.style.left = "50%";
                    modale.style.transform = "translate(-50%, -20%)";
                    modale.style.width = "878px";
                    modale.style.height = "auto";
                    modale.style.zIndex = "9999";
                    modale.style.display = "flex";
                    modale.style.flexDirection = "column";
                    modale.style.justifyContent = "center";
                    modale.style.alignItems = "center";

                    modale.appendChild(titleModale);
                    
                    titleModale.innerHTML = "<h1 class='custom-h1'>" + valeur + "</h1>"
                    titleModale.style.borderBottom = "1px solid #FFF9EB";
                    titleModale.style.maxWidth = "750px";

                    
                    modale.appendChild(ingredients);

                    ingredients.appendChild(titleIngredients);
                    ingredients.appendChild(listeIngredients);

                    titleIngredients.innerHTML = "<h1 class='sous-titre'>" + "Ingredients :" + "</h1>"
                    
                    recette.ingredients.forEach(ingreNom => {
                        const oneing = document.createElement("div");
                        listeIngredients.appendChild(oneing);
                        if (typeof ingreNom !== "object") {
                            console.log(typeof ingreNom)
                            oneing.innerHTML = "<p>" + ingreNom + "</p>";
                        } else {
                            
                            oneing.innerHTML = "<p>" + ingreNom.nom + ": "+ ingreNom["quantite"] + "</p>";
                        }
                        
                    });
                    
                    modale.appendChild(etape);

                    console.log(recette.etapes.lenght)
                    for(let i = 0; i < recette.etapes.length; i++) {
                        const onestep = document.createElement("div");
                        etape.appendChild(onestep);
                        onestep.innerHTML = "<p>" + (i+1) +".  " + recette.etapes[i] + "</p>";
                    }
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
}
export {printModale};
document.addEventListener("DOMContentLoaded", function() {
    
    
    
    const input = document.querySelector(".form-control");
    const span = document.querySelector(".searching");
   

    span.addEventListener("click", ()=>{
        console.log(input.value)
        printModale(input.value);
    })


});

