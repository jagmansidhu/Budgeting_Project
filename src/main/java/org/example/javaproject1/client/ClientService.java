package org.example.javaproject1.client;

import jakarta.transaction.Transactional;
import org.example.javaproject1.transaction.TransactionRepository;
import org.example.javaproject1.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.javaproject1.transaction.Transaction;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, TransactionRepository transactionRepository) {
        this.clientRepository = clientRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Client getClient(Long clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(()
                        -> new IllegalStateException("Client with id " + clientId + " does not exist"));
    }


    public void addNewClient(Client client) {
        Optional<Client> clientOptional = clientRepository.findClientByEmail(client.getEmail());
        if (clientOptional.isPresent()) {
            throw new IllegalArgumentException("Client with email " + client.getEmail() + " already exists");
        }
        clientRepository.save(client);
    }

    public void deleteClient(Long clientId) {
        boolean exists = clientRepository.existsById(clientId);
        if (!exists) {
            throw new IllegalArgumentException("Client with id " + clientId + " does not exist");
        }
        clientRepository.deleteById(clientId);
    }

    public List<Transaction> getClientTransactions(Long clientId)
    { Client client = getClient(clientId); return client.getTransactions();}

    @Transactional
    public void updateClient(Long clientId, String name, String email) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + clientId + " does not exist"));

        if (name != null && !name.isEmpty() && !Objects.equals(client.getName(), name)) {
            client.setName(name);
        }

        if (email != null && !email.isEmpty() && !Objects.equals(client.getEmail(), email)) {
            Optional<Client> clientOptional = clientRepository.findClientByEmail(email);
            if (clientOptional.isPresent()) {
                throw new IllegalArgumentException("Client with email " + email + " already exists");
            }
            client.setEmail(email);
        }
    }

}
