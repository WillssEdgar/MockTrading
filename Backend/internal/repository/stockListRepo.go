package repository

import (
	"MockTrading/internal/models"

	"gorm.io/gorm"
)

type StockListRepository struct {
	DB *gorm.DB
}

func (r *StockListRepository) GetStockList() ([]models.StockList, error) {
	var stockLists []models.StockList
	if err := r.DB.Find(&stockLists).Error; err != nil {
		return nil, err
	}
	return stockLists, nil
}
