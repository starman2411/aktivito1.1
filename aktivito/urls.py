from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from aktivito_handler.views import editing_view_1, editing_view_2, load_files, load_files_2,load_table, main_view, projects_view, new_project_view
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_view),
    

    path('new_project', new_project_view, name='new_project'),
    path('load_table/', load_table, name='load_table'),
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('<str:username>/projects/', projects_view, name="projects"),
    path('load_files/', load_files, name='load_files'),
    path('load_files_2/', load_files_2, name='load_files_2'),
    path('<str:project_name>/editing-1/', editing_view_1, name='project_editing_1'),
    path('<str:project_name>/editing-2/', editing_view_2, name='project_editing_2'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
