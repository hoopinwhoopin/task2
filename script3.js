const express = require("express");
const CoinGecko = require("coingecko-api");
import fetch from 'node-fetch';

const app = express();
const coinGecko = new CoinGecko();

// Define your API routes here
// Example: GET /crypto-price?fromCurrency=bitcoin&toCurrency=basic-attention-token&date=12-01-2023

app.get("/crypto-price", async (req, res) => {
    try {
        const { fromCurrency, toCurrency, date } = req.query;

   
        const historicalData = await coinGecko.coins.fetchMarketChartRange(
            fromCurrency,
            toCurrency,
            date,
            date
        );


        const priceInToCurrency = historicalData.data.prices[0][1];

        if (priceInToCurrency) {
            res.json({ price: priceInToCurrency });
        } else {
            res.status(404).json({ error: "Data not available for the specified date." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
