package repository

import (
	"MockTrading/internal/models"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type UserRepository struct {
	DB *gorm.DB
}

func (r *UserRepository) CreateUser(user *models.User) error {
	return r.DB.Create(user).Error
}

func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	if r.DB == nil {
		return nil, errors.New("database connection is nil")
	}
	fmt.Println("Email String in repo", email)
	var user models.User
	if err := r.DB.First(&user, "email = ?", email).Error; err != nil {
		return nil, err
	}
	fmt.Println("User in repo ", user)
	return &user, nil
}
