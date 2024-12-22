package org.example.javaproject1.transaction;

import org.example.javaproject1.client.Client;
import org.example.javaproject1.client.ClientRepository;
import org.example.javaproject1.transaction.Transaction;
import org.example.javaproject1.transaction.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, ClientRepository clientRepository) {
        this.transactionRepository = transactionRepository;
        this.clientRepository = clientRepository;
    }

    @Transactional
    public Transaction addTransaction(Long clientId, Transaction transaction) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Client with id " + clientId + " does not exist"));

        transaction.setClient(client);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByClientId(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Client with id " + clientId + " does not exist"));

        return client.getTransactions();
    }

    // Add more methods if needed, e.g., updateTransaction, deleteTransaction, etc.
}
