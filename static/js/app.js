// Populate the samples drop down when the dashboard loads
function init() {
    d3.json("../data/samples.json").then((data) => {
        var dropDown = d3.select('#selDataset');
        console.log(data);
        data.names.forEach((name) => {
            dropDown.append('option').text(name).property('value', name);
        })
    });
}


function optionChanged() {

    var dropdownMenu = d3.select("#selDataset");

    var person_id = dropdownMenu.property("value");

    // clear the previous demographic info
    d3.select("#sample-metadata").text("value", "");



    console.log(person_id)

    //d3.json("../data/samples.json").then((person_id) => {
    //    console.log(value);
    //value.

    //build plots for person id
    //buildPlots(person_id);

    d3.json("../data/samples.json").then((data) => {

        //grab selected person's metadata for demographic info section of the dashboard
        var persondata = data.metadata.filter((sample) => sample.id === parseInt(person_id))[0];

        console.log(persondata);

        var demographic_tile = d3.select("#sample-metadata");

        Object.entries(persondata).forEach(([key, value]) => demographic_tile.append("h4").text(`${key}: ${value}`));

        //grab the selected person's sample data to use for plotly graphs
        var sample = data.samples.filter(x => x.id.toString() === person_id)[0];

        var sample_values = sample.sample_values;
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;

        //console log data to ensure correct values were pulled
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //slice top 10 sample data and assign to variables
        var top_sample_values = sample.sample_values.slice(0, 10);
        var top_otu_ids = sample.otu_ids.slice(0, 10);
        var top_otu_labels = sample.otu_labels.slice(0, 10);

        var yticks = top_otu_ids.map(top_otu_ids => `OTU ${top_otu_ids}`).reverse();

        //console log data to ensure correct values were pulled
        console.log(top_sample_values);
        console.log(top_otu_ids);
        console.log(top_otu_labels);

        console.log(sample);

        var trace1 = {
            x: top_sample_values.reverse(),
            y: yticks,
            text: top_otu_labels.reverse(),
            name: "Top Samples",
            type: "bar",
            orientation: "h"
        };

        //data
        var data = [trace1];

        //layout
        var layout = {
            title: "Top 10 Samples for ID",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        //render 10 ten sample bar plot
        Plotly.newPlot("bar", data, layout);

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
        };

        var data = [trace2];

        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 800,
            width: 1200
        };

        Plotly.newPlot('bubble', data, layout);



    });


}

//function buildPlots(person_id) {

//    d3.json("../data/samples.json").then(function (incomingdata) {

//       console.log(incomingdata);

//Grab values from response json object to build the plots
//var sample_values = data.dataset.sample_values;
//var otu_ids = data.dataset.otu_ids;
//var otu_labels = data.dataset.otu_labels;

//console.log(sample_values);

//bar plot
//var trace1 = {
//   type: "bar",



//   });
//}


init();