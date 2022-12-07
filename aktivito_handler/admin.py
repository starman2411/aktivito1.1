from django.contrib import admin
from .models import ListingFee, AdStatus, ContactMethod, Category, GoodsType, GoodsSubType, PriceType, Condition, AdType


class ListingFeeAdmin(admin.ModelAdmin):
    list_display = ('fee',)

class AdStatusAdmin(admin.ModelAdmin):
    list_display = ('status',)

class ContactMethodAdmin(admin.ModelAdmin):
    list_display = ('method',)

class ConditionAdmin(admin.ModelAdmin):
    list_display = ('condition',)

class PriceTypeAdmin(admin.ModelAdmin):
    list_display = ('type',)

class AdTypeAdmin(admin.ModelAdmin):
    list_display = ('type',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)

class GoodsTypeAdmin(admin.ModelAdmin):
    list_display = ('goods_type_name',)

class GoodsSubTypeAdmin(admin.ModelAdmin):
    list_display = ('goods_subtype_name',)


admin.site.register(ListingFee, ListingFeeAdmin)
admin.site.register(AdStatus, AdStatusAdmin)
admin.site.register(ContactMethod, ContactMethodAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(GoodsType, GoodsTypeAdmin)
admin.site.register(GoodsSubType, GoodsSubTypeAdmin)
admin.site.register(Condition, ConditionAdmin)
admin.site.register(PriceType, PriceTypeAdmin)
admin.site.register(AdType, AdTypeAdmin)

