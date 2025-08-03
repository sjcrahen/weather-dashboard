package application.station;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "stations")
public class StationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String slug;

//    @ManyToMany
//    @JoinTable(name = "station_datasource", joinColumns = @JoinColumn(name = "station_id"), inverseJoinColumns = @JoinColumn(name = "datasource_id"))
//    @OrderColumn(name = "datasource_display_order")
//    private List<DataSourceEntity> dataSources;

    private String city;

    private String state;

    private double latitude;

    private double longitude;

    private String timezone;
}
