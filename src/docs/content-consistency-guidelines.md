# Content Consistency Guidelines

## Overview

This document provides guidelines for maintaining consistent messaging between the homepage and About Us page. Consistency in messaging is crucial for building trust with users and presenting a cohesive brand narrative.

## Key Messaging Points

The following key messaging points should be consistent across both the homepage and About Us page:

### Company Identity

| Messaging Point | Standard Terminology | Usage |
|----------------|---------------------|-------|
| Company Name | Uncle Sam Junk Removal | Use full name in headings and first mentions; "Uncle Sam" acceptable in subsequent mentions |
| Founding Date | Founded in 2025 | Always reference as "founded in 2025" or "since 2025" |
| Veteran Status | U.S. Marine Corps veteran owned and operated | Always include "U.S. Marine Corps" when mentioning veteran status |
| Service Area | Tri-State area | Use "Tri-State area" consistently when referring to service coverage |

### Company Values

| Value | Standard Terminology | Usage |
|------|---------------------|-------|
| Environmental Responsibility | "environmentally responsible disposal" or "eco-friendly practices" | Emphasize recycling and donation efforts |
| Recycling Commitment | "We donate and recycle whenever possible" | Use consistent phrasing across all pages |
| Customer Satisfaction | "100% satisfaction guarantee" | Always include this guarantee on service pages |
| Professionalism | "Experienced team of trained professionals" | Use when describing team qualifications |

### Service Commitments

| Commitment | Standard Terminology | Usage |
|-----------|---------------------|-------|
| Insurance | "Licensed and fully insured" | Always mention both licensing and insurance together |
| Pricing | "Transparent, upfront pricing with no hidden fees" | Use consistent phrasing when discussing pricing |
| Scheduling | "Flexible scheduling including same-day service" | Emphasize availability and flexibility |
| Service Quality | "Efficient & Reliable" | Use as primary service quality descriptor |

## Content Update Process

To maintain consistency when updating content:

1. **Single Source of Truth**: The About Us page serves as the primary source of truth for company information
2. **Update Both Pages**: When updating company information, ensure changes are reflected on both the homepage and About Us page
3. **Terminology Check**: Use the standard terminology defined in this document
4. **Visual Verification**: Ensure content updates don't break layouts or visual design
5. **Testing**: Run content consistency tests after updates

## Content Consistency Tests

Content consistency is verified through automated tests in `src/components/home/__tests__/ContentConsistency.test.tsx`. These tests check for:

1. Consistent terminology across components
2. Presence of key messaging points
3. Alignment of company values and credentials

## Visual Regression Testing

Visual regression tests in `src/components/home/__tests__/visual-regression.js` ensure that content updates don't break layouts. Run these tests:

1. Before making content changes (to create baseline snapshots)
2. After making content changes (to compare with baseline)

## Maintenance Schedule

To ensure ongoing content consistency:

1. **Quarterly Review**: Conduct a quarterly review of both pages to ensure messaging remains aligned
2. **Pre-Launch Check**: Before launching any major content updates, verify consistency across pages
3. **Annual Audit**: Perform a comprehensive content audit annually to identify and address any inconsistencies

## Responsibility

The content manager is responsible for maintaining consistency between the homepage and About Us page, with support from the development team for implementing and testing changes.