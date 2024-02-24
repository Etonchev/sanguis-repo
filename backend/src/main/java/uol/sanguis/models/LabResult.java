package uol.sanguis.models;

import uol.sanguis.models.requests.CreateLabResult;

import java.util.Date;
import java.util.List;

public class LabResult extends CreateLabResult {
    private final String id;

    public LabResult(String id, Date date, String laboratory, String physician, String note, List<BloodTest> tests) {
        super(date, laboratory, physician, note, tests);
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "LabResult{" +
                "id='" + id + '\'' +
                '}';
    }
}