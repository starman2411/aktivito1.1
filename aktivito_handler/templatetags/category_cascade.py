from django import template
from aktivito_handler.models import Category, GoodsType, GoodsSubType
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

    print(cascade_dict)
    return json.dumps(cascade_dict, ensure_ascii=False)
