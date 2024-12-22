package org.example.javaproject1.client;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.javaproject1.transaction.Transaction;

import java.util.List;

@RestController
@RequestMapping( "/api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    //Using to see if react connected with backend
    @GetMapping("/ping")
    public String ping() {
        return "Backend is running!";
    }

    //Gets all Clients
    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    @GetMapping("/{clientId}/transactions")
    public List<Transaction> getClientTransactions(@PathVariable Long clientId)
    { return clientService.getClientTransactions(clientId); }
    //Get data for certain client by Id
    @GetMapping(path = "/get/{clientId}")
    public Client getClient(@PathVariable("clientId") Long clientId) {
        return clientService.getClient(clientId);
    }

    // Adds new client to db
    @PostMapping
    public void registerClient(@RequestBody Client client) {
        clientService.addNewClient(client);
    }

    //Deletes Client from db
    @DeleteMapping(path = "{clientId}")
    public void deleteClient(@PathVariable("clientId") Long clientId) {
        clientService.deleteClient(clientId);
    }


    //Changes Client information name or email
    @PutMapping(path = "{clientId}")
    public void updateClient(@PathVariable("clientId") Long clientId,
                             @RequestParam(required = false) String name,
                            @RequestParam(required = false) String email)
            {
        clientService.updateClient(clientId, name,email);
    }



}
