package com.example.springdemo.controller;

import com.example.springdemo.dto.ServiceDTO;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.services.CompanyService;
import com.example.springdemo.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/service")
public class ServiceController {

    private final ServiceService sservice;
    private final CompanyService companyService;

    @Autowired
    public ServiceController(ServiceService ss, CompanyService cs){
        this.sservice = ss;
        this.companyService = cs;
    }

    @GetMapping()
    public Set<ServiceDTO> findAll(){
        return sservice.findAll();
    }

    @PostMapping()
    public Integer insert(@RequestBody ServiceDTO service){

        return sservice.insert(service);
    }

    @PutMapping()
    public Service update(@RequestBody ServiceDTO service) {
        return sservice.update(service);
    }

    @DeleteMapping()
    public void delete(@RequestBody ServiceDTO service){
        sservice.delete(service);
    }

    @GetMapping(value = "/{id}")
    public Service findById(@PathVariable("id") Integer id){
        return sservice.findServiceById(id);
    }

    @GetMapping(value = "/freelancerServices")
    public Set<ServiceDTO> getServicesByFreelancer(@RequestBody Freelancer f){
        return sservice.getServicesByFreelancer(f);
    }

    @GetMapping(value = "/companyServices/{id}")
    public Set<ServiceDTO> getServicesByCompany(@PathVariable("id") Integer id){
        Company c = this.companyService.findCompanyById(id);
        return sservice.getServicesByCompany(c);
    }

    @GetMapping(value = "/ascendingPrice")
    public Set<ServiceDTO> getServicesPriceAscending(){
        return sservice.getByPriceAscending();
    }

    @GetMapping(value = "/ascendingDuration")
    public Set<ServiceDTO> getServicesDurationAscending(){
        return sservice.getByDurationAscending();
    }
}
