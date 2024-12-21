package org.example.javaproject1.client;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Client {
    @Id
    @SequenceGenerator(
            name = "client_sequence",
            sequenceName = "client_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "client_sequence"
    )
    private Long id;
    private String name;
    private String email;
    private List<Integer> amount;
    private String comment;
    private LocalDate date;

    public Client() {
    }
    public Client(Long id, String name, String email, List<Integer> amount, String comment, LocalDate date) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.amount = amount;
        this.comment = comment;
        this.date = date;
    }

    public Client(String name, String email, List<Integer> amount, String comment, LocalDate date) {
        this.name = name;
        this.email = email;
        this.amount = amount;
        this.comment = comment;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Integer> getAmount() {
        return amount;
    }

    public void setAmount(List<Integer> amount) {
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
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", amount=" + amount +
                ", comment='" + comment + '\'' +
                ", date=" + date +
                '}';
    }
}
