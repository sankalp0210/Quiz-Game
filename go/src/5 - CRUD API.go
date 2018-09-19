package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)
 
var db *gorm.DB                                         // declaring the db globally
var err error

 type User struct {
    Email string `json:"email"`
    Name string `json:"Name"`
    Username string `json:"username"`
    Password string `json:"password"`
 }

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
 
   db.AutoMigrate(&User{})
   r := gin.Default()
//    r.GET("/people/", GetPeople)                    // Creating routes for each functionality
   r.POST("/people/", GetPerson)
   r.POST("/people", CreatePerson)
//    r.PUT("/people/:id", UpdatePerson)
//    r.DELETE("/people/:id", DeletePerson)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}
 

// func DeletePerson(c *gin.Context) {
//    id := c.Params.ByName("id")
//    var person User
//    d := db.Where("id = ?", id).Delete(&person)
//    fmt.Println(d)
//    c.Header("access-control-allow-origin", "*")
//    c.JSON(200, gin.H{"id #" + id: "deleted"})
// }

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
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   fmt.Println("safdgd")
   var person User
   var person2 User
   c.BindJSON(&person2)
   
   if err := db.Where("email = ?", person2.Email).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      fmt.Println(person.Password)
      fmt.Println(person2.Password)
      c.Header("access-control-allow-origin", "*")
      if person.Password != person2.Password{
        c.JSON(300,person)
      } else{
          c.JSON(200, person)
      }
   }
}

// func GetPeople(c *gin.Context) {
//    var people []User
//    if err := db.Find(&people).Error; err != nil {
//       c.AbortWithStatus(404)
//       fmt.Println(err)
//    } else {
//       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
//       c.JSON(200, people)
//    }
// }
