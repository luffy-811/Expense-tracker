# Expense Tracker API Documentation

## Base URL

```
http://localhost:8080/api/expenses
```

## Endpoints

### 1. Get All Expenses

**GET** `/api/expenses`

Returns a list of all expenses.

**Response:**
```json
[
  {
    "id": 1,
    "description": "Groceries",
    "amount": 45.50,
    "date": "2025-10-05",
    "category": "Food",
    "createdAt": "2025-10-05",
    "updatedAt": "2025-10-05"
  }
]
```

### 2. Get Expense by ID
**GET** `/api/expenses/{id}`

Returns a single expense by ID.

**Parameters:**
- `id` (path parameter) - The expense ID

**Response:**
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

**Error Response (404):**
```json
{
  "error": "Not Found"
}
```

### 3. Create Expense
**POST** `/api/expenses`

Creates a new expense.

**Request Body:**
```json
{
  "description": "Groceries",
  "amount": 45.50,
  "date": "2025-10-05",
  "category": "Food"
}
```

**Validation Rules:**
- `description`: Required, not blank
- `amount`: Required, must be positive
- `date`: Required, valid date format (YYYY-MM-DD)
- `category`: Required, not blank

**Response (201 Created):**
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

**Error Response (400):**
```json
{
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be positive"
    }
  ]
}
```

### 4. Update Expense
**PUT** `/api/expenses/{id}`

Updates an existing expense.

**Parameters:**
- `id` (path parameter) - The expense ID

**Request Body:**
```json
{
  "description": "Updated Groceries",
  "amount": 50.00,
  "date": "2025-10-05",
  "category": "Food"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "description": "Updated Groceries",
  "amount": 50.00,
  "date": "2025-10-05",
  "category": "Food",
  "createdAt": "2025-10-05",
  "updatedAt": "2025-10-06"
}
```

**Error Response (404):**
```json
{
  "error": "Expense not found"
}
```

### 5. Delete Expense
**DELETE** `/api/expenses/{id}`

Deletes an expense by ID.

**Parameters:**
- `id` (path parameter) - The expense ID

**Response (200 OK):**
```json
{
  "message": "Expense deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Expense not found"
}
```

### 6. Get Expenses by Category
**GET** `/api/expenses/category/{category}`

Returns all expenses for a specific category.

**Parameters:**
- `category` (path parameter) - The category name

**Response:**
```json
[
  {
    "id": 1,
    "description": "Groceries",
    "amount": 45.50,
    "date": "2025-10-05",
    "category": "Food",
    "createdAt": "2025-10-05",
    "updatedAt": "2025-10-05"
  }
]
```

### 7. Get Expenses by Date Range
**GET** `/api/expenses/date-range?startDate={start}&endDate={end}`

Returns expenses within a date range.

**Query Parameters:**
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)

**Example:**
```
GET /api/expenses/date-range?startDate=2025-10-01&endDate=2025-10-31
```

**Response:**
```json
[
  {
    "id": 1,
    "description": "Groceries",
    "amount": 45.50,
    "date": "2025-10-05",
    "category": "Food",
    "createdAt": "2025-10-05",
    "updatedAt": "2025-10-05"
  }
]
```

### 8. Get Analytics by Category
**GET** `/api/expenses/analytics/by-category`

Returns total expenses grouped by category.

**Response:**
```json
[
  ["Food", 145.50],
  ["Transportation", 90.00],
  ["Utilities", 89.99]
]
```

### 9. Get Analytics by Date
**GET** `/api/expenses/analytics/by-date`

Returns total expenses grouped by date.

**Response:**
```json
[
  ["2025-10-01", 125.50],
  ["2025-10-02", 45.00],
  ["2025-10-03", 89.99]
]
```

## Categories

The following categories are supported:
- Food
- Transportation
- Utilities
- Entertainment
- Healthcare
- Shopping
- Education
- Other

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

## Testing with cURL

### Create an expense:
```bash
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Test Expense",
    "amount": 25.00,
    "date": "2025-10-05",
    "category": "Other"
  }'
```

### Get all expenses:
```bash
curl http://localhost:8080/api/expenses
```

### Update an expense:
```bash
curl -X PUT http://localhost:8080/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated Test",
    "amount": 30.00,
    "date": "2025-10-05",
    "category": "Other"
  }'
```

### Delete an expense:
```bash
curl -X DELETE http://localhost:8080/api/expenses/1
```

## Testing with PowerShell

### Create an expense:
```powershell
$body = @{
    description = "Test Expense"
    amount = 25.00
    date = "2025-10-05"
    category = "Other"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/expenses" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Get all expenses:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/expenses" -Method Get
```

## CORS Configuration

The API is configured to accept requests from any origin (`*`). In production, you should restrict this to specific domains by modifying the `WebConfig.java` file.
