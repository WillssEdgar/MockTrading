package repository

import (
	"MockTrading/internal/models"
	"errors"
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

func (r *PortfolioRepository) GetPortfolioByEmail(email string) (*models.Portfolio, error) {
	if r.DB == nil {
		return nil, errors.New("database connection is nil")
	}
	fmt.Println("Email String in repo", email)
	var portfolio models.Portfolio
	if err := r.DB.First(&portfolio, "email = ?", email).Error; err != nil {
		return nil, err
	}
	return &portfolio, nil
}
