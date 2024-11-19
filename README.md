# Article Management System

## 📝 Project Overview

The Article Management System is a web application designed to efficiently manage product information. It provides a user-friendly interface for adding, editing, and deleting product details with robust input validation and local storage persistence.

## ✨ Features

- Add new product entries
- Edit existing product information
- Delete product entries
- Responsive table view of products
- Form validation for data integrity
- Local storage for data persistence
- User-friendly modal interfaces

## 🚀 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome (for icons)

## 🔧 Project Structure

```
article-management-system/
│
├── index.html         # Main HTML file
├── script.js          # Primary JavaScript logic
├── style.js           # Styling and UI interaction scripts
├── validation.js      # Form validation logic
└── style.css          # Cascading Style Sheets
```

## 📋 Usage

### Adding a Product

1. Fill out the form fields:

   - Name
   - Brand (Marque)
   - Price
   - Production Date
   - Product Type
   - Promotion Status

2. Click "Submit" to add the product

### Editing a Product

1. Click the "modify" button next to the product in the table
2. Update the desired fields
3. Click "Update"

### Deleting a Product

1. Click the "Delete" button next to the product
2. Confirm deletion in the modal

## 🌟 Validation Rules

- Name: Must contain only letters, spaces, hyphens, or apostrophes
- Brand: Must contain only letters, spaces, hyphens, or apostrophes
- Price: Must be a numeric value
- Production Date: Must be before the current date
- Product Type: Must be selected from the dropdown
- Promotion: Must select either "Yes" or "No"

## 💾 Data Persistence

Products are stored in the browser's local storage, allowing data to persist between page refreshes.

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop
- Tablet
- Mobile devices

**Note:** This project is a demonstration of a simple Article Management System using vanilla JavaScript.
