package models

type Stock struct {
	Id             uint    `json:"Id" gorm:"primary_key"`
	Symbol         string  `json:"Symbol" gorm:"not null"`
	PurchaseDate   string  `json:"PurchaseDate" gorm:"not null"`
	PurchasePrice  float64 `json:"PurchasePrice" gorm:"not null"`
	AmountOfShares uint    `json:"AmountOfShares" gorm:"not null"`
}
