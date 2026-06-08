let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let chart;

function saveData() {
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function addTransaction() {

const text =
document.getElementById("text").value;

const amount =
parseFloat(document.getElementById("amount").value);

const category =
document.getElementById("category").value;

if(text === "" || isNaN(amount)) {
alert("Enter valid data");
return;
}

transactions.push({
id:Date.now(),
text,
amount,
category
});

saveData();
updateUI();

document.getElementById("text").value="";
document.getElementById("amount").value="";
}

function deleteTransaction(id){

transactions =
transactions.filter(
t => t.id !== id
);

saveData();
updateUI();
}

function updateUI(){

const list =
document.getElementById("list");

list.innerHTML="";

let income=0;
let expense=0;

const search =
document.getElementById("search")
.value
.toLowerCase();

transactions
.filter(t =>
t.text.toLowerCase()
.includes(search)
)
.forEach(t=>{

if(t.amount>0)
income+=t.amount;
else
expense+=Math.abs(t.amount);

const li =
document.createElement("li");

li.innerHTML=
`
${t.text}
(${t.category})
₹${t.amount}

<button
class="delete"
onclick="deleteTransaction(${t.id})">
Delete
</button>
`;

list.appendChild(li);
});

document.getElementById("income")
.innerText=`₹${income}`;

document.getElementById("expense")
.innerText=`₹${expense}`;

document.getElementById("balance")
.innerText=`₹${income-expense}`;

updateChart();
}

function updateChart(){

const data={};

transactions.forEach(t=>{

if(t.amount<0){

const cat=t.category;

data[cat]=(data[cat]||0)+
Math.abs(t.amount);
}
});

const labels=
Object.keys(data);

const values=
Object.values(data);

if(chart){
chart.destroy();
}

chart=
new Chart(
document.getElementById("chart"),
{
type:"pie",

data:{
labels,
datasets:[{
data:values
}]
}
}
);
}

document
.getElementById("search")
.addEventListener(
"input",
updateUI
);

document
.getElementById("themeBtn")
.addEventListener(
"click",
()=>{
document.body
.classList
.toggle("dark");
}
);

updateUI();