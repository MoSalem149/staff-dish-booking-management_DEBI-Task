let dailySpecial = "Today's special is Grilled Fish.";

document.getElementById("specialAnnouncement").innerText = dailySpecial;

let upperCaseSpecial = dailySpecial.toUpperCase();
document.getElementById("uppercaseAnnouncement").innerText = upperCaseSpecial;

let updatedSpecial = dailySpecial.replace("Grilled Salmon", "Roasted Chicken");
document.getElementById("updatedSpecial").innerText = updatedSpecial;

let specialWords = updatedSpecial.split(" ");
document.getElementById("wordsArray").innerText = JSON.stringify(specialWords);

let noSpacesSpecial = updatedSpecial.replace(/\s+/g, "");
document.getElementById("noSpacesAnnouncement").innerText = noSpacesSpecial;

let hyphenatedSpecial = specialWords.join("-");
document.getElementById("hyphenatedAnnouncement").innerText = hyphenatedSpecial;
