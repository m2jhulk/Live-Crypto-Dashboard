async function fetchLivePrices() {
    try {
        // Fetching prices simultaneously using Promise.all
        const [solRes, bnbRes, adaRes] = await Promise.all([
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'),
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT')
        ]);
        
        if (!solRes.ok || !bnbRes.ok || !adaRes.ok) throw new Error('Binance API response error');
        
        const solData = await solRes.json();
        const bnbData = await bnbRes.json();
        const adaData = await adaRes.json();

        // Updating the DOM with precise formatting
        document.getElementById('price-solana').innerHTML = `$${parseFloat(solData.price).toFixed(2)}`;
        document.getElementById('price-binancecoin').innerHTML = `$${parseFloat(bnbData.price).toFixed(2)}`;
        document.getElementById('price-cardano').innerHTML = `$${parseFloat(adaData.price).toFixed(4)}`;

    } catch (error) {
        console.error("Fetch error:", error);
        
        // Displaying error state gracefully
        const errorHtml = `<span class="error">API Blocked</span>`;
        document.getElementById('price-solana').innerHTML = errorHtml;
        document.getElementById('price-binancecoin').innerHTML = errorHtml;
        document.getElementById('price-cardano').innerHTML = errorHtml;
    }
}

// Initial fetch when page loads
fetchLivePrices();

// Auto-refresh prices every 10 seconds (10000 milliseconds)
setInterval(fetchLivePrices, 10000);
