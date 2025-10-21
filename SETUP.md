# Quick Setup Guide

## Prerequisites Check

Before running the application, ensure you have:

1. ✅ **Java JDK 17 or higher** - You have Java 23 installed
2. ⚠️ **MySQL 8.0+** - Please install if not already installed
3. ✅ **Maven** - Maven wrapper (mvnw.cmd) is included in the project

## Step-by-Step Setup

### 1. Install MySQL (if not installed)

Download and install MySQL from: https://dev.mysql.com/downloads/mysql/

During installation:
- Set root password (default in config is "root")
- Start MySQL service

### 2. Configure Database

The application will automatically create the database `expense_tracker` on first run.

If you want to use different credentials:
1. Open `src/main/resources/application.properties`
2. Update these lines:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 3. Build the Project

```powershell
.\mvnw.cmd clean install
```

### 4. Run the Application

```powershell
.\mvnw.cmd spring-boot:run
```

The application will start on http://localhost:8080

### 5. Access the Application

Open your browser and go to:
```
http://localhost:8080
```

## VS Code Tasks

You can also use VS Code tasks to build and run the application:

1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select:
   - "Build Project" to compile
   - "Run Application" to start the server

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL service is running
- Check username/password in application.properties
- Verify MySQL is running on port 3306

### Port 8080 Already in Use
- Change port in application.properties:
  ```properties
  server.port=8081
  ```
- Update API_BASE_URL in src/main/resources/static/js/app.js

### Java Version Issues
- Ensure JAVA_HOME environment variable is set
- Java 17 or higher is required

## Next Steps

1. Start MySQL server
2. Run the application: `.\mvnw.cmd spring-boot:run`
3. Open http://localhost:8080 in your browser
4. Start tracking your expenses! 💰

## Support

For issues or questions, refer to the main README.md file.
