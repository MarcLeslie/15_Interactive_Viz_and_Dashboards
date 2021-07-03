//POPULATE DROPDOWN 
function buildMetadata(sample) {

    //GET YOUR DATA
    d3.json("samples.json").then(function(data) {
        console.log(data);  //You could also do (data.samples) 
        var metadata = data.metadata; 
        console.log(metadata); 
        
        //FILTER DATA FOR JUST ONE PERSON 
        // sampleObj is the same as forEachRow
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); 
        console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        var result = resultArray[0]; 
        console.log(result); 

        var panel = d3.select("#sample-metadata"); //panel comes from HTML division class; sample-metadata is the division ID 
        //clear the panel before inserting all your metadata by passing an empty string ""
        panel.html(""); 

        //obj entries allows you to access key/value pair data - iterate over them
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5"); //this creates a blank h5 tag for each key/value pair
        })

    });
}; //END OF FUNCTION  BUILD METADATA

// INITIALIZE 
function init() {
    buildMetadata(940); //adding 940 here tells it to run the above function just for person # 940
}

init(); 













// PART 1: DEMO INFO
// PART 2: BAR CHART
// PART 3: BUBBLE CHART
// BONUS: RPM CHART
// WILL NEED TO START WITH INIT






// ###################################################################################################################

// START WITH DROP DOWN AND TRY TO POPULATE IT FOR ONE SPECIFIC ID THIS IS WHAT STEVE SAYS WILL HELP TO GET YOU STARTED 

// SAME CONCEPT AS THE TABLE SECTION FOR THE UFO HW


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
// }