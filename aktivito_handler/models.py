from django.db import models
from django.contrib.auth.models import User


class ListingFee(models.Model):
    fee = models.TextField()


class AdStatus(models.Model):
    status = models.TextField()


class ContactMethod(models.Model):
    method = models.TextField()

class AdType(models.Model):
    type = models.TextField()

class Condition(models.Model):
    condition = models.TextField()

class PriceType(models.Model):
    type = models.TextField()

class Category(models.Model):
    category_name = models.TextField()

    def __str__(self):
        return self.category_name

class GoodsType(models.Model):
    goods_type_name = models.TextField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.goods_type_name


class GoodsSubType(models.Model):
    goods_subtype_name = models.TextField()
    goods_type = models.ForeignKey('GoodsType', on_delete=models.CASCADE)

    def __str__(self):
        return self.goods_subtype_name



