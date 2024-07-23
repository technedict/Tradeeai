document.addEventListener("DOMContentLoaded", () => {
	const authRoot = document.getElementById("auth_root");
	const getStartedBtn = authRoot.querySelectorAll("a");
	getStartedBtn.forEach(a => { // Hides all get started navlinks with a data route of home
		if (a.dataset.route === "get-started") {
			a.style.display = "none";
		}
	});
	// Switching between forms
	const tabContents = document.querySelectorAll(".tab-content");
	const switchFormBtns = document.querySelectorAll(".switch-tab-btn");
	switchFormBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			const loginTab = Array.from(tabContents).find(tab => tab.dataset.tab ===
				"login-form");
			const signupTab = Array.from(tabContents).find(tab => tab.dataset.tab ===
				"signup-form")
			tabContents.forEach(active => active.classList.remove("active"));
			if (btn.id === "login" && loginTab) {
				loginTab.classList.add("active");
			} else {
				signupTab.classList.add("active");
			}
		})
	});
	/* 
		Regex for auth signup form:
		Nice try! there's more regex on the server-side!
	*/
	const signup_authForm = document.getElementById("signup-form");

	// Input fields
	const fnameInpField = document.getElementById("signup-form-fname");
	const lnameInpField = document.getElementById("signup-form-lname");
	const emailInpField = document.getElementById("signup-form-email");

	// Validation tooltips
	const fnameTooltip = document.getElementById("signup-form-fname_tooltip");
	const lnameTooltip = document.getElementById("signup-form-lname_tooltip");
	const emailTooltip = document.getElementById("signup-form-email_tooltip");
	const passwordTooltip = document.getElementById("signup-form-password_tooltip");
	const confirmPasswordTooltip = document.getElementById("signup-form-confirm_password_tooltip");

	fnameInpField.addEventListener("input", () => {
		if (fnameInpField.value.length > 0) {
			fnameTooltip.classList.remove("active");
			return;
		}
	});
	
	lnameInpField.addEventListener("input", () => {
		if (lnameInpField.value.length > 0) {
			lnameTooltip.classList.remove("active");
			return;
		}
	});
	
	emailInpField.addEventListener("input", () => {
		if (emailInpField.value.length > 0) {
			emailTooltip.classList.remove("active");
			return;
		}
	});

	signup_authForm.addEventListener("submit", (event) => {
		event.preventDefault();
		// Input field values
		const fnameValue = document.getElementById("signup-form-fname").value;
		const lnameValue = document.getElementById("signup-form-lname").value;
		const emailValue = document.getElementById("signup-form-email").value;
		const passwordValue = document.getElementById("signup-form-password").value;
		const confirmPasswordValue = document.getElementById("signup-form-confirm_password")
			.value;
		const acceptTermsCheck = document.getElementById("signup-form-accept_terms");

		// Validation
		if (fnameValue.length == 0) {
			fnameTooltip.classList.add("active");
			return;
		} else {
			fnameTooltip.classList.remove("active");
		}
		if (lnameValue.length == 0) {
			lnameTooltip.classList.add("active");
			return;
		} else {
			lnameTooltip.classList.remove("active");
		}
		let emailRegex = /^[a-zA-Z]+[0-9]*@gmail\.com$/;
		let passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
		if (!emailRegex.test(emailValue)) { // Email
			emailTooltip.classList.add("active");
			return;
		} else {
			emailTooltip.classList.remove("active");
		}
		if (!passwordRegex.test(passwordValue)) { // Password 
			passwordTooltip.classList.add("active");
			return;
		} else {
			passwordTooltip.classList.remove("active");
		}
		if (confirmPasswordValue !== passwordValue) { // Email
			confirmPasswordTooltip.classList.add("active");
			return;
		} else {
			confirmPasswordTooltip.classList.remove("active");
		}
		if (!acceptTermsCheck.checked) {
			acceptTermsCheck.classList.add("unchecked");
		} else {
			acceptTermsCheck.classList.remove("unchecked");
		}
	});
	/* 
			Regex for auth login form:
			Nice try! there's more regex on the server-side!
		*/
	const login_authForm = document.getElementById("login-form");
	
	// Input Field
	const loginEmailInpField = document.getElementById("login-form-email");
	
	// Validation tooltip
	const loginEmailTooltip = document.getElementById("login-form-email_tooltip");

	loginEmailInpField.addEventListener("input", () => {
		if(loginEmailInpField.value.length > 0){
			loginEmailTooltip.classList.add("active");
			return;
		}
	})

	login_authForm.addEventListener("submit", (event) => {
		event.preventDefault();

		// Validation tooltip
		const emailTooltip = document.getElementById("login-form-email_tooltip");
		const passwordTooltip = document.getElementById("login-form-password_tooltip");
		const emailValue = document.getElementById("login-form-email").value;
		const passwordValue = document.getElementById("login-form-password");

		// Validation
		let emailRegex = /^[a-zA-Z]+[0-9]*@gmail\.com$/;
		let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

		if(!emailRegex.test(emailValue)){
			emailTooltip.classList.add("active");
			return;
		}else{
			emailTooltip.classList.remove("active");
		}

		if(!passwordRegex.test(passwordValue)){
			passwordTooltip.classList.add("active");
			return;
		}else{
			passwordTooltip.classList.remove("active");
		}
	})
});