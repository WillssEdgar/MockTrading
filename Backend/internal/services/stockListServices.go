package services

import (
	"MockTrading/internal/repository"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type StockListService struct {
	StockListRepo *repository.StockListRepository
}

func NewStockListService(db *gorm.DB) *StockListService {
	return &StockListService{
		StockListRepo: &repository.StockListRepository{
			DB: db,
		},
	}
}

func (s *StockListService) GetStockList(c *gin.Context) {
	// Check if the repository is initialized
	if s.StockListRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "StockList Repo is not initialized"})
		return
	}

	// Fetch the stock list
	stockList, err := s.StockListRepo.GetStockList()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stock list not found"})
		return
	}

	c.JSON(http.StatusOK, stockList)
}
