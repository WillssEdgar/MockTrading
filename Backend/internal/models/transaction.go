package models

type Transaction struct {
	ID              uint   `json:"ID" gorm:"primaryKey"`
	TransactionDate string `json:"TransactionDate" gorm:"not null"`
	TransactionType string `json:"TransactionType" gorm:"not null"`
	NewBalance      string `json:"NewBalance" gorm:"not null"`
	PortfolioID     uint   `json:"PortfolioID"`
}
