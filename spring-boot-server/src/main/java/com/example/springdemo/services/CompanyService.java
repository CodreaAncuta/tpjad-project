package com.example.springdemo.services;

import com.example.springdemo.dto.CompanyDTO;
import com.example.springdemo.dto.builders.CompanyBuilder;
import com.example.springdemo.entities.Company;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.CompanyRepository;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final ServiceRepository serviceRepository;

    private static CompanyBuilder builder;

    @Autowired
    public CompanyService(CompanyRepository cr, ServiceRepository sr) {

        companyRepository = cr;
        serviceRepository = sr;
        this.builder = new CompanyBuilder(serviceRepository);
    }

    public Company findCompanyById(Integer id) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (!companyOptional.isPresent()) {
            throw new ResourceNotFoundException("Company", "user id", id);
        }
        return companyOptional.get();
    }

    public Set<CompanyDTO> findAll() {
        Set<Company> companies = companyRepository.getAllOrdered();

        return companies.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(CompanyDTO cDTO) {

        return companyRepository
                .save(builder.generateEntityInsertFromDTO(cDTO))
                .getId();
    }

    public Company update(CompanyDTO cDTO) {

        Optional<Company> companyOptional = companyRepository.findById(cDTO.getId());
        if (!companyOptional.isPresent()) {
            throw new ResourceNotFoundException("Company", "user id", cDTO.getId());

        }
        return companyRepository.save(builder.generateEntityFromDTO(cDTO));
    }

    public void delete(Integer id) {
        this.companyRepository.deleteById(id);
    }
}
