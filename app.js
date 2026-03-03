const CARD_ID = "CARD1001";
const transactionBody = document.getElementById("transactionBody");
const card = document.getElementById("card");
const cardName = document.getElementById("cardName");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const cardNumber = document.getElementById("cardNumber");
const cardHolder = document.getElementById("cardHolder");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");

const toggleNumberBtn = document.getElementById("toggleNumber");
const toggleCvvBtn = document.getElementById("toggleCvv");

let fullNumber = "";
let maskedNumber = "";
let realCvv = "";
let cvvVisible = false;
let numberMasked = true;

// Load card data
async function loadCard() {
  const response = await fetch(`http://localhost:3000/api/card/${CARD_ID}`);
  const data = await response.json();

  cardName.textContent = data.cardName;
  network.textContent = `${data.network} (${data.currency} ${data.symbol})`;
  balance.textContent = `${data.symbol} ${data.availableBalance.toFixed(2)}`;

  fullNumber = data.cardNumber.replace(/(.{4})/g, "$1 ").trim();
  maskedNumber = data.maskedNumber;
  renderCardNumber(maskedNumber);

  cardHolder.textContent = data.cardHolderName;
  expiry.textContent = data.expiry;

  realCvv = data.cvv;
  cvv.textContent = realCvv;
}
async function loadTransactions() {
  const response = await fetch(`http://localhost:3000/api/transactions/${CARD_ID}`);
  const data = await response.json();

  transactionBody.innerHTML = "";

  data.spendTransactions.forEach(txn => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${txn.toName}</td>
      <td>${txn.currency} ${txn.amount}</td>
      <td>${txn.category}</td>
      <td>${new Date(txn.processedTimestamp).toLocaleDateString()}</td>
    `;

    transactionBody.appendChild(row);
  });
}

// Flip card on click
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
  loadTransactions();
});


function renderCardNumber(numberWithSpaces) {
  cardNumber.innerHTML = "";

  const groups = numberWithSpaces.split(" ");

  groups.forEach(group => {
    const span = document.createElement("span");
    span.textContent = group;
    cardNumber.appendChild(span);
  });
}
// Toggle full/masked number
toggleNumberBtn.addEventListener("click", () => {
  numberMasked = !numberMasked;
  toggleNumberBtn.addEventListener("click", () => {
    numberMasked = !numberMasked;

    if (numberMasked) {
        renderCardNumber(maskedNumber);
    } else {
        renderCardNumber(fullNumber);
    }
});
});

// Toggle CVV


loadCard();