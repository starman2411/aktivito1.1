from django.contrib import admin
from .models import Preset
from django.db import models
from django.forms import TextInput

class PresetAdmin(admin.ModelAdmin):
     formfield_overrides = {
          models.CharField: {'widget': TextInput(attrs={'size': '20'})},
     }
     def get_form(self, request, obj=None, **kwargs):
          help_texts = {
               "description": "<p style='font-size:12px'>Добавьте описание к пресету</p>",
               "border_range": "<p style='font-size:12px'>Диапазон выбора максимальной толщины границы в ПИКСЕЛЯХ. Пример ввода: (0,30)</p>",
               "resize_ratio": "<p style='font-size:12px'>Диапазон выбора нового размера изображения в ПРОЦЕНТАХ. Пример ввода: (85,110)</p>",
               "contrast_coeffs": '''<p style='font-size:12px'>Диапазон содержит ('Нижняя граница контраста', 'Верхняя граница контраста') <br/>
                                           Для каждой фотографии случайно выберается значение от 0 до 'Нижняя граница контраста'. Пиксели со значением цвета МЕНЬШЕ этого значения приравниваются к нулю (чёрному цвету). <br/>
                                           Для каждой фотографии случайно выберается значение от 'Верхняя граница контраста' до 255. Пиксели со значением цвета ВЫШЕ этого значения приравниваются к 255 (белому цвету). <br/>
                                           Пример ввода: (25,230)</p>
                                  ''',
               "brightness_coeffs": '''<p style='font-size:12px'>Для каждой фотографии случайно выберается значение от 'Нижняя граница яркости' (может быть <0) до 'Верхняя граница яркости'. Полученное значение прибавляется к каждому пикселю, равномерно увеличивая или уменьшая яркость <br/>
                                       Пример ввода: (-50, 50)</p>
                                    ''',
               "color_fluctuation": '''<p style='font-size:12px'> Случайное число от 0 до выбранного значения будет прибавляться к кажому цвету (к каждому цвету своё), тем самым слегка изменяя цвет фотографии.<br/>
                                           Чем число выше, тем сильнее новые фотографии могут отклоняться от оригинала по цвету. <br/>
                                           Пример ввода: 30</p>
                                  ''',
          }
          kwargs.update({"help_texts": help_texts})
          return super().get_form(request, obj, **kwargs)

admin.site.register(Preset, PresetAdmin)