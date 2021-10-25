/*jslint devel: true */
/*jslint browser: true*/
/*global $,jQuery*/
import getMenu from './libs/getMenu.js'

console.log({ getMenu })

let originalWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //gets width of viewport

var PutSmallContent = function () {
	// $("#header").prepend('') 
	$('#header').load('./img/mobile.svg')
	$("#header").append(
		"<div class = 'row' id='iconsRow'>"
		+ "<div class = 'alignLeft'>"
		+ "<a href = 'https://favordelivery.com/city/austin/' id='favorLink'>"
		+ "<img src='icons/favor_logo.svg' id='favorLogo' width='100px'></img"
		+ "</a>"
		+ "<a href = 'https://www.ubereats.com/en-US/austin/food-delivery/lil-nonnas/2nNeEbmARn-sbFly9BniBQ'>"
		+ "<img src='icons/uber_eats.svg' id='uberLogo' width='80px'></img>"
		+ "</a>"
		+ "</div>"
		+ "<div class = 'alignRight' id='icons'>"
		/* + "<a href = 'https://www.grubhub.com/restaurant/lil-nonnas-1505-town-creek-dr-austin/503777' id='grubHub'>"
			 + "<img src='icons/grubhub_logo.svg' id='grubHubLogo' width='80px'></img>"
		 + "</a>" */
		+ "<a href='https://www.facebook.com/lilnonnas' id='facebook'>"
		+ "<img src='icons/facebook.svg' width='33px'></img>"
		+ "</a>"
		+ "<a href = 'https://www.instagram.com/lilnonnas' id='instagram'>"
		+ "<img src='icons/instagram.svg' width='33px'></img>"
		+ "</a>"
		+ "</div>"
		+ "</div>"
	);
}

var PutLargeContent = function () {
	$("#header").prepend("<img src='img/logo_straight.svg' id='logo-main'></img>"
		// + "<div class = 'r2c1'>Sun 2pm-10pm, Sat 2pm-Midnight, Tue-Fri 5pm-Midnight</div>"
		+ "<div class='span-1'><b>Dine-in or Carry-out:</b></div>"
		+ "<div class='span-1'>440 E. St. Elmo Rd, Austin TX 78745</div>"
		+ "<div class='span-1'>(512) 993-8998</div>"
		+ "<div class='span-1'><b>Delivery: </b></div>"
		+ "<div class='span-1'>"
		+ "<div>"
		+ "<a href='https://favordelivery.com/city/austin/' id='favorLink'>Favor</a> or "
		+ "<a href='https://www.ubereats.com/en-US/austin/food-delivery/lil-nonnas/2nNeEbmARn-sbFly9BniBQ/'>Uber Eats</a>"
		+ "</div></div>"

		+ "<div class='span-1 text-align-right'>Order "
		+ "<a href = 'https://www.toasttab.com/lilnonnas/v2/online-order#!/' >online</a>"
		+ "</div>"

		+ "<div class = 'span-1'>"
		+ "<a href='https://www.facebook.com/lilnonnas' id='facebook'>"
		+ "<img src='icons/facebook.svg' width='40px'></img>"
		+ "</a>"
		+ "<a href = 'https://www.instagram.com/lilnonnas' id='instagram'>"
		+ "<img src='icons/instagram.svg' width='40px'></img>"
		+ "</a>"
		+ "</div>"
		+ "<div class = 'span-2 text-align-right'>Buy a <a href = 'https://www.toasttab.com/lilnonnas/giftcards' id='giftLink'>gift card</a></div>");
	$("#mainContent").prepend(
		"<div id='picsRow'>"
		+ "<img src='img/2.jpg' width='23%'></img>"
		+ "<img src='img/1.jpg' width='23%'></img>"
		+ "<img src='img/opaque_desktop_nonna_cutter.png' width='8%' id='nonnaCircle'></img>"
		+ "<img src='img/4.jpg' width='23%'></img>"
		+ "<img src='img/3.jpg' width='23%'></img>"
		+ "</div>");
}

var SizePage = function () { //Place circle logo at top if viewport under 743, other stuff if not
	"use strict";
	let currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //gets width of viewport
	if (currentWidth < 743) { //for small widths
		PutSmallContent();
	};
	if (currentWidth >= 743) { PutLargeContent(); };
}

SizePage(); //append stuff appropriate to page

jQuery.fn.exists = function () { return this.length > 0; } //check if something exists

window.onresize = function () {
	let currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //gets width of viewport
	console.log(currentWidth)
	if (currentWidth < 743 && $("#logo-main").exists()) {   //switch layout if viewport is narrow and the big(long) logo exists
		$("#header").empty();                               //removes everything in the header
		$("#picsRow").remove();                               //removes everything in the header
		PutSmallContent();                                  //puts all the big content in
	}
	if (currentWidth >= 743 && $("#circle").exists()) {
		$("#header").empty();                               //removes everything in the header
		PutLargeContent();                                  //puts all the big content in
	}
}

