document.addEventListener("DOMContentLoaded", () => {
  const botSettingsModal = document.querySelector(".bot-settings-modal");

  const botWrappers = document.querySelectorAll(".bot-wrapper");

  const savedSettings = JSON.parse(localStorage.getItem("saved-settings") || "[]");

  console.log(savedSettings);

  botWrappers.forEach(wrapper => {
    const settingsBtn = wrapper.querySelector(".bot-actions > a > button");
    settingsBtn.addEventListener("click", () => {
      botSettingsModal.classList.add("active");
      
      botSettingsModal.id = wrapper.id;

      // Insert saved values on modal open, else use the bot id
      if (savedSettings.length > 0) {
        
        if (Array.from(savedSettings).find(saved => saved.id === botSettingsModal.id)) {
          const settings = savedSettings.find(saved => saved.id === botSettingsModal.id);

          let slValue = botSettingsModal.querySelector("input#stop-loss");
          let tPercentageValue = botSettingsModal.querySelector("input#trading");
          let tpValue = botSettingsModal.querySelector("input#take-profit");

          slValue.value = settings.sl;
          tPercentageValue.value = settings.tPercentage;
          tpValue.value = settings.tp;

          botSettingsModal.querySelector("input#stop-loss + #stop-loss-percentage").textContent = slValue.value + "%";
          botSettingsModal.querySelector("input#trading + #trading-percentage").textContent = tPercentageValue.value + "%";
          botSettingsModal.querySelector("input#take-profit + #take-profit-percentage").textContent = tpValue.value + "%";
        }
      } else {
        console.warn("No existing modal id");
      }
    });
  });

  const sliders = document.querySelectorAll(".slider-wrapper");
  sliders.forEach(slider => {
    const inp = slider.querySelector("input.slider");
    const inpText = slider.querySelector("span");
    inp.addEventListener("input", () => {
      inpText.textContent = `${inp.value}%`;
    });
  });

  const botSettingsForm = document.getElementById("bot-settings-form");
  botSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const sliderValues = {
      hash: Math.floor(Math.random() * (5000 - 1000) + 1000),
      id: botSettingsModal.id,
      sl: botSettingsModal.querySelector("input#stop-loss").value,
      tPercentage: botSettingsModal.querySelector("input#trading").value,
      tp: botSettingsModal.querySelector("input#take-profit").value
    };

    const existing = Array.from(savedSettings).find(saved => sliderValues);

    if (existing) {
      const index = Array.from(savedSettings).indexOf(existing);
      if (index > -1) {
        savedSettings.splice(index, 1);
      }
    }

    savedSettings.push(sliderValues);
    localStorage.setItem("saved-settings", JSON.stringify(savedSettings)); // Save updated settings to localStorage

    const saveSettingsBtn = document.getElementById("save-settings");
    saveSettingsBtn.style.pointerEvents = "none";
  });

  function applyActivated(button){
    if (Array.from(savedSettings).find(saved => saved.id === button.id)) {
      button.textContent = "Activated";
      button.classList.remove("primary-button");
      button.classList.add("secondary-button");
    }
  }

  const settingsBtns = document.querySelectorAll(".bot-actions > button");
  settingsBtns.forEach(btn => {
    applyActivated(btn);
  });

  const closeBotSettings = document.getElementById("close-bot-settings");
  closeBotSettings.addEventListener("click", () => {
    botSettingsModal.classList.remove("active");
  });
});
