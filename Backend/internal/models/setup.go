package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=willssedgar dbname=mock_trading port=5432 sslmode=disable TimeZone=America/New_York"

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	err = database.AutoMigrate(&User{})
	if err != nil {
		return
	}
	DB = database
}
