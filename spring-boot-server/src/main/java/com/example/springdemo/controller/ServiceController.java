package com.example.springdemo.controller;

import com.example.springdemo.dto.ServiceDTO;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/service")
public class ServiceController {

    private final ServiceService sservice;

    @Autowired
    public ServiceController(ServiceService ss){ this.sservice = ss;}

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

    @GetMapping(value = "/freelancerServices/{id}")
    public Set<ServiceDTO> getServicesByFreelancer(@PathVariable("id") Integer id){
        return sservice.getServicesByFreelancer(id);
    }

    @GetMapping(value = "/companyServices")
    public Set<ServiceDTO> getServicesByCompany(@RequestBody Company c){
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
