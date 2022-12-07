from django.shortcuts import render
from .models import Category, ListingFee, AdStatus, ContactMethod, Condition, PriceType, AdType
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import itertools
from pathlib import Path
from django.conf import settings
import json
import pandas as pd
import os
from django.contrib.auth.decorators import login_required
import exif
import random
from PIL import Image, ImageOps
from unique_maker.models import Preset
import numpy as np
# Create your views here.


def get_preset(preset_name):
    if Preset.objects.filter(preset_name = preset_name).exists():
        preset = Preset.objects.get(preset_name = preset_name)
        border_range = preset.border_range.replace('(', '').replace(')', '').replace(' ', '').split(',')
        resize_ratio = preset.resize_ratio.replace('(', '').replace(')', '').replace(' ', '').split(',')
        contrast_coeffs = preset.contrast_coeffs.replace('(', '').replace(')', '').replace(' ', '').split(',')
        brightness_coeffs = preset.brightness_coeffs.replace('(', '').replace(')', '').replace(' ', '').split(',')
        color_fluctuation = int(preset.color_fluctuation)
        borders = []
        resize_ratios = []
        contrast_bottoms = []
        contrast_tops = []
        brightnesses = []
        if len(border_range) == 2:
            borders = [i for i in range(int(border_range[0]), int(border_range[1]) + 1)]
        if len(resize_ratio) == 2:
            resize_ratios = [i for i in range(int(resize_ratio[0]), int(resize_ratio[1]) + 1)]
        if len(contrast_coeffs) == 2:
            contrast_bottoms = [i for i in range(0, int(contrast_coeffs[0]) + 1)]
            contrast_tops = [i for i in range(int(contrast_coeffs[1]), 256)]
        if len(brightness_coeffs) == 2:
            brightnesses = [i for i in range(int(brightness_coeffs[0]), int(brightness_coeffs[1]) + 1)]
            return [borders, resize_ratios, contrast_bottoms, contrast_tops, brightnesses, color_fluctuation]
    return []

def delete_metatags(image_path):
    if image_path.split('.')[-1] not in  ['png', 'Png', 'PNG']:
        with open(image_path, "rb") as file:
            image = exif.Image(file)
        if image.has_exif:
            image.delete_all()
        with open(image_path, 'wb') as updated_file:
            updated_file.write(image.get_file())


def resize_image(img, ratio):
    new_width = int(img.size[0] * ratio / 100)
    new_height = int(img.size[1] * ratio / 100)
    img = img.resize((new_width, new_height))
    return img


def add_border(img, border):
    img = ImageOps.expand(img, border=border)
    if border:
        img = img.crop((random.randrange(0, border, 1), random.randrange(0, border, 1), img.size[0], img.size[1]))
    return img


def image_filters(img, bottom_contrast, top_contrast, brightness, color_fluctuation):
    im = np.asarray(img)
    if len(im.shape) > 2:
        if im.shape[2] == 3:
            im = im + [brightness + random.randint(1, color_fluctuation), brightness + random.randint(1, color_fluctuation), brightness + random.randint(1, color_fluctuation)]
        if im.shape[2] == 4:
            im = im + [brightness + random.randint(1, color_fluctuation), brightness + random.randint(1, color_fluctuation),
                       brightness + random.randint(1, color_fluctuation), 0]
        im = np.where(im < bottom_contrast, 0, im)
        im = np.where(im > top_contrast, 255, im)
        new_img = Image.fromarray(im.astype(np.uint8))
        return new_img
    else:
        return img



def _make_unique(files, borders, resize_ratios, contrast_bottoms, contrast_tops, brightnesses, color_fluctuation):
    for file in files:
        imagename = file
        delete_metatags(imagename)
        img = Image.open(imagename)
        img = resize_image(img, random.choice(resize_ratios))
        img = add_border(img, random.choice(borders))
        img = image_filters(img,
                            random.choice(contrast_bottoms),
                            random.choice(contrast_tops),
                            random.choice(brightnesses),
                            color_fluctuation)
        img.save(imagename)


