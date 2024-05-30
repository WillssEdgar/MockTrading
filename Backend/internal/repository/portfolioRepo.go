package repository

import (
	"MockTrading/internal/models"
	"fmt"

	"gorm.io/gorm"
)

type PortfolioRepository struct {
	DB *gorm.DB
}

func (r *PortfolioRepository) CreatePortfolio(Portfolio *models.Portfolio) error {
	fmt.Println("I am here")
	if r.DB == nil {
		fmt.Println("Database is nil")
	}
	return r.DB.Create(Portfolio).Error
}
