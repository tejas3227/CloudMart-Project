# CloudMart — Secure Static E-Commerce Website on AWS

A responsive static e-commerce website deployed on AWS using Amazon S3, CloudFront, Route 53, and AWS Certificate Manager (ACM). The project demonstrates secure origin access, custom-domain configuration, HTTPS delivery, CDN caching, and cloud monitoring.

**Live Website:** [https://www.trickyspy.linkpc.net](https://www.trickyspy.linkpc.net)

## Architecture

```text
Website Visitor
      |
      | HTTPS Request
      v
DNSExit — Free Subdomain and DNS Delegation
      |
      v
Amazon Route 53 — Authoritative DNS
      |
      v
Amazon CloudFront — CDN, HTTPS and Caching
      |
      v
Origin Access Control (OAC)
      |
      v
Private Amazon S3 Bucket
      |
      +-- index.html
      +-- style.css
      +-- script.js

Monitoring:
Amazon CloudWatch → CloudWatch Alarm → Amazon SNS → Email
```

**Request flow:**
1. A visitor opens `https://www.trickyspy.linkpc.net`.
2. DNSExit delegates DNS authority to Amazon Route 53, which resolves the custom subdomain to the CloudFront distribution.
3. CloudFront serves cached website content when available.
4. When content must be retrieved from the origin, CloudFront uses OAC to make authenticated requests to the private S3 bucket.
5. CloudFront delivers the requested website content to the visitor over HTTPS.
6. CloudWatch monitors configured CloudFront metrics, and SNS sends email notifications when configured alarm actions are triggered.

## AWS Services Used

| Service | Purpose |
|---|---|
| Amazon S3 | Stores the static website files in a private bucket. |
| Amazon CloudFront | Delivers website content through a CDN and supports HTTPS. |
| Origin Access Control (OAC) | Secures access between CloudFront and the private S3 origin. |
| Amazon Route 53 | Hosts authoritative DNS records for the custom subdomain. |
| DNSExit | Provides the free subdomain and nameserver delegation configuration. |
| AWS Certificate Manager (ACM) | Provides the SSL/TLS certificate used by CloudFront. |
| Amazon CloudWatch | Monitors CloudFront metrics and evaluates alarm conditions. |
| Amazon SNS | Delivers configured alarm notifications by email. |

## Key Features

- Responsive static e-commerce-style frontend built with HTML, CSS, and JavaScript.
- Product listings, product search, category filtering, and a demonstration shopping cart.
- Custom subdomain configured with DNSExit and Amazon Route 53.
- HTTPS-enabled website delivery using an ACM public certificate.
- HTTP-to-HTTPS redirection through CloudFront.
- Private S3 bucket with S3 Block Public Access enabled.
- CloudFront OAC and a restricted bucket policy for origin security.
- Custom CloudFront cache policy with a 60-second default TTL and 300-second maximum TTL.
- S3 object versioning for retaining previous object versions.
- CloudWatch 5xx error-rate monitoring with an SNS email notification action.

## Security Implementation

- Enabled all four S3 Block Public Access settings.
- Restricted S3 object access to the intended CloudFront distribution using OAC and the bucket policy.
- Configured HTTPS delivery and HTTP-to-HTTPS redirection.
- Used an ACM public certificate for the custom CloudFront domain.
- Kept website content private at the S3 origin rather than allowing anonymous public object access.

## Caching and Troubleshooting

During development, CloudFront continued serving older website content after updates were uploaded to S3.

Troubleshooting steps included:

- Verifying the latest S3 object version.
- Checking the CloudFront origin configuration and cache policy.
- Creating a CloudFront invalidation for updated content.
- Reducing the cache TTL using a custom CloudFront cache policy.
- Inspecting HTTP response headers such as `X-Cache`, `Age`, `ETag`, and `Last-Modified`.

These steps helped me understand CDN caching, cache expiration, invalidations, and content freshness.

## Monitoring and Notifications

Configured Amazon CloudWatch to monitor CloudFront metrics and created a 5xx error-rate alarm with an Amazon SNS email notification action.

This provides visibility into configured error conditions and demonstrates basic cloud monitoring and alerting.

## Technologies

**Frontend:** HTML, CSS, JavaScript

**AWS:** Amazon S3, Amazon CloudFront, Amazon Route 53, AWS Certificate Manager, Origin Access Control, Amazon CloudWatch, Amazon SNS

**DNS:** DNSExit, DNS delegation, CNAME records

**Security:** S3 Block Public Access, restricted bucket policy, HTTPS

## Lessons Learned

- Deploying static website assets to Amazon S3.
- Securing an S3 origin using CloudFront OAC.
- Configuring DNS delegation and custom-domain records.
- Provisioning and validating an ACM certificate for CloudFront.
- Managing CloudFront cache policies and invalidations.
- Troubleshooting stale content using object versions and HTTP response headers.
- Monitoring CDN metrics and configuring email notifications.

---

**Project Status:** Deployed and accessible over HTTPS.

**Live Demo:** https://www.trickyspy.linkpc.net