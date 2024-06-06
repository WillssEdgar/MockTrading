package services

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type StockService struct {
	StockRepo *repository.StockRepository
}

func NewStockService(db *gorm.DB) *StockService {
	return &StockService{
		StockRepo: &repository.StockRepository{
			DB: db,
		},
	}
}

func (s *StockService) CreateStock(c *gin.Context) {
	var newStock models.Stock

	if err := c.ShouldBindJSON(&newStock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := s.StockRepo.CreateStock(&newStock); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create stock: " + err.Error()})
		return

	}
	repo := &repository.PortfolioRepository{DB: models.DB}
	if err := repo.AddStockToPortfolio(newStock); err != nil {
		log.Fatalf("failed to add transaction: %v", err)
	}

	c.JSON(http.StatusCreated, newStock)
}

func (s *StockService) GetStocks(c *gin.Context) {
	// Create a placeholder for the request body, if needed
	portfolioIdStr := c.Param("PortfolioID")
	portfolioId, err := strconv.ParseInt(portfolioIdStr, 10, 64)
	if err != nil || portfolioId <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid PortfolioID"})
		return
	}
	fmt.Println("PortfolioID", portfolioId)

	// Check if the repository is initialized
	if s.StockRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "StockList Repo is not initialized"})
		return
	}
	// Pass the stock object to the GetStockList method
	stock, err := s.StockRepo.GetStock(portfolioId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, stock)

}
