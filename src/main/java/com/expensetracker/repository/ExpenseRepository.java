package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    
    List<Expense> findByCategory(String category);
    
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> findTotalByCategory();
    
    @Query("SELECT e.date, SUM(e.amount) FROM Expense e GROUP BY e.date ORDER BY e.date")
    List<Object[]> findTotalByDate();
}
