package repository

import (
	"MockTrading/internal/models"
	"fmt"

	"gorm.io/gorm"
)

type StockRepository struct {
	DB *gorm.DB
}

func (r *StockRepository) CreateStock(stock *models.Stock) error {
	fmt.Println("I am here")
	if r.DB == nil {
		fmt.Println("Database is nil")
	}
	return r.DB.Create(stock).Error
}

func (r *StockRepository) GetStock(portfolioId int64) ([]models.Stock, error) {
	var stocks []models.Stock

	if err := r.DB.Where("portfolio_id", portfolioId).Find(&stocks).Error; err != nil {
		return nil, err
	}

	return stocks, nil

}