@login_required(login_url = '/login/')
def editing_view_1(request, project_name):
    context = {
        'project_name': project_name,
        'categories': Category.objects.all(),
        'listing_fees': ListingFee.objects.all(),
        'ad_statuses': AdStatus.objects.all(),
        'contact_methods': ContactMethod.objects.all(),
        'ad_types': AdType.objects.all(),
        'conditions': Condition.objects.all(),
        'price_types': PriceType.objects.all(),
        'presets': Preset.objects.all()
    }

    if os.path.exists(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/{project_name}.xlsx'):
        project_path = f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/{project_name}.xlsx'
        excel_data_df = pd.read_excel(project_path, sheet_name='Sheet1').fillna(value='')
        json_table = excel_data_df.to_json(orient='records', force_ascii=False)
        rows = json.loads(json_table)
        context.update([('rows', rows)])
    else:
        return render(request, 'project_handler1.html', context=context)
    return render(request, 'project_handler1.html', context=context)

@login_required(login_url = '/login/')
def editing_view_2(request, project_name):
    context = {
        'project_name': project_name,
        'categories': Category.objects.all(),
        'listing_fees': ListingFee.objects.all(),
        'ad_statuses': AdStatus.objects.all(),
        'contact_methods': ContactMethod.objects.all(),
        'ad_types': AdType.objects.all(),
        'conditions': Condition.objects.all(),
        'price_types': PriceType.objects.all(),
        'presets': Preset.objects.all()
    }

    if os.path.exists(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/{project_name}.xlsx'):
        project_path = f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/{project_name}.xlsx'
        excel_data_df = pd.read_excel(project_path, sheet_name='Sheet1').fillna(value='')
        json_table = excel_data_df.to_json(orient='records', force_ascii=False)
        rows = json.loads(json_table)
        context.update([('rows', rows)])
    else:
        return render(request, 'project_handler2.html', context=context)
    return render(request, 'project_handler2.html', context=context)

def _new_filename(filename):
    path = Path(filename)
    if not path.exists():
        return path
    for i in itertools.count(1):
        new_path = path.parent / (path.stem + f'({i})' + path.suffix)
        if not new_path.exists():
            return new_path

def _handle_uploaded_file(f, username, project_name):
    '''Запись в файл "покусочно"'''
    path = _new_filename(f'{settings.MEDIA_ROOT}/projects/{username}/{project_name}/pics/{f.name}')
    name = os.path.split(str(path))[-1]
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
        print(name)
        return f'projects/{username}/{project_name}/pics/{name}'

@login_required(login_url = '/login/')
@ensure_csrf_cookie
def load_files(request):
    files = request.FILES.getlist('files')
    urls = []
    for f in files:
        url = _handle_uploaded_file(f, request.user.username, request.POST['project_name'])
        if int(request.POST['make_unique']):
            _make_unique([f'{settings.MEDIA_ROOT}/'+url], *get_preset(str(request.POST['preset'])))
        if url:
            urls.append(settings.FULL_DOMEN_ADRESS + 'media/' + url)
    return JsonResponse({'urls': urls})

@login_required(login_url = '/login/')
@ensure_csrf_cookie
def load_files_2(request):
    files = request.FILES.getlist('files')
    urls = []
    propagate_trigger = int(request.POST['propagate'].split(',')[0])
    propagate_amount = int(request.POST['propagate'].split(',')[1])
    for f in files:
        if propagate_trigger:
            for _ in range(propagate_amount):
                url = _handle_uploaded_file(f, request.user.username, request.POST['project_name'])
                _make_unique([f'{settings.MEDIA_ROOT}/'+url], *get_preset(str(request.POST['preset'])))
                if url:
                    urls.append(settings.FULL_DOMEN_ADRESS + 'media/' + url)
        else:
            url = _handle_uploaded_file(f, request.user.username, request.POST['project_name'])
            if int(request.POST['make_unique']):
                _make_unique([f'{settings.MEDIA_ROOT}/'+url], *get_preset(str(request.POST['preset'])))
            if url:
                urls.append(settings.FULL_DOMEN_ADRESS + 'media/' + url)
    return JsonResponse({'urls': urls})


@login_required(login_url = '/login/')
@ensure_csrf_cookie
def load_table(request):
    json_table = json.loads(request.POST['json_table'])

    df = pd.read_json(request.POST['json_table'], orient='columns')

    project_name = request.POST['project_name']
    if not os.path.exists(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}'):
        os.mkdir(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}')
        os.mkdir(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/pics')

    with pd.ExcelWriter(f'{settings.MEDIA_ROOT}/projects/{request.user.username}/{project_name}/{project_name}.xlsx', engine='xlsxwriter',
                        engine_kwargs={"options": {"strings_to_urls": False}}) as writer:
        df.to_excel(writer,  index=False, sheet_name='Sheet1')
        workbook = writer.book
        format1 = workbook.add_format({'num_format': '@'})
        worksheet = writer.sheets['Sheet1']
        worksheet.set_column(0, 0, int(250/7.25), format1)
        worksheet.set_column(1, 1, int(250/7.25))
        worksheet.set_column(2, 2, int(150/7.25))
        worksheet.set_column(3, 3, int(150/7.25))
        worksheet.set_column(4, 4, int(300/7.25))
        worksheet.set_column(5, 5, int(200/7.25))
        worksheet.set_column(6, 6, int(200/7.25))
        worksheet.set_column(7, 7, int(160/7.25))
        worksheet.set_column(8, 8, int(210/7.25))
        worksheet.set_column(9, 9, int(210/7.25))
        worksheet.set_column(10, 10, int(300/7.25))
        worksheet.set_column(11, 11, int(300/7.25))
        worksheet.set_column(12, 12, int(300/7.25))
        worksheet.set_column(13, 13, int(300/7.25))
        worksheet.set_column(14, 14, int(160/7.25))
        worksheet.set_column(15, 15, int(70/7.25))
        worksheet.set_column(16, 16, int(210/7.25))
        worksheet.set_column(17, 17, int(130/7.25))
        worksheet.set_column(18, 18, int(150/7.25))
        worksheet.set_column(19, 19, int(150/7.25))
        worksheet.set_column(20, 20, int(830/7.25))
    return JsonResponse({})


def main_view(request):
    return render(request, 'main.html')


@login_required(login_url='/login/')
def projects_view(request, username):
    if os.path.isdir(f'{settings.BASE_DIR}/media/projects/{username}'):
        pass
    else:
        os.mkdir(f'{settings.BASE_DIR}/media/projects/{username}')
    projects_directory = f'{settings.BASE_DIR}/media/projects/{username}'
    files = os.listdir(projects_directory)
    projects = files
    context = {'projects': projects[::-1]}
    return render(request, 'projects.html', context=context)

def new_project_view(request):
    project_name = request.POST['project_name']
    if not os.path.exists(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}'):
        df = pd.DataFrame()
        os.mkdir(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}')
        os.mkdir(f'{settings.BASE_DIR}/media/projects/{request.user.username}/{project_name}/pics')

        with pd.ExcelWriter(f'{settings.MEDIA_ROOT}/projects/{request.user.username}/{project_name}/{project_name}.xlsx', engine='xlsxwriter',
                            engine_kwargs={"options": {"strings_to_urls": False}}) as writer:
            df.to_excel(writer, index=False, sheet_name='Sheet1')
            worksheet = writer.sheets['Sheet1']
            worksheet.set_column(0, 0, int(250 / 7.25))
            worksheet.set_column(1, 1, int(250 / 7.25))
            worksheet.set_column(2, 2, int(150 / 7.25))
            worksheet.set_column(3, 3, int(150 / 7.25))
            worksheet.set_column(4, 4, int(300 / 7.25))
            worksheet.set_column(5, 5, int(200 / 7.25))
            worksheet.set_column(6, 6, int(200 / 7.25))
            worksheet.set_column(7, 7, int(160 / 7.25))
            worksheet.set_column(8, 8, int(210 / 7.25))
            worksheet.set_column(9, 9, int(210 / 7.25))
            worksheet.set_column(10, 10, int(300 / 7.25))
            worksheet.set_column(11, 11, int(300 / 7.25))
            worksheet.set_column(12, 12, int(300 / 7.25))
            worksheet.set_column(13, 13, int(300 / 7.25))
            worksheet.set_column(14, 14, int(160 / 7.25))
            worksheet.set_column(15, 15, int(70 / 7.25))
            worksheet.set_column(16, 16, int(210 / 7.25))
            worksheet.set_column(17, 17, int(130 / 7.25))
            worksheet.set_column(18, 18, int(150 / 7.25))
            worksheet.set_column(19, 19, int(150 / 7.25))
            worksheet.set_column(20, 20, int(830 / 7.25))
        return JsonResponse({'message': 'success', 'project_name': project_name})
    else:
        return JsonResponse({'message': 'already_exists', 'project_name': project_name})