package services

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserService struct {
	UserRepo *repository.UserRepository
}

func (s *UserService) CreateUser(user *models.User) error {
	// Business logic before saving user
	return s.UserRepo.CreateUser(user)
}

func (s *UserService) GetUserByEmail(c *gin.Context) {
	email := c.Param("email")
	fmt.Println("Email", email)
	if s.UserRepo == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User Repo is not initialized"})
		return
	}

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	userRepo := repository.UserRepository{
		DB: models.DB, // assuming models.DB is the global DB connection
	}

	user, err := userRepo.GetUserByEmail(email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}
