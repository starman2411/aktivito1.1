from django.template.defaulttags import register
from transliterate import translit


@register.filter
def make_valid_name(ru_text):
    en_text = translit(ru_text, language_code='ru', reversed=True)
    text_list = list(map(lambda s: s[0].upper() + s[1:], en_text.split(' ')))
    return ''.join(text_list)


