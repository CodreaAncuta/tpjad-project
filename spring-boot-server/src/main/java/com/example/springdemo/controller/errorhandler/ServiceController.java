package com.example.springdemo.controller.errorhandler;

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
    public Set<Service> findAll(){
        return sservice.findAll();
    }

    @PostMapping()
    public Integer insertService(@RequestBody Service service){
        return sservice.insert(service);
    }

    @PutMapping()
    public Service updateService(@RequestBody Service service) {
        return sservice.update(service);
    }

    @DeleteMapping()
    public void delete(@RequestBody Service service){
        sservice.delete(service);
    }

    @GetMapping(value = "/{id}")
    public Service findById(@PathVariable("id") Integer id){
        return sservice.findServiceById(id);
    }

    @GetMapping(value = "/freelancerServices")
    public Set<Service> getServicesByFreelancer(@RequestBody Freelancer f){
        return sservice.getServicesByFreelancer(f);
    }

    @GetMapping(value = "/companyServices")
    public Set<Service> getServicesByCompany(@RequestBody Company c){
        return sservice.getServicesByCompany(c);
    }

    @GetMapping(value = "/ascendingPrice")
    public Set<Service> getServicesPriceAscending(){
        return sservice.getByPriceAscending();
    }

    @GetMapping(value = "/ascendingDuration")
    public Set<Service> getServicesDurationAscending(){
        return sservice.getByDurationAscending();
    }
}
