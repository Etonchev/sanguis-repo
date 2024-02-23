package uol.sanguis.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uol.sanguis.entities.UserEntity;
import uol.sanguis.models.requests.UserLoginRequest;
import uol.sanguis.models.requests.UserRegistrationRequest;
import uol.sanguis.models.responses.UserDetailsResponse;
import uol.sanguis.services.UserService;
import uol.sanguis.utils.ApiConstants;
import uol.sanguis.utils.JwtUtil;

@CrossOrigin("*")
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDetailsResponse> register(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        UserEntity userEntity = userService.register(userRegistrationRequest);
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse(userEntity.getEmail(),
                userEntity.getFirstName(), userEntity.getLastName(),
                userEntity.getBirthDate());

        return ResponseEntity.ok(userDetailsResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetailsResponse> login(@RequestBody UserLoginRequest userLoginRequest,
                                                     HttpServletResponse response) {
        UserEntity authenticatedUserEntity = userService.login(userLoginRequest);
        String jwtToken = jwtUtil.generateToken(authenticatedUserEntity);

        response.setHeader(ApiConstants.AUTHENTICATION_HEADER, jwtToken);
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse(authenticatedUserEntity.getEmail(),
                authenticatedUserEntity.getFirstName(), authenticatedUserEntity.getLastName(),
                authenticatedUserEntity.getBirthDate());

        return ResponseEntity.ok(userDetailsResponse);
    }

    @GetMapping("/current")
    public ResponseEntity<UserDetailsResponse> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity currentUserEntity = (UserEntity) authentication.getPrincipal();
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse(currentUserEntity.getEmail(),
                currentUserEntity.getFirstName(), currentUserEntity.getLastName(),
                currentUserEntity.getBirthDate());

        return ResponseEntity.ok(userDetailsResponse);
    }
}