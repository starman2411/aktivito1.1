from django.template.defaulttags import register

@register.filter
def get_item(dictionary, key):
    value = dictionary.get(key)
    if value:
        return value
    else:
        return ''

@register.filter
def length_plus(rows):
    return len(rows) + 1
