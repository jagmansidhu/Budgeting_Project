package org.example.javaproject1.transaction;

import jakarta.persistence.*;
import org.example.javaproject1.client.Client;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_sequence")
    @SequenceGenerator(name = "transaction_sequence", sequenceName = "transaction_sequence", allocationSize = 1)
    private Long id;
    private Integer amount;
    private String comment;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    public Transaction() {
    }

    public Transaction(Integer amount, String comment, LocalDate date, Client client) {
        this.amount = amount;
        this.comment = comment;
        this.date = date;
        this.client = client;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    @Override
    public String toString() {
        return "Transaction{" + "id=" + id + ", " +
                "amount=" + amount + ", " +
                "comment=" + comment + ", " +
                "date=" + date + ", " +
                '}';
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
