from enum import Enum

class ProductCategoryFields(Enum):
    ID = "id"
    NAME = "name"


class ProductFields(Enum):
    ID = "id"
    NAME = "name"
    PRICE = "price"
    SHORT_DESCRIPTION = "short_description"
    LONG_DESCRIPTION = "long_description"
    CATEGORY_ID = "category_id"
    CATEGORY_NAME = "category_name"
    STOCK = "stock"
    IMAGE = "image"


class OrderFields(Enum):
    ID = "id"
    CUSTOMER_FIRSTNAME = "customer_firstname"
    CUSTOMER_LASTNAME = "customer_lastname"
    CUSTOMER_EMAIL = "customer_email"
    CREATED_AT = "created_at"
    STATUS = "status"
    TOTAL_PRICE = "total_price"
    ORDER_DATE = "order_date"


class OrderItemFields(Enum):
    ID = "id"
    ORDER_ID = "order_id"
    PRODUCT_ID = "product_id"
    QUANTITY = "quantity"
    UNIT_PRICE = "unit_price"
    TOTAL_PRICE = "total_price"
