package models

type Transaction struct {
	ID              uint    `json:"ID" gorm:"primaryKey"`
	TransactionDate string  `json:"TransactionDate" gorm:"not null"`
	TransactionType string  `json:"TransactionType" gorm:"not null"`
	NewBalance      float64 `json:"NewBalance" gorm:"not null"`
	PortfolioID     uint    `json:"PortfolioID"`
}
