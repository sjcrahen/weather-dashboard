package application.datasource;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "datasource")
public class DataSourceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String sourceIdentifier;

    @Enumerated(EnumType.STRING)
    private DataSourceType type;

}
