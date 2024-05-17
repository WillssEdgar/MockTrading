package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {

	symbol := "AAPL"
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s", symbol)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	// Navigate the JSON structure to get the daily price
	chart, ok := result["chart"].(map[string]interface{})
	if !ok {
		fmt.Println("Error parsing chart")
		return
	}

	resultArray, ok := chart["result"].([]interface{})
	if !ok || len(resultArray) == 0 {
		fmt.Println("Error parsing result array")
		return
	}

	firstResult, ok := resultArray[0].(map[string]interface{})
	if !ok {
		fmt.Println("Error parsing first result")
		return
	}

	meta, ok := firstResult["meta"].(map[string]interface{})
	if !ok {
		fmt.Println("Error parsing meta")
		return
	}

	fmt.Println("Regular Market Price of %s: %f\n", symbol, meta["regularMarketPrice"])

	indicators, ok := firstResult["indicators"].(map[string]interface{})
	if !ok {
		fmt.Println("Error parsing indicators")
		return
	}

	quoteArray, ok := indicators["quote"].([]interface{})
	if !ok || len(quoteArray) == 0 {
		fmt.Println("Error parsing quote array")
		return
	}

	firstQuote, ok := quoteArray[0].(map[string]interface{})
	if !ok {
		fmt.Println("Error parsing first quote")
		return
	}

	closePrices, ok := firstQuote["close"].([]interface{})
	if !ok || len(closePrices) == 0 {
		fmt.Println("Error parsing close prices")
		return
	}

	// Assuming you want the most recent daily price
	latestPrice, ok := closePrices[len(closePrices)-1].(float64)
	if !ok {
		fmt.Println("Error parsing the latest close price")
		return
	}

	fmt.Printf("The latest daily closing price for %s is: %f\n", symbol, latestPrice)

}
