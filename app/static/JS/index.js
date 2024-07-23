document.addEventListener("DOMContentLoaded", () => {
	const homeRoot = document.getElementById("home_root");
	
	// Navlinks that scroll to a section with a matching id as its data-scrollto value on the page
	const appNavlinks = document.querySelectorAll(".app-navlink");
	const scrollToSections = document.querySelectorAll("section");
	appNavlinks.forEach(a => {
		const matchingId = Array.from(scrollToSections).find(section => section.id === a.dataset.scrollto);
		a.addEventListener("click", () => {
			if(matchingId){
				window.scrollTo({
					top: matchingId.offsetTop,
					behavior: "smooth"
				});
			}
		})
	});
	
	// Testimonial Carousel visible only on sm devices
	const container = document.querySelector(".carousel-container");
	const track = document.querySelector(".carousel-track");
	const items = document.querySelectorAll(".carousel-item");
	const prevButton = document.getElementById("prev_testimonial_card");
	const nextButton = document.getElementById("next_testimonial_card");
	const itemCount = document.querySelector(".carousel-active-count span.active");
	
	let currentIndex = 0;
	
	function updateCarousel() {
		const containerWidth = container.clientWidth;
		const itemWidth = items[0].clientWidth + parseInt(window.getComputedStyle(track).gridGap);
		const offset = -currentIndex * itemWidth - (containerWidth / 3 - itemWidth / 2.35);
		track.style.transform = `translateX(${offset}px)`;
	}
	
	prevButton.addEventListener("click", () => {
		if (currentIndex > 0) {
			currentIndex--;
			itemCount.innerHTML = `${1+currentIndex}`;
			updateCarousel();
		}
	});
	
	nextButton.addEventListener("click", () => {
		if (currentIndex < items.length - 1) { // Adjust for spacer
			currentIndex++;
			itemCount.innerHTML = `${1+currentIndex}`;
			updateCarousel();
		}
	});
});