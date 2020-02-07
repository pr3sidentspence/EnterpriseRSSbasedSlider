// This script takes the rss feed from an Enterprise search and outputs html in the format expected by
// bxSlider (https://bxslider.com/) and then calls bxSlider.

function populateFeedData() {
	// Gets Atom Feed in FEED_URL and goes through entries 1 by 1
	// if it can find an isbn in the content of an enry it adds it to both the <ul> that bxslider uses to 
	// makes the slider items and the anchors that bxslider uses to make the thumbnail pager
	// Due to size limits on Enterprise centre column, pager limits to 15 items regardless of number of
	// entries in feed
	// Typical URL
	//FEED_URL = "/client/rss/hitlist/default/qu=search+terms+here";
	FEED_URL = "/client/rss/hitlist/default/qu=search+terms+here";
	$J.get(FEED_URL, function (data) {
		processData(data);
	});
}
function processData(data) {
	var bsList = "";
	var pagerAnchors = "";
	var i = 0;
	var j = 0;
	$J(data).find("entry").each(function () { // or "item" or whatever suits
		var el = $J(this);
		var isbnPatt = new RegExp("ISBN&#160;([0-9]*)<");
		var isbn = isbnPatt.exec(el.find("content").text());
		if (isbn) {
			isbn = isbn[1];
			var authorPatt = new RegExp("Author&#160;(.*?),(.*?)(,|<)");
			var author = authorPatt.exec(el.find("content").text());
			if (author !== null) {
				var firstName = author[2].replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ""); //removes problematic characters if present
				firstName = firstName.replace(/\s{2,}/g, " ");
				firstName = firstName.replace(/author/g, " ");
			} else {
				firstName = " ";
			}
			if (author !== null) {
				var lastName = author[1];
			} else {
				lastName = " ";
			}
			bsList = bsList + '<li><a href="' + el.find("link").attr("href") + '"><img src="https://secure.syndetics.com/index.aspx?type=xw12&client=winnip&upc=&oclc=&isbn=' + isbn + '/MC.JPG" title="' + el.find("title").text() + '<br />' + firstName + ' ' + lastName + '" style="min-height: 100px"/></a></li>';
			k = i - j; // years' later comment: I think this has to do with the thumbnails pointed at the right big slider when an item is skipped for not having isbn? or some...thing...?
			if (k < 15) {
				pagerAnchors = pagerAnchors + '<a data-slide-index="' + k + '" href=""><img src="https://secure.syndetics.com/index.aspx?type=xw12&client=winnip&upc=&oclc=&isbn=' + isbn + '/SC.JPG" width="31"/></a>';
			} else {
				j++;
			}
			i++;
		}
	});
	document.getElementById("bsSlider").innerHTML = bsList;
	document.getElementById("bx-pager").innerHTML = pagerAnchors;
	$J(document).ready(function () {
		$J('#bsSlider').bxSlider({
			mode: 'fade',
			captions: true,
			auto: true,
			//autoControls: true,
			pagerCustom: '#bx-pager',
			responsive: false,
			randomStart: true,
			autoControls: true,
			autoControlsCombine: true
		});
	});
}
