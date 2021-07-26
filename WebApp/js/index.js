// ------------------- Login Modal Form -------------------//
$( function() {
    var dialog, form,

      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
          o.addClass( "ui-state-error" );
          updateTips( "Length of " + n + " must be between " +
            min + " and " + max + "." );
          return false;
        } else {
          return true;
        }
      }

      function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
          o.addClass( "ui-state-error" );
          updateTips( n );
          return false;
        } else {
          return true;
        }
      }


    function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( name, "username", 3, 16 );
        valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( password, "password", 5, 16 );

        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
          $( "#users tbody" ).append( "<tr>" +
            "<td>" + name.val() + "</td>" +
            "<td>" + email.val() + "</td>" +
            "<td>" + password.val() + "</td>" +
          "</tr>" );
          dialog.dialog( "close" );
        }
        return valid;
      }

      create = $("#create-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          "Create an account": addUser,
          Cancel: function() {
            create.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
        }
      });


      login = $("#login-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          "Create an account": addUser,
          Cancel: function() {
            login.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
        }
      });

      form = create.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
      });

      $( "#sign-up" ).button().on( "click", function() {
        create.dialog( "open" );
      });

      $( "#login" ).button().on( "click", function() {
        login.dialog( "open" );
      });

});

// ------------------- Chart Data -------------------//
localStorage.setItem(2021, JSON.stringify({
  labels: ['20/07', '21/07', '22/07', '23/07', '24/07', '25/07'],
  datasets: [{
    label: 'Weight(Kg)',
    data: [79, 80, 85, 80, 75, 75],
    backgroundColor: 'blue',
    borderColor: 'black',
    color: '#55bec0',
    borderWidth: 1,
    fill: false,
    tension: .2,
    spanGaps: true
  }]
}))


// ------------------- Chart-------------------

var ctx = $('#liveChartCanvas');
var myChart = new Chart(ctx, {
  type: 'line',
  // responsive: true,
    data: JSON.parse(localStorage.getItem(2021)),
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
  }
});

// ------------------- button-------------------//
$("#button").click(function(){
  $("#go").css("background-color","yellow");
});

// ------------------- change text-------------------//


/*

// ------------------- Creating the line chart -------------------

// Getting the canvas element in the HTML
const chartID = document.getElementById("liveChartCanvas").getContext("2d");

// The line chart object  with place holder name and empty data
let lineChart = new Chart(chartID, {
    type: 'line',
    data: { labels: [], datasets: [{ label: '', }] },
    options: {
        scales: {
            xAxes: [{
                display: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // Include a celsius symbol in the ticks
                    callback: function (value, index, values) {
                        return value + '°C';
                    }
                }
            }]
        }, tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label = ' ' + tooltipItem.yLabel + '°C';
                    }
                    return label;
                },
                value: function (tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (value) {
                        value = 'Day: ' + tooltipItem.xLabel;
                    }
                    return value;
                }
            }
        }
    }
});

// Updates chart with new title and data
function updateChart(chart, chartTitle, xAxes, yAxes) {
    let chartData = {
        labels: xAxes,
        datasets: [{
            label: chartTitle,
            fill: true,
            backgroundColor: 'rgba(82, 158, 103, .3)',
            borderColor: 'rgba(75, 158, 103, 1)',
            hoverBackgroundColor: 'rgba(82, 158, 103, 1)',
            hoverBorderColor: 'rgba(82, 158, 103, 1)',
            pointHoverRadius: 5,
            data: yAxes,
        }]
    }
    chart.data = chartData
    chart.update();
}


// ------------------- Firebase Data -------------------

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBouko_9CyfGGmrRjDe6wfgh_IqB5SSseY",
    authDomain: "cs-data-project.firebaseapp.com",
    databaseURL: "https://cs-data-project.firebaseio.com",
    projectId: "cs-data-project",
    storageBucket: "cs-data-project.appspot.com",
    messagingSenderId: "931333605550",
    appId: "1:931333605550:web:2f60d4a7b551228b2ac53f",
    measurementId: "G-E9Z92W973E"
});

// Getting the hourly data and cleaning it
let hourly = false; // User can change
let temperatureList = [];
let dateTimeList = [];
let dayList = [];

// Getting the mean data
let averageDay = true; // User can change
let firstRun = true;
let i = 0;
let meanDayList = [];
let meanTemperatureList = [];
let previousDay = "";
let temperatureTotal = 0;
let count = 0;

// ------------------- Functiions -------------------

// updating the chart data from the database
function updateChartData() {

    temperatureList = [];
    dateTimeList = [];
    dayList = [];

    firstRun = true;
    meanDayList = [];
    meanTemperatureList = [];
    i = 0;

    let dataReference = "Microbit Temperature Data (" + year + ")/" + month;
    let chartTitle = "Microbit Temperature Data (" + year + ") " + month;

    let microbitDatabaseData = firebase.database().ref(dataReference).orderByValue(); // Gets data in order of time

    microbitDatabaseData.on("child_added", function (item) {

        let data = item.val();

        dayList.push("Day " + data.Day);
        temperatureList.push(data.Temperature);
        dateTimeList.push(data.Time + " (" + data.Day + ")");

        if (hourly) {
            updateChart(lineChart, chartTitle, dateTimeList, temperatureList);
        }

        else if (averageDay) {

            if (firstRun) {
                previousDay = dayList[0];
                firstRun = false;
            };

            if (dayList[i] == previousDay) {
                temperatureTotal += temperatureList[i];
                count++;

            } else {
                meanDayList.push(previousDay);
                meanTemperatureList.push(Math.round(temperatureTotal / count)); // adds the mean average to a list
                temperatureTotal = 0;
                temperatureTotal += (temperatureList[i]);
                count = 1;
                previousDay = dayList[i];
            };

            i++;

            updateChart(lineChart, chartTitle, meanDayList, meanTemperatureList);
        };
    });
};

*/