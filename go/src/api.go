package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	ID       uint   `gorm:"primary_key" json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}
type Quiz struct {
	ID    uint   `gorm:"primary_key" json:"id"`
	Name  string `json:"Name"`
	Genre string `json:"genre"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Quiz{})
	r := gin.Default()
	r.GET("/people/", GetPeople)
	r.GET("/quizzes", GetQuizzes)
	r.POST("/login", GetPerson)
	r.POST("/people", CreatePerson)
	r.POST("/quiz", CreateQuiz)
	//    r.PUT("/people/:id", UpdatePerson)
	r.DELETE("/people/:id", DeletePerson)
	r.DELETE("/quiz/:id", DeleteQuiz)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person User
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	d := db.Where("id = ?", id).Delete(&quiz)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

// func UpdatePerson(c *gin.Context) {
//    var person User
//    id := c.Params.ByName("id")
//    if err := db.Where("id = ?", id).First(&person).Error; err != nil {
//       c.AbortWithStatus(404)
//       fmt.Println(err)
//    }
//    c.BindJSON(&person)
//    db.Save(&person)
//    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
//    c.JSON(200, person)
// }

func CreatePerson(c *gin.Context) {
	var person User
	var person2 User
	c.BindJSON(&person)
	if person.Username == "" || person.Password == "" {
		c.JSON(350, person)
		c.Header("access-control-allow-origin", "*")
		fmt.Println(err)
	} else if err := db.Where("username = ?", person.Username).First(&person2).Error; err != nil {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(300, person)
	}
}
func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	var quiz2 Quiz
	c.BindJSON(&quiz)
	if quiz.Name == "" {
		c.JSON(350, quiz)
		c.Header("access-control-allow-origin", "*")
		fmt.Println(err)
	} else if err := db.Where("name = ?").First(&quiz2).Error; err != nil {
		db.Create(&quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(300, quiz)
	}
}

func GetPerson(c *gin.Context) {
	var person User
	c.BindJSON(&person)
	if err := db.Where("username = ? and password = ?", person.Username, person.Password).First(&person).Error; err != nil {
		fmt.Println(person.Password)
		fmt.Println(person.Username)
		c.Header("access-control-allow-origin", "*")
		c.JSON(300, person)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func GetPeople(c *gin.Context) {
	var people []User
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}

func GetQuizzes(c *gin.Context) {
	var quizzes []Quiz
	if err := db.Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quizzes)
	}
}
