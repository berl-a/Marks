var names = new Array(), marks = new Array(), suitableNumbers = new Array(), suitableNames = new Array();

var refreshItems = function() {
		
	suitableNumbers = new Array();
	suitableNames = new Array();

	$('ul p').remove();
	$('ul li').remove();

	var neededMark = $('div.button.search').find('select').val();

	if(neededMark != -1) {
	
		for(var i = 0; i < marks.length; i++) {
			if(marks[i] === neededMark)
				suitableNumbers.push(i);
		}
		
	}else {
		
		for(var i = 0; i < names.length; i++) {
			suitableNumbers.push(i);
		}
		
	}
	
	for(var i = 0; i < suitableNumbers.length; i++) {
		suitableNames.push(names[suitableNumbers[i]]);
	}

	for(var i = 0; i < suitableNames.length; i++) {
		$('ul').append("<li>" + suitableNames[i] + "<span class=remove></span></li>");	
	}
	
	if($('ul li').length === 0) {
		$('ul').append('<p>There are no people with this mark yet</p>');
	}

};

var removeItem = function() {
		
	var $li = $(this).closest('li');

	var numberOfNeededPerson = names.indexOf($li.text());

	if(numberOfNeededPerson !== -1) {
		names.splice(numberOfNeededPerson, 1);
		marks.splice(numberOfNeededPerson, 1);

		refreshItems();
	}

};

$(document).ready(function() {
	
	$('div.wrapper').on('click', 'div.button.add', function() {
		
		if($('div.inputs input').val() != ''){
			
			names.push($('div.inputs input').val());
			marks.push($('div.inputs select').val());
			
			$('div.inputs input').val('');
		}
		
		$('div.inputs input').focus();
	});
	
	
	$('div.wrapper').on('click', 'div.button.search', refreshItems);
	
	$('ul').on('click', 'li span.remove', removeItem);
	
	$('div.wrapper').on('click', 'div.button.search select', function(event) {
		event.stopPropagation();
	});
	
});