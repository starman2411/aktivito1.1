from django.db import models

class Preset(models.Model):
    preset_name = models.CharField(verbose_name="Название пресета", max_length=12, unique=True, default='')
    description = models.TextField(verbose_name = "Описание", default='')
    border_range = models.CharField(verbose_name = "Диапазон границы", max_length=12, default='(0,30)')
    resize_ratio = models.CharField(verbose_name = "Диапазон размера", max_length=12, default='(85,110)')
    contrast_coeffs = models.CharField(verbose_name = "Диапазон контраста", max_length=12, default='(25,230)')
    brightness_coeffs = models.CharField(verbose_name = "Диапазон яркости", max_length=12, default='(-50,50)')
    color_fluctuation = models.CharField(verbose_name="Флуктуация цвета", max_length=2, default='20')
    class Meta:
        verbose_name = 'пресет'
        verbose_name_plural = "пресеты"

    def __str__(self):
        return self.preset_name