// Copilot Auto generated start
package main

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/iLink-Digital-DEX-AI/KirubhaAITest/model"
)

func main() {
	app := fiber.New()

	// Enable CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	todos := []model.Todo{}

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("Server Ok")
	})

	// Copilot Auto generated start
	app.Post("api/todos", func(c *fiber.Ctx) error {
		var todo model.Todo
		if err := c.BodyParser(&todo); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Cannot parse JSON",
			})
		}

		todo.Id = len(todos) + 1
		todos = append(todos, todo)
		return c.Status(fiber.StatusCreated).JSON(todos)
	})
	// Copilot Auto generated end

	// Copilot Auto generated start
	app.Patch("api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "invalid id",
			})
		}

		for i, todo := range todos {
			if todo.Id == id {
				if todos[i].Done {
					todos[i].Done = false
				} else {
					todos[i].Done = true
				}
				return c.Status(fiber.StatusOK).JSON(todos)
			}
		}

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "todo not found",
		})
	})
	// Copilot Auto generated end

	// Copilot Auto generated start
	app.Get("api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})
	// Copilot Auto generated end

	app.Listen(":3000")
}

// Copilot Auto generated end
