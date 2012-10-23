$("form").submit(function(){
  console.time("pwdc timing");

  var pwdField = $(this).find("input[data-pwdc]"),
      saltKey  = pwdField.attr("data-pwdc-saltid"), // Secret user-salt to be applied at server side. Not optimal but hey it's a PoC.
	  salt     = $(this).find("#"+saltKey).val(),
	  rounds   = pwdField.attr("data-pwdc-rounds"),
	  rounds   = parseInt(rounds, 10),
      pwd      = pwdField.val(),
	  oldPwd   = pwdField.val(),
      count    = 0;
  
  // Hash it up!
  do {
    pwd = sha256_digest(salt+pwd);
  }
  while( ++count < rounds);
  
  // Write it back..
  pwdField.val(pwd);

  console.timeEnd("pwdc timing");
  console.log("rounds completed:", count);
  console.log("salt (username):", salt);
  console.log("password written by user:", oldPwd);
  console.log("password to be submitted:", pwd);
});

// Don't actually submit -- useful to keep console.log statements alive ;-)
$("form").submit(function(){ return false; } );