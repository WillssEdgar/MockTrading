package utils

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetCompanyInfo(symbol string) ([]interface{}, error) {
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
func GetCompanyPrice(symbol string) (float64, error) {
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

func GetCompany(c *gin.Context) {
	symbol := c.Param("symbol")
	price, err := GetCompanyInfo(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}
func GetCompanyInfoRange(symbol string, dateRange string) ([]interface{}, error) {

	var url string
	if dateRange == "1d" {
		url = fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?range=%s&interval=1h", symbol, dateRange)
	} else {
		url = fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?range=%s&interval=1d", symbol, dateRange)
	}

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

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

func GetCompanyInfo3M(symbol string) ([]interface{}, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?range=1mo&interval=1d", symbol)
	fmt.Println(fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?range=1mo&interval=1d", symbol))
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

func GetCompanyRange(c *gin.Context) {
	symbol := c.Query("symbol")
	dateRange := c.Query("range")

	price, err := GetCompanyInfoRange(symbol, dateRange)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}
func GetCompany3M(c *gin.Context) {
	symbol := c.Param("symbol")
	price, err := GetCompanyInfo3M(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}

func GetCompanyHandler(c *gin.Context) {
	symbol := c.Param("symbol")
	price, err := GetCompanyPrice(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{
		"message": price,
	})
}
