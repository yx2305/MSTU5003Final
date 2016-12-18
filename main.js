//Rule1 (error handling) : testDate should be no later than college application date(appDate).
var dateInput;
var dateVal;
var applimitDate;
var testLimitDate1;
var testLimitDate2;
var testLimitDate3;
var gradeNum;
var testNumber;
var test1Time;
var test2Time;
var test3Time;
var prep1Time;
var prep2Time;
var prep3Time;
var rawDiffTestDays;
var diffTestDays;
document.querySelector('#seeYourPlan').disabled = true;// Uses should not be able to see report before they complete the date selection process.
document.querySelector('[name=testDate1]').disabled = true;
document.querySelector('[name=testDate2]').disabled = true;
document.querySelector('[name=testDate3]').disabled = true;
document.querySelector('[name=prepDate1]').disabled = true;
document.querySelector('[name=prepDate2]').disabled = true;
document.querySelector('[name=prepDate3]').disabled = true;

document.querySelector('[name=appDate]').addEventListener('change', function(event) {
  document.querySelector('[name=testDate1]').disabled = false;//after application date selection, enable testDate1 selection.
	dateInput = document.querySelector('[name=appDate]');
  dateVal = dateInput.value;
	applimitDate = dateVal;
	console.log("Set this date as limitDate to all testDate:"+applimitDate);
	document.querySelector('[name=testDate1]').max = applimitDate;
  document.querySelector('[name=testDate2]').max = applimitDate;
  document.querySelector('[name=testDate3]').max = applimitDate;
});
//Rule2: if user's grade is <12th grade, testNum should be >=2.
//Rule3 (error handling): if testNum=1, prepDate1 and preDate2 should be disabled.
document.querySelector('[name=Grade]').addEventListener('blur', function(event){
     gradeNum = document.querySelector('[name=Grade]').value;
     console.log('Grade:'+gradeNum);
});

document.querySelector('[name=testNum]').addEventListener('blur', function(event){
   testNumber=document.querySelector('[name=testNum]').value;
  console.log('testNumber:'+testNumber);
  console.log('grade:'+gradeNum);
  if(gradeNum<12&&testNumber<2){
    alert("You have enough time to take the test at least twice. Remember, most people have a higher score on the second test!");
    document.querySelector('[name=testNum]').value=2;
    testNumber=2;
  }
});
//Rule4 (error handling): testDate2 should be no early than testDate1; testDate3 should be no early than testDate2; prepDate1 should be early than testDate1, so should the other test-prep pairs; prepDate2 should be no early than testDate1, prepDate3 should be no early than testDate2.
// Rule5: if Grade<12 & testNum>=2, time between any two testDate should be >= 90 days. If the users violate this rule, give them alert and prevent them moving forward.

document.querySelector('[name=testDate1]').addEventListener('blur',function(event){
  document.querySelector('[name=prepDate1]').disabled = false;//after testDate1 selection, enable prepDate1 selection.
  dateInput = document.querySelector('[name=testDate1]');
  dateVal = dateInput.value;
  console.log('testDate1:'+dateVal);
      testLimitDate1 = dateVal;
  document.querySelector('[name=testDate2]').min = testLimitDate1;// testDate2 should be no early than testDate1
  document.querySelector('[name=prepDate1]').max = testLimitDate1;
  startDate = new Date(dateVal);
  test1Time = startDate.getTime();
  console.log('test1Time:'+test1Time);
});

document.querySelector('[name=prepDate1]').addEventListener('blur',function(event){
  console.log('testNumber:'+testNumber);

    dateInput = document.querySelector('[name=prepDate1]');
    dateVal = dateInput.value;
    console.log('prepDate1:'+dateVal);
    startDate = new Date(dateVal);
    prep1Time = startDate.getTime();
    console.log('prep1Time:'+prep1Time);
    // Rule6: PrepDates should be >=30 days before their corresponding testDates. If the users violate this rule, give them alert and prevent them proceeding.
    var rawDiffTime = test1Time-prep1Time;
    var diffDays = rawDiffTime/86400000;
    console.log('Days between prepDate1 and testDate1:'+diffDays);
    if(diffDays<30){
    alert('Give yourself at least 30 days to prepare for the test! Cramming for it will hurt you in the end! Please select a new preparation start date!');
    document.querySelector('[name=testDate2]').disabled = true;// Prevent the user moving forward.
  }else{
    document.querySelector('[name=testDate2]').disabled = false;
  }
    if(testNumber<2){
      document.querySelector('[name=testDate2]').disabled = true;
      document.querySelector('#seeYourPlan').disabled = false;//If the user plan to take one test only, then unblock the "See your plan" button to allow the user to submit.
    }

});

