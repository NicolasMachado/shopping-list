var listState = {
	items : []
};

$(function(){
	// add item to list
	$("#js-shopping-list-form").submit(function(e){
		e.preventDefault();
		var userEntry = $('#shopping-list-entry').val();
		// check if user has input something and if item doesn't already exist
		if (!userEntry) {
			alert('Please enter an item name.');
		} else if ($.inArray(userEntry, listState.items.map(function(item) {return item.name})) != -1) {
			alert('This item is already in your list.');
		} else {
			addItemToList(listState, userEntry);
			$('#shopping-list-entry').val('');
			renderListHTML(listState, $('.shopping-list'));			
		}
	});
	
	// delete item
	$('ul').on('click', '.shopping-item-delete', function(){
		modifyItem($(this), "delete");
	});

	//check/uncheck item
	$('ul').on('click', '.shopping-item-toggle', function(){
		modifyItem($(this), "check");
	});
});

function addItemToList(list, item) {
	var itemObject = {
		'name' : item,
		'isCkecked' : false
	};
	list.items.push(itemObject);
}

function renderListHTML(list, element) {
	var allItems = list.items.map(function(item){
		var checked = item.isChecked ? " shopping-item__checked" : "";
		return '<li><span class="shopping-item' + checked + '">' + item.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
	});
	$(element).html(allItems);
}

function modifyItem(item, action) {	
	var selectedItem = $(item).closest("li").find(".shopping-item").text();
	var itemInObject = $.inArray(selectedItem, listState.items.map(function(item) {return item.name}));
	// delete or check/uncheck
	if (action === "delete"){
		listState.items.splice(itemInObject, 1);
		renderListHTML(listState, $('.shopping-list'));			
	} else if (action === "check") {
		// change class on screen
		$(item).closest("li").find(".shopping-item").toggleClass("shopping-item__checked");
		// record state
		listState.items[itemInObject].isChecked = !listState.items[itemInObject].isChecked;
	}
}