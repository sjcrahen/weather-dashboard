package application.scheduled;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class Cache {

    public static final Map<Integer, Object> SNAPSHOTS = new ConcurrentHashMap<>();
}
