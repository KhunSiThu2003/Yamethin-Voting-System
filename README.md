# Yamethin Voting System

A comprehensive voting system for TU Yamethin with user authentication, candidate management, and real-time voting capabilities.

## Features

- **User Authentication**: Student, Teacher, and Other Staff registration and login
- **Profile Management**: Update profile pictures and personal information
- **Change Password**: Secure password change functionality with validation
- **Voting System**: Real-time voting with major and university-level elections
- **Results Display**: Live election results and statistics
- **Admin Dashboard**: Complete administrative control panel
- **Responsive Design**: Mobile-friendly interface with dark/light theme support

## Change Password Feature

Users can change their passwords through the following steps:

1. Click on their profile picture/avatar in the navigation bar
2. Click the "Change Password" button in the user details modal
3. Enter their current password for verification
4. Enter a new password that meets the security requirements:
   - At least 6 characters long
   - Contains uppercase letter
   - Contains lowercase letter
   - Contains number
5. Confirm the new password
6. Submit to update the password

The system validates the current password against the database and updates the password securely.

## Admin Search User Password Feature

Administrators can search for user passwords through the following steps:

1. Navigate to the Admin Dashboard
2. Go to "Manage Users" section
3. Click on "Search User Password" tab
4. Select the user type (Student, Teacher, or Other Staff)
5. Enter the identifier:
   - For Students: Enter Roll Number
   - For Teachers/Other Staff: Enter Registration ID
6. Click "Search" to find the user
7. View the user's password and information
8. Use the "Copy Password" button to copy the password to clipboard
9. Use "New Search" to perform another search

The system displays comprehensive user information including:
- User details (name, roll number/registration ID, major, year, status)
- Password information with show/hide toggle
- Password last updated timestamp
- Copy to clipboard functionality

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
