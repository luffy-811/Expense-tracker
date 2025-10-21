package com.expensetracker.controller;

import com.expensetracker.model.Income;
import com.expensetracker.service.IncomeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "*")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public ResponseEntity<List<Income>> getAllIncomes() {
        return ResponseEntity.ok(incomeService.getAllIncomes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncomeById(@PathVariable Long id) {
        return incomeService.getIncomeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Income> createIncome(@Valid @RequestBody Income income) {
        Income createdIncome = incomeService.createIncome(income);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIncome);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable Long id, @Valid @RequestBody Income income) {
        try {
            Income updatedIncome = incomeService.updateIncome(id, income);
            return ResponseEntity.ok(updatedIncome);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Income>> getIncomesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(incomeService.getIncomesByCategory(category));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Income>> getIncomesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(incomeService.getIncomesByDateRange(startDate, endDate));
    }

    @GetMapping("/analytics/by-category")
    public ResponseEntity<Map<String, BigDecimal>> getAnalyticsByCategory() {
        return ResponseEntity.ok(incomeService.getTotalByCategory());
    }

    @GetMapping("/analytics/by-date")
    public ResponseEntity<Map<LocalDate, BigDecimal>> getAnalyticsByDate() {
        return ResponseEntity.ok(incomeService.getTotalByDate());
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalIncome() {
        return ResponseEntity.ok(incomeService.getTotalIncome());
    }

    @GetMapping("/total/date-range")
    public ResponseEntity<BigDecimal> getTotalIncomeByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(incomeService.getTotalIncomeByDateRange(startDate, endDate));
    }
}
