import yfinance as yf
from langchain_openai import ChatOpenAI

# Load OpenAI API key from config
from config import OPENAI_API_KEY

def get_stock_price(ticker):
    try:
        stock = yf.Ticker(ticker)
        history = stock.history(period="1d")
        if history.empty:
            return "Stock price data not found."
        return round(history["Close"].iloc[-1], 2)
    except Exception as e:
        return f"Error fetching stock price: {str(e)}"

def analyze_stock(ticker, price):
    try:
        llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY)
        prompt = f"Analyze stock {ticker} at price {price}. Provide investment advice."
        return llm.invoke(prompt)
    except Exception as e:
        return f"Error analyzing stock: {str(e)}"
