$(document).ready(() => {
  if (!localStorage.myPlans) localStorage.myPlans = "[]";

  let currentTime = new Date();
  let currentHour = currentTime.getHours();

  $("#currentDay").text(currentTime.toDateString());

  // Programatically create a number of rows based on the starting time and desired number of hours

  let hours = 9;
  let startingTime = 9;

  for (let i = startingTime; i < hours + startingTime; i++) {
    let row = $("<div>", { class: "row", hour: i });

    // Style rows based on past or present. Default styling is future hours.

    if (i == currentHour) {
      row.addClass("present");
    } else if (i < currentHour) {
      row.addClass("past");
    }

    // Convert 24-hour time to 12-hour AM or PM

    let timeCol = $("<div>", { class: "col-1" });
    let hourOfDay = i < 13 ? i : 12 - i;
    let hourOfDaySuffix = i < 12 ? "AM" : "PM";
    let hourOfDayStr = `${Math.abs(hourOfDay)} ${hourOfDaySuffix}`;
    timeCol.text(hourOfDayStr);
    row.append(timeCol);

    let eventCol = $("<div>", {
      class: "col-10"
    });
    row.append(eventCol);

    let eventText = $("<textarea>", {
      placeholder: "No activity"
    }).text(JSON.parse(localStorage.myPlans)[i]);
    eventCol.append(eventText);

    let saveCol = $("<div>", { class: "col-1 save" }).text("save");
    row.append(saveCol);

    $(".container").append(row);
  }

  // Attach event handler to textareas to display unsaved changes when they are made

  $("textarea").on("change", event => {
    $(event.target)
      .parent()
      .next()
      .addClass("unsavedChanges");
  });

  // Attach event handler to save buttons to save changes

  $(".save").click(event => {
    $(event.target).removeClass("unsavedChanges");
    let myPlans = JSON.parse(localStorage.myPlans);
    let targetHour = $(event.target)
      .parent()
      .attr("hour");
    let targetPlan = $(event.target)
      .prev()
      .children()
      .first()
      .val();
    myPlans[targetHour] = targetPlan;
    localStorage.myPlans = JSON.stringify(myPlans);
    console.log(
      `Saved %c"${targetPlan}" %cfor %c${targetHour}:00`,
      "font-weight: bold",
      "font-weight: normal",
      "font-weight: bold"
    );
  });

  // Attach event handler to reset button

  $("#reset").click(() => {
    localStorage.myPlans = "[]";
    location.reload();
  });
});
