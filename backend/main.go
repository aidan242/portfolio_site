package main

import (
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Static("/", "../frontend/dist")
	app.Static("/img", "../frontend/public/img") // Serve images directory

	app.Get("/api/hello", func(c *fiber.Ctx) error {
		return c.SendString("Hello from Go Fiber!")
	})

	// Endpoint to get list of keyboard images
	app.Get("/api/keeb-images", func(c *fiber.Ctx) error {
		pattern := "../frontend/public/img/*"
		files, err := filepath.Glob(pattern)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to read image directory",
			})
		}

		// Extract just the filenames
		var filenames []string
		for _, file := range files {
			filenames = append(filenames, filepath.Base(file))
		}

		return c.JSON(filenames)
	})

	app.Listen(":3000")
}