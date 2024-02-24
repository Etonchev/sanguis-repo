package uol.sanguis.models;

import java.util.List;
import java.util.Objects;

public final class QueryResult<T> {
    private final List<T> items;
    private final int total;
    private final int offset;
    private final int limit;

    public QueryResult(List<T> items, int total, int offset, int limit) {
        this.items = items;
        this.total = total;
        this.offset = offset;
        this.limit = limit;
    }

    public List<T> getItems() {
        return items;
    }

    public int getTotal() {
        return total;
    }

    public int getOffset() {
        return offset;
    }

    public int getLimit() {
        return limit;
    }
}