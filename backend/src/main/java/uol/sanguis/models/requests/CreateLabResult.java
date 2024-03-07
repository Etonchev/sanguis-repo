package uol.sanguis.models.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import uol.sanguis.models.BloodTest;

import java.util.Date;
import java.util.List;

public class CreateLabResult {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final Date date;
    private final String laboratory;
    private final String physician;
    private final String note;
    private final List<BloodTest> tests;

    @JsonCreator
    public CreateLabResult(@JsonProperty("date") Date date,
                           @JsonProperty("laboratory") String laboratory,
                           @JsonProperty("physician") String physician,
                           @JsonProperty("note") String note,
                           @JsonProperty("tests") List<BloodTest> tests) {
        this.date = date;
        this.laboratory = laboratory;
        this.physician = physician;
        this.note = note;
        this.tests = tests;
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
        return "LabResultResponse{" +
                "date=" + date +
                ", laboratory='" + laboratory + '\'' +
                ", physician='" + physician + '\'' +
                ", note='" + note + '\'' +
                ", tests=" + tests +
                '}';
    }
}