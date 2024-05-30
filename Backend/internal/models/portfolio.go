package models

type Portfolio struct {
	ID           uint          `json:"ID" gorm:"primaryKey"`
	Balance      float64       `json:"Balance" gorm:"default:1000000"`
	UserEmail    string        `json:"UserEmail" gorm:"unique;not null"`
	Stocks       []Stock       `json:"Stocks" gorm:"foreignKey:PortfolioID"`
	Transactions []Transaction `json:"Transactions" gorm:"foreignKey:PortfolioID"`
}
