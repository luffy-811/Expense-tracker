package com.expensetracker.controller;

import com.expensetracker.service.ExpenseService;
import com.expensetracker.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/financial-summary")
@CrossOrigin(origins = "*")
public class FinancialSummaryController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getFinancialSummary() {
        Map<String, Object> summary = new HashMap<>();

        BigDecimal totalIncome = incomeService.getTotalIncome();
        BigDecimal totalExpenses = calculateTotalExpenses();
        BigDecimal balance = totalIncome.subtract(totalExpenses);

        summary.put("totalIncome", totalIncome);
        summary.put("totalExpenses", totalExpenses);
        summary.put("balance", balance);
        summary.put("incomeCount", incomeService.getAllIncomes().size());
        summary.put("expenseCount", expenseService.getAllExpenses().size());

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/date-range")
    public ResponseEntity<Map<String, Object>> getFinancialSummaryByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<String, Object> summary = new HashMap<>();

        BigDecimal totalIncome = incomeService.getTotalIncomeByDateRange(startDate, endDate);
        BigDecimal totalExpenses = calculateTotalExpensesByDateRange(startDate, endDate);
        BigDecimal balance = totalIncome.subtract(totalExpenses);

        summary.put("totalIncome", totalIncome);
        summary.put("totalExpenses", totalExpenses);
        summary.put("balance", balance);
        summary.put("startDate", startDate);
        summary.put("endDate", endDate);

        return ResponseEntity.ok(summary);
    }

    private BigDecimal calculateTotalExpenses() {
        return expenseService.getAllExpenses().stream()
                .map(expense -> expense.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseService.getExpensesByDateRange(startDate, endDate).stream()
                .map(expense -> expense.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
