package uol.sanguis.models;

import java.util.Date;
import java.util.List;

public class LabResult {
    private final String id;
    private final Date date;
    private final String laboratory;
    private final String physician;
    private final String note;
    private final List<BloodTest> tests;

    public LabResult(String id, Date date, String laboratory, String physician, String note,
                     List<BloodTest> tests) {
        this.id = id;
        this.date = date;
        this.laboratory = laboratory;
        this.physician = physician;
        this.note = note;
        this.tests = tests;
    }

    public String getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public String getLaboratory() {
        return laboratory;
    }

    public String getPhysician() {
        return physician;
    }

    public String getNote() {
        return note;
    }

    public List<BloodTest> getTests() {
        return tests;
    }

    @Override
    public String toString() {
        return "LabResult{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", laboratory='" + laboratory + '\'' +
                ", physician='" + physician + '\'' +
                ", note='" + note + '\'' +
                ", bloodTests=" + tests +
                '}';
    }
}