from fastapi import FastAPI

app = FastAPI()

@app.get("/")  # Add this to handle root requests
def read_root():
    return {"message": "Welcome to the Stock Market API!"}

@app.get("/stock/{ticker}")
def stock_info(ticker: str):
    """Fetch stock data based on ticker symbol"""
    return {"ticker": ticker, "price": "Fetching...", "recommendation": "Pending analysis"}
