package uol.sanguis.models.requests;

import java.util.Objects;

public class UserLoginRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public UserLoginRequest setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserLoginRequest setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserLoginRequest that = (UserLoginRequest) o;

        return email.equals(that.email) &&
                password.equals(that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password);
    }

    @Override
    public String toString() {
        return "UserLoginDetails{" +
                "email='" + email + '\'' +
                ", password='" + "'censored'" + '\'' +
                '}';
    }
}