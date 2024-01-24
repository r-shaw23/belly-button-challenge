<script src="https://d3js.org/d3.v5.min.js"></script>
// data from URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Extract data
  const sampleValues = data.samples[0].sample_values.slice(0, 10);
  const otuIds = data.samples[0].otu_ids.slice(0, 10);
  const otuLabels = data.samples[0].otu_labels.slice(0, 10);

  // horizontal bar chart
  const trace = {
    x: sampleValues,
    y: otuIds.map(id => `OTU ${id}`),
    text: otuLabels,
    type: "bar",
    orientation: "h"
  };

  const data = [trace];

  const layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", data, layout);
});
<div>
  <label for="selDataset">Select an individual:</label>
  <select id="selDataset"></select>
</div>
// data from URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Populate the dropdown menu
  const dropdownMenu = d3.select("#selDataset");
  const individuals = data.names;

  individuals.forEach(individual => {
    dropdownMenu.append("option").text(individual).property("value", individual);
  });

  // Extract data 
  const sampleValues = data.samples[0].sample_values.slice(0, 10);
  const otuIds = data.samples[0].otu_ids.slice(0, 10);
  const otuLabels = data.samples[0].otu_labels.slice(0, 10);

  // Create horizontal bar chart
  const trace = {
    x: sampleValues,
    y: otuIds.map(id => `OTU ${id}`),
    text: otuLabels,
    type: "bar",
    orientation: "h"
  };

  const data = [trace];

  const layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", data, layout);
});
// Fetch data from URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Populate dropdown menu
  const dropdownMenu = d3.select("#selDataset");
  const individuals = data.names;

  individuals.forEach(individual => {
    dropdownMenu.append("option").text(individual).property("value", individual);
  });

  // Initialize the chart 
  updateCharts(data.samples[0]);

  // Event handler for dropdown 
  function optionChanged(selectedIndividual) {
    // Find the data for selected individual
    const selectedData = data.samples.find(sample => sample.id === selectedIndividual);
    // Update the charts 
    updateCharts(selectedData);
  }

  // Add an event listener to dropdown
  d3.select("#selDataset").on("change", function() {
    const selectedIndividual = d3.select(this).property("value");
    optionChanged(selectedIndividual);
  });

  // Function to update charts
  function updateCharts(sampleData) {
    // Update the bar chart
    updateBarChart(sampleData);
    // Update bubble chart
    updateBubbleChart(sampleData);
  }

  // Function to update bar chart
  function updateBarChart(sampleData) {
    const sampleValues = sampleData.sample_values.slice(0, 10);
    const otuIds = sampleData.otu_ids.slice(0, 10);
    const otuLabels = sampleData.otu_labels.slice(0, 10);

    // Create horizontal bar chart
    const trace = {
      x: sampleValues,
      y: otuIds.map(id => `OTU ${id}`),
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };

    const data = [trace];

    const layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("bar", data, layout);
  }

  // Function to update bubble chart
  function updateBubbleChart(sampleData) {
    const trace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Viridis"
      }
    };

    const data = [trace];

    const layout = {
      title: "Bubble Chart",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bubble", data, layout);
  }
});
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<div id="sample-metadata">
  <!-- Metadata will be displayed here -->
</div>
// Fetch data from the provided URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
  
  // Populate dropdown 
  const dropdownMenu = d3.select("#selDataset");
  const individuals = data.names;

  individuals.forEach(individual => {
    dropdownMenu.append("option").text(individual).property("value", individual);
  });

  // Initialize chart 
  updateCharts(data.samples[0]);
  displayMetadata(data.metadata[0]); // Display metadata for the first individual

  // Event handler dropdown 
  function optionChanged(selectedIndividual) {
    // Find the data for the selected 
    const selectedData = data.samples.find(sample => sample.id === selectedIndividual);
    // Update the charts with the new data
    updateCharts(selectedData);
    // Display metadata for the selected 
        const selectedMetadata = data.metadata.find(metadata => metadata.id === +selectedIndividual);
    displayMetadata(selectedMetadata);
  }

  // Add an event listener to dropdown
  d3.select("#selDataset").on("change", function() {
    const selectedIndividual = d3.select(this).property("value");
    optionChanged(selectedIndividual);
  });

  // Function to update charts
  function updateCharts(sampleData) {
    // Update bar chart
    updateBarChart(sampleData);
    // Update bubble chart
    updateBubbleChart(sampleData);
  }

  // Function to update bar chart
  function updateBarChart(sampleData) {
    // ... (unchanged)
  }

  // Function to update bubble chart
  function updateBubbleChart(sampleData) {
    // ... (unchanged)
  }

  // Function to display metadata
  function displayMetadata(metadata) {
    // Select div where to display
    const metadataDiv = d3.select("#sample-metadata");

    // Clear previous metadata
    metadataDiv.html("");

    // Iterate through each key-value pair and display 
    Object.entries(metadata).forEach(([key, value]) => {
      metadataDiv.append("p").text(`${key}: ${value}`);
    });
  }
});
