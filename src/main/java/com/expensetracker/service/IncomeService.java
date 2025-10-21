package com.expensetracker.service;

import com.expensetracker.model.Income;
import com.expensetracker.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> getAllIncomes() {
        return incomeRepository.findAll();
    }

    public Optional<Income> getIncomeById(Long id) {
        return incomeRepository.findById(id);
    }

    public Income createIncome(Income income) {
        return incomeRepository.save(income);
    }

    public Income updateIncome(Long id, Income incomeDetails) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Income not found with id: " + id));

        income.setSource(incomeDetails.getSource());
        income.setAmount(incomeDetails.getAmount());
        income.setDate(incomeDetails.getDate());
        income.setCategory(incomeDetails.getCategory());
        income.setDescription(incomeDetails.getDescription());

        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }

    public List<Income> getIncomesByCategory(String category) {
        return incomeRepository.findByCategory(category);
    }

    public List<Income> getIncomesByDateRange(LocalDate startDate, LocalDate endDate) {
        return incomeRepository.findByDateBetween(startDate, endDate);
    }

    public Map<String, BigDecimal> getTotalByCategory() {
        List<Object[]> results = incomeRepository.findTotalByCategory();
        Map<String, BigDecimal> categoryTotals = new HashMap<>();
        for (Object[] result : results) {
            categoryTotals.put((String) result[0], (BigDecimal) result[1]);
        }
        return categoryTotals;
    }

    public Map<LocalDate, BigDecimal> getTotalByDate() {
        List<Object[]> results = incomeRepository.findTotalByDate();
        Map<LocalDate, BigDecimal> dateTotals = new LinkedHashMap<>();
        for (Object[] result : results) {
            dateTotals.put((LocalDate) result[0], (BigDecimal) result[1]);
        }
        return dateTotals;
    }

    public BigDecimal getTotalIncome() {
        BigDecimal total = incomeRepository.findTotalIncome();
        return total != null ? total : BigDecimal.ZERO;
    }

    public BigDecimal getTotalIncomeByDateRange(LocalDate startDate, LocalDate endDate) {
        BigDecimal total = incomeRepository.findTotalIncomeByDateRange(startDate, endDate);
        return total != null ? total : BigDecimal.ZERO;
    }
}
