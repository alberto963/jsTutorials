function startEvents() {

	var eventSource = new EventSource("TestServlet");

	eventSource.onmessage = function(event) {
		// At least five row must be there!
		var row = Math.random() > .5 ? 0 : 4;
		model[row][0] = event.data;
		model[row][3] =  Math.random() > .5 ? "Correct" : "Wrong";
		data = model.slice();

		sort();

		// Reference to the grid element.
		var grid = grid || document.querySelector('vaadin-grid');

		// We also need to clear the cached data set as data was modified
		grid.refreshItems();
	};
}

function sort() {
	// Reference to the grid element.
	var grid = grid || document.querySelector('vaadin-grid');

	var idx = grid.sortOrder[0].column;
	var lesser = grid.sortOrder[0].direction == 'asc' ? -1 : 1;

	console.info("Sorting index=" + idx + " direction=" + grid.sortOrder[0].direction);

	data.sort(function(a, b) {
		var r = (a[idx] < b[idx]) ? lesser : -lesser

		return r;
	});
}

// Add some example data as an array.
var model = []; // Immutable datastore

var scramble = [ 8, 3, 7, 2, 6, 1, 4, 5, 9 ];
for (i = 0; i < 9; i++) {
	model.push([ "StringValue " + scramble[i], i % 2, i, i % 3 ? "Correct" : "Wrong", "Fixed" ]);
}

/*
 * slice does not alter. It returns a shallow copy of elements from the original
 * array. Elements of the original array are copied into the returned array as
 * follows:
 * 
 * For object references (and not the actual object), slice copies object
 * references into the new array. Both the original and new array refer to the
 * same object. If a referenced object changes, the changes are visible to both
 * the new and original arrays. For strings and numbers (not String and Number
 * objects), slice copies strings and numbers into the new array. Changes to the
 * string or number in one array does not affect the other array. If a new
 * element is added to either array, the other array is not affected.
 */
var data = model.slice(); // underling memory

// The Web Components polyfill introduces a custom event we can
// use to determine when the custom elements are ready to be used.
document.addEventListener("WebComponentsReady", function() {
	// Reference to the grid element.
	var grid = grid || document.querySelector('vaadin-grid');

	grid.items = function(params, callback) {
		callback(data.slice(params.index, params.index + params.count));
	};
	grid.size = data.length;

	// Re-order the data array on sort-order-changed event
	grid.addEventListener('sort-order-changed', function() {
		sort();
	});

	grid.rowClassGenerator = function(row) {
		return 'grid-row';
	};

	grid.cellClassGenerator = function(cell) {

		// NOTE: cell.index is col + 1
		if (cell.index == 2) {
			return 'f1';
		}

		if (cell.index == 4) {
			var v = cell.row.data[3];

			return 'f3-' + v.toLowerCase();
		}

	};

	grid.scrollToStart();
});