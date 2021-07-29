// ------------------- Constants -------------------//

const date = new Date();

// ------------------- Database -------------------//
var logged_in = true;

if (localStorage.getItem("database") == null) {

    localStorage.setItem(
        "database",
        JSON.stringify({
            "emails": {
                "local@email.com": "local"
            },
            "accounts": {
                "local": {
                    "password": "",
                    "labels": [],
                    "weight_data": [],
                    "height": 0
                }
            }
        })
    );

    logged_in = false;
}

var current_username = "local";

var database = JSON.parse(localStorage.getItem("database"));

var user_data = database.accounts[current_username];

// ------------------- Login Modal Form -------------------//
$(function () {
    const bmi = function (weight) { return ((weight / (Math.pow(user_data.height, 2) / 100)) * 100).toFixed(2); };
    const change_percentage = function (value1, value2) { return (((value2 - value1) / value1) * 100).toFixed(2);};

    function updateGraphDetails() {
        let start_weight = user_data.weight_data[0];
        let current_weight = user_data.weight_data[user_data.weight_data.length - 1];
        let start_bmi = bmi(start_weight);
        let current_bmi = bmi(current_weight);

        $("#start-weight").text(start_weight + "kg");
        $("#current-weight").text(current_weight + "kg");

        $("#weight-change-percentage").text(change_percentage(start_weight, current_weight) + "%");
        $("#current-height").text(user_data.height + "cm");

        $("#current-bmi").text(current_bmi);
        $("#bmi-change").text((current_bmi - start_bmi).toFixed(2));
    }

    if (logged_in) {
        $("#welcome-name").text(current_username);
        $("#guest-buttons").addClass("hidden");
        updateGraphDetails();
    }

    var
    form =  $("form"),

      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#username" ),
      email = $( "#email" ),
      password = $( "#new-password" ),
      weight = $("#weight"),
      height = $("#height"),
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
          create.dialog( "close" );
        }
        return valid;
    }

    function login() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength( name, "username", 3, 16 );
        valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( password, "password", 5, 16 );

        if ( valid ) {
            login.dialog( "close" );
        }

        return valid;
    }

    function addData() {
        var valid = true;
        var weight_value = parseInt(weight.val());
        allFields.removeClass("ui-state-error");

        valid = valid && weight_value > 0;

        if (valid) {
            let current_date = date.getDate() + "/" + (date.getMonth() + 1);

            user_data.weight_data.push(weight_value);
            user_data.labels.push(current_date);

            localStorage.setItem("database", JSON.stringify(database));
            updateChart(lineChart, "Weight (kg)", user_data.labels, user_data.weight_data);
            updateGraphDetails();
            data.dialog("close");
        }

        return valid;
    }

    function changeSettings() {
        var valid = true;
        var height_value = parseInt(height.val());
        valid = valid && height_value > 0;

        if (valid) {
            user_data.height = height_value;
            localStorage.setItem("database", JSON.stringify(database));
            updateGraphDetails();
            settings.dialog("close");
        }

    }

    var create = $("#create-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
          "Create": addUser,
          Cancel: function() {
            create.dialog( "close" );
          }
        },
        close: function() {
          form[ 0 ].reset(); // reset form
          allFields.removeClass( "ui-state-error" );
        }
      });

    var loginDialogue = $("#login-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            "Login": login,
            Cancel: function() {
                loginDialogue.dialog( "close" );
            }
        },
        close: function() {
          form[ 1 ].reset(); // reset form
          allFields.removeClass( "ui-state-error" );
        }
    });

    var data = $("#data-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            "Add": addData,
            Cancel: function() {
                data.dialog( "close" );
            }
        },
        close: function() {
            form[ 2 ].reset(); // reset form
            allFields.removeClass( "ui-state-error" );
        }
    });

    var settings = $("#settings-dialogue").dialog({
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            "Add": changeSettings,
            Cancel: function() {
                settings.dialog( "close" );
            }
        },
        close: function() {
            form[ 3 ].reset(); // reset form
            allFields.removeClass( "ui-state-error" );
        }
    });

    $( "#sign-up" ).button().on( "click", function() {
    create.dialog("open");
    });

    $( "#login" ).button().on( "click", function() {
        loginDialogue.dialog("open");
    });

    $( "#add-data" ).button().on( "click", function() {
        data.dialog("open");
    });

    $( "#settings-button" ).button().on( "click", function() {
        settings.dialog("open");
    });

    // prevent default
    $("form").on("submit", function (event) {
        event.preventDefault();
        return false;
    });

    $("#sign-up-form").on("keypress", function (event) {
        if (event.which == 13) {
            addUser();
        }
    });

    $( "#login-form" ).on( "keypress", function(event) {
        if (event.which == 13) {
            login();
        }
    });

    $( "#data-form" ).on("keypress", function (event) {
        if (event.which == 13) {
            addData();
        }
    });

    $("#settings-form").on("keypress", function (event) {
        if (event.which == 13) {
            changeSettings();
        }
    });

    // ------------------- Chart-------------------

    var ctx = $('#liveChartCanvas');

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: user_data.labels,
            datasets: [{
                label: 'Weight (kg)',
                data: user_data.weight_data,
                backgroundColor: '#55BEC08F',
                borderColor: 'black',
                color: '#55bec0',
                borderWidth: 1,
                fill: true,
                tension: 0.2,
                spanGaps: true,
                maintainAspectRatio: true
            }],
        },
        // options: {
        //     scales: {
        //         xAxes: [{
        //             display: true
        //         }],
        //         yAxes: [{
        //             ticks: {
        //                 beginAtZero: true,
        //                 // Include a celsius symbol in the ticks
        //                 callback: function (value, index, values) {
        //                     return value + ' kg';
        //                 }
        //             }
        //         }],
        //         responsive: true,
        //     },

        //     tooltips: {
        //         callbacks: {
        //             label: function (tooltipItem, data) {
        //                 var label = data.datasets[tooltipItem.datasetIndex].label || '';

        //                 if (label) {
        //                     label = ' ' + tooltipItem.yLabel + ' kg';
        //                 }
        //                 return label;
        //             },
        //             value: function (tooltipItem, data) {
        //                 var value = data.datasets[tooltipItem.datasetIndex].label || '';

        //                 if (value) {
        //                     value = 'Day: ' + tooltipItem.xLabel;
        //                 }
        //                 return value;
        //             }
        //         }
        //     }
        // }
    });
});

// ------------------- Chart Data -------------------//

// Updates chart with new title and data
function updateChart(chart, chartTitle, xAxes, yAxes) {
    let chartData = {
        labels: xAxes,
        datasets: [{
            label: chartTitle,
            data: yAxes,
        }]
    };
    chart.data.labels = xAxes;
    chart.data.datasets[0].label = chartTitle;
    chart.data.datasets[0].data = yAxes;
    chart.update();
}

/*

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

// ------------------- Functions -------------------

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