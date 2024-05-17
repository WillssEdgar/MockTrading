package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getAAPL() float64 {
	symbol := "AAPL"
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s", symbol)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		return 0.0
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		fmt.Println("Error decoding JSON:", err)

		return 0.0
	}

	chart := data["chart"].(map[string]interface{})
	result := chart["result"].([]interface{})
	if len(result) == 0 {
		fmt.Println("Error: Empty result array")

		return 0.0
	}

	meta := result[0].(map[string]interface{})["meta"].(map[string]interface{})
	price := meta["regularMarketPrice"].(float64)

	fmt.Printf("Regular Market Price of %s: %f\n", symbol, price)
	return price

}

func main() {
	price := getAAPL()
	r := gin.Default()
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": price,
		})
	})
	r.Run()
}
