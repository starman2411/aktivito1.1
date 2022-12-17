from django.template.defaulttags import register
from transliterate import translit


@register.filter
def make_valid_name(ru_text):
    ru_text = ' '.join(ru_text.split())
    en_text = translit(ru_text, language_code='ru', reversed=True)
    if len(en_text)>0:
        text_list = list(map(lambda s: s[0].upper() + s[1:], en_text.split(' ')))
        return ''.join(text_list)
    return '_'


