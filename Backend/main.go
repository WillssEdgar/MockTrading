package main

import (
	"MockTrading/models"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getCompanyInfo(symbol string) ([]interface{}, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s", symbol)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching data: %w", err)
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("error decoding JSON: %w", err)
	}

	chart, ok := data["chart"].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("error: unable to find 'chart' key in response")
	}

	result, ok := chart["result"].([]interface{})
	if !ok || len(result) == 0 {
		return nil, fmt.Errorf("error: empty or invalid 'result' array")
	}

	return result, nil
}
func getCompanyPrice(symbol string) (float64, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s", symbol)

	resp, err := http.Get(url)
	if err != nil {
		return 0.0, fmt.Errorf("error fetching data: %w", err)
	}
	defer resp.Body.Close()

	var data map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return 0.0, fmt.Errorf("error decoding JSON: %w", err)
	}

	chart, ok := data["chart"].(map[string]interface{})
	if !ok {
		return 0.0, fmt.Errorf("error: unable to find 'chart' key in response")
	}

	result, ok := chart["result"].([]interface{})
	if !ok || len(result) == 0 {
		return 0.0, fmt.Errorf("error: empty or invalid 'result' array")
	}

	meta, ok := result[0].(map[string]interface{})["meta"].(map[string]interface{})
	if !ok {
		return 0.0, fmt.Errorf("error: unable to find 'meta' key in response")
	}

	price, ok := meta["regularMarketPrice"].(float64)
	if !ok {
		return 0.0, fmt.Errorf("error: unable to find 'regularMarketPrice' key in response")
	}

	fmt.Printf("Regular Market Price of %s: %f\n", symbol, price)
	return price, nil
}
func getCompany(c *gin.Context) {
	symbol := c.Param("symbol")
	price, err := getCompanyInfo(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}
func getCompanyHandler(c *gin.Context) {
	symbol := c.Param("symbol")
	price, err := getCompanyPrice(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	models.ConnectDatabase()
	r.GET("/price", func(ctx *gin.Context) {
		price, err := getCompanyPrice("AAPL")
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": price,
		})
	})
	r.GET("/Info/:symbol", getCompany)
	r.GET("/company/:symbol", getCompanyHandler)
	r.Run()
}
