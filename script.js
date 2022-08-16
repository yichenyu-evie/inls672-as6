// JavaScript to demonstrate the use of the Spoonacular API: https://spoonacular.com/food-api
   // Add click event listener to 'Show recipes' button
   let showRecipesButton = document.querySelector('#showRecipes');
   showRecipesButton.addEventListener('click', getRecipes);

   var obj;        // Global variable for the JSON object created from API response

   // When the user clicks 'Show recipes', fetch the recipe information for the selected cuisine
   // feature.value is the user-selected cuisine value assigned to the API query parameter

   loadData();

   async function loadData() {
      let url = 'https://storage.googleapis.com/kagglesdsdata/datasets/10525/14746/schoolInfo.json?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20210503%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20210503T020616Z&X-Goog-Expires=259199&X-Goog-SignedHeaders=host&X-Goog-Signature=35e55123ccbb4cc7b9130e18bafb5959d1ce66c4b6f06aca7ce7bc643123037edd66f067a7b16469a5eab4f09b7822ffcffca6bb870765835761b353d5b35c5318ac7998a9742cb2b26e402bb3a432f803838806487df452a278087859c4d66a29166b42ed39b7c21a55f270f58330183b5cee951f5388b1fd67a8ebfdd49453ba545e56b45ffe573e2290f539b69306279b5f1139e7ae2d6fc85377c0b8127026669ef415e7f08b7628f14c92f2fc8be68cf0db00dd4e8faf6f8e0329b4939f215487d6409e6df2b7070e4964919d3fd0ec8117c65bfe97d667ff7d4bb42f0e57083647ec250d508c30bd0903f2d1db8208c09d7f6e345f20e9187ba665eaa3';

      try {
        let response = await fetch(url);
        obj = await response.json();
        console.log(obj);   // Look at this in the Inspector to see what the data structure looks like.

        // Create a set of features found in data.
        // Since multiple parks may have the same feature, we want to remove any duplicates from our list.
        // A set data structure will not allow a duplicate item to be added.
        let featureSet = new Set();
        obj.forEach(park => {
          featureSet.add(park.state);
        });
        
        // Convert the set to a sorted array (or list)
        featuresList = Array.from(featureSet).sort();
        let featureOptions = '';

        // Create the dropdown list of options for the feature list
        featuresList.forEach(feature => {
          let option = `<option>${feature}</option>`;
          featureOptions += option;
        });

        let selectOptions = document.querySelector('#feature');
        selectOptions.innerHTML = featureOptions;
      } catch (error) {
        console.log(error);
      }
    }

    // Generate <article> element for each recipe and add to HTML
    function getRecipes() {
      let recipeList = '';
      obj.forEach(recipe => {
          // The following 2 lines create strings from arrays, where array elements are separated by commas.
          // The replace function adds an extra space after the comma.

        if (recipe.state == feature.value){
          let recipeData = `<article>
                               <div><h2>${recipe.displayName}</h2></div>
                               <div class="card-content">
                                 
                                 <div class="card-description">
                                    <p><span class="list-label">City:</span> ${recipe.city}</p>
                                    <p><span class="list-label">Ranking:</span> ${recipe.overallRank}</p></div>
                                  <img id="card-img" src="${recipe.primaryPhoto}">
                                <div class="card-description">
                                    <div id="center"><button id="taste" onclick="getTastes('${recipe.xwalkId}')">View Average Scores</button></div>
                                    <div><canvas id="recipe-${recipe.xwalkId}"></canvas></div>
                                    <br>
                                    <div><canvas id="recipe1-${recipe.xwalkId}"></canvas></div>
                                 </div>
                               </div>
                             </article>`;
          recipeList += recipeData;
        }
      });

      // Add the recipes to the HTML
      let recipes = document.querySelector('#recipe-list');
      recipes.innerHTML = recipeList;
    }

    // When the user clicks 'View Recipe Tastes' button, fetch the taste information for the selected recipe
    async function getTastes(recipeId) {
      
         console.log(obj);
         let socredic = {};
         for (const university of obj) {
             let uniID = university.xwalkId;
             let uniValue = university;
             socredic[uniID] = uniValue;
         }
        console.log(socredic);
        
         let score = {};
         score["sat-avg"] = socredic[recipeId]["sat-avg"];
         score["act-avg"] = socredic[recipeId]["act-avg"];
         console.log(score);
        

         displayData1(["sat-avg"], [score["sat-avg"]], recipeId); 
         displayData2(["act-avg"], [score["act-avg"]], recipeId); 
        // Display 
        // Display the data in the chart

     }

// Display taste values for the recipe in a bar chart
   function displayData1 (keys, values, recipeId) {
     // Each chart has a unique ID selector constructed from the recipeId
     chartId = "#recipe-" + recipeId;
     myChart = new Chart(document.querySelector(chartId), {
         type: 'bar',
         data: {
           labels: ['Sat Average Score'],     // the dictionary keys are the labels for the chart
           datasets: [{
             backgroundColor: ['#ca8a8b'],
             data: values    // the dictionary values are data for the chart
           }]
         },
         options: {
           responsive: true,
           plugins: {
             title: {
               display: false,
             },
            
             legend: {
               display: false,
             }
           },
           scales: {
              y: {
                min: 0,
                max: 1500,
              },
           },
         }
     });
   }


   function displayData2 (keys, values, recipeId) {
     // Each chart has a unique ID selector constructed from the recipeId
     chartId = "#recipe1-" + recipeId;
     myChart = new Chart(document.querySelector(chartId), {
         type: 'bar',
         data: {
           labels: ['Act Average Score'],     // the dictionary keys are the labels for the chart
           datasets: [{
             backgroundColor: ['#999b84'],
             data: values    // the dictionary values are data for the chart
           }]
         },
         options: {
           responsive: true,

           plugins: {
             title: {
               display: false,
             },
             legend: {
               display: false,
             }
           },
           scales: {
              y: {
                min: 0,
                max: 36,
              },
           },
         }
     });
   }



