package com.expensetracker.repository;

import com.expensetracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByCategory(String category);

    List<Income> findByDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT i.category, SUM(i.amount) FROM Income i GROUP BY i.category")
    List<Object[]> findTotalByCategory();

    @Query("SELECT i.date, SUM(i.amount) FROM Income i GROUP BY i.date ORDER BY i.date")
    List<Object[]> findTotalByDate();

    @Query("SELECT SUM(i.amount) FROM Income i")
    BigDecimal findTotalIncome();

    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.date BETWEEN :startDate AND :endDate")
    BigDecimal findTotalIncomeByDateRange(LocalDate startDate, LocalDate endDate);
}
