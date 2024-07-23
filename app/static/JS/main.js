document.addEventListener("DOMContentLoaded", () => {
	// Header
	const headers = document.querySelectorAll(".app-header");
	// Set global route padding based on header height
	const routes = document.querySelectorAll("main.route");
	headers.forEach(header => {
		let headerHeight = header.clientHeight;
		routes.forEach(route => {
			route.style.paddingTop = `${headerHeight}px`;
		})
	})
	/* 
		Toggling the sidebar on mobile screens by adding or 
		removing an "active" css classname to either
		show or hide the sidebar element
	*/
	const sidebar = document.querySelector(".app-sidebar.mdc-sm");
	const toggleSidebarBtn = document.querySelectorAll(".toggle_sidebar");
	toggleSidebarBtn.forEach(btn => {
		btn.addEventListener("click", toggleSidebar);
	});
	function toggleSidebar() {
		sidebar.classList.toggle("active");
	}
	// Navlinks
	const navlinks = document.querySelectorAll(".app-navlink");
	// Handle spa routing for page switching without reload
	navlinks.forEach(navlink => {
		navlink.addEventListener("click", (event) => {
			//event.preventDefault();
			navlinks.forEach(active => active.classList.remove("active"));
			navlink.classList.add("active");
			sidebar.classList.remove("active");
		})
	});
	/*
	Search bar functionality to expand it when user clicks or focuses
	on it. Maybe append search results or first 5 - 10 search history
	
	const searchables = JSON.parse(localStorage.getItem("searchables") || "[]");
	const searchInp = document.querySelector(".inp-field.search");
	//const input_element = searchInp.querySelector("input.search-bar");
	const searchResultsContainer = document.querySelector(".search-results");
	const nullSearchResults = document.querySelector(".null-search-results");
	// Expand search bar
	searchInp.addEventListener("click", () => {
		searchInp.classList.add("active");
	});
	document.addEventListener("click", (event) => {
		if (!searchInp.contains(event.target)) {
			searchInp.classList.remove("active");
			searchResultsContainer.classList.remove("active");
			input_element.value = "";
			nullSearchResults.classList.remove("active");
			routes.forEach(route => route.classList.add("active"));
		}
	});
	// Function to filter results based on user input in search bar
	function filterResults(searchTerm) {
		return searchables.filter(term =>
			term.body.toLowerCase().includes(searchTerm.toLowerCase()));
	}
	// Display results according to what user types in the search input element
	input_element.addEventListener("input", (event) => {
		const searchTerm = event.target.value;
		const filteredTerms = filterResults(searchTerm);
		if (filteredTerms.length === 0) {
			routes.forEach(active => active.classList.remove("active"));
			nullSearchResults.classList.add("active");
			const nullSearchTermHighlight = nullSearchResults.querySelector(".highlight");
			nullSearchTermHighlight.innerText = `"${searchTerm}"`;
		} else {
			displaySearchTermResults(filteredTerms);
		}
		if (input_element.value.length === 0) {
			nullSearchResults.classList.remove("active");
		}
	});
	// Shrink or hide input_element when user clicks away from it
	input_element.addEventListener("blur", () => {
		if (input_element.value.length == 0) {
			searchInp.classList.remove("active");
		}
	});
	// Displaying each individual search results that match user search input in the search results container
	function displaySearchTermResults(filteredTerms) {
		searchResultsContainer.innerHTML = ``; // Clear previous entries
		filteredTerms.forEach((term, index) => {
			// HTML for each search term result
			const searchResult = document.createElement("div");
			searchResult.classList.add("search-result");
			let maxBodyLength = 50;
			searchResult.innerHTML = `
				<span class="body-text">
					${term.body.substring(0, maxBodyLength) }
					${term.body.length > maxBodyLength ? "..." : "" }
				</span>
			`;
			searchResultsContainer.appendChild(searchResult);
			// Show page with the corresponding search result content
			searchResult.addEventListener("click", (event) => {
				// Implement functionality to show the corresponding page
			});
		});
	}
	// Perform search function when search button is clicked
	const searchInpBtn = searchInp.querySelector(".search-button");
	searchInpBtn.addEventListener("click", (event) => {
		if (input_element.value.length > 0) {
			alert(input_element.value);
		}
	});*/
	// Accordion content
	const accordions = document.querySelectorAll(".accordion");
	accordions.forEach(el => {
		const accordionToggle = el.querySelector(".accordion-toggle");
		const accordionContent = el.querySelector(".accordion-content");
		accordionToggle.addEventListener("click", () => {
			accordionToggle.classList.toggle("active");
			accordionContent.classList.toggle("active");
		})
	});

	// Logout modal
	if (
			document.querySelector("#dashboard_root") ||
			document.querySelector("#marketplace_root")
		) {
		const showLogoutModal = document.querySelectorAll(".show-logout-modal");
		showLogoutModal.forEach(btn => {
			btn.addEventListener("click", () => {
				sidebar.classList.remove("active");
				logoutModal.classList.add("active");
			})
		});
		const logoutModal = document.querySelector(".logout-modal");
		const cancelLogout = logoutModal.querySelector(".cancel-logout");
		cancelLogout.addEventListener("click", () => {
			logoutModal.classList.remove("active");
		});
		const modalNotification = document.querySelector(".dismissible-modal");
		const cancelNotification = modalNotification.querySelector(".dismiss-notification");
		cancelNotification.addEventListener("click", () => {
			modalNotification.classList.add("active");
		});
	}
})
