package main

import (
	"fmt"
	"strconv"

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
type Question struct {
	ID        uint   `gorm:"primary_key" json:"id"`
	Quizid    uint   `json:"quizid"`
	Statement string `json:"Statement"`
	Type      string `json:"Type"`
	OptA      string `json:"optA"`
	OptB      string `json:"optB"`
	OptC      string `json:"optC"`
	OptD      string `json:"optD"`
	AnsA      string `json:"ansA"`
	AnsB      string `json:"ansB"`
	AnsC      string `json:"ansC"`
	AnsD      string `json:"ansD"`
}
type Hist struct {
	Username string `json:"username"`
	Quizid   string `json:"quizid"`
	Score    string `json:"score"`
	Name     string `json:"Name"`
	Genre    string `json:"genre"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.LogMode(true)
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Hist{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	r := gin.Default()
	r.GET("/people/", GetPeople)
	r.GET("/quizzes", GetQuizzes)
	r.GET("/questions/:id", GetQuestions)
	r.GET("/quizzes/:genre", GetQuizzesGenre)
	r.GET("/question/:id", GetQuestion)
	r.GET("/hist/:username", GetHist)
	r.GET("/quizname/:id", GetQuizName)
	r.GET("/leaderboard/quiz/:id", GetLeaderboardQuiz)
	r.GET("/leaderboard/genre/:genre", GetLeaderboardGenre)
	r.GET("/leaderboard/overall", GetLeaderboard)
	r.POST("/questions/:id", CreateQuestion)
	r.POST("/editquestions/:id", EditQuestion)
	r.POST("/login", GetPerson)
	r.POST("/people", CreatePerson)
	r.POST("/hist", CreateHist)
	r.POST("/quiz", CreateQuiz)
	r.DELETE("/people/:id", DeletePerson)
	r.DELETE("/quiz/:id", DeleteQuiz)
	r.DELETE("/question/:id", DeleteQuestion)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person User
	db.Where("id = ?", id).Delete(&person)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	db.Where("id = ?", id).Delete(&quiz)
	var question []Question
	db.Where("quizid = ?", id).Delete(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", id).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
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
func CreateHist(c *gin.Context) {
	var quiz Quiz
	var hist Hist
	c.BindJSON(&hist)
	db.Where("id = ?", hist.Quizid).Last(&quiz)
	hist.Name = quiz.Name
	hist.Genre = quiz.Genre
	db.Create(&hist)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, hist)
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	var quiz2 Quiz
	c.BindJSON(&quiz)
	if quiz.Name == "" {
		c.JSON(350, quiz)
		c.Header("access-control-allow-origin", "*")
		fmt.Println(err)
	} else if err := db.Where("name = ?", quiz.Name).First(&quiz2).Error; err != nil {
		db.Create(&quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(300, quiz)
	}
}

func CreateQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	var question2 Question
	var i int
	i, err = strconv.Atoi(id)
	question.Quizid = uint(i)
	db.Create(&question)
	if err := db.Where("quizid = ?", question.Quizid).Last(&question2).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question2.ID)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(300, question2.ID)
	}
}
func EditQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question.ID)
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
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}
func GetHist(c *gin.Context) {
	username := c.Params.ByName("username")
	var hist []Hist
	if err := db.Where("username = ?", username).Find(&hist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, hist)
	}
}

func GetQuizzes(c *gin.Context) {
	var quizzes []Quiz
	if err := db.Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}
func GetQuizName(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz.Name)
	}
}

func GetQuizzesGenre(c *gin.Context) {
	var quizzes []Quiz
	genre := c.Params.ByName("genre")
	if err := db.Where("genre = ?", genre).Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

func GetQuestions(c *gin.Context) {
	id := c.Params.ByName("id")
	var questions []Question
	if err := db.Where("quizid = ?", id).Find(&questions).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, questions)
	}
}
func GetQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(question)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func GetLeaderboardQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var hist []Hist
	if err := db.Where("quizid = ?", id).Order("score desc").Find(&hist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, hist)
	}
}
func GetLeaderboardGenre(c *gin.Context) {
	genre := c.Params.ByName("genre")
	var hist []Hist
	if err := db.Where("genre = ?", genre).Order("score desc").Find(&hist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, hist)
	}
}

func GetLeaderboard(c *gin.Context) {
	var hist []Hist
	if err := db.Order("score desc").Find(&hist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, hist)
	}
}