document.querySelector('[name=testDate2]').addEventListener('blur',function(event){
  document.querySelector('[name=prepDate2]').disabled = false;//after testDate2 selection, enable prepDate2 selection.
  dateInput = document.querySelector('[name=testDate2]');
  dateVal = dateInput.value;
  console.log('testDate2:'+dateVal);
  testLimitDate2 = dateVal;
  document.querySelector('[name=testDate3]').min = testLimitDate2;// testDate3 should be no early than testDate2
  document.querySelector('[name=prepDate2]').max = testLimitDate2;//prepapation should be early than test.
  document.querySelector('[name=prepDate2]').min = testLimitDate1;//prepapation should be later than test1.
  console.log('testLimitDate1:'+testLimitDate1);
  startDate = new Date(dateVal);
  test2Time = startDate.getTime();
  console.log('test2Time:'+test2Time);

  // 90 days rule.
   rawDiffTestDays = test2Time-test1Time;
   diffTestDays = rawDiffTestDays/86400000;
  console.log('Days between testDate1 and testDate2:'+diffTestDays);
  if(gradeNum<12&&diffTestDays<90){
    alert("You still have enough time, don't huddle your tests together! Separate them by at least 90 days in bettween, and give yourself sufficient time to make progress. Please select a new test date to meet this criterion.");
    document.querySelector('[name=prepDate2]').disabled = true;
  }

});

document.querySelector('[name=prepDate2]').addEventListener('blur',function(event){
  console.log('testNumber:'+testNumber);
  dateInput = document.querySelector('[name=prepDate2]');
  dateVal = dateInput.value;
  console.log('prepDate2:'+dateVal);
  startDate = new Date(dateVal);
  prep2Time = startDate.getTime();
  console.log('prep2Time:'+prep2Time);
  // Rule6: PrepDates should be >=30 days before their corresponding testDates. If the users violate this rule, give them alert and prevent them proceeding.
  var rawDiffTime = test2Time-prep2Time;
  var diffDays = rawDiffTime/86400000;
  console.log('Days between prepDate2 and testDate2:'+diffDays);
  if(diffDays<30){
  alert('Give yourself at least a month to prepare for the test! Cramming for it will hurt you in the end! Please select a new preparation start date!');
  document.querySelector('[name=testDate3]').disabled = true;
}else{
    document.querySelector('[name=testDate3]').disabled = false;
}
if(testNumber<3){
  document.querySelector('[name=testDate3]').disabled = true;
  document.querySelector('#seeYourPlan').disabled = false;//If the user plan to take only two test, then unblock the "See your plan" button to allow the user to submit.
}
});

document.querySelector('[name=testDate3]').addEventListener('blur',function(event){
  document.querySelector('[name=prepDate3]').disabled = false;//after testDate3 selection, enable prepDate3 selection.
  dateInput = document.querySelector('[name=testDate3]');
  dateVal = dateInput.value;
  console.log('testDate3:'+dateVal);
  testLimitDate3 = dateVal;
  document.querySelector('[name=prepDate3]').max = testLimitDate3;//prepapation should be early than test.
  document.querySelector('[name=prepDate3]').min = testLimitDate2;//prepapation should be later than test2.
  console.log('testLimitDate3:'+testLimitDate3);
  startDate = new Date(dateVal);
  test3Time = startDate.getTime();
  console.log('test3Time:'+test3Time);

  //90 days rule.
  rawDiffTestDays = test3Time-test2Time;
  diffTestDays = rawDiffTestDays/86400000;
 console.log('Days between testDate3 and testDate2:'+diffTestDays);
 if(gradeNum<12&&diffTestDays<90){
   alert("You still have enough time, don't huddle your tests together! Separate them by at least 90 days in bettween, and give yourself sufficient time to make progress. Please select a new test date to meet this criterion.");
   document.querySelector('[name=prepDate3]').disabled = true;
 }
});

document.querySelector('[name=prepDate3]').addEventListener('blur',function(event){
  console.log('testNumber:'+testNumber);
  dateInput = document.querySelector('[name=prepDate3]');
  dateVal = dateInput.value;
  console.log('prepDate3:'+dateVal);
  startDate = new Date(dateVal);
  prep3Time = startDate.getTime();
  console.log('prep3Time:'+prep3Time);
// Rule6: PrepDates should be >=30 days before their corresponding testDates. If the users violate this rule, give them alert and prevent them proceeding.
  var rawDiffTime = test3Time-prep3Time;
  var diffDays = rawDiffTime/86400000;
  console.log('Days between prepDate3 and testDate3:'+diffDays);
  if(diffDays<30){
  alert('Give yourself at least a month to prepare for the test! Cramming for it will hurt you in the end! Please select a new preparation start date!');
}else{
  document.querySelector('#seeYourPlan').disabled = false;
}
});

document.querySelector('#seeYourPlan').addEventListener('click',function(event){
  alert("yAY");
});


//Question: how to grab these dates, compute them, and output them.
