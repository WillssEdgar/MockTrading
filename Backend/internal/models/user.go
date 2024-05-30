package models

type User struct {
	FirstName string    `json:"firstname" gorm:"not null"`
	LastName  string    `json:"lastname" gorm:"not null"`
	Username  string    `json:"username" gorm:"unique;not null"`
	Email     string    `json:"email" gorm:"unique;primaryKey"`
	Password  string    `json:"password" gorm:"not null"`
	Portfolio Portfolio `json:"portfolio" gorm:"foreignKey:UserEmail;references:Email"`
}
