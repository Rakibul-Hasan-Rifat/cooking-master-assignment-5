document.getElementById('search-btn').addEventListener('click', () => {
    let fieldValue = document.getElementById('search-field').value;
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${fieldValue}`;
    fetch(url)
        .then(response => response.json())
        .then(getFoodResults)
    document.getElementById('search-field').value = '';
});

// This function is for showing the list of items searched by anyone
function getFoodResults(foodsInfo) {
    if (foodsInfo.meals) {
        foodsInfo.meals.forEach(meal => {
            let div = `
                <div>
                    <img src='${meal.strMealThumb}'>
                    <h4>${meal.strMeal}</h4>
                </div>
            `;
            document.querySelector('main').innerHTML += div;
        })
    }
    else {
        swal({
            title: "Sorry!",
            text: "Please! try another one. We're unable to serve your expected item.",
            icon: "warning"
        });
    }
}

document.querySelector('main').addEventListener('click', (event) => {
    let foodName = event.target.parentNode.innerText;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
        .then(res => res.json())
        .then(getFoodDetail)
});

// This function is for showing the details of selected item    
function getFoodDetail(foodDetails) {
    let getFoodDetailInfo = `
        <i class="fa fa-window-close" aria-hidden="true"></i>
        <img src="${foodDetails.meals[0]['strMealThumb']}">
        <h2>${foodDetails.meals[0]['strMeal']}</h2>
        <h4>Ingredients</h4>
        <p><i class="fa fa-check-square" aria-hidden="true"></i>  ${foodDetails.meals[0]['strIngredient1']}</p>
        <p><i class="fa fa-check-square" aria-hidden="true"></i>  ${foodDetails.meals[0]['strIngredient2']}</p>
        <p><i class="fa fa-check-square" aria-hidden="true"></i>  ${foodDetails.meals[0]['strIngredient3']}</p>
        <p><i class="fa fa-check-square" aria-hidden="true"></i>  ${foodDetails.meals[0]['strIngredient4']}</p>
        <p><i class="fa fa-check-square" aria-hidden="true"></i>  ${foodDetails.meals[0]['strIngredient5']}</p>
        `;
    document.querySelector('section').innerHTML = getFoodDetailInfo;
    document.querySelector('section').style.display = 'block';

    // This event for hiding the detail section by clicking on 'x' 
    document.querySelector('section i').addEventListener('click', hidingDetailSection, true);
}

// This event for hiding the detail section by clicking out of the item 
document.body.addEventListener('click', hidingDetailSection);

// This function is for hiding the detail section by ckicking on 'x' and out of the item
function hidingDetailSection() {
    let section = document.querySelector('section').style;
    let sectionDisplayStyle = document.querySelector('section').display;
    section.display === 'block' ? section.display = 'none' : sectionDisplayStyle;
}