# PropertyHub360 - Procurement, Inventory & Vendor Cloud (Phase 9) ERD

This document outlines the visual database architecture for the Phase 9 modules successfully integrated into the multi-tenant core.

## Database Schema (Mermaid)

\`\`\`mermaid
erDiagram
    TENANT {
        String id PK
        String name
        String domain
    }

    VENDOR {
        String id PK
        String tenantId FK
        String name
        String category
        String status
    }

    VENDOR_KYC {
        String id PK
        String vendorId FK
        String gstNumber
        String panNumber
        String kycStatus
    }

    VENDOR_PERFORMANCE {
        String id PK
        String vendorId FK
        Float slaComplianceScore
        Float qualityRating
    }

    PURCHASE_REQUISITION {
        String id PK
        String tenantId FK
        String requesterId FK
        String department
        String status
    }

    PURCHASE_REQUISITION_ITEM {
        String id PK
        String prId FK
        String itemMasterId FK
        Int quantity
        Decimal estimatedPrice
    }

    PURCHASE_ORDER {
        String id PK
        String vendorId FK
        String prId FK
        String poNumber
        Decimal totalAmount
        String status
    }

    PURCHASE_ORDER_ITEM {
        String id PK
        String poId FK
        String itemMasterId FK
        Int quantity
        Decimal unitPrice
    }

    GOODS_RECEIPT_NOTE {
        String id PK
        String poId FK
        String warehouseId FK
        String status
        DateTime receiptDate
    }

    WAREHOUSE {
        String id PK
        String tenantId FK
        String name
        String locationAddress
    }

    ITEM_MASTER {
        String id PK
        String sku UK
        String name
        String unitOfMeasure
    }

    INVENTORY_LEDGER {
        String id PK
        String warehouseId FK
        String itemMasterId FK
        Int currentStock
        String valuationMethod
    }

    INVENTORY_TRANSACTION {
        String id PK
        String warehouseId FK
        String itemMasterId FK
        String type
        Int quantity
    }

    BUDGET {
        String id PK
        String tenantId FK
        String name
        Decimal totalAmount
    }

    %% Relationships
    TENANT ||--o{ VENDOR : "manages"
    TENANT ||--o{ PURCHASE_REQUISITION : "generates"
    TENANT ||--o{ PURCHASE_ORDER : "issues"
    TENANT ||--o{ WAREHOUSE : "owns"
    TENANT ||--o{ BUDGET : "allocates"

    VENDOR ||--o| VENDOR_KYC : "has"
    VENDOR ||--o| VENDOR_PERFORMANCE : "tracks"
    VENDOR ||--o{ PURCHASE_ORDER : "receives"

    PURCHASE_REQUISITION ||--o{ PURCHASE_REQUISITION_ITEM : "contains"
    PURCHASE_REQUISITION ||--o{ PURCHASE_ORDER : "fulfilled by"

    PURCHASE_ORDER ||--o{ PURCHASE_ORDER_ITEM : "contains"
    PURCHASE_ORDER ||--o{ GOODS_RECEIPT_NOTE : "receives against"

    GOODS_RECEIPT_NOTE ||--o{ INVENTORY_TRANSACTION : "triggers"
    
    WAREHOUSE ||--o{ INVENTORY_LEDGER : "stores"
    ITEM_MASTER ||--o{ INVENTORY_LEDGER : "tracked in"
    ITEM_MASTER ||--o{ PURCHASE_ORDER_ITEM : "ordered via"
\`\`\`

## Key Module Updates

> [!NOTE]
> The database has been carefully restructured to inject the Procurement relation arrays directly into the existing `Tenant`, `Vendor`, and `Invoice` entities, extending them non-destructively.

> [!TIP]
> The existing `PurchaseOrder` (from Phase 6 Construction) and `Warehouse` (from Phase 8) models have been successfully merged and expanded to accommodate full supply chain metrics, eliminating the schema validation errors (`P1012`)!

## Next Steps

1. **Backend Integration**: Implement controllers for `Vendor`, `Procurement`, `Inventory`, and `Budget`.
2. **Dashboard UI**: Develop the front-end React/Vite components to render the Procurement workflows.
3. **Run Live**: Execute the local environment and interact with the endpoints.
