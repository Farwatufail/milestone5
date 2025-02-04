// Reference to DOM elements
var resumeForm = document.getElementById("resumeForm");
var resumeOutput = document.getElementById("resumeOutput");
var downloadBtn = document.getElementById("downloadBtn");
var shareableLink = document.getElementById("shareableLink");
var resumeLink = document.getElementById("resumeLink");
// Event listener for form submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Gather form data
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
    };
    // Handle file input for profile picture
    var profilePictureInput = document.getElementById("profilePicture");
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            formData.profilePicture = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume(formData);
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    }
    else {
        generateResume(formData);
    }
});
// Function to generate the resume and display it
var generateResume = function (data) {
    // Create the resume HTML content
    var resumeContent = "\n      <h2>Resume of ".concat(data.name, "</h2>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <p><strong>Address:</strong> ").concat(data.address, "</p>\n      <p><strong>Education:</strong> ").concat(data.education, "</p>\n      <p><strong>Experience:</strong> ").concat(data.experience, "</p>\n      <p><strong>Skills:</strong> ").concat(data.skills, "</p>\n  ");
    // Display the resume content
    resumeOutput.innerHTML = resumeContent;
    // If there's a profile picture, display it
    if (data.profilePicture) {
        var imgElement = document.createElement("img");
        imgElement.src = data.profilePicture;
        imgElement.alt = "Profile Picture";
        imgElement.width = 100;
        resumeOutput.prepend(imgElement);
    }
    // Enable the download button
    downloadBtn.style.display = "inline-block";
    // Create a shareable link (using localStorage for simplicity)
    var resumeDataStr = JSON.stringify(data);
    var resumeBlob = new Blob([resumeDataStr], { type: "application/json" });
    var resumeURL = window.URL.createObjectURL(resumeBlob);
    resumeLink.href = resumeURL;
    // Show the shareable link
    shareableLink.style.display = "block";
    // Enable the PDF download button functionality
    downloadBtn.addEventListener("click", function () {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        doc.text("Resume of ".concat(data.name), 10, 10);
        doc.text("Email: ".concat(data.email), 10, 20);
        doc.text("Phone: ".concat(data.phone), 10, 30);
        doc.text("Address: ".concat(data.address), 10, 40);
        doc.text("Education: ".concat(data.education), 10, 50);
        doc.text("Experience: ".concat(data.experience), 10, 60);
        doc.text("Skills: ".concat(data.skills), 10, 70);
        doc.save("".concat(data.name, "_Resume.pdf"));
    });
};
