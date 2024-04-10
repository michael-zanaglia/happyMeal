$(document).ready(function () {
    const gridDiv = $(".container-grid-mosaique");

    async function printMyImg(gridDiv) {
        let listing_name = [];
        fetch("/JavaScript/happyMeal/SOURCE/data.json")
            .then(response => response.json()) 
            .then(data => {
                console.log("data recuperer")
                for (let i = 0; i<14; i++){
                    let nom = data.recettes[i]["nom"]
                    if (!listing_name.includes(nom)){
                        listing_name.push(nom)
                        const img = new Image();
                        img.src = "/JavaScript/happyMeal/GRAPHICS/imgs/"+ nom + ".jpg"
                        
                        img.onload = function() {
                            gridDiv.appendChild(img)
                        }
                    };
                };
                console.log(listing_name)
            })
    }

    printMyImg(gridDiv);

});