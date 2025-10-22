# Expense Tracker Application

A comprehensive web-based expense tracker application with Spring Boot backend, MySQL database, and modern HTML/CSS/JavaScript frontend with Chart.js visualization.

## Features

### 💰 Expense Management

- Add new expenses with description, amount, date, and category
- View all expenses in an organized list
- Edit existing expenses
- Delete expenses with confirmation
- Search and filter expenses by category

### 📊 Data Visualization

- **Category Chart**: Doughnut chart showing expense distribution by category
- **Timeline Chart**: Line chart displaying spending patterns over time
- Real-time updates when expenses are added, edited, or deleted

### 🎨 User Interface

- Clean and intuitive design
- Responsive layout for desktop and mobile devices
- Real-time search and filtering
- Dynamic form validation
- Success/error notifications

### 🔧 Backend Features

- RESTful API with Spring Boot
- JPA/Hibernate for database operations
- MySQL database integration
- CORS configuration for frontend-backend communication
- Data validation and error handling

## Technologies Used

### Frontend

- HTML5
- CSS3 (with modern CSS Grid and Flexbox)
- JavaScript (ES6+)
- Chart.js 4.4.0

### Backend

- Java 17
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL Connector
- Lombok
- Maven

### Database

- MySQL 8.0+

## Prerequisites

Before running this application, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**

   - Download from: <https://www.oracle.com/java/technologies/downloads/>

2. **Maven 3.6+**
   - Download from: <https://maven.apache.org/download.cgi>

3. **MySQL 8.0+**
   - Download from: <https://dev.mysql.com/downloads/mysql/>

4. **IDE (Optional but recommended)**
   - IntelliJ IDEA, Eclipse, or VS Code with Java extensions

## Setup Instructions

### 1. Database Setup

1. Start MySQL server
2. Create a database (or let the application create it automatically):

   ```sql
   CREATE DATABASE expense_tracker;
   ```

3. Update database credentials in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Build the Application

Navigate to the project directory and run:

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

Or run the JAR file:

```bash
java -jar target/expense-tracker-1.0.0.jar
```

The application will start on `http://localhost:8080`

### 4. Access the Application

Open your web browser and navigate to:

``
http://localhost:8080
``

## API Endpoints

### Expense Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/category/{category}` | Get expenses by category |
| GET | `/api/expenses/date-range?startDate={start}&endDate={end}` | Get expenses by date range |
| GET | `/api/expenses/analytics/by-category` | Get totals grouped by category |
| GET | `/api/expenses/analytics/by-date` | Get totals grouped by date |

### Request/Response Examples

#### Create Expense

```json
POST /api/expenses
{
  "description": "Groceries",
  "amount": 45.50,
  "date": "2025-10-05",
  "category": "Food"
}
```

#### Response

```json
{
  "id": 1,
  "description": "Groceries",
  "amount": 45.50,
  "date": "2025-10-05",
  "category": "Food",
  "createdAt": "2025-10-05",
  "updatedAt": "2025-10-05"
}
```

## Project Structure

``

PROJECT8/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/expensetracker/
│   │   │       ├── ExpenseTrackerApplication.java
│   │   │       ├── config/
│   │   │       │   └── WebConfig.java
│   │   │       ├── controller/
│   │   │       │   └── ExpenseController.java
│   │   │       ├── model/
│   │   │       │   └── Expense.java
│   │   │       ├── repository/
│   │   │       │   └── ExpenseRepository.java
│   │   │       └── service/
│   │   │           └── ExpenseService.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   ├── js/
│   │       │   │   └── app.js
│   │       │   └── index.html
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md

``

## Categories

The application supports the following expense categories:

- 🍔 Food
- 🚗 Transportation
- 💡 Utilities
- 🎬 Entertainment
- 🏥 Healthcare
- 🛍️ Shopping
- 📚 Education
- 📦 Other

## Configuration

### Application Properties

Key configurations in `application.properties`:

```properties
# Server port
server.port=8080

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=root

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Database Schema

The application automatically creates the following table structure:

```sql
CREATE TABLE expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE
);
```

## Development

### Adding New Categories

To add new categories:

1. Update the category dropdown in `index.html`:

```html
<option value="NewCategory">New Category</option>
```

2.Add corresponding CSS styling in `style.css`:

```css
.category-NewCategory { background: #hexcolor; }
```

### Customizing the UI

- Colors and theme variables are defined in `:root` in `style.css`
- Chart colors can be modified in the `renderCategoryChart()` function in `app.js`

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Verify credentials in `application.properties`
   - Check if the database exists

2. **Port Already in Use**
   - Change the port in `application.properties`
   - Kill the process using port 8080

3. **Frontend Not Loading**
   - Clear browser cache
   - Check browser console for errors
   - Verify API_BASE_URL in `app.js`

4. **Charts Not Displaying**
   - Ensure Chart.js CDN is accessible
   - Check if there's expense data available

## Future Enhancements

- User authentication and authorization
- Export expenses to CSV/PDF
- Budget planning and alerts
- Recurring expenses
- Multiple currency support
- Dark mode
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue in the repository.

---

## Happy Expense Tracking! 💰📊
