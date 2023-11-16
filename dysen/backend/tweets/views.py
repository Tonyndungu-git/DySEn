import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Tweet
from django.utils.http import url_has_allowed_host_and_scheme
from .forms import TweetForm
from django.http import HttpResponseRedirect
from django.utils.safestring import SafeString

def home_view(request):
    return render(request, "pages/home.html", context={}, status=200)

def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None) # request.FILES or None
    next_url = request.POST.get("next") or None
    tweet_form = TweetForm(request.POST)
    if tweet_form.is_valid():
        tweet = tweet_form.save(commit=False)
        tweet.user = request.user  # Set the user before saving
        tweet.save()
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
            # Use SafeString to ensure the content is safe for HTML rendering
            return JsonResponse({"serializer": SafeString(obj.serializer())}, status=201)


        if next_url != None and url_has_allowed_host_and_scheme(next_url, allowed_hosts=request.get_host()):
            return HttpResponseRedirect(next_url)
        if next_url != None :
            return redirect(next_url)
        form = TweetForm()
        if form.errors:
            if request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
                return JsonResponse(form.errors, status=400)
            return JsonResponse(form.errors, status=400)
    return render(request, "components/form.html", context={"form": form}, status=200)

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by Javascript or Swift/Java/iOS/Android
    return json data
    """
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
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