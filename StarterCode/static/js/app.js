// select the sample metadata box so we can fill it with data
let demoInfo = d3.select("#sample-metadata");
 // append an ordered list item for each data entry we want
 let newID = demoInfo.append('ol')
 let newEthnicity = demoInfo.append('ol')
 let newGender = demoInfo.append('ol')
 let newAge = demoInfo.append('ol')
 let newLocation = demoInfo.append('ol')
 let newBbtype = demoInfo.append('ol')
 let newWfreq = demoInfo.append('ol')
// select the dropdown menu so we can add options to select
let dropdownMenu = d3.select("#selDataset");
// get a list of all the names
let names = data.names
// append each name to the dropdown menu
for (let i = 0; i < names.length; i++){
    currentID = dropdownMenu.append('option')
    currentID.text(names[i])
}
// create an empty list to fill with all the metadata we want to use
let sampleDicts = []
// loop through the data and create a dictionary
for (let i = 0; i<data.samples.length;i++){
    let sampleDict = {
        id: data.metadata[i].id,
        ethnicity: data.metadata[i].ethnicity,
        gender: data.metadata[i].gender,
        age: data.metadata[i].age,
        location: data.metadata[i].location,
        bbtype: data.metadata[i].bbtype,
        wfreq: data.metadata[i].wfreq
    }
    // append to the list
    sampleDicts.push(sampleDict)
    
}
// create a function the will populate the graphs and imformation
// about the first sample 
function init() { 
    // use the dictinary of the first sample to populate the metadata box
    // create an empty list
    let newInfo = []
    // loop through the dictionary and grab the keys and values
    Object.entries(sampleDicts[0]).forEach(([key,value])=>{
        // use the keys and values to create the text for each ol
        newInfo.push(`${key}: ${value}`)
    })
    // 
    // update the text for each ol
    newID.text(newInfo[0])
    newEthnicity.text(newInfo[1])
    newGender.text(newInfo[2])
    newAge.text(newInfo[3])
    newLocation.text(newInfo[4])
    newBbtype.text(newInfo[5])
    newWfreq.text(newInfo[6])
    // create new empty lists for the data used in the bar graph
    let otu_ids = []
    let sample_values = []
    let otu_labels = []
    // append the first ten entries to the lists
    for (let i = 0; i < 10; i++) {
        otu_ids.push(data.samples[0].otu_ids[i])
        sample_values.push(data.samples[0].sample_values[i])
        otu_labels.push(data.samples[0].otu_labels[i])
    }
    // create an empty list for the lables of the y axis
    yArray = []
    // loop through the ids and append the new lable to the list
    for (i = 0;i<otu_ids.length;i++){
        yArray.push('OTU ' + otu_ids[i])
    }
    // create the bar graph
    let trace1 = {
        x: sample_values,
        y: yArray,
        text: otu_labels,
        type: 'bar',
        orientation: "h"
    }
    // create a new list for the marker colors dependent on the otu_ids
    let markerColor = []
    data.samples[0].otu_ids.forEach(value => {
        markerColor.push(`rgb(100, ${value/10}, 200)`)
    })
    // create the bubble graph
    let trace2 = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        text: otu_labels,
        mode: 'markers',
        marker:{
            size: sample_values,
            color: markerColor 
        }
    }
    // create the layout for the bar graph
    let layout = {
        title: "Sample Values for " + names[0],
        axis: {tickvals:otu_labels}
        };
    // create the layout for the bubble graph
    let layout2 = {
        yaxis: {autorange:true}
        };
    // use plotly to add the graphs to the page
    Plotly.newPlot('plot',[trace1],layout)
    Plotly.newPlot('plot2',[trace2],layout2)
  }
// select the dropdown menu so when it is changed we can repopulate the data
d3.selectAll("#selDataset").on("change", updatePlotly);
// create a function the will happen when the dropdown option is changed
// this will be the same as the init function but depends on what the value
// of the dropdown menu is 
function updatePlotly() {

    let name = dropdownMenu.property("value");
    let newInfo = []
    Object.entries(sampleDicts[names.indexOf(name)]).forEach(([key,value])=>{
        newInfo.push(`${key}: ${value}`)
    })
    // 
    newID.text(newInfo[0])
    newEthnicity.text(newInfo[1])
    newGender.text(newInfo[2])
    newAge.text(newInfo[3])
    newLocation.text(newInfo[4])
    newBbtype.text(newInfo[5])
    newWfreq.text(newInfo[6])

    let otu_ids = []
    let sample_values = []
    let otu_labels = []
    for (let i = 0; i < 10; i++) {
        otu_ids.push(data.samples[names.indexOf(name)].otu_ids[i])
        sample_values.push(data.samples[names.indexOf(name)].sample_values[i])
        otu_labels.push(data.samples[names.indexOf(name)].otu_labels[i])
    }
    yArray = []
    for (i = 0;i<otu_ids.length;i++){
        yArray.push('OTU ' + otu_ids[i])
    }
    let trace1 = {
        x: sample_values,
        y: yArray,
        text: otu_labels,
        type: 'bar',
        orientation: "h"
    }
    let markerColor = []
    data.samples[names.indexOf(name)].otu_ids.forEach(value => {
        markerColor.push(`rgb(100, ${value/10}, 200)`)
    })
    let trace2 = {
        x: data.samples[names.indexOf(name)].otu_ids,
        y: data.samples[names.indexOf(name)].sample_values,
        text: otu_labels,
        mode: 'markers',
        marker:{
            size: sample_values,
            color: markerColor
        }
    }
    let layout = {
        title: "Sample Values for " + name,
        axis: {tickvals:otu_labels}
        };
    let layout2 = {
        yaxis: {autorange:true}
        };
    let traceData = [trace1];
    traceData.push(trace2);
    
    Plotly.newPlot('plot',[trace1],layout)
    Plotly.newPlot('plot2',[trace2],layout2)
  }
// run the initial function
init()





