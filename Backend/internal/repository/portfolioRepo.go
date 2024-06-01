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
	if err := r.DB.First(&portfolio, "user_email = ?", email).Error; err != nil {
		return nil, err
	}
	return &portfolio, nil
}

func (r *PortfolioRepository) GetBalanceByEmail(email string) (*models.Portfolio, error) {
	if r.DB == nil {
		return nil, errors.New("database connection is nil")
	}
	var portfolio models.Portfolio

	// Query the portfolio by email and select the Balance field
	if err := r.DB.Select("Balance").Where("user_email = ?", email).First(&portfolio).Error; err != nil {
		return nil, err
	}
	return &portfolio, nil
}

func (r *PortfolioRepository) UpdateBalance(balance models.BalanceDto) (*models.Portfolio, error) {
	if r.DB == nil {
		return nil, errors.New("database connection is nil")
	}
	var portfolio models.Portfolio

	// Query the portfolio by email and select the Balance field
	if err := r.DB.Model(&models.Portfolio{}).Where("user_email = ?", balance.Email).Update("balance", balance.Balance).Error; err != nil {
		return nil, err
	}
	return &portfolio, nil
}

func (r *PortfolioRepository) AddTransactionToPortfolio(transaction models.Transaction) error {
	if r.DB == nil {
		return errors.New("database connection is nil")
	}

	// Find the portfolio by email
	var portfolio models.Portfolio
	if err := r.DB.Where("portfolio_id = ?", transaction.PortfolioID).First(&portfolio).Error; err != nil {
		return err
	}

	// Set the PortfolioID of the transaction
	transaction.PortfolioID = portfolio.ID

	// Save the transaction
	if err := r.DB.Create(&transaction).Error; err != nil {
		return err
	}

	return nil
}

func (r *PortfolioRepository) AddStockToPortfolio(stock models.Stock) error {
	if r.DB == nil {
		return errors.New("database connection is nil")
	}

	// Find the portfolio by email
	var portfolio models.Portfolio
	if err := r.DB.Where("portfolio_id = ?", stock.PortfolioID).First(&portfolio).Error; err != nil {
		return err
	}

	// Set the PortfolioID of the transaction
	stock.PortfolioID = portfolio.ID

	// Save the transaction
	if err := r.DB.Create(&stock).Error; err != nil {
		return err
	}

	return nil
}
