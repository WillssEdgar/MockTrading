package repository

import (
	"MockTrading/internal/models"
	"fmt"

	"gorm.io/gorm"
)

type TransactionRepository struct {
	DB *gorm.DB
}

func (r *TransactionRepository) CreateTransaction(transaction *models.Transaction) error {
	fmt.Println("Transaction", transaction)
	if r.DB == nil {
		fmt.Println("Database is nil")
	}
	return r.DB.Create(transaction).Error
}
