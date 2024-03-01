package uol.sanguis.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.List;

@Table(name = "lab_results")
@Entity
public class LabResultEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @UuidGenerator
    private String id;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String laboratory;

    private String physician;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(nullable = false)
    private String userId;

    @OneToMany(mappedBy="labResult", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<BloodTestEntity> bloodTests;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(String laboratory) {
        this.laboratory = laboratory;
    }

    public String getPhysician() {
        return physician;
    }

    public void setPhysician(String physician) {
        this.physician = physician;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<BloodTestEntity> getBloodTests() {
        return bloodTests;
    }

    public void setBloodTests(List<BloodTestEntity> bloodTests) {
        this.bloodTests = bloodTests;
    }

    @Override
    public String toString() {
        return "LabResultEntity{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", laboratory='" + laboratory + '\'' +
                ", physician='" + physician + '\'' +
                ", note='" + note + '\'' +
                ", userId='" + userId + '\'' +
                ", bloodTests=" + bloodTests +
                '}';
    }
}