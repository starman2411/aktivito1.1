from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
import json

empty_data = json.dumps([])

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

class Project(models.Model):
    project_name = models.TextField()
    creator = models.TextField()
    authors = ArrayField(models.TextField(blank=True), size=50, default=list)
    creation_time = models.DateTimeField(auto_now_add=True)
    data = JSONField(default=list)

    def __str__(self):
        return self.project_name




