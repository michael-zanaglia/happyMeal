import {printModale, fermerModale} from "./modale.js";
$(document).on("click", ".img-grid", function () {
    console.log("oui j'ai clique",$(this).attr("id"))
    // Appeler la fonction printModale avec l'id de l'image
    printModale($(this).attr("id"));
});
$(document).ready(function () {
    async function printMyImg(gridDiv, index, max, once) {
        if (once===1) {
            gridDiv.empty();
        }
        //setTimeout(function() {
        //    $(".load").show();
        //}, 800);
        // je creer une liste pour des vérifications => eviter les redondances
        let listing_name = [];
        // J'appelle mon fichier JSON
        await fetch("/JavaScript/happyMeal/SOURCE/data.json")
            .then(response => response.json()) 
            .then(data => {
                // Il me faut neuf image sur ma premiere page. L'iteration me permet de parcourir le JSON
                for (let i = index; i<max; i++){
                    // Je creer une div et je le met dans mon grid + je lui donne une classe
                    const div = $("<div>");
                    gridDiv.append(div);
                    div.addClass("flow")
                    let nom = data.recettes[i]["nom"]
                    // Si la liste n'inclus pas le nom iterer je l'ajoute a ma liste et je peux continuer 
                    if (!listing_name.includes(nom)){
                        listing_name.push(nom)
                        let format = [".png", ".jpg", ".jpeg"];
                        let chemin = "/JavaScript/happyMeal/GRAPHICS/imgs/"+ nom
                        let pass = 0
                        // Pour chaque extension je fetch le chemin pour voir s'il y a qqch
                        for (let ext of format){
                            fetch(chemin + ext)
                                .then(response => {
                                    // si ca match alors je creer une balise img et je l'affiche
                                   if (response.ok) {
                                        //setTimeout(function() {
                                        //    $(".load").hide();
                                        //}, 800);
                                        const img = $("<img>");
                                        img.attr("src", response.url)
                                        img.addClass("img-grid");
                                        img.attr("id", nom);
                                        img.on("load", function() {
                                            div.append(img);
                                        }); 
                                        pass = 1
                                        
                                   }    
                                })
                                .catch(error => {
                                });
                            // L'image a bien etait afficher alors je n'ai plus besoin de continuer a explorer les formats
                            if (pass === 1) {
                                break;
                            }
                        }       
                    
                    };

                };
            });
    };

    //function moveLeft() {
    //    const divs = $(".flow");
    //    divs.css("position", "relative");
    //    if (mLeft >= -325) {
    //        mLeft -= 2
    //        divs.css("left", `${mLeft}%`);
    //        console.log(mLeft)
    //        requestAnimationFrame(moveLeft)
    //    } else {printMyImg(gridDiv,9,14,1);};
    //    
    //    

    //}

    // J'appelle ma div en grid afin de la mamipuler
    const gridDiv = $(".container-grid-mosaique");
    let mLeft = 0;
    const page = $(".page-link");

    page.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        let clicked = $(this).text().trim();
        if (clicked === "1") {
            // J'aurais pu mettre des arguments tel que le len d'un fetch fait en amont et un index different tout les +9
            printMyImg(gridDiv,0,9,1);
        }
        if (clicked === "2") {
            printMyImg(gridDiv,10,14,1)
            //requestAnimationFrame(moveLeft)
        }
    })

    // Le but de cette fonction est de recuperer le nom de chaque recettes afin d'afficher l'image en question.
    printMyImg(gridDiv,0,9,0);

});