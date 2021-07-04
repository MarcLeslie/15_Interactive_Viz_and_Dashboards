//POPULATE DROPDOWN 

function getThatData(eachRecord) {

    //GET YOUR DATA 
    d3.json("samples.json").then(function(data) {
        // console.log(data);  
        let yourData = data.metadata; 
        // console.log(metadata); 
        
        //FILTER DATA FOR JUST ONE PERSON 
        // sampleObj is the same as forEachRow
        let resultArray = yourData.filter(eachRecordObj => eachRecordObj.id == eachRecord); 
        // console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        let result = resultArray[0]; 
        // console.log(result); 

        let panel = d3.select("#sample-metadata"); //panel comes from HTML division class; sample-metadata is the division ID 
        //clear the panel before inserting all your metadata by passing an empty string ""
        panel.html(""); 

        //obj entries allows you to access key/value pair data - iterate over them
        Object.entries(result).forEach(([key, value]) => {   //pull from the var result the info 
            panel.append("h6").text(`${key.toUpperCase()}:${value}`); //this creates a blank h5 tag for each key/value pair - can see if you use inspect in live server; adding in .text key/value populates the data
        });
    });
}; //END OF FUNCTION getThatData


function buildBarChart(eachRecord) {
    //GET YOUR DATA 
    d3.json("samples.json").then(function(data) {
        // console.log(data);  
        let samples = data.samples; //calls out the subset of data that has the data for this section 
        // console.log(samples); 

        //BAR CHART: Values = sample_values, Labels = otu_ids, Hovertext = otu_labels 
        let resultArray = samples.filter(eachRecordObj => eachRecordObj.id == eachRecord);
        // console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        let result = resultArray[0]; 
        // console.log(result); 

        //parse it - now that it's been pulled out 
        let sample_values = result.sample_values; 
        // console.log(sample_values); 
        let otu_ids = result.otu_ids;
        // console.log(otu_ids); 
        let otu_labels = result.otu_labels; 
        // console.log(otu_labels); 

        //now you have the data out, so build that bar chart
        //slice to get JUST the top 10 bacteria OTU IDS, which are already sorted in decreasing order
        let barData = [{
            y: otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(), 
            type: "bar",
            orientation: "h"
        }]; 

        let barLayout = {
            title: "Top 10 Bacteria Found in This Person's Bellybutton", 
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 250,
            }, 
        }; 

        Plotly.newPlot("bar", barData, barLayout); 
    }); //DATA ACCESS ENDS HERE   
};  //END OF FUNCTION buildBarChart



function buildBubbleChart(eachRecord) {
    //GET YOUR DATA 
    d3.json("samples.json").then(function(data) {
        // console.log(data);  
        let samples = data.samples; //calls out the subset of data that has the data for this section 
        // console.log(samples); 

        //BAR CHART: Values = sample_values, Labels = otu_ids, Hovertext = otu_labels 
        let resultArray = samples.filter(eachRecordObj => eachRecordObj.id == eachRecord);
        // console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        let result = resultArray[0]; 
        // console.log(result); 

        //parse it - now that it's been pulled out 
        let sample_values = result.sample_values; 
        // console.log(sample_values); 
        let otu_ids = result.otu_ids;
        // console.log(otu_ids); 
        let otu_labels = result.otu_labels; 
        // console.log(otu_labels); 

        //BUBBLE CHART - HAS PRETTY MUCH THE EXACT SAME DATA AS THE BAR CHART BUT, YOU KNOW, BUBBLES
        let bubbleTime = {
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

        let bubbleData = [bubbleTime]; 

        let bubbleLayout = {
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
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    }); //DATA ACCESS ENDS HERE   
};  //END OF FUNCTION buildBubbleChart


function buildGaugeChart(eachRecord) {
    //GET DATA
    d3.json("samples.json").then(function(data) {
        // console.log(data);  
        let yourData = data.metadata; 
        // console.log(metadata); 
        
        //FILTER DATA FOR JUST ONE PERSON 
        // sampleObj is the same as forEachRow
        let resultArray = yourData.filter(eachRecordObj => eachRecordObj.id == eachRecord); 
        // console.log(resultArray); //This gives you the array for just one person

        //pull out the data from the array 
        let result = resultArray[0]; 
        // console.log(result); 

        //BONUS 
        let washFreq = result.wfreq; 
        console.log(washFreq); 

        //WASH FREQ "SINGLE ANGULAR GAUGE CHART" 
        let gaugeTime = [
            {
                domain: {'x': [0,1], 'y': [0,1]},
                value: washFreq, 
                title: {text: "How Often This Person Washes That Belly Button <br> Scrubs Per Week"}, 
                type: "indicator",
                mode: "gauge+number", //this must be gauge+number  - gauge + number will not work   
                gauge: {axis: {range: [null, 9], tickvals: [0,1,2,3,4,5,6,7,8,9] }, //have to do "null" instead of 0 because data has null, not 0
                    'steps': [
                        {'range': [0, 1], 'color': '#ffffff'},
                        {'range': [1, 2], 'color': '#ccffff'},
                        {'range': [2, 3], 'color': '#99ffff'},
                        {'range': [3, 4], 'color': '#66ffff'},
                        {'range': [4, 5], 'color': '#33ffff'},
                        {'range': [5, 6], 'color': '#00ffff'},
                        {'range': [6, 7], 'color': '#00cccc'},
                        {'range': [7, 8], 'color': '#009999'},
                        {'range': [8, 9], 'color': '#006666'},
                    ],
                }, 
            }
           ];       

            let gaugeLayout = {width: 600, height: 400};
    
        Plotly.newPlot("gauge", gaugeTime, gaugeLayout); 
    }); //DATA ACCESS ENDS HERE   
};  //END OF FUNCTION buildGaugeChart


// INITIALIZE 
function init() {
        let pullDownMenu = d3.select("#selDataset"); //selDataset comes from HTML ID
        d3.json("samples.json").then(function(data) {

            let names = data.names;
            // console.log(data.names);

            names.forEach((eachRecord) => {
                pullDownMenu.append("option").property("value" , eachRecord).text(eachRecord); //this creates under the ID selDataset in Insepct and gives you all the IDS; .property gives dropdown, .text gives you the IDs
            });
        });
    getThatData(940); //adding 940 here tells it to run the above function just for person # 940 upon loading so that it populates something to look at 
    buildBarChart(940); 
    buildBubbleChart(940);
    buildGaugeChart(940);
}; 

//Now, lets make it so that crap changes 
function optionChanged(nextRecord) {
    getThatData(nextRecord); //So when you change the sample ID, change the metadata, which changes the data you pull....
    buildBarChart(nextRecord); //....which changes this chart 
    buildBubbleChart(nextRecord); //...and this chart
    buildGaugeChart(nextRecord); //..and this chart
}; 

// INITIALIZE ALL OF IT
init(); 

