package models

type StockList struct {
	Symbol string `json:"Symbol" gorm:"primaryKey"`
	Name   string `json:"Name" gorm:"not null"`
}
