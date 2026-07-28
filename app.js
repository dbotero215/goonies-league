function money(n){return "$" + Number(n).toFixed(2);}

function renderDashboard(){
  var cards = document.getElementById("summaryCards");
  var totalDue = MEMBERS.reduce(function(a,m){return a+m.totalDue;},0);
  var totalPaid = MEMBERS.reduce(function(a,m){return a+m.paid;},0);
  var lateCount = MEMBERS.filter(function(m){return m.status==="Late";}).length;
  cards.innerHTML =
    "<div class=\"card\"><div class=\"big\">" + MEMBERS.length + "</div><div class=\"label\">Members</div></div>" +
    "<div class=\"card\"><div class=\"big\">" + money(totalDue) + "</div><div class=\"label\">Total Scheduled</div></div>" +
    "<div class=\"card\"><div class=\"big\">" + money(totalPaid) + "</div><div class=\"label\">Total Paid</div></div>" +
    "<div class=\"card\"><div class=\"big\">" + lateCount + "</div><div class=\"label\">Members Late</div></div>";

document.getElementById("feeEntry").textContent = money(FEES.entry);
  document.getElementById("feeTransaction").textContent = money(FEES.transaction);
  document.getElementById("feeKeeper").textContent = money(FEES.secondKeeper);
  document.getElementById("feeAutodraft").textContent = money(FEES.autodraft);

var tbody = document.querySelector("#memberTable tbody");
  tbody.innerHTML = MEMBERS.map(function(m){
    var tagClass = m.status === "Late" ? "late" : "ontime";
    return "<tr><td>" + m.name + "</td><td><span class=\"tag " + tagClass + "\">" + m.status + "</span></td><td>" + money(m.totalDue) + "</td><td>" + money(m.paid) + "</td><td>" + money(m.pastDue) + "</td></tr>";
  }).join("");
}

function renderWeekly(){
  var tbody = document.querySelector("#weeklyTable tbody");
  tbody.innerHTML = WEEKLY.map(function(w){
    return "<tr><td>" + w.date + "</td><td>" + money(w.amount) + "</td><td>" + money(w.total) + "</td></tr>";
  }).join("");
}

function renderRules(){
  var list = document.getElementById("rulesList");
  list.innerHTML = RULES.map(function(r){
    return "<div class=\"rule-card\"><h3>" + r.title + "</h3><p>" + r.body + "</p></div>";
  }).join("");
}

function renderKeepers(filter){
  var tbody = document.querySelector("#keeperTable tbody");
  var f = (filter || "").toLowerCase();
  var rows = KEEPERS.filter(function(k){
    return k.player.toLowerCase().indexOf(f) !== -1 || k.owner.toLowerCase().indexOf(f) !== -1;
  });
  tbody.innerHTML = rows.map(function(k){
    return "<tr><td>" + k.player + "</td><td>" + (k.y2023||"&mdash;") + "</td><td>" + (k.y2024||"&mdash;") + "</td><td>" + (k.y2025||"&mdash;") + "</td><td>" + (k.owner||"&mdash;") + "</td></tr>";
  }).join("");
}

document.querySelectorAll(".tab-btn").forEach(function(btn){
  btn.addEventListener("click", function(){
    document.querySelectorAll(".tab-btn").forEach(function(b){b.classList.remove("active");});
    document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active");});
    btn.classList.add("active");
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

document.getElementById("keeperSearch").addEventListener("input", function(e){
  renderKeepers(e.target.value);
});

renderDashboard();
renderWeekly();
renderRules();
renderKeepers("");
