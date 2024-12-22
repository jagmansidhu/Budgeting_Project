package org.example.javaproject1.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/client/{clientId}")
    public Transaction addTransaction(@PathVariable Long clientId, @RequestBody Transaction transaction) {
        return transactionService.addTransaction(clientId, transaction);
    }

    @GetMapping("/client/{clientId}")
    public List<Transaction> getTransactionsByClientId(@PathVariable Long clientId) {
        return transactionService.getTransactionsByClientId(clientId);
    }

    // Additional endpoints if needed, e.g., updateTransaction, deleteTransaction, etc.
}
