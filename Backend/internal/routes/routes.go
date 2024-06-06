package routes

import (
	"MockTrading/internal/handlers"
	"MockTrading/internal/models"
	"MockTrading/internal/repository"
	"MockTrading/internal/services"
	"MockTrading/internal/utils"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
		stockService.CreateStock(ctx)
	})

	r.GET("/getStocks/:PortfolioID", func(ctx *gin.Context) {
		portfolioIdStr := ctx.Param("PortfolioID")
		fmt.Println("portfolioIdStr", portfolioIdStr)
		stockService.GetStocks(ctx)
	})

	transactionService := services.NewTransactionService(models.DB)
	r.POST("/addTransaction", func(ctx *gin.Context) {
		transactionService.CreateTransaction(ctx)
	})

	portfolioService := services.NewPortfolioService(models.DB)
	r.GET("/portfolio/:UserEmail", func(ctx *gin.Context) {
		portfolioService.GetPortfolioByEmail(ctx)
	})

	r.GET("/getBalance/:UserEmail", func(ctx *gin.Context) {
		portfolioService.GetPortfolioBalanceByEmail(ctx)
	})
	r.POST("/updateBalance", func(ctx *gin.Context) {
		fmt.Println("Made it")
		portfolioService.UpdateBalance(ctx)
	})

	stockListService := services.NewStockListService(models.DB)

	r.GET("/getStockList", func(ctx *gin.Context) {
		stockListService.GetStockList(ctx)
	})

	return r
}
