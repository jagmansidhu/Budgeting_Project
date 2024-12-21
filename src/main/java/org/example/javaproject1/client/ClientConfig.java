package org.example.javaproject1.client;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static java.time.Month.DECEMBER;

@Configuration
public class ClientConfig {
    List<Integer> amounts = Arrays.asList(100, 200, 300);

    @Bean
    CommandLineRunner commandLineRunner(ClientRepository repository){
        return args -> {
            Client john = new Client(
                    "John",
                    "john@gmail.com",
                   amounts,
                    "no comment",
                    LocalDate.of(2024, DECEMBER, 20)
            );

            Client beanns = new Client(
                    "beanns",
                    "monkey@gmail.com",
                    amounts,
                    "no comment",
                    LocalDate.of(2024, DECEMBER, 22)
            );

            repository.saveAll(
                    List.of(john, beanns)
            );
        };
    }
}
