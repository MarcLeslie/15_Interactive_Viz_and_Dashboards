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

        //BONUS 
        var washFreq = result.wfreq; 
        console.log(washFreq); 

        //WASH FREQ "SINGLE ANGULAR GAUGE CHART" 
        // WHY IS THIS HERE AND NOT AT THE BOTTOM?????????????????
        var gaugeTime = [
            {
                domain: {x: [0,1], y: [0,1]},
                value: washFreq, 
                title: {text: "How Often This Person Washes That Belly Button <br> Scrubs Per Week"}, 
                type: "indicator",
                mode: "gauge+number", //this must be gauge+number  - gauge + number will not work 
                gauge: {axis: {range: [null, 9] } }
            }
           ];       

            var gaugeLayout = {width: 600, height: 400};
    
        Plotly.plot("gauge", gaugeTime, gaugeLayout); 

        var panel = d3.select("#sample-metadata"); //panel comes from HTML division class; sample-metadata is the division ID 
        //clear the panel before inserting all your metadata by passing an empty string ""
        panel.html(""); 

        //obj entries allows you to access key/value pair data - iterate over them
        Object.entries(result).forEach(([key, value]) => {   //pull from the var result the info 
            panel.append("h5").text(`${key.toUpperCase()}:${value}`); //this creates a blank h5 tag for each key/value pair - can see if you use inspect in live server; adding in .text key/value populates the data
        });
    });
}; //END OF FUNCTION  BUILDMETADATA



//BAR CHART: Values = sample_values, Labels = otu_ids, Hovertext = otu_labels 
function buildCharts(sample) {
    //GET YOUR DATA 
    d3.json("samples.json").then(function(data) {
        console.log(data);  //You could also do (data.samples) 
        var samples = data.samples; //calls out the subset of data that has the data for this section 
        console.log(samples); 

        //FILTER DATA FOR JUST ONE PERSON 
        // sampleObj is the same as forEachRow
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        var result = resultArray[0]; 
        console.log(result); 

        //parse it - now that it's been pulled out 
        var sample_values = result.sample_values; 
        console.log(sample_values); 
        var otu_ids = result.otu_ids;
        console.log(otu_ids); 
        var otu_labels = result.otu_labels; 
        console.log(otu_labels); 

        //now you have the data out, so build that bar chart
        //slice to get JUST the top 10 bacteria OTU IDS, which are already sorted in decreasing order
        var barData = [{
            y: otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(), 
            type: "bar",
            orientation: "h"
        }]; 

        var barLayout = {
            title: "Top 10 Bacteria Found in This Person's Bellybutton", 
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 250,
            }, 
        }; 

        Plotly.plot("bar", barData, barLayout); 

        //BUBBLE CHART - HAS PRETTY MUCH THE EXACT SAME DATA AS THE BAR CHART BUT, YOU KNOW, BUBBLES
        var bubbleTime = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels, 
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }; 

        var bubbleData = [bubbleTime]; 

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample", 
            showlegend: false, 
            height: 600,
            width: 1400,
            hovermode: "closest", 
            xaxis: {title: "OTU ID"},
            margin: {
                top: 20,
                right: 0,
                bottom: 20,
                left: 0,
            }, 
        };
        Plotly.plot("bubble", bubbleData, bubbleLayout); 

        

    }); //DATA ACCESS ENDS HERE   
};  //END OF FUNCTION BUILDCHARTS


// INITIALIZE 
function init() {
        var pullDownMenu = d3.select("#selDataset"); //selDataset comes from HTML ID
        d3.json("samples.json").then(function(data) {

            var names = data.names;
            console.log(data.names);  

            names.forEach((sample) => {
                pullDownMenu.append("option").property("value" , sample).text(sample); //this creates under the ID selDataset in Insepct and gives you all the IDS; .property gives dropdown, .text gives you the IDs
            });
        });
    buildMetadata(940); //adding 940 here tells it to run the above function just for person # 940
    buildCharts(940); //adding 940 here tells it to run the above function just for person # 940
}; 

// Make it so that the change in sample ID = change in data  
// WHY IS THE RPM CHART NOT PUT DOWN HERE?????????????????????????
function optionChanged(nextSample) {
    buildMetadata(nextSample); //So when you change the sample ID, change the metadata, which changes the data you pull....
    buildCharts(nextSample); //....which changes the charts 
}; 

// INITIALIZE ALL OF IT
init(); 


// MAKE THIS GENERAL AND NOT ID 940 SPECIFIC 

















// ###################################################################################################################

// START WITH DROP DOWN AND TRY TO POPULATE IT FOR ONE SPECIFIC ID THIS IS WHAT STEVE SAYS WILL HELP TO GET YOU STARTED 

// SAME CONCEPT AS THE TABLE SECTION FOR THE UFO HW





// FROM UFO HW - THIS IS HOW YOU POPULATE THE DROPDOWN 
// filteredData.forEach((UFO) => {
//     var row = tbody.append("tr");
//     Object.entries(UFO).forEach(([key, value]) => {
//       var cell = row.append("td");
//       cell.text(value);
//     });
//   });
// }