import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from .models import Tweet
from django.utils.http import url_has_allowed_host_and_scheme


def home_view(request):
    return render(request, "pages/home.html", context={}, status=200)

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by Javascript or Swift/Java/iOS/Android
    return json data
    """
    qs = Tweet.objects.all()
    tweet_list = [{"id": x.id, "content": x.content} for x in qs]
    data = {
        "isUser": False,
        "response": tweet_list
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    data = {

        "id": tweet_id,
        #"content": obj.content,
        # "image_path": obj.image.url
    }
    status_code = 200
    try:
        obj = Tweet.objects.get(id=tweet_id) # GET from database
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status_code = 404
    
    return JsonResponse(data, status=status_code) # http response