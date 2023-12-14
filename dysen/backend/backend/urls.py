from django.contrib import admin
from django.urls import path, re_path,  include
from tweets.views import (
    tweets_list_view,
    tweets_detail_view,
)
from accounts.views import (
    login_view,
    logout_view,
    register_view,
)
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', tweets_list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<int:tweet_id>/', tweets_detail_view),
    re_path(r'profiles?/', include('profiles.urls')),
    path('api/tweets/', include('tweets.api.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

