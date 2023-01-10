from django import template
from aktivito_handler.models import (Category, GoodsType, GoodsSubType, ContactMethod, ListingFee, AdStatus, AdType, Condition, PriceType, DealGoal)
import json

register = template.Library()


@register.simple_tag
def get_category_cascade():
    cascade_dict = {}
    for category in Category.objects.all():
        types = GoodsType.objects.filter(category = category)
        types_dict = {}
        for type in types:
            subtypes = GoodsSubType.objects.filter(goods_type = type)
            types_dict.update([(type.goods_type_name, [subtype.goods_subtype_name for subtype in subtypes])])
        cascade_dict.update([(category.category_name, types_dict)])
    return json.dumps(cascade_dict, ensure_ascii=False)


@register.simple_tag
def get_contact_methods():
    output = []
    for method in ContactMethod.objects.all():
        output.append(method.method)
    return json.dumps(output, ensure_ascii=False)


@register.simple_tag
def get_deal_goals():
    output = []
    for goal in DealGoal.objects.all():
        output.append(goal.goal)
    return json.dumps(output, ensure_ascii=False)


@register.simple_tag
def get_listing_fees():
    output = []
    for fee in ListingFee.objects.all():
        output.append(fee.fee)
    return json.dumps(output, ensure_ascii=False)

@register.simple_tag
def get_ad_statuses():
    output = []
    for status in AdStatus.objects.all():
        output.append(status.status)
    return json.dumps(output, ensure_ascii=False)

@register.simple_tag
def get_ad_types():
    output = []
    for type in AdType.objects.all():
        output.append(type.type)
    return json.dumps(output, ensure_ascii=False)

@register.simple_tag
def get_conditions():
    output = []
    for condition in Condition.objects.all():
        output.append(condition.condition)
    return json.dumps(output, ensure_ascii=False)

@register.simple_tag
def get_price_types():
    output = []
    for type in PriceType.objects.all():
        output.append(type.type)
    return json.dumps(output, ensure_ascii=False)

