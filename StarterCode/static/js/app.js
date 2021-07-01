//READ IN JSON FILE
d3.json("samples.json").then(function(data) {
    console.log(data); 
    console.log(data.samples); 

    
    // var TEST = d3.select("#sample-metadata");
    //test.html(""); THIS CLEARS OUT THE HTML TO MAKE IT BLANK
    // console.log(TEST);
}); 


// START WITH DROP DOWN AND TRY TO POPULATE IT FOR ONE SPECIFIC ID THIS IS WHAT STEVE SAYS WILL HELP TO GET YOU STARTED 

// SAME CONCEPT AS THE TABLE SECTION FOR THE UFO HW
console.log("#######################################"); 



//Display a default plot by using the init function WHICH YOU CALL AT THE END
// Values = sample_values
// Labels = otu_ids
// Hovertext = otu_labels 

// FROM UFO HW - THIS IS HOW YOU POPULATE THE DROPDOWN 
// filteredData.forEach((UFO) => {
//     var row = tbody.append("tr");
//     Object.entries(UFO).forEach(([key, value]) => {
//       var cell = row.append("td");
//       cell.text(value);
//     });
//   });
// };
  
  
  
 

//function buildMetadata(sample)
//function buildCharts(sample)