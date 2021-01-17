package com.example.springdemo.controller;

import com.example.springdemo.dto.CompanyDTO;
import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/company")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping()
    public Set<CompanyDTO> findAll(){
        return companyService.findAll();
    }

    @PostMapping()
    public Integer insert(@RequestBody CompanyDTO c){
        return companyService.insert(c);
    }

    @PutMapping()
    public Company update(@RequestBody CompanyDTO c) {
        return companyService.update(c);
    }

    @DeleteMapping()
    public void delete(@RequestBody CompanyDTO c){
        companyService.delete(c);
    }

    @GetMapping(value = "/{id}")
    public Company findById(@PathVariable("id") Integer id){
        return companyService.findCompanyById(id);
    }
}
