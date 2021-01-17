package com.example.springdemo.services;

import com.example.springdemo.dto.CompanyDTO;
import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.dto.builders.CompanyBuilder;
import com.example.springdemo.dto.builders.FreelancerBuilder;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository cr){
        companyRepository = cr;
    }

    public Company findCompanyById(Integer id){
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (!companyOptional.isPresent()) {
            throw new ResourceNotFoundException("Company", "user id", id);
        }
        return companyOptional.get();
    }

    public Set<CompanyDTO> findAll(){
        Set<Company> companies = companyRepository.getAllOrdered();

        return companies.stream()
                .map(CompanyBuilder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(CompanyDTO cDTO) {

        return companyRepository
                .save(CompanyBuilder.generateEntityInsertFromDTO(cDTO))
                .getId();
    }

    public Company update(CompanyDTO cDTO) {

        Optional<Company> companyOptional = companyRepository.findById(cDTO.getId());
        if(!companyOptional.isPresent()){
            throw new ResourceNotFoundException("Company", "user id", cDTO.getId());

        }
        return companyRepository.save(CompanyBuilder.generateEntityFromDTO(cDTO));
    }

    public void delete(CompanyDTO fDTO){
        this.companyRepository.deleteById(fDTO.getId());
    }
}
