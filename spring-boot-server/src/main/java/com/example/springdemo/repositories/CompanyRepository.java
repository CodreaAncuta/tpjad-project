package com.example.springdemo.repositories;

import com.example.springdemo.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    @Query(value = "SELECT s " +
            "FROM Company s " +
            "ORDER BY s.id")
    Set<Company> getAllOrdered();

    @Query(value = "SELECT s " +
            "FROM Company s WHERE s.name=?1" +
            "ORDER BY s.id")
    Set<Company> getByName(String name);

    @Query(value = "SELECT s " +
            "FROM Company s WHERE s.id=?1 ")
    Company getById(Integer id);
}
