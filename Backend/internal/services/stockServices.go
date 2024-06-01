package services

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"log"
	"net/http"

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
