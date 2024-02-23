package uol.sanguis.models.requests;

import java.util.Date;
import java.util.Objects;

public class UserRegistrationRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Date birthDate;

    public UserRegistrationRequest(String email, String password, String firstName, String lastName, Date birthDate) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public UserRegistrationRequest setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserRegistrationRequest setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserRegistrationRequest setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public UserRegistrationRequest setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserRegistrationRequest that = (UserRegistrationRequest) o;

        return email.equals(that.email) &&
                password.equals(that.password) &&
                firstName.equals(that.firstName) &&
                lastName.equals(that.lastName) &&
                birthDate.equals(that.birthDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password, firstName, lastName, birthDate);
    }

    @Override
    public String toString() {
        return "UserRegistrationDetails{" +
                "email='" + email + '\'' +
                ", password='" + "'censored'" + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate=" + birthDate +
                '}';
    }
}