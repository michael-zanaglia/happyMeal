document.addEventListener("DOMContentLoaded", function() {
    async function autoCompletion(words) {
        let found = []
        fetch("/JavaScript/happyMeal/SOURCE/data.json")
            .then(response => response.json()) 
            .then(data => {
                data.recettes.forEach(recette => {
                    if(recette.categorie.includes(words.charAt(0).toUpperCase() + words.slice(1)) || recette.categorie.includes(words) ){
                        found.push(recette.nom)  
                    } else if (recette.nom.includes(words.charAt(0).toUpperCase() + words.slice(1)) || recette.nom.includes(words)){
                        found.push(recette.nom)  
                    } 
                    else {
                        recette.ingredients.forEach(ingreNom => {
                            try {
                                if (ingreNom.nom.includes(words.charAt(0).toUpperCase() + words.slice(1)) || ingreNom.nom.includes(words)){
                                    found.push(recette.nom)}
                            } catch {
                                if (ingreNom.includes(words)){
                                    found.push(recette.nom)}
                            }
                        })   
                    }
                    let unique = found.filter((item, index) => found.indexOf(item) === index);
                    
                    if (unique.length===0){
                        afficherAutoComp(["Aucun résultat :("]);
                    } else if (words === '') {
                        afficherAutoComp('');
                    } else {
                        afficherAutoComp(unique);
                    }

                }); 
                
                
            })
    };

    function selectLi(x) {
        console.log('oui')
        input.value = x.innerHTML
    }

    async function afficherAutoComp(result) {
        if (result !== '') {
            boxin.style.display = "block";
            const content = result.map((x) => "<li>" + x + "</li>").join("");
            boxin.innerHTML = "<ul class='linky'>"+ content + "</ul>";
            const listeLi = document.querySelectorAll('.linky li');
            listeLi.forEach(li => {
                li.addEventListener('click', function() {
                    selectLi(this);
                });
            });
        } else {
            boxin.style.display = "none";
        }
        
    }


    const boxin = document.querySelector(".result-box");
    const input = document.querySelector(".form-control");
    
    const search = document.querySelector(".searching")
    input.addEventListener("keyup", ()=>{
        let words = input.value
        autoCompletion(words);
    })

});