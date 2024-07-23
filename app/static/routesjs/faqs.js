document.addEventListener("DOMContentLoaded", () => {
  /*
    Regex for faqs contact form:
    Nice try! there's more regex on the server side!
  */
  const faqs_contactForm = document.getElementById("faqs-contact-form");
  const subjectTooltip = document.getElementById("contact-form-subject_tooltip");
  const messageTooltip = document.getElementById("contact-form-message_tooltip");
  const subjectValue = document.getElementById("contact-form-subject");
  const textareaValue = document.getElementById("contact-form-textarea");
  const inpForTextarea = document.getElementById("contact-form-message");
    
  const resetBtn = document.getElementById("contact-form-reset");
  //let subjectRegex = /^[a-ZA-Z0-9]$/ UPDATE THIS;
  let messageRegex = /^[\s\S]*$/;

  faqs_contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    inpForTextarea.value = textareaValue.textContent;

    // Actual testing
    if (/*!subjectRegex.test(subjectValue.value) || UPDATE THIS */ subjectValue.value.length === 0) {
      subjectTooltip.classList.add("active");
      return;
    } else {
      subjectTooltip.classList.remove("active");
    }

    if(!messageRegex.test(inpForTextarea.value) || inpForTextarea.value.length === 0) {
      messageTooltip.classList.add("active");
      return;
    } else {
      messageTooltip.classList.remove("active");
    }
  });
})