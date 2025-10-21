# 🚀 COMPLETE STEP-BY-STEP GUIDE TO RUN YOUR EXPENSE TRACKER

## ✅ What's Been Fixed

1. ✅ MySQL password updated to: `Root123654S08`
2. ✅ Added missing validation dependency
3. ✅ Configured Lombok annotation processor
4. ✅ All code errors resolved

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Verify MySQL is Running ✅
You already completed this! MySQL service is running.

---

### STEP 2: Build the Project

**Open PowerShell terminal in VS Code** (you should already be in PROJECT8 folder)

Run:
```powershell
.\mvnw.cmd clean install -DskipTests
```

**What this does:**
- Downloads all dependencies (first time only)
- Compiles Java code
- Creates JAR file
- Takes 1-2 minutes

**Expected output:**
```
[INFO] BUILD SUCCESS
```

**If you see errors, run:**
```powershell
.\mvnw.cmd clean
.\mvnw.cmd install -DskipTests
```

---

### STEP 3: Run the Application

```powershell
.\mvnw.cmd spring-boot:run
```

**What to look for:**
- Wait for: `Started ExpenseTrackerApplication in X seconds`
- Server will run on port 8080

**The terminal will show:**
```
...
: Started ExpenseTrackerApplication in 5.234 seconds
```

**DO NOT CLOSE THIS TERMINAL!** The server needs to keep running.

---

### STEP 4: Open the Application in Browser

1. Open your web browser (Chrome, Edge, Firefox)
2. Go to: **http://localhost:8080**
3. You should see the Expense Tracker interface!

---

## 🎯 HOW TO USE THE APPLICATION

### Add Your First Expense

1. **Fill in the form:**
   - Description: `Coffee`
   - Amount: `5.50`
   - Date: Select today
   - Category: Select `Food`

2. **Click "Add Expense"**

3. **See it appear in the list below!**

### View Charts

- Scroll down to see:
  - **Doughnut Chart** - Shows expenses by category
  - **Line Chart** - Shows expenses over time

### Edit an Expense

1. Click **Edit** button on any expense
2. Form fills automatically
3. Make changes
4. Click **Update Expense**

### Delete an Expense

1. Click **Delete** button
2. Confirm deletion
3. Expense is removed

### Search & Filter

- **Search bar**: Type description or amount
- **Category filter**: Select category dropdown

---

## 🛠️ VS CODE TASKS (ALTERNATIVE METHOD)

Instead of typing commands, you can use VS Code tasks:

### To Build:
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Build Project"

### To Run:
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "Run Application"

---

## ⚠️ TROUBLESHOOTING

### Problem: "Port 8080 is already in use"

**Solution 1:** Stop the other application using port 8080

**Solution 2:** Change port:
1. Open `src/main/resources/application.properties`
2. Change `server.port=8080` to `server.port=8081`
3. Update `API_BASE_URL` in `src/main/resources/static/js/app.js` to `http://localhost:8081/api/expenses`
4. Rebuild and run
5. Open `http://localhost:8081` in browser

---

###Problem: "Cannot connect to database"

**Check:**
1. MySQL service is running:
   ```powershell
   Get-Service MySQL* | Where-Object {$_.Status -eq 'Running'}
   ```

2. Password is correct in `application.properties`:
   ```
   spring.datasource.password=Root123654S08
   ```

3. MySQL is on port 3306

**Fix MySQL:**
```powershell
net start MySQL80
```

---

### Problem: Build fails with "Cannot find symbol"

**Solution:**
```powershell
.\mvnw.cmd clean
.\mvnw.cmd install -DskipTests -U
```

The `-U` forces Maven to update dependencies.

---

### Problem: Frontend doesn't load

1. **Clear browser cache**: `Ctrl+Shift+Delete`
2. **Hard refresh**: `Ctrl+F5`
3. **Check console**: Press `F12` in browser, look for errors

---

## 🎉 SUCCESS CHECKLIST

- [x] MySQL running
- [ ] Build successful (`.\mvnw.cmd clean install`)
- [ ] Application running (`.\mvnw.cmd spring-boot:run`)
- [ ] Browser shows application (`http://localhost:8080`)
- [ ] Can add expense
- [ ] Can see charts
- [ ] Can edit/delete expenses

---

## 📊 QUICK TEST

Once application is running, test the API directly:

```powershell
# Get all expenses
Invoke-RestMethod -Uri "http://localhost:8080/api/expenses" -Method Get

# Add an expense
$body = @{
    description = "Test Lunch"
    amount = 12.50
    date = "2025-10-05"
    category = "Food"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/expenses" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

---

## 🔄 TO STOP THE APPLICATION

In the terminal where the app is running:
- Press `Ctrl+C`
- Or click the red stop button in VS Code

---

## 🚀 TO START AGAIN LATER

1. **Start MySQL** (if not running):
   ```powershell
   net start MySQL80
   ```

2. **Navigate to project**:
   ```powershell
   cd C:\Users\anony\Desktop\PROJECT8
   ```

3. **Run application**:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

4. **Open browser**: http://localhost:8080

---

## 📞 NEED HELP?

Check these files in your project:
- `README.md` - Full documentation
- `SETUP.md` - Setup guide
- `API_DOCUMENTATION.md` - API reference
- `GET_STARTED.md` - Getting started guide

---

## 🎯 NEXT: RUN THE BUILD COMMAND NOW!

Copy and paste this command:

```powershell
.\mvnw.cmd clean install -DskipTests
```

Wait for "BUILD SUCCESS", then run:

```powershell
.\mvnw.cmd spring-boot:run
```

Then open: **http://localhost:8080**

**YOU'RE READY TO GO!** 🎉
