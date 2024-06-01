package services

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TransactionService struct {
	TransactionRepo *repository.TransactionRepository
}

func NewTransactionService(db *gorm.DB) *TransactionService {
	return &TransactionService{
		TransactionRepo: &repository.TransactionRepository{
			DB: db,
		},
	}
}

func (s *TransactionService) CreateTransaction(c *gin.Context) {
	var newTransaction models.Transaction

	if err := c.ShouldBindJSON(&newTransaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("New Transaction: ", newTransaction)

	if err := s.TransactionRepo.CreateTransaction(&newTransaction); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create stock: " + err.Error()})
		return
	}

	repo := &repository.PortfolioRepository{DB: models.DB}
	if err := repo.AddTransactionToPortfolio(newTransaction); err != nil {
		log.Fatalf("failed to add transaction: %v", err)
	}

	c.JSON(http.StatusCreated, newTransaction)
}
