package uol.sanguis.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uol.sanguis.models.LabResult;
import uol.sanguis.models.QueryResult;
import uol.sanguis.models.requests.CreateLabResult;
import uol.sanguis.services.LabResultService;

import java.util.Arrays;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/lab-results")
@RestController
public class LabResultController {
    private final LabResultService labResultService;

    public LabResultController(LabResultService labResultService) {
        this.labResultService = labResultService;
    }

    @GetMapping("")
    public List<QueryResult<LabResult>> getLabResults() {
        List<LabResult> result = labResultService.getLabResults();
        QueryResult queryResult = new QueryResult<>(result, result.size(), 0, 20);
        // Temporary fix
        return Arrays.asList(queryResult);
    }

    @GetMapping("/{labResultId}")
    public ResponseEntity<LabResult> getLabResult(@PathVariable String labResultId) {
        return ResponseEntity.ok(labResultService.getLabResult(labResultId));
    }

    @PatchMapping("/{labResultId}")
    public ResponseEntity<Void> updateLabResult(@PathVariable String labResultId,
                                                @RequestBody CreateLabResult labResult) {
        labResultService.updateLabResult(labResultId, labResult);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Void> createLabResult(@RequestBody CreateLabResult request) {
        labResultService.createLabResult(request);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping("/{labResultId}")
    public ResponseEntity<Void> deleteLabResult(@PathVariable String labResultId) {
        labResultService.deleteLabResult(labResultId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}