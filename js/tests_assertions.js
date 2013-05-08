    //#------->

$(function() {

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var open = getUrlVars()["open"]
    var reRun = getUrlVars()["testNumber"];

    if(!open && !reRun){
      $('#qunit').hide(); 
    }

    $('#x').click(function(){

      if($('#qunit').hasClass('open')){
         $('#qunit').slideDown().removeClass('open');
         return;
      }

      $('#qunit').slideUp().addClass('open');

    })






  QUnit.log = function(result, message) {
    if (window.console && window.console.log) {
      window.console.log(result +' :: '+ message);
    }   
  }



test( "select from object cvtRGBtoHex result", function() {

    var color = $('#x').css('background-color');

    if(color.indexOf('#') !== -1){
        color = color.substring(1,color.length);
    };

    color = cvtRGBtoHex(color);

    equal( color, '0d3349', "1 and 1 are the same value and type" );

});






// test( "notDeepEqual test", function() {
//   var obj = { foo: "bar" };
//   notDeepEqual( obj, { foo: "bla" }, "Different object, same key, different value, not equal" );
// });






// test( "ok test", function() {
//   ok( true, "true succeeds" );
//   ok( "non-empty", "non-empty string succeeds" );
 
//   ok( false, "false fails" );
//   ok( 0, "0 fails" );
//   ok( NaN, "NaN fails" );
//   ok( "", "empty string fails" );
//   ok( null, "null fails" );
//   ok( undefined, "undefined fails" );
// });






// test( "throws", function() {
 
//   function CustomError( message ) {
//     this.message = message;
//   }
 
//   CustomError.prototype.toString = function() {
//     return this.message;
//   };
 
//   throws(
//     function() {
//       throw "error"
//     },
//     "throws with just a message, no expected"
//   );
 
//   throws(
//     function() {
//       throw new CustomError();
//     },
//     CustomError,
//     "raised error is an instance of CustomError"
//   );
 
//   throws(
//     function() {
//       throw new CustomError("some error description");
//     },
//     /description/,
//     "raised error message contains 'description'"
//   );
// });





// test( "a test", function() {
//   stop();
//   asyncOp();
//   setTimeout(function() {
//     equals( asyncOp.result, "someExpectedValue" );
//     start();
//   }, 150 );
// });




// test( "a test", 2, function() {
 
//   function calc( x, operation ) {
//     return operation( x );
//   }
 
//   var result = calc( 2, function( x ) {
//     ok( true, "calc() calls operation function" );
//     return x * x;
//   });
 
//   equal( result, 4, "2 square equals 4" );
// });




// asyncTest( "asynchronous test: one second later!", function() {
//   expect( 1 );
//   setTimeout(function() {
//     ok( true, "Passed and ready to resume!" );
//     start();
//   }, 1000);
// });







// test( "a test", function() {
//   notStrictEqual( 1, "1", "String '1' and number 1 don't have the same value" );
// });







// test( "strictEqual test", function() {
//   strictEqual( 1, 1, "1 and 1 are the same value and type" );
// });







// test( "equal test", function() {
//   equal( 0, 0, "Zero; equal succeeds" );
//   equal( "", 0, "Empty, Zero; equal succeeds" );
//   equal( "", "", "Empty, Empty; equal succeeds" );
//   equal( 0, 0, "Zero, Zero; equal succeeds" );
//   equal( "three", 3, "Three, 3; equal fails" );
//   equal( null, false, "null, false; equal fails" );
// });






//     module("Basic Unit Test");
//     test("Sample test", function() {
//       expect(1);
//       equal(divide(4,2),2, 'Expected 2 as the result, result was ' + 
//       divide(4,2));
//     });
//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });

//     module("Basic Unit Test 2");

//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {

// expect(1000000);
//       for (var i = 0; i < 1000000; i++) {
//         equal(divide(8,2),2,'Expected 4 as the result, result was ' +  divide(8,2));
//       };

      
      
//     });
//     module("Basic Unit Test 2");
 
    function divide(a,b){
      return a / b;
    }


function startPolling()
{
    var handle = window.setInterval(function(){

        var element = $(".failed");
        var total = element.html();
        if (total) {
            
            $('#x').append('<div id="fails">'+total+'</div>');
            window.clearInterval(handle);
        }

    }, 100);
}

startPolling();


  });