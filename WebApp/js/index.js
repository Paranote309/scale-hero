// ------------------- Login Modal Form -------------------//
$( function() {
    var
    form =  $("form"),

      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      weight = $("#weight"),
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
        var weight_value = weight.val();
        allFields.removeClass("ui-state-error");

        valid = valid && weight_value > 0;

        if (valid) {
            // add data to database
            console.log(weight_value);
            data.dialog( "close" );
        }

        return valid;
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

    $( "#sign-up" ).button().on( "click", function() {
    create.dialog("open");
    });

    $( "#login" ).button().on( "click", function() {
        loginDialogue.dialog("open");
    });

    $( "#add-data" ).button().on( "click", function() {
        data.dialog("open");
    });

    $( "#sign-up-form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });

    $( "#login-form" ).on( "submit", function( event ) {
        event.preventDefault();
        login();
    });

    $( "#data-form" ).on("submit", function (event) {
        event.preventDefault();
        addData();
    });
});

// ------------------- Chart Data -------------------//
localStorage.setItem(2021, JSON.stringify({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
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