package com.sakthigarments.migration;

import com.fasterxml.jackson.databind.JsonNode;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class MongoDocumentParser {

    public static String extractId(JsonNode node) {
        if (node == null || !node.has("_id")) {
            return null;
        }
        JsonNode idNode = node.get("_id");
        if (idNode.isObject() && idNode.has("$oid")) {
            return idNode.get("$oid").asText();
        }
        return idNode.asText();
    }

    public static String extractString(JsonNode node, String fieldName, String defaultValue) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return defaultValue;
        }
        return node.get(fieldName).asText();
    }

    public static Double extractDouble(JsonNode node, String fieldName, Double defaultValue) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return defaultValue;
        }
        JsonNode valNode = node.get(fieldName);
        if (valNode.isObject() && valNode.has("$numberDouble")) {
            return Double.valueOf(valNode.get("$numberDouble").asText());
        }
        return valNode.asDouble(defaultValue != null ? defaultValue : 0.0);
    }

    public static BigDecimal extractBigDecimal(JsonNode node, String fieldName, BigDecimal defaultValue) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return defaultValue;
        }
        JsonNode valNode = node.get(fieldName);
        if (valNode.isObject() && valNode.has("$numberDecimal")) {
            return new BigDecimal(valNode.get("$numberDecimal").asText());
        }
        return BigDecimal.valueOf(valNode.asDouble(defaultValue != null ? defaultValue.doubleValue() : 0.0));
    }

    public static Integer extractInt(JsonNode node, String fieldName, Integer defaultValue) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return defaultValue;
        }
        JsonNode valNode = node.get(fieldName);
        if (valNode.isObject() && valNode.has("$numberInt")) {
            return Integer.valueOf(valNode.get("$numberInt").asText());
        }
        return valNode.asInt(defaultValue != null ? defaultValue : 0);
    }

    public static Boolean extractBoolean(JsonNode node, String fieldName, Boolean defaultValue) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return defaultValue;
        }
        return node.get(fieldName).asBoolean(defaultValue != null ? defaultValue : false);
    }

    public static LocalDateTime extractDate(JsonNode node, String fieldName) {
        if (node == null || !node.has(fieldName) || node.get(fieldName).isNull()) {
            return LocalDateTime.now();
        }
        JsonNode dateNode = node.get(fieldName);
        try {
            if (dateNode.isObject() && dateNode.has("$date")) {
                String dateStr = dateNode.get("$date").asText();
                return Instant.parse(dateStr).atZone(ZoneOffset.UTC).toLocalDateTime();
            }
            if (dateNode.isTextual()) {
                return Instant.parse(dateNode.asText()).atZone(ZoneOffset.UTC).toLocalDateTime();
            }
        } catch (Exception e) {
            // Fallback to current time if parsing fails
            return LocalDateTime.now();
        }
        return LocalDateTime.now();
    }
}