//GET CONTENT FROM GOOGLE SHEETS AND POPULATE
function getMenuItemElement(row) {
	return "<tr><td class = 'prices' valign= 'top'>" + row[3] + "</td>" +
		"<td class = 'names'><b>" + row[1] + "</b>: " + row[2] + "</td></tr>"
}

getMenu()
	.then(menu => {
		for (let i = 0; i < menu.length; i++) {
			if (menu[i][0] === 'announcement') {
				$(".announcements").append(
					"<div>" + menu[i][1] + " " + menu[i][2] + "</div>"
				)
			}
			if (menu[i][0] === "special") {
				$(".specials tbody").append(
					getMenuItemElement(menu[i])
				)
			}
			if (['appetizer', 'slice'].includes(menu[i][0])) {
				$(".appetizersAndSlices tbody").append(
					getMenuItemElement(menu[i])
				)
			}
			if (menu[i][0] === "pizza") {
				$(".pizzas tbody").append(
					getMenuItemElement(menu[i])
				)
			}
			if (menu[i][0] === "gf") {
				$(".gf tbody").append(
					getMenuItemElement(menu[i])
				)
			}
			if (menu[i][0] === "side") {
				$(".sides tbody").append(
					getMenuItemElement(menu[i])
				)
			}
		}
	})



// $.getJSON("https://spreadsheets.google.com/feeds/list/1vE3zEShGMD1e1zfRrc00nHGHyms4NTsU6Ai6BJcKA5k/od6/public/values?alt=json", function(data) {
//     for(i in data.feed.entry){
//         //add announcements to menu
//         if(data.feed.entry[i]['gsx$type']['$t'] == "announcement"){
//             $(".announcements").append(
//               "<div display='inline-block'><h1>" + data.feed.entry[i]['gsx$name']['$t'] + " " + data.feed.entry[i]['gsx$description']['$t'] + "</h1></div>"
//             )
//         }
//         //add specials to menu
//         if(data.feed.entry[i]['gsx$type']['$t'] == "special"){
//             $(".specials tbody").append(
//                 "<tr><td class = 'prices' valign= 'top'>" + data.feed.entry[i]['gsx$price']['$t'] + "</td>" +
//                 "<td class = 'names'><b>" + data.feed.entry[i]['gsx$name']['$t'] + "</b>: " + data.feed.entry[i]['gsx$description']['$t'] + "</td></tr>"
//             )
//         }
//         //add appetizers and slices to menu
//         if(data.feed.entry[i]['gsx$type']['$t'] == "appetizer" || data.feed.entry[i]['gsx$type']['$t'] == "slice"){
//             $(".appetizersAndSlices tbody").append(
//                 "<tr><td class = 'prices' valign= 'top'>" + data.feed.entry[i]['gsx$price']['$t'] + "</td>" +
//                 "<td class = 'names'><b>" + data.feed.entry[i]['gsx$name']['$t'] + "</b>: " + data.feed.entry[i]['gsx$description']['$t'] + "</td></tr>"
//             )
//         }
//         //add pizzas to menu
//         if(data.feed.entry[i]['gsx$type']['$t'] == "pizza"){ /*checks for pizzas*/
//             $(".pizzas tbody").append(
//                "<tr><td class = 'prices' valign= 'top'>" + data.feed.entry[i]['gsx$price']['$t'] + "</td>" +
//                 "<td class = 'names'><b>" + data.feed.entry[i]['gsx$name']['$t'] + "</b>: " + data.feed.entry[i]['gsx$description']['$t'] + "</td></tr>"
//             )
//         }
//         //add gf pizzas to menu
//         if(data.feed.entry[i]['gsx$type']['$t'] == "gf"){ /*checks for pizzas*/
//             $(".gf tbody").append(
//                  "<tr><td class = 'prices' valign= 'top'>" + data.feed.entry[i]['gsx$price']['$t'] + "</td>" +
//                 "<td class = 'names'><b>" + data.feed.entry[i]['gsx$name']['$t'] + "</b>: " + data.feed.entry[i]['gsx$description']['$t'] + "</td></tr>"
//             )
//         }
//         //add sides to menu
//         else if(data.feed.entry[i]['gsx$type']['$t'] == "side") {
//             $(".sides tbody").append(
//                 "<tr><td class = 'prices'>" + data.feed.entry[i]['gsx$price']['$t'] + "</td>" +
//                 "<td class = 'names'>" + data.feed.entry[i]['gsx$name']['$t'] + "</td></tr>"
//             )
//         }
//     } //end loop
// }); //end program
