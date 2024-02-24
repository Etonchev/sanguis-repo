package uol.sanguis.models.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import uol.sanguis.models.BloodTest;

import java.util.Date;

public class BloodTestDetailedResponse extends BloodTest {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private final Date date;
    private final String note;

    public BloodTestDetailedResponse(Date date, String note, String categoryId, double value) {
        super(categoryId, value);
        this.date = date;
        this.note = note;
    }

    public Date getDate() {
        return date;
    }

    public String getNote() {
        return note;
    }

    @Override
    public String toString() {
        return "BloodTestDetailedResponse{" +
                "date=" + date +
                ", note='" + note + '\'' +
                '}';
    }
}