package models

type User struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	username  string `json:"username" gorm:"unique;not null"`
	firstName string `json:"firstname" gorm:"not null"`
	lastName  string `json:"lastname" gorm:"not null"`
	email     string `json:"email" gorm:"not null"`
	password  string `json:"password" gorm:"not null"`
}
