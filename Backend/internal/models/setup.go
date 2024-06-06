package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "user=postgres.gzzbrleccmtqfymllpln password=vkfaU6wLrKJNa3 host=aws-0-us-east-1.pooler.supabase.com port=5432 dbname=postgres"

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	err = database.AutoMigrate(&User{}, &Stock{}, &Portfolio{}, &Transaction{}, &StockList{})
	if err != nil {
		return
	}
	DB = database
}
