package org.example.javaproject1.client;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static java.time.Month.*;

@Configuration
public class ClientConfig {

    @Bean
    CommandLineRunner commandLineRunner(ClientRepository repository){
        return args -> {
            Client john = new Client(
                    "John",
                    "john@gmail.com",
                    200,
                    "no comment",
                    LocalDate.of(2024, DECEMBER, 20)
            );

            Client beanns = new Client(
                    "beanns",
                    "monkey@gmail.com",
                    200,
                    "no comment",
                    LocalDate.of(2024, DECEMBER, 22)
            );

            repository.saveAll(
                    List.of(john, beanns)
            );
        };
    }
}
