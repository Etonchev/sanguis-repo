package uol.sanguis;

import uol.sanguis.models.BloodTest;
import uol.sanguis.models.BloodTestCategory;
import uol.sanguis.models.LabResult;
import uol.sanguis.models.requests.CreateLabResult;
import uol.sanguis.models.requests.UserLoginRequest;
import uol.sanguis.models.requests.UserRegistrationRequest;
import uol.sanguis.models.responses.BloodTestDetailedResponse;

import java.util.Collections;
import java.util.Date;
import java.util.List;

public class FakeData {
    public static final String EMAIL = "email@domain.com";
    public static final String PASSWORD = "password";
    public static final String FIRST_NAME = "Bob";
    public static final String LAST_NAME = "Wilson";
    public static final String LABORATORY = "Sofiamed";
    public static final String PHYSICIAN = "Dr Bob";
    public static final String NOTE = "Note";
    public static final Date DATE = new Date(1709801819179L);
    public static final UserRegistrationRequest USER_REGISTRATION_REQUEST = new UserRegistrationRequest(
            EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, DATE);
    public static final UserLoginRequest USER_LOGIN_REQUEST = new UserLoginRequest(EMAIL, PASSWORD);
    public static final String UUID_STRING = "3d290216-1f70-464e-a0f7-4b1c19c576ea";
    public static final BloodTestCategory BLOOD_TEST_CATEGORY = new BloodTestCategory(UUID_STRING, "Glucose",
            "Blood sugar, Glycemia", "description", "Endocrinology", "mmol/L", 1, 2);
    public static final List<BloodTestCategory> BLOOD_TEST_CATEGORY_LIST = Collections.singletonList(BLOOD_TEST_CATEGORY);
    public static final BloodTest BLOOD_TEST = new BloodTest(UUID_STRING, 5);
    public static final List<BloodTest> BLOOD_TEST_LIST = Collections.singletonList(BLOOD_TEST);
    public static final BloodTestDetailedResponse BLOOD_TEST_DETAILED_RESPONSE = new BloodTestDetailedResponse(DATE, NOTE, UUID_STRING, 5);
    public static final List<BloodTestDetailedResponse> BLOOD_TEST_DETAILED_RESPONSE_LIST = Collections.singletonList(BLOOD_TEST_DETAILED_RESPONSE);
    public static final LabResult LAB_RESULT = new LabResult(UUID_STRING, DATE, LABORATORY, PHYSICIAN, NOTE, BLOOD_TEST_LIST);
    public static final List<LabResult> LAB_RESULT_LIST = Collections.singletonList(LAB_RESULT);
    public static final CreateLabResult CREATE_LAB_RESULT = new CreateLabResult(DATE, LABORATORY, PHYSICIAN, NOTE, BLOOD_TEST_LIST);
}