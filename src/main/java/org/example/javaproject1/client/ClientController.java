package org.example.javaproject1.client;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    //Gets all Clients
    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    //Get data for certain client by Id
    @GetMapping(path = "/get/{clientId}")
    public void getClient(@PathVariable("clientId") Long clientId) {
        clientService.getClient(clientId);
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

    // Deletes one item from list
    @DeleteMapping(path = "/del-amount/{clientId}/{amount}")
    public void deleteAmount(@PathVariable("clientId") Long clientId, @PathVariable("amount") Integer amount) {
        clientService.deleteAmount(clientId, amount);
    }

    //Changes Client information name or email
    @PutMapping(path = "{clientId}")
    public void updateClient(@PathVariable("clientId") Long clientId,
                             @RequestParam(required = false) String name,
                            @RequestParam(required = false) String email)
            {
        clientService.updateClient(clientId, name,email);
    }

    // Add another amount to list for certain client
   @PutMapping(path = "/add-amount/{clientId}/{amount}")
   public void updateAmount(
           @PathVariable("clientId") Long clientId,
          @PathVariable("amount") Integer amount)
    {
        clientService.addAmount(clientId, amount);

    }
}
