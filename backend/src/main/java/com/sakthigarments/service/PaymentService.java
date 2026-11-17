package com.sakthigarments.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    @Value("${app.razorpay.key-id:rzp_test_sakthi_dev}")
    private String keyId;

    @Value("${app.razorpay.key-secret:mock_secret_for_local_dev}")
    private String keySecret;

    @Value("${app.razorpay.test-mode:true}")
    private boolean testMode;

    public Map<String, Object> createGatewayOrder(BigDecimal amount, String receiptRef) {
        Map<String, Object> res = new HashMap<>();

        // In production with live credentials, RazorpayClient can be used:
        // RazorpayClient client = new RazorpayClient(keyId, keySecret);
        // JSONObject orderRequest = new JSONObject();
        // orderRequest.put("amount", amount.multiply(new BigDecimal(100)).intValue()); // in paise
        // orderRequest.put("currency", "INR");
        // orderRequest.put("receipt", receiptRef);
        // Order order = client.orders.create(orderRequest);

        String razorpayOrderId = "order_" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);

        res.put("keyId", keyId);
        res.put("amountPaise", amount.multiply(BigDecimal.valueOf(100)).intValue());
        res.put("currency", "INR");
        res.put("razorpayOrderId", razorpayOrderId);
        res.put("receipt", receiptRef);
        res.put("testMode", testMode);

        return res;
    }

    public boolean verifySignature(String orderId, String paymentId, String signature) {
        if (testMode || "mock_secret_for_local_dev".equals(keySecret)) {
            // In local development verification mode
            return signature != null && !signature.trim().isEmpty();
        }

        try {
            String data = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }

            return MessageDigest.isEqual(hex.toString().getBytes(StandardCharsets.UTF_8), signature.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            return false;
        }
    }
}
