const sach = document.getElementById("search");

const minfo = document.getElementById("info-p");

const sachbtn = document.getElementById("search-btn");
const clear = document.getElementById("cl-btn");
const next = document.getElementById("cl-btn2");
// console.log("hi i am aryan")

const meals = document.getElementById("meals");
const favcont = document.getElementById("fav-meal");
async function getrandommeal() {
  let meald = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  const rand = await meald.json();

  const rand_meal = rand.meals[0];
  console.log(rand_meal);

  // setInterval(() => {
  addmeal(rand_meal, true);
  // }, 5000);
}
getrandommeal();

async function getElementById(id) {
  console.log("i amclicked");

  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  console.log("i amclicked");
  console.log(meal);
  const md = await meal.json();
  // console.log("i amclicked")

  const mealid = md.meals[0];
  return mealid;
}
async function getElementBySearch(term) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const resp = await meals.json();
  const meal = resp.meals;
  return meal;
}

function addmeal(mealdata, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
    <div class="rand-m flex">
    ${random ? ` <h4>Random meal</h4>` : ""}
   
   
</div>
<div class="veg ">
    <div class="v-v">
        <img src=${mealdata.strMealThumb} alt="">
    </div>
    <div class="lab flex">
    <h4 id="m-title">${mealdata.strMeal}</h4>
    <div class="flex">
    <div class="heart"><button class="fav-btn"><i class="logo fa-regular fa-heart"></i></button></div>
    <div class="btn2" id="cl-btn2"><button style="border:none"><i class='fas fa-angle-right' style='font-size:25px;background-color:green;background:none;'></i></button></div>
    </div>
    </div>`;
  const abc = meal.querySelector(".v-v");
  abc.addEventListener("click", () => {
    console.log("i am cli");
    minfo.innerHTML = " ";
    showmealinfo(mealdata);
  });
  const btn = meal.querySelector(".lab .fav-btn");
  const nbtn = meal.querySelector(".btn2");
  nbtn.addEventListener("click", () => {
    location.reload();
    nbtn.style.background = "blue";
    console.log("jnwkefk");
  });
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLs(mealdata.idMeal);
      btn.classList.remove("active");
      meal.querySelector(".lab .fa-heart").style.background = "white";
    } else {
      addMealsLs(mealdata.idMeal);
      btn.classList.add("active");
      meal.querySelector(".lab .logo").style.background = "red";
    }
    favcont.innerHTML = " ";
    favmeals();
  });
  console.log(mealdata)
  meals.appendChild(meal);
}
function addMealsLs(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLs(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
async function favmeals() {
  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    console.log("i amclicked");
    let meal = await getElementById(mealId);
    console.log(meal);
    addfavmeals(meal);
    // meals.push(meal)
  }
}
favmeals();
function addfavmeals(mealdata) {
  const favmeal = document.createElement("li");
  favmeal.innerHTML = `<img class="fav-img" src=${mealdata.strMealThumb} alt="xyz">
    <p>${mealdata.strMeal}</p>
    <button class="fav-cl">clear</button>
    `;
  const abc = favmeal.querySelector(".fav-img");
  abc.addEventListener("click", () => {
    console.log("i am cli");
    minfo.innerHTML = " ";
    showmealinfo(mealdata);
  });
  const cl = favmeal.querySelector(".fav-cl");
  cl.addEventListener("click", () => {
    console.log(mealdata.idMeal);
    removeMealLs(mealdata.idMeal);
    favcont.innerHTML = " ";
    favmeals();
  });
  favcont.appendChild(favmeal);
}
clear.addEventListener("click", () => {
  localStorage.clear();
  favcont.innerHTML = " ";
});
const bigmeal = document.getElementById("meals");
console.log(bigmeal);
sachbtn.addEventListener("click", async () => {
  console.log("ij");
  let search = sach.value;
  //   console.log(search)
  // bigmeal.remove(".btn2")
  bigmeal.innerHTML = " ";
  const meals = await getElementBySearch(search);
  meals.forEach((meal) => {
    addmeal(meal);
  });
});

// meal info page js

function showmealinfo(mealdata) {
    let ing_arr=[]
    for (let i = 0; i < 20; i++) {
        if (mealdata['strIngredient'+i]) {
            
            ing_arr.push(`${mealdata['strIngredient'+i]}/${mealdata['strMeasure'+1]}`)   
        }
        else{
            break;
        }
    }
    console.log(ing_arr)
  const meali = document.createElement("div");
  meali.classList.add("meal-info");
  meali.innerHTML = `
        
        <div class="close-btn"> 
        <button id="cp"><i class="fa-regular fa-circle-xmark"></i></button>
        </div>
        <h2>${mealdata.strMeal}</h2>
        <div class="meal-img">
        <img src=${mealdata.strMealThumb} alt="">
        </div>
       
        <h4>Instructions :</h4>
        <div class="info">
        <p>
        ${mealdata.strInstructions}
        </p>
        <div class="ing">
        <ul>
        ${ing_arr.map((ing)=>{
            `<li>${ing}</li>`
        }).join(" ")}
        <li></li>
        </ul>
        </div>
        </div>

    </div>
    
    
    `;
  const cl = meali.querySelector("#cp");
  cl.addEventListener("click", () => {
    console.log("i am clicked");
    minfo.classList.add("hidden");
  });
  minfo.appendChild(meali);
  minfo.classList.remove("hidden");
}
