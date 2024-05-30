package services

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
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

func (s *PortfolioService) CreatePortfolio() {
	var newPortfolio models.Portfolio

	if err := s.PortfolioRepo.CreatePortfolio(&newPortfolio); err != nil {
		return
	}
}
