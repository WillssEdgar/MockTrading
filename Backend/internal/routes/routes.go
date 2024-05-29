package routes

import (
	"MockTrading/internal/handlers"
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"MockTrading/internal/services"
	"MockTrading/internal/utils"
	"fmt"

	"github.com/gin-gonic/gin"

	"net/http"

	"github.com/gin-contrib/cors"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())
	models.ConnectDatabase()
	r.GET("/price", func(ctx *gin.Context) {
		price, err := utils.GetCompanyPrice("AAPL")
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": price,
		})
	})
	r.GET("/Info/:symbol", utils.GetCompany)
	r.GET("/Info3M/:symbol", utils.GetCompany3M)
	r.GET("/company/:symbol", utils.GetCompanyHandler)

	r.GET("/Info/", func(ctx *gin.Context) {
		utils.GetCompanyRange(ctx)
	})
	r.POST("/signup", func(ctx *gin.Context) {
		handlers.SignUp(ctx)
	})
	r.POST("/signin", func(ctx *gin.Context) {
		fmt.Println("Hello World", ctx)
		handlers.SignIn(ctx)
	})

	userService := &services.UserService{
		UserRepo: &repository.UserRepository{},
	}

	r.GET("/userinfo/:email", func(ctx *gin.Context) {
		userService.GetUserByEmail(ctx)
	})

	stockService := services.NewStockService(models.DB)

	r.POST("/purchase", func(ctx *gin.Context) {
		fmt.Println("Here in purchase endpoint")
		stockService.CreateStock(ctx)
	})

	return r
}
