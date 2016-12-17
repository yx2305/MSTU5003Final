//Rule1: testDate should be no later than college application date(appDate).

var startTime;
var limitDate;

document.querySelector('[name=appDate]').addEventListener('change', function(event) {
	var monthInput = document.querySelector('[name=appDate]');
	var monthYear = monthInput.value;
	var startDate = new Date(monthYear);
	startTime = startDate.getTime();

	limitDate = monthYear + "-01";

	console.log(limitDate);
	// document.querySelector('[name=testDate1]').max = limitDate;

	// alert('yay');
});

document.querySelector('[name=testDate1]').addEventListener('change', function(event) {

	console.log('if this date is less than... just save');
	console.log('if this date is greater than prior...');
	console.log('alert them');
	console.log('then SET the date to whatever the limit is.')

	console.log(limitDate);
	document.querySelector('[name=testDate1]').value = limitDate;

	// alert('yay');
});



// document.getElementById('nextBtn').addEventListener('click', function(event){
// 	var monthInput = document.querySelector('[name=appDate]');
// 	var monthYear = monthInput.value;
// 	var startDate = new Date(monthYear);
// 	var startTime = startDate.getTime();
//
//
// });




//Rule2: if testNum>=2, time between any two testDate should be >=3 month.
//Rule3: prepDate1 should be no less than 1 month before testDate1. Same for other prepDate/testDate pair(s) if there is any.
//Rule4: if user's grade is <12th grade, testNum should be >=2.
//Question: how to grab these dates, compute them, and output them.
