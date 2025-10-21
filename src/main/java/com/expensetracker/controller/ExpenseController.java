package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) {
        Expense createdExpense = expenseService.createExpense(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        try {
            Expense updatedExpense = expenseService.updateExpense(id, expense);
            return ResponseEntity.ok(updatedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteExpense(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Expense deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String category) {
        List<Expense> expenses = expenseService.getExpensesByCategory(category);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Expense>> getExpensesByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<Expense> expenses = expenseService.getExpensesByDateRange(start, end);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/analytics/by-category")
    public ResponseEntity<List<Object[]>> getTotalByCategory() {
        List<Object[]> data = expenseService.getTotalByCategory();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/analytics/by-date")
    public ResponseEntity<List<Object[]>> getTotalByDate() {
        List<Object[]> data = expenseService.getTotalByDate();
        return ResponseEntity.ok(data);
    }
}
