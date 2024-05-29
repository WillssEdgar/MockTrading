package main

import (
	"MockTrading/internal/routes"
)

func main() {
	r := routes.SetupRouter()
	r.Run()
}
