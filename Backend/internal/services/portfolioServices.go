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

type PortfolioService struct {
	PortfolioRepo *repository.PortfolioRepository
}

func NewPortfolioService(db *gorm.DB) *PortfolioService {
	return &PortfolioService{
		PortfolioRepo: &repository.PortfolioRepository{
			DB: db,
		},
	}
}

func (s *PortfolioService) CreatePortfolio(userEmail string) error {
	newPortfolio := models.Portfolio{
		Balance:      1000000, // Default balance
		UserEmail:    userEmail,
		Stocks:       []models.Stock{},
		Transactions: []models.Transaction{},
	}

	if err := s.PortfolioRepo.CreatePortfolio(&newPortfolio); err != nil {
		log.Printf("Error creating new portfolio for user %s: %v", userEmail, err)
		return fmt.Errorf("could not create portfolio: %w", err)
	}

	log.Printf("New Portfolio created: %+v", newPortfolio)
	return nil
}

func (s *PortfolioService) GetPortfolioByEmail(c *gin.Context) {
	email := c.Param("UserEmail")

	if s.PortfolioRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Portfolio Repo is not initialized"})
		return
	}

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	portfolioRepo := repository.PortfolioRepository{
		DB: models.DB, // assuming models.DB is the global DB connection
	}

	user, err := portfolioRepo.GetPortfolioByEmail(email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (s *PortfolioService) UpdateBalance(c *gin.Context) {

	var updateBalance models.BalanceDto

	if err := c.ShouldBindJSON(&updateBalance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	portfolio, err := s.PortfolioRepo.UpdateBalance(updateBalance)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, portfolio)
}

func (s *PortfolioService) GetPortfolioBalanceByEmail(c *gin.Context) {
	email := c.Param("UserEmail")

	if s.PortfolioRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Portfolio Repo is not initialized"})
		return
	}

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	// portfolioRepo := repository.PortfolioRepository{
	// 	DB: models.DB, // assuming models.DB is the global DB connection
	// }

	balance, err := s.PortfolioRepo.GetBalanceByEmail(email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, balance)
}
