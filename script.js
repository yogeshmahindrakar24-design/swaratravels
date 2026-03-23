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

document.getElementById("bookingForm").addEventListener("submit", async function (e) {
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

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});