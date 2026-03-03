const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

/*
 Mock Cards
*/
const cards = [
  {
    cardId: "CARD1001",
    accountId: "ACC1001",

    // Display fields
    cardName: "Physical Card",
    network: "MASTERCARD",
    currency: "GBP",
    symbol: "£",

    // Financial
    availableBalance: 596.00,

    // Card Details
    cardNumber: "5220938398093512",
    maskedNumber: "•••• •••• •••• 3512",
    last4: "3512",
    expiry: "01/27",
    cvv: "271",
    cardHolderName: "Lucas Benette",

    // Status
    status: "ACTIVE",
    type: "PHYSICAL"
  }
];

/*
 Mock Transactions
 (Structure matches your uploaded JSON file :contentReference[oaicite:0]{index=0})
*/
const transactions = {
  CARD1001: {
  spendTransactions: [
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Amazon",
      amount: -45.50,
      currency: "GBP",
      processedTimestamp: 1751211632760,
      category: "Shopping",
      transactionId: "TXN1001"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Tesco",
      amount: -32.20,
      currency: "GBP",
      processedTimestamp: 1751100000000,
      category: "Groceries",
      transactionId: "TXN1002"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Uber",
      amount: -18.75,
      currency: "GBP",
      processedTimestamp: 1751000000000,
      category: "Transport",
      transactionId: "TXN1003"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Netflix",
      amount: -12.99,
      currency: "GBP",
      processedTimestamp: 1750900000000,
      category: "Entertainment",
      transactionId: "TXN1004"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Zara",
      amount: -60.00,
      currency: "GBP",
      processedTimestamp: 1750800000000,
      category: "Clothing",
      transactionId: "TXN1005"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Starbucks",
      amount: -6.45,
      currency: "GBP",
      processedTimestamp: 1750700000000,
      category: "Food",
      transactionId: "TXN1006"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Apple Store",
      amount: -799.00,
      currency: "GBP",
      processedTimestamp: 1750600000000,
      category: "Electronics",
      transactionId: "TXN1007"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "British Gas",
      amount: -120.30,
      currency: "GBP",
      processedTimestamp: 1750500000000,
      category: "Utilities",
      transactionId: "TXN1008"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Gym Membership",
      amount: -40.00,
      currency: "GBP",
      processedTimestamp: 1750400000000,
      category: "Health",
      transactionId: "TXN1009"
    },
    {
      cardId: "CARD1001",
      fromName: "114767404519850180",
      toName: "Shell Petrol",
      amount: -55.10,
      currency: "GBP",
      processedTimestamp: 1750300000000,
      category: "Fuel",
      transactionId: "TXN1010"
    }
  ],

  spendsByCategory: [
    { category: "Shopping", amount: 45.50 },
    { category: "Groceries", amount: 32.20 },
    { category: "Transport", amount: 18.75 },
    { category: "Entertainment", amount: 12.99 },
    { category: "Clothing", amount: 60.00 },
    { category: "Food", amount: 6.45 },
    { category: "Electronics", amount: 799.00 },
    { category: "Utilities", amount: 120.30 },
    { category: "Health", amount: 40.00 },
    { category: "Fuel", amount: 55.10 }
  ],

  totalIncome: 0.0,
  totalBalance: 515.27,
  totalExpense: 1189.29,

  currentMonthStatistics: {
    highestSpendCategory: "Electronics",
    lowestSpendCategory: "Food",
    highestSpendAmount: 799.00,
    lowestSpendAmount: 6.45
  }
},

  CARD1002: {
    spendTransactions: [
      {
        cardId: "CARD1002",
        fromName: "114737020404498624",
        toName: "Vintage Vision",
        amount: -1.3888888888888888,
        currency: "GBP",
        processedTimestamp: 1750748007415,
        category: "Household",
        transactionId: "114737020737487040"
      }
    ],
    spendsByCategory: [
      { category: "Household", amount: 1.3888888888888888 }
    ],
    totalIncome: 0.0,
    totalBalance: 1200.00,
    totalExpense: 1.3888888888888888,
    currentMonthStatistics: {
      highestSpendCategory: "Household",
      lowestSpendCategory: "Household",
      highestSpendAmount: 1.3888888888888888,
      lowestSpendAmount: 1.3888888888888888
    }
  }
};

/*
-----------------------------------
GET Card Details
-----------------------------------
*/
app.get("/api/card/:cardId", (req, res) => {
  const { cardId } = req.params;

  const card = cards.find(c => c.cardId === cardId);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.json(card);
});

/*
-----------------------------------
GET Transactions by Card
-----------------------------------
*/
app.get("/api/transactions/:cardId", (req, res) => {
  const { cardId } = req.params;

  const cardTransactions = transactions[cardId];

  if (!cardTransactions) {
    return res.status(404).json({ message: "Transactions not found for this card" });
  }

  res.json(cardTransactions);
});

app.listen(PORT, () => {
  console.log(`Mock Bank API running at http://localhost:${PORT}`);
});