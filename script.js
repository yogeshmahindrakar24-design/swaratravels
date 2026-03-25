function scrollBooking() {
  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
}

function calculateFare() {
  const km = document.getElementById("km").value;
  const fareText = document.getElementById("fare");

  if (km === "" || km <= 0) {
    fareText.innerText = "Please enter valid distance.";
    return;
  }

  const ratePerKm = 14;
  const totalFare = km * ratePerKm;

  fareText.innerText = "Estimated Fare: ₹" + totalFare;
}

const bookingFormEl = document.getElementById("bookingForm");
if (bookingFormEl) bookingFormEl.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const km = document.getElementById("km").value.trim();
  const car = document.getElementById("car").value;

  if (!name || !mobile || !car) {
    alert("Please fill all required details.");
    return;
  }

  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("Please enter valid 10-digit mobile number.");
    return;
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbzEJ9hcwrjpASSqmPIeMkEBLVUy9IbrJXwetYNUbzKLInrlQb2br3D6NofXhx1h1hHT/exec";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("mobile", mobile);
  formData.append("km", km);
  formData.append("car", car);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    const result = await response.text();
    console.log(result);

    const message =
      `Hello Swara Travels,

I want to book a cab.

Name: ${name}
Mobile: ${mobile}
Selected Car: ${car}
Distance: ${km || "Not entered"} KM`;

    const whatsappURL =
      "https://wa.me/918104050420?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

    alert("Booking sent successfully!");
    document.getElementById("bookingForm").reset();
    document.getElementById("fare").innerText = "";

  } catch (error) {
    alert("Error connecting to Google Sheet.");
    console.error(error);
  }
});

const navItems = document.querySelectorAll(".bottom-nav .nav-item");
if (navItems.length) {
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
} 
// Destinations
const data = {

nashik: [
{
name:"Trimbakeshwar Temple",
km:180,
img:"https://upload.wikimedia.org/wikipedia/commons/7/7d/Trimbakeshwar.jpg",
info:"Famous Jyotirling Temple in Nashik"
},

{
name:"Panchvati",
km:170,
img:"https://upload.wikimedia.org/wikipedia/commons/3/3f/Panchvati.jpg",
info:"Ramayana famous place"
}
],


shirdi:[
{
name:"Sai Baba Temple",
km:240,
img:"https://upload.wikimedia.org/wikipedia/commons/5/5f/Shirdi.jpg",
info:"Famous Sai Baba Mandir"
}
],


pune:[
{
name:"Shaniwar Wada",
km:150,
img:"https://upload.wikimedia.org/wikipedia/commons/2/2e/Shaniwarwada.jpg",
info:"Historic fort in Pune"
}
]

}



function loadPlaces(){

let city = document.getElementById("city").value

let html=""

data[city].forEach((p,i)=>{

html += `<button onclick="showDetails('${city}',${i})">${p.name}</button><br><br>`

})

document.getElementById("places").innerHTML = html

}



function showDetails(city,index){

let p = data[city][index]

document.getElementById("details").innerHTML = `

<h3>${p.name}</h3>

<img src="${p.img}" width="250">

<p>${p.info}</p>

<p>Distance: ${p.km} KM</p>


<select id="car" onchange="price(${p.km})">
<option value="">Select Car</option>
<option value="17">4 Seater ₹17/km</option>
<option value="21">6 Seater ₹21/km</option>
</select>

<h3 id="total"></h3>

`

}



function price(km){

let rate = document.getElementById("car").value

let total = km * rate

document.getElementById("total").innerHTML =
"Total Price ₹ " + total

} 

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

function toggleDropdown(e) {
  e.preventDefault();
  const menu = document.getElementById("dropdownMenu");
  if (menu) menu.classList.toggle("show");
}

// Close nav when clicking outside
document.addEventListener("click", function(e) {
  const nav = document.getElementById("navMenu");
  const toggle = document.querySelector(".menu-toggle");
  if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove("active");
  }
});