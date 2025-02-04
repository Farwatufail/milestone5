// Declare necessary types
interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string;
  profilePicture?: string;
}

// Reference to DOM elements
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;
const shareableLink = document.getElementById("shareableLink") as HTMLDivElement;
const resumeLink = document.getElementById("resumeLink") as HTMLAnchorElement;

// Event listener for form submission
resumeForm.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // Prevent the default form submission

  // Gather form data
  const formData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      address: (document.getElementById("address") as HTMLInputElement).value,
      education: (document.getElementById("education") as HTMLTextAreaElement).value,
      experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
      skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
  };

  // Handle file input for profile picture
  const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
  if (profilePictureInput.files && profilePictureInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
          formData.profilePicture = e.target?.result as string;
          generateResume(formData);
      };
      reader.readAsDataURL(profilePictureInput.files[0]);
  } else {
      generateResume(formData);
  }
});

// Function to generate the resume and display it
const generateResume = (data: ResumeData) => {
  // Create the resume HTML content
  const resumeContent = `
      <h2>Resume of ${data.name}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>Education:</strong> ${data.education}</p>
      <p><strong>Experience:</strong> ${data.experience}</p>
      <p><strong>Skills:</strong> ${data.skills}</p>
  `;

  // Display the resume content
  resumeOutput.innerHTML = resumeContent;

  // If there's a profile picture, display it
  if (data.profilePicture) {
      const imgElement = document.createElement("img");
      imgElement.src = data.profilePicture;
      imgElement.alt = "Profile Picture";
      imgElement.width = 100;
      resumeOutput.prepend(imgElement);
  }

  // Enable the download button
  downloadBtn.style.display = "inline-block";

  // Create a shareable link (using localStorage for simplicity)
  const resumeDataStr = JSON.stringify(data);
  const resumeBlob = new Blob([resumeDataStr], { type: "application/json" });
  const resumeURL = window.URL.createObjectURL(resumeBlob);
  resumeLink.href = resumeURL;

  // Show the shareable link
  shareableLink.style.display = "block";

  // Enable the PDF download button functionality
  downloadBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.text(`Resume of ${data.name}`, 10, 10);
      doc.text(`Email: ${data.email}`, 10, 20);
      doc.text(`Phone: ${data.phone}`, 10, 30);
      doc.text(`Address: ${data.address}`, 10, 40);
      doc.text(`Education: ${data.education}`, 10, 50);
      doc.text(`Experience: ${data.experience}`, 10, 60);
      doc.text(`Skills: ${data.skills}`, 10, 70);

      doc.save(`${data.name}_Resume.pdf`);
  });
};

  