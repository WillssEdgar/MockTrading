package handlers

import (
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"MockTrading/internal/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	supabase "github.com/nedpals/supabase-go"
)

var supabaseUrl = "https://gzzbrleccmtqfymllpln.supabase.co"
var supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6emJybGVjY210cWZ5bWxscGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzOTYzOTYsImV4cCI6MjAzMTk3MjM5Nn0.1cqv2UqgOHThV99V-uPAO0Hm_6xtIkAJGfjLJKdkbWU"
var supabaseClient = supabase.CreateClient(supabaseUrl, supabaseKey)

func SignUp(c *gin.Context) {
	var newUser models.User

	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := supabaseClient.Auth.SignUp(c, supabase.UserCredentials{
		Email:    newUser.Email,
		Password: newUser.Password,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	userRepo := repository.UserRepository{
		DB: models.DB, // assuming models.DB is the global DB connection
	}
	if err := userRepo.CreateUser(&newUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	portfolioService := services.NewPortfolioService(models.DB)

	if err := portfolioService.CreatePortfolio(newUser.Email); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(user)
	c.JSON(http.StatusOK, newUser)
}

func SignIn(c *gin.Context) {
	var creds supabase.UserCredentials
	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := supabaseClient.Auth.SignIn(c, creds)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, user)
}
