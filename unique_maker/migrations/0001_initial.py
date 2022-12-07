# Generated by Django 4.1.4 on 2022-12-07 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Preset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preset_name', models.CharField(default='', max_length=12, unique=True, verbose_name='Название пресета')),
                ('description', models.TextField(default='', verbose_name='Описание')),
                ('border_range', models.CharField(default='(0,30)', max_length=12, verbose_name='Диапазон границы')),
                ('resize_ratio', models.CharField(default='(85,110)', max_length=12, verbose_name='Диапазон размера')),
                ('contrast_coeffs', models.CharField(default='(25,230)', max_length=12, verbose_name='Диапазон контраста')),
                ('brightness_coeffs', models.CharField(default='(-50,50)', max_length=12, verbose_name='Диапазон яркости')),
                ('color_fluctuation', models.CharField(default='20', max_length=2, verbose_name='Флуктуация цвета')),
            ],
            options={
                'verbose_name': 'пресет',
                'verbose_name_plural': 'пресеты',
            },
        ),
    ]
